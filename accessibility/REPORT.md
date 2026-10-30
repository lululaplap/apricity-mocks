# Accessibility comparison: current website vs new table menu

Audited 26 October 2026. The new menu passes every automated WCAG 2.2 AA check on all five screens. The current website's wine list fails the contrast check 293 times and has no headings.

Older guests are a key audience, so the new menu also meets a stricter floor than the standard requires: no text under 14px, no thin lettering, contrast of at least 6.7:1 and tap targets of at least 44px.

## Headline comparison

Measured on a 390px-wide phone screen. Website sizes are what a guest actually sees: the Wix mobile site is laid out at 320px and scaled up, so its CSS sizes are multiplied by 1.22.

| Measure | Current website (wine list) | New menu |
| --- | --- | --- |
| Main (median) text size | 15.8px | 17px |
| Smallest text | 12.2px | 14px |
| Text under 16px | 100% | 10–49% (notes, allergen codes, wine details) |
| Text in a thin (light) weight | 71% | 0% |
| Lowest text contrast (WCAG minimum 4.5:1) | 3.56:1 | 6.72:1 |
| Text below 4.5:1 contrast | 41% | 0% |
| Automated WCAG 2.2 AA failures (axe-core) | 293 contrast, 3 links with no name | None |
| axe best-practice issues | No main heading, no main landmark, content outside landmarks | None |
| Headings a screen reader can jump between | None in the wine list | One per menu and per section |
| Links and buttons smaller than 24px (WCAG 2.2 AA minimum) | 19 of 23 | 0 |
| Links and buttons smaller than 44px (WCAG AAA, Apple guidance) | 21 of 23 | 0 |
| Making text bigger | Pinch to zoom | *Larger text* button (115%, 132%), remembered; pinch zoom also works |

## New menu before and after the fixes

| Screen | Smallest text | Lowest contrast | Thin text | Targets under 44px | axe issues (AA and best practice) |
| --- | --- | --- | --- | --- | --- |
| Start page | 13px → 14px | 4.47 → 6.72 | 100% → 0% | 0 → 0 | 3 → 0 |
| Drinks | 11px → 14px | 4.47 → 6.72 | 41% → 0% | 10 → 0 | 3 → 0 |
| Wine list | 11px → 14px | 4.47 → 6.72 | 77% → 0% | 15 → 0 | 16 → 0 |
| A la carte | 11px → 14px | 4.47 → 6.72 | 34% → 0% | 12 → 0 | 21 → 0 |
| Tasting | 11px → 14px | 4.47 → 6.72 | 41% → 0% | 10 → 0 | 26 → 0 |

What changed to get there:
- Secondary text darkened from `#5F5A59` (4.47:1, just under the minimum). Colours now follow the website: black main text (13.8:1), its dark grey `#3A3A3A` (7.48:1) and `#414141` (6.72:1) in place of its light grey `#6A6A6A` (3.56:1, which fails). Headings and the logo are black.
- No text under 14px; body text 17px; every weight regular or heavier.
- Tabs, section buttons and links at least 44px tall and wide.
- A *Larger text* button on the start page and at the end of every menu.
- Allergen codes read in words by screen readers ("plant-based; contains mustard"); the allergy note links to the code key.
- A main heading for each menu, the start page marked as main content, menu tabs marked with `aria-current`, focus moved to the menu title after switching, and loading and error messages announced.
- A fade at the edge of the section buttons shows there are more to scroll to.

## Why this matters for older guests

- **Eyesight.** Reading small print up close gets harder with age, and contrast sensitivity falls, especially in a softly lit dining room.
- **Making text bigger.** Many guests don't know they can pinch to zoom, and a zoomed page scrolls sideways. The *Larger text* button is on the first screen.
- **Hands.** 44px targets mean a less steady tap still lands.
- **Fewer things to work out.** The four menus are always visible as named tabs, not behind a menu icon.

## Method

- **Tools:** [axe-core](https://github.com/dequelabs/axe-core) 4.10.2 with the WCAG 2.0, 2.1 and 2.2 A/AA rules plus best practice, run in Chromium through Playwright, emulating a 390×844 touch phone.
- **Own measurements:** every visible piece of text (size, weight, contrast against its background) and every link and button (size). See `audit.js`.
- **Current website:** a saved copy of the Wine List page (apricityrestaurant.com/wine-list, 25 Oct 2026), the only menu page available in full. The wine list itself sits in an embedded frame, measured separately (`results/website-wine-list-frame.json`). The other menu pages were only available as PDFs, so they weren't audited.
- **New menu:** all five screens (start page, Drinks, Wine list, A la carte, Tasting), before and after the fixes. It was also checked at 320px wide with text at its largest: no sideways scrolling.

## Limitations

- Automated checks find only part of what affects real people. The next step is to try the menu with a few regular older guests, and with VoiceOver (iPhone) and TalkBack (Android).
- For the website's page around the wine list, our own contrast figure (1.52:1) is not reliable. Wix paints backgrounds on separate layers that the measurement can't see. axe-core, which handles this, found no contrast failures there, so only its result is used for that part of the page.
- The saved website copy isn't in this repo, because it embeds the site's font files, which may be licensed.

## Files

| File | What it is |
| --- | --- |
| `audit.js` | The audit script |
| `results/website-wine-list-page.json` | Current website, Wine List page |
| `results/website-wine-list-frame.json` | Current website, the embedded wine list |
| `results/new-menu-before-fixes.json` | New menu before the accessibility fixes |
| `results/new-menu-after-fixes.json` | New menu after the fixes |

## Running it again

```
cd accessibility
npm install
npx playwright install chromium
python3 -m http.server 8765 --directory .. &
node audit.js http://127.0.0.1:8765/ new-menu home drinks wine alacarte tasting > results/new-menu-after-fixes.json
```

For a saved Wix page, pass its file path, and set `SCALE=1.219` so sizes match a 390px phone. For the embedded wine list, also set `WIDTH=280`.
