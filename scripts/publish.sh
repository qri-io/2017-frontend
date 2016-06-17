#!/bin/bash

PWD=$(pwd)
SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd "$SCRIPT_DIR/../"

npm test -- -R min || { exit 1; }
npm run build || { exit 1; }
node scripts/upload || { exit 1; }

cd "${DIR}"