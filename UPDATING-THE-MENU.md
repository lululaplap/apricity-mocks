# Updating the table menu

The menu guests see after scanning the QR code is read from the **Apricity menus** Google Sheet. Change the sheet and the menu updates by itself. Nothing else needs doing.

**Changes usually appear within 5 minutes.** Google refreshes published sheets on its own schedule. Guests who already have the menu open see the change when they reload.

## The tabs

| Tab | What it controls |
| --- | --- |
| **Drinks** | Cocktails, To start, Soft, Beer & cider, To finish |
| **A la carte** | Bread, Starters, Mains, Sides, Puddings |
| **Tasting** | The courses, the dish choices and the sides |
| **Tasting prices** | The 5- and 7-course prices and pairing prices |
| **Wine** | The wine list (your existing wine sheet) |

## Everyday changes

**Change a price.** Type the new price in the *Price* column. `18` and `£18` both work.

**Take a dish off for tonight.** Type `no` in its *Show* column. Type `yes` (or clear the cell) to bring it back. Don't delete the row, so it's quick to bring back.

**Add a dish.** Insert a row where you want it to appear and fill in *Section*, *Item*, *Allergens* and *Price*. The menu shows rows in the same order as the sheet.

**Add a new section** (for example "Snacks"). Type the new name in the *Section* column. Sections appear in the order they first appear in the sheet.

**Allergens.** Use the codes from the printed menu, separated by commas, for example `P-B, Mu`. Any dish with `P-B` appears when guests turn on the *Plant-based* filter.

## Column guide

**Drinks** and **A la carte**

| Column | What to type | Example |
| --- | --- | --- |
| Section | The heading the dish sits under | Starters |
| Item | The dish or drink | Roasted Sussex carrot, vadouvan, carrot top pesto, Bombay mix |
| Description | Optional second line | Pickled pine vodka, dry vermouth |
| Allergens | Allergen codes | P-B, Mu |
| Price | The price | £17 |
| Price note | Optional small line under the price | main £49 |
| Section note | Optional note beside the heading (fill in once per section) | 50ml |
| Show | `no` to hide | yes |

**Tasting**

| Column | What to type | Example |
| --- | --- | --- |
| Course | The course name | Second starter |
| Dish | One choice for that course | Cured chalk stream trout, greengage, crème fraîche, bergamot |
| Allergens | Allergen codes | F, D |
| Supplement | Extra charge for this choice | 14 |
| Courses | `Both`, or `7 only` for courses served only on the 7-course menu | 7 only |
| Add to 5-course | For a 7-only course that 5-course guests can add, the price | 8 |
| Description, Price | Only for the *Add on the side* rows (bread and sides) | £8 |
| Show | `no` to hide | yes |

**Tasting prices**: one row per menu, with columns *Menu*, *Price*, *Lunch & early evening*, *Wine pairing*, *Alcohol-free pairing* and *Pairing glasses*.

## Please don't

- Rename or reorder the column headings in row 1.
- Rename the tabs.
- Unpublish the sheet (File → Share → Publish to web). The menu stops loading if you do.

If the menu shows "The menu didn't load", check that the sheet is still published, then reload the page.
