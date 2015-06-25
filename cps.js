//function that returns function, called n times will call cb
function nTimes(n, cb) {
  //n and cb get clausured
  return function() {
    if (--n === 0) cb();
  }
}

//mock an asyncValue function that returns transformed initial value initVal after delay ms as parameter in callback
function getAsyncValue(initVal, delay, cb) {
  delay = parseInt(delay, 10);
  setTimeout(cb.bind(null, initVal*2), delay);
};

//function that tries to call a callback function after all async values has been resolved
function resolveAsyncValues(valuesArray, cb) {
  //we're going to build an array to store all asyncValue functions, and another to store all results
  var acc = [];
  //we're going to create a middle callback to pass it to getAsyncValue function
  var myCb = nTimes(valuesArray.length, cb.bind(null, acc))
  //now we dont want cb to be called until we get all results from async ops
  for(var i = valuesArray.length; i--;) {
    var v = valuesArray[i];
    getAsyncValue(v, v*100, function(asyncValue) {
      acc.push(asyncValue);
      myCb();
    })
  }
}

function go() {
  //lets mock some simple values
  var valuesArray = [1, 2 , 3, 4, 5, 6, 7];
  resolveAsyncValues(valuesArray, function(asyncValues) {
    //and when you resolve all of them, print the result
    console.log(asyncValues);
  })
}

//go!
go();
