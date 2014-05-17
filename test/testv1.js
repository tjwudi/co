"use strict";

var co = require('../v1'),
    Q = require('q');

function runAsyncTask(id) {
  var deferred = Q.defer();
  setTimeout(function() {
    deferred.resolve(id);
  }, 2000);
  return deferred.promise;
};

co(function *() {
  var id1 = yield runAsyncTask(1);
  console.log('Task ' + id1 + ' resolved');
  var id2 = yield runAsyncTask(2);
  console.log('Task ' + id2 + ' resolved');
})();