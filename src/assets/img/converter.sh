#!/bin/bash

svgr -d . . --single-quote
sed -e 's/id="Layer_1"//' -i *.js
sed -e '/<title>.*<\/title>/d' -i *.js
sed -e 's/  viewB/ viewB/' -i *.js

for f in *.js; do
mv "$f" "$(basename "$f" .js).jsx"
done

rm -rf *.js
