#!/bin/sh
# Wraps src/menu.html (the hosted-preview source) into a standalone index.html.
cd "$(dirname "$0")"
{
  printf '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
  printf '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%%}[hidden]{display:none!important}</style>\n</head>\n<body>\n'
  sed 's#src="dishes.jpg"#src="src/dishes.jpg"#' src/menu.html
  printf '\n</body>\n</html>\n'
} > index.html
