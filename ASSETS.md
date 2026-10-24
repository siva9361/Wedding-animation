# Original artwork and reference

The visual direction comes from the user-supplied public reel:
https://www.instagram.com/reel/Dc1IWvQh_dE/

Reference frames were inspected for composition only and retained under ignored .qa/reference/. No reel screenshots, extracted artwork, or soundtrack are part of the active website.

## Project assets

The temple illustrations were created with the **built-in image_gen tool**, then copied into this workspace. Sharp performs PNG-to-WebP format optimization without changing the artwork.

| Asset                                  | Use                                                            |
| -------------------------------------- | -------------------------------------------------------------- |
| public/images/temple-portal.webp       | Full-height temple-door opening                                |
| public/images/wedding-homa-mandap.webp | Active hero: wedding mandap with sacred fire and homa kundam   |
| public/images/temple-mandap.webp       | Earlier ivory mandap illustration, retained but unused         |
| public/images/vinayagar.webp           | Original Vinayagar symbol from the supplied printed invitation |

The active hero artwork, **public/images/wedding-homa-mandap.webp**, is 1024 × 1536 and 363,314 bytes, generated with the built-in image_gen tool on 23 October 2026 and optimized with Sharp at WebP quality 88. It contains a decorated wedding setting with a prominent homa kundam and sacred fire. The active portal and hero artwork total 750,184 bytes. next/image serves responsive variants. Earlier PNG originals and the removed blessings illustration are retained in the local recovery ZIP, .qa/cleanup-before.zip.

The active wedding mandap artwork contains no people. The individual groom and bride portraits are the actual photos supplied by the user on 23 October 2026. Originals are preserved as assets/photos/groom.png and assets/photos/bride.png. Their optimized public/images/groom.webp and public/images/bride.webp versions preserve the original dimensions and transparency; no retouching was applied. Run bun scripts/optimize-portraits.ts to regenerate the WebP copies. The portraits are configured in invitation.groom.photo and invitation.bride.photo. Each photo has a `crop` box (source pixels) so both portraits show the same head-to-waist framing, shoulder width and eye line; the bride photo is full-length, so it is shown zoomed in. Re-measure the crops if either photo is replaced.

The couple's wedding photo, supplied by the user on 23 October 2026, replaces the earlier hand-drawn family illustration beside the welcome verses. The original is preserved as assets/photos/couple.png (1024 × 1536); public/images/couple.webp is shown uncropped with its full mandap background. bun scripts/optimize-portraits.ts regenerates it with the portraits.

The user-supplied printed invitation is preserved as **assets/invitation-reference.jpg**. **scripts/extract-invitation-art.ts** crops its original Vinayagar symbol into a lossless WebP without redrawing it. CSS blends the white background with the page and gives the opening-cover copy a warm gold appearance. The eleven family welcome verses and Tamil wedding note are transcribed from this card in **src/lib/wedding-config.ts**. The separate invitation heading and date banner were removed at the user's request. Printer contact details and decorative borders are not used on the website.

## Final generation prompt set

### Temple portal

Create a premium cinematic South Indian Hindu wedding invitation background illustration, portrait 1024x1536. Full bleed front-facing symmetrical ornate antique GOLD Tamil temple doorway, exquisitely carved gold columns along left and right edge, scalloped carved gilded lintel arch across upper fifth, deep burgundy carved double wooden doors closed meeting exactly in center. Warm amber brass material, dramatic dark ruby maroon center. Small jasmine and mango-leaf toran draped neatly beneath top arch, hanging brass oil lamps at upper side edges, two tall lit kuthuvilakku brass lamps standing bottom corners, tiny flower offering bowls at bottom corners, fine white kolam at threshold. Center 60 percent width between y=32 percent and y=78 percent is dark rich burgundy relatively plain negative space to overlay website invitation text later. Highly detailed dimensional temple craftsmanship, elegant luxury invitation art, painterly photoreal 3D rendered aesthetic, coherent lighting with no overexposure. Entire asset is artwork for a website, NOT a photograph of a phone, no device, no hands, no environment outside doorway, no text, no letters, no logo, no watermark.

