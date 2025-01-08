#!/usr/bin/env sh
set -e

npm run build

cd dist

git init
git add *
git commit -m "new deployment"

git push -f git@github.com:Hisham-Echo/ALRadwan.git master:gh-pages

cd -
