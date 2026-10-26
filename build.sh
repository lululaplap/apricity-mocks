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
wrap src/menu.html > index.html
wrap src/chefs-table.html > chefs-table.html
