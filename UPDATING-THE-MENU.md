# Updating the table menu

The menu guests see after scanning the QR code is read from the **Apricity menus** Google Sheet. Change the sheet and the menu updates by itself. Nothing else needs doing.

**Changes usually appear within 5 minutes.** Google refreshes published sheets on its own schedule. Guests who already have the menu open see the change when they reload.

## The tabs

| Tab | What it controls |
| --- | --- |
| **Drinks** | Cocktails, To start, Soft, Beer & cider, To finish |
| **A la carte** | Bread, Starters, Mains, Sides, Puddings |
| **Tasting** | The courses, the dish choices and the sides |
| **Kids** | The Culinary Kids' tasting menu: courses and dish choices |
| **Tasting prices** | The 5-course, 7-course and kids' prices, and pairing prices |
| **Wine** | The wine list: your existing **apricity_wines** sheet, which also feeds the website. Keep using it exactly as you do now |
| **Chefs table** | Tonight's Chefs' Table courses, one row per course in the order served |
| **Chefs table details** | The Chefs' Table welcome line, date and personal message |

## Everyday changes

**Change a price.** Type the new price in the *Price* column. `18` and `£18` both work.

**Take a dish off for tonight.** Type `no` in its *Show* column. Type `yes` (or clear the cell) to bring it back. Don't delete the row, so it's quick to bring back.

**Add a dish.** Insert a row where you want it to appear and fill in *Section*, *Item*, *Allergens* and *Price*. The menu shows rows in the same order as the sheet.

**Add a new section** (for example "Snacks"). Type the new name in the *Section* column. Sections appear in the order they first appear in the sheet.

**A notice at the top of a menu** (like the Belu water on Drinks). Type `Note` in its *Section* column. It shows as a box at the top of that menu, whatever row it's on, with its *Item*, *Price*, *Price note* and *Description*.

**Something at the top with no heading** (like the bread). Leave its *Section* (or, on the Tasting tab, *Course*) empty and put the row first. It shows above the first section, with no heading and no button.

**Allergens.** Use the codes from the printed menu, separated by commas, for example `P-B, Mu`. Any dish with `P-B` appears when guests turn on the *Plant-based* filter.

## Setting up the Chefs' Table for a booking

1. In **Chefs table details**, type the date (for example `Saturday 24th October`) and the guests' message (for example `HAPPY 50th BIRTHDAY NICK!`). Leave *Message* blank for no message.
2. In **Chefs table**, list tonight's courses in the order they're served, one per row. Add allergen codes if you have them; the allergen key then appears automatically.
3. After the booking, clear the message so the next guests don't see it.

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
| Add to 5-course | For a 7-only course that 5-course guests can add, the price. The 5-course menu then shows that course in full, labelled *Optional · £8 extra* | 8 |
| Description, Price | Only for priced extras: the bread and the *Add on the side* rows. Priced rows above the first course show before the courses; those below the last course show after the pairings | £8 |
| Show | `no` to hide | yes |

**Kids**: the same columns as *Tasting*. Usually only *Course*, *Dish*, *Allergens* and *Show* are filled in.

**Tasting prices**: one row per menu, with columns *Menu*, *Price*, *Lunch & early evening*, *Wine pairing*, *Non-alcoholic pairing*, *Pairing glasses* and *Note*. The kids' row must have "Kids" somewhere in its *Menu* name (for example `Culinary Kids`), and its *Note* shows under the price (for example `Up to age 12`).

**Wine** (the existing *apricity_wines* sheet): one row per wine. *Section* is `By the Glass` or `Bottles`, *Subsection* is the style heading (for example `Red — Soft & Juicy`), and *Unique Expression (♢)* is `yes` for the marked wines. *Glass Price (£)* and *Glass Size* are only for wines that are also sold by the glass from a bottle, like the sweet wines. To take a wine off, delete its row, as you do now. (If you'd rather hide wines than delete them, add a *Show* column and type `no`; the table menu understands it.)

## Please don't

- Rename or reorder the column headings in row 1.
- Rename the tabs.
- Unpublish the sheet (File → Share → Publish to web). The menu stops loading if you do.

If the menu shows "The menu didn't load", check that the sheet is still published, then reload the page.
