/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 3099:
/***/ (function(module) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ 6077:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ 1223:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);
var create = __webpack_require__(30);
var definePropertyModule = __webpack_require__(3070);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 1530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(8710).charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ 5787:
/***/ (function(module) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ 9670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ 8533:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__(2092).forEach;
var arrayMethodIsStrict = __webpack_require__(9341);

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ 1318:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(5656);
var toLength = __webpack_require__(7466);
var toAbsoluteIndex = __webpack_require__(1400);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 2092:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var bind = __webpack_require__(9974);
var IndexedObject = __webpack_require__(8361);
var toObject = __webpack_require__(7908);
var toLength = __webpack_require__(7466);
var arraySpeciesCreate = __webpack_require__(5417);

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ 1194:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var wellKnownSymbol = __webpack_require__(5112);
var V8_VERSION = __webpack_require__(7392);

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ 9341:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(7293);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ 7475:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);
var isArray = __webpack_require__(3157);
var wellKnownSymbol = __webpack_require__(5112);

var SPECIES = wellKnownSymbol('species');

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ 5417:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arraySpeciesConstructor = __webpack_require__(7475);

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ 7072:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ 4326:
/***/ (function(module) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ 648:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var classofRaw = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ 5631:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var defineProperty = __webpack_require__(3070).f;
var create = __webpack_require__(30);
var redefineAll = __webpack_require__(2248);
var bind = __webpack_require__(9974);
var anInstance = __webpack_require__(5787);
var iterate = __webpack_require__(408);
var defineIterator = __webpack_require__(654);
var setSpecies = __webpack_require__(6340);
var DESCRIPTORS = __webpack_require__(9781);
var fastKey = __webpack_require__(2423).fastKey;
var InternalStateModule = __webpack_require__(9909);

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // `Map.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-map.prototype.get
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // `Map.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-map.prototype.set
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // `Set.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-set.prototype.add
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
    // https://tc39.es/ecma262/#sec-map.prototype.entries
    // https://tc39.es/ecma262/#sec-map.prototype.keys
    // https://tc39.es/ecma262/#sec-map.prototype.values
    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
    // https://tc39.es/ecma262/#sec-set.prototype.entries
    // https://tc39.es/ecma262/#sec-set.prototype.keys
    // https://tc39.es/ecma262/#sec-set.prototype.values
    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // `{ Map, Set }.prototype[@@species]` accessors
    // https://tc39.es/ecma262/#sec-get-map-@@species
    // https://tc39.es/ecma262/#sec-get-set-@@species
    setSpecies(CONSTRUCTOR_NAME);
  }
};


/***/ }),

/***/ 7710:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var isForced = __webpack_require__(4705);
var redefine = __webpack_require__(1320);
var InternalMetadataModule = __webpack_require__(2423);
var iterate = __webpack_require__(408);
var anInstance = __webpack_require__(5787);
var isObject = __webpack_require__(111);
var fails = __webpack_require__(7293);
var checkCorrectnessOfIteration = __webpack_require__(7072);
var setToStringTag = __webpack_require__(8003);
var inheritIfRequired = __webpack_require__(9587);

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  var REPLACE = isForced(
    CONSTRUCTOR_NAME,
    typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
      new NativeConstructor().entries().next();
    }))
  );

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.enable();
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),

/***/ 9920:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var has = __webpack_require__(6656);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ 4964:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};


/***/ }),

/***/ 8544:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 4994:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(3383).IteratorPrototype;
var create = __webpack_require__(30);
var createPropertyDescriptor = __webpack_require__(9114);
var setToStringTag = __webpack_require__(8003);
var Iterators = __webpack_require__(7497);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ 8880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9114:
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 6135:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toPropertyKey = __webpack_require__(4948);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ 654:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var createIteratorConstructor = __webpack_require__(4994);
var getPrototypeOf = __webpack_require__(9518);
var setPrototypeOf = __webpack_require__(7674);
var setToStringTag = __webpack_require__(8003);
var createNonEnumerableProperty = __webpack_require__(8880);
var redefine = __webpack_require__(1320);
var wellKnownSymbol = __webpack_require__(5112);
var IS_PURE = __webpack_require__(1913);
var Iterators = __webpack_require__(7497);
var IteratorsCore = __webpack_require__(3383);

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ 7235:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var path = __webpack_require__(857);
var has = __webpack_require__(6656);
var wrappedWellKnownSymbolModule = __webpack_require__(6061);
var defineProperty = __webpack_require__(3070).f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ 9781:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 317:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 7871:
/***/ (function(module) {

module.exports = typeof window == 'object';


/***/ }),

/***/ 1528:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var userAgent = __webpack_require__(8113);
var global = __webpack_require__(7854);

module.exports = /ipad|iphone|ipod/i.test(userAgent) && global.Pebble !== undefined;


/***/ }),

/***/ 6833:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var userAgent = __webpack_require__(8113);

module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);


/***/ }),

/***/ 5268:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(4326);
var global = __webpack_require__(7854);

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ 1036:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var userAgent = __webpack_require__(8113);

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


/***/ }),

/***/ 8113:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 7392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ 748:
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 2109:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = __webpack_require__(1236).f;
var createNonEnumerableProperty = __webpack_require__(8880);
var redefine = __webpack_require__(1320);
var setGlobal = __webpack_require__(3505);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7293:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 7007:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(4916);
var redefine = __webpack_require__(1320);
var regexpExec = __webpack_require__(2261);
var fails = __webpack_require__(7293);
var wellKnownSymbol = __webpack_require__(5112);
var createNonEnumerableProperty = __webpack_require__(8880);

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });

    redefine(String.prototype, KEY, methods[0]);
    redefine(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ 6677:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),

/***/ 9974:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aFunction = __webpack_require__(3099);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 7065:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(3099);
var isObject = __webpack_require__(111);

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};


/***/ }),

/***/ 5005:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 1246:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(648);
var Iterators = __webpack_require__(7497);
var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ 8554:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(9670);
var getIteratorMethod = __webpack_require__(1246);

module.exports = function (it, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(it) : usingIterator;
  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  } return anObject(iteratorMethod.call(it));
};


/***/ }),

/***/ 647:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toObject = __webpack_require__(7908);

var floor = Math.floor;
var replace = ''.replace;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace.call(replacement, symbols, function (match, ch) {
    var capture;
    switch (ch.charAt(0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return str.slice(0, position);
      case "'": return str.slice(tailPos);
      case '<':
        capture = namedCaptures[ch.slice(1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ 7854:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 6656:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toObject = __webpack_require__(7908);

var hasOwnProperty = {}.hasOwnProperty;

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 842:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ 490:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 4664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8361:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ 9587:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);
var setPrototypeOf = __webpack_require__(7674);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 2788:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var store = __webpack_require__(5465);

var functionToString = Function.toString;

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 2423:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var hiddenKeys = __webpack_require__(3501);
var isObject = __webpack_require__(111);
var has = __webpack_require__(6656);
var defineProperty = __webpack_require__(3070).f;
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertyNamesExternalModule = __webpack_require__(1156);
var uid = __webpack_require__(9711);
var FREEZING = __webpack_require__(6677);

var REQUIRED = false;
var METADATA = uid('meta');
var id = 0;

// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + id++, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var enable = function () {
  meta.enable = function () { /* empty */ };
  REQUIRED = true;
  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
  var splice = [].splice;
  var test = {};
  test[METADATA] = 1;

  // prevent exposing of metadata key
  if (getOwnPropertyNames(test).length) {
    getOwnPropertyNamesModule.f = function (it) {
      var result = getOwnPropertyNames(it);
      for (var i = 0, length = result.length; i < length; i++) {
        if (result[i] === METADATA) {
          splice.call(result, i, 1);
          break;
        }
      } return result;
    };

    $({ target: 'Object', stat: true, forced: true }, {
      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
    });
  }
};

var meta = module.exports = {
  enable: enable,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),

/***/ 9909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(8536);
var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var objectHas = __webpack_require__(6656);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 7659:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);
var Iterators = __webpack_require__(7497);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ 3157:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(4326);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ 4705:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 111:
/***/ (function(module) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ 1913:
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 7850:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);
var classof = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ 2190:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return typeof $Symbol == 'function' && Object(it) instanceof $Symbol;
};


/***/ }),

/***/ 408:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(9670);
var isArrayIteratorMethod = __webpack_require__(7659);
var toLength = __webpack_require__(7466);
var bind = __webpack_require__(9974);
var getIterator = __webpack_require__(8554);
var getIteratorMethod = __webpack_require__(1246);
var iteratorClose = __webpack_require__(9212);

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};


/***/ }),

/***/ 9212:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(9670);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = iterator['return'];
    if (innerResult === undefined) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = innerResult.call(iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ 3383:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(7293);
var create = __webpack_require__(30);
var getPrototypeOf = __webpack_require__(9518);
var createNonEnumerableProperty = __webpack_require__(8880);
var wellKnownSymbol = __webpack_require__(5112);
var IS_PURE = __webpack_require__(1913);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (typeof IteratorPrototype[ITERATOR] !== 'function') {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ 7497:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 5948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = __webpack_require__(1236).f;
var macrotask = __webpack_require__(261).set;
var IS_IOS = __webpack_require__(6833);
var IS_IOS_PEBBLE = __webpack_require__(1528);
var IS_WEBOS_WEBKIT = __webpack_require__(1036);
var IS_NODE = __webpack_require__(5268);

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ 3366:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

module.exports = global.Promise;


/***/ }),

/***/ 133:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(7293);

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 8536:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var inspectSource = __webpack_require__(2788);

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 8523:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(3099);

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ 3929:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isRegExp = __webpack_require__(7850);

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ 30:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(9670);
var defineProperties = __webpack_require__(6048);
var enumBugKeys = __webpack_require__(748);
var hiddenKeys = __webpack_require__(3501);
var html = __webpack_require__(490);
var documentCreateElement = __webpack_require__(317);
var sharedKey = __webpack_require__(6200);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ 6048:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var anObject = __webpack_require__(9670);
var objectKeys = __webpack_require__(1956);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ 3070:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var anObject = __webpack_require__(9670);
var toPropertyKey = __webpack_require__(4948);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var has = __webpack_require__(6656);
var IE8_DOM_DEFINE = __webpack_require__(4664);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ 1156:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-object-getownpropertynames -- safe */
var toIndexedObject = __webpack_require__(5656);
var $getOwnPropertyNames = __webpack_require__(8006).f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ 8006:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 9518:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var has = __webpack_require__(6656);
var toObject = __webpack_require__(7908);
var sharedKey = __webpack_require__(6200);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(8544);

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 6324:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var has = __webpack_require__(6656);
var toIndexedObject = __webpack_require__(5656);
var indexOf = __webpack_require__(1318).indexOf;
var hiddenKeys = __webpack_require__(3501);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ 1956:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 5296:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 7674:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var anObject = __webpack_require__(9670);
var aPossiblePrototype = __webpack_require__(6077);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 288:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var classof = __webpack_require__(648);

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ 2140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (pref !== 'string' && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3887:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 857:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

module.exports = global;


/***/ }),

/***/ 2534:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ 9478:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(9670);
var isObject = __webpack_require__(111);
var newPromiseCapability = __webpack_require__(8523);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ 2248:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var redefine = __webpack_require__(1320);

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ 1320:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var createNonEnumerableProperty = __webpack_require__(8880);
var has = __webpack_require__(6656);
var setGlobal = __webpack_require__(3505);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ 7651:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(4326);
var regexpExec = __webpack_require__(2261);

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ 2261:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var toString = __webpack_require__(1340);
var regexpFlags = __webpack_require__(7066);
var stickyHelpers = __webpack_require__(2999);
var shared = __webpack_require__(2309);
var create = __webpack_require__(30);
var getInternalState = __webpack_require__(9909).get;
var UNSUPPORTED_DOT_ALL = __webpack_require__(9441);
var UNSUPPORTED_NCG = __webpack_require__(8173);

