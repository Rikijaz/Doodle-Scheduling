#!/bin/bash

echo "Running all tests."

npm install

cd doodle_scheduling/src/components/

npm test AddEvent.test.js