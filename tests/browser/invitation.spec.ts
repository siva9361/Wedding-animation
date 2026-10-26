import { existsSync } from "node:fs";
import { test, expect, type Page } from "@playwright/test";

// Every visit starts at the doors; the full opening takes 8 seconds without reduced motion.
const openingTimeout = 15000;
async function openInvitation(page: Page) {
  await page.getByRole("button", { name: /Open invitation/i }).click();
  await expect(page.getByRole("article")).toBeVisible();
  await expect(page.getByRole("region", { name: "Wedding invitation cover" })).toHaveCount(0, {
    timeout: openingTimeout,
  });
}

test("temple doors open into one invitation with the family's actual details", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("region", { name: "Wedding invitation cover" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "You are invited" })).toBeVisible();
  const vinayagar = page.getByRole("img", { name: "விநாயகர்", exact: true });
  await expect(vinayagar).toBeVisible();
  await expect
    .poll(() => vinayagar.evaluate((element) => (element as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0);
  await expect(page.locator(".gate-door")).toHaveCount(2);
  await expect(page.getByRole("article")).toHaveCount(0);
  await openInvitation(page);
  expect(new URL(page.url()).pathname).toBe("/");
  await expect(page.getByRole("heading", { name: "Vignesh Weds Sandhiya" })).toBeFocused();
  await expect(page.getByText("திருமண வரவேற்பு விழா அழைப்பிதழ்", { exact: true })).toHaveCount(0);
  await expect(page.locator(".invitation-intro, .intro-date")).toHaveCount(0);
  await expect(page.locator(".hero-vinayagar")).toBeVisible();
  const openingLayout = await page.locator(".hero-content").evaluate((element) => {
    const image = element.querySelector(".hero-vinayagar")!.getBoundingClientRect();
    const names = element.querySelector("h1")!.getBoundingClientRect();
    return { imageBottom: image.bottom, namesTop: names.top };
  });
  expect(openingLayout.imageBottom).toBeLessThan(openingLayout.namesTop);
  await expect(page.locator(".invitation-verses blockquote p")).toHaveCount(11);
  await expect(page.locator(".invitation-verses")).toContainText(
    "நல்வழி காட்டிய தாத்தாக்கள், பாட்டிகள்",
  );
  await expect(page.locator(".invitation-verses")).toContainText("நெஞ்சிற்கினிய நண்பர்கள்");
  await expect(page.locator("#wedding .occasion-note")).toContainText("ஐப்பசி மாதம் 27-ஆம் நாள்");
  await expect(page.locator(".hero-tamil-names")).toContainText("N. விக்னேஷ்");
  await expect(page.locator(".hero-tamil-names")).toContainText("S. சந்தியா");
  await expect(page.locator("#reception")).toContainText("12.11.2026");
  await expect(page.locator("#reception")).toContainText("மாலை 6.00 – 7.00 மணி");
  await expect(page.locator("#reception")).toContainText("காயத்ரி ஹோட்டல்");
  await expect(page.locator("#wedding")).toContainText("13.11.2026");
  await expect(page.locator("#wedding")).toContainText("அதிகாலை 4.45 – 5.45 மணி");
  await expect(page.locator("#wedding .occasion-calendar > span")).toHaveText("13");
  await expect(page.locator(".families")).toContainText("திரு. R. நாச்சிமுத்துக்கவுண்டர்");
  await expect(page.locator(".families")).toContainText("திரு. T. சுரேஷ்");
  await expect(page.locator("nav, form")).toHaveCount(0);
  await expect(page.locator(".person-portrait")).toHaveCount(2);
  await expect(page.locator(".portrait-placeholder")).toHaveCount(0);
  for (const name of ["மணமகன் N. விக்னேஷ்", "மணமகள் S. சந்தியா"]) {
    const portrait = page.getByRole("img", { name, exact: true });
    await portrait.scrollIntoViewIfNeeded();
    await expect(portrait).toBeVisible();
    await expect
      .poll(() => portrait.evaluate((element) => (element as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
  }
  await expect(page.locator(".blessings-scene, .falling-petals")).toHaveCount(0);
  for (const link of await page
    .locator("a")
    .evaluateAll((elements) => elements.map((element) => element.getAttribute("href") ?? ""))) {
    expect(
      link.startsWith("https://www.google.com/maps/search/") ||
        link.startsWith("#") ||
        ["/calendar/reception", "/calendar/wedding", "/venues", "/share"].includes(link) ||
        link === "tel:+918300454800",
      link,
    ).toBe(true);
  }
  await page.reload();
  await expect(page.getByRole("heading", { name: "You are invited" })).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(0);
  await page.locator(".gate-door-left").click({ force: true });
  await expect(page.getByRole("region", { name: "Wedding invitation cover" })).toHaveCount(0, {
    timeout: openingTimeout,
  });
  await page.getByRole("button", { name: "அழைப்பிதழை மீண்டும் திறக்க", exact: true }).click();
  await expect(page.getByRole("heading", { name: "You are invited" })).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(0);
});

test("phone and desktop layouts have no clipped names, horizontal overflow or hydration errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 375, 430, 768, 1440, 3840]) {
    await page.setViewportSize({ width, height: width > 2000 ? 2160 : 900 });
    await page.goto("/");
    await openInvitation(page);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      "document at " + width,
    ).toBe(true);
    expect(
      await page
        .locator(".royal-names")
        .evaluate((element) => element.scrollWidth <= element.clientWidth + 1),
      "names at " + width,
    ).toBe(true);
    await page.locator("#wedding").scrollIntoViewIfNeeded();
    await expect(page.locator("#wedding .directions")).toBeVisible();
    await page.locator("#reception").scrollIntoViewIfNeeded();
    await expect(page.locator("#reception .directions")).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("the opening button stays on screen on small and large phones", async ({ page }) => {
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 375, height: 812 },
    { width: 430, height: 932 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const button = page.getByRole("button", { name: /Open invitation/i });
    await expect(button).toBeVisible();
    const bounds = await button.boundingBox();
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height - 12);
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width);
  }
});