var nativeExec = RegExp.prototype.exec;
var nativeReplace = shared('native-string-replace', String.prototype.replace);

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  // eslint-disable-next-line max-statements -- TODO
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = patchedExec.call(raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = str.slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str.charAt(re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ 7066:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(9670);

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 2999:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var global = __webpack_require__(7854);

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

exports.UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ 9441:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var global = __webpack_require__(7854);

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ 8173:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var global = __webpack_require__(7854);

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ 4488:
/***/ (function(module) {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 3505:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

module.exports = function (key, value) {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 6340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(5005);
var definePropertyModule = __webpack_require__(3070);
var wellKnownSymbol = __webpack_require__(5112);
var DESCRIPTORS = __webpack_require__(9781);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ 8003:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = __webpack_require__(3070).f;
var has = __webpack_require__(6656);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ 6200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(2309);
var uid = __webpack_require__(9711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var setGlobal = __webpack_require__(3505);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.17.3',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 6707:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(9670);
var aFunction = __webpack_require__(3099);
var wellKnownSymbol = __webpack_require__(5112);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ 8710:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(9958);
var toString = __webpack_require__(1340);
var requireObjectCoercible = __webpack_require__(4488);

// `String.prototype.codePointAt` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ 261:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var fails = __webpack_require__(7293);
var bind = __webpack_require__(9974);
var html = __webpack_require__(490);
var createElement = __webpack_require__(317);
var IS_IOS = __webpack_require__(6833);
var IS_NODE = __webpack_require__(5268);

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global.location;
} catch (error) { /* empty */ }

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var argumentsLength = arguments.length;
    var i = 1;
    while (argumentsLength > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    typeof postMessage == 'function' &&
    !global.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ 1400:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(9958);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5656:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8361);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9958:
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ 7466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(9958);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(4488);

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 7593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var ordinaryToPrimitive = __webpack_require__(2140);
var wellKnownSymbol = __webpack_require__(5112);

var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = input[TO_PRIMITIVE];
  var result;
  if (exoticToPrim !== undefined) {
    if (pref === undefined) pref = 'default';
    result = exoticToPrim.call(input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(7593);
var isSymbol = __webpack_require__(2190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : String(key);
};


/***/ }),

/***/ 1694:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 1340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isSymbol = __webpack_require__(2190);

module.exports = function (argument) {
  if (isSymbol(argument)) throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),

/***/ 9711:
/***/ (function(module) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ 3307:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(133);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 6061:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

exports.f = wellKnownSymbol;


/***/ }),

/***/ 5112:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var has = __webpack_require__(6656);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(133);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 2222:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var fails = __webpack_require__(7293);
var isArray = __webpack_require__(3157);
var isObject = __webpack_require__(111);
var toObject = __webpack_require__(7908);
var toLength = __webpack_require__(7466);
var createProperty = __webpack_require__(6135);
var arraySpeciesCreate = __webpack_require__(5417);
var arrayMethodHasSpeciesSupport = __webpack_require__(1194);
var wellKnownSymbol = __webpack_require__(5112);
var V8_VERSION = __webpack_require__(7392);

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ 9554:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var forEach = __webpack_require__(8533);

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ 6699:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var $includes = __webpack_require__(1318).includes;
var addToUnscopables = __webpack_require__(1223);

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ 2772:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-array-prototype-indexof -- required for testing */
var $ = __webpack_require__(2109);
var $indexOf = __webpack_require__(1318).indexOf;
var arrayMethodIsStrict = __webpack_require__(9341);

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 6992:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(5656);
var addToUnscopables = __webpack_require__(1223);
var Iterators = __webpack_require__(7497);
var InternalStateModule = __webpack_require__(9909);
var defineIterator = __webpack_require__(654);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ 9600:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var IndexedObject = __webpack_require__(8361);
var toIndexedObject = __webpack_require__(5656);
var arrayMethodIsStrict = __webpack_require__(9341);

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ 7042:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var isObject = __webpack_require__(111);
var isArray = __webpack_require__(3157);
var toAbsoluteIndex = __webpack_require__(1400);
var toLength = __webpack_require__(7466);
var toIndexedObject = __webpack_require__(5656);
var createProperty = __webpack_require__(6135);
var wellKnownSymbol = __webpack_require__(5112);
var arrayMethodHasSpeciesSupport = __webpack_require__(1194);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ 561:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var toAbsoluteIndex = __webpack_require__(1400);
var toInteger = __webpack_require__(9958);
var toLength = __webpack_require__(7466);
var toObject = __webpack_require__(7908);
var arraySpeciesCreate = __webpack_require__(5417);
var createProperty = __webpack_require__(6135);
var arrayMethodHasSpeciesSupport = __webpack_require__(1194);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ 3710:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var redefine = __webpack_require__(1320);

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.es/ecma262/#sec-date.prototype.tostring
if (String(new Date(NaN)) != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare -- NaN check
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}


/***/ }),

/***/ 4812:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var bind = __webpack_require__(7065);

// `Function.prototype.bind` method
// https://tc39.es/ecma262/#sec-function.prototype.bind
$({ target: 'Function', proto: true }, {
  bind: bind
});


/***/ }),

/***/ 8309:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var defineProperty = __webpack_require__(3070).f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ 1532:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var collection = __webpack_require__(7710);
var collectionStrong = __webpack_require__(5631);

// `Map` constructor
// https://tc39.es/ecma262/#sec-map-objects
module.exports = collection('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),

/***/ 8011:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var DESCRIPTORS = __webpack_require__(9781);
var create = __webpack_require__(30);

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  create: create
});


/***/ }),

/***/ 3321:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var DESCRIPTORS = __webpack_require__(9781);
var defineProperties = __webpack_require__(6048);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperties: defineProperties
});


/***/ }),

/***/ 9070:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var DESCRIPTORS = __webpack_require__(9781);
var objectDefinePropertyModile = __webpack_require__(3070);

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperty: objectDefinePropertyModile.f
});


/***/ }),

/***/ 5003:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var fails = __webpack_require__(7293);
var toIndexedObject = __webpack_require__(5656);
var nativeGetOwnPropertyDescriptor = __webpack_require__(1236).f;
var DESCRIPTORS = __webpack_require__(9781);

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ 489:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var fails = __webpack_require__(7293);
var toObject = __webpack_require__(7908);
var nativeGetPrototypeOf = __webpack_require__(9518);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(8544);

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});



/***/ }),

/***/ 8304:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var setPrototypeOf = __webpack_require__(7674);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
$({ target: 'Object', stat: true }, {
  setPrototypeOf: setPrototypeOf
});


/***/ }),

/***/ 1539:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var redefine = __webpack_require__(1320);
var toString = __webpack_require__(288);

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ 8674:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var IS_PURE = __webpack_require__(1913);
var global = __webpack_require__(7854);
var getBuiltIn = __webpack_require__(5005);
var NativePromise = __webpack_require__(3366);
var redefine = __webpack_require__(1320);
var redefineAll = __webpack_require__(2248);
var setPrototypeOf = __webpack_require__(7674);
var setToStringTag = __webpack_require__(8003);
var setSpecies = __webpack_require__(6340);
var isObject = __webpack_require__(111);
var aFunction = __webpack_require__(3099);
var anInstance = __webpack_require__(5787);
var inspectSource = __webpack_require__(2788);
var iterate = __webpack_require__(408);
var checkCorrectnessOfIteration = __webpack_require__(7072);
var speciesConstructor = __webpack_require__(6707);
var task = __webpack_require__(261).set;
var microtask = __webpack_require__(5948);
var promiseResolve = __webpack_require__(9478);
var hostReportErrors = __webpack_require__(842);
var newPromiseCapabilityModule = __webpack_require__(8523);
var perform = __webpack_require__(2534);
var InternalStateModule = __webpack_require__(9909);
var isForced = __webpack_require__(4705);
var wellKnownSymbol = __webpack_require__(5112);
var IS_BROWSER = __webpack_require__(7871);
var IS_NODE = __webpack_require__(5268);
var V8_VERSION = __webpack_require__(7392);

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromiseConstructorPrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructorPrototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromiseConstructorPrototype = PromiseConstructor.prototype;
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructorPrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function' && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
      redefine(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
    }
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ 2419:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var getBuiltIn = __webpack_require__(5005);
var aFunction = __webpack_require__(3099);
var anObject = __webpack_require__(9670);
var isObject = __webpack_require__(111);
var create = __webpack_require__(30);
var bind = __webpack_require__(7065);
var fails = __webpack_require__(7293);

var nativeConstruct = getBuiltIn('Reflect', 'construct');

// `Reflect.construct` method
// https://tc39.es/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});
var FORCED = NEW_TARGET_BUG || ARGS_BUG;

$({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ 4916:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var exec = __webpack_require__(2261);

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ 9714:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__(1320);
var anObject = __webpack_require__(9670);
var $toString = __webpack_require__(1340);
var fails = __webpack_require__(7293);
var flags = __webpack_require__(7066);

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = $toString(R.source);
    var rf = R.flags;
    var f = $toString(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ 189:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var collection = __webpack_require__(7710);
var collectionStrong = __webpack_require__(5631);

// `Set` constructor
// https://tc39.es/ecma262/#sec-set-objects
module.exports = collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),

/***/ 2023:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var notARegExp = __webpack_require__(3929);
var requireObjectCoercible = __webpack_require__(4488);
var toString = __webpack_require__(1340);
var correctIsRegExpLogic = __webpack_require__(4964);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~toString(requireObjectCoercible(this))
      .indexOf(toString(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 8783:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(8710).charAt;
var toString = __webpack_require__(1340);
var InternalStateModule = __webpack_require__(9909);
var defineIterator = __webpack_require__(654);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ 5306:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(7007);
var fails = __webpack_require__(7293);
var anObject = __webpack_require__(9670);
var toInteger = __webpack_require__(9958);
var toLength = __webpack_require__(7466);
var toString = __webpack_require__(1340);
var requireObjectCoercible = __webpack_require__(4488);
var advanceStringIndex = __webpack_require__(1530);
var getSubstitution = __webpack_require__(647);
var regExpExec = __webpack_require__(7651);
var wellKnownSymbol = __webpack_require__(5112);

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue === 'string' &&
        replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 &&
        replaceValue.indexOf('$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = toString(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);


/***/ }),

/***/ 3123:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(7007);
var isRegExp = __webpack_require__(7850);
var anObject = __webpack_require__(9670);
var requireObjectCoercible = __webpack_require__(4488);
var speciesConstructor = __webpack_require__(6707);
var advanceStringIndex = __webpack_require__(1530);
var toLength = __webpack_require__(7466);
var toString = __webpack_require__(1340);
var callRegExpExec = __webpack_require__(7651);
var regexpExec = __webpack_require__(2261);
var stickyHelpers = __webpack_require__(2999);
var fails = __webpack_require__(7293);

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

// @@split logic
fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = toString(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(toString(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

      if (res.done) return res.value;

      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S);
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);


/***/ }),

/***/ 1817:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__(2109);
var DESCRIPTORS = __webpack_require__(9781);
var global = __webpack_require__(7854);
var has = __webpack_require__(6656);
var isObject = __webpack_require__(111);
var defineProperty = __webpack_require__(3070).f;
var copyConstructorProperties = __webpack_require__(9920);

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var nativeSymbol = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = nativeSymbol ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ 2165:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(7235);

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ 2526:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var getBuiltIn = __webpack_require__(5005);
var IS_PURE = __webpack_require__(1913);
var DESCRIPTORS = __webpack_require__(9781);
var NATIVE_SYMBOL = __webpack_require__(133);
var fails = __webpack_require__(7293);
var has = __webpack_require__(6656);
var isArray = __webpack_require__(3157);
var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var anObject = __webpack_require__(9670);
var toObject = __webpack_require__(7908);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var $toString = __webpack_require__(1340);
var createPropertyDescriptor = __webpack_require__(9114);
var nativeObjectCreate = __webpack_require__(30);
var objectKeys = __webpack_require__(1956);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertyNamesExternal = __webpack_require__(1156);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createNonEnumerableProperty = __webpack_require__(8880);
var redefine = __webpack_require__(1320);
var shared = __webpack_require__(2309);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);
var uid = __webpack_require__(9711);
var wellKnownSymbol = __webpack_require__(5112);
var wrappedWellKnownSymbolModule = __webpack_require__(6061);
var defineWellKnownSymbol = __webpack_require__(7235);
var setToStringTag = __webpack_require__(8003);
var InternalStateModule = __webpack_require__(9909);
var $forEach = __webpack_require__(2092).forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = $toString(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ 2564:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(2526);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__(1817);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__(2165);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(6992);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(8783);
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/document.js







function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (undefined) {
  if (!("document" in self)) {
    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      if (self.HTMLDocument) {
        self.Document = self.HTMLDocument;
      } else {
        self.Document = self.HTMLDocument = document.constructor = new Function('return function Document() {}')();
        self.Document.prototype = document;
      }
    }
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : _typeof(__webpack_require__.g)) && __webpack_require__.g || {});
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.timers.js
var web_timers = __webpack_require__(2564);
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/Element.js
function Element_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Element_typeof = function _typeof(obj) { return typeof obj; }; } else { Element_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Element_typeof(obj); }








