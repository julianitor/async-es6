// Generators don't execute for themselves, so this function return a function that runs a generator
// We need a function that:
//    I. starts up the generator.
//    II. resolves the promise
//    III. keep executing generator.next() to follow the workflow
function run(makeGenerator) {
  return function() {
    var generator = makeGenerator.apply(this, arguments);
    var handle = function(p) {
      // if we're done, get out and give me the value
      if (p.done) return p.value;
      // if not, then II. resolve the promise
      return p.value.then(function(v) {
        // III. keep executing the generator
        return handle(generator.next(v));
      });
    }
    // I. start up the generator
    return handle(generator.next());
  }
};

//this function returns a native promise, which will be resolved after delay ms
function getAsyncValuePromise(initVal, delay) {
  delay = parseInt(delay, 10);
  return new Promise(function(suc, err) {
    setTimeout(function() { suc(initVal*2); }, delay);
  });
};

//here we define the generator, that yields every promise in the returned array
function* resolveAsyncValues(valuesArray) {
  var acc = [];
  for(var i = valuesArray.length; i--;) {
    var v = valuesArray[i];
    acc[i] = yield getAsyncValuePromise(v, v*100);
  }
  return acc;
};

//we return a function that runs the generator
var getValuesFromGenerator = run(resolveAsyncValues);

//function that runs a generator function, which consumes the first function that invokes the first generator
var go = run(function*() {
  var valuesArray = [1, 2 , 3, 4, 5, 6, 7];
  var asyncValues = yield getValuesFromGenerator(valuesArray);
  console.log(asyncValues);
});

//go!
go();