### Ivory mandap

Original high-end South Indian wedding invitation illustration background, portrait 1024x1536, warm ivory parchment, gold and muted sage palette. Upper 55 percent of the canvas is almost completely empty luminous warm ivory for live wedding names and typography overlay. A delicate antique gold carved temple pillar peeks in from each far side edge, architectural carved arch hints ONLY at extreme upper corners. The bottom 40 percent shows a beautifully illustrated traditional Tamil Hindu wedding mandap on stone steps, decorated with flowing jasmine garlands and marigolds, two banana trees with graceful green leaves flanking it, brass oil lamps and flower bowls, distant small temple gopuram against a glowing morning sky. At the center bottom beneath the mandap is a very small respectfully illustrated bride in deep red silk saree and groom in ivory veshti seated with a priest before sacred fire, all tiny figures without identifiable facial features, atmospheric original wedding illustration, finely detailed painterly luxury invitation art. Seamlessly fades upward into totally clear ivory sky with no hard box edges. No writing, no English or Tamil text, no typography, no watermark, no photo frame, no device or hands.

### Temple blessings (removed from the active site)

Original cinematic illustration for a Tamil wedding invitation, portrait 1024x1536. View from behind a South Indian bride and groom standing together in a magnificent ancient Tamil stone temple corridor, distant sanctum glowing warm amber. Bride wears a deep maroon-red silk saree with antique gold border, beautiful long dark braid adorned with a graceful white jasmine garland. Groom wears a cream shirt and ivory veshti with gold border. Their faces are not visible, they are anonymous illustrative figures, not portraits of actual people. Dense gold temple carvings and warm oil lamps near side edges, romantic drifting white jasmine petals. Frame the couple centered in the lower third, occupying y=45 to 85 percent. Upper third is moody dark golden-brown temple architecture with usable shadow area for a heading. Fine glowing brass details and strong deep brown contrast, luxurious cinematic painterly-realism, original image, no text, no logos, no watermark, no hands holding phone, no UI.

The small mappillai-and-ponnu cartoon above "The Wedding" heading is a hand-drawn SVG in src/components/wedding/couple-cartoon.tsx: a groom in silk shirt, veshti and angavastram and a bride in a red silk saree with a jasmine braid, both garlanded and holding hands. It is illustrative and not a likeness of the couple.

The family's floral invitation card, supplied by the user on 24 October 2026, is preserved as assets/floral-invitation-reference.png (1066 × 1599). scripts/extract-floral-art.ts cuts its four watercolor corners and the cartoon couple into public/images/floral-top-left.webp, floral-top-right.webp, floral-bottom-left.webp, floral-bottom-right.webp and floral-couple.webp. The card paper becomes transparency, card text is masked out, and edges are feathered; the artwork is not redrawn. The Our Families section uses these pieces on matching paper (#f8f6ef).

No music is bundled. The site plays public/audio/idicha-pacharisi.mp3 when the family supplies it; use a track you have the right to play.

The Mecatronix logo, supplied by the user on 24 October 2026, is preserved as assets/mecatronix-logo.png. scripts/optimize-logo.ts turns its black background into transparency, trims it and saves public/images/mecatronix-logo.webp for the "Designed & crafted by MECATRONIX" credit at the bottom of the page.

## Typography and decorative elements

Cormorant Garamond, Noto Sans Tamil, and Manrope are optimized and self-hosted by next/font/google. Native SVG garlands and dividers and CSS jasmine petals are original code-based decoration.

Earlier stock images and garland artwork are preserved but unused in the redesigned site. Their earlier source information is retained in legacy/.

The family-at-home picture in the "With love, from all of us" section is a hand-drawn SVG illustration in src/components/wedding/family-home.tsx (smiling grandparents, parents and two children in front of a traditional Tamil house). It does not depict real family members.
