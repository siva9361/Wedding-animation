# Vignesh & Sandhya — Wedding Invitation

One mobile-friendly page: a gold temple entrance, couple names, family details, countdown, wedding and reception dates, and venue links.

## Run

```powershell
bun install --frozen-lockfile
bun run dev --port 3001
```

Open http://127.0.0.1:3001. Reuse an existing dev server if one is already running.

```powershell
bun run build
bun run start --port 3001
```

## Invitation details

Edit **src/lib/wedding-config.ts**.

- Groom: **N. விக்னேஷ்**, B.E. (Mech.)
- Bride: **S. சந்தியா**, B.C.A.
- Reception: **12 November 2026, 6–7 PM** — காயத்ரி ஹோட்டல், திருப்பூர் ரோடு, காங்கயம்.
- Wedding: **13 November 2026, 4:45–5:45 AM** — ஸ்ரீ பொன் அழகு நாச்சியம்மன் திருக்கோவில், வெள்ளியச்சல்.

Dates and times use Indian Standard Time. Map buttons search the venue names and addresses from the supplied invitation.

## Add the two photos

Matching gold arched frames show the groom's and bride's initials until their photos are supplied. To replace the placeholders, add **public/images/groom.jpg** and **public/images/bride.jpg**, then set each person's `photo` in **src/lib/wedding-config.ts**:

```ts
// In groom:
photo: { src: "/images/groom.jpg", alt: "விக்னேஷ்", position: "50% 35%" },
// In bride:
photo: { src: "/images/bride.jpg", alt: "சந்தியா", position: "50% 35%" },
```

The optional `position` controls the crop. Portrait images load when near the viewport.

## Performance and accessibility

- One content route: `/`. Old demo routes return 404.
- The doors open gradually over 3.2 seconds, or 80 ms with reduced motion. The artwork and names fade into view.
- Sections reveal once with a soft 1.2-second fade and gentle upward movement using native IntersectionObserver and CSS.
- Mouse-wheel scrolling eases into place; the discovery link glides to the family section over 2 seconds on desktop and mobile. Touch swipes, keyboard navigation, pinch zoom, and reduced-motion scrolling retain native behavior. Any new touch or navigation key interrupts a running glide.
- No external animation library or petal effects. Animation frames stop when scrolling settles or the page becomes hidden.
- Only two optimized artwork files are served: the portal and mandap, totaling 671,000 bytes before responsive image optimization.
- Countdown uses a native IntersectionObserver and pauses offscreen or in a hidden tab.
- Session storage remembers opening; replay and keyboard focus work without storage.

The old demo source, stock imagery, unused illustrations, and original PNG files were removed from the active project. A local recovery copy is in ignored **.qa/cleanup-before.zip**. Artwork provenance and generation prompts remain in **ASSETS.md**.

## Verify

```powershell
bun run typecheck
bun run build
```

With the server running:

```powershell
$env:PLAYWRIGHT_BASE_URL = "http://127.0.0.1:3001"
bun run test:e2e
bun run scripts/capture-invitation.ts
```

Browser checks cover the one-page opening, actual Tamil details, two portrait frames and absence of removed sections, 320–3840 px layouts, old route removal, reduced motion, blocked storage, and completed countdowns. Screenshots are saved under ignored **.qa/**.
