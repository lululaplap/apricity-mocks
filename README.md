# Apricity table menu mockup

A phone-first menu that guests open by scanning the QR code on their table.

- `index.html`: open it in a browser (or a phone-sized dev-tools window). Add `?table=12` to the URL to see how a table-specific QR code works.
- `src/menu.html`: the source used for the hosted preview. Edit it, then run `./build.sh` to regenerate `index.html`.

## Content

All menu content is copied from apricityrestaurant.com (captured 25 Oct 2026): the menus intro, the à la carte, tasting and drinks menus, the allergen key and trace warning, the 13.5% 'Apriciation' note, the 50p School Food Matters donation and the Belu water note.

The wine list (149 wines: by the glass and bottles, with ♢ "unique expression" markers, grapes, regions and sweet-wine glass prices) was extracted from a saved copy of the website's wine-list page.

Not included yet:
- **Culinary Kids menu.** It's linked from the Menus page, but its content wasn't supplied.

## Visual style

- The site's peach (#F9C6BA) everywhere, with black text and thin black rules. No teal, no photo, no intro paragraphs.
- Josefin Sans, the fallback font the website itself names after Brandon Grotesque (a licensed font).
- Selected tabs are underlined, as in the site's navigation. Selected chips and buttons are filled black.
- Dark mode is a warm dark brown with peach text.

## User flow

```mermaid
flowchart LR
  QR[Scan table QR<br/>?table=12] --> D[Drinks]
  D <--> W[Wine]
  D <--> A[A la carte]
  A <--> T[Tasting]
  D -->|end of list: Food menu →| A
  A -->|end of list: Drinks →| D
```

1. **Scan → Drinks.** No landing page. Guests usually order drinks first, so the QR code opens straight on the drinks list.
2. **Food is one tap away.** The header always shows four tabs: *Drinks · Wine | A la carte · Tasting*. Drinks are on the left and food on the right. The end of each drinks list has a large "Food menu →" button, and each food list ends with "Drinks →".
3. **Find the section.** Chips under the tabs jump to sections (Cocktails, To start, Soft…). The chip for the section on screen is highlighted as the guest scrolls.
4. **Wine.** By the glass first, then bottles by style. The chips cover both.
5. **Food.** One short allergy line at the top and a Plant-based filter chip (remembered on the phone). Allergen codes sit beside each dish. The full key is folded away under "Allergen key" at the bottom.
6. **Tasting.** Two buttons (5 courses £85 / 7 courses £99, with the lunch & early-evening prices) switch the course list and the pairing prices together.
7. **Back button** moves between tabs.

## What was cut for clarity

Welcome screen, hero photo, menu intro paragraphs, the long Apriciation and School Food Matters paragraphs (now one line), the non-alcoholic pairing description and spirits blurb, the "♢ unique only" wine filter and the teal bands.
