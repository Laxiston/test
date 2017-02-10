// use the should.js assertion library in all backend unit tests
import should from 'should';

// Import unit tests files (found in __tests__ folders and suffixed by -test.js)
var testsContext = require.context('./src/server', true, /-test\.js$/);
testsContext.keys().forEach(testsContext);
