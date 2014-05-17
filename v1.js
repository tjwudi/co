/**
 * co v1 
 * @type {function}
 */

module.exports = co;

function co(fn) {
  var isGenFn = isGeneratorFunction(fn);

  return function() {
    if (!isGenFn) {
      return fn.apply(this, Array.prototype.slice(arguments));
    }

    var gen = fn();
    (function next(err, result) {
      var ret = gen.next(result);

      if (ret.done) {
        // `fn` finished running
        next(null);
        return;
      }

      if (isPromise(ret.value)) {
        return ret.value.then(function(res) {
          next(null, res);
        });
      }

      throw new Error('yield a promise');
    })();
  }
}

function isGeneratorFunction(fn) {
  return fn && fn.constructor && fn.constructor.name === 'GeneratorFunction';
}

function isPromise(obj) {
  return obj && obj.then;
}