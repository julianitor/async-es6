//this function returns a native promise, which will be resolved after delay ms
function getAsyncValuePromise(initVal, delay) {
  delay = parseInt(delay, 10);
  return new Promise(function(suc, err) {
    setTimeout(function() { suc(initVal*2); }, delay);
  });
};


function resolveAsyncValues(valuesArray) {
  var promises = [].map.call(valuesArray, function(v, k) {
    return getAsyncValuePromise(v, v*100);
  });
  return Promise.all(promises);
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
