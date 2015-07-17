var Q = require('q');

//this function returns a promise, which will be resolved after delay ms
function getAsyncValuePromise(initVal, delay) {
  var defer = Q.defer();
  delay = parseInt(delay, 10);
  setTimeout(defer.resolve.bind(defer, initVal*2), delay);
  return defer.promise;
}

//this function also return a promise, which will be resolved when all promises have been resolved
function resolveAsyncValues(valuesArray) {
  var promises = valuesArray.map(function(v, k) {
    return getAsyncValuePromise(v, v*100);
  });
  return Q.all(promises);
}

function go() {
  var valuesArray = [1, 2 , 3, 4, 5, 6, 7];
  //we get the resolution value of the async ops over valuesArray in asyncValues
  resolveAsyncValues(valuesArray).then(function(asyncValues) {
    //the resolution value of the promise is the array
    console.log(asyncValues);
  });
}

//go!
go();