test("old website pages remain removed", async ({ page }) => {
  for (const route of ["/story", "/events", "/gallery", "/rsvp", "/guest-info"]) {
    expect((await page.goto(route))?.status()).toBe(404);
    await expect(page.getByRole("link", { name: "அழைப்பிதழைக் காண்க →" })).toBeVisible();
  }
});

test("the celebrations timeline lists the reception before the muhurtham", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await openInvitation(page);
  const stops = page.locator(".timeline-stop");
  await expect(stops).toHaveCount(2);
  await expect(stops.nth(0)).toContainText("Wedding reception");
  await expect(stops.nth(0)).toContainText("காயத்ரி ஹோட்டல்");
  await expect(stops.nth(1)).toContainText("Wedding ceremony");
  await expect(page.locator("#reception .save-date")).toHaveAttribute(
    "href",
    "/calendar/reception",
  );
  await expect(page.getByLabel("Countdown to the wedding reception")).toBeVisible();
});

test("calendar files carry each event's IST times and venue", async ({ request }) => {
  const response = await request.get("/calendar/reception");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("text/calendar");
  const ics = (await response.text()).replace(/\r\n /g, "");
  expect(ics).toContain("DTSTART:20261112T123000Z");
  expect(ics).toContain("DTEND:20261112T133000Z");
  expect(ics).toContain("காயத்ரி ஹோட்டல்");
  const wedding = (await (await request.get("/calendar/wedding")).text()).replace(/\r\n /g, "");
  expect(wedding).toContain("DTSTART:20261112T231500Z");
  expect((await request.get("/calendar/unknown")).status()).toBe(404);
});

test("venues and share pages give maps, calendar links and a QR code", async ({ page }) => {
  await page.goto("/venues");
  await expect(page.getByRole("heading", { name: "Venues & Maps" })).toBeVisible();
  await expect(page.locator(".venue-detail")).toHaveCount(2);
  await expect(page.locator(".venue-map iframe")).toHaveCount(2);
  await expect(page.getByRole("link", { name: "Google Calendar" })).toHaveCount(2);
  await page.getByRole("link", { name: /Back to the invitation/i }).click();
  await expect(page.getByRole("heading", { name: "You are invited" })).toBeVisible();

  await page.goto("/share");
  await expect(page.getByRole("heading", { name: "Share the Invitation" })).toBeVisible();
  await expect(page.locator(".share-qr canvas")).toBeVisible();
  const whatsapp = await page.getByRole("link", { name: /Send on WhatsApp/i }).getAttribute("href");
  expect(decodeURIComponent(whatsapp!)).toContain("Vignesh & Sandhiya");
});

