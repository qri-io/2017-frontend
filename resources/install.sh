#!/bin/bash

# https://stackoverflow.com/a/24067243
function version_gt() { test "$(printf '%s\n' "$@" | sort -V | head -n 1)" != "$1"; }

path=$(which qri)

if [ $path ]
then
  current=$(qri version -c)
  latest=$(./qri version -c)
  if version_gt $latest $current; then
    cp ./qri $path
  fi
else
  path='/usr/local/bin/qri'
  cp $BINARY_PATH /usr/local/bin/
fi

echo $path