(function (undefined) {
  if (!("Element" in self && "HTMLElement" in self)) {
    (function () {
      if ('Element' in self && 'HTMLElement' in self) {
        return;
      }

      if (window.Element && !window.HTMLElement) {
        window.HTMLElement = window.Element;
        return;
      }

      window.Element = window.HTMLElement = new Function('return function Element() {}')();
      var vbody = document.appendChild(document.createElement('body'));
      var frame = vbody.appendChild(document.createElement('iframe'));
      var frameDocument = frame.contentWindow.document;
      var prototype = Element.prototype = frameDocument.appendChild(frameDocument.createElement('*'));
      var cache = {};

      var shiv = function shiv(element, deep) {
        var childNodes = element.childNodes || [],
            index = -1,
            key,
            value,
            childNode;

        if (element.nodeType === 1 && element.constructor !== Element) {
          element.constructor = Element;

          for (key in cache) {
            value = cache[key];
            element[key] = value;
          }
        }

        while (childNode = deep && childNodes[++index]) {
          shiv(childNode, deep);
        }

        return element;
      };

      var elements = document.getElementsByTagName('*');
      var nativeCreateElement = document.createElement;
      var interval;
      var loopLimit = 100;
      prototype.attachEvent('onpropertychange', function (event) {
        var propertyName = event.propertyName,
            nonValue = !Object.prototype.hasOwnProperty.call(cache, propertyName),
            newValue = prototype[propertyName],
            oldValue = cache[propertyName],
            index = -1,
            element;

        while (element = elements[++index]) {
          if (element.nodeType === 1) {
            if (nonValue || element[propertyName] === oldValue) {
              element[propertyName] = newValue;
            }
          }
        }

        cache[propertyName] = newValue;
      });
      prototype.constructor = Element;

      if (!prototype.hasAttribute) {
        prototype.hasAttribute = function hasAttribute(name) {
          return this.getAttribute(name) !== null;
        };
      }

      function bodyCheck() {
        if (!loopLimit--) clearTimeout(interval);

        if (document.body && !document.body.prototype && /(complete|interactive)/.test(document.readyState)) {
          shiv(document, true);
          if (interval && document.body.prototype) clearTimeout(interval);
          return !!document.body.prototype;
        }

        return false;
      }

      if (!bodyCheck()) {
        document.onreadystatechange = bodyCheck;
        interval = setInterval(bodyCheck, 25);
      }

      document.createElement = function createElement(nodeName) {
        var element = nativeCreateElement(String(nodeName).toLowerCase());
        return shiv(element);
      };

      document.removeChild(vbody);
    })();
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : Element_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : Element_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : Element_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/Window.js







function Window_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Window_typeof = function _typeof(obj) { return typeof obj; }; } else { Window_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Window_typeof(obj); }

(function (undefined) {
  if (!("Window" in self)) {
    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      (function (global) {
        if (global.constructor) {
          global.Window = global.constructor;
        } else {
          (global.Window = global.constructor = new Function('return function Window() {}')()).prototype = self;
        }
      })(self);
    }
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : Window_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : Window_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : Window_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/console.js







function console_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { console_typeof = function _typeof(obj) { return typeof obj; }; } else { console_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return console_typeof(obj); }

(function (undefined) {
  if (!("console" in self)) {
    self.console = self.console || {};
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : console_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : console_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : console_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/console.log.js







function console_log_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { console_log_typeof = function _typeof(obj) { return typeof obj; }; } else { console_log_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return console_log_typeof(obj); }

(function (undefined) {
  if (!("console" in self && "log" in self.console)) {
    console.log = function log() {};
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : console_log_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : console_log_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : console_log_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/console.error.js







function console_error_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { console_error_typeof = function _typeof(obj) { return typeof obj; }; } else { console_error_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return console_error_typeof(obj); }

(function (undefined) {
  if (!("console" in self && "error" in self.console)) {
    console.error = console.log;
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : console_error_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : console_error_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : console_error_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/console.warn.js







function console_warn_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { console_warn_typeof = function _typeof(obj) { return typeof obj; }; } else { console_warn_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return console_warn_typeof(obj); }

(function (undefined) {
  if (!("console" in self && "warn" in self.console)) {
    console.warn = console.log;
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : console_warn_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : console_warn_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : console_warn_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.define-property.js
var es_object_define_property = __webpack_require__(9070);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__(7042);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.date.to-string.js
var es_date_to_string = __webpack_require__(3710);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(6699);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__(2023);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__(2772);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__(561);
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/Event.js
function Event_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Event_typeof = function _typeof(obj) { return typeof obj; }; } else { Event_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Event_typeof(obj); }














(function (undefined) {
  if (!function (n) {
    if (!("Event" in n)) return !1;

    try {
      return new Event("click"), !0;
    } catch (t) {
      return !1;
    }
  }(self)) {
    (function () {
      var unlistenableWindowEvents = {
        click: 1,
        dblclick: 1,
        keyup: 1,
        keypress: 1,
        keydown: 1,
        mousedown: 1,
        mouseup: 1,
        mousemove: 1,
        mouseover: 1,
        mouseenter: 1,
        mouseleave: 1,
        mouseout: 1,
        storage: 1,
        storagecommit: 1,
        textinput: 1
      };
      if (typeof document === 'undefined' || typeof window === 'undefined') return;
      var existingProto = window.Event && window.Event.prototype || null;

      function Event(type, eventInitDict) {
        if (!type) {
          throw new Error('Not enough arguments');
        }

        var event;

        if ('createEvent' in document) {
          event = document.createEvent('Event');
          var bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
          var cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
          event.initEvent(type, bubbles, cancelable);
          return event;
        }

        event = document.createEventObject();
        event.type = type;
        event.bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
        event.cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
        return event;
      }

      Event.NONE = 0;
      Event.CAPTURING_PHASE = 1;
      Event.AT_TARGET = 2;
      Event.BUBBLING_PHASE = 3;
      window.Event = Window.prototype.Event = Event;

      if (existingProto) {
        Object.defineProperty(window.Event, 'prototype', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: existingProto
        });
      }

      if (!('createEvent' in document)) {
        window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1];

          if (element === window && type in unlistenableWindowEvents) {
            throw new Error('In IE8 the event: ' + type + ' is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.');
          }

          if (!element._events) {
            element._events = {};
          }

          if (!element._events[type]) {
            element._events[type] = function (event) {
              var list = element._events[event.type].list,
                  events = list.slice(),
                  index = -1,
                  length = events.length,
                  eventElement;

              event.preventDefault = function preventDefault() {
                if (event.cancelable !== false) {
                  event.returnValue = false;
                }
              };

              event.stopPropagation = function stopPropagation() {
                event.cancelBubble = true;
              };

              event.stopImmediatePropagation = function stopImmediatePropagation() {
                event.cancelBubble = true;
                event.cancelImmediate = true;
              };

              event.currentTarget = element;
              event.relatedTarget = event.fromElement || null;
              event.target = event.target || event.srcElement || element;
              event.timeStamp = new Date().getTime();

              if (event.clientX) {
                event.pageX = event.clientX + document.documentElement.scrollLeft;
                event.pageY = event.clientY + document.documentElement.scrollTop;
              }

              while (++index < length && !event.cancelImmediate) {
                if (index in events) {
                  eventElement = events[index];

                  if (list.includes(eventElement) && typeof eventElement === 'function') {
                    eventElement.call(element, event);
                  }
                }
              }
            };

            element._events[type].list = [];

            if (element.attachEvent) {
              element.attachEvent('on' + type, element._events[type]);
            }
          }

          element._events[type].list.push(listener);
        };

        window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1],
              index;

          if (element._events && element._events[type] && element._events[type].list) {
            index = element._events[type].list.indexOf(listener);

            if (index !== -1) {
              element._events[type].list.splice(index, 1);

              if (!element._events[type].list.length) {
                if (element.detachEvent) {
                  element.detachEvent('on' + type, element._events[type]);
                }

                delete element._events[type];
              }
            }
          }
        };

        window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function dispatchEvent(event) {
          if (!arguments.length) {
            throw new Error('Not enough arguments');
          }

          if (!event || typeof event.type !== 'string') {
            throw new Error('DOM Events Exception 0');
          }

          var element = this,
              type = event.type;

          try {
            if (!event.bubbles) {
              event.cancelBubble = true;

              var cancelBubbleEvent = function cancelBubbleEvent(event) {
                event.cancelBubble = true;
                (element || window).detachEvent('on' + type, cancelBubbleEvent);
              };

              this.attachEvent('on' + type, cancelBubbleEvent);
            }

            this.fireEvent('on' + type, event);
          } catch (error) {
            event.target = element;

            do {
              event.currentTarget = element;

              if ('_events' in element && typeof element._events[type] === 'function') {
                element._events[type].call(element, event);
              }

              if (typeof element['on' + type] === 'function') {
                element['on' + type].call(element, event);
              }

              element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
            } while (element && !event.cancelBubble);
          }

          return true;
        };

        document.attachEvent('onreadystatechange', function () {
          if (document.readyState === 'complete') {
            document.dispatchEvent(new Event('DOMContentLoaded', {
              bubbles: true
            }));
          }
        });
      }
    })();
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : Event_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : Event_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : Event_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(9714);
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/CustomEvent.js
function CustomEvent_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { CustomEvent_typeof = function _typeof(obj) { return typeof obj; }; } else { CustomEvent_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return CustomEvent_typeof(obj); }










(function (undefined) {
  if (!("CustomEvent" in self && ("function" == typeof self.CustomEvent || self.CustomEvent.toString().indexOf("CustomEventConstructor") > -1))) {
    self.CustomEvent = function CustomEvent(type, eventInitDict) {
      if (!type) {
        throw Error('TypeError: Failed to construct "CustomEvent": An event name must be provided.');
      }

      var event;
      eventInitDict = eventInitDict || {
        bubbles: false,
        cancelable: false,
        detail: null
      };

      if ('createEvent' in document) {
        try {
          event = document.createEvent('CustomEvent');
          event.initCustomEvent(type, eventInitDict.bubbles, eventInitDict.cancelable, eventInitDict.detail);
        } catch (error) {
          event = document.createEvent('Event');
          event.initEvent(type, eventInitDict.bubbles, eventInitDict.cancelable);
          event.detail = eventInitDict.detail;
        }
      } else {
        event = new Event(type, eventInitDict);
        event.detail = eventInitDict && eventInitDict.detail || null;
      }

      return event;
    };

    CustomEvent.prototype = Event.prototype;
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : CustomEvent_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : CustomEvent_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : CustomEvent_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/document.head.js







function document_head_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { document_head_typeof = function _typeof(obj) { return typeof obj; }; } else { document_head_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return document_head_typeof(obj); }

(function (undefined) {
  if (!("document" in self && "head" in self.document)) {
    document.head = document.getElementsByTagName('head')[0];
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : document_head_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : document_head_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : document_head_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(2222);
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/document.querySelector.js
function document_querySelector_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { document_querySelector_typeof = function _typeof(obj) { return typeof obj; }; } else { document_querySelector_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return document_querySelector_typeof(obj); }









(function (undefined) {
  if (!("document" in self && "querySelector" in self.document)) {
    (function () {
      var head = document.getElementsByTagName('head')[0];

      function getElementsByQuery(node, selector, one) {
        var generator = document.createElement('div'),
            id = 'qsa' + String(Math.random()).slice(3),
            style,
            elements;
        generator.innerHTML = 'x<style>' + selector + '{qsa:' + id + ';}';
        style = head.appendChild(generator.lastChild);
        elements = getElements(node, selector, one, id);
        head.removeChild(style);
        return one ? elements[0] : elements;
      }

      function getElements(node, selector, one, id) {
        var validNode = /1|9/.test(node.nodeType),
            childNodes = node.childNodes,
            elements = [],
            index = -1,
            childNode;

        if (validNode && node.currentStyle && node.currentStyle.qsa === id) {
          if (elements.push(node) && one) {
            return elements;
          }
        }

        while (childNode = childNodes[++index]) {
          elements = elements.concat(getElements(childNode, selector, one, id));

          if (one && elements.length) {
            return elements;
          }
        }

        return elements;
      }

      Document.prototype.querySelector = Element.prototype.querySelector = function querySelectorAll(selector) {
        return getElementsByQuery(this, selector, true);
      };

      Document.prototype.querySelectorAll = Element.prototype.querySelectorAll = function querySelectorAll(selector) {
        return getElementsByQuery(this, selector, false);
      };
    })();
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : document_querySelector_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : document_querySelector_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : document_querySelector_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.create.js
var es_object_create = __webpack_require__(8011);
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/DocumentFragment.js
function DocumentFragment_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { DocumentFragment_typeof = function _typeof(obj) { return typeof obj; }; } else { DocumentFragment_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return DocumentFragment_typeof(obj); }








(function (undefined) {
  if (!("DocumentFragment" in self && function () {
    try {
      return new DocumentFragment(), !0;
    } catch (n) {
      return !1;
    }
  }())) {
    (function (global) {
      global.DocumentFragment = function DocumentFragment() {
        return document.createDocumentFragment();
      };

      var fragment = document.createDocumentFragment();
      global.DocumentFragment.prototype = Object.create(fragment.constructor.prototype);
    })(self);
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : DocumentFragment_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : DocumentFragment_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : DocumentFragment_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/helpers/_mutation.js







function _mutation_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _mutation_typeof = function _typeof(obj) { return typeof obj; }; } else { _mutation_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _mutation_typeof(obj); }

var _mutation = function () {
  function isNode(object) {
    if (typeof Node === 'function') {
      return object instanceof Node;
    }

    return object && _mutation_typeof(object) === "object" && object.nodeName && object.nodeType >= 1 && object.nodeType <= 12;
  }

  return function mutation(nodes) {
    if (nodes.length === 1) {
      return isNode(nodes[0]) ? nodes[0] : document.createTextNode(nodes[0] + '');
    }

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < nodes.length; i++) {
      fragment.appendChild(isNode(nodes[i]) ? nodes[i] : document.createTextNode(nodes[i] + ''));
    }

    return fragment;
  };
}();

/* harmony default export */ var helpers_mutation = (_mutation);
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/DocumentFragment.prototype.append.js







function DocumentFragment_prototype_append_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { DocumentFragment_prototype_append_typeof = function _typeof(obj) { return typeof obj; }; } else { DocumentFragment_prototype_append_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return DocumentFragment_prototype_append_typeof(obj); }


(function (undefined) {
  if (!("DocumentFragment" in self && "append" in DocumentFragment.prototype)) {
    (function (global) {
      var fragmentProto = document.createDocumentFragment().constructor.prototype;

      fragmentProto.append = function append() {
        this.appendChild(helpers_mutation(arguments));
      };

      global.DocumentFragment.prototype.append = function append() {
        this.appendChild(helpers_mutation(arguments));
      };
    })(self);
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : DocumentFragment_prototype_append_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : DocumentFragment_prototype_append_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : DocumentFragment_prototype_append_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/DocumentFragment.prototype.prepend.js







function DocumentFragment_prototype_prepend_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { DocumentFragment_prototype_prepend_typeof = function _typeof(obj) { return typeof obj; }; } else { DocumentFragment_prototype_prepend_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return DocumentFragment_prototype_prepend_typeof(obj); }


(function (undefined) {
  if (!("DocumentFragment" in self && "prepend" in DocumentFragment.prototype)) {
    (function (global) {
      var fragmentProto = document.createDocumentFragment().constructor.prototype;

      fragmentProto.prepend = function prepend() {
        this.insertBefore(helpers_mutation(arguments), this.firstChild);
      };

      global.DocumentFragment.prototype.prepend = function prepend() {
        this.insertBefore(helpers_mutation(arguments), this.firstChild);
      };
    })(self);
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : DocumentFragment_prototype_prepend_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : DocumentFragment_prototype_prepend_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : DocumentFragment_prototype_prepend_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/Element.prototype.after.js
function Element_prototype_after_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Element_prototype_after_typeof = function _typeof(obj) { return typeof obj; }; } else { Element_prototype_after_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Element_prototype_after_typeof(obj); }










(function (undefined) {
  if (!("Element" in self && "after" in Element.prototype)) {
    Document.prototype.after = Element.prototype.after = function after() {
      if (this.parentNode) {
        var args = Array.prototype.slice.call(arguments),
            viableNextSibling = this.nextSibling,
            idx = viableNextSibling ? args.indexOf(viableNextSibling) : -1;

        while (idx !== -1) {
          viableNextSibling = viableNextSibling.nextSibling;

          if (!viableNextSibling) {
            break;
          }

          idx = args.indexOf(viableNextSibling);
        }

        this.parentNode.insertBefore(helpers_mutation(arguments), viableNextSibling);
      }
    };

    if ("Text" in self) {
      Text.prototype.after = Element.prototype.after;
    }
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : Element_prototype_after_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : Element_prototype_after_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : Element_prototype_after_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/Element.prototype.append.js







function Element_prototype_append_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Element_prototype_append_typeof = function _typeof(obj) { return typeof obj; }; } else { Element_prototype_append_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Element_prototype_append_typeof(obj); }


(function (undefined) {
  if (!("Element" in self && "append" in Element.prototype)) {
    Document.prototype.append = Element.prototype.append = function append() {
      this.appendChild(helpers_mutation(arguments));
    };
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : Element_prototype_append_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : Element_prototype_append_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : Element_prototype_append_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/Element.prototype.before.js
function Element_prototype_before_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Element_prototype_before_typeof = function _typeof(obj) { return typeof obj; }; } else { Element_prototype_before_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Element_prototype_before_typeof(obj); }










(function (undefined) {
  if (!("Element" in self && "before" in Element.prototype)) {
    Document.prototype.before = Element.prototype.before = function before() {
      if (this.parentNode) {
        var args = Array.prototype.slice.call(arguments),
            viablePreviousSibling = this.previousSibling,
            idx = viablePreviousSibling ? args.indexOf(viablePreviousSibling) : -1;

        while (idx !== -1) {
          viablePreviousSibling = viablePreviousSibling.previousSibling;

          if (!viablePreviousSibling) {
            break;
          }

          idx = args.indexOf(viablePreviousSibling);
        }

        this.parentNode.insertBefore(helpers_mutation(arguments), viablePreviousSibling ? viablePreviousSibling.nextSibling : this.parentNode.firstChild);
      }
    };

    if ("Text" in self) {
      Text.prototype.before = Element.prototype.before;
    }
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : Element_prototype_before_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : Element_prototype_before_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : Element_prototype_before_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/Element.prototype.cloneNode.js







function Element_prototype_cloneNode_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Element_prototype_cloneNode_typeof = function _typeof(obj) { return typeof obj; }; } else { Element_prototype_cloneNode_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Element_prototype_cloneNode_typeof(obj); }

(function (undefined) {
  if (!("document" in self && "cloneNode" in document.documentElement && function () {
    var e = document.createElement("div"),
        n = document.createElement("input");
    n.type = "radio", n.checked = !0, e.appendChild(n);
    var c,
        t = n.cloneNode(!1);

    try {
      c = e.cloneNode();
    } catch (d) {
      return !1;
    }

    return t.checked && void 0 !== c && 0 === c.childNodes.length;
  }())) {
    Element.prototype.cloneNode = function (nativeFunc, undef) {
      return function (deep) {
        if (deep === undef) {
          deep = false;
        }

        var clone = nativeFunc.call(this, deep);
        if ('checked' in this) clone.checked = this.checked;
        return clone;
      };
    }(Element.prototype.cloneNode);
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : Element_prototype_cloneNode_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : Element_prototype_cloneNode_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : Element_prototype_cloneNode_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/Element.prototype.matches.js







function Element_prototype_matches_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Element_prototype_matches_typeof = function _typeof(obj) { return typeof obj; }; } else { Element_prototype_matches_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Element_prototype_matches_typeof(obj); }

(function (undefined) {
  if (!("document" in self && "matches" in document.documentElement)) {
    Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || function matches(selector) {
      var element = this;
      var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
      var index = 0;

      while (elements[index] && elements[index] !== element) {
        ++index;
      }

      return !!elements[index];
    };
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : Element_prototype_matches_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : Element_prototype_matches_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : Element_prototype_matches_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/Element.prototype.prepend.js







function Element_prototype_prepend_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Element_prototype_prepend_typeof = function _typeof(obj) { return typeof obj; }; } else { Element_prototype_prepend_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Element_prototype_prepend_typeof(obj); }


(function (undefined) {
  if (!("Element" in self && "prepend" in Element.prototype)) {
    Document.prototype.prepend = Element.prototype.prepend = function prepend() {
      this.insertBefore(helpers_mutation(arguments), this.firstChild);
    };
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : Element_prototype_prepend_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : Element_prototype_prepend_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : Element_prototype_prepend_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/Element.prototype.remove.js







function Element_prototype_remove_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Element_prototype_remove_typeof = function _typeof(obj) { return typeof obj; }; } else { Element_prototype_remove_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Element_prototype_remove_typeof(obj); }


(function (undefined) {
  if (!("Element" in self && "remove" in Element.prototype)) {
    Document.prototype.remove = Element.prototype.remove = function remove() {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };

    if ("Text" in self) {
      Text.prototype.remove = Element.prototype.remove;
    }
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : Element_prototype_remove_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : Element_prototype_remove_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : Element_prototype_remove_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/Element.prototype.replaceWith.js







function Element_prototype_replaceWith_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Element_prototype_replaceWith_typeof = function _typeof(obj) { return typeof obj; }; } else { Element_prototype_replaceWith_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Element_prototype_replaceWith_typeof(obj); }


(function (undefined) {
  if (!("Element" in self && "replaceWith" in Element.prototype)) {
    Document.prototype.replaceWith = Element.prototype.replaceWith = function replaceWith() {
      if (this.parentNode) {
        this.parentNode.replaceChild(helpers_mutation(arguments), this);
      }
    };

    if ('Text' in self) {
      Text.prototype.replaceWith = Element.prototype.replaceWith;
    }
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : Element_prototype_replaceWith_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : Element_prototype_replaceWith_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : Element_prototype_replaceWith_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.define-properties.js
var es_object_define_properties = __webpack_require__(3321);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(5003);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(4916);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(5306);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(8309);
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/HTMLTemplateElement.js









/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
(function () {
  'use strict';

  var needsTemplate = typeof HTMLTemplateElement === 'undefined';
  var brokenDocFragment = !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment);
  var needsDocFrag = false;

  if (/Trident/.test(navigator.userAgent)) {
    (function () {
      needsDocFrag = true;
      var origCloneNode = Node.prototype.cloneNode;

      Node.prototype.cloneNode = function cloneNode(deep) {
        var newDom = origCloneNode.call(this, deep);

        if (this instanceof DocumentFragment) {
          newDom.__proto__ = DocumentFragment.prototype;
        }

        return newDom;
      };

      DocumentFragment.prototype.querySelectorAll = HTMLElement.prototype.querySelectorAll;
      DocumentFragment.prototype.querySelector = HTMLElement.prototype.querySelector;
      Object.defineProperties(DocumentFragment.prototype, {
        'nodeType': {
          get: function get() {
            return Node.DOCUMENT_FRAGMENT_NODE;
          },
          configurable: true
        },
        'localName': {
          get: function get() {
            return undefined;
          },
          configurable: true
        },
        'nodeName': {
          get: function get() {
            return '#document-fragment';
          },
          configurable: true
        }
      });
      var origInsertBefore = Node.prototype.insertBefore;

      function insertBefore(newNode, refNode) {
        if (newNode instanceof DocumentFragment) {
          var child;

          while (child = newNode.firstChild) {
            origInsertBefore.call(this, child, refNode);
          }
        } else {
          origInsertBefore.call(this, newNode, refNode);
        }

        return newNode;
      }

      Node.prototype.insertBefore = insertBefore;
      var origAppendChild = Node.prototype.appendChild;

      Node.prototype.appendChild = function appendChild(child) {
        if (child instanceof DocumentFragment) {
          insertBefore.call(this, child, null);
        } else {
          origAppendChild.call(this, child);
        }

        return child;
      };

      var origRemoveChild = Node.prototype.removeChild;
      var origReplaceChild = Node.prototype.replaceChild;

      Node.prototype.replaceChild = function replaceChild(newChild, oldChild) {
        if (newChild instanceof DocumentFragment) {
          insertBefore.call(this, newChild, oldChild);
          origRemoveChild.call(this, oldChild);
        } else {
          origReplaceChild.call(this, newChild, oldChild);
        }

        return oldChild;
      };

      Document.prototype.createDocumentFragment = function createDocumentFragment() {
        var frag = this.createElement('df');
        frag.__proto__ = DocumentFragment.prototype;
        return frag;
      };

      var origImportNode = Document.prototype.importNode;

      Document.prototype.importNode = function importNode(impNode, deep) {
        deep = deep || false;
        var newNode = origImportNode.call(this, impNode, deep);

        if (impNode instanceof DocumentFragment) {
          newNode.__proto__ = DocumentFragment.prototype;
        }

        return newNode;
      };
    })();
  }

  var capturedCloneNode = Node.prototype.cloneNode;
  var capturedCreateElement = Document.prototype.createElement;
  var capturedImportNode = Document.prototype.importNode;
  var capturedRemoveChild = Node.prototype.removeChild;
  var capturedAppendChild = Node.prototype.appendChild;
  var capturedReplaceChild = Node.prototype.replaceChild;
  var capturedParseFromString = DOMParser.prototype.parseFromString;
  var capturedHTMLElementInnerHTML = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, 'innerHTML') || {
    get: function get() {
      return this.innerHTML;
    },
    set: function set(text) {
      this.innerHTML = text;
    }
  };
  var capturedChildNodes = Object.getOwnPropertyDescriptor(window.Node.prototype, 'childNodes') || {
    get: function get() {
      return this.childNodes;
    }
  };
  var elementQuerySelectorAll = Element.prototype.querySelectorAll;
  var docQuerySelectorAll = Document.prototype.querySelectorAll;
  var fragQuerySelectorAll = DocumentFragment.prototype.querySelectorAll;
  var scriptSelector = 'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]';

  function QSA(node, selector) {
    if (!node.childNodes.length) {
      return [];
    }

    switch (node.nodeType) {
      case Node.DOCUMENT_NODE:
        return docQuerySelectorAll.call(node, selector);

      case Node.DOCUMENT_FRAGMENT_NODE:
        return fragQuerySelectorAll.call(node, selector);

      default:
        return elementQuerySelectorAll.call(node, selector);
    }
  }

  var needsCloning = function () {
    if (!needsTemplate) {
      var t = document.createElement('template');
      var t2 = document.createElement('template');
      t2.content.appendChild(document.createElement('div'));
      t.content.appendChild(t2);
      var clone = t.cloneNode(true);
      return clone.content.childNodes.length === 0 || clone.content.firstChild.content.childNodes.length === 0 || brokenDocFragment;
    }
  }();

  var TEMPLATE_TAG = 'template';

  var PolyfilledHTMLTemplateElement = function PolyfilledHTMLTemplateElement() {};

  if (needsTemplate) {
    var contentDoc = document.implementation.createHTMLDocument('template');
    var canDecorate = true;
    var templateStyle = document.createElement('style');
    templateStyle.textContent = TEMPLATE_TAG + '{display:none;}';
    var head = document.head;
    head.insertBefore(templateStyle, head.firstElementChild);
    PolyfilledHTMLTemplateElement.prototype = Object.create(HTMLElement.prototype);
    var canProtoPatch = !document.createElement('div').hasOwnProperty('innerHTML');

    PolyfilledHTMLTemplateElement.decorate = function (template) {
      if (template.content || template.namespaceURI !== document.documentElement.namespaceURI) {
        return;
      }

      template.content = contentDoc.createDocumentFragment();
      var child;

      while (child = template.firstChild) {
        capturedAppendChild.call(template.content, child);
      }

      if (canProtoPatch) {
        template.__proto__ = PolyfilledHTMLTemplateElement.prototype;
      } else {
        template.cloneNode = function (deep) {
          return PolyfilledHTMLTemplateElement._cloneNode(this, deep);
        };

        if (canDecorate) {
          try {
            defineInnerHTML(template);
            defineOuterHTML(template);
          } catch (err) {
            canDecorate = false;
          }
        }
      }

      PolyfilledHTMLTemplateElement.bootstrap(template.content);
    };

    var topLevelWrappingMap = {
      'option': ['select'],
      'thead': ['table'],
      'col': ['colgroup', 'table'],
      'tr': ['tbody', 'table'],
      'th': ['tr', 'tbody', 'table'],
      'td': ['tr', 'tbody', 'table']
    };

    var getTagName = function getTagName(text) {
      return (/<([a-z][^/\0>\x20\t\r\n\f]+)/i.exec(text) || ['', ''])[1].toLowerCase();
    };

    var defineInnerHTML = function defineInnerHTML(obj) {
      Object.defineProperty(obj, 'innerHTML', {
        get: function get() {
          return getInnerHTML(this);
        },
        set: function set(text) {
          var wrap = topLevelWrappingMap[getTagName(text)];

          if (wrap) {
            for (var i = 0; i < wrap.length; i++) {
              text = '<' + wrap[i] + '>' + text + '</' + wrap[i] + '>';
            }
          }

          contentDoc.body.innerHTML = text;
          PolyfilledHTMLTemplateElement.bootstrap(contentDoc);

          while (this.content.firstChild) {
            capturedRemoveChild.call(this.content, this.content.firstChild);
          }

          var body = contentDoc.body;

          if (wrap) {
            for (var j = 0; j < wrap.length; j++) {
              body = body.lastChild;
            }
          }

          while (body.firstChild) {
            capturedAppendChild.call(this.content, body.firstChild);
          }
        },
        configurable: true
      });
    };

    var defineOuterHTML = function defineOuterHTML(obj) {
      Object.defineProperty(obj, 'outerHTML', {
        get: function get() {
          return "<".concat(TEMPLATE_TAG, ">").concat(this.innerHTML, "</").concat(TEMPLATE_TAG, ">");
        },
        set: function set(innerHTML) {
          if (this.parentNode) {
            contentDoc.body.innerHTML = innerHTML;
            var docFrag = this.ownerDocument.createDocumentFragment();

            while (contentDoc.body.firstChild) {
              capturedAppendChild.call(docFrag, contentDoc.body.firstChild);
            }

            capturedReplaceChild.call(this.parentNode, docFrag, this);
          } else {
            throw new Error("Failed to set the 'outerHTML' property on 'Element': This element has no parent node.");
          }
        },
        configurable: true
      });
    };

    defineInnerHTML(PolyfilledHTMLTemplateElement.prototype);
    defineOuterHTML(PolyfilledHTMLTemplateElement.prototype);

    PolyfilledHTMLTemplateElement.bootstrap = function bootstrap(doc) {
      var templates = QSA(doc, TEMPLATE_TAG);

      for (var i = 0, l = templates.length, t; i < l && (t = templates[i]); i++) {
        PolyfilledHTMLTemplateElement.decorate(t);
      }
    };

    document.addEventListener('DOMContentLoaded', function () {
      PolyfilledHTMLTemplateElement.bootstrap(document);
    });

    Document.prototype.createElement = function createElement() {
      var el = capturedCreateElement.apply(this, arguments);

      if (el.localName === 'template') {
        PolyfilledHTMLTemplateElement.decorate(el);
      }

      return el;
    };

    DOMParser.prototype.parseFromString = function () {
      var el = capturedParseFromString.apply(this, arguments);
      PolyfilledHTMLTemplateElement.bootstrap(el);
      return el;
    };

    Object.defineProperty(HTMLElement.prototype, 'innerHTML', {
      get: function get() {
        return getInnerHTML(this);
      },
      set: function set(text) {
        capturedHTMLElementInnerHTML.set.call(this, text);
        PolyfilledHTMLTemplateElement.bootstrap(this);
      },
      configurable: true,
      enumerable: true
    });
    var escapeAttrRegExp = /[&\u00A0"]/g;
    var escapeDataRegExp = /[&\u00A0<>]/g;

    var escapeReplace = function escapeReplace(c) {
      switch (c) {
        case '&':
          return '&amp;';

        case '<':
          return '&lt;';

        case '>':
          return '&gt;';

        case '"':
          return '&quot;';

        case "\xA0":
          return '&nbsp;';
      }
    };

    var escapeAttr = function escapeAttr(s) {
      return s.replace(escapeAttrRegExp, escapeReplace);
    };

    var escapeData = function escapeData(s) {
      return s.replace(escapeDataRegExp, escapeReplace);
    };

    var makeSet = function makeSet(arr) {
      var set = {};

      for (var i = 0; i < arr.length; i++) {
        set[arr[i]] = true;
      }

      return set;
    };

    var voidElements = makeSet(['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
    var plaintextParents = makeSet(['style', 'script', 'xmp', 'iframe', 'noembed', 'noframes', 'plaintext', 'noscript']);

    var getOuterHTML = function getOuterHTML(node, parentNode, callback) {
      switch (node.nodeType) {
        case Node.ELEMENT_NODE:
          {
            var tagName = node.localName;
            var s = '<' + tagName;
            var attrs = node.attributes;

            for (var i = 0, attr; attr = attrs[i]; i++) {
              s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
            }

            s += '>';

            if (voidElements[tagName]) {
              return s;
            }

            return s + getInnerHTML(node, callback) + '</' + tagName + '>';
          }

        case Node.TEXT_NODE:
          {
            var data = node.data;

            if (parentNode && plaintextParents[parentNode.localName]) {
              return data;
            }

            return escapeData(data);
          }

        case Node.COMMENT_NODE:
          {
            return '<!--' + node.data + '-->';
          }

        default:
          {
            window.console.error(node);
            throw new Error('not implemented');
          }
      }
    };

    var getInnerHTML = function getInnerHTML(node, callback) {
      if (node.localName === 'template') {
        node = node.content;
      }

      var s = '';
      var c$ = callback ? callback(node) : capturedChildNodes.get.call(node);

      for (var i = 0, l = c$.length, child; i < l && (child = c$[i]); i++) {
        s += getOuterHTML(child, node, callback);
      }

      return s;
    };
  }

  if (needsTemplate || needsCloning) {
    PolyfilledHTMLTemplateElement._cloneNode = function _cloneNode(template, deep) {
      var clone = capturedCloneNode.call(template, false);

      if (this.decorate) {
        this.decorate(clone);
      }

      if (deep) {
        capturedAppendChild.call(clone.content, capturedCloneNode.call(template.content, true));
        fixClonedDom(clone.content, template.content);
      }

      return clone;
    };

    var fixClonedDom = function fixClonedDom(clone, source) {
      if (!source.querySelectorAll) {
        return;
      }

      var s$ = QSA(source, TEMPLATE_TAG);

      if (s$.length === 0) {
        return;
      }

      var t$ = QSA(clone, TEMPLATE_TAG);

      for (var i = 0, l = t$.length, t, s; i < l; i++) {
        s = s$[i];
        t = t$[i];

        if (PolyfilledHTMLTemplateElement && PolyfilledHTMLTemplateElement.decorate) {
          PolyfilledHTMLTemplateElement.decorate(s);
        }

        capturedReplaceChild.call(t.parentNode, cloneNode.call(s, true), t);
      }
    };

    var fixClonedScripts = function fixClonedScripts(fragment) {
      var scripts = QSA(fragment, scriptSelector);

      for (var ns, s, i = 0; i < scripts.length; i++) {
        s = scripts[i];
        ns = capturedCreateElement.call(document, 'script');
        ns.textContent = s.textContent;
        var attrs = s.attributes;

        for (var ai = 0, a; ai < attrs.length; ai++) {
          a = attrs[ai];
          ns.setAttribute(a.name, a.value);
        }

        capturedReplaceChild.call(s.parentNode, ns, s);
      }
    };

    var cloneNode = Node.prototype.cloneNode = function cloneNode(deep) {
      var dom;

      if (!needsDocFrag && brokenDocFragment && this instanceof DocumentFragment) {
        if (!deep) {
          return this.ownerDocument.createDocumentFragment();
        } else {
          dom = importNode.call(this.ownerDocument, this, true);
        }
      } else if (this.nodeType === Node.ELEMENT_NODE && this.localName === TEMPLATE_TAG && this.namespaceURI == document.documentElement.namespaceURI) {
        dom = PolyfilledHTMLTemplateElement._cloneNode(this, deep);
      } else {
        dom = capturedCloneNode.call(this, deep);
      }

      if (deep) {
        fixClonedDom(dom, this);
      }

      return dom;
    };

    var importNode = Document.prototype.importNode = function importNode(element, deep) {
      deep = deep || false;

      if (element.localName === TEMPLATE_TAG) {
        return PolyfilledHTMLTemplateElement._cloneNode(element, deep);
      } else {
        var dom = capturedImportNode.call(this, element, deep);

        if (deep) {
          fixClonedDom(dom, element);
          fixClonedScripts(dom);
        }

        return dom;
      }
    };
  }

  if (needsTemplate) {
    window.HTMLTemplateElement = PolyfilledHTMLTemplateElement;
  }
})();
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/MutationObserver.js
function MutationObserver_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { MutationObserver_typeof = function _typeof(obj) { return typeof obj; }; } else { MutationObserver_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return MutationObserver_typeof(obj); }










(function (undefined) {
  if (!("MutationObserver" in self)) {
    if (!window.MutationObserver) {
      window.MutationObserver = function (undefined) {
        "use strict";

        function MutationObserver(listener) {
          this._watched = [];
          this._listener = listener;
        }

        function startMutationChecker(observer) {
          (function check() {
            var mutations = observer.takeRecords();

            if (mutations.length) {
              observer._listener(mutations, observer);
            }

            observer._timeout = setTimeout(check, MutationObserver._period);
          })();
        }

        MutationObserver._period = 30;
        MutationObserver.prototype = {
          observe: function observe($target, config) {
            var settings = {
              attr: !!(config.attributes || config.attributeFilter || config.attributeOldValue),
              kids: !!config.childList,
              descendents: !!config.subtree,
              charData: !!(config.characterData || config.characterDataOldValue)
            };
            var watched = this._watched;

            for (var i = 0; i < watched.length; i++) {
              if (watched[i].tar === $target) watched.splice(i, 1);
            }

            if (config.attributeFilter) {
              settings.afilter = reduce(config.attributeFilter, function (a, b) {
                a[b] = true;
                return a;
              }, {});
            }

            watched.push({
              tar: $target,
              fn: createMutationSearcher($target, settings)
            });

            if (!this._timeout) {
              startMutationChecker(this);
            }
          },
          takeRecords: function takeRecords() {
            var mutations = [];
            var watched = this._watched;

            for (var i = 0; i < watched.length; i++) {
              watched[i].fn(mutations);
            }

            return mutations;
          },
          disconnect: function disconnect() {
            this._watched = [];
            clearTimeout(this._timeout);
            this._timeout = null;
          }
        };

        function MutationRecord(data) {
          var settings = {
            type: null,
            target: null,
            addedNodes: [],
            removedNodes: [],
            previousSibling: null,
            nextSibling: null,
            attributeName: null,
            attributeNamespace: null,
            oldValue: null
          };

          for (var prop in data) {
            if (has(settings, prop) && data[prop] !== undefined) settings[prop] = data[prop];
          }

          return settings;
        }

        function createMutationSearcher($target, config) {
          var $oldstate = clone($target, config);
          return function (mutations) {
            var olen = mutations.length,
                dirty;

            if (config.charData && $target.nodeType === 3 && $target.nodeValue !== $oldstate.charData) {
              mutations.push(new MutationRecord({
                type: "characterData",
                target: $target,
                oldValue: $oldstate.charData
              }));
            }

            if (config.attr && $oldstate.attr) {
              findAttributeMutations(mutations, $target, $oldstate.attr, config.afilter);
            }

            if (config.kids || config.descendents) {
              dirty = searchSubtree(mutations, $target, $oldstate, config);
            }

            if (dirty || mutations.length !== olen) {
              $oldstate = clone($target, config);
            }
          };
        }

        var hasAttributeBug = document.createElement("i");
        hasAttributeBug.style.top = 0;
        hasAttributeBug = hasAttributeBug.attributes.style.value != "null";

        function getAttributeSimple(el, attr) {
          return attr.value;
        }

        function getAttributeWithStyleHack(el, attr) {
          return attr.name !== "style" ? attr.value : el.style.cssText;
        }

        var getAttributeValue = hasAttributeBug ? getAttributeSimple : getAttributeWithStyleHack;

        function findAttributeMutations(mutations, $target, $oldstate, filter) {
          var checked = {};
          var attributes = $target.attributes;
          var attr;
          var name;
          var i = attributes.length;

          while (i--) {
            attr = attributes[i];
            name = attr.name;

            if (!filter || has(filter, name)) {
              if (getAttributeValue($target, attr) !== $oldstate[name]) {
                mutations.push(MutationRecord({
                  type: "attributes",
                  target: $target,
                  attributeName: name,
                  oldValue: $oldstate[name],
                  attributeNamespace: attr.namespaceURI
                }));
              }

              checked[name] = true;
            }
          }

          for (name in $oldstate) {
            if (!checked[name]) {
              mutations.push(MutationRecord({
                target: $target,
                type: "attributes",
                attributeName: name,
                oldValue: $oldstate[name]
              }));
            }
          }
        }

        function searchSubtree(mutations, $target, $oldstate, config) {
          var dirty;

          function resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes) {
            var distance = conflicts.length - 1;
            var counter = -~((distance - numAddedNodes) / 2);
            var $cur;
            var oldstruct;
            var conflict;

            while (conflict = conflicts.pop()) {
              $cur = $kids[conflict.i];
              oldstruct = $oldkids[conflict.j];

              if (config.kids && counter && Math.abs(conflict.i - conflict.j) >= distance) {
                mutations.push(MutationRecord({
                  type: "childList",
                  target: node,
                  addedNodes: [$cur],
                  removedNodes: [$cur],
                  nextSibling: $cur.nextSibling,
                  previousSibling: $cur.previousSibling
                }));
                counter--;
              }

              if (config.attr && oldstruct.attr) findAttributeMutations(mutations, $cur, oldstruct.attr, config.afilter);

              if (config.charData && $cur.nodeType === 3 && $cur.nodeValue !== oldstruct.charData) {
                mutations.push(MutationRecord({
                  type: "characterData",
                  target: $cur,
                  oldValue: oldstruct.charData
                }));
              }

              if (config.descendents) findMutations($cur, oldstruct);
            }
          }

          function findMutations(node, old) {
            var $kids = node.childNodes;
            var $oldkids = old.kids;
            var klen = $kids.length;
            var olen = $oldkids ? $oldkids.length : 0;
            var map;
            var conflicts;
            var id;
            var idx;
            var oldstruct;
            var $cur;
            var $old;
            var numAddedNodes = 0;
            var i = 0,
                j = 0;

            while (i < klen || j < olen) {
              $cur = $kids[i];
              oldstruct = $oldkids[j];
              $old = oldstruct && oldstruct.node;

              if ($cur === $old) {
                if (config.attr && oldstruct.attr) findAttributeMutations(mutations, $cur, oldstruct.attr, config.afilter);

                if (config.charData && oldstruct.charData !== undefined && $cur.nodeValue !== oldstruct.charData) {
                  mutations.push(MutationRecord({
                    type: "characterData",
                    target: $cur,
                    oldValue: oldstruct.charData
                  }));
                }

                if (conflicts) resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes);
                if (config.descendents && ($cur.childNodes.length || oldstruct.kids && oldstruct.kids.length)) findMutations($cur, oldstruct);
                i++;
                j++;
              } else {
                dirty = true;

                if (!map) {
                  map = {};
                  conflicts = [];
                }

                if ($cur) {
                  if (!map[id = getElementId($cur)]) {
                    map[id] = true;

                    if ((idx = indexOfCustomNode($oldkids, $cur, j)) === -1) {
                      if (config.kids) {
                        mutations.push(MutationRecord({
                          type: "childList",
                          target: node,
                          addedNodes: [$cur],
                          nextSibling: $cur.nextSibling,
                          previousSibling: $cur.previousSibling
                        }));
                        numAddedNodes++;
                      }
                    } else {
                      conflicts.push({
                        i: i,
                        j: idx
                      });
                    }
                  }

                  i++;
                }

                if ($old && $old !== $kids[i]) {
                  if (!map[id = getElementId($old)]) {
                    map[id] = true;

                    if ((idx = indexOf($kids, $old, i)) === -1) {
                      if (config.kids) {
                        mutations.push(MutationRecord({
                          type: "childList",
                          target: old.node,
                          removedNodes: [$old],
                          nextSibling: $oldkids[j + 1],
                          previousSibling: $oldkids[j - 1]
                        }));
                        numAddedNodes--;
                      }
                    } else {
                      conflicts.push({
                        i: idx,
                        j: j
                      });
                    }
                  }

                  j++;
                }
              }
            }

            if (conflicts) resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes);
          }

          findMutations($target, $oldstate);
          return dirty;
        }

        function clone($target, config) {
          var recurse = true;
          return function copy($target) {
            var elestruct = {
              node: $target
            };

            if (config.charData && ($target.nodeType === 3 || $target.nodeType === 8)) {
              elestruct.charData = $target.nodeValue;
            } else {
              if (config.attr && recurse && $target.nodeType === 1) {
                elestruct.attr = reduce($target.attributes, function (memo, attr) {
                  if (!config.afilter || config.afilter[attr.name]) {
                    memo[attr.name] = getAttributeValue($target, attr);
                  }

                  return memo;
                }, {});
              }

              if (recurse && (config.kids || config.charData || config.attr && config.descendents)) {
                elestruct.kids = map($target.childNodes, copy);
              }

              recurse = config.descendents;
            }

            return elestruct;
          }($target);
        }

        function indexOfCustomNode(set, $node, idx) {
          return indexOf(set, $node, idx, JSCompiler_renameProperty("node"));
        }

        var counter = 1;
        var expando = "mo_id";

        function getElementId($ele) {
          try {
            return $ele.id || ($ele[expando] = $ele[expando] || counter++);
          } catch (o_O) {
            try {
              return $ele.nodeValue;
            } catch (shitie) {
              return counter++;
            }
          }
        }

        function map(set, iterator) {
          var results = [];

          for (var index = 0; index < set.length; index++) {
            results[index] = iterator(set[index], index, set);
          }

          return results;
        }

        function reduce(set, iterator, memo) {
          for (var index = 0; index < set.length; index++) {
            memo = iterator(memo, set[index], index, set);
          }

          return memo;
        }

        function indexOf(set, item, idx, prop) {
          for (; idx < set.length; idx++) {
            if ((prop ? set[idx][prop] : set[idx]) === item) return idx;
          }

          return -1;
        }

        function has(obj, prop) {
          return obj[prop] !== undefined;
        }

        function JSCompiler_renameProperty(a) {
          return a;
        }

        return MutationObserver;
      }(void 0);
    }
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : MutationObserver_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : MutationObserver_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : MutationObserver_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/Node.prototype.contains.js







function Node_prototype_contains_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Node_prototype_contains_typeof = function _typeof(obj) { return typeof obj; }; } else { Node_prototype_contains_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Node_prototype_contains_typeof(obj); }

(function (undefined) {
  if (!document.contains) {
    (function () {
      function contains(node) {
        if (!(0 in arguments)) {
          throw new TypeError('1 argument is required');
        }

        do {
          if (this === node) {
            return true;
          }
        } while (node = node && node.parentNode);

        return false;
      }

      if ('HTMLElement' in self && 'contains' in HTMLElement.prototype) {
        try {
          delete HTMLElement.prototype.contains;
        } catch (e) {}
      }

      if ('Node' in self) {
        Node.prototype.contains = contains;
      } else {
        document.contains = Element.prototype.contains = contains;
      }
    })();
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : Node_prototype_contains_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : Node_prototype_contains_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : Node_prototype_contains_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__(9554);
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/NodeList.prototype.forEach.js
function NodeList_prototype_forEach_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { NodeList_prototype_forEach_typeof = function _typeof(obj) { return typeof obj; }; } else { NodeList_prototype_forEach_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return NodeList_prototype_forEach_typeof(obj); }








(function (undefined) {
  if (!("forEach" in NodeList.prototype)) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
}).call('object' === (typeof window === "undefined" ? "undefined" : NodeList_prototype_forEach_typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : NodeList_prototype_forEach_typeof(self)) && self || 'object' === (typeof __webpack_require__.g === "undefined" ? "undefined" : NodeList_prototype_forEach_typeof(__webpack_require__.g)) && __webpack_require__.g || {});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.reflect.construct.js
var es_reflect_construct = __webpack_require__(2419);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.js
var es_set = __webpack_require__(189);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__(3123);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.bind.js
var es_function_bind = __webpack_require__(4812);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.set-prototype-of.js
var es_object_set_prototype_of = __webpack_require__(8304);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__(8674);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.map.js
var es_map = __webpack_require__(1532);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__(9600);
;// CONCATENATED MODULE: ./node_modules/@mrhenry/core-web/modules/~custom-elements.js

















;

(function () {
  try {
    var _reflectConstructHack = Reflect.construct;
  } catch (err) {}
})();

(function () {
  'use strict';

  var n = window.Document.prototype.createElement,
      p = window.Document.prototype.createElementNS,
      aa = window.Document.prototype.importNode,
      ba = window.Document.prototype.prepend,
      ca = window.Document.prototype.append,
      da = window.DocumentFragment.prototype.prepend,
      ea = window.DocumentFragment.prototype.append,
      q = window.Node.prototype.cloneNode,
      r = window.Node.prototype.appendChild,
      t = window.Node.prototype.insertBefore,
      u = window.Node.prototype.removeChild,
      v = window.Node.prototype.replaceChild,
      w = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
      y = window.Element.prototype.attachShadow,
      z = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
      A = window.Element.prototype.getAttribute,
      B = window.Element.prototype.setAttribute,
      C = window.Element.prototype.removeAttribute,
      D = window.Element.prototype.getAttributeNS,
      E = window.Element.prototype.setAttributeNS,
      F = window.Element.prototype.removeAttributeNS,
      G = window.Element.prototype.insertAdjacentElement,
      H = window.Element.prototype.insertAdjacentHTML,
      fa = window.Element.prototype.prepend,
      ha = window.Element.prototype.append,
      ia = window.Element.prototype.before,
      ja = window.Element.prototype.after,
      ka = window.Element.prototype.replaceWith,
      la = window.Element.prototype.remove,
      ma = window.HTMLElement,
      I = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
      na = window.HTMLElement.prototype.insertAdjacentElement,
      oa = window.HTMLElement.prototype.insertAdjacentHTML;
  var pa = new Set();
  "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function (a) {
    return pa.add(a);
  });

  function qa(a) {
    var b = pa.has(a);
    a = /^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(a);
    return !b && a;
  }

  var ra = document.contains ? document.contains.bind(document) : document.documentElement.contains.bind(document.documentElement);

  function J(a) {
    var b = a.isConnected;
    if (void 0 !== b) return b;
    if (ra(a)) return !0;

    for (; a && !(a.__CE_isImportDocument || a instanceof Document);) {
      a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
    }

    return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
  }

  function K(a) {
    var b = a.children;
    if (b) return Array.prototype.slice.call(b);
    b = [];

    for (a = a.firstChild; a; a = a.nextSibling) {
      a.nodeType === Node.ELEMENT_NODE && b.push(a);
    }

    return b;
  }

  function L(a, b) {
    for (; b && b !== a && !b.nextSibling;) {
      b = b.parentNode;
    }

    return b && b !== a ? b.nextSibling : null;
  }

  function M(a, b, c) {
    for (var f = a; f;) {
      if (f.nodeType === Node.ELEMENT_NODE) {
        var d = f;
        b(d);
        var e = d.localName;

        if ("link" === e && "import" === d.getAttribute("rel")) {
          f = d["import"];
          void 0 === c && (c = new Set());
          if (f instanceof Node && !c.has(f)) for (c.add(f), f = f.firstChild; f; f = f.nextSibling) {
            M(f, b, c);
          }
          f = L(a, d);
          continue;
        } else if ("template" === e) {
          f = L(a, d);
          continue;
        }

        if (d = d.__CE_shadowRoot) for (d = d.firstChild; d; d = d.nextSibling) {
          M(d, b, c);
        }
      }

      f = f.firstChild ? f.firstChild : L(a, f);
    }
  }

  ;

  function N() {
    var a = !(null === O || void 0 === O || !O.noDocumentConstructionObserver),
        b = !(null === O || void 0 === O || !O.shadyDomFastWalk);
    this.m = [];
    this.g = [];
    this.j = !1;
    this.shadyDomFastWalk = b;
    this.I = !a;
  }

  function P(a, b, c, f) {
    var d = window.ShadyDOM;

    if (a.shadyDomFastWalk && d && d.inUse) {
      if (b.nodeType === Node.ELEMENT_NODE && c(b), b.querySelectorAll) for (a = d.nativeMethods.querySelectorAll.call(b, "*"), b = 0; b < a.length; b++) {
        c(a[b]);
      }
    } else M(b, c, f);
  }

  function sa(a, b) {
    a.j = !0;
    a.m.push(b);
  }

  function ta(a, b) {
    a.j = !0;
    a.g.push(b);
  }

  function Q(a, b) {
    a.j && P(a, b, function (c) {
      return R(a, c);
    });
  }

  function R(a, b) {
    if (a.j && !b.__CE_patched) {
      b.__CE_patched = !0;

      for (var c = 0; c < a.m.length; c++) {
        a.m[c](b);
      }

      for (c = 0; c < a.g.length; c++) {
        a.g[c](b);
      }
    }
  }

  function S(a, b) {
    var c = [];
    P(a, b, function (d) {
      return c.push(d);
    });

    for (b = 0; b < c.length; b++) {
      var f = c[b];
      1 === f.__CE_state ? a.connectedCallback(f) : T(a, f);
    }
  }

  function U(a, b) {
    var c = [];
    P(a, b, function (d) {
      return c.push(d);
    });

    for (b = 0; b < c.length; b++) {
      var f = c[b];
      1 === f.__CE_state && a.disconnectedCallback(f);
    }
  }

  function V(a, b, c) {
    c = void 0 === c ? {} : c;

    var f = c.J,
        d = c.upgrade || function (g) {
      return T(a, g);
    },
        e = [];

    P(a, b, function (g) {
      a.j && R(a, g);

      if ("link" === g.localName && "import" === g.getAttribute("rel")) {
        var h = g["import"];
        h instanceof Node && (h.__CE_isImportDocument = !0, h.__CE_registry = document.__CE_registry);
        h && "complete" === h.readyState ? h.__CE_documentLoadHandled = !0 : g.addEventListener("load", function () {
          var k = g["import"];

          if (!k.__CE_documentLoadHandled) {
            k.__CE_documentLoadHandled = !0;
            var l = new Set();
            f && (f.forEach(function (m) {
              return l.add(m);
            }), l["delete"](k));
            V(a, k, {
              J: l,
              upgrade: d
            });
          }
        });
      } else e.push(g);
    }, f);

    for (b = 0; b < e.length; b++) {
      d(e[b]);
    }
  }

  function T(a, b) {
    try {
      var c = b.ownerDocument,
          f = c.__CE_registry;
      var d = f && (c.defaultView || c.__CE_isImportDocument) ? W(f, b.localName) : void 0;

      if (d && void 0 === b.__CE_state) {
        d.constructionStack.push(b);

        try {
          try {
            if (new d.constructorFunction() !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
          } finally {
            d.constructionStack.pop();
          }
        } catch (k) {
          throw b.__CE_state = 2, k;
        }

        b.__CE_state = 1;
        b.__CE_definition = d;

        if (d.attributeChangedCallback && b.hasAttributes()) {
          var e = d.observedAttributes;

          for (d = 0; d < e.length; d++) {
            var g = e[d],
                h = b.getAttribute(g);
            null !== h && a.attributeChangedCallback(b, g, null, h, null);
          }
        }

        J(b) && a.connectedCallback(b);
      }
    } catch (k) {
      X(k);
    }
  }

  N.prototype.connectedCallback = function (a) {
    var b = a.__CE_definition;
    if (b.connectedCallback) try {
      b.connectedCallback.call(a);
    } catch (c) {
      X(c);
    }
  };

  N.prototype.disconnectedCallback = function (a) {
    var b = a.__CE_definition;
    if (b.disconnectedCallback) try {
      b.disconnectedCallback.call(a);
    } catch (c) {
      X(c);
    }
  };

  N.prototype.attributeChangedCallback = function (a, b, c, f, d) {
    var e = a.__CE_definition;
    if (e.attributeChangedCallback && -1 < e.observedAttributes.indexOf(b)) try {
      e.attributeChangedCallback.call(a, b, c, f, d);
    } catch (g) {
      X(g);
    }
  };

  function ua(a, b, c, f) {
    var d = b.__CE_registry;
    if (d && (null === f || "http://www.w3.org/1999/xhtml" === f) && (d = W(d, c))) try {
      var e = new d.constructorFunction();
      if (void 0 === e.__CE_state || void 0 === e.__CE_definition) throw Error("Failed to construct '" + c + "': The returned value was not constructed with the HTMLElement constructor.");
      if ("http://www.w3.org/1999/xhtml" !== e.namespaceURI) throw Error("Failed to construct '" + c + "': The constructed element's namespace must be the HTML namespace.");
      if (e.hasAttributes()) throw Error("Failed to construct '" + c + "': The constructed element must not have any attributes.");
      if (null !== e.firstChild) throw Error("Failed to construct '" + c + "': The constructed element must not have any children.");
      if (null !== e.parentNode) throw Error("Failed to construct '" + c + "': The constructed element must not have a parent node.");
      if (e.ownerDocument !== b) throw Error("Failed to construct '" + c + "': The constructed element's owner document is incorrect.");
      if (e.localName !== c) throw Error("Failed to construct '" + c + "': The constructed element's local name is incorrect.");
      return e;
    } catch (g) {
      return X(g), b = null === f ? n.call(b, c) : p.call(b, f, c), Object.setPrototypeOf(b, HTMLUnknownElement.prototype), b.__CE_state = 2, b.__CE_definition = void 0, R(a, b), b;
    }
    b = null === f ? n.call(b, c) : p.call(b, f, c);
    R(a, b);
    return b;
  }

  function X(a) {
    var b = a.message,
        c = a.sourceURL || a.fileName || "",
        f = a.line || a.lineNumber || 0,
        d = a.column || a.columnNumber || 0,
        e = void 0;
    void 0 === ErrorEvent.prototype.initErrorEvent ? e = new ErrorEvent("error", {
      cancelable: !0,
      message: b,
      filename: c,
      lineno: f,
      colno: d,
      error: a
    }) : (e = document.createEvent("ErrorEvent"), e.initErrorEvent("error", !1, !0, b, c, f), e.preventDefault = function () {
      Object.defineProperty(this, "defaultPrevented", {
        configurable: !0,
        get: function get() {
          return !0;
        }
      });
    });
    void 0 === e.error && Object.defineProperty(e, "error", {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return a;
      }
    });
    window.dispatchEvent(e);
    e.defaultPrevented || console.error(a);
  }

  ;

  function va() {
    var a = this;
    this.g = void 0;
    this.F = new Promise(function (b) {
      a.l = b;
    });
  }

  va.prototype.resolve = function (a) {
    if (this.g) throw Error("Already resolved.");
    this.g = a;
    this.l(a);
  };

  function wa(a) {
    var b = document;
    this.l = void 0;
    this.h = a;
    this.g = b;
    V(this.h, this.g);
    "loading" === this.g.readyState && (this.l = new MutationObserver(this.G.bind(this)), this.l.observe(this.g, {
      childList: !0,
      subtree: !0
    }));
  }

  function xa(a) {
    a.l && a.l.disconnect();
  }

  wa.prototype.G = function (a) {
    var b = this.g.readyState;
    "interactive" !== b && "complete" !== b || xa(this);

    for (b = 0; b < a.length; b++) {
      for (var c = a[b].addedNodes, f = 0; f < c.length; f++) {
        V(this.h, c[f]);
      }
    }
  };

  function Y(a) {
    this.s = new Map();
    this.u = new Map();
    this.C = new Map();
    this.A = !1;
    this.B = new Map();

    this.o = function (b) {
      return b();
    };

    this.i = !1;
    this.v = [];
    this.h = a;
    this.D = a.I ? new wa(a) : void 0;
  }

  Y.prototype.H = function (a, b) {
    var c = this;
    if (!(b instanceof Function)) throw new TypeError("Custom element constructor getters must be functions.");
    ya(this, a);
    this.s.set(a, b);
    this.v.push(a);
    this.i || (this.i = !0, this.o(function () {
      return za(c);
    }));
  };

  Y.prototype.define = function (a, b) {
    var c = this;
    if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
    ya(this, a);
    Aa(this, a, b);
    this.v.push(a);
    this.i || (this.i = !0, this.o(function () {
      return za(c);
    }));
  };

  function ya(a, b) {
    if (!qa(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");
    if (W(a, b)) throw Error("A custom element with name '" + (b + "' has already been defined."));
    if (a.A) throw Error("A custom element is already being defined.");
  }

  function Aa(a, b, c) {
    a.A = !0;
    var f;

    try {
      var d = c.prototype;
      if (!(d instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");

      var e = function e(m) {
        var x = d[m];
        if (void 0 !== x && !(x instanceof Function)) throw Error("The '" + m + "' callback must be a function.");
        return x;
      };

      var g = e("connectedCallback");
      var h = e("disconnectedCallback");
      var k = e("adoptedCallback");
      var l = (f = e("attributeChangedCallback")) && c.observedAttributes || [];
    } catch (m) {
      throw m;
    } finally {
      a.A = !1;
    }

    c = {
      localName: b,
      constructorFunction: c,
      connectedCallback: g,
      disconnectedCallback: h,
      adoptedCallback: k,
      attributeChangedCallback: f,
      observedAttributes: l,
      constructionStack: []
    };
    a.u.set(b, c);
    a.C.set(c.constructorFunction, c);
    return c;
  }

  Y.prototype.upgrade = function (a) {
    V(this.h, a);
  };

  function za(a) {
    if (!1 !== a.i) {
      a.i = !1;

      for (var b = [], c = a.v, f = new Map(), d = 0; d < c.length; d++) {
        f.set(c[d], []);
      }

      V(a.h, document, {
        upgrade: function upgrade(k) {
          if (void 0 === k.__CE_state) {
            var l = k.localName,
                m = f.get(l);
            m ? m.push(k) : a.u.has(l) && b.push(k);
          }
        }
      });

      for (d = 0; d < b.length; d++) {
        T(a.h, b[d]);
      }

      for (d = 0; d < c.length; d++) {
        for (var e = c[d], g = f.get(e), h = 0; h < g.length; h++) {
          T(a.h, g[h]);
        }

        (e = a.B.get(e)) && e.resolve(void 0);
      }

      c.length = 0;
    }
  }

  Y.prototype.get = function (a) {
    if (a = W(this, a)) return a.constructorFunction;
  };

  Y.prototype.whenDefined = function (a) {
    if (!qa(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));
    var b = this.B.get(a);
    if (b) return b.F;
    b = new va();
    this.B.set(a, b);
    var c = this.u.has(a) || this.s.has(a);
    a = -1 === this.v.indexOf(a);
    c && a && b.resolve(void 0);
    return b.F;
  };

  Y.prototype.polyfillWrapFlushCallback = function (a) {
    this.D && xa(this.D);
    var b = this.o;

    this.o = function (c) {
      return a(function () {
        return b(c);
      });
    };
  };

  function W(a, b) {
    var c = a.u.get(b);
    if (c) return c;

    if (c = a.s.get(b)) {
      a.s["delete"](b);

      try {
        return Aa(a, b, c());
      } catch (f) {
        X(f);
      }
    }
  }

  window.CustomElementRegistry = Y;
  Y.prototype.define = Y.prototype.define;
  Y.prototype.upgrade = Y.prototype.upgrade;
  Y.prototype.get = Y.prototype.get;
  Y.prototype.whenDefined = Y.prototype.whenDefined;
  Y.prototype.polyfillDefineLazy = Y.prototype.H;
  Y.prototype.polyfillWrapFlushCallback = Y.prototype.polyfillWrapFlushCallback;

  function Z(a, b, c) {
    function f(d) {
      return function (e) {
        for (var g = [], h = 0; h < arguments.length; ++h) {
          g[h] = arguments[h];
        }

        h = [];

        for (var k = [], l = 0; l < g.length; l++) {
          var m = g[l];
          m instanceof Element && J(m) && k.push(m);
          if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) {
            h.push(m);
          } else h.push(m);
        }

        d.apply(this, g);

        for (g = 0; g < k.length; g++) {
          U(a, k[g]);
        }

        if (J(this)) for (g = 0; g < h.length; g++) {
          k = h[g], k instanceof Element && S(a, k);
        }
      };
    }

    void 0 !== c.prepend && (b.prepend = f(c.prepend));
    void 0 !== c.append && (b.append = f(c.append));
  }

  ;

  function Ba(a) {
    Document.prototype.createElement = function (b) {
      return ua(a, this, b, null);
    };

    Document.prototype.importNode = function (b, c) {
      b = aa.call(this, b, !!c);
      this.__CE_registry ? V(a, b) : Q(a, b);
      return b;
    };

    Document.prototype.createElementNS = function (b, c) {
      return ua(a, this, c, b);
    };

    Z(a, Document.prototype, {
      prepend: ba,
      append: ca
    });
  }

  ;

  function Ca(a) {
    function b(f) {
      return function (d) {
        for (var e = [], g = 0; g < arguments.length; ++g) {
          e[g] = arguments[g];
        }

        g = [];

        for (var h = [], k = 0; k < e.length; k++) {
          var l = e[k];
          l instanceof Element && J(l) && h.push(l);
          if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) {
            g.push(l);
          } else g.push(l);
        }

        f.apply(this, e);

        for (e = 0; e < h.length; e++) {
          U(a, h[e]);
        }

        if (J(this)) for (e = 0; e < g.length; e++) {
          h = g[e], h instanceof Element && S(a, h);
        }
      };
    }

    var c = Element.prototype;
    void 0 !== ia && (c.before = b(ia));
    void 0 !== ja && (c.after = b(ja));
    void 0 !== ka && (c.replaceWith = function (f) {
      for (var d = [], e = 0; e < arguments.length; ++e) {
        d[e] = arguments[e];
      }

      e = [];

      for (var g = [], h = 0; h < d.length; h++) {
        var k = d[h];
        k instanceof Element && J(k) && g.push(k);
        if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) {
          e.push(k);
        } else e.push(k);
      }

      h = J(this);
      ka.apply(this, d);

      for (d = 0; d < g.length; d++) {
        U(a, g[d]);
      }

      if (h) for (U(a, this), d = 0; d < e.length; d++) {
        g = e[d], g instanceof Element && S(a, g);
      }
    });
    void 0 !== la && (c.remove = function () {
      var f = J(this);
      la.call(this);
      f && U(a, this);
    });
  }

  ;

  function Da(a) {
    function b(d, e) {
      Object.defineProperty(d, "innerHTML", {
        enumerable: e.enumerable,
        configurable: !0,
        get: e.get,
        set: function set(g) {
          var h = this,
              k = void 0;
          J(this) && (k = [], P(a, this, function (x) {
            x !== h && k.push(x);
          }));
          e.set.call(this, g);
          if (k) for (var l = 0; l < k.length; l++) {
            var m = k[l];
            1 === m.__CE_state && a.disconnectedCallback(m);
          }
          this.ownerDocument.__CE_registry ? V(a, this) : Q(a, this);
          return g;
        }
      });
    }

    function c(d, e) {
      d.insertAdjacentElement = function (g, h) {
        var k = J(h);
        g = e.call(this, g, h);
        k && U(a, h);
        J(g) && S(a, h);
        return g;
      };
    }

    function f(d, e) {
      function g(h, k) {
        for (var l = []; h !== k; h = h.nextSibling) {
          l.push(h);
        }

        for (k = 0; k < l.length; k++) {
          V(a, l[k]);
        }
      }

      d.insertAdjacentHTML = function (h, k) {
        h = h.toLowerCase();

        if ("beforebegin" === h) {
          var l = this.previousSibling;
          e.call(this, h, k);
          g(l || this.parentNode.firstChild, this);
        } else if ("afterbegin" === h) l = this.firstChild, e.call(this, h, k), g(this.firstChild, l);else if ("beforeend" === h) l = this.lastChild, e.call(this, h, k), g(l || this.firstChild, null);else if ("afterend" === h) l = this.nextSibling, e.call(this, h, k), g(this.nextSibling, l);else throw new SyntaxError("The value provided (" + String(h) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
      };
    }

    y && (Element.prototype.attachShadow = function (d) {
      d = y.call(this, d);

      if (a.j && !d.__CE_patched) {
        d.__CE_patched = !0;

        for (var e = 0; e < a.m.length; e++) {
          a.m[e](d);
        }
      }

      return this.__CE_shadowRoot = d;
    });
    z && z.get ? b(Element.prototype, z) : I && I.get ? b(HTMLElement.prototype, I) : ta(a, function (d) {
      b(d, {
        enumerable: !0,
        configurable: !0,
        get: function get() {
          return q.call(this, !0).innerHTML;
        },
        set: function set(e) {
          var g = "template" === this.localName,
              h = g ? this.content : this,
              k = p.call(document, this.namespaceURI, this.localName);

          for (k.innerHTML = e; 0 < h.childNodes.length;) {
            u.call(h, h.childNodes[0]);
          }

          for (e = g ? k.content : k; 0 < e.childNodes.length;) {
            r.call(h, e.childNodes[0]);
          }
        }
      });
    });

    Element.prototype.setAttribute = function (d, e) {
      if (1 !== this.__CE_state) return B.call(this, d, e);
      var g = A.call(this, d);
      B.call(this, d, e);
      e = A.call(this, d);
      a.attributeChangedCallback(this, d, g, e, null);
    };

    Element.prototype.setAttributeNS = function (d, e, g) {
      if (1 !== this.__CE_state) return E.call(this, d, e, g);
      var h = D.call(this, d, e);
      E.call(this, d, e, g);
      g = D.call(this, d, e);
      a.attributeChangedCallback(this, e, h, g, d);
    };

    Element.prototype.removeAttribute = function (d) {
      if (1 !== this.__CE_state) return C.call(this, d);
      var e = A.call(this, d);
      C.call(this, d);
      null !== e && a.attributeChangedCallback(this, d, e, null, null);
    };

    Element.prototype.removeAttributeNS = function (d, e) {
      if (1 !== this.__CE_state) return F.call(this, d, e);
      var g = D.call(this, d, e);
      F.call(this, d, e);
      var h = D.call(this, d, e);
      g !== h && a.attributeChangedCallback(this, e, g, h, d);
    };

    na ? c(HTMLElement.prototype, na) : G && c(Element.prototype, G);
    oa ? f(HTMLElement.prototype, oa) : H && f(Element.prototype, H);
    Z(a, Element.prototype, {
      prepend: fa,
      append: ha
    });
    Ca(a);
  }

  ;
  var Ea = {};

  function Fa(a) {
    function b() {
      var c = this.constructor;

      var f = document.__CE_registry.C.get(c);

      if (!f) throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");
      var d = f.constructionStack;
      if (0 === d.length) return d = n.call(document, f.localName), Object.setPrototypeOf(d, c.prototype), d.__CE_state = 1, d.__CE_definition = f, R(a, d), d;
      var e = d.length - 1,
          g = d[e];
      if (g === Ea) throw Error("Failed to construct '" + f.localName + "': This element was already constructed.");
      d[e] = Ea;
      Object.setPrototypeOf(g, c.prototype);
      R(a, g);
      return g;
    }

    b.prototype = ma.prototype;
    Object.defineProperty(HTMLElement.prototype, "constructor", {
      writable: !0,
      configurable: !0,
      enumerable: !1,
      value: b
    });
    window.HTMLElement = b;
  }

  ;

  function Ga(a) {
    function b(c, f) {
      Object.defineProperty(c, "textContent", {
        enumerable: f.enumerable,
        configurable: !0,
        get: f.get,
        set: function set(d) {
          if (this.nodeType === Node.TEXT_NODE) f.set.call(this, d);else {
            var e = void 0;

            if (this.firstChild) {
              var g = this.childNodes,
                  h = g.length;

              if (0 < h && J(this)) {
                e = Array(h);

                for (var k = 0; k < h; k++) {
                  e[k] = g[k];
                }
              }
            }

            f.set.call(this, d);
            if (e) for (d = 0; d < e.length; d++) {
              U(a, e[d]);
            }
          }
        }
      });
    }

    Node.prototype.insertBefore = function (c, f) {
      if (c instanceof DocumentFragment) {
        var d = K(c);
        c = t.call(this, c, f);
        if (J(this)) for (f = 0; f < d.length; f++) {
          S(a, d[f]);
        }
        return c;
      }

      d = c instanceof Element && J(c);
      f = t.call(this, c, f);
      d && U(a, c);
      J(this) && S(a, c);
      return f;
    };

    Node.prototype.appendChild = function (c) {
      if (c instanceof DocumentFragment) {
        var f = K(c);
        c = r.call(this, c);
        if (J(this)) for (var d = 0; d < f.length; d++) {
          S(a, f[d]);
        }
        return c;
      }

      f = c instanceof Element && J(c);
      d = r.call(this, c);
      f && U(a, c);
      J(this) && S(a, c);
      return d;
    };

    Node.prototype.cloneNode = function (c) {
      c = q.call(this, !!c);
      this.ownerDocument.__CE_registry ? V(a, c) : Q(a, c);
      return c;
    };

    Node.prototype.removeChild = function (c) {
      var f = c instanceof Element && J(c),
          d = u.call(this, c);
      f && U(a, c);
      return d;
    };

    Node.prototype.replaceChild = function (c, f) {
      if (c instanceof DocumentFragment) {
        var d = K(c);
        c = v.call(this, c, f);
        if (J(this)) for (U(a, f), f = 0; f < d.length; f++) {
          S(a, d[f]);
        }
        return c;
      }

      d = c instanceof Element && J(c);
      var e = v.call(this, c, f),
          g = J(this);
      g && U(a, f);
      d && U(a, c);
      g && S(a, c);
      return e;
    };

    w && w.get ? b(Node.prototype, w) : sa(a, function (c) {
      b(c, {
        enumerable: !0,
        configurable: !0,
        get: function get() {
          for (var f = [], d = this.firstChild; d; d = d.nextSibling) {
            d.nodeType !== Node.COMMENT_NODE && f.push(d.textContent);
          }

          return f.join("");
        },
        set: function set(f) {
          for (; this.firstChild;) {
            u.call(this, this.firstChild);
          }

          null != f && "" !== f && r.call(this, document.createTextNode(f));
        }
      });
    });
  }

  ;
  var O = window.customElements;

  function Ha() {
    var a = new N();
    Fa(a);
    Ba(a);
    Z(a, DocumentFragment.prototype, {
      prepend: da,
      append: ea
    });
    Ga(a);
    Da(a);
    a = new Y(a);
    document.__CE_registry = a;
    Object.defineProperty(window, "customElements", {
      configurable: !0,
      enumerable: !0,
      value: a
    });
  }

  O && !O.forcePolyfill && "function" == typeof O.define && "function" == typeof O.get || Ha();
  window.__CE_installPolyfill = Ha;
}).call(self);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-prototype-of.js
var es_object_get_prototype_of = __webpack_require__(489);
;// CONCATENATED MODULE: ./specifications/whatwg/html/4.13.4.customElements.define/test.pure.js
function test_pure_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { test_pure_typeof = function _typeof(obj) { return typeof obj; }; } else { test_pure_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return test_pure_typeof(obj); }













































function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (test_pure_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

(function (cb) {
  var Foo = function (_HTMLElement) {
    _inherits(Foo, _HTMLElement);

    var _super = _createSuper(Foo);

    function Foo() {
      _classCallCheck(this, Foo);

      return _super.apply(this, arguments);
    }

    _createClass(Foo, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._baz = 'hello';
      }
    }, {
      key: "baz",
      value: function baz() {
        return this._baz;
      }
    }]);

    return Foo;
  }(_wrapNativeSuper(HTMLElement));

  customElements.define('web-test-foo', Foo);
  document.body.appendChild(new Foo());
  var foo = document.getElementsByTagName('web-test-foo')[0];
  cb(foo.baz() === 'hello');
})(callback);
}();
/******/ })()
;