test("reduced-motion opening works with storage blocked", async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, "sessionStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    }),
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: /Open invitation/i }).click();
  await expect(page.getByRole("heading", { name: "Vignesh Weds Sandhiya" })).toBeFocused({
    timeout: 1000,
  });
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("a past event shows a completed message instead of negative countdown values", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2028-01-01T00:00:00Z"));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await openInvitation(page);
  await expect(page.getByText("Our beautiful beginning is here.")).toBeVisible();
  await expect(page.locator(".royal-countdown")).toHaveCount(0);
});

test("the slower opening and wheel glide remain interruptible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.getByRole("button", { name: /Open invitation/i }).click();
  await page.waitForTimeout(900);
  await expect(page.getByRole("region", { name: "Wedding invitation cover" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Opening your invitation/i })).toBeDisabled();
  await expect(page.getByRole("region", { name: "Wedding invitation cover" })).toHaveCount(0, {
    timeout: openingTimeout,
  });

  await page.mouse.move(600, 400);
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(100);
  const early = await page.evaluate(() => scrollY);
  expect(early).toBeGreaterThan(0);
  expect(early).toBeLessThan(250);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(260);

  const zoomPreserved = await page.evaluate(() => {
    const event = new WheelEvent("wheel", {
      deltaY: 100,
      ctrlKey: true,
      cancelable: true,
      bubbles: true,
    });
    document.body.dispatchEvent(event);
    return !event.defaultPrevented;
  });
  expect(zoomPreserved).toBe(true);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(80);
  await page.keyboard.press("Escape");
  const stopped = await page.evaluate(() => scrollY);
  await page.waitForTimeout(350);
  expect(Math.abs((await page.evaluate(() => scrollY)) - stopped)).toBeLessThan(3);
});

test("mobile discovery scrolls gently and reveals the family section", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await openInvitation(page);
  await expect(page.getByRole("heading", { name: "Vignesh Weds Sandhiya" })).toBeFocused();
  const target = await page
    .locator("#families")
    .evaluate((el) => el.getBoundingClientRect().top + scrollY - 25);
  await page.getByRole("link", { name: /Discover our invitation/i }).click();
  await page.waitForTimeout(450);
  const midway = await page.evaluate(() => scrollY);
  expect(midway).toBeGreaterThan(0);
  expect(midway).toBeLessThan(target - 50);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(target - 3);
  await expect(page.locator("#families h2")).toHaveCSS("opacity", "1");
  await page.locator("#wedding").scrollIntoViewIfNeeded();
  await expect(page.locator("#wedding h2")).toHaveCSS("opacity", "1");
});

test("phone doors remain mid-opening after three seconds", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  try {
    await page.goto(process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000");
    await page.getByRole("button", { name: /Open invitation/i }).tap();
    await page.waitForTimeout(3000);
    await expect(page.getByRole("region", { name: "Wedding invitation cover" })).toBeVisible();
    const door = await page.locator(".gate-door-left").evaluate((element) => {
      const style = getComputedStyle(element);
      const matrix = new DOMMatrixReadOnly(style.transform);
      return { degrees: (Math.acos(matrix.m11) * 180) / Math.PI, opacity: Number(style.opacity) };
    });
    expect(door.degrees).toBeGreaterThan(20);
    expect(door.degrees).toBeLessThan(85);
    expect(door.opacity).toBe(1);
    await expect(page.getByRole("region", { name: "Wedding invitation cover" })).toHaveCount(0, {
      timeout: openingTimeout,
    });
    await expect(page.getByRole("heading", { name: "Vignesh Weds Sandhiya" })).toBeFocused();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  } finally {
    await context.close();
  }
});

// The song is optional: without public/audio/idicha-pacharisi.mp3 the site is silent.
const hasSong = existsSync("public/audio/idicha-pacharisi.mp3");
test("tapping the doors opens them slowly and starts the song if one is supplied", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("audio")).toHaveCount(hasSong ? 1 : 0);
  await page.locator(".gate-door-right").click({ force: true });
  await expect(page.getByRole("button", { name: /Opening your invitation/i })).toBeDisabled();
  if (hasSong) await expect(page.locator("audio")).toHaveJSProperty("paused", false);
  await page.waitForTimeout(4000);
  await expect(page.getByRole("region", { name: "Wedding invitation cover" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Wedding invitation cover" })).toHaveCount(0, {
    timeout: openingTimeout,
  });
  await expect(page.locator(".floating-music")).toHaveCount(hasSong ? 1 : 0);
});
