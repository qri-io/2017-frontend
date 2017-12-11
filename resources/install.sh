#!/bin/bash

# https://stackoverflow.com/a/24067243
function version_gt() { test "$(printf '%s\n' "$@" | sort -V | head -n 1)" != "$1"; }

path=$(which qri)

if [ $path ]
then
  current=$(qri version -c)
  latest=$(./qri version -c)
  if version_gt $latest $current; then
    # echo "updating qri at path ${path} from  ${current} to ${latest}"
    cp ./qri $path
  fi
else
  # echo "installing qri to /usr/local/bin/qri"
  path='/usr/local/bin/qri'
  cp ./qri /usr/local/bin/qri
fi

echo $path