### Test Overview

Testing is based on the [test support provided with Create React App](https://create-react-app.dev/docs/running-tests), which uses the [Jest](https://jestjs.io) test runner.  
All test code is in the `.test.js` files in the `src/` directory, which are named according to which file they are testing.  So, `imdb.test.js` has tests for `imdb.js`.  
To run the tests, after running `npm install`, run `npm test`.  Note that the tests will only pass once you fill in the solutions for the TODOs and add your Firebase and 
TheMovieDB credentials (see `README.md`).

For testing the `MovieDetails` React Component we use [Enzyme](https://airbnb.io/enzyme/) along with some mocking.  The `src/__mocks__` folder contains mock implementations 
of some code.  This is needed since `MovieDetails` queries IMDB and TheMovieDB after loading, and it is hard to test if those AJAX queries are actually running.  Instead, 
the mock functions run and return fake data.  See [this page](https://www.leighhalliday.com/testing-asynchronous-components-mocks-jest) for further details on how the mocking 
and testing work in `MovieDetails.test.js`.

You can show code coverage for the tests by running the following command:
```
./node_modules/.bin/react-scripts test --coverage
```

If things are working properly, after the tests run you'll see output like this:
```
----------------------|----------|----------|----------|----------|-------------------|
File                  |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------------|----------|----------|----------|----------|-------------------|
All files             |     62.5 |    31.25 |    68.75 |    61.45 |                   |
 App.js               |    33.33 |        0 |    33.33 |    30.77 |... 31,235,236,246 |
 MovieDetails.js      |    96.15 |     62.5 |      100 |       96 |               115 |
 MySnackbarContent.js |    42.86 |      100 |        0 |       50 |          49,50,52 |
 SearchResultItem.js  |        0 |      100 |        0 |        0 |            8,9,15 |
 firebase.js          |      100 |      100 |      100 |      100 |                   |
 imdb.js              |      100 |      100 |      100 |      100 |                   |
 index.js             |        0 |      100 |      100 |        0 |     1,2,3,4,5,6,9 |
 setupTests.js        |      100 |      100 |      100 |      100 |                   |
 themoviedb.js        |      100 |      100 |      100 |      100 |                   |
----------------------|----------|----------|----------|----------|-------------------|
```

