import { chromium, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir(".qa", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto(process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000");
await page.evaluate(() => document.fonts.ready);
await page
  .locator(".gate-art img")
  .first()
  .evaluate((element) => (element as HTMLImageElement).decode());
await page.screenshot({ path: ".qa/invitation-cover-final.png" });
await page.getByRole("button", { name: /Open invitation/i }).click();
await expect(page.getByRole("article")).toHaveCSS("opacity", "1");
await expect(page.getByRole("region", { name: "Wedding invitation cover" })).toHaveCount(0, {
  timeout: 10000,
});
await page.locator(".hero-art img").evaluate((element) => (element as HTMLImageElement).decode());
for (
  let y = 0;
  y < (await page.locator("body").evaluate((element) => element.scrollHeight));
  y += 700
) {
  await page.evaluate((value) => window.scrollTo({ top: value, behavior: "instant" }), y);
  await page.waitForTimeout(200);
}
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.waitForTimeout(900);
await page.screenshot({ path: ".qa/invitation-details-final.png", fullPage: true });
await page.setViewportSize({ width: 375, height: 812 });
await page.evaluate(() => sessionStorage.removeItem("vignesh-sandhiya:temple-invitation:v2"));
await page.reload();
await page.evaluate(() => document.fonts.ready);
await page
  .locator(".gate-art img")
  .first()
  .evaluate((element) => (element as HTMLImageElement).decode());
await page.screenshot({ path: ".qa/invitation-cover-mobile.png" });
await page.getByRole("button", { name: /Open invitation/i }).click();
await page.getByRole("heading", { name: "Vignesh Weds Sandhiya" }).waitFor();
await expect(page.getByRole("region", { name: "Wedding invitation cover" })).toHaveCount(0, {
  timeout: 10000,
});
await page.locator(".hero-art img").evaluate((element) => (element as HTMLImageElement).decode());
for (
  let y = 0;
  y < (await page.locator("body").evaluate((element) => element.scrollHeight));
  y += 650
) {
  await page.evaluate((value) => window.scrollTo({ top: value, behavior: "instant" }), y);
  await page.waitForTimeout(200);
}
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.waitForTimeout(900);
await page.screenshot({ path: ".qa/invitation-mobile-hero.png" });
await page.screenshot({ path: ".qa/invitation-mobile-final.png", fullPage: true });
await browser.close();
console.log("Captured invitation cover, single-card details, and mobile view.");
