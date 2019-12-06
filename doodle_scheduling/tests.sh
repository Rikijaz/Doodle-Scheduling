#!/bin/bash

echo "Running tests."

echo "Installing dependencies."

npm install

echo "Dependencies installed."

echo "Running all tests."

cd doodle_scheduling/src/components/

find src/components -type f -name \*.test.js | while read line; do
    echo "Testing' $line'"
    npm test $line || continue
done

echo "Ran all tests."
