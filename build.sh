#!/bin/sh
# Wraps src/menu.html (the hosted-preview source) into standalone pages:
#   index.html        the table menu
#   chefs-table.html  the Chefs' Table menu (same page, chefs-table mode); src/chefs-table.html is its preview source
cd "$(dirname "$0")"
sed -e 's#<meta name="apricity-menu" content="main">#<meta name="apricity-menu" content="chefs-table">#' \
    -e "s#<title>Apricity Table Menu</title>#<title>Apricity Chefs’ Table</title>#" src/menu.html > src/chefs-table.html
wrap() {
  printf '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
  printf '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%%}[hidden]{display:none!important}</style>\n</head>\n<body>\n'
  cat "$1"
  printf '\n</body>\n</html>\n'
}
# The live pages read the menus straight from published Google Sheets (File → Share → Publish to web,
# then each tab's .csv link). A tab left empty here keeps reading its copy in sheets/.
# MENUS is the "Apricity menus" sheet's published link up to "/pub"; the numbers are each tab's gid.
MENUS=''
DRINKS_GID='' ALACARTE_GID='' TASTING_GID='' TASTING_PRICES_GID='' KIDS_GID='' CHEFS_GID='' CHEFS_DETAILS_GID=''
# The wine list is the restaurant's own published "apricity_wines" sheet.
WINE_CSV='https://docs.google.com/spreadsheets/d/e/2PACX-1vSH5PMPgMOSJTzJ3FnKJmZxY3lI0loTNugZsmD6_U7PeT4LHiYJY75BtW-mFIgpeVbuDoZ8x724M6i1/pub?gid=652214147&single=true&output=csv'
# Point each sheet at its live link (sed needs "&" escaped in the replacement).
url() { [ -n "$MENUS" ] && [ -n "$1" ] && echo "$MENUS/pub?gid=$1&single=true&output=csv"; }
live() {
  set -- drinks drinks.csv "$(url "$DRINKS_GID")" alacarte alacarte.csv "$(url "$ALACARTE_GID")" \
    tasting tasting.csv "$(url "$TASTING_GID")" tastingPrices tasting-prices.csv "$(url "$TASTING_PRICES_GID")" \
    kids kids.csv "$(url "$KIDS_GID")" chefs chefs-table.csv "$(url "$CHEFS_GID")" \
    chefsDetails chefs-table-details.csv "$(url "$CHEFS_DETAILS_GID")" wine wine.csv "$WINE_CSV"
  script=""
  while [ $# -gt 0 ]; do
    [ -n "$3" ] && script="$script
s#$1: \"sheets/$2\"#$1: \"$(printf %s "$3" | sed 's/&/\\\&/g')\"#"
    shift 3
  done
  sed "$script"
}
wrap src/menu.html | live > index.html
wrap src/chefs-table.html | live > chefs-table.html
