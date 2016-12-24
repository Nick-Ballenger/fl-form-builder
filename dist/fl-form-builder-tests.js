(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

//
//    ACTION CREATORS
//

var undo = function undo(_) {
  return {
    type: "undo"
  };
};

var importCustomComponents = function importCustomComponents(customComponents) {
  return {
    type: "importCustomComponents",
    customComponents: customComponents
  };
};

var importState = function importState(newFieldsState) {
  return {
    type: "importState",
    newFieldsState: newFieldsState
  };
};

var createField = function createField(fieldType) {
  return {
    type: "createField",
    fieldType: fieldType
  };
};

var fieldCreated = function fieldCreated(createdFieldState) {
  return {
    type: "fieldCreated",
    createdFieldState: createdFieldState
  };
};

var toggleConfig = function toggleConfig(fieldState) {
  return {
    type: "toggleConfig",
    fieldState: fieldState
  };
};

var toggleRequired = function toggleRequired(fieldState) {
  return {
    type: "toggleRequired",
    fieldState: fieldState
  };
};

var deleteField = function deleteField(fieldState) {
  return {
    type: "deleteField",
    fieldState: fieldState
  };
};

var updateField = function updateField(newFieldState) {
  return {
    type: "updateField",
    newFieldState: newFieldState
  };
};

var reorderFields = function reorderFields(newFieldsOrder) {
  return {
    type: "reorderFields",
    newFieldsOrder: newFieldsOrder
  };
};

/* eslint-env jasmine */

describe("Action", function () {
  describe("undo", function () {
    it("returns the correct action type", function () {
      var action = undo();
      expect(action.type).toEqual("undo");
    });
  });

  describe("importState", function () {
    var mockStateToImport = ["a", "b"];

    it("returns the correct action type", function () {
      var action = importState(mockStateToImport);
      expect(action.type).toEqual("importState");
    });

    it("Creates the correct variables", function () {
      var action = importState(mockStateToImport);
      expect(action.newFieldsState).toEqual(mockStateToImport);
    });
  });

  describe("createField", function () {
    var fieldType = "testField";

    it("returns the correct action type", function () {
      var action = createField(fieldType);
      expect(action.type).toEqual("createField");
    });

    it("Creates the correct variables", function () {
      var action = createField(fieldType);
      expect(action.fieldType).toEqual(fieldType);
    });
  });

  describe("fieldCreated", function () {
    var createdFieldState = {};

    it("returns the correct action type", function () {
      var action = fieldCreated(createdFieldState);
      expect(action.type).toEqual("fieldCreated");
    });

    it("Creates the correct variables", function () {
      var action = fieldCreated(createdFieldState);
      expect(action.createdFieldState).toEqual(createdFieldState);
    });
  });

  describe("toggleConfig", function () {
    var fieldState = {};

    it("returns the correct action type", function () {
      var action = toggleConfig(fieldState);
      expect(action.type).toEqual("toggleConfig");
    });

    it("Creates the correct variables", function () {
      var action = toggleConfig(fieldState);
      expect(action.fieldState).toEqual(fieldState);
    });
  });

  describe("toggleRequired", function () {
    var fieldState = {};

    it("returns the correct action type", function () {
      var action = toggleRequired(fieldState);
      expect(action.type).toEqual("toggleRequired");
    });

    it("Creates the correct variables", function () {
      var action = toggleRequired(fieldState);
      expect(action.fieldState).toEqual(fieldState);
    });
  });

  describe("deleteField", function () {
    var fieldState = {};

    it("returns the correct action type", function () {
      var action = deleteField(fieldState);
      expect(action.type).toEqual("deleteField");
    });

    it("Creates the correct variables", function () {
      var action = deleteField(fieldState);
      expect(action.fieldState).toEqual(fieldState);
    });
  });

  describe("updateField", function () {
    var newFieldState = {};

    it("returns the correct action type", function () {
      var action = updateField(newFieldState);
      expect(action.type).toEqual("updateField");
    });

    it("Creates the correct variables", function () {
      var action = updateField(newFieldState);
      expect(action.newFieldState).toEqual(newFieldState);
    });
  });

  describe("reorderFields", function () {
    var newFieldsOrder = {};

    it("returns the correct action type", function () {
      var action = reorderFields(newFieldsOrder);
      expect(action.type).toEqual("reorderFields");
    });

    it("Creates the correct variables", function () {
      var action = reorderFields(newFieldsOrder);
      expect(action.newFieldsOrder).toEqual(newFieldsOrder);
    });
  });

  describe("importCustomComponents", function () {
    var customComponents = [];

    it("returns the correct action type", function () {
      var action = importCustomComponents(customComponents);
      expect(action.type).toEqual("importCustomComponents");
    });

    it("Creates the correct variables", function () {
      var action = importCustomComponents(customComponents);
      expect(action.customComponents).toEqual(customComponents);
    });
  });
});

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var seamlessImmutable = createCommonjsModule(function (module, exports) {
(function() {
  "use strict";

function immutableInit(config) {

  // https://github.com/facebook/react/blob/v15.0.1/src/isomorphic/classic/element/ReactElement.js#L21
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element');
  var REACT_ELEMENT_TYPE_FALLBACK = 0xeac7;

  var globalConfig = {
    use_static: false
  };
  if (isObject(config)) {
      if (config.use_static !== undefined) {
          globalConfig.use_static = Boolean(config.use_static);
      }
  }

  function isObject(data) {
    return (
      typeof data === 'object' &&
      !Array.isArray(data) &&
      data !== null
    );
  }

  function instantiateEmptyObject(obj) {
      var prototype = Object.getPrototypeOf(obj);
      if (!prototype) {
          return {};
      } else {
          return Object.create(prototype);
      }
  }

  function addPropertyTo(target, methodName, value) {
    Object.defineProperty(target, methodName, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: value
    });
  }

  function banProperty(target, methodName) {
    addPropertyTo(target, methodName, function() {
      throw new ImmutableError("The " + methodName +
        " method cannot be invoked on an Immutable data structure.");
    });
  }

  var immutabilityTag = "__immutable_invariants_hold";

  function addImmutabilityTag(target) {
    addPropertyTo(target, immutabilityTag, true);
  }

  function isImmutable(target) {
    if (typeof target === "object") {
      return target === null || Boolean(
        Object.getOwnPropertyDescriptor(target, immutabilityTag)
      );
    } else {
      // In JavaScript, only objects are even potentially mutable.
      // strings, numbers, null, and undefined are all naturally immutable.
      return true;
    }
  }

  function isEqual(a, b) {
    // Avoid false positives due to (NaN !== NaN) evaluating to true
    return (a === b || (a !== a && b !== b));
  }

  function isMergableObject(target) {
    return target !== null && typeof target === "object" && !(Array.isArray(target)) && !(target instanceof Date);
  }

  var mutatingObjectMethods = [
    "setPrototypeOf"
  ];

  var nonMutatingObjectMethods = [
    "keys"
  ];

  var mutatingArrayMethods = mutatingObjectMethods.concat([
    "push", "pop", "sort", "splice", "shift", "unshift", "reverse"
  ]);

  var nonMutatingArrayMethods = nonMutatingObjectMethods.concat([
    "map", "filter", "slice", "concat", "reduce", "reduceRight"
  ]);

  var mutatingDateMethods = mutatingObjectMethods.concat([
    "setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds",
    "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes",
    "setUTCMonth", "setUTCSeconds", "setYear"
  ]);

  function ImmutableError(message) {
    var err       = new Error(message);
    // TODO: Consider `Object.setPrototypeOf(err, ImmutableError);`
    err.__proto__ = ImmutableError;

    return err;
  }
  ImmutableError.prototype = Error.prototype;

  function makeImmutable(obj, bannedMethods) {
    // Tag it so we can quickly tell it's immutable later.
    addImmutabilityTag(obj);

    {
      // Make all mutating methods throw exceptions.
      for (var index in bannedMethods) {
        if (bannedMethods.hasOwnProperty(index)) {
          banProperty(obj, bannedMethods[index]);
        }
      }

      // Freeze it and return it.
      Object.freeze(obj);
    }

    return obj;
  }

  function makeMethodReturnImmutable(obj, methodName) {
    var currentMethod = obj[methodName];

    addPropertyTo(obj, methodName, function() {
      return Immutable(currentMethod.apply(obj, arguments));
    });
  }

  function arraySet(idx, value, config) {
    var deep          = config && config.deep;

    if (idx in this) {
      if (deep && this[idx] !== value && isMergableObject(value) && isMergableObject(this[idx])) {
        value = Immutable.merge(this[idx], value, {deep: true, mode: 'replace'});
      }
      if (isEqual(this[idx], value)) {
        return this;
      }
    }

    var mutable = asMutableArray.call(this);
    mutable[idx] = Immutable(value);
    return makeImmutableArray(mutable);
  }

  var immutableEmptyArray = Immutable([]);

  function arraySetIn(pth, value, config) {
    var head = pth[0];

    if (pth.length === 1) {
      return arraySet.call(this, head, value, config);
    } else {
      var tail = pth.slice(1);
      var thisHead = this[head];
      var newValue;

      if (typeof(thisHead) === "object" && thisHead !== null) {
        // Might (validly) be object or array
        newValue = Immutable.setIn(thisHead, tail, value);
      } else {
        var nextHead = tail[0];
        // If the next path part is a number, then we are setting into an array, else an object.
        if (nextHead !== '' && isFinite(nextHead)) {
          newValue = arraySetIn.call(immutableEmptyArray, tail, value);
        } else {
          newValue = objectSetIn.call(immutableEmptyObject, tail, value);
        }
      }

      if (head in this && thisHead === newValue) {
        return this;
      }

      var mutable = asMutableArray.call(this);
      mutable[head] = newValue;
      return makeImmutableArray(mutable);
    }
  }

  function makeImmutableArray(array) {
    // Don't change their implementations, but wrap these functions to make sure
    // they always return an immutable value.
    for (var index in nonMutatingArrayMethods) {
      if (nonMutatingArrayMethods.hasOwnProperty(index)) {
        var methodName = nonMutatingArrayMethods[index];
        makeMethodReturnImmutable(array, methodName);
      }
    }

    if (!globalConfig.use_static) {
      addPropertyTo(array, "flatMap",  flatMap);
      addPropertyTo(array, "asObject", asObject);
      addPropertyTo(array, "asMutable", asMutableArray);
      addPropertyTo(array, "set", arraySet);
      addPropertyTo(array, "setIn", arraySetIn);
      addPropertyTo(array, "update", update);
      addPropertyTo(array, "updateIn", updateIn);
    }

    for(var i = 0, length = array.length; i < length; i++) {
      array[i] = Immutable(array[i]);
    }

    return makeImmutable(array, mutatingArrayMethods);
  }

  function makeImmutableDate(date) {
    if (!globalConfig.use_static) {
      addPropertyTo(date, "asMutable", asMutableDate);
    }

    return makeImmutable(date, mutatingDateMethods);
  }

  function asMutableDate() {
    return new Date(this.getTime());
  }

  /**
   * Effectively performs a map() over the elements in the array, using the
   * provided iterator, except that whenever the iterator returns an array, that
   * array's elements are added to the final result instead of the array itself.
   *
   * @param {function} iterator - The iterator function that will be invoked on each element in the array. It will receive three arguments: the current value, the current index, and the current object.
   */
  function flatMap(iterator) {
    // Calling .flatMap() with no arguments is a no-op. Don't bother cloning.
    if (arguments.length === 0) {
      return this;
    }

    var result = [],
        length = this.length,
        index;

    for (index = 0; index < length; index++) {
      var iteratorResult = iterator(this[index], index, this);

      if (Array.isArray(iteratorResult)) {
        // Concatenate Array results into the return value we're building up.
        result.push.apply(result, iteratorResult);
      } else {
        // Handle non-Array results the same way map() does.
        result.push(iteratorResult);
      }
    }

    return makeImmutableArray(result);
  }

  /**
   * Returns an Immutable copy of the object without the given keys included.
   *
   * @param {array} keysToRemove - A list of strings representing the keys to exclude in the return value. Instead of providing a single array, this method can also be called by passing multiple strings as separate arguments.
   */
  function without(remove) {
    // Calling .without() with no arguments is a no-op. Don't bother cloning.
    if (typeof remove === "undefined" && arguments.length === 0) {
      return this;
    }

    if (typeof remove !== "function") {
      // If we weren't given an array, use the arguments list.
      var keysToRemoveArray = (Array.isArray(remove)) ?
         remove.slice() : Array.prototype.slice.call(arguments);

      // Convert numeric keys to strings since that's how they'll
      // come from the enumeration of the object.
      keysToRemoveArray.forEach(function(el, idx, arr) {
        if(typeof(el) === "number") {
          arr[idx] = el.toString();
        }
      });

      remove = function(val, key) {
        return keysToRemoveArray.indexOf(key) !== -1;
      };
    }

    var result = instantiateEmptyObject(this);

    for (var key in this) {
      if (this.hasOwnProperty(key) && remove(this[key], key) === false) {
        result[key] = this[key];
      }
    }

    return makeImmutableObject(result);
  }

  function asMutableArray(opts) {
    var result = [], i, length;

    if(opts && opts.deep) {
      for(i = 0, length = this.length; i < length; i++) {
        result.push(asDeepMutable(this[i]));
      }
    } else {
      for(i = 0, length = this.length; i < length; i++) {
        result.push(this[i]);
      }
    }

    return result;
  }

  /**
   * Effectively performs a [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) over the elements in the array, expecting that the iterator function
   * will return an array of two elements - the first representing a key, the other
   * a value. Then returns an Immutable Object constructed of those keys and values.
   *
   * @param {function} iterator - A function which should return an array of two elements - the first representing the desired key, the other the desired value.
   */
  function asObject(iterator) {
    // If no iterator was provided, assume the identity function
    // (suggesting this array is already a list of key/value pairs.)
    if (typeof iterator !== "function") {
      iterator = function(value) { return value; };
    }

    var result = {},
        length = this.length,
        index;

    for (index = 0; index < length; index++) {
      var pair  = iterator(this[index], index, this),
          key   = pair[0],
          value = pair[1];

      result[key] = value;
    }

    return makeImmutableObject(result);
  }

  function asDeepMutable(obj) {
    if (
      (!obj) ||
      (typeof obj !== 'object') ||
      (!Object.getOwnPropertyDescriptor(obj, immutabilityTag)) ||
      (obj instanceof Date)
    ) { return obj; }
    return Immutable.asMutable(obj, {deep: true});
  }

  function quickCopy(src, dest) {
    for (var key in src) {
      if (Object.getOwnPropertyDescriptor(src, key)) {
        dest[key] = src[key];
      }
    }

    return dest;
  }

  /**
   * Returns an Immutable Object containing the properties and values of both
   * this object and the provided object, prioritizing the provided object's
   * values whenever the same key is present in both objects.
   *
   * @param {object} other - The other object to merge. Multiple objects can be passed as an array. In such a case, the later an object appears in that list, the higher its priority.
   * @param {object} config - Optional config object that contains settings. Supported settings are: {deep: true} for deep merge and {merger: mergerFunc} where mergerFunc is a function
   *                          that takes a property from both objects. If anything is returned it overrides the normal merge behaviour.
   */
  function merge(other, config) {
    // Calling .merge() with no arguments is a no-op. Don't bother cloning.
    if (arguments.length === 0) {
      return this;
    }

    if (other === null || (typeof other !== "object")) {
      throw new TypeError("Immutable#merge can only be invoked with objects or arrays, not " + JSON.stringify(other));
    }

    var receivedArray = (Array.isArray(other)),
        deep          = config && config.deep,
        mode          = config && config.mode || 'merge',
        merger        = config && config.merger,
        result;

    // Use the given key to extract a value from the given object, then place
    // that value in the result object under the same key. If that resulted
    // in a change from this object's value at that key, set anyChanges = true.
    function addToResult(currentObj, otherObj, key) {
      var immutableValue = Immutable(otherObj[key]);
      var mergerResult = merger && merger(currentObj[key], immutableValue, config);
      var currentValue = currentObj[key];

      if ((result !== undefined) ||
        (mergerResult !== undefined) ||
        (!currentObj.hasOwnProperty(key)) ||
        !isEqual(immutableValue, currentValue)) {

        var newValue;

        if (mergerResult) {
          newValue = mergerResult;
        } else if (deep && isMergableObject(currentValue) && isMergableObject(immutableValue)) {
          newValue = Immutable.merge(currentValue, immutableValue, config);
        } else {
          newValue = immutableValue;
        }

        if (!isEqual(currentValue, newValue) || !currentObj.hasOwnProperty(key)) {
          if (result === undefined) {
            // Make a shallow clone of the current object.
            result = quickCopy(currentObj, instantiateEmptyObject(currentObj));
          }

          result[key] = newValue;
        }
      }
    }

    function clearDroppedKeys(currentObj, otherObj) {
      for (var key in currentObj) {
        if (!otherObj.hasOwnProperty(key)) {
          if (result === undefined) {
            // Make a shallow clone of the current object.
            result = quickCopy(currentObj, instantiateEmptyObject(currentObj));
          }
          delete result[key];
        }
      }
    }

    var key;

    // Achieve prioritization by overriding previous values that get in the way.
    if (!receivedArray) {
      // The most common use case: just merge one object into the existing one.
      for (key in other) {
        if (Object.getOwnPropertyDescriptor(other, key)) {
          addToResult(this, other, key);
        }
      }
      if (mode === 'replace') {
        clearDroppedKeys(this, other);
      }
    } else {
      // We also accept an Array
      for (var index = 0, length = other.length; index < length; index++) {
        var otherFromArray = other[index];

        for (key in otherFromArray) {
          if (otherFromArray.hasOwnProperty(key)) {
            addToResult(result !== undefined ? result : this, otherFromArray, key);
          }
        }
      }
    }

    if (result === undefined) {
      return this;
    } else {
      return makeImmutableObject(result);
    }
  }

  function objectReplace(value, config) {
    var deep          = config && config.deep;

    // Calling .replace() with no arguments is a no-op. Don't bother cloning.
    if (arguments.length === 0) {
      return this;
    }

    if (value === null || typeof value !== "object") {
      throw new TypeError("Immutable#replace can only be invoked with objects or arrays, not " + JSON.stringify(value));
    }

    return Immutable.merge(this, value, {deep: deep, mode: 'replace'});
  }

  var immutableEmptyObject = Immutable({});

  function objectSetIn(path, value, config) {
    if (!(path instanceof Array) || path.length === 0) {
      throw new TypeError("The first argument to Immutable#setIn must be an array containing at least one \"key\" string.");
    }

    var head = path[0];
    if (path.length === 1) {
      return objectSet.call(this, head, value, config);
    }

    var tail = path.slice(1);
    var newValue;
    var thisHead = this[head];

    if (this.hasOwnProperty(head) && typeof(thisHead) === "object" && thisHead !== null) {
      // Might (validly) be object or array
      newValue = Immutable.setIn(thisHead, tail, value);
    } else {
      newValue = objectSetIn.call(immutableEmptyObject, tail, value);
    }

    if (this.hasOwnProperty(head) && thisHead === newValue) {
      return this;
    }

    var mutable = quickCopy(this, instantiateEmptyObject(this));
    mutable[head] = newValue;
    return makeImmutableObject(mutable);
  }

  function objectSet(property, value, config) {
    var deep          = config && config.deep;

    if (this.hasOwnProperty(property)) {
      if (deep && this[property] !== value && isMergableObject(value) && isMergableObject(this[property])) {
        value = Immutable.merge(this[property], value, {deep: true, mode: 'replace'});
      }
      if (isEqual(this[property], value)) {
        return this;
      }
    }

    var mutable = quickCopy(this, instantiateEmptyObject(this));
    mutable[property] = Immutable(value);
    return makeImmutableObject(mutable);
  }

  function update(property, updater) {
    var restArgs = Array.prototype.slice.call(arguments, 2);
    var initialVal = this[property];
    return Immutable.set(this, property, updater.apply(initialVal, [initialVal].concat(restArgs)));
  }

  function getInPath(obj, path) {
    /*jshint eqnull:true */
    for (var i = 0, l = path.length; obj != null && i < l; i++) {
      obj = obj[path[i]];
    }

    return (i && i == l) ? obj : undefined;
  }

  function updateIn(path, updater) {
    var restArgs = Array.prototype.slice.call(arguments, 2);
    var initialVal = getInPath(this, path);

    return Immutable.setIn(this, path, updater.apply(initialVal, [initialVal].concat(restArgs)));
  }

  function asMutableObject(opts) {
    var result = instantiateEmptyObject(this), key;

    if(opts && opts.deep) {
      for (key in this) {
        if (this.hasOwnProperty(key)) {
          result[key] = asDeepMutable(this[key]);
        }
      }
    } else {
      for (key in this) {
        if (this.hasOwnProperty(key)) {
          result[key] = this[key];
        }
      }
    }

    return result;
  }

  // Creates plain object to be used for cloning
  function instantiatePlainObject() {
    return {};
  }

  // Finalizes an object with immutable methods, freezes it, and returns it.
  function makeImmutableObject(obj) {
    if (!globalConfig.use_static) {
      addPropertyTo(obj, "merge", merge);
      addPropertyTo(obj, "replace", objectReplace);
      addPropertyTo(obj, "without", without);
      addPropertyTo(obj, "asMutable", asMutableObject);
      addPropertyTo(obj, "set", objectSet);
      addPropertyTo(obj, "setIn", objectSetIn);
      addPropertyTo(obj, "update", update);
      addPropertyTo(obj, "updateIn", updateIn);
    }

    return makeImmutable(obj, mutatingObjectMethods);
  }

  // Returns true if object is a valid react element
  // https://github.com/facebook/react/blob/v15.0.1/src/isomorphic/classic/element/ReactElement.js#L326
  function isReactElement(obj) {
    return typeof obj === 'object' &&
           obj !== null &&
           (obj.$$typeof === REACT_ELEMENT_TYPE_FALLBACK || obj.$$typeof === REACT_ELEMENT_TYPE);
  }

  function isFileObject(obj) {
    return typeof File !== 'undefined' &&
           obj instanceof File;
  }

  function Immutable(obj, options, stackRemaining) {
    if (isImmutable(obj) || isReactElement(obj) || isFileObject(obj)) {
      return obj;
    } else if (Array.isArray(obj)) {
      return makeImmutableArray(obj.slice());
    } else if (obj instanceof Date) {
      return makeImmutableDate(new Date(obj.getTime()));
    } else {
      // Don't freeze the object we were given; make a clone and use that.
      var prototype = options && options.prototype;
      var instantiateEmptyObject =
        (!prototype || prototype === Object.prototype) ?
          instantiatePlainObject : (function() { return Object.create(prototype); });
      var clone = instantiateEmptyObject();

      {
        /*jshint eqnull:true */
        if (stackRemaining == null) {
          stackRemaining = 64;
        }
        if (stackRemaining <= 0) {
          throw new ImmutableError("Attempt to construct Immutable from a deeply nested object was detected." +
            " Have you tried to wrap an object with circular references (e.g. React element)?" +
            " See https://github.com/rtfeldman/seamless-immutable/wiki/Deeply-nested-object-was-detected for details.");
        }
        stackRemaining -= 1;
      }

      for (var key in obj) {
        if (Object.getOwnPropertyDescriptor(obj, key)) {
          clone[key] = Immutable(obj[key], undefined, stackRemaining);
        }
      }

      return makeImmutableObject(clone);
    }
  }

  // Wrapper to allow the use of object methods as static methods of Immutable.
  function toStatic(fn) {
    function staticWrapper() {
      var args = [].slice.call(arguments);
      var self = args.shift();
      return fn.apply(self, args);
    }

    return staticWrapper;
  }

  // Wrapper to allow the use of object methods as static methods of Immutable.
  // with the additional condition of choosing which function to call depending
  // if argument is an array or an object.
  function toStaticObjectOrArray(fnObject, fnArray) {
    function staticWrapper() {
      var args = [].slice.call(arguments);
      var self = args.shift();
      if (Array.isArray(self)) {
          return fnArray.apply(self, args);
      } else {
          return fnObject.apply(self, args);
      }
    }

    return staticWrapper;
  }

  // Wrapper to allow the use of object methods as static methods of Immutable.
  // with the additional condition of choosing which function to call depending
  // if argument is an array or an object or a date.
  function toStaticObjectOrDateOrArray(fnObject, fnArray, fnDate) {
    function staticWrapper() {
      var args = [].slice.call(arguments);
      var self = args.shift();
      if (Array.isArray(self)) {
          return fnArray.apply(self, args);
      } else if (self instanceof Date) {
          return fnDate.apply(self, args);
      } else {
          return fnObject.apply(self, args);
      }
    }

    return staticWrapper;
  }

  // Export the library
  Immutable.from           = Immutable;
  Immutable.isImmutable    = isImmutable;
  Immutable.ImmutableError = ImmutableError;
  Immutable.merge          = toStatic(merge);
  Immutable.replace        = toStatic(objectReplace);
  Immutable.without        = toStatic(without);
  Immutable.asMutable      = toStaticObjectOrDateOrArray(asMutableObject, asMutableArray, asMutableDate);
  Immutable.set            = toStaticObjectOrArray(objectSet, arraySet);
  Immutable.setIn          = toStaticObjectOrArray(objectSetIn, arraySetIn);
  Immutable.update         = toStatic(update);
  Immutable.updateIn       = toStatic(updateIn);
  Immutable.flatMap        = toStatic(flatMap);
  Immutable.asObject       = toStatic(asObject);
  if (!globalConfig.use_static) {
      Immutable.static = immutableInit({
          use_static: true
      });
  }

  Object.freeze(Immutable);

  return Immutable;
}

  var Immutable = immutableInit();
  /* istanbul ignore if */
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return Immutable;
    });
  } else if (typeof module === "object") {
    module.exports = Immutable;
  } else if (typeof exports === "object") {
    exports.Immutable = Immutable;
  } else if (typeof window === "object") {
    window.Immutable = Immutable;
  } else if (typeof commonjsGlobal === "object") {
    commonjsGlobal.Immutable = Immutable;
  }
})();
});

/* eslint-disable new-cap */
// This middleware will just add the property "async dispatch"
// to actions with the "async" propperty set to true
var asyncDispatchMiddleware = function asyncDispatchMiddleware(store) {
  return function (next) {
    return function (action) {
      var syncActivityFinished = false;
      var actionQueue = [];

      function flushQueue() {
        actionQueue.forEach(function (a) {
          return store.dispatch(a);
        }); // flush queue
        actionQueue = [];
      }

      function asyncDispatch(asyncAction) {
        actionQueue = actionQueue.concat([asyncAction]);

        if (syncActivityFinished) {
          flushQueue();
        }
      }

      var actionWithAsyncDispatch = seamlessImmutable(action).merge({ asyncDispatch: asyncDispatch });

      next(actionWithAsyncDispatch);
      syncActivityFinished = true;
      flushQueue();
    };
  };
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};



















var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/* eslint-env jasmine */
var fakeAction = { type: "fake action" };

describe("The asyncDispatchMiddleware", function () {
  it("calls next with asyncDispatch property", function (done) {
    var next = function next(returnedAction) {
      expect(returnedAction.asyncDispatch).not.toEqual(undefined);
      expect(_typeof(returnedAction.asyncDispatch)).toEqual("function");
      done();
    };

    asyncDispatchMiddleware("fakeStore")(next)(fakeAction);
  });

  it("asyncDispatch triggers a store dispatch", function (done) {
    var fakeAsyncAction = { type: "fakeAsyncAction" };

    var fakeStore = {
      dispatch: function dispatch(action) {
        expect(action.type).toEqual(fakeAsyncAction.type);
        done();
      }
    };

    var next = function next(returnedAction) {
      return returnedAction.asyncDispatch(fakeAsyncAction);
    };

    asyncDispatchMiddleware(fakeStore)(next)(fakeAction);
  });
});

// Bug checking function that will throw an error whenever
// the condition sent to it is evaluated to false
/**
 * Processes the message and outputs the correct message if the condition
 * is false. Otherwise it outputs null.
 * @api private
 * @method processCondition
 * @param  {Boolean} condition - Result of the evaluated condition
 * @param  {String} errorMessage - Message explainig the error in case it is thrown
 * @return {String | null}  - Error message if there is an error, nul otherwise.
 */
function processCondition(condition, errorMessage) {
  if (!condition) {
    var completeErrorMessage = '';
    var re = /at ([^\s]+)\s\(/g;
    var stackTrace = new Error().stack;
    var stackFunctions = [];

    var funcName = re.exec(stackTrace);
    while (funcName && funcName[1]) {
      stackFunctions.push(funcName[1]);
      funcName = re.exec(stackTrace);
    }

    // Number 0 is processCondition itself,
    // Number 1 is assert,
    // Number 2 is the caller function.
    if (stackFunctions[2]) {
      completeErrorMessage = stackFunctions[2] + ': ' + completeErrorMessage;
    }

    completeErrorMessage += errorMessage;
    return completeErrorMessage;
  }

  return null;
}

/**
 * Throws an error if the boolean passed to it evaluates to false.
 * To be used like this:
 * 		assert(myDate !== undefined, "Date cannot be undefined.");
 * @api public
 * @method assert
 * @param  {Boolean} condition - Result of the evaluated condition
 * @param  {String} errorMessage - Message explainig the error in case it is thrown
 * @return void
 */
function assert(condition, errorMessage) {
  var error = processCondition(condition, errorMessage);
  if (typeof error === 'string') {
    throw new Error(error);
  }
}

/**
 * Logs a warning if the boolean passed to it evaluates to false.
 * To be used like this:
 * 		assert.warn(myDate !== undefined, "No date provided.");
 * @api public
 * @method warn
 * @param  {Boolean} condition - Result of the evaluated condition
 * @param  {String} errorMessage - Message explainig the error in case it is thrown
 * @return void
 */
assert.warn = function warn(condition, errorMessage) {
  var error = processCondition(condition, errorMessage);
  if (typeof error === 'string') {
    console.warn(error);
  }
};

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
var _isArray$1 = Array.isArray || function _isArray$1(val) {
  return (val != null &&
          val.length >= 0 &&
          Object.prototype.toString.call(val) === '[object Array]');
};

/**
 * An optimized, private array `slice` implementation.
 *
 * @private
 * @param {Arguments|Array} args The array or arguments object to consider.
 * @param {Number} [from=0] The array index to slice from, inclusive.
 * @param {Number} [to=args.length] The array index to slice to, exclusive.
 * @return {Array} A new, sliced array.
 * @example
 *
 *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
 *
 *      var firstThreeArgs = function(a, b, c, d) {
 *        return _slice(arguments, 0, 3);
 *      };
 *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
 */
var _slice$1 = function _slice$1(args, from, to) {
  switch (arguments.length) {
    case 1: return _slice$1(args, 0, args.length);
    case 2: return _slice$1(args, from, args.length);
    default:
      var list = [];
      var idx = 0;
      var len = Math.max(0, Math.min(args.length, to) - from);
      while (idx < len) {
        list[idx] = args[from + idx];
        idx += 1;
      }
      return list;
  }
};

var _isArray = _isArray$1;
var _slice = _slice$1;


/**
 * Similar to hasMethod, this checks whether a function has a [methodname]
 * function. If it isn't an array it will execute that function otherwise it
 * will default to the ramda implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */
var _checkForMethod$1 = function _checkForMethod$1(methodname, fn) {
  return function() {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    return (_isArray(obj) || typeof obj[methodname] !== 'function') ?
      fn.apply(this, arguments) :
      obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
  };
};

var _isPlaceholder$2 = function _isPlaceholder$2(a) {
  return a != null &&
         typeof a === 'object' &&
         a['@@functional/placeholder'] === true;
};

var _isPlaceholder$1 = _isPlaceholder$2;


/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
var _curry1$1 = function _curry1$1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder$1(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
};

var _curry1$3 = _curry1$1;
var _isPlaceholder$4 = _isPlaceholder$2;


/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
var _curry2$1 = function _curry2$1(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder$4(a) ? f2
             : _curry1$3(function(_b) { return fn(a, _b); });
      default:
        return _isPlaceholder$4(a) && _isPlaceholder$4(b) ? f2
             : _isPlaceholder$4(a) ? _curry1$3(function(_a) { return fn(_a, b); })
             : _isPlaceholder$4(b) ? _curry1$3(function(_b) { return fn(a, _b); })
             : fn(a, b);
    }
  };
};

var _curry1 = _curry1$1;
var _curry2 = _curry2$1;
var _isPlaceholder = _isPlaceholder$2;


/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
var _curry3$1 = function _curry3$1(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a) ? f3
             : _curry2(function(_b, _c) { return fn(a, _b, _c); });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3
             : _isPlaceholder(a) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
             : _isPlaceholder(b) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
             : _curry1(function(_c) { return fn(a, b, _c); });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3
             : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) { return fn(_a, _b, c); })
             : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
             : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b, c); })
             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b, c); })
             : _isPlaceholder(c) ? _curry1(function(_c) { return fn(a, b, _c); })
             : fn(a, b, c);
    }
  };
};

var _checkForMethod = _checkForMethod$1;
var _curry3 = _curry3$1;


/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */
var slice = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));

var _curry3$3 = _curry3$1;


/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the result of applying the given function to
 * the focused value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> (a -> a) -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *
 *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
 */
var over = (function() {
  // `Identity` is a functor that holds a single value, where `map` simply
  // transforms the held value with the provided function.
  var Identity = function(x) {
    return {value: x, map: function(f) { return Identity(f(x)); }};
  };

  return _curry3$3(function over(lens, f, x) {
    // The value returned by the getter function is first transformed with `f`,
    // then set as the value of an `Identity`. This is then mapped over with the
    // setter function of the lens.
    return lens(function(y) { return Identity(f(y)); })(x).value;
  });
}());

var _curry1$4 = _curry1$1;


/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 *
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> (* -> a)
 * @param {*} val The value to wrap in a function
 * @return {Function} A Function :: * -> val.
 * @example
 *
 *      var t = R.always('Tee');
 *      t(); //=> 'Tee'
 */
var always$1 = _curry1$4(function always$1(val) {
  return function() {
    return val;
  };
});

var _curry3$4 = _curry3$1;
var always = always$1;
var over$1 = over;


/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> a -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
 *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
 */
var set$1 = _curry3$4(function set$1(lens, v, x) {
  return over$1(lens, always(v), x);
});

var _arity$1 = function _arity$1(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0: return function() { return fn.apply(this, arguments); };
    case 1: return function(a0) { return fn.apply(this, arguments); };
    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
};

var _pipe$1 = function _pipe$1(f, g) {
  return function() {
    return g.call(this, f.apply(this, arguments));
  };
};

var _xwrap$1 = (function() {
  function XWrap(fn) {
    this.f = fn;
  }
  XWrap.prototype['@@transducer/init'] = function() {
    throw new Error('init not implemented on XWrap');
  };
  XWrap.prototype['@@transducer/result'] = function(acc) { return acc; };
  XWrap.prototype['@@transducer/step'] = function(acc, x) {
    return this.f(acc, x);
  };

  return function _xwrap$1(fn) { return new XWrap(fn); };
}());

var _arity$3 = _arity$1;
var _curry2$3 = _curry2$1;


/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      var log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 */
var bind$1 = _curry2$3(function bind$1(fn, thisObj) {
  return _arity$3(fn.length, function() {
    return fn.apply(thisObj, arguments);
  });
});

var _isString$1 = function _isString$1(x) {
  return Object.prototype.toString.call(x) === '[object String]';
};

var _curry1$5 = _curry1$1;
var _isArray$3 = _isArray$1;
var _isString = _isString$1;


/**
 * Tests whether or not an object is similar to an array.
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      R.isArrayLike([]); //=> true
 *      R.isArrayLike(true); //=> false
 *      R.isArrayLike({}); //=> false
 *      R.isArrayLike({length: 10}); //=> false
 *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */
var isArrayLike$1 = _curry1$5(function isArrayLike$1(x) {
  if (_isArray$3(x)) { return true; }
  if (!x) { return false; }
  if (typeof x !== 'object') { return false; }
  if (_isString(x)) { return false; }
  if (x.nodeType === 1) { return !!x.length; }
  if (x.length === 0) { return true; }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});

var _xwrap = _xwrap$1;
var bind = bind$1;
var isArrayLike = isArrayLike$1;


var _reduce$1 = (function() {
  function _arrayReduce(xf, acc, list) {
    var idx = 0;
    var len = list.length;
    while (idx < len) {
      acc = xf['@@transducer/step'](acc, list[idx]);
      if (acc && acc['@@transducer/reduced']) {
        acc = acc['@@transducer/value'];
        break;
      }
      idx += 1;
    }
    return xf['@@transducer/result'](acc);
  }

  function _iterableReduce(xf, acc, iter) {
    var step = iter.next();
    while (!step.done) {
      acc = xf['@@transducer/step'](acc, step.value);
      if (acc && acc['@@transducer/reduced']) {
        acc = acc['@@transducer/value'];
        break;
      }
      step = iter.next();
    }
    return xf['@@transducer/result'](acc);
  }

  function _methodReduce(xf, acc, obj) {
    return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
  }

  var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';
  return function _reduce$1(fn, acc, list) {
    if (typeof fn === 'function') {
      fn = _xwrap(fn);
    }
    if (isArrayLike(list)) {
      return _arrayReduce(fn, acc, list);
    }
    if (typeof list.reduce === 'function') {
      return _methodReduce(fn, acc, list);
    }
    if (list[symIterator] != null) {
      return _iterableReduce(fn, acc, list[symIterator]());
    }
    if (typeof list.next === 'function') {
      return _iterableReduce(fn, acc, list);
    }
    throw new TypeError('reduce: list must be array or iterable');
  };
}());

var _curry3$5 = _curry3$1;
var _reduce = _reduce$1;


/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * `R.reduced` to shortcut the iteration.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex
 * @example
 *
 *      var numbers = [1, 2, 3];
 *      var plus = (a, b) => a + b;
 *
 *      R.reduce(plus, 10, numbers); //=> 16
 */
var reduce$1 = _curry3$5(_reduce);

var _checkForMethod$3 = _checkForMethod$1;
var slice$1 = slice;


/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */
var tail$1 = _checkForMethod$3('tail', slice$1(1, Infinity));

var _arity = _arity$1;
var _pipe = _pipe$1;
var reduce = reduce$1;
var tail = tail$1;


/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      var f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 */
var pipe = function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }
  return _arity(arguments[0].length,
                reduce(_pipe, arguments[0], tail(arguments)));
};

/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
var _concat$2 = function _concat$2(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];

  idx = 0;
  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }
  idx = 0;
  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }
  return result;
};

var _concat$1 = _concat$2;
var _curry2$4 = _curry2$1;


/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The item to add to the head of the output list.
 * @param {Array} list The array to add to the tail of the output list.
 * @return {Array} A new array.
 * @see R.append
 * @example
 *
 *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 */
var prepend = _curry2$4(function prepend(el, list) {
  return _concat$1([el], list);
});

var _curry2$5 = _curry2$1;


/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig s -> {s: a} -> a | Undefined
 * @param {String} p The property name
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 */
var prop$1 = _curry2$5(function prop$1(p, obj) { return obj[p]; });

var _isTransformer$1 = function _isTransformer$1(obj) {
  return typeof obj['@@transducer/step'] === 'function';
};

var _isArray$4 = _isArray$1;
var _isTransformer = _isTransformer$1;
var _slice$3 = _slice$1;


/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with [methodname], it will execute that
 * function (functor case). Otherwise, if it is a transformer, uses transducer
 * [xf] to return a new transformer (transducer case). Otherwise, it will
 * default to executing [fn].
 *
 * @private
 * @param {String} methodname property to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */
var _dispatchable$1 = function _dispatchable$1(methodname, xf, fn) {
  return function() {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    if (!_isArray$4(obj)) {
      var args = _slice$3(arguments, 0, length - 1);
      if (typeof obj[methodname] === 'function') {
        return obj[methodname].apply(obj, args);
      }
      if (_isTransformer(obj)) {
        var transducer = xf.apply(null, args);
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
};

var _map$2 = function _map$2(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);
  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }
  return result;
};

var _xfBase$1 = {
  init: function() {
    return this.xf['@@transducer/init']();
  },
  result: function(result) {
    return this.xf['@@transducer/result'](result);
  }
};

var _curry2$8 = _curry2$1;
var _xfBase = _xfBase$1;


var _xmap$1 = (function() {
  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XMap.prototype['@@transducer/init'] = _xfBase.init;
  XMap.prototype['@@transducer/result'] = _xfBase.result;
  XMap.prototype['@@transducer/step'] = function(result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
  };

  return _curry2$8(function _xmap$1(f, xf) { return new XMap(f, xf); });
}());

var _arity$5 = _arity$1;
var _isPlaceholder$5 = _isPlaceholder$2;


/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
var _curryN$1 = function _curryN$1(length, received, fn) {
  return function() {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length &&
          (!_isPlaceholder$5(received[combinedIdx]) ||
           argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder$5(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined)
                     : _arity$5(left, _curryN$1(length, combined, fn));
  };
};

var _arity$4 = _arity$1;
var _curry1$6 = _curry1$1;
var _curry2$9 = _curry2$1;
var _curryN = _curryN$1;


/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value `R.__` may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
 * following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
var curryN$1 = _curry2$9(function curryN$1(length, fn) {
  if (length === 1) {
    return _curry1$6(fn);
  }
  return _arity$4(length, _curryN(length, [], fn));
});

var _has$1 = function _has$1(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

var _has$3 = _has$1;


var _isArguments$1 = (function() {
  var toString = Object.prototype.toString;
  return toString.call(arguments) === '[object Arguments]' ?
    function _isArguments$1(x) { return toString.call(x) === '[object Arguments]'; } :
    function _isArguments$1(x) { return _has$3('callee', x); };
}());

var _curry1$7 = _curry1$1;
var _has = _has$1;
var _isArguments = _isArguments$1;


/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */
var keys$1 = (function() {
  // cover IE < 9 keys issues
  var hasEnumBug = !({toString: null}).propertyIsEnumerable('toString');
  var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString',
                            'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
  // Safari bug
  var hasArgsEnumBug = (function() {
    'use strict';
    return arguments.propertyIsEnumerable('length');
  }());

  var contains = function contains(list, item) {
    var idx = 0;
    while (idx < list.length) {
      if (list[idx] === item) {
        return true;
      }
      idx += 1;
    }
    return false;
  };

  return typeof Object.keys === 'function' && !hasArgsEnumBug ?
    _curry1$7(function keys$1(obj) {
      return Object(obj) !== obj ? [] : Object.keys(obj);
    }) :
    _curry1$7(function keys$1(obj) {
      if (Object(obj) !== obj) {
        return [];
      }
      var prop, nIdx;
      var ks = [];
      var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
      for (prop in obj) {
        if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
          ks[ks.length] = prop;
        }
      }
      if (hasEnumBug) {
        nIdx = nonEnumerableProps.length - 1;
        while (nIdx >= 0) {
          prop = nonEnumerableProps[nIdx];
          if (_has(prop, obj) && !contains(ks, prop)) {
            ks[ks.length] = prop;
          }
          nIdx -= 1;
        }
      }
      return ks;
    });
}());

var _curry2$7 = _curry2$1;
var _dispatchable = _dispatchable$1;
var _map$1 = _map$2;
var _reduce$3 = _reduce$1;
var _xmap = _xmap$1;
var curryN = curryN$1;
var keys = keys$1;


/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex
 * @example
 *
 *      var double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 */
var map$1 = _curry2$7(_dispatchable('map', _xmap, function map$1(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return curryN(functor.length, function() {
        return fn.call(this, functor.apply(this, arguments));
      });
    case '[object Object]':
      return _reduce$3(function(acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, keys(functor));
    default:
      return _map$1(fn, functor);
  }
}));

var _curry2$6 = _curry2$1;
var map = map$1;


/**
 * Returns a lens for the given getter and setter functions. The getter "gets"
 * the value of the focus; the setter "sets" the value of the focus. The setter
 * should not mutate the data structure.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
 * @param {Function} getter
 * @param {Function} setter
 * @return {Lens}
 * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lens(R.prop('x'), R.assoc('x'));
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */
var lens$1 = _curry2$6(function lens$1(getter, setter) {
  return function(toFunctorFn) {
    return function(target) {
      return map(
        function(focus) {
          return setter(focus, target);
        },
        toFunctorFn(getter(target))
      );
    };
  };
});

var _curry1$8 = _curry1$1;
var curryN$3 = curryN$1;


/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value `R.__` may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
 * following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN
 * @example
 *
 *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      var curriedAddFourNumbers = R.curry(addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
var curry$1 = _curry1$8(function curry$1(fn) {
  return curryN$3(fn.length, fn);
});

// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * @module lib/either
 */
var either = Either$1;

// -- Aliases ----------------------------------------------------------
var clone         = Object.create;
var unimplemented = function(){ throw new Error('Not implemented.') };
var noop          = function(){ return this                         };


// -- Implementation ---------------------------------------------------

/**
 * The `Either(a, b)` structure represents the logical disjunction between `a`
 * and `b`. In other words, `Either` may contain either a value of type `a` or
 * a value of type `b`, at any given time. This particular implementation is
 * biased on the right value (`b`), thus projections will take the right value
 * over the left one.
 *
 * This class models two different cases: `Left a` and `Right b`, and can hold
 * one of the cases at any given time. The projections are, none the less,
 * biased for the `Right` case, thus a common use case for this structure is to
 * hold the results of computations that may fail, when you want to store
 * additional information on the failure (instead of throwing an exception).
 *
 * Furthermore, the values of `Either(a, b)` can be combined and manipulated by
 * using the expressive monadic operations. This allows safely sequencing
 * operations that may fail, and safely composing values that you don't know
 * whether they're present or not, failing early (returning a `Left a`) if any
 * of the operations fail.
 *
 * While this class can certainly model input validations, the [Validation][]
 * structure lends itself better to that use case, since it can naturally
 * aggregate failures — monads shortcut on the first failure.
 *
 * [Validation]: https://github.com/folktale/data.validation
 *
 *
 * @class
 * @summary
 * Either[α, β] <: Applicative[β]
 *               , Functor[β]
 *               , Chain[β]
 *               , Show
 *               , Eq
 */
function Either$1() { }

Left.prototype = clone(Either$1.prototype);
function Left(a) {
  this.value = a;
}

Right.prototype = clone(Either$1.prototype);
function Right(a) {
  this.value = a;
}

// -- Constructors -----------------------------------------------------

/**
 * Constructs a new `Either[α, β]` structure holding a `Left` value. This
 * usually represents a failure due to the right-bias of this structure.
 *
 * @summary a → Either[α, β]
 */
Either$1.Left = function(a) {
  return new Left(a)
};
Either$1.prototype.Left = Either$1.Left;

/**
 * Constructs a new `Either[α, β]` structure holding a `Right` value. This
 * usually represents a successful value due to the right bias of this
 * structure.
 *
 * @summary β → Either[α, β]
 */
Either$1.Right = function(a) {
  return new Right(a)
};
Either$1.prototype.Right = Either$1.Right;


// -- Conversions ------------------------------------------------------

/**
 * Constructs a new `Either[α, β]` structure from a nullable type.
 *
 * Takes the `Left` case if the value is `null` or `undefined`. Takes the
 * `Right` case otherwise.
 *
 * @summary α → Either[α, α]
 */
Either$1.fromNullable = function(a) {
  return a != null?       new Right(a)
  :      /* otherwise */  new Left(a)
};
Either$1.prototype.fromNullable = Either$1.fromNullable;

/**
 * Constructs a new `Either[α, β]` structure from a `Validation[α, β]` type.
 *
 * @summary Validation[α, β] → Either[α, β]
 */
Either$1.fromValidation = function(a) {
  return a.fold(Either$1.Left, Either$1.Right)
};

/**
 * Executes a synchronous computation that may throw and converts it to an
 * Either type.
 *
 * @summary (α₁, α₂, ..., αₙ -> β :: throws γ) -> (α₁, α₂, ..., αₙ -> Either[γ, β])
 */
Either$1.try = function(f) {
  return function() {
    try {
      return new Right(f.apply(null, arguments))
    } catch(e) {
      return new Left(e)
    }
  }
};


// -- Predicates -------------------------------------------------------

/**
 * True if the `Either[α, β]` contains a `Left` value.
 *
 * @summary Boolean
 */
Either$1.prototype.isLeft = false;
Left.prototype.isLeft   = true;

/**
 * True if the `Either[α, β]` contains a `Right` value.
 *
 * @summary Boolean
 */
Either$1.prototype.isRight = false;
Right.prototype.isRight  = true;


// -- Applicative ------------------------------------------------------

/**
 * Creates a new `Either[α, β]` instance holding the `Right` value `b`.
 *
 * `b` can be any value, including `null`, `undefined` or another
 * `Either[α, β]` structure.
 *
 * @summary β → Either[α, β]
 */
Either$1.of = function(a) {
  return new Right(a)
};
Either$1.prototype.of = Either$1.of;


/**
 * Applies the function inside the `Right` case of the `Either[α, β]` structure
 * to another applicative type.
 *
 * The `Either[α, β]` should contain a function value, otherwise a `TypeError`
 * is thrown.
 *
 * @method
 * @summary (@Either[α, β → γ], f:Applicative[_]) => f[β] → f[γ]
 */
Either$1.prototype.ap = unimplemented;

Left.prototype.ap = function(b) {
  return this
};

Right.prototype.ap = function(b) {
  return b.map(this.value)
};


// -- Functor ----------------------------------------------------------

/**
 * Transforms the `Right` value of the `Either[α, β]` structure using a regular
 * unary function.
 *
 * @method
 * @summary (@Either[α, β]) => (β → γ) → Either[α, γ]
 */
Either$1.prototype.map = unimplemented;
Left.prototype.map   = noop;

Right.prototype.map = function(f) {
  return this.of(f(this.value))
};


// -- Chain ------------------------------------------------------------

/**
 * Transforms the `Right` value of the `Either[α, β]` structure using an unary
 * function to monads.
 *
 * @method
 * @summary (@Either[α, β], m:Monad[_]) => (β → m[γ]) → m[γ]
 */
Either$1.prototype.chain = unimplemented;
Left.prototype.chain   = noop;

Right.prototype.chain = function(f) {
  return f(this.value)
};


// -- Show -------------------------------------------------------------

/**
 * Returns a textual representation of the `Either[α, β]` structure.
 *
 * @method
 * @summary (@Either[α, β]) => Void → String
 */
Either$1.prototype.toString = unimplemented;

Left.prototype.toString = function() {
  return 'Either.Left(' + this.value + ')'
};

Right.prototype.toString = function() {
  return 'Either.Right(' + this.value + ')'
};


// -- Eq ---------------------------------------------------------------

/**
 * Tests if an `Either[α, β]` structure is equal to another `Either[α, β]`
 * structure.
 *
 * @method
 * @summary (@Either[α, β]) => Either[α, β] → Boolean
 */
Either$1.prototype.isEqual = unimplemented;

Left.prototype.isEqual = function(a) {
  return a.isLeft && (a.value === this.value)
};

Right.prototype.isEqual = function(a) {
  return a.isRight && (a.value === this.value)
};


// -- Extracting and recovering ----------------------------------------

/**
 * Extracts the `Right` value out of the `Either[α, β]` structure, if it
 * exists. Otherwise throws a `TypeError`.
 *
 * @method
 * @summary (@Either[α, β]) => Void → β         :: partial, throws
 * @see {@link module:lib/either~Either#getOrElse} — A getter that can handle failures.
 * @see {@link module:lib/either~Either#merge} — The convergence of both values.
 * @throws {TypeError} if the structure has no `Right` value.
 */
Either$1.prototype.get = unimplemented;

Left.prototype.get = function() {
  throw new TypeError("Can't extract the value of a Left(a).")
};

Right.prototype.get = function() {
  return this.value
};


/**
 * Extracts the `Right` value out of the `Either[α, β]` structure. If the
 * structure doesn't have a `Right` value, returns the given default.
 *
 * @method
 * @summary (@Either[α, β]) => β → β
 */
Either$1.prototype.getOrElse = unimplemented;

Left.prototype.getOrElse = function(a) {
  return a
};

Right.prototype.getOrElse = function(_) {
  return this.value
};


/**
 * Transforms a `Left` value into a new `Either[α, β]` structure. Does nothing
 * if the structure contain a `Right` value.
 *
 * @method
 * @summary (@Either[α, β]) => (α → Either[γ, β]) → Either[γ, β]
 */
Either$1.prototype.orElse = unimplemented;
Right.prototype.orElse  = noop;

Left.prototype.orElse = function(f) {
  return f(this.value)
};


/**
 * Returns the value of whichever side of the disjunction that is present.
 *
 * @summary (@Either[α, α]) => Void → α
 */
Either$1.prototype.merge = function() {
  return this.value
};


// -- Folds and Extended Transformations -------------------------------

/**
 * Applies a function to each case in this data structure.
 *
 * @method
 * @summary (@Either[α, β]) => (α → γ), (β → γ) → γ
 */
Either$1.prototype.fold = unimplemented;

Left.prototype.fold = function(f, _) {
  return f(this.value)
};

Right.prototype.fold = function(_, g) {
  return g(this.value)
};

/**
 * Catamorphism.
 * 
 * @method
 * @summary (@Either[α, β]) => { Left: α → γ, Right: β → γ } → γ
 */
Either$1.prototype.cata = unimplemented;

Left.prototype.cata = function(pattern) {
  return pattern.Left(this.value)
};

Right.prototype.cata = function(pattern) {
  return pattern.Right(this.value)
};


/**
 * Swaps the disjunction values.
 *
 * @method
 * @summary (@Either[α, β]) => Void → Either[β, α]
 */
Either$1.prototype.swap = unimplemented;

Left.prototype.swap = function() {
  return this.Right(this.value)
};

Right.prototype.swap = function() {
  return this.Left(this.value)
};


/**
 * Maps both sides of the disjunction.
 *
 * @method
 * @summary (@Either[α, β]) => (α → γ), (β → δ) → Either[γ, δ]
 */
Either$1.prototype.bimap = unimplemented;

Left.prototype.bimap = function(f, _) {
  return this.Left(f(this.value))
};

Right.prototype.bimap = function(_, g) {
  return this.Right(g(this.value))
};


/**
 * Maps the left side of the disjunction.
 *
 * @method
 * @summary (@Either[α, β]) => (α → γ) → Either[γ, β]
 */
Either$1.prototype.leftMap = unimplemented;
Right.prototype.leftMap  = noop;

Left.prototype.leftMap = function(f) {
  return this.Left(f(this.value))
};

// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var index = either;

/* eslint-disable new-cap */

var updateAt = curry$1(function (keyArray, newVal, obj) {
  var deepNewVal = keyArray.reduceRight(function (result, key) {
    return defineProperty({}, key, result);
  }, newVal);

  return seamlessImmutable(obj).merge(deepNewVal, { deep: true });
});

// State lenses
var StateLenses = {
  fieldTypes: lens$1(prop$1("fieldTypes"), updateAt(["fieldTypes"])),
  fieldsState: lens$1(prop$1("fieldsState"), updateAt(["fieldsState"])),
  fieldsStateHistory: lens$1(prop$1("fieldsStateHistory"), updateAt(["fieldsStateHistory"]))
};

// _ => String
var createId = function createId(_) {
  return (Date.now() + Math.random()).toString();
};

// State -> [fieldsState] -> State
var pushHistoryState = curry$1(function (state, newHistoryState) {
  return pipe(
  // Add current state to history
  over(StateLenses.fieldsStateHistory, prepend(state.fieldsState)),
  // Make new State the current
  set$1(StateLenses.fieldsState, newHistoryState))(state);
});

// State -> State
var hideConfigs = function hideConfigs(state) {
  return set$1(StateLenses.fieldsState, state.fieldsState.map(function (s) {
    return Object.assign({}, s, { configShowing: false });
  }), state);
};

// String -> String -> Object -> Either String Object
var propertyTypeCheck = curry$1(function (propertyName, type, obj) {
  return _typeof(obj[propertyName]) === type ? index.Right(obj) : index.Left("Property '" + propertyName + "' cannot be of type " + _typeof(obj[propertyName]));
});

// Checks that a field has its essential properties
// Object -> Either String Object
var validateField = function validateField(fieldState) {
  return index.fromNullable(fieldState).leftMap(function (fs) {
    return "A field State cannot be empty " + (typeof fs === "undefined" ? "undefined" : _typeof(fs));
  }).chain(propertyTypeCheck("required", "boolean")).chain(propertyTypeCheck("configShowing", "boolean")).chain(propertyTypeCheck("id", "string"));
};

var lastHistoryState = function lastHistoryState(state) {
  return state.fieldsStateHistory[0] || [];
};

var undo$1 = function undo$1(state, _) {
  return pipe(
  // Make last history last state the current one
  set$1(StateLenses.fieldsState, lastHistoryState(state)),
  // Remove last history state from the history array
  over(StateLenses.fieldsStateHistory, slice(1, Infinity)))(state);
};

var _identity$1 = function _identity$1(x) { return x; };

var _curry1$9 = _curry1$1;
var _identity = _identity$1;


/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      R.identity(1); //=> 1
 *
 *      var obj = {};
 *      R.identity(obj) === obj; //=> true
 */
var identity = _curry1$9(_identity);

var _curry2$10 = _curry2$1;


/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig [String] -> {k: v} -> v | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 */
var path = _curry2$10(function path(paths, obj) {
  var val = obj;
  var idx = 0;
  while (idx < paths.length) {
    if (val == null) {
      return;
    }
    val = val[paths[idx]];
    idx += 1;
  }
  return val;
});

var _concat$4 = _concat$2;
var _curry2$12 = _curry2$1;
var _reduce$4 = _reduce$1;
var map$4 = map$1;


/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @param {Array} fns An array of functions
 * @param {Array} vs An array of values
 * @return {Array} An array of results of applying each of `fns` to all of `vs` in turn.
 * @example
 *
 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 */
var ap$1 = _curry2$12(function ap$1(applicative, fn) {
  return (
    typeof applicative.ap === 'function' ?
      applicative.ap(fn) :
    typeof applicative === 'function' ?
      function(x) { return applicative(x)(fn(x)); } :
    // else
      _reduce$4(function(acc, f) { return _concat$4(acc, map$4(f, fn)); }, [], applicative)
  );
});

var _curry3$7 = _curry3$1;


/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * Similar to `reduce`, except moves through the input list from the right to
 * the left.
 *
 * The iterator function receives two values: *(acc, value)*
 *
 * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a,b -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex
 * @example
 *
 *      var pairs = [ ['a', 1], ['b', 2], ['c', 3] ];
 *      var flattenPairs = (acc, pair) => acc.concat(pair);
 *
 *      R.reduceRight(flattenPairs, [], pairs); //=> [ 'c', 3, 'b', 2, 'a', 1 ]
 */
var reduceRight$1 = _curry3$7(function reduceRight$1(fn, acc, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    acc = fn(acc, list[idx]);
    idx -= 1;
  }
  return acc;
});

var _curry2$11 = _curry2$1;
var ap = ap$1;
var map$3 = map$1;
var prepend$1 = prepend;
var reduceRight = reduceRight$1;


/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 *
 * Dispatches to the `sequence` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
 * @param {Function} of
 * @param {*} traversable
 * @return {*}
 * @see R.traverse
 * @example
 *
 *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
 *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
 *      R.sequence(R.of, Nothing());       //=> [Nothing()]
 */
var sequence$1 = _curry2$11(function sequence$1(of, traversable) {
  return typeof traversable.sequence === 'function' ?
    traversable.sequence(of) :
    reduceRight(function(acc, x) { return ap(map$3(prepend$1, x), acc); },
                of([]),
                traversable);
});

var _curry3$6 = _curry3$1;
var map$2 = map$1;
var sequence = sequence$1;


/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `sequence` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
 * @param {Function} of
 * @param {Function} f
 * @param {*} traversable
 * @return {*}
 * @see R.sequence
 * @example
 *
 *      // Returns `Nothing` if the given divisor is `0`
 *      safeDiv = n => d => d === 0 ? Nothing() : Just(n / d)
 *
 *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Just([5, 2.5, 2])
 *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Nothing
 */
var traverse = _curry3$6(function traverse(of, f, traversable) {
  return sequence(of, map$2(f, traversable));
});

var _arrayFromIterator$1 = function _arrayFromIterator$1(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
};

var _functionName$1 = function _functionName$1(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
};

var _curry2$14 = _curry2$1;


/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      var o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */
var identical$1 = _curry2$14(function identical$1(a, b) {
  // SameValue algorithm
  if (a === b) { // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
});

var _curry1$10 = _curry1$1;


/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 */
var type$1 = _curry1$10(function type$1(val) {
  return val === null      ? 'Null'      :
         val === undefined ? 'Undefined' :
         Object.prototype.toString.call(val).slice(8, -1);
});

var _arrayFromIterator = _arrayFromIterator$1;
var _functionName = _functionName$1;
var _has$4 = _has$1;
var identical = identical$1;
var keys$3 = keys$1;
var type = type$1;


var _equals$1 = function _equals$1(a, b, stackA, stackB) {
  if (identical(a, b)) {
    return true;
  }

  if (type(a) !== type(b)) {
    return false;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) &&
           typeof b.equals === 'function' && b.equals(a);
  }

  switch (type(a)) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' &&
          _functionName(a.constructor) === 'Promise') {
        return a === b;
      }
      break;
    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case 'Date':
      if (!identical(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case 'Error':
      return a.name === b.name && a.message === b.message;
    case 'RegExp':
      if (!(a.source === b.source &&
            a.global === b.global &&
            a.ignoreCase === b.ignoreCase &&
            a.multiline === b.multiline &&
            a.sticky === b.sticky &&
            a.unicode === b.unicode)) {
        return false;
      }
      break;
    case 'Map':
    case 'Set':
      if (!_equals$1(_arrayFromIterator(a.entries()), _arrayFromIterator(b.entries()), stackA, stackB)) {
        return false;
      }
      break;
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
      break;
    case 'ArrayBuffer':
      break;
    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = keys$3(a);
  if (keysA.length !== keys$3(b).length) {
    return false;
  }

  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }

  stackA.push(a);
  stackB.push(b);
  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has$4(key, b) && _equals$1(b[key], a[key], stackA, stackB))) {
      return false;
    }
    idx -= 1;
  }
  stackA.pop();
  stackB.pop();
  return true;
};

var _curry2$13 = _curry2$1;
var _equals = _equals$1;


/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */
var equals = _curry2$13(function equals(a, b) {
  return _equals(a, b, [], []);
});

/*  weak */
/* eslint-disable new-cap */
// [a] => Either String [a]
var isArray = function isArray(arr) {
  return Array.isArray(arr) ? index.Right(arr) : index.Left("Invalid states sent with importState. Expected Array but received " + (typeof arr === "undefined" ? "undefined" : _typeof(arr)));
}; // eslint-disable-line max-len

var fieldTypeIsValid = curry$1(function (validTypes, field) {
  return validTypes.find(equals(field.type)) ? index.Right(field) : index.Left("Invalid field type " + field.type);
});

var validFieldTypes = curry$1(function (validTypes, fieldsState) {
  return traverse(index.of, fieldTypeIsValid(validTypes), fieldsState);
});

// [a] -> [a] -> Either String [a]
var validateFieldsState = curry$1(function (fieldsState, state) {
  return index.of(fieldsState).chain(isArray).chain(validFieldTypes(state.fieldTypes.map(path(["info", "type"]))));
});

// Add required properties that are not managed by the field
// component but by the FormBuilder component itself, so may
// not be there.
// [a] => [a]
var addRequiredProperties = function addRequiredProperties(fieldStates) {
  return fieldStates.map(function (s) {
    return Object.assign({
      configShowing: false,
      required: false
    }, s, { id: createId() });
  });
};

// If there are any problems with the import, the same state
// will be returned
var importState$1 = (function (state, _ref) {
  var newFieldsState = _ref.newFieldsState;
  return validateFieldsState(newFieldsState, state).map(addRequiredProperties).map(pushHistoryState(state)).bimap(console.error, identity).getOrElse(state);
});

var _reduced$1 = function _reduced$1(x) {
  return x && x['@@transducer/reduced'] ? x :
    {
      '@@transducer/value': x,
      '@@transducer/reduced': true
    };
};

var _curry2$16 = _curry2$1;
var _reduced = _reduced$1;
var _xfBase$3 = _xfBase$1;


var _xfind$1 = (function() {
  function XFind(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }
  XFind.prototype['@@transducer/init'] = _xfBase$3.init;
  XFind.prototype['@@transducer/result'] = function(result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, void 0);
    }
    return this.xf['@@transducer/result'](result);
  };
  XFind.prototype['@@transducer/step'] = function(result, input) {
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, input));
    }
    return result;
  };

  return _curry2$16(function _xfind$1(f, xf) { return new XFind(f, xf); });
}());

var _curry2$15 = _curry2$1;
var _dispatchable$3 = _dispatchable$1;
var _xfind = _xfind$1;


/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */
var find = _curry2$15(_dispatchable$3('find', _xfind, function find(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx += 1;
  }
}));

/**
 * A helper for delaying the execution of a function.
 * @private
 * @summary (Any... -> Any) -> Void
 */
var delayed = typeof setImmediate !== 'undefined'?  setImmediate
            : typeof process !== 'undefined'?       process.nextTick
            : /* otherwise */                       setTimeout;

/**
 * @module lib/task
 */
var task = Task$1;

// -- Implementation ---------------------------------------------------

/**
 * The `Task[α, β]` structure represents values that depend on time. This
 * allows one to model time-based effects explicitly, such that one can have
 * full knowledge of when they're dealing with delayed computations, latency,
 * or anything that can not be computed immediately.
 *
 * A common use for this structure is to replace the usual Continuation-Passing
 * Style form of programming, in order to be able to compose and sequence
 * time-dependent effects using the generic and powerful monadic operations.
 *
 * @class
 * @summary
 * ((α → Void), (β → Void) → Void), (Void → Void) → Task[α, β]
 *
 * Task[α, β] <: Chain[β]
 *               , Monad[β]
 *               , Functor[β]
 *               , Applicative[β]
 *               , Semigroup[β]
 *               , Monoid[β]
 *               , Show
 */
function Task$1(computation, cleanup) {
  this.fork = computation;

  this.cleanup = cleanup || function() {};
}

/**
 * Constructs a new `Task[α, β]` containing the single value `β`.
 *
 * `β` can be any value, including `null`, `undefined`, or another
 * `Task[α, β]` structure.
 *
 * @summary β → Task[α, β]
 */
Task$1.prototype.of = function _of(b) {
  return new Task$1(function(_, resolve) {
    return resolve(b);
  });
};

Task$1.of = Task$1.prototype.of;

/**
 * Constructs a new `Task[α, β]` containing the single value `α`.
 *
 * `α` can be any value, including `null`, `undefined`, or another
 * `Task[α, β]` structure.
 *
 * @summary α → Task[α, β]
 */
Task$1.prototype.rejected = function _rejected(a) {
  return new Task$1(function(reject) {
    return reject(a);
  });
};

Task$1.rejected = Task$1.prototype.rejected;

// -- Functor ----------------------------------------------------------

/**
 * Transforms the successful value of the `Task[α, β]` using a regular unary
 * function.
 *
 * @summary @Task[α, β] => (β → γ) → Task[α, γ]
 */
Task$1.prototype.map = function _map(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task$1(function(reject, resolve) {
    return fork(function(a) {
      return reject(a);
    }, function(b) {
      return resolve(f(b));
    });
  }, cleanup);
};

// -- Chain ------------------------------------------------------------

/**
 * Transforms the succesful value of the `Task[α, β]` using a function to a
 * monad.
 *
 * @summary @Task[α, β] => (β → Task[α, γ]) → Task[α, γ]
 */
Task$1.prototype.chain = function _chain(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task$1(function(reject, resolve) {
    return fork(function(a) {
      return reject(a);
    }, function(b) {
      return f(b).fork(reject, resolve);
    });
  }, cleanup);
};

// -- Apply ------------------------------------------------------------

/**
 * Applys the successful value of the `Task[α, (β → γ)]` to the successful
 * value of the `Task[α, β]`
 *
 * @summary @Task[α, (β → γ)] => Task[α, β] → Task[α, γ]
 */

Task$1.prototype.ap = function _ap(that) {
  var forkThis = this.fork;
  var forkThat = that.fork;
  var cleanupThis = this.cleanup;
  var cleanupThat = that.cleanup;

  function cleanupBoth(state) {
    cleanupThis(state[0]);
    cleanupThat(state[1]);
  }

  return new Task$1(function(reject, resolve) {
    var func, funcLoaded = false;
    var val, valLoaded = false;
    var rejected = false;
    var allState;

    var thisState = forkThis(guardReject, guardResolve(function(x) {
      funcLoaded = true;
      func = x;
    }));

    var thatState = forkThat(guardReject, guardResolve(function(x) {
      valLoaded = true;
      val = x;
    }));

    function guardResolve(setter) {
      return function(x) {
        if (rejected) {
          return;
        }

        setter(x);
        if (funcLoaded && valLoaded) {
          delayed(function(){ cleanupBoth(allState); });
          return resolve(func(val));
        } else {
          return x;
        }
      }
    }

    function guardReject(x) {
      if (!rejected) {
        rejected = true;
        return reject(x);
      }
    }

    return allState = [thisState, thatState];
  }, cleanupBoth);
};

// -- Semigroup ------------------------------------------------------------

/**
 * Selects the earlier of the two tasks `Task[α, β]`
 *
 * @summary @Task[α, β] => Task[α, β] → Task[α, β]
 */

Task$1.prototype.concat = function _concat(that) {
  var forkThis = this.fork;
  var forkThat = that.fork;
  var cleanupThis = this.cleanup;
  var cleanupThat = that.cleanup;

  function cleanupBoth(state) {
    cleanupThis(state[0]);
    cleanupThat(state[1]);
  }

  return new Task$1(function(reject, resolve) {
    var done = false;
    var allState;
    var thisState = forkThis(guard(reject), guard(resolve));
    var thatState = forkThat(guard(reject), guard(resolve));

    return allState = [thisState, thatState];

    function guard(f) {
      return function(x) {
        if (!done) {
          done = true;
          delayed(function(){ cleanupBoth(allState); });
          return f(x);
        }
      };
    }
  }, cleanupBoth);

};

// -- Monoid ------------------------------------------------------------

/**
 * Returns a Task that will never resolve
 *
 * @summary Void → Task[α, _]
 */
Task$1.empty = function _empty() {
  return new Task$1(function() {});
};

Task$1.prototype.empty = Task$1.empty;

// -- Show -------------------------------------------------------------

/**
 * Returns a textual representation of the `Task[α, β]`
 *
 * @summary @Task[α, β] => Void → String
 */
Task$1.prototype.toString = function _toString() {
  return 'Task';
};

// -- Extracting and recovering ----------------------------------------

/**
 * Transforms a failure value into a new `Task[α, β]`. Does nothing if the
 * structure already contains a successful value.
 *
 * @summary @Task[α, β] => (α → Task[γ, β]) → Task[γ, β]
 */
Task$1.prototype.orElse = function _orElse(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task$1(function(reject, resolve) {
    return fork(function(a) {
      return f(a).fork(reject, resolve);
    }, function(b) {
      return resolve(b);
    });
  }, cleanup);
};

// -- Folds and extended transformations -------------------------------

/**
 * Catamorphism. Takes two functions, applies the leftmost one to the failure
 * value, and the rightmost one to the successful value, depending on which one
 * is present.
 *
 * @summary @Task[α, β] => (α → γ), (β → γ) → Task[δ, γ]
 */
Task$1.prototype.fold = function _fold(f, g) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task$1(function(reject, resolve) {
    return fork(function(a) {
      return resolve(f(a));
    }, function(b) {
      return resolve(g(b));
    });
  }, cleanup);
};

/**
 * Catamorphism.
 *
 * @summary @Task[α, β] => { Rejected: α → γ, Resolved: β → γ } → Task[δ, γ]
 */
Task$1.prototype.cata = function _cata(pattern) {
  return this.fold(pattern.Rejected, pattern.Resolved);
};

/**
 * Swaps the disjunction values.
 *
 * @summary @Task[α, β] => Void → Task[β, α]
 */
Task$1.prototype.swap = function _swap() {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task$1(function(reject, resolve) {
    return fork(function(a) {
      return resolve(a);
    }, function(b) {
      return reject(b);
    });
  }, cleanup);
};

/**
 * Maps both sides of the disjunction.
 *
 * @summary @Task[α, β] => (α → γ), (β → δ) → Task[γ, δ]
 */
Task$1.prototype.bimap = function _bimap(f, g) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task$1(function(reject, resolve) {
    return fork(function(a) {
      return reject(f(a));
    }, function(b) {
      return resolve(g(b));
    });
  }, cleanup);
};

/**
 * Maps the left side of the disjunction (failure).
 *
 * @summary @Task[α, β] => (α → γ) → Task[γ, β]
 */
Task$1.prototype.rejectedMap = function _rejectedMap(f) {
  var fork = this.fork;
  var cleanup = this.cleanup;

  return new Task$1(function(reject, resolve) {
    return fork(function(a) {
      return reject(f(a));
    }, function(b) {
      return resolve(b);
    });
  }, cleanup);
};

var index$1 = task;

// State -> String -> Either String Function
var typeConstructor = function typeConstructor(state, fieldType) {
  return index.of(state).map(prop$1("fieldTypes")).map(find(function (v) {
    return v.info.type === fieldType;
  })).chain(index.fromNullable).bimap(function (_) {
    return "Field \"" + fieldType + "\" does not exist.";
  }, identity);
};

// { initialState: Function } -> Task String Object
var createField$1 = function createField$1(constr) {
  return new index$1(function (reject, resolve) {
    // Make sure the promise is only resolved once
    var called = false;
    var fieldState = constr.initialState();

    if (!(fieldState instanceof Promise)) {
      resolve(fieldState);
    } else {
      fieldState.then(function (v) {
        if (called) {
          return;
        }
        called = true;
        resolve(v);
      }).catch(function (v) {
        if (called) {
          throw v;
        }
        called = true;
        reject(v);
      });
    }
  });
};

// Object -> Object
var insertRequiredProps = function insertRequiredProps(field) {
  return seamlessImmutable(field).merge({
    id: createId(),
    configShowing: true
  }, {
    deep: true
  });
};

var createFieldAsynchronously = function createFieldAsynchronously(state, fieldType, asyncDispatch) {
  return typeConstructor(state, fieldType).map(createField$1) // Either String (Task String Object)
  .leftMap(index$1.rejected).merge() // Task String Object
  .map(insertRequiredProps).fork( // execute task
  function (err) {
    return console.error("Task rejected", err);
  }, pipe(fieldCreated, asyncDispatch));
};

// This is an async action. When it is finished it will trigger the
// field created action
var createField$2 = (function (state, _ref) {
  var fieldType = _ref.fieldType,
      asyncDispatch = _ref.asyncDispatch;

  createFieldAsynchronously(state, fieldType, asyncDispatch);
  return state;
});

var _concat$5 = _concat$2;
var _curry2$17 = _curry2$1;


/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The element to add to the end of the new list.
 * @param {Array} list The list whose contents will be added to the beginning of the output
 *        list.
 * @return {Array} A new list containing the contents of the old list followed by `el`.
 * @see R.prepend
 * @example
 *
 *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      R.append('tests', []); //=> ['tests']
 *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */
var append = _curry2$17(function append(el, list) {
  return _concat$5(list, [el]);
});

// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * @module lib/maybe
 */
var maybe = Maybe$1;

// -- Aliases ----------------------------------------------------------
var clone$1         = Object.create;
var unimplemented$1 = function(){ throw new Error('Not implemented.') };
var noop$1          = function(){ return this                         };

// -- Implementation ---------------------------------------------------

/**
 * A structure for values that may not be present, or computations that may
 * fail. `Maybe(a)` explicitly models the effects that are implicit in
 * `Nullable` types, thus has none of the problems associated with
 * `null` or `undefined` — like `NullPointerExceptions`.
 *
 * The class models two different cases:
 *
 *  + `Just a` — represents a `Maybe(a)` that contains a value. `a` may
 *     be any value, including `null` or `undefined`.
 *
 *  + `Nothing` — represents a `Maybe(a)` that has no values. Or a
 *     failure that needs no additional information.
 *
 * Common uses of this structure includes modelling values that may or may
 * not be present in a collection, thus instead of needing a
 * `collection.has(a)`, the `collection.get(a)` operation gives you all
 * the information you need — `collection.get(a).is-nothing` being
 * equivalent to `collection.has(a)`; Similarly the same reasoning may
 * be applied to computations that may fail to provide a value, e.g.:
 * `collection.find(predicate)` can safely return a `Maybe(a)` instance,
 * even if the collection contains nullable values.
 *
 * Furthermore, the values of `Maybe(a)` can be combined and manipulated
 * by using the expressive monadic operations. This allows safely
 * sequencing operations that may fail, and safely composing values that
 * you don't know whether they're present or not, failing early
 * (returning a `Nothing`) if any of the operations fail.
 *
 * If one wants to store additional information about failures, the
 * [Either][] and [Validation][] structures provide such a capability, and
 * should be used instead of the `Maybe(a)` structure.
 *
 * [Either]: https://github.com/folktale/data.either
 * [Validation]: https://github.com/folktale/data.validation
 *
 *
 * @class
 */
function Maybe$1() {}

// The case for successful values
Just.prototype = clone$1(Maybe$1.prototype);
function Just(a){
  this.value = a;
}

// The case for failure values
Nothing.prototype = clone$1(Maybe$1.prototype);
function Nothing(){}


// -- Constructors -----------------------------------------------------

/**
 * Constructs a new `Maybe[α]` structure with an absent value. Commonly used
 * to represent a failure.
 *
 * @summary Void → Maybe[α]
 */
Maybe$1.Nothing = function() {
  return new Nothing
};
Maybe$1.prototype.Nothing = Maybe$1.Nothing;

/**
 * Constructs a new `Maybe[α]` structure that holds the single value
 * `α`. Commonly used to represent a success.
 *
 * `α` can be any value, including `null`, `undefined` or another
 * `Maybe[α]` structure.
 *
 * @summary α → Maybe[α]
 */
Maybe$1.Just = function(a) {
  return new Just(a)
};
Maybe$1.prototype.Just = Maybe$1.Just;


// -- Conversions ------------------------------------------------------

/**
 * Constructs a new `Maybe[α]` structure from a nullable type.
 *
 * If the value is either `null` or `undefined`, this function returns a
 * `Nothing`, otherwise the value is wrapped in a `Just(α)`.
 *
 * @summary α → Maybe[α]
 */
Maybe$1.fromNullable = function(a) {
  return a != null?       new Just(a)
  :      /* otherwise */  new Nothing
};
Maybe$1.prototype.fromNullable = Maybe$1.fromNullable;

/**
 * Constructs a new `Maybe[β]` structure from an `Either[α, β]` type.
 *
 * The left side of the `Either` becomes `Nothing`, and the right side
 * is wrapped in a `Just(β)`.
 *
 * @summary Either[α, β] → Maybe[β]
 */
Maybe$1.fromEither = function(a) {
  return a.fold(Maybe$1.Nothing, Maybe$1.Just)
};
Maybe$1.prototype.fromEither = Maybe$1.fromEither;

/**
 * Constructs a new `Maybe[β]` structure from a `Validation[α, β]` type.
 *
 * The failure side of the `Validation` becomes `Nothing`, and the right
 * side is wrapped in a `Just(β)`.
 *
 * @method
 * @summary Validation[α, β] → Maybe[β]
 */
Maybe$1.fromValidation           = Maybe$1.fromEither;
Maybe$1.prototype.fromValidation = Maybe$1.fromEither;


// -- Predicates -------------------------------------------------------

/**
 * True if the `Maybe[α]` structure contains a failure (i.e.: `Nothing`).
 *
 * @summary Boolean
 */
Maybe$1.prototype.isNothing   = false;
Nothing.prototype.isNothing = true;


/**
 * True if the `Maybe[α]` structure contains a single value (i.e.: `Just(α)`).
 *
 * @summary Boolean
 */
Maybe$1.prototype.isJust = false;
Just.prototype.isJust  = true;


// -- Applicative ------------------------------------------------------

/**
 * Creates a new `Maybe[α]` structure holding the single value `α`.
 *
 * `α` can be any value, including `null`, `undefined`, or another
 * `Maybe[α]` structure.
 *
 * @summary α → Maybe[α]
 */
Maybe$1.of = function(a) {
  return new Just(a)
};
Maybe$1.prototype.of = Maybe$1.of;


/**
 * Applies the function inside the `Maybe[α]` structure to another
 * applicative type.
 *
 * The `Maybe[α]` structure should contain a function value, otherwise a
 * `TypeError` is thrown.
 *
 * @method
 * @summary (@Maybe[α → β], f:Applicative[_]) => f[α] → f[β]
 */
Maybe$1.prototype.ap = unimplemented$1;

Nothing.prototype.ap = noop$1;

Just.prototype.ap = function(b) {
  return b.map(this.value)
};




// -- Functor ----------------------------------------------------------

/**
 * Transforms the value of the `Maybe[α]` structure using a regular unary
 * function.
 *
 * @method
 * @summary @Maybe[α] => (α → β) → Maybe[β]
 */
Maybe$1.prototype.map   = unimplemented$1;
Nothing.prototype.map = noop$1;

Just.prototype.map = function(f) {
  return this.of(f(this.value))
};


// -- Chain ------------------------------------------------------------

/**
 * Transforms the value of the `Maybe[α]` structure using an unary function
 * to monads.
 *
 * @method
 * @summary (@Maybe[α], m:Monad[_]) => (α → m[β]) → m[β]
 */
Maybe$1.prototype.chain   = unimplemented$1;
Nothing.prototype.chain = noop$1;

Just.prototype.chain = function(f) {
  return f(this.value)
};


// -- Show -------------------------------------------------------------

/**
 * Returns a textual representation of the `Maybe[α]` structure.
 *
 * @method
 * @summary @Maybe[α] => Void → String
 */
Maybe$1.prototype.toString = unimplemented$1;

Nothing.prototype.toString = function() {
  return 'Maybe.Nothing'
};

Just.prototype.toString = function() {
  return 'Maybe.Just(' + this.value + ')'
};


// -- Eq ---------------------------------------------------------------

/**
 * Tests if a `Maybe[α]` structure is equal to another `Maybe[α]` structure.
 *
 * @method
 * @summary @Maybe[α] => Maybe[α] → Boolean
 */
Maybe$1.prototype.isEqual = unimplemented$1;

Nothing.prototype.isEqual = function(b) {
  return b.isNothing
};

Just.prototype.isEqual = function(b) {
  return b.isJust
  &&     b.value === this.value
};


// -- Extracting and recovering ----------------------------------------

/**
 * Extracts the value out of the `Maybe[α]` structure, if it
 * exists. Otherwise throws a `TypeError`.
 *
 * @method
 * @summary @Maybe[α] => Void → a,      :: partial, throws
 * @see {@link module:lib/maybe~Maybe#getOrElse} — A getter that can handle failures
 * @throws {TypeError} if the structure has no value (`Nothing`).
 */
Maybe$1.prototype.get = unimplemented$1;

Nothing.prototype.get = function() {
  throw new TypeError("Can't extract the value of a Nothing.")
};

Just.prototype.get = function() {
  return this.value
};


/**
 * Extracts the value out of the `Maybe[α]` structure. If there is no value,
 * returns the given default.
 *
 * @method
 * @summary @Maybe[α] => α → α
 */
Maybe$1.prototype.getOrElse = unimplemented$1;

Nothing.prototype.getOrElse = function(a) {
  return a
};

Just.prototype.getOrElse = function(_) {
  return this.value
};


/**
 * Transforms a failure into a new `Maybe[α]` structure. Does nothing if the
 * structure already contains a value.
 *
 * @method
 * @summary @Maybe[α] => (Void → Maybe[α]) → Maybe[α]
 */
Maybe$1.prototype.orElse = unimplemented$1;

Nothing.prototype.orElse = function(f) {
  return f()
};

Just.prototype.orElse = function(_) {
  return this
};


/**
 * Catamorphism.
 * 
 * @method
 * @summary @Maybe[α] => { Nothing: Void → β, Just: α → β } → β
 */
Maybe$1.prototype.cata = unimplemented$1;

Nothing.prototype.cata = function(pattern) {
  return pattern.Nothing()
};

Just.prototype.cata = function(pattern) {
  return pattern.Just(this.value);
};


/**
 * JSON serialisation
 *
 * @method
 * @summary @Maybe[α] => Void → Object
 */
Maybe$1.prototype.toJSON = unimplemented$1;

Nothing.prototype.toJSON = function() {
  return { '#type': 'folktale:Maybe.Nothing' }
};

Just.prototype.toJSON = function() {
  return { '#type': 'folktale:Maybe.Just'
         , value: this.value }
};

// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var index$2 = maybe;

// State -> Object -> State
var historyStateWithNewField = curry$1(function (state, newField) {
  return pipe(hideConfigs, over(StateLenses.fieldsState, append(newField)))(state);
});

var fieldCreated$1 = (function (state, _ref) {
  var createdFieldState = _ref.createdFieldState;
  return index$2.fromNullable(createdFieldState).map(historyStateWithNewField(state)).map(prop$1("fieldsState")).map(pushHistoryState(state)).getOrElse(state);
});

var toggleConfig$1 = function toggleConfig$1(fieldState) {
  return seamlessImmutable(fieldState).set("configShowing", !fieldState.configShowing);
};

var replaceFieldState = curry$1(function (state, fieldState) {
  return state.fieldsState.map(function (aField) {
    return aField.id === fieldState.id ? fieldState : aField;
  });
});

var toggleConfig$2 = (function (state, _ref) {
  var fieldState = _ref.fieldState;
  return index$2.fromNullable(fieldState).map(toggleConfig$1).map(replaceFieldState(state)).map(pushHistoryState(state)).getOrElse(state);
});

var toggleRequired$1 = function toggleRequired$1(fieldState) {
  return seamlessImmutable(fieldState).set("required", !fieldState.required);
};

var replaceFieldState$1 = curry$1(function (state, fieldState) {
  return state.fieldsState.map(function (aField) {
    return aField.id === fieldState.id ? fieldState : aField;
  });
});

var toggleRequired$2 = (function (state, _ref) {
  var fieldState = _ref.fieldState;
  return index$2.fromNullable(fieldState).map(toggleRequired$1).map(replaceFieldState$1(state)).map(pushHistoryState(state)).getOrElse(state);
});

var _filter$1 = function _filter$1(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
};

var _isObject$1 = function _isObject$1(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
};

var _curry2$19 = _curry2$1;
var _xfBase$4 = _xfBase$1;


var _xfilter$1 = (function() {
  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter.prototype['@@transducer/init'] = _xfBase$4.init;
  XFilter.prototype['@@transducer/result'] = _xfBase$4.result;
  XFilter.prototype['@@transducer/step'] = function(result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return _curry2$19(function _xfilter$1(f, xf) { return new XFilter(f, xf); });
}());

var _curry2$18 = _curry2$1;
var _dispatchable$4 = _dispatchable$1;
var _filter = _filter$1;
var _isObject = _isObject$1;
var _reduce$5 = _reduce$1;
var _xfilter = _xfilter$1;
var keys$4 = keys$1;


/**
 * Takes a predicate and a "filterable", and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
var filter = _curry2$18(_dispatchable$4('filter', _xfilter, function(pred, filterable) {
  return (
    _isObject(filterable) ?
      _reduce$5(function(acc, key) {
        if (pred(filterable[key])) {
          acc[key] = filterable[key];
        }
        return acc;
      }, {}, keys$4(filterable)) :
    // else
      _filter(pred, filterable)
  );
}));

// State -> Object -> State
var historyStateWithoutField = curry$1(function (state, fieldState) {
  return over(StateLenses.fieldsState, filter(function (fs) {
    return fs.id !== fieldState.id;
  }), state);
});

var deleteField$1 = (function (state, _ref) {
  var fieldState = _ref.fieldState;
  return index$2.fromNullable(fieldState).map(historyStateWithoutField(state)).map(prop$1("fieldsState")).map(pushHistoryState(state)).getOrElse(state);
});

// State -> Object -> State
var updateFieldState = curry$1(function (state, newFieldState) {
  return over(StateLenses.fieldsState, map$1(function (fs) {
    return fs.id === newFieldState.id ? newFieldState : fs;
  }), state);
});

var updateField$1 = (function (state, _ref) {
  var newFieldState = _ref.newFieldState;
  return validateField(newFieldState) // Either
  .map(updateFieldState(state)).map(prop$1("fieldsState")).map(pushHistoryState(state)).leftMap(console.error).getOrElse(state);
});

var _curry2$20 = _curry2$1;
var _slice$4 = _slice$1;


/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal. Please note that this is a **copy** of the list. It does not
 * modify the original.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a,a -> Number) -> [a] -> [a]
 * @param {Function} comparator A sorting function :: a -> b -> Int
 * @param {Array} list The list to sort
 * @return {Array} a new array with its elements sorted by the comparator function.
 * @example
 *
 *      var diff = function(a, b) { return a - b; };
 *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
 */
var sort = _curry2$20(function sort(comparator, list) {
  return _slice$4(list).sort(comparator);
});

// State -> Object -> State
var historyStateWithNewOrder = curry$1(function (state, newOrder) {
  return pipe(hideConfigs, over(StateLenses.fieldsState, sort(function (f1, f2) {
    return newOrder.indexOf(f1.id) - newOrder.indexOf(f2.id);
  })))(state);
});

var reorderFields$1 = (function (state, _ref) {
  var newFieldsOrder = _ref.newFieldsOrder;
  return (newFieldsOrder && Array.isArray(newFieldsOrder) ? index.Right(newFieldsOrder) : index.Left("newFieldsOrder must be an array but received " + (typeof newFieldsOrder === "undefined" ? "undefined" : _typeof(newFieldsOrder)))).chain(function (o) {
    return o.length === state.fieldsState.length ? index.Right(o) : index.Left("newFieldsOrder has " + o.length + " elements, but the current state has " + state.fieldsState.length + " elements");
  } // eslint-disable-line max-len
  ).chain(function (o) {
    var stateIds = state.fieldsState.map(prop$1("id"));
    var noMissingId = stateIds.reduce(function (acc, fId) {
      return acc && o.includes(fId);
    }, true);
    return noMissingId ? index.Right(o) : index.Left("Not all ids in the new order are matched in the existing state ids.");
  }).map(historyStateWithNewOrder(state)).map(prop$1("fieldsState")).map(pushHistoryState(state)).leftMap(function (err) {
    return console.error("Unable to reorder: " + err);
  }).getOrElse(state);
});

/*  weak */
/* eslint-disable new-cap */
// [a] => Either String [a]
var isArray$1 = function isArray$1(arr) {
  return Array.isArray(arr) ? index.Right(arr) : index.Left("Expected Array but received " + (typeof arr === "undefined" ? "undefined" : _typeof(arr)));
}; // eslint-disable-line max-len

// Object -> Either String Object
var hasRequiredInfo = function hasRequiredInfo(component) {
  return propertyTypeCheck("initialState", "function", component).chain(propertyTypeCheck("RenderEditor", "function")).chain(propertyTypeCheck("info", "object")).chain(function (c) {
    return index.fromNullable(c.info);
  }).chain(propertyTypeCheck("type", "string")).chain(propertyTypeCheck("displayName", "string")).chain(propertyTypeCheck("group", "string")).chain(function (_) {
    return index.Right(component);
  });
};

var isComponentValid = function isComponentValid(customComponents) {
  return traverse(index.of, hasRequiredInfo, customComponents);
};

// [a] -> [a] -> Either String [a]
var validateComponents = function validateComponents(customComponents) {
  return index.Right(customComponents).chain(isArray$1).chain(isComponentValid);
};

var addToFieldTypes = curry$1(function (state, customComponents) {
  return over(StateLenses.fieldTypes, function (s) {
    return s.concat(customComponents);
  }, state);
});

// If there are any problems with the import, the same state
// will be returned
var importCustomComponents$1 = (function (state, _ref) {
  var customComponents = _ref.customComponents;
  return (customComponents ? index.Right(customComponents) : index.Left("Empty custom components")).chain(validateComponents).leftMap(function (err) {
    return console.error("Invalid custom components:", err);
  }).map(addToFieldTypes(state)).getOrElse(state);
});

/* eslint-disable no-nested-ternary */
var actionHandlers = {
  undo: undo$1,
  importState: importState$1,
  createField: createField$2,
  fieldCreated: fieldCreated$1,
  toggleConfig: toggleConfig$2,
  toggleRequired: toggleRequired$2,
  deleteField: deleteField$1,
  updateField: updateField$1,
  reorderFields: reorderFields$1,
  importCustomComponents: importCustomComponents$1
};

var isExpectedAction = function isExpectedAction(a) {
  return a && a.type && actionHandlers[a.type];
};
var isReduxAction = function isReduxAction(a) {
  return a && a.type && a.type.includes("@@redux");
};

var update = function update(state, action) {
  return isExpectedAction(action) ? actionHandlers[action.type](state, action) : isReduxAction(action) ? state : assert(false, "Invalid action type: " + action.type);
};

/* eslint-env jasmine */

var currentFieldsState = ["current"];
var oldFieldsState = ["old"];
var mockState = {
  fieldTypes: [],
  fieldsState: currentFieldsState,
  fieldsStateHistory: [oldFieldsState]
};

var emptyMockState = {
  fieldTypes: [],
  fieldsState: [],
  fieldsStateHistory: []
};

var emptyHistoryMockState = {
  fieldTypes: [],
  fieldsState: currentFieldsState,
  fieldsStateHistory: []
};

describe("Update.undo", function () {
  it("removes first old state from history", function () {
    var modifiedState = update(mockState, undo());
    expect(modifiedState.fieldsStateHistory.length).toEqual(0);
  });

  it("sets first old state as current state", function () {
    var modifiedState = update(mockState, undo());
    expect(modifiedState.fieldsState).toEqual(oldFieldsState);
  });

  it("doesn't modify the state if there aren't more history states to undo", function () {
    var modifiedState = update(emptyMockState, undo());
    expect(modifiedState).toEqual(emptyMockState);
  });

  it("set's the current state to empty if there are no more history states", function () {
    var modifiedState = update(emptyHistoryMockState, undo());
    expect(modifiedState.fieldsState.length).toEqual(0);
  });
});

/* eslint-env jasmine */
/* eslint-disable quote-props */

var typesArray = [{
  "info": {
    "type": "RadioButtons"
  }
}, {
  "info": {
    "type": "Checkboxes"
  }
}, {
  "info": {
    "type": "Dropdown"
  }
}, {
  "info": {
    "type": "TextBox"
  }
}, {
  "info": {
    "type": "EmailBox"
  }
}, {
  "info": {
    "type": "TelephoneBox"
  }
}, {
  "info": {
    "type": "NumberBox"
  }
}, {
  "info": {
    "type": "TextArea"
  }
}, {
  "info": {
    "type": "DateField"
  }
}];

var mockCurrentState = ["a", "b"];
var mockHistory = [];
var mockState$1 = {
  fieldTypes: typesArray,
  fieldsState: mockCurrentState,
  fieldsStateHistory: mockHistory
};

var newValidState = [{
  "type": "Checkboxes",
  "displayName": "Checkboxes",
  "group": "Options Components",
  "htmlInputType": "checkbox",
  "title": "Add a title",
  "id": 2,
  "options": [{
    "caption": "Insert an option"
  }],
  "newOptionCaption": ""
}];

var newInvalidState = [{
  "type": "Invalid type",
  "displayName": "Checkboxes",
  "group": "Options Components",
  "htmlInputType": "checkbox",
  "title": "Add a title",
  "options": [{
    "caption": "Insert an option"
  }],
  "newOptionCaption": ""
}];

describe("Update.importState", function () {
  it("Returns an unchanged array if the new state is invalid", function () {
    expect(update(mockState$1, importState({}))).toEqual(mockState$1);
    expect(update(mockState$1, importState(null))).toEqual(mockState$1);
  });

  it("Returns an unchanged array if the a field's type is not in fieldTypes", function () {
    expect(update(mockState$1, importState(newInvalidState))).toEqual(mockState$1);
  });

  it("Sends the last current state to the history", function () {
    var updated = update(mockState$1, importState(newValidState));
    expect(updated.fieldsStateHistory[0].toString()).toEqual(mockCurrentState.toString());
    expect(updated.fieldsStateHistory.length).toEqual(mockHistory.length + 1);
  });

  it("Sets the new state as current", function () {
    var updated = update(mockState$1, importState(newValidState));
    expect(updated.fieldsState[0].type).toEqual(newValidState[0].type);
    expect(updated.fieldsState[0].type).not.toEqual(undefined);
    expect(updated.fieldsState[0].displayName).toEqual(newValidState[0].displayName);
    expect(updated.fieldsState[0].displayName).not.toEqual(undefined);
    expect(updated.fieldsState[0].group).toEqual(newValidState[0].group);
    expect(updated.fieldsState[0].group).not.toEqual(undefined);
  });

  it("Makes sure all ids are strings", function () {
    var validState2 = newValidState.map(function (v, idx) {
      return idx !== 0 ? v : Object.assign({}, v, { id: 2 });
    });
    var updated = update(mockState$1, importState(validState2));
    expect(_typeof(updated.fieldsState[0].id)).toEqual("string");
  });
});

/* eslint-env jasmine */
/* eslint-disable quote-props */

var promiseTypeInstance = { type: "promise-instance" };
var promiseType = {
  info: { type: "PromiseType" },
  initialState: function initialState() {
    return Promise.resolve(promiseTypeInstance);
  }
};

var syncTypeInstance = { type: "sync-instance" };
var syncType = {
  info: { type: "SyncType" },
  initialState: function initialState() {
    return syncTypeInstance;
  }
};

var typesArray$1 = [promiseType, syncType];
var mockCurrentState$1 = ["a", "b"];
var mockHistory$1 = [];
var mockState$2 = {
  fieldTypes: typesArray$1,
  fieldsState: mockCurrentState$1,
  fieldsStateHistory: mockHistory$1
};

describe("Update.createField", function () {
  it("creates fields asynchronously", function (done) {
    var asyncDispatch = function asyncDispatch(v) {
      expect(v).not.toEqual(undefined);
      done();
    };

    var asyncAcion = Object.assign({ asyncDispatch: asyncDispatch }, createField(syncType.info.type));

    update(mockState$2, asyncAcion);
  });

  it("returns a 'fieldCreated' action when field is created", function (done) {
    var asyncDispatch = function asyncDispatch(action) {
      expect(action.type).toEqual("fieldCreated");
      done();
    };

    var asyncAcion = Object.assign({ asyncDispatch: asyncDispatch }, createField(syncType.info.type));

    update(mockState$2, asyncAcion);
  });

  it("creates types with constructors that return a plain object", function (done) {
    var asyncDispatch = function asyncDispatch(action) {
      expect(action.createdFieldState).not.toEqual(undefined);
      expect(action.createdFieldState.type).toEqual(syncTypeInstance.type);
      done();
    };

    var asyncAcion = Object.assign({ asyncDispatch: asyncDispatch }, createField(syncType.info.type));

    update(mockState$2, asyncAcion);
  });

  it("creates types with constructors that return a promise", function (done) {
    var asyncDispatch = function asyncDispatch(action) {
      expect(action.createdFieldState).not.toEqual(undefined);
      expect(action.createdFieldState.type).toEqual(promiseTypeInstance.type);
      done();
    };

    var asyncAcion = Object.assign({ asyncDispatch: asyncDispatch }, createField(promiseType.info.type));

    update(mockState$2, asyncAcion);
  });

  it("adds required fields to instance", function (done) {
    var asyncDispatch = function asyncDispatch(action) {
      expect(action.createdFieldState.id).not.toEqual(undefined);
      expect(_typeof(action.createdFieldState.configShowing)).toEqual("boolean");
      done();
    };

    var asyncAcion = Object.assign({ asyncDispatch: asyncDispatch }, createField(promiseType.info.type));

    update(mockState$2, asyncAcion);
  });

  it("does not create a field if type is not in model.fieldTypes", function (done) {
    var asyncDispatch = jasmine.createSpy("asyncDispatch");

    var asyncAcion = Object.assign({ asyncDispatch: asyncDispatch }, createField("non-existing-type"));

    update(mockState$2, asyncAcion);

    setTimeout(function () {
      expect(asyncDispatch).not.toHaveBeenCalled();done();
    }, 50);
  });
});

/* eslint-env jasmine */
/* eslint-disable quote-props */

var createdFieldState = { type: "fictitious-instance" };
var mockCurrentState$2 = ["a", "b"];
var mockHistory$2 = [];
var mockState$3 = {
  fieldTypes: [{ info: { type: "fictitious-instance" } }],
  fieldsState: mockCurrentState$2,
  fieldsStateHistory: mockHistory$2
};

var fieldCreatedAction = fieldCreated(createdFieldState);
var newState = update(mockState$3, fieldCreatedAction);

describe("Update.fieldCreated", function () {
  it("outputs a state with the new field included", function () {
    expect(newState.fieldsState.length).toEqual(mockState$3.fieldsState.length + 1);
    expect(newState.fieldsState.find(function (v) {
      return v.type === createdFieldState.type;
    })).not.toEqual(undefined);
  });

  it("sends the current state to history", function () {
    expect(newState.fieldsStateHistory[0][0]).toEqual(mockCurrentState$2[0]);
    expect(newState.fieldsStateHistory[0][1]).toEqual(mockCurrentState$2[1]);
  });

  it("Returns the current state if no new field is given to it", function () {
    var sameState = update(mockState$3, fieldCreated(null));
    expect(sameState.fieldTypes.length).toEqual(mockState$3.fieldTypes.length);
    expect(sameState.fieldsState.length).toEqual(mockState$3.fieldsState.length);
    expect(sameState.fieldsStateHistory.length).toEqual(mockState$3.fieldsStateHistory.length);
  });

  it("does not break the state after creating one object", function () {
    var changed1 = update(mockState$3, fieldCreated(createdFieldState));
    var changed2 = update(changed1, fieldCreated(createdFieldState));
    var changed3 = update(changed2, fieldCreated(createdFieldState));
    expect(changed3.fieldTypes.length).toEqual(mockState$3.fieldTypes.length);
    expect(changed3.fieldsState.length).toEqual(mockCurrentState$2.length + 3);
    expect(changed3.fieldsStateHistory.length).toEqual(3);
  });
});

/* eslint-env jasmine */

var fieldStateConfigShowing = {
  id: 123,
  configShowing: true
};

var fieldStateConfigNotShowing = {
  id: 321,
  configShowing: false
};

var mockState$4 = {
  fieldTypes: [],
  fieldsState: [fieldStateConfigShowing, fieldStateConfigNotShowing],
  fieldsStateHistory: []
};

describe("Update.toggleConfig", function () {
  it("turns the config option to false when needed", function () {
    var modifiedState = update(mockState$4, toggleConfig(fieldStateConfigShowing));
    expect(modifiedState.fieldsState.find(function (f) {
      return f.id === fieldStateConfigShowing.id;
    }).configShowing).toEqual(false);
  });

  it("turns the config option to true when needed", function () {
    var modifiedState = update(mockState$4, toggleConfig(fieldStateConfigNotShowing));
    expect(modifiedState.fieldsState.find(function (f) {
      return f.id === fieldStateConfigShowing.id;
    }).configShowing).toEqual(true);
  });

  it("adds the last state to the history", function () {
    var modifiedState = update(mockState$4, toggleConfig(fieldStateConfigShowing));
    expect(modifiedState.fieldsStateHistory.length).toEqual(1);
    expect(modifiedState.fieldsStateHistory[0][0].id).toEqual(mockState$4.fieldsState[0].id);
    expect(modifiedState.fieldsStateHistory[0][1].id).toEqual(mockState$4.fieldsState[1].id);
  });
});

/* eslint-env jasmine */

var fieldStateIsRequired = {
  id: 123,
  required: true
};

var fieldStateIsNotRequired = {
  id: 321,
  required: false
};

var mockState$5 = {
  fieldTypes: [],
  fieldsState: [fieldStateIsRequired, fieldStateIsNotRequired],
  fieldsStateHistory: []
};

describe("Update.toggleRequired", function () {
  it("turns the required option to false when needed", function () {
    var modifiedState = update(mockState$5, toggleRequired(fieldStateIsRequired));
    expect(modifiedState.fieldsState.find(function (f) {
      return f.id === fieldStateIsRequired.id;
    }).required).toEqual(false);
  });

  it("turns the required option to true when needed", function () {
    var modifiedState = update(mockState$5, toggleRequired(fieldStateIsNotRequired));
    expect(modifiedState.fieldsState.find(function (f) {
      return f.id === fieldStateIsRequired.id;
    }).required).toEqual(true);
  });

  it("adds the last state to the history", function () {
    var modifiedState = update(mockState$5, toggleRequired(fieldStateIsRequired));
    expect(modifiedState.fieldsStateHistory.length).toEqual(1);
    expect(modifiedState.fieldsStateHistory[0][0].id).toEqual(mockState$5.fieldsState[0].id);
    expect(modifiedState.fieldsStateHistory[0][1].id).toEqual(mockState$5.fieldsState[1].id);
  });
});

/* eslint-env jasmine */
/* eslint-disable quote-props */

var toBeDeletedFieldState = { type: "fictitious-instance", id: 0 };
var mockCurrentState$3 = [toBeDeletedFieldState, { id: 1 }, { id: 2 }];
var mockHistory$3 = [];
var mockState$6 = {
  fieldTypes: [{ info: { type: "fictitious-instance" } }],
  fieldsState: mockCurrentState$3,
  fieldsStateHistory: mockHistory$3
};

var fieldDeleteAction = deleteField(toBeDeletedFieldState);
var newState$1 = update(mockState$6, fieldDeleteAction);

describe("Update.deleteField", function () {
  it("outputs a state without the field included", function () {
    expect(newState$1.fieldsState.length).toEqual(mockState$6.fieldsState.length - 1);
    expect(newState$1.fieldsState.find(function (v) {
      return v.id === toBeDeletedFieldState.id;
    })).toEqual(undefined);
  });

  it("sends the current state to history", function () {
    var recentHistoryState = newState$1.fieldsStateHistory[0];
    expect(recentHistoryState.length).toEqual(mockCurrentState$3.length);
    expect(recentHistoryState[0].id).toEqual(mockCurrentState$3[0].id);
    expect(recentHistoryState[1].id).toEqual(mockCurrentState$3[1].id);
  });

  it("Returns the current state if no new field is given to it", function () {
    var sameState = update(mockState$6, deleteField(null));
    expect(sameState.fieldTypes.length).toEqual(mockState$6.fieldTypes.length);
    expect(sameState.fieldsState.length).toEqual(mockState$6.fieldsState.length);
    expect(sameState.fieldsStateHistory.length).toEqual(mockState$6.fieldsStateHistory.length);
  });

  it("does not break the state after deleting a field", function () {
    var mockField1 = Object.assign({}, toBeDeletedFieldState, { id: 5 });
    var mockField2 = Object.assign({}, toBeDeletedFieldState, { id: 6 });
    var mockField3 = Object.assign({}, toBeDeletedFieldState, { id: 7 });

    var mockState2 = Object.assign({}, mockState$6, {
      fieldsState: [mockField1, mockField2, mockField3]
    });
    var changed1 = update(mockState2, deleteField(mockField1));
    var changed2 = update(changed1, deleteField(mockField2));
    var changed3 = update(changed2, deleteField(mockField3));
    expect(changed3.fieldTypes.length).toEqual(mockState2.fieldTypes.length);
    expect(changed3.fieldsState.length).toEqual(mockState2.fieldsState.length - 3);
    expect(changed3.fieldsStateHistory.length).toEqual(3);
  });
});

/* eslint-env jasmine */
/* eslint-disable quote-props */

var oldFieldState = {
  type: "fictitious-instance",
  id: "0",
  configShowing: false,
  required: false,
  color: "blue"
};
var newFieldState = Object.assign({}, oldFieldState, { color: "green" });
var mockCurrentState$4 = [oldFieldState, { id: 1 }, { id: 2 }];
var mockHistory$4 = [];
var mockState$7 = {
  fieldTypes: [{ info: { type: "fictitious-instance" } }],
  fieldsState: mockCurrentState$4,
  fieldsStateHistory: mockHistory$4
};

var fieldUpdateAction = updateField(newFieldState);
var newState$2 = update(mockState$7, fieldUpdateAction);

describe("Update.updateField", function () {
  it("outputs a state the field updated", function () {
    expect(newState$2.fieldsState.length).toEqual(mockState$7.fieldsState.length);
    expect(newState$2.fieldsState.find(function (v) {
      return v.color === newFieldState.color;
    })).not.toEqual(undefined);
  });

  it("outputs a state the updated field in the correct order", function () {
    expect(newState$2.fieldsState[0].id).toEqual(mockState$7.fieldsState[0].id);
    expect(newState$2.fieldsState[0].color).toEqual(newFieldState.color);
  });

  it("sends the current state to history", function () {
    var recentHistoryState = newState$2.fieldsStateHistory[0];
    expect(recentHistoryState.length).toEqual(mockCurrentState$4.length);
    expect(recentHistoryState[0].id).toEqual(mockCurrentState$4[0].id);
    expect(recentHistoryState[0].color).toEqual(mockCurrentState$4[0].color);
  });

  it("Returns the current state if an invalid field state is given to it", function () {
    var isSame = function isSame(state1, state2) {
      expect(state1.fieldTypes.length).toEqual(state2.fieldTypes.length);
      expect(state1.fieldsState.length).toEqual(state2.fieldsState.length);
      expect(state1.fieldsState[0].color).toEqual(state2.fieldsState[0].color);
      expect(state1.fieldsState[0].id).toEqual(state2.fieldsState[0].id);
      expect(state1.fieldsStateHistory.length).toEqual(state2.fieldsStateHistory.length);
    };

    var sameState1 = update(mockState$7, updateField(null));
    isSame(mockState$7, sameState1);

    var sameState2 = update(mockState$7, updateField(Object.assign({}, newFieldState, { id: null })));
    isSame(mockState$7, sameState2);

    var sameState3 = update(mockState$7, updateField(Object.assign({}, newFieldState, { configShowing: null })));
    isSame(mockState$7, sameState3);

    var sameState4 = update(mockState$7, updateField(Object.assign({}, newFieldState, { required: null })));

    isSame(mockState$7, sameState4);
  });

  it("does not break the state after updating a field multiple times a field", function () {
    var mockField1 = Object.assign({}, oldFieldState, { color: "yellow" });
    var mockField2 = Object.assign({}, oldFieldState, { color: "orange" });
    var mockField3 = Object.assign({}, oldFieldState, { color: "purple" });

    var changed1 = update(mockState$7, updateField(mockField1));
    var changed2 = update(changed1, updateField(mockField2));
    var changed3 = update(changed2, updateField(mockField3));
    expect(changed3.fieldTypes.length).toEqual(mockState$7.fieldTypes.length);
    expect(changed3.fieldsState.length).toEqual(mockState$7.fieldsState.length);
    expect(changed3.fieldsState[0].id).toEqual(mockState$7.fieldsState[0].id);
    expect(changed3.fieldsState[0].color).toEqual(mockField3.color);
    expect(changed3.fieldsStateHistory.length).toEqual(3);
  });
});

/* eslint-env jasmine */
/* eslint-disable quote-props */

var templateField = {
  type: "fictitious-instance",
  required: false,
  configShowing: false,
  id: "0"
};
var field1 = Object.assign({}, templateField, { id: "1" });
var field2 = Object.assign({}, templateField, { id: "2" });
var field3 = Object.assign({}, templateField, { id: "3" });
var mockCurrentState$5 = [field1, field2, field3];
var mockHistory$5 = [];
var mockState$8 = {
  fieldTypes: [{ info: { type: "fictitious-instance" } }],
  fieldsState: mockCurrentState$5,
  fieldsStateHistory: mockHistory$5
};

var newOrder = ["2", "3", "1"];
var reorderFieldsAction = reorderFields(newOrder);
var newState$3 = update(mockState$8, reorderFieldsAction);

describe("Update.reorderFields", function () {
  it("outputs a state with fields in the new order", function () {
    expect(newState$3.fieldsState.length).toEqual(mockState$8.fieldsState.length);
    expect(newState$3.fieldsState[0].id).toEqual(newOrder[0]);
    expect(newState$3.fieldsState[1].id).toEqual(newOrder[1]);
    expect(newState$3.fieldsState[2].id).toEqual(newOrder[2]);
  });

  it("sends the current state to history", function () {
    expect(newState$3.fieldsStateHistory[0][0].id).toEqual(mockCurrentState$5[0].id);
    expect(newState$3.fieldsStateHistory[0][1].id).toEqual(mockCurrentState$5[1].id);
    expect(newState$3.fieldsStateHistory[0][2].id).toEqual(mockCurrentState$5[2].id);
  });

  it("Returns the current state if any field id is missing", function () {
    var sameState = update(mockState$8, reorderFields(["1", "2"]));
    expect(sameState.fieldTypes.length).toEqual(mockState$8.fieldTypes.length);
    expect(sameState.fieldsState[0].id).toEqual(mockState$8.fieldsState[0].id);
    expect(sameState.fieldsState[1].id).toEqual(mockState$8.fieldsState[1].id);
    expect(sameState.fieldsState[2].id).toEqual(mockState$8.fieldsState[2].id);
    expect(sameState.fieldsState.length).toEqual(mockState$8.fieldsState.length);
    expect(sameState.fieldsStateHistory.length).toEqual(mockState$8.fieldsStateHistory.length);
  });

  it("Returns the current state if the reorder array has more elements than it should", function () {
    var sameState = update(mockState$8, reorderFields(["1", "2", "3", "4"]));
    expect(sameState.fieldTypes.length).toEqual(mockState$8.fieldTypes.length);
    expect(sameState.fieldsState[0].id).toEqual(mockState$8.fieldsState[0].id);
    expect(sameState.fieldsState[1].id).toEqual(mockState$8.fieldsState[1].id);
    expect(sameState.fieldsState[2].id).toEqual(mockState$8.fieldsState[2].id);
    expect(sameState.fieldsState.length).toEqual(mockState$8.fieldsState.length);
    expect(sameState.fieldsStateHistory.length).toEqual(mockState$8.fieldsStateHistory.length);
  });

  it("does not break the state after creating one object", function () {
    var changed1 = update(mockState$8, reorderFields(["1", "2", "3"]));
    var changed2 = update(changed1, reorderFields(["3", "1", "2"]));
    var changed3 = update(changed2, reorderFields(["3", "2", "1"]));
    expect(changed3.fieldTypes.length).toEqual(mockState$8.fieldTypes.length);
    expect(changed3.fieldsState.length).toEqual(mockCurrentState$5.length);
    expect(changed3.fieldsStateHistory.length).toEqual(3);
    expect(changed3.fieldsState[0].id).toEqual("3");
    expect(changed3.fieldsState[1].id).toEqual("2");
    expect(changed3.fieldsState[2].id).toEqual("1");
  });
});

/* eslint-env jasmine */
/* eslint-disable quote-props */

var createType = function createType(name) {
  return {
    initialState: function initialState(_) {
      return _;
    },
    RenderEditor: function RenderEditor(_) {
      return _;
    },
    info: { type: name, group: "custom", displayName: name }
  };
};

var mockState$9 = {
  fieldTypes: [createType("fictitious-instance")],
  fieldsState: [],
  fieldsStateHistory: []
};

var customTypes = [createType("custom-1"), createType("custom-2"), createType("custom-3")];

var importCustomComponentsAction = importCustomComponents(customTypes);
var newState$4 = update(mockState$9, importCustomComponentsAction);

describe("Update.importCustomComponents", function () {
  it("Appends the new valid custom types to the end of the existing types", function () {
    expect(newState$4.fieldTypes.length).toEqual(mockState$9.fieldTypes.length + customTypes.length);
    expect(newState$4.fieldTypes[1].info.type).toEqual(customTypes[0].info.type);
    expect(newState$4.fieldTypes[2].info.type).toEqual(customTypes[1].info.type);
    expect(newState$4.fieldTypes[3].info.type).toEqual(customTypes[2].info.type);
  });

  it("Returns an unchanged array if customTypes is invalid", function () {
    expect(update(mockState$9, importCustomComponents(null))).toEqual(mockState$9);

    var invalid1 = [Object.assign({}, createType("custom-1"), { info: null })];
    expect(update(mockState$9, importCustomComponents(invalid1))).toEqual(mockState$9);

    var invalid2 = [Object.assign({}, createType("custom-1"), { info: { type: null, group: "custom", displayName: "custom" } })];
    expect(update(mockState$9, importCustomComponents(invalid2))).toEqual(mockState$9);

    var invalid3 = [Object.assign({}, createType("custom-1"), { info: { type: "custom", group: null, displayName: "custom" } })];
    expect(update(mockState$9, importCustomComponents(invalid3))).toEqual(mockState$9);

    var invalid4 = [Object.assign({}, createType("custom-1"), { info: { type: "custom", group: "custom", displayName: null } })];
    expect(update(mockState$9, importCustomComponents(invalid4))).toEqual(mockState$9);

    var invalid5 = [Object.assign({}, createType("custom-1"), { RenderEditor: "not a function" })];
    expect(update(mockState$9, importCustomComponents(invalid5))).toEqual(mockState$9);

    var invalid6 = [Object.assign({}, createType("custom-1"), { initialState: "not a function" })];
    expect(update(mockState$9, importCustomComponents(invalid6))).toEqual(mockState$9);
  });
});

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvc3JjL2pzL0FjdGlvbnMuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL3NyYy90ZXN0cy9hY3Rpb25zLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvc2VhbWxlc3MtaW1tdXRhYmxlL3NyYy9zZWFtbGVzcy1pbW11dGFibGUuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL3NyYy9qcy91dGlscy9hc3luY0Rpc3BhdGNoTWlkZGxld2FyZS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvc3JjL3Rlc3RzL3V0aWxzLmFzeW5jRGlzcGF0Y2hNaWRkbGV3YXJlLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvZmwtYXNzZXJ0L2Rpc3QvYXNzZXJ0LmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pc0FycmF5LmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19zbGljZS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY2hlY2tGb3JNZXRob2QuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzUGxhY2Vob2xkZXIuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2N1cnJ5MS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnkyLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeTMuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc2xpY2UuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvb3Zlci5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9hbHdheXMuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc2V0LmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19hcml0eS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fcGlwZS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feHdyYXAuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYmluZC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNTdHJpbmcuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaXNBcnJheUxpa2UuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3JlZHVjZS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9yZWR1Y2UuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdGFpbC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9waXBlLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jb25jYXQuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcHJlcGVuZC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wcm9wLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pc1RyYW5zZm9ybWVyLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19kaXNwYXRjaGFibGUuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX21hcC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feGZCYXNlLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194bWFwLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeU4uanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY3VycnlOLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19oYXMuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzQXJndW1lbnRzLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2tleXMuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWFwLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2xlbnMuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY3VycnkuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9kYXRhLmVpdGhlci9saWIvZWl0aGVyLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvZGF0YS5laXRoZXIvbGliL2luZGV4LmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9zcmMvanMvVXBkYXRlL3V0aWxzLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9zcmMvanMvVXBkYXRlL3VuZG8uanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lkZW50aXR5LmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2lkZW50aXR5LmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BhdGguanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYXAuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcmVkdWNlUmlnaHQuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc2VxdWVuY2UuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdHJhdmVyc2UuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2FycmF5RnJvbUl0ZXJhdG9yLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19mdW5jdGlvbk5hbWUuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaWRlbnRpY2FsLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3R5cGUuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2VxdWFscy5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9lcXVhbHMuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL3NyYy9qcy9VcGRhdGUvaW1wb3J0U3RhdGUuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3JlZHVjZWQuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hmaW5kLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ZpbmQuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9kYXRhLnRhc2svbGliL3Rhc2suanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9kYXRhLnRhc2svbGliL2luZGV4LmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9zcmMvanMvVXBkYXRlL2NyZWF0ZUZpZWxkLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FwcGVuZC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvbm9kZV9tb2R1bGVzL2RhdGEubWF5YmUvbGliL21heWJlLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvZGF0YS5tYXliZS9saWIvaW5kZXguanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL3NyYy9qcy9VcGRhdGUvZmllbGRDcmVhdGVkLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9zcmMvanMvVXBkYXRlL2ZpZWxkLnRvZ2dsZUNvbmZpZy5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvc3JjL2pzL1VwZGF0ZS9maWVsZC50b2dnbGVSZXF1aXJlZC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fZmlsdGVyLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pc09iamVjdC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feGZpbHRlci5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9maWx0ZXIuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL3NyYy9qcy9VcGRhdGUvZmllbGQuZGVsZXRlRmllbGQuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL3NyYy9qcy9VcGRhdGUvZmllbGQudXBkYXRlRmllbGQuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc29ydC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvc3JjL2pzL1VwZGF0ZS9yZW9yZGVyRmllbGRzLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9zcmMvanMvVXBkYXRlL2ltcG9ydEN1c3RvbUNvbXBvbmVudHMuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL3NyYy9qcy9VcGRhdGUvaW5kZXguanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL3NyYy90ZXN0cy91cGRhdGUvdW5kby5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvc3JjL3Rlc3RzL3VwZGF0ZS9pbXBvcnRTdGF0ZS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvc3JjL3Rlc3RzL3VwZGF0ZS9jcmVhdGVGaWVsZC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvQ29tcG9uZW50cy9mbC1mb3JtLWJ1aWxkZXIvc3JjL3Rlc3RzL3VwZGF0ZS9maWVsZENyZWF0ZWQuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL3NyYy90ZXN0cy91cGRhdGUvZmllbGQudG9nZ2xlQ29uZmlnLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9zcmMvdGVzdHMvdXBkYXRlL2ZpZWxkLnRvZ2dsZVJlcXVpcmVkLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9zcmMvdGVzdHMvdXBkYXRlL2ZpZWxkLmRlbGV0ZUZpZWxkLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9zcmMvdGVzdHMvdXBkYXRlL2ZpZWxkLnVwZGF0ZUZpZWxkLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9Db21wb25lbnRzL2ZsLWZvcm0tYnVpbGRlci9zcmMvdGVzdHMvdXBkYXRlL3Jlb3JkZXJGaWVsZHMuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL0NvbXBvbmVudHMvZmwtZm9ybS1idWlsZGVyL3NyYy90ZXN0cy91cGRhdGUvaW1wb3J0Q3VzdG9tQ29tcG9uZW50cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL1xuLy8gICAgQUNUSU9OIENSRUFUT1JTXG4vL1xuXG5leHBvcnQgY29uc3QgdW5kbyA9IF8gPT5cbih7XG4gIHR5cGU6IFwidW5kb1wiLFxufSk7XG5cbmV4cG9ydCBjb25zdCBpbXBvcnRDdXN0b21Db21wb25lbnRzID0gY3VzdG9tQ29tcG9uZW50cyA9PlxuKHtcbiAgdHlwZTogXCJpbXBvcnRDdXN0b21Db21wb25lbnRzXCIsXG4gIGN1c3RvbUNvbXBvbmVudHMsXG59KTtcblxuXG5leHBvcnQgY29uc3QgaW1wb3J0U3RhdGUgPSBuZXdGaWVsZHNTdGF0ZSA9PlxuKHtcbiAgdHlwZTogXCJpbXBvcnRTdGF0ZVwiLFxuICBuZXdGaWVsZHNTdGF0ZSxcbn0pO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRmllbGQgPSBmaWVsZFR5cGUgPT5cbih7XG4gIHR5cGU6IFwiY3JlYXRlRmllbGRcIixcbiAgZmllbGRUeXBlLFxufSk7XG5cbmV4cG9ydCBjb25zdCBmaWVsZENyZWF0ZWQgPSBjcmVhdGVkRmllbGRTdGF0ZSA9PlxuKHtcbiAgdHlwZTogXCJmaWVsZENyZWF0ZWRcIixcbiAgY3JlYXRlZEZpZWxkU3RhdGUsXG59KTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUNvbmZpZyA9IGZpZWxkU3RhdGUgPT5cbih7XG4gIHR5cGU6IFwidG9nZ2xlQ29uZmlnXCIsXG4gIGZpZWxkU3RhdGUsXG59KTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZVJlcXVpcmVkID0gZmllbGRTdGF0ZSA9PlxuKHtcbiAgdHlwZTogXCJ0b2dnbGVSZXF1aXJlZFwiLFxuICBmaWVsZFN0YXRlLFxufSk7XG5cbmV4cG9ydCBjb25zdCBkZWxldGVGaWVsZCA9IGZpZWxkU3RhdGUgPT5cbih7XG4gIHR5cGU6IFwiZGVsZXRlRmllbGRcIixcbiAgZmllbGRTdGF0ZSxcbn0pO1xuXG5leHBvcnQgY29uc3QgdXBkYXRlRmllbGQgPSBuZXdGaWVsZFN0YXRlID0+XG4oe1xuICB0eXBlOiBcInVwZGF0ZUZpZWxkXCIsXG4gIG5ld0ZpZWxkU3RhdGUsXG59KTtcblxuZXhwb3J0IGNvbnN0IHJlb3JkZXJGaWVsZHMgPSBuZXdGaWVsZHNPcmRlciA9PlxuKHtcbiAgdHlwZTogXCJyZW9yZGVyRmllbGRzXCIsXG4gIG5ld0ZpZWxkc09yZGVyLFxufSk7XG4iLCIvKiBlc2xpbnQtZW52IGphc21pbmUgKi9cblxuaW1wb3J0IHtcbiAgdW5kbyxcbiAgaW1wb3J0U3RhdGUsXG4gIGNyZWF0ZUZpZWxkLFxuICBmaWVsZENyZWF0ZWQsXG4gIHRvZ2dsZUNvbmZpZyxcbiAgdG9nZ2xlUmVxdWlyZWQsXG4gIGRlbGV0ZUZpZWxkLFxuICB1cGRhdGVGaWVsZCxcbiAgcmVvcmRlckZpZWxkcyxcbiAgaW1wb3J0Q3VzdG9tQ29tcG9uZW50cyxcbn0gZnJvbSBcIi4uL2pzL0FjdGlvbnNcIjtcblxuZGVzY3JpYmUoXCJBY3Rpb25cIiwgKCkgPT4ge1xuICBkZXNjcmliZShcInVuZG9cIiwgKCkgPT4ge1xuICAgIGl0KFwicmV0dXJucyB0aGUgY29ycmVjdCBhY3Rpb24gdHlwZVwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB1bmRvKCk7XG4gICAgICBleHBlY3QoYWN0aW9uLnR5cGUpLnRvRXF1YWwoXCJ1bmRvXCIpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZShcImltcG9ydFN0YXRlXCIsICgpID0+IHtcbiAgICBjb25zdCBtb2NrU3RhdGVUb0ltcG9ydCA9IFtcImFcIiwgXCJiXCJdO1xuXG4gICAgaXQoXCJyZXR1cm5zIHRoZSBjb3JyZWN0IGFjdGlvbiB0eXBlXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IGltcG9ydFN0YXRlKG1vY2tTdGF0ZVRvSW1wb3J0KTtcbiAgICAgIGV4cGVjdChhY3Rpb24udHlwZSkudG9FcXVhbChcImltcG9ydFN0YXRlXCIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJDcmVhdGVzIHRoZSBjb3JyZWN0IHZhcmlhYmxlc1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb24gPSBpbXBvcnRTdGF0ZShtb2NrU3RhdGVUb0ltcG9ydCk7XG4gICAgICBleHBlY3QoYWN0aW9uLm5ld0ZpZWxkc1N0YXRlKS50b0VxdWFsKG1vY2tTdGF0ZVRvSW1wb3J0KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoXCJjcmVhdGVGaWVsZFwiLCAoKSA9PiB7XG4gICAgY29uc3QgZmllbGRUeXBlID0gXCJ0ZXN0RmllbGRcIjtcblxuICAgIGl0KFwicmV0dXJucyB0aGUgY29ycmVjdCBhY3Rpb24gdHlwZVwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb24gPSBjcmVhdGVGaWVsZChmaWVsZFR5cGUpO1xuICAgICAgZXhwZWN0KGFjdGlvbi50eXBlKS50b0VxdWFsKFwiY3JlYXRlRmllbGRcIik7XG4gICAgfSk7XG5cbiAgICBpdChcIkNyZWF0ZXMgdGhlIGNvcnJlY3QgdmFyaWFibGVzXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IGNyZWF0ZUZpZWxkKGZpZWxkVHlwZSk7XG4gICAgICBleHBlY3QoYWN0aW9uLmZpZWxkVHlwZSkudG9FcXVhbChmaWVsZFR5cGUpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZShcImZpZWxkQ3JlYXRlZFwiLCAoKSA9PiB7XG4gICAgY29uc3QgY3JlYXRlZEZpZWxkU3RhdGUgPSB7fTtcblxuICAgIGl0KFwicmV0dXJucyB0aGUgY29ycmVjdCBhY3Rpb24gdHlwZVwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb24gPSBmaWVsZENyZWF0ZWQoY3JlYXRlZEZpZWxkU3RhdGUpO1xuICAgICAgZXhwZWN0KGFjdGlvbi50eXBlKS50b0VxdWFsKFwiZmllbGRDcmVhdGVkXCIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJDcmVhdGVzIHRoZSBjb3JyZWN0IHZhcmlhYmxlc1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb24gPSBmaWVsZENyZWF0ZWQoY3JlYXRlZEZpZWxkU3RhdGUpO1xuICAgICAgZXhwZWN0KGFjdGlvbi5jcmVhdGVkRmllbGRTdGF0ZSkudG9FcXVhbChjcmVhdGVkRmllbGRTdGF0ZSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKFwidG9nZ2xlQ29uZmlnXCIsICgpID0+IHtcbiAgICBjb25zdCBmaWVsZFN0YXRlID0ge307XG5cbiAgICBpdChcInJldHVybnMgdGhlIGNvcnJlY3QgYWN0aW9uIHR5cGVcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uID0gdG9nZ2xlQ29uZmlnKGZpZWxkU3RhdGUpO1xuICAgICAgZXhwZWN0KGFjdGlvbi50eXBlKS50b0VxdWFsKFwidG9nZ2xlQ29uZmlnXCIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJDcmVhdGVzIHRoZSBjb3JyZWN0IHZhcmlhYmxlc1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB0b2dnbGVDb25maWcoZmllbGRTdGF0ZSk7XG4gICAgICBleHBlY3QoYWN0aW9uLmZpZWxkU3RhdGUpLnRvRXF1YWwoZmllbGRTdGF0ZSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKFwidG9nZ2xlUmVxdWlyZWRcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGZpZWxkU3RhdGUgPSB7fTtcblxuICAgIGl0KFwicmV0dXJucyB0aGUgY29ycmVjdCBhY3Rpb24gdHlwZVwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB0b2dnbGVSZXF1aXJlZChmaWVsZFN0YXRlKTtcbiAgICAgIGV4cGVjdChhY3Rpb24udHlwZSkudG9FcXVhbChcInRvZ2dsZVJlcXVpcmVkXCIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJDcmVhdGVzIHRoZSBjb3JyZWN0IHZhcmlhYmxlc1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB0b2dnbGVSZXF1aXJlZChmaWVsZFN0YXRlKTtcbiAgICAgIGV4cGVjdChhY3Rpb24uZmllbGRTdGF0ZSkudG9FcXVhbChmaWVsZFN0YXRlKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoXCJkZWxldGVGaWVsZFwiLCAoKSA9PiB7XG4gICAgY29uc3QgZmllbGRTdGF0ZSA9IHt9O1xuXG4gICAgaXQoXCJyZXR1cm5zIHRoZSBjb3JyZWN0IGFjdGlvbiB0eXBlXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IGRlbGV0ZUZpZWxkKGZpZWxkU3RhdGUpO1xuICAgICAgZXhwZWN0KGFjdGlvbi50eXBlKS50b0VxdWFsKFwiZGVsZXRlRmllbGRcIik7XG4gICAgfSk7XG5cbiAgICBpdChcIkNyZWF0ZXMgdGhlIGNvcnJlY3QgdmFyaWFibGVzXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IGRlbGV0ZUZpZWxkKGZpZWxkU3RhdGUpO1xuICAgICAgZXhwZWN0KGFjdGlvbi5maWVsZFN0YXRlKS50b0VxdWFsKGZpZWxkU3RhdGUpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZShcInVwZGF0ZUZpZWxkXCIsICgpID0+IHtcbiAgICBjb25zdCBuZXdGaWVsZFN0YXRlID0ge307XG5cbiAgICBpdChcInJldHVybnMgdGhlIGNvcnJlY3QgYWN0aW9uIHR5cGVcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uID0gdXBkYXRlRmllbGQobmV3RmllbGRTdGF0ZSk7XG4gICAgICBleHBlY3QoYWN0aW9uLnR5cGUpLnRvRXF1YWwoXCJ1cGRhdGVGaWVsZFwiKTtcbiAgICB9KTtcblxuICAgIGl0KFwiQ3JlYXRlcyB0aGUgY29ycmVjdCB2YXJpYWJsZXNcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uID0gdXBkYXRlRmllbGQobmV3RmllbGRTdGF0ZSk7XG4gICAgICBleHBlY3QoYWN0aW9uLm5ld0ZpZWxkU3RhdGUpLnRvRXF1YWwobmV3RmllbGRTdGF0ZSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKFwicmVvcmRlckZpZWxkc1wiLCAoKSA9PiB7XG4gICAgY29uc3QgbmV3RmllbGRzT3JkZXIgPSB7fTtcblxuICAgIGl0KFwicmV0dXJucyB0aGUgY29ycmVjdCBhY3Rpb24gdHlwZVwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb24gPSByZW9yZGVyRmllbGRzKG5ld0ZpZWxkc09yZGVyKTtcbiAgICAgIGV4cGVjdChhY3Rpb24udHlwZSkudG9FcXVhbChcInJlb3JkZXJGaWVsZHNcIik7XG4gICAgfSk7XG5cbiAgICBpdChcIkNyZWF0ZXMgdGhlIGNvcnJlY3QgdmFyaWFibGVzXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHJlb3JkZXJGaWVsZHMobmV3RmllbGRzT3JkZXIpO1xuICAgICAgZXhwZWN0KGFjdGlvbi5uZXdGaWVsZHNPcmRlcikudG9FcXVhbChuZXdGaWVsZHNPcmRlcik7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKFwiaW1wb3J0Q3VzdG9tQ29tcG9uZW50c1wiLCAoKSA9PiB7XG4gICAgY29uc3QgY3VzdG9tQ29tcG9uZW50cyA9IFtdO1xuXG4gICAgaXQoXCJyZXR1cm5zIHRoZSBjb3JyZWN0IGFjdGlvbiB0eXBlXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IGltcG9ydEN1c3RvbUNvbXBvbmVudHMoY3VzdG9tQ29tcG9uZW50cyk7XG4gICAgICBleHBlY3QoYWN0aW9uLnR5cGUpLnRvRXF1YWwoXCJpbXBvcnRDdXN0b21Db21wb25lbnRzXCIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJDcmVhdGVzIHRoZSBjb3JyZWN0IHZhcmlhYmxlc1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb24gPSBpbXBvcnRDdXN0b21Db21wb25lbnRzKGN1c3RvbUNvbXBvbmVudHMpO1xuICAgICAgZXhwZWN0KGFjdGlvbi5jdXN0b21Db21wb25lbnRzKS50b0VxdWFsKGN1c3RvbUNvbXBvbmVudHMpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIiwiKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gaW1tdXRhYmxlSW5pdChjb25maWcpIHtcblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvYmxvYi92MTUuMC4xL3NyYy9pc29tb3JwaGljL2NsYXNzaWMvZWxlbWVudC9SZWFjdEVsZW1lbnQuanMjTDIxXG4gIHZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5mb3IgJiYgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpO1xuICB2YXIgUkVBQ1RfRUxFTUVOVF9UWVBFX0ZBTExCQUNLID0gMHhlYWM3O1xuXG4gIHZhciBnbG9iYWxDb25maWcgPSB7XG4gICAgdXNlX3N0YXRpYzogZmFsc2VcbiAgfTtcbiAgaWYgKGlzT2JqZWN0KGNvbmZpZykpIHtcbiAgICAgIGlmIChjb25maWcudXNlX3N0YXRpYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZ2xvYmFsQ29uZmlnLnVzZV9zdGF0aWMgPSBCb29sZWFuKGNvbmZpZy51c2Vfc3RhdGljKTtcbiAgICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzT2JqZWN0KGRhdGEpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmXG4gICAgICAhQXJyYXkuaXNBcnJheShkYXRhKSAmJlxuICAgICAgZGF0YSAhPT0gbnVsbFxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBpbnN0YW50aWF0ZUVtcHR5T2JqZWN0KG9iaikge1xuICAgICAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgICAgaWYgKCFwcm90b3R5cGUpIHtcbiAgICAgICAgICByZXR1cm4ge307XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XG4gICAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRQcm9wZXJ0eVRvKHRhcmdldCwgbWV0aG9kTmFtZSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBtZXRob2ROYW1lLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogdmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJhblByb3BlcnR5KHRhcmdldCwgbWV0aG9kTmFtZSkge1xuICAgIGFkZFByb3BlcnR5VG8odGFyZ2V0LCBtZXRob2ROYW1lLCBmdW5jdGlvbigpIHtcbiAgICAgIHRocm93IG5ldyBJbW11dGFibGVFcnJvcihcIlRoZSBcIiArIG1ldGhvZE5hbWUgK1xuICAgICAgICBcIiBtZXRob2QgY2Fubm90IGJlIGludm9rZWQgb24gYW4gSW1tdXRhYmxlIGRhdGEgc3RydWN0dXJlLlwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBpbW11dGFiaWxpdHlUYWcgPSBcIl9faW1tdXRhYmxlX2ludmFyaWFudHNfaG9sZFwiO1xuXG4gIGZ1bmN0aW9uIGFkZEltbXV0YWJpbGl0eVRhZyh0YXJnZXQpIHtcbiAgICBhZGRQcm9wZXJ0eVRvKHRhcmdldCwgaW1tdXRhYmlsaXR5VGFnLCB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzSW1tdXRhYmxlKHRhcmdldCkge1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0ID09PSBudWxsIHx8IEJvb2xlYW4oXG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBpbW11dGFiaWxpdHlUYWcpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJbiBKYXZhU2NyaXB0LCBvbmx5IG9iamVjdHMgYXJlIGV2ZW4gcG90ZW50aWFsbHkgbXV0YWJsZS5cbiAgICAgIC8vIHN0cmluZ3MsIG51bWJlcnMsIG51bGwsIGFuZCB1bmRlZmluZWQgYXJlIGFsbCBuYXR1cmFsbHkgaW1tdXRhYmxlLlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNFcXVhbChhLCBiKSB7XG4gICAgLy8gQXZvaWQgZmFsc2UgcG9zaXRpdmVzIGR1ZSB0byAoTmFOICE9PSBOYU4pIGV2YWx1YXRpbmcgdG8gdHJ1ZVxuICAgIHJldHVybiAoYSA9PT0gYiB8fCAoYSAhPT0gYSAmJiBiICE9PSBiKSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc01lcmdhYmxlT2JqZWN0KHRhcmdldCkge1xuICAgIHJldHVybiB0YXJnZXQgIT09IG51bGwgJiYgdHlwZW9mIHRhcmdldCA9PT0gXCJvYmplY3RcIiAmJiAhKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkgJiYgISh0YXJnZXQgaW5zdGFuY2VvZiBEYXRlKTtcbiAgfVxuXG4gIHZhciBtdXRhdGluZ09iamVjdE1ldGhvZHMgPSBbXG4gICAgXCJzZXRQcm90b3R5cGVPZlwiXG4gIF07XG5cbiAgdmFyIG5vbk11dGF0aW5nT2JqZWN0TWV0aG9kcyA9IFtcbiAgICBcImtleXNcIlxuICBdO1xuXG4gIHZhciBtdXRhdGluZ0FycmF5TWV0aG9kcyA9IG11dGF0aW5nT2JqZWN0TWV0aG9kcy5jb25jYXQoW1xuICAgIFwicHVzaFwiLCBcInBvcFwiLCBcInNvcnRcIiwgXCJzcGxpY2VcIiwgXCJzaGlmdFwiLCBcInVuc2hpZnRcIiwgXCJyZXZlcnNlXCJcbiAgXSk7XG5cbiAgdmFyIG5vbk11dGF0aW5nQXJyYXlNZXRob2RzID0gbm9uTXV0YXRpbmdPYmplY3RNZXRob2RzLmNvbmNhdChbXG4gICAgXCJtYXBcIiwgXCJmaWx0ZXJcIiwgXCJzbGljZVwiLCBcImNvbmNhdFwiLCBcInJlZHVjZVwiLCBcInJlZHVjZVJpZ2h0XCJcbiAgXSk7XG5cbiAgdmFyIG11dGF0aW5nRGF0ZU1ldGhvZHMgPSBtdXRhdGluZ09iamVjdE1ldGhvZHMuY29uY2F0KFtcbiAgICBcInNldERhdGVcIiwgXCJzZXRGdWxsWWVhclwiLCBcInNldEhvdXJzXCIsIFwic2V0TWlsbGlzZWNvbmRzXCIsIFwic2V0TWludXRlc1wiLCBcInNldE1vbnRoXCIsIFwic2V0U2Vjb25kc1wiLFxuICAgIFwic2V0VGltZVwiLCBcInNldFVUQ0RhdGVcIiwgXCJzZXRVVENGdWxsWWVhclwiLCBcInNldFVUQ0hvdXJzXCIsIFwic2V0VVRDTWlsbGlzZWNvbmRzXCIsIFwic2V0VVRDTWludXRlc1wiLFxuICAgIFwic2V0VVRDTW9udGhcIiwgXCJzZXRVVENTZWNvbmRzXCIsIFwic2V0WWVhclwiXG4gIF0pO1xuXG4gIGZ1bmN0aW9uIEltbXV0YWJsZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB2YXIgZXJyICAgICAgID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIC8vIFRPRE86IENvbnNpZGVyIGBPYmplY3Quc2V0UHJvdG90eXBlT2YoZXJyLCBJbW11dGFibGVFcnJvcik7YFxuICAgIGVyci5fX3Byb3RvX18gPSBJbW11dGFibGVFcnJvcjtcblxuICAgIHJldHVybiBlcnI7XG4gIH1cbiAgSW1tdXRhYmxlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIG1ha2VJbW11dGFibGUob2JqLCBiYW5uZWRNZXRob2RzKSB7XG4gICAgLy8gVGFnIGl0IHNvIHdlIGNhbiBxdWlja2x5IHRlbGwgaXQncyBpbW11dGFibGUgbGF0ZXIuXG4gICAgYWRkSW1tdXRhYmlsaXR5VGFnKG9iaik7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAvLyBNYWtlIGFsbCBtdXRhdGluZyBtZXRob2RzIHRocm93IGV4Y2VwdGlvbnMuXG4gICAgICBmb3IgKHZhciBpbmRleCBpbiBiYW5uZWRNZXRob2RzKSB7XG4gICAgICAgIGlmIChiYW5uZWRNZXRob2RzLmhhc093blByb3BlcnR5KGluZGV4KSkge1xuICAgICAgICAgIGJhblByb3BlcnR5KG9iaiwgYmFubmVkTWV0aG9kc1tpbmRleF0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEZyZWV6ZSBpdCBhbmQgcmV0dXJuIGl0LlxuICAgICAgT2JqZWN0LmZyZWV6ZShvYmopO1xuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiBtYWtlTWV0aG9kUmV0dXJuSW1tdXRhYmxlKG9iaiwgbWV0aG9kTmFtZSkge1xuICAgIHZhciBjdXJyZW50TWV0aG9kID0gb2JqW21ldGhvZE5hbWVdO1xuXG4gICAgYWRkUHJvcGVydHlUbyhvYmosIG1ldGhvZE5hbWUsIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEltbXV0YWJsZShjdXJyZW50TWV0aG9kLmFwcGx5KG9iaiwgYXJndW1lbnRzKSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBhcnJheVNldChpZHgsIHZhbHVlLCBjb25maWcpIHtcbiAgICB2YXIgZGVlcCAgICAgICAgICA9IGNvbmZpZyAmJiBjb25maWcuZGVlcDtcblxuICAgIGlmIChpZHggaW4gdGhpcykge1xuICAgICAgaWYgKGRlZXAgJiYgdGhpc1tpZHhdICE9PSB2YWx1ZSAmJiBpc01lcmdhYmxlT2JqZWN0KHZhbHVlKSAmJiBpc01lcmdhYmxlT2JqZWN0KHRoaXNbaWR4XSkpIHtcbiAgICAgICAgdmFsdWUgPSBJbW11dGFibGUubWVyZ2UodGhpc1tpZHhdLCB2YWx1ZSwge2RlZXA6IHRydWUsIG1vZGU6ICdyZXBsYWNlJ30pO1xuICAgICAgfVxuICAgICAgaWYgKGlzRXF1YWwodGhpc1tpZHhdLCB2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG11dGFibGUgPSBhc011dGFibGVBcnJheS5jYWxsKHRoaXMpO1xuICAgIG11dGFibGVbaWR4XSA9IEltbXV0YWJsZSh2YWx1ZSk7XG4gICAgcmV0dXJuIG1ha2VJbW11dGFibGVBcnJheShtdXRhYmxlKTtcbiAgfVxuXG4gIHZhciBpbW11dGFibGVFbXB0eUFycmF5ID0gSW1tdXRhYmxlKFtdKTtcblxuICBmdW5jdGlvbiBhcnJheVNldEluKHB0aCwgdmFsdWUsIGNvbmZpZykge1xuICAgIHZhciBoZWFkID0gcHRoWzBdO1xuXG4gICAgaWYgKHB0aC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBhcnJheVNldC5jYWxsKHRoaXMsIGhlYWQsIHZhbHVlLCBjb25maWcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdGFpbCA9IHB0aC5zbGljZSgxKTtcbiAgICAgIHZhciB0aGlzSGVhZCA9IHRoaXNbaGVhZF07XG4gICAgICB2YXIgbmV3VmFsdWU7XG5cbiAgICAgIGlmICh0eXBlb2YodGhpc0hlYWQpID09PSBcIm9iamVjdFwiICYmIHRoaXNIZWFkICE9PSBudWxsKSB7XG4gICAgICAgIC8vIE1pZ2h0ICh2YWxpZGx5KSBiZSBvYmplY3Qgb3IgYXJyYXlcbiAgICAgICAgbmV3VmFsdWUgPSBJbW11dGFibGUuc2V0SW4odGhpc0hlYWQsIHRhaWwsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBuZXh0SGVhZCA9IHRhaWxbMF07XG4gICAgICAgIC8vIElmIHRoZSBuZXh0IHBhdGggcGFydCBpcyBhIG51bWJlciwgdGhlbiB3ZSBhcmUgc2V0dGluZyBpbnRvIGFuIGFycmF5LCBlbHNlIGFuIG9iamVjdC5cbiAgICAgICAgaWYgKG5leHRIZWFkICE9PSAnJyAmJiBpc0Zpbml0ZShuZXh0SGVhZCkpIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IGFycmF5U2V0SW4uY2FsbChpbW11dGFibGVFbXB0eUFycmF5LCB0YWlsLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSBvYmplY3RTZXRJbi5jYWxsKGltbXV0YWJsZUVtcHR5T2JqZWN0LCB0YWlsLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGhlYWQgaW4gdGhpcyAmJiB0aGlzSGVhZCA9PT0gbmV3VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIHZhciBtdXRhYmxlID0gYXNNdXRhYmxlQXJyYXkuY2FsbCh0aGlzKTtcbiAgICAgIG11dGFibGVbaGVhZF0gPSBuZXdWYWx1ZTtcbiAgICAgIHJldHVybiBtYWtlSW1tdXRhYmxlQXJyYXkobXV0YWJsZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFrZUltbXV0YWJsZUFycmF5KGFycmF5KSB7XG4gICAgLy8gRG9uJ3QgY2hhbmdlIHRoZWlyIGltcGxlbWVudGF0aW9ucywgYnV0IHdyYXAgdGhlc2UgZnVuY3Rpb25zIHRvIG1ha2Ugc3VyZVxuICAgIC8vIHRoZXkgYWx3YXlzIHJldHVybiBhbiBpbW11dGFibGUgdmFsdWUuXG4gICAgZm9yICh2YXIgaW5kZXggaW4gbm9uTXV0YXRpbmdBcnJheU1ldGhvZHMpIHtcbiAgICAgIGlmIChub25NdXRhdGluZ0FycmF5TWV0aG9kcy5oYXNPd25Qcm9wZXJ0eShpbmRleCkpIHtcbiAgICAgICAgdmFyIG1ldGhvZE5hbWUgPSBub25NdXRhdGluZ0FycmF5TWV0aG9kc1tpbmRleF07XG4gICAgICAgIG1ha2VNZXRob2RSZXR1cm5JbW11dGFibGUoYXJyYXksIG1ldGhvZE5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZ2xvYmFsQ29uZmlnLnVzZV9zdGF0aWMpIHtcbiAgICAgIGFkZFByb3BlcnR5VG8oYXJyYXksIFwiZmxhdE1hcFwiLCAgZmxhdE1hcCk7XG4gICAgICBhZGRQcm9wZXJ0eVRvKGFycmF5LCBcImFzT2JqZWN0XCIsIGFzT2JqZWN0KTtcbiAgICAgIGFkZFByb3BlcnR5VG8oYXJyYXksIFwiYXNNdXRhYmxlXCIsIGFzTXV0YWJsZUFycmF5KTtcbiAgICAgIGFkZFByb3BlcnR5VG8oYXJyYXksIFwic2V0XCIsIGFycmF5U2V0KTtcbiAgICAgIGFkZFByb3BlcnR5VG8oYXJyYXksIFwic2V0SW5cIiwgYXJyYXlTZXRJbik7XG4gICAgICBhZGRQcm9wZXJ0eVRvKGFycmF5LCBcInVwZGF0ZVwiLCB1cGRhdGUpO1xuICAgICAgYWRkUHJvcGVydHlUbyhhcnJheSwgXCJ1cGRhdGVJblwiLCB1cGRhdGVJbik7XG4gICAgfVxuXG4gICAgZm9yKHZhciBpID0gMCwgbGVuZ3RoID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycmF5W2ldID0gSW1tdXRhYmxlKGFycmF5W2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFrZUltbXV0YWJsZShhcnJheSwgbXV0YXRpbmdBcnJheU1ldGhvZHMpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFrZUltbXV0YWJsZURhdGUoZGF0ZSkge1xuICAgIGlmICghZ2xvYmFsQ29uZmlnLnVzZV9zdGF0aWMpIHtcbiAgICAgIGFkZFByb3BlcnR5VG8oZGF0ZSwgXCJhc011dGFibGVcIiwgYXNNdXRhYmxlRGF0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1ha2VJbW11dGFibGUoZGF0ZSwgbXV0YXRpbmdEYXRlTWV0aG9kcyk7XG4gIH1cblxuICBmdW5jdGlvbiBhc011dGFibGVEYXRlKCkge1xuICAgIHJldHVybiBuZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSk7XG4gIH1cblxuICAvKipcbiAgICogRWZmZWN0aXZlbHkgcGVyZm9ybXMgYSBtYXAoKSBvdmVyIHRoZSBlbGVtZW50cyBpbiB0aGUgYXJyYXksIHVzaW5nIHRoZVxuICAgKiBwcm92aWRlZCBpdGVyYXRvciwgZXhjZXB0IHRoYXQgd2hlbmV2ZXIgdGhlIGl0ZXJhdG9yIHJldHVybnMgYW4gYXJyYXksIHRoYXRcbiAgICogYXJyYXkncyBlbGVtZW50cyBhcmUgYWRkZWQgdG8gdGhlIGZpbmFsIHJlc3VsdCBpbnN0ZWFkIG9mIHRoZSBhcnJheSBpdHNlbGYuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGl0ZXJhdG9yIC0gVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBpbnZva2VkIG9uIGVhY2ggZWxlbWVudCBpbiB0aGUgYXJyYXkuIEl0IHdpbGwgcmVjZWl2ZSB0aHJlZSBhcmd1bWVudHM6IHRoZSBjdXJyZW50IHZhbHVlLCB0aGUgY3VycmVudCBpbmRleCwgYW5kIHRoZSBjdXJyZW50IG9iamVjdC5cbiAgICovXG4gIGZ1bmN0aW9uIGZsYXRNYXAoaXRlcmF0b3IpIHtcbiAgICAvLyBDYWxsaW5nIC5mbGF0TWFwKCkgd2l0aCBubyBhcmd1bWVudHMgaXMgYSBuby1vcC4gRG9uJ3QgYm90aGVyIGNsb25pbmcuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSBbXSxcbiAgICAgICAgbGVuZ3RoID0gdGhpcy5sZW5ndGgsXG4gICAgICAgIGluZGV4O1xuXG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIgaXRlcmF0b3JSZXN1bHQgPSBpdGVyYXRvcih0aGlzW2luZGV4XSwgaW5kZXgsIHRoaXMpO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVyYXRvclJlc3VsdCkpIHtcbiAgICAgICAgLy8gQ29uY2F0ZW5hdGUgQXJyYXkgcmVzdWx0cyBpbnRvIHRoZSByZXR1cm4gdmFsdWUgd2UncmUgYnVpbGRpbmcgdXAuXG4gICAgICAgIHJlc3VsdC5wdXNoLmFwcGx5KHJlc3VsdCwgaXRlcmF0b3JSZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSGFuZGxlIG5vbi1BcnJheSByZXN1bHRzIHRoZSBzYW1lIHdheSBtYXAoKSBkb2VzLlxuICAgICAgICByZXN1bHQucHVzaChpdGVyYXRvclJlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1ha2VJbW11dGFibGVBcnJheShyZXN1bHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gSW1tdXRhYmxlIGNvcHkgb2YgdGhlIG9iamVjdCB3aXRob3V0IHRoZSBnaXZlbiBrZXlzIGluY2x1ZGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBrZXlzVG9SZW1vdmUgLSBBIGxpc3Qgb2Ygc3RyaW5ncyByZXByZXNlbnRpbmcgdGhlIGtleXMgdG8gZXhjbHVkZSBpbiB0aGUgcmV0dXJuIHZhbHVlLiBJbnN0ZWFkIG9mIHByb3ZpZGluZyBhIHNpbmdsZSBhcnJheSwgdGhpcyBtZXRob2QgY2FuIGFsc28gYmUgY2FsbGVkIGJ5IHBhc3NpbmcgbXVsdGlwbGUgc3RyaW5ncyBhcyBzZXBhcmF0ZSBhcmd1bWVudHMuXG4gICAqL1xuICBmdW5jdGlvbiB3aXRob3V0KHJlbW92ZSkge1xuICAgIC8vIENhbGxpbmcgLndpdGhvdXQoKSB3aXRoIG5vIGFyZ3VtZW50cyBpcyBhIG5vLW9wLiBEb24ndCBib3RoZXIgY2xvbmluZy5cbiAgICBpZiAodHlwZW9mIHJlbW92ZSA9PT0gXCJ1bmRlZmluZWRcIiAmJiBhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJlbW92ZSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAvLyBJZiB3ZSB3ZXJlbid0IGdpdmVuIGFuIGFycmF5LCB1c2UgdGhlIGFyZ3VtZW50cyBsaXN0LlxuICAgICAgdmFyIGtleXNUb1JlbW92ZUFycmF5ID0gKEFycmF5LmlzQXJyYXkocmVtb3ZlKSkgP1xuICAgICAgICAgcmVtb3ZlLnNsaWNlKCkgOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG4gICAgICAvLyBDb252ZXJ0IG51bWVyaWMga2V5cyB0byBzdHJpbmdzIHNpbmNlIHRoYXQncyBob3cgdGhleSdsbFxuICAgICAgLy8gY29tZSBmcm9tIHRoZSBlbnVtZXJhdGlvbiBvZiB0aGUgb2JqZWN0LlxuICAgICAga2V5c1RvUmVtb3ZlQXJyYXkuZm9yRWFjaChmdW5jdGlvbihlbCwgaWR4LCBhcnIpIHtcbiAgICAgICAgaWYodHlwZW9mKGVsKSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgIGFycltpZHhdID0gZWwudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJlbW92ZSA9IGZ1bmN0aW9uKHZhbCwga2V5KSB7XG4gICAgICAgIHJldHVybiBrZXlzVG9SZW1vdmVBcnJheS5pbmRleE9mKGtleSkgIT09IC0xO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gaW5zdGFudGlhdGVFbXB0eU9iamVjdCh0aGlzKTtcblxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG4gICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHJlbW92ZSh0aGlzW2tleV0sIGtleSkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYWtlSW1tdXRhYmxlT2JqZWN0KHJlc3VsdCk7XG4gIH1cblxuICBmdW5jdGlvbiBhc011dGFibGVBcnJheShvcHRzKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdLCBpLCBsZW5ndGg7XG5cbiAgICBpZihvcHRzICYmIG9wdHMuZGVlcCkge1xuICAgICAgZm9yKGkgPSAwLCBsZW5ndGggPSB0aGlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGFzRGVlcE11dGFibGUodGhpc1tpXSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IoaSA9IDAsIGxlbmd0aCA9IHRoaXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0LnB1c2godGhpc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFZmZlY3RpdmVseSBwZXJmb3JtcyBhIFttYXBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L21hcCkgb3ZlciB0aGUgZWxlbWVudHMgaW4gdGhlIGFycmF5LCBleHBlY3RpbmcgdGhhdCB0aGUgaXRlcmF0b3IgZnVuY3Rpb25cbiAgICogd2lsbCByZXR1cm4gYW4gYXJyYXkgb2YgdHdvIGVsZW1lbnRzIC0gdGhlIGZpcnN0IHJlcHJlc2VudGluZyBhIGtleSwgdGhlIG90aGVyXG4gICAqIGEgdmFsdWUuIFRoZW4gcmV0dXJucyBhbiBJbW11dGFibGUgT2JqZWN0IGNvbnN0cnVjdGVkIG9mIHRob3NlIGtleXMgYW5kIHZhbHVlcy5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gaXRlcmF0b3IgLSBBIGZ1bmN0aW9uIHdoaWNoIHNob3VsZCByZXR1cm4gYW4gYXJyYXkgb2YgdHdvIGVsZW1lbnRzIC0gdGhlIGZpcnN0IHJlcHJlc2VudGluZyB0aGUgZGVzaXJlZCBrZXksIHRoZSBvdGhlciB0aGUgZGVzaXJlZCB2YWx1ZS5cbiAgICovXG4gIGZ1bmN0aW9uIGFzT2JqZWN0KGl0ZXJhdG9yKSB7XG4gICAgLy8gSWYgbm8gaXRlcmF0b3Igd2FzIHByb3ZpZGVkLCBhc3N1bWUgdGhlIGlkZW50aXR5IGZ1bmN0aW9uXG4gICAgLy8gKHN1Z2dlc3RpbmcgdGhpcyBhcnJheSBpcyBhbHJlYWR5IGEgbGlzdCBvZiBrZXkvdmFsdWUgcGFpcnMuKVxuICAgIGlmICh0eXBlb2YgaXRlcmF0b3IgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgaXRlcmF0b3IgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IHt9LFxuICAgICAgICBsZW5ndGggPSB0aGlzLmxlbmd0aCxcbiAgICAgICAgaW5kZXg7XG5cbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBwYWlyICA9IGl0ZXJhdG9yKHRoaXNbaW5kZXhdLCBpbmRleCwgdGhpcyksXG4gICAgICAgICAga2V5ICAgPSBwYWlyWzBdLFxuICAgICAgICAgIHZhbHVlID0gcGFpclsxXTtcblxuICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFrZUltbXV0YWJsZU9iamVjdChyZXN1bHQpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXNEZWVwTXV0YWJsZShvYmopIHtcbiAgICBpZiAoXG4gICAgICAoIW9iaikgfHxcbiAgICAgICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JykgfHxcbiAgICAgICghT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGltbXV0YWJpbGl0eVRhZykpIHx8XG4gICAgICAob2JqIGluc3RhbmNlb2YgRGF0ZSlcbiAgICApIHsgcmV0dXJuIG9iajsgfVxuICAgIHJldHVybiBJbW11dGFibGUuYXNNdXRhYmxlKG9iaiwge2RlZXA6IHRydWV9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHF1aWNrQ29weShzcmMsIGRlc3QpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG4gICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzcmMsIGtleSkpIHtcbiAgICAgICAgZGVzdFtrZXldID0gc3JjW2tleV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlc3Q7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBJbW11dGFibGUgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIHByb3BlcnRpZXMgYW5kIHZhbHVlcyBvZiBib3RoXG4gICAqIHRoaXMgb2JqZWN0IGFuZCB0aGUgcHJvdmlkZWQgb2JqZWN0LCBwcmlvcml0aXppbmcgdGhlIHByb3ZpZGVkIG9iamVjdCdzXG4gICAqIHZhbHVlcyB3aGVuZXZlciB0aGUgc2FtZSBrZXkgaXMgcHJlc2VudCBpbiBib3RoIG9iamVjdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvdGhlciAtIFRoZSBvdGhlciBvYmplY3QgdG8gbWVyZ2UuIE11bHRpcGxlIG9iamVjdHMgY2FuIGJlIHBhc3NlZCBhcyBhbiBhcnJheS4gSW4gc3VjaCBhIGNhc2UsIHRoZSBsYXRlciBhbiBvYmplY3QgYXBwZWFycyBpbiB0aGF0IGxpc3QsIHRoZSBoaWdoZXIgaXRzIHByaW9yaXR5LlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIC0gT3B0aW9uYWwgY29uZmlnIG9iamVjdCB0aGF0IGNvbnRhaW5zIHNldHRpbmdzLiBTdXBwb3J0ZWQgc2V0dGluZ3MgYXJlOiB7ZGVlcDogdHJ1ZX0gZm9yIGRlZXAgbWVyZ2UgYW5kIHttZXJnZXI6IG1lcmdlckZ1bmN9IHdoZXJlIG1lcmdlckZ1bmMgaXMgYSBmdW5jdGlvblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdCB0YWtlcyBhIHByb3BlcnR5IGZyb20gYm90aCBvYmplY3RzLiBJZiBhbnl0aGluZyBpcyByZXR1cm5lZCBpdCBvdmVycmlkZXMgdGhlIG5vcm1hbCBtZXJnZSBiZWhhdmlvdXIuXG4gICAqL1xuICBmdW5jdGlvbiBtZXJnZShvdGhlciwgY29uZmlnKSB7XG4gICAgLy8gQ2FsbGluZyAubWVyZ2UoKSB3aXRoIG5vIGFyZ3VtZW50cyBpcyBhIG5vLW9wLiBEb24ndCBib3RoZXIgY2xvbmluZy5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKG90aGVyID09PSBudWxsIHx8ICh0eXBlb2Ygb3RoZXIgIT09IFwib2JqZWN0XCIpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW1tdXRhYmxlI21lcmdlIGNhbiBvbmx5IGJlIGludm9rZWQgd2l0aCBvYmplY3RzIG9yIGFycmF5cywgbm90IFwiICsgSlNPTi5zdHJpbmdpZnkob3RoZXIpKTtcbiAgICB9XG5cbiAgICB2YXIgcmVjZWl2ZWRBcnJheSA9IChBcnJheS5pc0FycmF5KG90aGVyKSksXG4gICAgICAgIGRlZXAgICAgICAgICAgPSBjb25maWcgJiYgY29uZmlnLmRlZXAsXG4gICAgICAgIG1vZGUgICAgICAgICAgPSBjb25maWcgJiYgY29uZmlnLm1vZGUgfHwgJ21lcmdlJyxcbiAgICAgICAgbWVyZ2VyICAgICAgICA9IGNvbmZpZyAmJiBjb25maWcubWVyZ2VyLFxuICAgICAgICByZXN1bHQ7XG5cbiAgICAvLyBVc2UgdGhlIGdpdmVuIGtleSB0byBleHRyYWN0IGEgdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gb2JqZWN0LCB0aGVuIHBsYWNlXG4gICAgLy8gdGhhdCB2YWx1ZSBpbiB0aGUgcmVzdWx0IG9iamVjdCB1bmRlciB0aGUgc2FtZSBrZXkuIElmIHRoYXQgcmVzdWx0ZWRcbiAgICAvLyBpbiBhIGNoYW5nZSBmcm9tIHRoaXMgb2JqZWN0J3MgdmFsdWUgYXQgdGhhdCBrZXksIHNldCBhbnlDaGFuZ2VzID0gdHJ1ZS5cbiAgICBmdW5jdGlvbiBhZGRUb1Jlc3VsdChjdXJyZW50T2JqLCBvdGhlck9iaiwga2V5KSB7XG4gICAgICB2YXIgaW1tdXRhYmxlVmFsdWUgPSBJbW11dGFibGUob3RoZXJPYmpba2V5XSk7XG4gICAgICB2YXIgbWVyZ2VyUmVzdWx0ID0gbWVyZ2VyICYmIG1lcmdlcihjdXJyZW50T2JqW2tleV0sIGltbXV0YWJsZVZhbHVlLCBjb25maWcpO1xuICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IGN1cnJlbnRPYmpba2V5XTtcblxuICAgICAgaWYgKChyZXN1bHQgIT09IHVuZGVmaW5lZCkgfHxcbiAgICAgICAgKG1lcmdlclJlc3VsdCAhPT0gdW5kZWZpbmVkKSB8fFxuICAgICAgICAoIWN1cnJlbnRPYmouaGFzT3duUHJvcGVydHkoa2V5KSkgfHxcbiAgICAgICAgIWlzRXF1YWwoaW1tdXRhYmxlVmFsdWUsIGN1cnJlbnRWYWx1ZSkpIHtcblxuICAgICAgICB2YXIgbmV3VmFsdWU7XG5cbiAgICAgICAgaWYgKG1lcmdlclJlc3VsdCkge1xuICAgICAgICAgIG5ld1ZhbHVlID0gbWVyZ2VyUmVzdWx0O1xuICAgICAgICB9IGVsc2UgaWYgKGRlZXAgJiYgaXNNZXJnYWJsZU9iamVjdChjdXJyZW50VmFsdWUpICYmIGlzTWVyZ2FibGVPYmplY3QoaW1tdXRhYmxlVmFsdWUpKSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSBJbW11dGFibGUubWVyZ2UoY3VycmVudFZhbHVlLCBpbW11dGFibGVWYWx1ZSwgY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IGltbXV0YWJsZVZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc0VxdWFsKGN1cnJlbnRWYWx1ZSwgbmV3VmFsdWUpIHx8ICFjdXJyZW50T2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIE1ha2UgYSBzaGFsbG93IGNsb25lIG9mIHRoZSBjdXJyZW50IG9iamVjdC5cbiAgICAgICAgICAgIHJlc3VsdCA9IHF1aWNrQ29weShjdXJyZW50T2JqLCBpbnN0YW50aWF0ZUVtcHR5T2JqZWN0KGN1cnJlbnRPYmopKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXN1bHRba2V5XSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJEcm9wcGVkS2V5cyhjdXJyZW50T2JqLCBvdGhlck9iaikge1xuICAgICAgZm9yICh2YXIga2V5IGluIGN1cnJlbnRPYmopIHtcbiAgICAgICAgaWYgKCFvdGhlck9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBNYWtlIGEgc2hhbGxvdyBjbG9uZSBvZiB0aGUgY3VycmVudCBvYmplY3QuXG4gICAgICAgICAgICByZXN1bHQgPSBxdWlja0NvcHkoY3VycmVudE9iaiwgaW5zdGFudGlhdGVFbXB0eU9iamVjdChjdXJyZW50T2JqKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlbGV0ZSByZXN1bHRba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBrZXk7XG5cbiAgICAvLyBBY2hpZXZlIHByaW9yaXRpemF0aW9uIGJ5IG92ZXJyaWRpbmcgcHJldmlvdXMgdmFsdWVzIHRoYXQgZ2V0IGluIHRoZSB3YXkuXG4gICAgaWYgKCFyZWNlaXZlZEFycmF5KSB7XG4gICAgICAvLyBUaGUgbW9zdCBjb21tb24gdXNlIGNhc2U6IGp1c3QgbWVyZ2Ugb25lIG9iamVjdCBpbnRvIHRoZSBleGlzdGluZyBvbmUuXG4gICAgICBmb3IgKGtleSBpbiBvdGhlcikge1xuICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvdGhlciwga2V5KSkge1xuICAgICAgICAgIGFkZFRvUmVzdWx0KHRoaXMsIG90aGVyLCBrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobW9kZSA9PT0gJ3JlcGxhY2UnKSB7XG4gICAgICAgIGNsZWFyRHJvcHBlZEtleXModGhpcywgb3RoZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSBhbHNvIGFjY2VwdCBhbiBBcnJheVxuICAgICAgZm9yICh2YXIgaW5kZXggPSAwLCBsZW5ndGggPSBvdGhlci5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHZhciBvdGhlckZyb21BcnJheSA9IG90aGVyW2luZGV4XTtcblxuICAgICAgICBmb3IgKGtleSBpbiBvdGhlckZyb21BcnJheSkge1xuICAgICAgICAgIGlmIChvdGhlckZyb21BcnJheS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBhZGRUb1Jlc3VsdChyZXN1bHQgIT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRoaXMsIG90aGVyRnJvbUFycmF5LCBrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtYWtlSW1tdXRhYmxlT2JqZWN0KHJlc3VsdCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb2JqZWN0UmVwbGFjZSh2YWx1ZSwgY29uZmlnKSB7XG4gICAgdmFyIGRlZXAgICAgICAgICAgPSBjb25maWcgJiYgY29uZmlnLmRlZXA7XG5cbiAgICAvLyBDYWxsaW5nIC5yZXBsYWNlKCkgd2l0aCBubyBhcmd1bWVudHMgaXMgYSBuby1vcC4gRG9uJ3QgYm90aGVyIGNsb25pbmcuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbW11dGFibGUjcmVwbGFjZSBjYW4gb25seSBiZSBpbnZva2VkIHdpdGggb2JqZWN0cyBvciBhcnJheXMsIG5vdCBcIiArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEltbXV0YWJsZS5tZXJnZSh0aGlzLCB2YWx1ZSwge2RlZXA6IGRlZXAsIG1vZGU6ICdyZXBsYWNlJ30pO1xuICB9XG5cbiAgdmFyIGltbXV0YWJsZUVtcHR5T2JqZWN0ID0gSW1tdXRhYmxlKHt9KTtcblxuICBmdW5jdGlvbiBvYmplY3RTZXRJbihwYXRoLCB2YWx1ZSwgY29uZmlnKSB7XG4gICAgaWYgKCEocGF0aCBpbnN0YW5jZW9mIEFycmF5KSB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBmaXJzdCBhcmd1bWVudCB0byBJbW11dGFibGUjc2V0SW4gbXVzdCBiZSBhbiBhcnJheSBjb250YWluaW5nIGF0IGxlYXN0IG9uZSBcXFwia2V5XFxcIiBzdHJpbmcuXCIpO1xuICAgIH1cblxuICAgIHZhciBoZWFkID0gcGF0aFswXTtcbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBvYmplY3RTZXQuY2FsbCh0aGlzLCBoZWFkLCB2YWx1ZSwgY29uZmlnKTtcbiAgICB9XG5cbiAgICB2YXIgdGFpbCA9IHBhdGguc2xpY2UoMSk7XG4gICAgdmFyIG5ld1ZhbHVlO1xuICAgIHZhciB0aGlzSGVhZCA9IHRoaXNbaGVhZF07XG5cbiAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShoZWFkKSAmJiB0eXBlb2YodGhpc0hlYWQpID09PSBcIm9iamVjdFwiICYmIHRoaXNIZWFkICE9PSBudWxsKSB7XG4gICAgICAvLyBNaWdodCAodmFsaWRseSkgYmUgb2JqZWN0IG9yIGFycmF5XG4gICAgICBuZXdWYWx1ZSA9IEltbXV0YWJsZS5zZXRJbih0aGlzSGVhZCwgdGFpbCwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdWYWx1ZSA9IG9iamVjdFNldEluLmNhbGwoaW1tdXRhYmxlRW1wdHlPYmplY3QsIHRhaWwsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShoZWFkKSAmJiB0aGlzSGVhZCA9PT0gbmV3VmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHZhciBtdXRhYmxlID0gcXVpY2tDb3B5KHRoaXMsIGluc3RhbnRpYXRlRW1wdHlPYmplY3QodGhpcykpO1xuICAgIG11dGFibGVbaGVhZF0gPSBuZXdWYWx1ZTtcbiAgICByZXR1cm4gbWFrZUltbXV0YWJsZU9iamVjdChtdXRhYmxlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9iamVjdFNldChwcm9wZXJ0eSwgdmFsdWUsIGNvbmZpZykge1xuICAgIHZhciBkZWVwICAgICAgICAgID0gY29uZmlnICYmIGNvbmZpZy5kZWVwO1xuXG4gICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICBpZiAoZGVlcCAmJiB0aGlzW3Byb3BlcnR5XSAhPT0gdmFsdWUgJiYgaXNNZXJnYWJsZU9iamVjdCh2YWx1ZSkgJiYgaXNNZXJnYWJsZU9iamVjdCh0aGlzW3Byb3BlcnR5XSkpIHtcbiAgICAgICAgdmFsdWUgPSBJbW11dGFibGUubWVyZ2UodGhpc1twcm9wZXJ0eV0sIHZhbHVlLCB7ZGVlcDogdHJ1ZSwgbW9kZTogJ3JlcGxhY2UnfSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNFcXVhbCh0aGlzW3Byb3BlcnR5XSwgdmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBtdXRhYmxlID0gcXVpY2tDb3B5KHRoaXMsIGluc3RhbnRpYXRlRW1wdHlPYmplY3QodGhpcykpO1xuICAgIG11dGFibGVbcHJvcGVydHldID0gSW1tdXRhYmxlKHZhbHVlKTtcbiAgICByZXR1cm4gbWFrZUltbXV0YWJsZU9iamVjdChtdXRhYmxlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShwcm9wZXJ0eSwgdXBkYXRlcikge1xuICAgIHZhciByZXN0QXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgdmFyIGluaXRpYWxWYWwgPSB0aGlzW3Byb3BlcnR5XTtcbiAgICByZXR1cm4gSW1tdXRhYmxlLnNldCh0aGlzLCBwcm9wZXJ0eSwgdXBkYXRlci5hcHBseShpbml0aWFsVmFsLCBbaW5pdGlhbFZhbF0uY29uY2F0KHJlc3RBcmdzKSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW5QYXRoKG9iaiwgcGF0aCkge1xuICAgIC8qanNoaW50IGVxbnVsbDp0cnVlICovXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYXRoLmxlbmd0aDsgb2JqICE9IG51bGwgJiYgaSA8IGw7IGkrKykge1xuICAgICAgb2JqID0gb2JqW3BhdGhbaV1dO1xuICAgIH1cblxuICAgIHJldHVybiAoaSAmJiBpID09IGwpID8gb2JqIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlSW4ocGF0aCwgdXBkYXRlcikge1xuICAgIHZhciByZXN0QXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgdmFyIGluaXRpYWxWYWwgPSBnZXRJblBhdGgodGhpcywgcGF0aCk7XG5cbiAgICByZXR1cm4gSW1tdXRhYmxlLnNldEluKHRoaXMsIHBhdGgsIHVwZGF0ZXIuYXBwbHkoaW5pdGlhbFZhbCwgW2luaXRpYWxWYWxdLmNvbmNhdChyZXN0QXJncykpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFzTXV0YWJsZU9iamVjdChvcHRzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGluc3RhbnRpYXRlRW1wdHlPYmplY3QodGhpcyksIGtleTtcblxuICAgIGlmKG9wdHMgJiYgb3B0cy5kZWVwKSB7XG4gICAgICBmb3IgKGtleSBpbiB0aGlzKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IGFzRGVlcE11dGFibGUodGhpc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGtleSBpbiB0aGlzKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBDcmVhdGVzIHBsYWluIG9iamVjdCB0byBiZSB1c2VkIGZvciBjbG9uaW5nXG4gIGZ1bmN0aW9uIGluc3RhbnRpYXRlUGxhaW5PYmplY3QoKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLy8gRmluYWxpemVzIGFuIG9iamVjdCB3aXRoIGltbXV0YWJsZSBtZXRob2RzLCBmcmVlemVzIGl0LCBhbmQgcmV0dXJucyBpdC5cbiAgZnVuY3Rpb24gbWFrZUltbXV0YWJsZU9iamVjdChvYmopIHtcbiAgICBpZiAoIWdsb2JhbENvbmZpZy51c2Vfc3RhdGljKSB7XG4gICAgICBhZGRQcm9wZXJ0eVRvKG9iaiwgXCJtZXJnZVwiLCBtZXJnZSk7XG4gICAgICBhZGRQcm9wZXJ0eVRvKG9iaiwgXCJyZXBsYWNlXCIsIG9iamVjdFJlcGxhY2UpO1xuICAgICAgYWRkUHJvcGVydHlUbyhvYmosIFwid2l0aG91dFwiLCB3aXRob3V0KTtcbiAgICAgIGFkZFByb3BlcnR5VG8ob2JqLCBcImFzTXV0YWJsZVwiLCBhc011dGFibGVPYmplY3QpO1xuICAgICAgYWRkUHJvcGVydHlUbyhvYmosIFwic2V0XCIsIG9iamVjdFNldCk7XG4gICAgICBhZGRQcm9wZXJ0eVRvKG9iaiwgXCJzZXRJblwiLCBvYmplY3RTZXRJbik7XG4gICAgICBhZGRQcm9wZXJ0eVRvKG9iaiwgXCJ1cGRhdGVcIiwgdXBkYXRlKTtcbiAgICAgIGFkZFByb3BlcnR5VG8ob2JqLCBcInVwZGF0ZUluXCIsIHVwZGF0ZUluKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFrZUltbXV0YWJsZShvYmosIG11dGF0aW5nT2JqZWN0TWV0aG9kcyk7XG4gIH1cblxuICAvLyBSZXR1cm5zIHRydWUgaWYgb2JqZWN0IGlzIGEgdmFsaWQgcmVhY3QgZWxlbWVudFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvYmxvYi92MTUuMC4xL3NyYy9pc29tb3JwaGljL2NsYXNzaWMvZWxlbWVudC9SZWFjdEVsZW1lbnQuanMjTDMyNlxuICBmdW5jdGlvbiBpc1JlYWN0RWxlbWVudChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgb2JqICE9PSBudWxsICYmXG4gICAgICAgICAgIChvYmouJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRV9GQUxMQkFDSyB8fCBvYmouJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc0ZpbGVPYmplY3Qob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBGaWxlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICBvYmogaW5zdGFuY2VvZiBGaWxlO1xuICB9XG5cbiAgZnVuY3Rpb24gSW1tdXRhYmxlKG9iaiwgb3B0aW9ucywgc3RhY2tSZW1haW5pbmcpIHtcbiAgICBpZiAoaXNJbW11dGFibGUob2JqKSB8fCBpc1JlYWN0RWxlbWVudChvYmopIHx8IGlzRmlsZU9iamVjdChvYmopKSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICByZXR1cm4gbWFrZUltbXV0YWJsZUFycmF5KG9iai5zbGljZSgpKTtcbiAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIHJldHVybiBtYWtlSW1tdXRhYmxlRGF0ZShuZXcgRGF0ZShvYmouZ2V0VGltZSgpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERvbid0IGZyZWV6ZSB0aGUgb2JqZWN0IHdlIHdlcmUgZ2l2ZW47IG1ha2UgYSBjbG9uZSBhbmQgdXNlIHRoYXQuXG4gICAgICB2YXIgcHJvdG90eXBlID0gb3B0aW9ucyAmJiBvcHRpb25zLnByb3RvdHlwZTtcbiAgICAgIHZhciBpbnN0YW50aWF0ZUVtcHR5T2JqZWN0ID1cbiAgICAgICAgKCFwcm90b3R5cGUgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlKSA/XG4gICAgICAgICAgaW5zdGFudGlhdGVQbGFpbk9iamVjdCA6IChmdW5jdGlvbigpIHsgcmV0dXJuIE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTsgfSk7XG4gICAgICB2YXIgY2xvbmUgPSBpbnN0YW50aWF0ZUVtcHR5T2JqZWN0KCk7XG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgLypqc2hpbnQgZXFudWxsOnRydWUgKi9cbiAgICAgICAgaWYgKHN0YWNrUmVtYWluaW5nID09IG51bGwpIHtcbiAgICAgICAgICBzdGFja1JlbWFpbmluZyA9IDY0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFja1JlbWFpbmluZyA8PSAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEltbXV0YWJsZUVycm9yKFwiQXR0ZW1wdCB0byBjb25zdHJ1Y3QgSW1tdXRhYmxlIGZyb20gYSBkZWVwbHkgbmVzdGVkIG9iamVjdCB3YXMgZGV0ZWN0ZWQuXCIgK1xuICAgICAgICAgICAgXCIgSGF2ZSB5b3UgdHJpZWQgdG8gd3JhcCBhbiBvYmplY3Qgd2l0aCBjaXJjdWxhciByZWZlcmVuY2VzIChlLmcuIFJlYWN0IGVsZW1lbnQpP1wiICtcbiAgICAgICAgICAgIFwiIFNlZSBodHRwczovL2dpdGh1Yi5jb20vcnRmZWxkbWFuL3NlYW1sZXNzLWltbXV0YWJsZS93aWtpL0RlZXBseS1uZXN0ZWQtb2JqZWN0LXdhcy1kZXRlY3RlZCBmb3IgZGV0YWlscy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgc3RhY2tSZW1haW5pbmcgLT0gMTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpIHtcbiAgICAgICAgICBjbG9uZVtrZXldID0gSW1tdXRhYmxlKG9ialtrZXldLCB1bmRlZmluZWQsIHN0YWNrUmVtYWluaW5nKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWFrZUltbXV0YWJsZU9iamVjdChjbG9uZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gV3JhcHBlciB0byBhbGxvdyB0aGUgdXNlIG9mIG9iamVjdCBtZXRob2RzIGFzIHN0YXRpYyBtZXRob2RzIG9mIEltbXV0YWJsZS5cbiAgZnVuY3Rpb24gdG9TdGF0aWMoZm4pIHtcbiAgICBmdW5jdGlvbiBzdGF0aWNXcmFwcGVyKCkge1xuICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICB2YXIgc2VsZiA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIHJldHVybiBmbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGljV3JhcHBlcjtcbiAgfVxuXG4gIC8vIFdyYXBwZXIgdG8gYWxsb3cgdGhlIHVzZSBvZiBvYmplY3QgbWV0aG9kcyBhcyBzdGF0aWMgbWV0aG9kcyBvZiBJbW11dGFibGUuXG4gIC8vIHdpdGggdGhlIGFkZGl0aW9uYWwgY29uZGl0aW9uIG9mIGNob29zaW5nIHdoaWNoIGZ1bmN0aW9uIHRvIGNhbGwgZGVwZW5kaW5nXG4gIC8vIGlmIGFyZ3VtZW50IGlzIGFuIGFycmF5IG9yIGFuIG9iamVjdC5cbiAgZnVuY3Rpb24gdG9TdGF0aWNPYmplY3RPckFycmF5KGZuT2JqZWN0LCBmbkFycmF5KSB7XG4gICAgZnVuY3Rpb24gc3RhdGljV3JhcHBlcigpIHtcbiAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgdmFyIHNlbGYgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShzZWxmKSkge1xuICAgICAgICAgIHJldHVybiBmbkFycmF5LmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZm5PYmplY3QuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRpY1dyYXBwZXI7XG4gIH1cblxuICAvLyBXcmFwcGVyIHRvIGFsbG93IHRoZSB1c2Ugb2Ygb2JqZWN0IG1ldGhvZHMgYXMgc3RhdGljIG1ldGhvZHMgb2YgSW1tdXRhYmxlLlxuICAvLyB3aXRoIHRoZSBhZGRpdGlvbmFsIGNvbmRpdGlvbiBvZiBjaG9vc2luZyB3aGljaCBmdW5jdGlvbiB0byBjYWxsIGRlcGVuZGluZ1xuICAvLyBpZiBhcmd1bWVudCBpcyBhbiBhcnJheSBvciBhbiBvYmplY3Qgb3IgYSBkYXRlLlxuICBmdW5jdGlvbiB0b1N0YXRpY09iamVjdE9yRGF0ZU9yQXJyYXkoZm5PYmplY3QsIGZuQXJyYXksIGZuRGF0ZSkge1xuICAgIGZ1bmN0aW9uIHN0YXRpY1dyYXBwZXIoKSB7XG4gICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIHZhciBzZWxmID0gYXJncy5zaGlmdCgpO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2VsZikpIHtcbiAgICAgICAgICByZXR1cm4gZm5BcnJheS5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICByZXR1cm4gZm5EYXRlLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZm5PYmplY3QuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRpY1dyYXBwZXI7XG4gIH1cblxuICAvLyBFeHBvcnQgdGhlIGxpYnJhcnlcbiAgSW1tdXRhYmxlLmZyb20gICAgICAgICAgID0gSW1tdXRhYmxlO1xuICBJbW11dGFibGUuaXNJbW11dGFibGUgICAgPSBpc0ltbXV0YWJsZTtcbiAgSW1tdXRhYmxlLkltbXV0YWJsZUVycm9yID0gSW1tdXRhYmxlRXJyb3I7XG4gIEltbXV0YWJsZS5tZXJnZSAgICAgICAgICA9IHRvU3RhdGljKG1lcmdlKTtcbiAgSW1tdXRhYmxlLnJlcGxhY2UgICAgICAgID0gdG9TdGF0aWMob2JqZWN0UmVwbGFjZSk7XG4gIEltbXV0YWJsZS53aXRob3V0ICAgICAgICA9IHRvU3RhdGljKHdpdGhvdXQpO1xuICBJbW11dGFibGUuYXNNdXRhYmxlICAgICAgPSB0b1N0YXRpY09iamVjdE9yRGF0ZU9yQXJyYXkoYXNNdXRhYmxlT2JqZWN0LCBhc011dGFibGVBcnJheSwgYXNNdXRhYmxlRGF0ZSk7XG4gIEltbXV0YWJsZS5zZXQgICAgICAgICAgICA9IHRvU3RhdGljT2JqZWN0T3JBcnJheShvYmplY3RTZXQsIGFycmF5U2V0KTtcbiAgSW1tdXRhYmxlLnNldEluICAgICAgICAgID0gdG9TdGF0aWNPYmplY3RPckFycmF5KG9iamVjdFNldEluLCBhcnJheVNldEluKTtcbiAgSW1tdXRhYmxlLnVwZGF0ZSAgICAgICAgID0gdG9TdGF0aWModXBkYXRlKTtcbiAgSW1tdXRhYmxlLnVwZGF0ZUluICAgICAgID0gdG9TdGF0aWModXBkYXRlSW4pO1xuICBJbW11dGFibGUuZmxhdE1hcCAgICAgICAgPSB0b1N0YXRpYyhmbGF0TWFwKTtcbiAgSW1tdXRhYmxlLmFzT2JqZWN0ICAgICAgID0gdG9TdGF0aWMoYXNPYmplY3QpO1xuICBpZiAoIWdsb2JhbENvbmZpZy51c2Vfc3RhdGljKSB7XG4gICAgICBJbW11dGFibGUuc3RhdGljID0gaW1tdXRhYmxlSW5pdCh7XG4gICAgICAgICAgdXNlX3N0YXRpYzogdHJ1ZVxuICAgICAgfSk7XG4gIH1cblxuICBPYmplY3QuZnJlZXplKEltbXV0YWJsZSk7XG5cbiAgcmV0dXJuIEltbXV0YWJsZTtcbn1cblxuICB2YXIgSW1tdXRhYmxlID0gaW1tdXRhYmxlSW5pdCgpO1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBJbW11dGFibGU7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gSW1tdXRhYmxlO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZXhwb3J0cy5JbW11dGFibGUgPSBJbW11dGFibGU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikge1xuICAgIHdpbmRvdy5JbW11dGFibGUgPSBJbW11dGFibGU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCA9PT0gXCJvYmplY3RcIikge1xuICAgIGdsb2JhbC5JbW11dGFibGUgPSBJbW11dGFibGU7XG4gIH1cbn0pKCk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuZXctY2FwICovXG5pbXBvcnQgSW1tdXRhYmxlIGZyb20gXCJzZWFtbGVzcy1pbW11dGFibGVcIjtcblxuLy8gVGhpcyBtaWRkbGV3YXJlIHdpbGwganVzdCBhZGQgdGhlIHByb3BlcnR5IFwiYXN5bmMgZGlzcGF0Y2hcIlxuLy8gdG8gYWN0aW9ucyB3aXRoIHRoZSBcImFzeW5jXCIgcHJvcHBlcnR5IHNldCB0byB0cnVlXG5jb25zdCBhc3luY0Rpc3BhdGNoTWlkZGxld2FyZSA9IHN0b3JlID0+IG5leHQgPT4gYWN0aW9uID0+IHtcbiAgbGV0IHN5bmNBY3Rpdml0eUZpbmlzaGVkID0gZmFsc2U7XG4gIGxldCBhY3Rpb25RdWV1ZSA9IFtdO1xuXG4gIGZ1bmN0aW9uIGZsdXNoUXVldWUoKSB7XG4gICAgYWN0aW9uUXVldWUuZm9yRWFjaChhID0+IHN0b3JlLmRpc3BhdGNoKGEpKTsgLy8gZmx1c2ggcXVldWVcbiAgICBhY3Rpb25RdWV1ZSA9IFtdO1xuICB9XG5cbiAgZnVuY3Rpb24gYXN5bmNEaXNwYXRjaChhc3luY0FjdGlvbikge1xuICAgIGFjdGlvblF1ZXVlID0gYWN0aW9uUXVldWUuY29uY2F0KFthc3luY0FjdGlvbl0pO1xuXG4gICAgaWYgKHN5bmNBY3Rpdml0eUZpbmlzaGVkKSB7XG4gICAgICBmbHVzaFF1ZXVlKCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWN0aW9uV2l0aEFzeW5jRGlzcGF0Y2ggPVxuICAgICAgSW1tdXRhYmxlKGFjdGlvbikubWVyZ2UoeyBhc3luY0Rpc3BhdGNoIH0pO1xuXG4gIG5leHQoYWN0aW9uV2l0aEFzeW5jRGlzcGF0Y2gpO1xuICBzeW5jQWN0aXZpdHlGaW5pc2hlZCA9IHRydWU7XG4gIGZsdXNoUXVldWUoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jRGlzcGF0Y2hNaWRkbGV3YXJlO1xuIiwiLyogZXNsaW50LWVudiBqYXNtaW5lICovXG5pbXBvcnQgYXN5bmNEaXNwYXRjaE1pZGRsZXdhcmUgZnJvbSBcIi4uL2pzL3V0aWxzL2FzeW5jRGlzcGF0Y2hNaWRkbGV3YXJlXCI7XG5cbmNvbnN0IGZha2VBY3Rpb24gPSB7IHR5cGU6IFwiZmFrZSBhY3Rpb25cIiB9O1xuXG5kZXNjcmliZShcIlRoZSBhc3luY0Rpc3BhdGNoTWlkZGxld2FyZVwiLCAoKSA9PiB7XG4gIGl0KFwiY2FsbHMgbmV4dCB3aXRoIGFzeW5jRGlzcGF0Y2ggcHJvcGVydHlcIiwgKGRvbmUpID0+IHtcbiAgICBjb25zdCBuZXh0ID0gcmV0dXJuZWRBY3Rpb24gPT4ge1xuICAgICAgZXhwZWN0KHJldHVybmVkQWN0aW9uLmFzeW5jRGlzcGF0Y2gpLm5vdC50b0VxdWFsKHVuZGVmaW5lZCk7XG4gICAgICBleHBlY3QodHlwZW9mIHJldHVybmVkQWN0aW9uLmFzeW5jRGlzcGF0Y2gpLnRvRXF1YWwoXCJmdW5jdGlvblwiKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9O1xuXG4gICAgYXN5bmNEaXNwYXRjaE1pZGRsZXdhcmUoXCJmYWtlU3RvcmVcIikobmV4dCkoZmFrZUFjdGlvbik7XG4gIH0pO1xuXG5cbiAgaXQoXCJhc3luY0Rpc3BhdGNoIHRyaWdnZXJzIGEgc3RvcmUgZGlzcGF0Y2hcIiwgKGRvbmUpID0+IHtcbiAgICBjb25zdCBmYWtlQXN5bmNBY3Rpb24gPSB7IHR5cGU6IFwiZmFrZUFzeW5jQWN0aW9uXCIgfTtcblxuICAgIGNvbnN0IGZha2VTdG9yZSA9IHtcbiAgICAgIGRpc3BhdGNoOiBhY3Rpb24gPT4ge1xuICAgICAgICBleHBlY3QoYWN0aW9uLnR5cGUpLnRvRXF1YWwoZmFrZUFzeW5jQWN0aW9uLnR5cGUpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBuZXh0ID0gcmV0dXJuZWRBY3Rpb24gPT5cbiAgICAgIHJldHVybmVkQWN0aW9uLmFzeW5jRGlzcGF0Y2goZmFrZUFzeW5jQWN0aW9uKTtcblxuICAgIGFzeW5jRGlzcGF0Y2hNaWRkbGV3YXJlKGZha2VTdG9yZSkobmV4dCkoZmFrZUFjdGlvbik7XG4gIH0pO1xufSk7XG4iLCIvLyBCdWcgY2hlY2tpbmcgZnVuY3Rpb24gdGhhdCB3aWxsIHRocm93IGFuIGVycm9yIHdoZW5ldmVyXG4vLyB0aGUgY29uZGl0aW9uIHNlbnQgdG8gaXQgaXMgZXZhbHVhdGVkIHRvIGZhbHNlXG4vKipcbiAqIFByb2Nlc3NlcyB0aGUgbWVzc2FnZSBhbmQgb3V0cHV0cyB0aGUgY29ycmVjdCBtZXNzYWdlIGlmIHRoZSBjb25kaXRpb25cbiAqIGlzIGZhbHNlLiBPdGhlcndpc2UgaXQgb3V0cHV0cyBudWxsLlxuICogQGFwaSBwcml2YXRlXG4gKiBAbWV0aG9kIHByb2Nlc3NDb25kaXRpb25cbiAqIEBwYXJhbSAge0Jvb2xlYW59IGNvbmRpdGlvbiAtIFJlc3VsdCBvZiB0aGUgZXZhbHVhdGVkIGNvbmRpdGlvblxuICogQHBhcmFtICB7U3RyaW5nfSBlcnJvck1lc3NhZ2UgLSBNZXNzYWdlIGV4cGxhaW5pZyB0aGUgZXJyb3IgaW4gY2FzZSBpdCBpcyB0aHJvd25cbiAqIEByZXR1cm4ge1N0cmluZyB8IG51bGx9ICAtIEVycm9yIG1lc3NhZ2UgaWYgdGhlcmUgaXMgYW4gZXJyb3IsIG51bCBvdGhlcndpc2UuXG4gKi9cbmZ1bmN0aW9uIHByb2Nlc3NDb25kaXRpb24oY29uZGl0aW9uLCBlcnJvck1lc3NhZ2UpIHtcbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgY29tcGxldGVFcnJvck1lc3NhZ2UgPSAnJztcbiAgICB2YXIgcmUgPSAvYXQgKFteXFxzXSspXFxzXFwoL2c7XG4gICAgdmFyIHN0YWNrVHJhY2UgPSBuZXcgRXJyb3IoKS5zdGFjaztcbiAgICB2YXIgc3RhY2tGdW5jdGlvbnMgPSBbXTtcblxuICAgIHZhciBmdW5jTmFtZSA9IHJlLmV4ZWMoc3RhY2tUcmFjZSk7XG4gICAgd2hpbGUgKGZ1bmNOYW1lICYmIGZ1bmNOYW1lWzFdKSB7XG4gICAgICBzdGFja0Z1bmN0aW9ucy5wdXNoKGZ1bmNOYW1lWzFdKTtcbiAgICAgIGZ1bmNOYW1lID0gcmUuZXhlYyhzdGFja1RyYWNlKTtcbiAgICB9XG5cbiAgICAvLyBOdW1iZXIgMCBpcyBwcm9jZXNzQ29uZGl0aW9uIGl0c2VsZixcbiAgICAvLyBOdW1iZXIgMSBpcyBhc3NlcnQsXG4gICAgLy8gTnVtYmVyIDIgaXMgdGhlIGNhbGxlciBmdW5jdGlvbi5cbiAgICBpZiAoc3RhY2tGdW5jdGlvbnNbMl0pIHtcbiAgICAgIGNvbXBsZXRlRXJyb3JNZXNzYWdlID0gc3RhY2tGdW5jdGlvbnNbMl0gKyAnOiAnICsgY29tcGxldGVFcnJvck1lc3NhZ2U7XG4gICAgfVxuXG4gICAgY29tcGxldGVFcnJvck1lc3NhZ2UgKz0gZXJyb3JNZXNzYWdlO1xuICAgIHJldHVybiBjb21wbGV0ZUVycm9yTWVzc2FnZTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIFRocm93cyBhbiBlcnJvciBpZiB0aGUgYm9vbGVhbiBwYXNzZWQgdG8gaXQgZXZhbHVhdGVzIHRvIGZhbHNlLlxuICogVG8gYmUgdXNlZCBsaWtlIHRoaXM6XG4gKiBcdFx0YXNzZXJ0KG15RGF0ZSAhPT0gdW5kZWZpbmVkLCBcIkRhdGUgY2Fubm90IGJlIHVuZGVmaW5lZC5cIik7XG4gKiBAYXBpIHB1YmxpY1xuICogQG1ldGhvZCBhc3NlcnRcbiAqIEBwYXJhbSAge0Jvb2xlYW59IGNvbmRpdGlvbiAtIFJlc3VsdCBvZiB0aGUgZXZhbHVhdGVkIGNvbmRpdGlvblxuICogQHBhcmFtICB7U3RyaW5nfSBlcnJvck1lc3NhZ2UgLSBNZXNzYWdlIGV4cGxhaW5pZyB0aGUgZXJyb3IgaW4gY2FzZSBpdCBpcyB0aHJvd25cbiAqIEByZXR1cm4gdm9pZFxuICovXG5mdW5jdGlvbiBhc3NlcnQoY29uZGl0aW9uLCBlcnJvck1lc3NhZ2UpIHtcbiAgdmFyIGVycm9yID0gcHJvY2Vzc0NvbmRpdGlvbihjb25kaXRpb24sIGVycm9yTWVzc2FnZSk7XG4gIGlmICh0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgfVxufVxuXG4vKipcbiAqIExvZ3MgYSB3YXJuaW5nIGlmIHRoZSBib29sZWFuIHBhc3NlZCB0byBpdCBldmFsdWF0ZXMgdG8gZmFsc2UuXG4gKiBUbyBiZSB1c2VkIGxpa2UgdGhpczpcbiAqIFx0XHRhc3NlcnQud2FybihteURhdGUgIT09IHVuZGVmaW5lZCwgXCJObyBkYXRlIHByb3ZpZGVkLlwiKTtcbiAqIEBhcGkgcHVibGljXG4gKiBAbWV0aG9kIHdhcm5cbiAqIEBwYXJhbSAge0Jvb2xlYW59IGNvbmRpdGlvbiAtIFJlc3VsdCBvZiB0aGUgZXZhbHVhdGVkIGNvbmRpdGlvblxuICogQHBhcmFtICB7U3RyaW5nfSBlcnJvck1lc3NhZ2UgLSBNZXNzYWdlIGV4cGxhaW5pZyB0aGUgZXJyb3IgaW4gY2FzZSBpdCBpcyB0aHJvd25cbiAqIEByZXR1cm4gdm9pZFxuICovXG5hc3NlcnQud2FybiA9IGZ1bmN0aW9uIHdhcm4oY29uZGl0aW9uLCBlcnJvck1lc3NhZ2UpIHtcbiAgdmFyIGVycm9yID0gcHJvY2Vzc0NvbmRpdGlvbihjb25kaXRpb24sIGVycm9yTWVzc2FnZSk7XG4gIGlmICh0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc29sZS53YXJuKGVycm9yKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYXNzZXJ0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lJaXdpYzI5MWNtTmxjeUk2V3lKaGMzTmxjblF1YW5NaVhTd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lMeThnUW5WbklHTm9aV05yYVc1bklHWjFibU4wYVc5dUlIUm9ZWFFnZDJsc2JDQjBhSEp2ZHlCaGJpQmxjbkp2Y2lCM2FHVnVaWFpsY2x4dUx5OGdkR2hsSUdOdmJtUnBkR2x2YmlCelpXNTBJSFJ2SUdsMElHbHpJR1YyWVd4MVlYUmxaQ0IwYnlCbVlXeHpaVnh1THlvcVhHNGdLaUJRY205alpYTnpaWE1nZEdobElHMWxjM05oWjJVZ1lXNWtJRzkxZEhCMWRITWdkR2hsSUdOdmNuSmxZM1FnYldWemMyRm5aU0JwWmlCMGFHVWdZMjl1WkdsMGFXOXVYRzRnS2lCcGN5Qm1ZV3h6WlM0Z1QzUm9aWEozYVhObElHbDBJRzkxZEhCMWRITWdiblZzYkM1Y2JpQXFJRUJoY0drZ2NISnBkbUYwWlZ4dUlDb2dRRzFsZEdodlpDQndjbTlqWlhOelEyOXVaR2wwYVc5dVhHNGdLaUJBY0dGeVlXMGdJSHRDYjI5c1pXRnVmU0JqYjI1a2FYUnBiMjRnTFNCU1pYTjFiSFFnYjJZZ2RHaGxJR1YyWVd4MVlYUmxaQ0JqYjI1a2FYUnBiMjVjYmlBcUlFQndZWEpoYlNBZ2UxTjBjbWx1WjMwZ1pYSnliM0pOWlhOellXZGxJQzBnVFdWemMyRm5aU0JsZUhCc1lXbHVhV2NnZEdobElHVnljbTl5SUdsdUlHTmhjMlVnYVhRZ2FYTWdkR2h5YjNkdVhHNGdLaUJBY21WMGRYSnVJSHRUZEhKcGJtY2dmQ0J1ZFd4c2ZTQWdMU0JGY25KdmNpQnRaWE56WVdkbElHbG1JSFJvWlhKbElHbHpJR0Z1SUdWeWNtOXlMQ0J1ZFd3Z2IzUm9aWEozYVhObExseHVJQ292WEc1bWRXNWpkR2x2YmlCd2NtOWpaWE56UTI5dVpHbDBhVzl1S0dOdmJtUnBkR2x2Yml3Z1pYSnliM0pOWlhOellXZGxLU0I3WEc0Z0lHbG1JQ2doWTI5dVpHbDBhVzl1S1NCN1hHNGdJQ0FnYkdWMElHTnZiWEJzWlhSbFJYSnliM0pOWlhOellXZGxJRDBnSnljN1hHNGdJQ0FnWTI5dWMzUWdjbVVnUFNBdllYUWdLRnRlWEZ4elhTc3BYRnh6WEZ3b0wyYzdYRzRnSUNBZ1kyOXVjM1FnYzNSaFkydFVjbUZqWlNBOUlHNWxkeUJGY25KdmNpZ3BMbk4wWVdOck8xeHVJQ0FnSUdOdmJuTjBJSE4wWVdOclJuVnVZM1JwYjI1eklEMGdXMTA3WEc1Y2JpQWdJQ0JzWlhRZ1puVnVZMDVoYldVZ1BTQnlaUzVsZUdWaktITjBZV05yVkhKaFkyVXBPMXh1SUNBZ0lIZG9hV3hsSUNobWRXNWpUbUZ0WlNBbUppQm1kVzVqVG1GdFpWc3hYU2tnZTF4dUlDQWdJQ0FnYzNSaFkydEdkVzVqZEdsdmJuTXVjSFZ6YUNobWRXNWpUbUZ0WlZzeFhTazdYRzRnSUNBZ0lDQm1kVzVqVG1GdFpTQTlJSEpsTG1WNFpXTW9jM1JoWTJ0VWNtRmpaU2s3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeThnVG5WdFltVnlJREFnYVhNZ2NISnZZMlZ6YzBOdmJtUnBkR2x2YmlCcGRITmxiR1lzWEc0Z0lDQWdMeThnVG5WdFltVnlJREVnYVhNZ1lYTnpaWEowTEZ4dUlDQWdJQzh2SUU1MWJXSmxjaUF5SUdseklIUm9aU0JqWVd4c1pYSWdablZ1WTNScGIyNHVYRzRnSUNBZ2FXWWdLSE4wWVdOclJuVnVZM1JwYjI1eld6SmRLU0I3WEc0Z0lDQWdJQ0JqYjIxd2JHVjBaVVZ5Y205eVRXVnpjMkZuWlNBOUlHQWtlM04wWVdOclJuVnVZM1JwYjI1eld6SmRmVG9nSkh0amIyMXdiR1YwWlVWeWNtOXlUV1Z6YzJGblpYMWdPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHTnZiWEJzWlhSbFJYSnliM0pOWlhOellXZGxJQ3M5SUdWeWNtOXlUV1Z6YzJGblpUdGNiaUFnSUNCeVpYUjFjbTRnWTI5dGNHeGxkR1ZGY25KdmNrMWxjM05oWjJVN1hHNGdJSDFjYmx4dUlDQnlaWFIxY200Z2JuVnNiRHRjYm4xY2JseHVMeW9xWEc0Z0tpQlVhSEp2ZDNNZ1lXNGdaWEp5YjNJZ2FXWWdkR2hsSUdKdmIyeGxZVzRnY0dGemMyVmtJSFJ2SUdsMElHVjJZV3gxWVhSbGN5QjBieUJtWVd4elpTNWNiaUFxSUZSdklHSmxJSFZ6WldRZ2JHbHJaU0IwYUdsek9seHVJQ29nWEhSY2RHRnpjMlZ5ZENodGVVUmhkR1VnSVQwOUlIVnVaR1ZtYVc1bFpDd2dYQ0pFWVhSbElHTmhibTV2ZENCaVpTQjFibVJsWm1sdVpXUXVYQ0lwTzF4dUlDb2dRR0Z3YVNCd2RXSnNhV05jYmlBcUlFQnRaWFJvYjJRZ1lYTnpaWEowWEc0Z0tpQkFjR0Z5WVcwZ0lIdENiMjlzWldGdWZTQmpiMjVrYVhScGIyNGdMU0JTWlhOMWJIUWdiMllnZEdobElHVjJZV3gxWVhSbFpDQmpiMjVrYVhScGIyNWNiaUFxSUVCd1lYSmhiU0FnZTFOMGNtbHVaMzBnWlhKeWIzSk5aWE56WVdkbElDMGdUV1Z6YzJGblpTQmxlSEJzWVdsdWFXY2dkR2hsSUdWeWNtOXlJR2x1SUdOaGMyVWdhWFFnYVhNZ2RHaHliM2R1WEc0Z0tpQkFjbVYwZFhKdUlIWnZhV1JjYmlBcUwxeHVablZ1WTNScGIyNGdZWE56WlhKMEtHTnZibVJwZEdsdmJpd2daWEp5YjNKTlpYTnpZV2RsS1NCN1hHNGdJR052Ym5OMElHVnljbTl5SUQwZ2NISnZZMlZ6YzBOdmJtUnBkR2x2YmloamIyNWthWFJwYjI0c0lHVnljbTl5VFdWemMyRm5aU2s3WEc0Z0lHbG1JQ2gwZVhCbGIyWWdaWEp5YjNJZ1BUMDlJQ2R6ZEhKcGJtY25LU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtHVnljbTl5S1R0Y2JpQWdmVnh1ZlZ4dVhHNHZLaXBjYmlBcUlFeHZaM01nWVNCM1lYSnVhVzVuSUdsbUlIUm9aU0JpYjI5c1pXRnVJSEJoYzNObFpDQjBieUJwZENCbGRtRnNkV0YwWlhNZ2RHOGdabUZzYzJVdVhHNGdLaUJVYnlCaVpTQjFjMlZrSUd4cGEyVWdkR2hwY3pwY2JpQXFJRngwWEhSaGMzTmxjblF1ZDJGeWJpaHRlVVJoZEdVZ0lUMDlJSFZ1WkdWbWFXNWxaQ3dnWENKT2J5QmtZWFJsSUhCeWIzWnBaR1ZrTGx3aUtUdGNiaUFxSUVCaGNHa2djSFZpYkdsalhHNGdLaUJBYldWMGFHOWtJSGRoY201Y2JpQXFJRUJ3WVhKaGJTQWdlMEp2YjJ4bFlXNTlJR052Ym1ScGRHbHZiaUF0SUZKbGMzVnNkQ0J2WmlCMGFHVWdaWFpoYkhWaGRHVmtJR052Ym1ScGRHbHZibHh1SUNvZ1FIQmhjbUZ0SUNCN1UzUnlhVzVuZlNCbGNuSnZjazFsYzNOaFoyVWdMU0JOWlhOellXZGxJR1Y0Y0d4aGFXNXBaeUIwYUdVZ1pYSnliM0lnYVc0Z1kyRnpaU0JwZENCcGN5QjBhSEp2ZDI1Y2JpQXFJRUJ5WlhSMWNtNGdkbTlwWkZ4dUlDb3ZYRzVoYzNObGNuUXVkMkZ5YmlBOUlHWjFibU4wYVc5dUlIZGhjbTRvWTI5dVpHbDBhVzl1TENCbGNuSnZjazFsYzNOaFoyVXBJSHRjYmlBZ1kyOXVjM1FnWlhKeWIzSWdQU0J3Y205alpYTnpRMjl1WkdsMGFXOXVLR052Ym1ScGRHbHZiaXdnWlhKeWIzSk5aWE56WVdkbEtUdGNiaUFnYVdZZ0tIUjVjR1Z2WmlCbGNuSnZjaUE5UFQwZ0ozTjBjbWx1WnljcElIdGNiaUFnSUNCamIyNXpiMnhsTG5kaGNtNG9aWEp5YjNJcE8xeHVJQ0I5WEc1OU8xeHVYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQmhjM05sY25RN1hHNGlYU3dpWm1sc1pTSTZJbUZ6YzJWeWRDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSXZjMjkxY21ObEx5SjlcbiIsIi8qKlxuICogVGVzdHMgd2hldGhlciBvciBub3QgYW4gb2JqZWN0IGlzIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgb2JqZWN0IHRvIHRlc3QuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYHZhbGAgaXMgYW4gYXJyYXksIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIF9pc0FycmF5KFtdKTsgLy89PiB0cnVlXG4gKiAgICAgIF9pc0FycmF5KG51bGwpOyAvLz0+IGZhbHNlXG4gKiAgICAgIF9pc0FycmF5KHt9KTsgLy89PiBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gX2lzQXJyYXkodmFsKSB7XG4gIHJldHVybiAodmFsICE9IG51bGwgJiZcbiAgICAgICAgICB2YWwubGVuZ3RoID49IDAgJiZcbiAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJyk7XG59O1xuIiwiLyoqXG4gKiBBbiBvcHRpbWl6ZWQsIHByaXZhdGUgYXJyYXkgYHNsaWNlYCBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcmd1bWVudHN8QXJyYXl9IGFyZ3MgVGhlIGFycmF5IG9yIGFyZ3VtZW50cyBvYmplY3QgdG8gY29uc2lkZXIuXG4gKiBAcGFyYW0ge051bWJlcn0gW2Zyb209MF0gVGhlIGFycmF5IGluZGV4IHRvIHNsaWNlIGZyb20sIGluY2x1c2l2ZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbdG89YXJncy5sZW5ndGhdIFRoZSBhcnJheSBpbmRleCB0byBzbGljZSB0bywgZXhjbHVzaXZlLlxuICogQHJldHVybiB7QXJyYXl9IEEgbmV3LCBzbGljZWQgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgX3NsaWNlKFsxLCAyLCAzLCA0LCA1XSwgMSwgMyk7IC8vPT4gWzIsIDNdXG4gKlxuICogICAgICB2YXIgZmlyc3RUaHJlZUFyZ3MgPSBmdW5jdGlvbihhLCBiLCBjLCBkKSB7XG4gKiAgICAgICAgcmV0dXJuIF9zbGljZShhcmd1bWVudHMsIDAsIDMpO1xuICogICAgICB9O1xuICogICAgICBmaXJzdFRocmVlQXJncygxLCAyLCAzLCA0KTsgLy89PiBbMSwgMiwgM11cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfc2xpY2UoYXJncywgZnJvbSwgdG8pIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gX3NsaWNlKGFyZ3MsIDAsIGFyZ3MubGVuZ3RoKTtcbiAgICBjYXNlIDI6IHJldHVybiBfc2xpY2UoYXJncywgZnJvbSwgYXJncy5sZW5ndGgpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgbGlzdCA9IFtdO1xuICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICB2YXIgbGVuID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oYXJncy5sZW5ndGgsIHRvKSAtIGZyb20pO1xuICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICBsaXN0W2lkeF0gPSBhcmdzW2Zyb20gKyBpZHhdO1xuICAgICAgICBpZHggKz0gMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsaXN0O1xuICB9XG59O1xuIiwidmFyIF9pc0FycmF5ID0gcmVxdWlyZSgnLi9faXNBcnJheScpO1xudmFyIF9zbGljZSA9IHJlcXVpcmUoJy4vX3NsaWNlJyk7XG5cblxuLyoqXG4gKiBTaW1pbGFyIHRvIGhhc01ldGhvZCwgdGhpcyBjaGVja3Mgd2hldGhlciBhIGZ1bmN0aW9uIGhhcyBhIFttZXRob2RuYW1lXVxuICogZnVuY3Rpb24uIElmIGl0IGlzbid0IGFuIGFycmF5IGl0IHdpbGwgZXhlY3V0ZSB0aGF0IGZ1bmN0aW9uIG90aGVyd2lzZSBpdFxuICogd2lsbCBkZWZhdWx0IHRvIHRoZSByYW1kYSBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gcmFtZGEgaW1wbGVtdGF0aW9uXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kbmFtZSBwcm9wZXJ0eSB0byBjaGVjayBmb3IgYSBjdXN0b20gaW1wbGVtZW50YXRpb25cbiAqIEByZXR1cm4ge09iamVjdH0gV2hhdGV2ZXIgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgbWV0aG9kIGlzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9jaGVja0Zvck1ldGhvZChtZXRob2RuYW1lLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuICAgIHZhciBvYmogPSBhcmd1bWVudHNbbGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIChfaXNBcnJheShvYmopIHx8IHR5cGVvZiBvYmpbbWV0aG9kbmFtZV0gIT09ICdmdW5jdGlvbicpID9cbiAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOlxuICAgICAgb2JqW21ldGhvZG5hbWVdLmFwcGx5KG9iaiwgX3NsaWNlKGFyZ3VtZW50cywgMCwgbGVuZ3RoIC0gMSkpO1xuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2lzUGxhY2Vob2xkZXIoYSkge1xuICByZXR1cm4gYSAhPSBudWxsICYmXG4gICAgICAgICB0eXBlb2YgYSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgIGFbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlO1xufTtcbiIsInZhciBfaXNQbGFjZWhvbGRlciA9IHJlcXVpcmUoJy4vX2lzUGxhY2Vob2xkZXInKTtcblxuXG4vKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCBvbmUtYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9jdXJyeTEoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGYxKGEpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fCBfaXNQbGFjZWhvbGRlcihhKSkge1xuICAgICAgcmV0dXJuIGYxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH07XG59O1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL19jdXJyeTEnKTtcbnZhciBfaXNQbGFjZWhvbGRlciA9IHJlcXVpcmUoJy4vX2lzUGxhY2Vob2xkZXInKTtcblxuXG4vKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCB0d28tYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9jdXJyeTIoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGYyKGEsIGIpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIGYyO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgPyBmMlxuICAgICAgICAgICAgIDogX2N1cnJ5MShmdW5jdGlvbihfYikgeyByZXR1cm4gZm4oYSwgX2IpOyB9KTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihiKSA/IGYyXG4gICAgICAgICAgICAgOiBfaXNQbGFjZWhvbGRlcihhKSA/IF9jdXJyeTEoZnVuY3Rpb24oX2EpIHsgcmV0dXJuIGZuKF9hLCBiKTsgfSlcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGIpID8gX2N1cnJ5MShmdW5jdGlvbihfYikgeyByZXR1cm4gZm4oYSwgX2IpOyB9KVxuICAgICAgICAgICAgIDogZm4oYSwgYik7XG4gICAgfVxuICB9O1xufTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9fY3VycnkxJyk7XG52YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vX2N1cnJ5MicpO1xudmFyIF9pc1BsYWNlaG9sZGVyID0gcmVxdWlyZSgnLi9faXNQbGFjZWhvbGRlcicpO1xuXG5cbi8qKlxuICogT3B0aW1pemVkIGludGVybmFsIHRocmVlLWFyaXR5IGN1cnJ5IGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY3VycnkzKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmMyhhLCBiLCBjKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBmMztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpID8gZjNcbiAgICAgICAgICAgICA6IF9jdXJyeTIoZnVuY3Rpb24oX2IsIF9jKSB7IHJldHVybiBmbihhLCBfYiwgX2MpOyB9KTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGIpID8gZjNcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGEpID8gX2N1cnJ5MihmdW5jdGlvbihfYSwgX2MpIHsgcmV0dXJuIGZuKF9hLCBiLCBfYyk7IH0pXG4gICAgICAgICAgICAgOiBfaXNQbGFjZWhvbGRlcihiKSA/IF9jdXJyeTIoZnVuY3Rpb24oX2IsIF9jKSB7IHJldHVybiBmbihhLCBfYiwgX2MpOyB9KVxuICAgICAgICAgICAgIDogX2N1cnJ5MShmdW5jdGlvbihfYykgeyByZXR1cm4gZm4oYSwgYiwgX2MpOyB9KTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihiKSAmJiBfaXNQbGFjZWhvbGRlcihjKSA/IGYzXG4gICAgICAgICAgICAgOiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihiKSA/IF9jdXJyeTIoZnVuY3Rpb24oX2EsIF9iKSB7IHJldHVybiBmbihfYSwgX2IsIGMpOyB9KVxuICAgICAgICAgICAgIDogX2lzUGxhY2Vob2xkZXIoYSkgJiYgX2lzUGxhY2Vob2xkZXIoYykgPyBfY3VycnkyKGZ1bmN0aW9uKF9hLCBfYykgeyByZXR1cm4gZm4oX2EsIGIsIF9jKTsgfSlcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGIpICYmIF9pc1BsYWNlaG9sZGVyKGMpID8gX2N1cnJ5MihmdW5jdGlvbihfYiwgX2MpIHsgcmV0dXJuIGZuKGEsIF9iLCBfYyk7IH0pXG4gICAgICAgICAgICAgOiBfaXNQbGFjZWhvbGRlcihhKSA/IF9jdXJyeTEoZnVuY3Rpb24oX2EpIHsgcmV0dXJuIGZuKF9hLCBiLCBjKTsgfSlcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGIpID8gX2N1cnJ5MShmdW5jdGlvbihfYikgeyByZXR1cm4gZm4oYSwgX2IsIGMpOyB9KVxuICAgICAgICAgICAgIDogX2lzUGxhY2Vob2xkZXIoYykgPyBfY3VycnkxKGZ1bmN0aW9uKF9jKSB7IHJldHVybiBmbihhLCBiLCBfYyk7IH0pXG4gICAgICAgICAgICAgOiBmbihhLCBiLCBjKTtcbiAgICB9XG4gIH07XG59O1xuIiwidmFyIF9jaGVja0Zvck1ldGhvZCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2NoZWNrRm9yTWV0aG9kJyk7XG52YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgZWxlbWVudHMgb2YgdGhlIGdpdmVuIGxpc3Qgb3Igc3RyaW5nIChvciBvYmplY3Qgd2l0aCBhIGBzbGljZWBcbiAqIG1ldGhvZCkgZnJvbSBgZnJvbUluZGV4YCAoaW5jbHVzaXZlKSB0byBgdG9JbmRleGAgKGV4Y2x1c2l2ZSkuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYHNsaWNlYCBtZXRob2Qgb2YgdGhlIHRoaXJkIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuNFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBbYV0gLT4gW2FdXG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IGZyb21JbmRleCBUaGUgc3RhcnQgaW5kZXggKGluY2x1c2l2ZSkuXG4gKiBAcGFyYW0ge051bWJlcn0gdG9JbmRleCBUaGUgZW5kIGluZGV4IChleGNsdXNpdmUpLlxuICogQHBhcmFtIHsqfSBsaXN0XG4gKiBAcmV0dXJuIHsqfVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuc2xpY2UoMSwgMywgWydhJywgJ2InLCAnYycsICdkJ10pOyAgICAgICAgLy89PiBbJ2InLCAnYyddXG4gKiAgICAgIFIuc2xpY2UoMSwgSW5maW5pdHksIFsnYScsICdiJywgJ2MnLCAnZCddKTsgLy89PiBbJ2InLCAnYycsICdkJ11cbiAqICAgICAgUi5zbGljZSgwLCAtMSwgWydhJywgJ2InLCAnYycsICdkJ10pOyAgICAgICAvLz0+IFsnYScsICdiJywgJ2MnXVxuICogICAgICBSLnNsaWNlKC0zLCAtMSwgWydhJywgJ2InLCAnYycsICdkJ10pOyAgICAgIC8vPT4gWydiJywgJ2MnXVxuICogICAgICBSLnNsaWNlKDAsIDMsICdyYW1kYScpOyAgICAgICAgICAgICAgICAgICAgIC8vPT4gJ3JhbSdcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkzKF9jaGVja0Zvck1ldGhvZCgnc2xpY2UnLCBmdW5jdGlvbiBzbGljZShmcm9tSW5kZXgsIHRvSW5kZXgsIGxpc3QpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGxpc3QsIGZyb21JbmRleCwgdG9JbmRleCk7XG59KSk7XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgcmVzdWx0IG9mIFwic2V0dGluZ1wiIHRoZSBwb3J0aW9uIG9mIHRoZSBnaXZlbiBkYXRhIHN0cnVjdHVyZVxuICogZm9jdXNlZCBieSB0aGUgZ2l2ZW4gbGVucyB0byB0aGUgcmVzdWx0IG9mIGFwcGx5aW5nIHRoZSBnaXZlbiBmdW5jdGlvbiB0b1xuICogdGhlIGZvY3VzZWQgdmFsdWUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTYuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHR5cGVkZWZuIExlbnMgcyBhID0gRnVuY3RvciBmID0+IChhIC0+IGYgYSkgLT4gcyAtPiBmIHNcbiAqIEBzaWcgTGVucyBzIGEgLT4gKGEgLT4gYSkgLT4gcyAtPiBzXG4gKiBAcGFyYW0ge0xlbnN9IGxlbnNcbiAqIEBwYXJhbSB7Kn0gdlxuICogQHBhcmFtIHsqfSB4XG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLnByb3AsIFIubGVuc0luZGV4LCBSLmxlbnNQcm9wXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGhlYWRMZW5zID0gUi5sZW5zSW5kZXgoMCk7XG4gKlxuICogICAgICBSLm92ZXIoaGVhZExlbnMsIFIudG9VcHBlciwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ0ZPTycsICdiYXInLCAnYmF6J11cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIC8vIGBJZGVudGl0eWAgaXMgYSBmdW5jdG9yIHRoYXQgaG9sZHMgYSBzaW5nbGUgdmFsdWUsIHdoZXJlIGBtYXBgIHNpbXBseVxuICAvLyB0cmFuc2Zvcm1zIHRoZSBoZWxkIHZhbHVlIHdpdGggdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLlxuICB2YXIgSWRlbnRpdHkgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHt2YWx1ZTogeCwgbWFwOiBmdW5jdGlvbihmKSB7IHJldHVybiBJZGVudGl0eShmKHgpKTsgfX07XG4gIH07XG5cbiAgcmV0dXJuIF9jdXJyeTMoZnVuY3Rpb24gb3ZlcihsZW5zLCBmLCB4KSB7XG4gICAgLy8gVGhlIHZhbHVlIHJldHVybmVkIGJ5IHRoZSBnZXR0ZXIgZnVuY3Rpb24gaXMgZmlyc3QgdHJhbnNmb3JtZWQgd2l0aCBgZmAsXG4gICAgLy8gdGhlbiBzZXQgYXMgdGhlIHZhbHVlIG9mIGFuIGBJZGVudGl0eWAuIFRoaXMgaXMgdGhlbiBtYXBwZWQgb3ZlciB3aXRoIHRoZVxuICAgIC8vIHNldHRlciBmdW5jdGlvbiBvZiB0aGUgbGVucy5cbiAgICByZXR1cm4gbGVucyhmdW5jdGlvbih5KSB7IHJldHVybiBJZGVudGl0eShmKHkpKTsgfSkoeCkudmFsdWU7XG4gIH0pO1xufSgpKTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBhbHdheXMgcmV0dXJucyB0aGUgZ2l2ZW4gdmFsdWUuIE5vdGUgdGhhdCBmb3JcbiAqIG5vbi1wcmltaXRpdmVzIHRoZSB2YWx1ZSByZXR1cm5lZCBpcyBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgdmFsdWUuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBpcyBrbm93biBhcyBgY29uc3RgLCBgY29uc3RhbnRgLCBvciBgS2AgKGZvciBLIGNvbWJpbmF0b3IpIGluXG4gKiBvdGhlciBsYW5ndWFnZXMgYW5kIGxpYnJhcmllcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBhIC0+ICgqIC0+IGEpXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gd3JhcCBpbiBhIGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBGdW5jdGlvbiA6OiAqIC0+IHZhbC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgdCA9IFIuYWx3YXlzKCdUZWUnKTtcbiAqICAgICAgdCgpOyAvLz0+ICdUZWUnXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiBhbHdheXModmFsKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsO1xuICB9O1xufSk7XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xudmFyIGFsd2F5cyA9IHJlcXVpcmUoJy4vYWx3YXlzJyk7XG52YXIgb3ZlciA9IHJlcXVpcmUoJy4vb3ZlcicpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgcmVzdWx0IG9mIFwic2V0dGluZ1wiIHRoZSBwb3J0aW9uIG9mIHRoZSBnaXZlbiBkYXRhIHN0cnVjdHVyZVxuICogZm9jdXNlZCBieSB0aGUgZ2l2ZW4gbGVucyB0byB0aGUgZ2l2ZW4gdmFsdWUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTYuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHR5cGVkZWZuIExlbnMgcyBhID0gRnVuY3RvciBmID0+IChhIC0+IGYgYSkgLT4gcyAtPiBmIHNcbiAqIEBzaWcgTGVucyBzIGEgLT4gYSAtPiBzIC0+IHNcbiAqIEBwYXJhbSB7TGVuc30gbGVuc1xuICogQHBhcmFtIHsqfSB2XG4gKiBAcGFyYW0geyp9IHhcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIucHJvcCwgUi5sZW5zSW5kZXgsIFIubGVuc1Byb3BcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgeExlbnMgPSBSLmxlbnNQcm9wKCd4Jyk7XG4gKlxuICogICAgICBSLnNldCh4TGVucywgNCwge3g6IDEsIHk6IDJ9KTsgIC8vPT4ge3g6IDQsIHk6IDJ9XG4gKiAgICAgIFIuc2V0KHhMZW5zLCA4LCB7eDogMSwgeTogMn0pOyAgLy89PiB7eDogOCwgeTogMn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkzKGZ1bmN0aW9uIHNldChsZW5zLCB2LCB4KSB7XG4gIHJldHVybiBvdmVyKGxlbnMsIGFsd2F5cyh2KSwgeCk7XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2FyaXR5KG4sIGZuKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4gIHN3aXRjaCAobikge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhMCkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhMCwgYTEpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMikgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMykgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDU6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSA2OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDc6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNikgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDg6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSA5OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDEwOiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCwgYTkpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCB0byBfYXJpdHkgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIG5vIGdyZWF0ZXIgdGhhbiB0ZW4nKTtcbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX3BpcGUoZiwgZykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGcuY2FsbCh0aGlzLCBmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBYV3JhcChmbikge1xuICAgIHRoaXMuZiA9IGZuO1xuICB9XG4gIFhXcmFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IGZ1bmN0aW9uKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5pdCBub3QgaW1wbGVtZW50ZWQgb24gWFdyYXAnKTtcbiAgfTtcbiAgWFdyYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbihhY2MpIHsgcmV0dXJuIGFjYzsgfTtcbiAgWFdyYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24oYWNjLCB4KSB7XG4gICAgcmV0dXJuIHRoaXMuZihhY2MsIHgpO1xuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbiBfeHdyYXAoZm4pIHsgcmV0dXJuIG5ldyBYV3JhcChmbik7IH07XG59KCkpO1xuIiwidmFyIF9hcml0eSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2FyaXR5Jyk7XG52YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaXMgYm91bmQgdG8gYSBjb250ZXh0LlxuICogTm90ZTogYFIuYmluZGAgZG9lcyBub3QgcHJvdmlkZSB0aGUgYWRkaXRpb25hbCBhcmd1bWVudC1iaW5kaW5nIGNhcGFiaWxpdGllcyBvZlxuICogW0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9GdW5jdGlvbi9iaW5kKS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC42LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyAoKiAtPiAqKSAtPiB7Kn0gLT4gKCogLT4gKilcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBiaW5kIHRvIGNvbnRleHRcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzT2JqIFRoZSBjb250ZXh0IHRvIGJpbmQgYGZuYCB0b1xuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCB3aWxsIGV4ZWN1dGUgaW4gdGhlIGNvbnRleHQgb2YgYHRoaXNPYmpgLlxuICogQHNlZSBSLnBhcnRpYWxcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbG9nID0gUi5iaW5kKGNvbnNvbGUubG9nLCBjb25zb2xlKTtcbiAqICAgICAgUi5waXBlKFIuYXNzb2MoJ2EnLCAyKSwgUi50YXAobG9nKSwgUi5hc3NvYygnYScsIDMpKSh7YTogMX0pOyAvLz0+IHthOiAzfVxuICogICAgICAvLyBsb2dzIHthOiAyfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gYmluZChmbiwgdGhpc09iaikge1xuICByZXR1cm4gX2FyaXR5KGZuLmxlbmd0aCwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNPYmosIGFyZ3VtZW50cyk7XG4gIH0pO1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9pc1N0cmluZyh4KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xufTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgX2lzQXJyYXkgPSByZXF1aXJlKCcuL2ludGVybmFsL19pc0FycmF5Jyk7XG52YXIgX2lzU3RyaW5nID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNTdHJpbmcnKTtcblxuXG4vKipcbiAqIFRlc3RzIHdoZXRoZXIgb3Igbm90IGFuIG9iamVjdCBpcyBzaW1pbGFyIHRvIGFuIGFycmF5LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjUuMFxuICogQGNhdGVnb3J5IFR5cGVcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICogLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfSB4IFRoZSBvYmplY3QgdG8gdGVzdC5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBgeGAgaGFzIGEgbnVtZXJpYyBsZW5ndGggcHJvcGVydHkgYW5kIGV4dHJlbWUgaW5kaWNlcyBkZWZpbmVkOyBgZmFsc2VgIG90aGVyd2lzZS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmlzQXJyYXlMaWtlKFtdKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuaXNBcnJheUxpa2UodHJ1ZSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5pc0FycmF5TGlrZSh7fSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5pc0FycmF5TGlrZSh7bGVuZ3RoOiAxMH0pOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuaXNBcnJheUxpa2UoezA6ICd6ZXJvJywgOTogJ25pbmUnLCBsZW5ndGg6IDEwfSk7IC8vPT4gdHJ1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gaXNBcnJheUxpa2UoeCkge1xuICBpZiAoX2lzQXJyYXkoeCkpIHsgcmV0dXJuIHRydWU7IH1cbiAgaWYgKCF4KSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAodHlwZW9mIHggIT09ICdvYmplY3QnKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoX2lzU3RyaW5nKHgpKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoeC5ub2RlVHlwZSA9PT0gMSkgeyByZXR1cm4gISF4Lmxlbmd0aDsgfVxuICBpZiAoeC5sZW5ndGggPT09IDApIHsgcmV0dXJuIHRydWU7IH1cbiAgaWYgKHgubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiB4Lmhhc093blByb3BlcnR5KDApICYmIHguaGFzT3duUHJvcGVydHkoeC5sZW5ndGggLSAxKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59KTtcbiIsInZhciBfeHdyYXAgPSByZXF1aXJlKCcuL194d3JhcCcpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9iaW5kJyk7XG52YXIgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pc0FycmF5TGlrZScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBfYXJyYXlSZWR1Y2UoeGYsIGFjYywgbGlzdCkge1xuICAgIHZhciBpZHggPSAwO1xuICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICBhY2MgPSB4ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShhY2MsIGxpc3RbaWR4XSk7XG4gICAgICBpZiAoYWNjICYmIGFjY1snQEB0cmFuc2R1Y2VyL3JlZHVjZWQnXSkge1xuICAgICAgICBhY2MgPSBhY2NbJ0BAdHJhbnNkdWNlci92YWx1ZSddO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlkeCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4geGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShhY2MpO1xuICB9XG5cbiAgZnVuY3Rpb24gX2l0ZXJhYmxlUmVkdWNlKHhmLCBhY2MsIGl0ZXIpIHtcbiAgICB2YXIgc3RlcCA9IGl0ZXIubmV4dCgpO1xuICAgIHdoaWxlICghc3RlcC5kb25lKSB7XG4gICAgICBhY2MgPSB4ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShhY2MsIHN0ZXAudmFsdWUpO1xuICAgICAgaWYgKGFjYyAmJiBhY2NbJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJ10pIHtcbiAgICAgICAgYWNjID0gYWNjWydAQHRyYW5zZHVjZXIvdmFsdWUnXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBzdGVwID0gaXRlci5uZXh0KCk7XG4gICAgfVxuICAgIHJldHVybiB4ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKGFjYyk7XG4gIH1cblxuICBmdW5jdGlvbiBfbWV0aG9kUmVkdWNlKHhmLCBhY2MsIG9iaikge1xuICAgIHJldHVybiB4ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKG9iai5yZWR1Y2UoYmluZCh4ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSwgeGYpLCBhY2MpKTtcbiAgfVxuXG4gIHZhciBzeW1JdGVyYXRvciA9ICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJykgPyBTeW1ib2wuaXRlcmF0b3IgOiAnQEBpdGVyYXRvcic7XG4gIHJldHVybiBmdW5jdGlvbiBfcmVkdWNlKGZuLCBhY2MsIGxpc3QpIHtcbiAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBmbiA9IF94d3JhcChmbik7XG4gICAgfVxuICAgIGlmIChpc0FycmF5TGlrZShsaXN0KSkge1xuICAgICAgcmV0dXJuIF9hcnJheVJlZHVjZShmbiwgYWNjLCBsaXN0KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBsaXN0LnJlZHVjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIF9tZXRob2RSZWR1Y2UoZm4sIGFjYywgbGlzdCk7XG4gICAgfVxuICAgIGlmIChsaXN0W3N5bUl0ZXJhdG9yXSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gX2l0ZXJhYmxlUmVkdWNlKGZuLCBhY2MsIGxpc3Rbc3ltSXRlcmF0b3JdKCkpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGxpc3QubmV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIF9pdGVyYWJsZVJlZHVjZShmbiwgYWNjLCBsaXN0KTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncmVkdWNlOiBsaXN0IG11c3QgYmUgYXJyYXkgb3IgaXRlcmFibGUnKTtcbiAgfTtcbn0oKSk7XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xudmFyIF9yZWR1Y2UgPSByZXF1aXJlKCcuL2ludGVybmFsL19yZWR1Y2UnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBzaW5nbGUgaXRlbSBieSBpdGVyYXRpbmcgdGhyb3VnaCB0aGUgbGlzdCwgc3VjY2Vzc2l2ZWx5IGNhbGxpbmdcbiAqIHRoZSBpdGVyYXRvciBmdW5jdGlvbiBhbmQgcGFzc2luZyBpdCBhbiBhY2N1bXVsYXRvciB2YWx1ZSBhbmQgdGhlIGN1cnJlbnRcbiAqIHZhbHVlIGZyb20gdGhlIGFycmF5LCBhbmQgdGhlbiBwYXNzaW5nIHRoZSByZXN1bHQgdG8gdGhlIG5leHQgY2FsbC5cbiAqXG4gKiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gcmVjZWl2ZXMgdHdvIHZhbHVlczogKihhY2MsIHZhbHVlKSouIEl0IG1heSB1c2VcbiAqIGBSLnJlZHVjZWRgIHRvIHNob3J0Y3V0IHRoZSBpdGVyYXRpb24uXG4gKlxuICogTm90ZTogYFIucmVkdWNlYCBkb2VzIG5vdCBza2lwIGRlbGV0ZWQgb3IgdW5hc3NpZ25lZCBpbmRpY2VzIChzcGFyc2VcbiAqIGFycmF5cyksIHVubGlrZSB0aGUgbmF0aXZlIGBBcnJheS5wcm90b3R5cGUucmVkdWNlYCBtZXRob2QuIEZvciBtb3JlIGRldGFpbHNcbiAqIG9uIHRoaXMgYmVoYXZpb3IsIHNlZTpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3JlZHVjZSNEZXNjcmlwdGlvblxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGByZWR1Y2VgIG1ldGhvZCBvZiB0aGUgdGhpcmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoKGEsIGIpIC0+IGEpIC0+IGEgLT4gW2JdIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBpdGVyYXRvciBmdW5jdGlvbi4gUmVjZWl2ZXMgdHdvIHZhbHVlcywgdGhlIGFjY3VtdWxhdG9yIGFuZCB0aGVcbiAqICAgICAgICBjdXJyZW50IGVsZW1lbnQgZnJvbSB0aGUgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFjYyBUaGUgYWNjdW11bGF0b3IgdmFsdWUuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4geyp9IFRoZSBmaW5hbCwgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKiBAc2VlIFIucmVkdWNlZCwgUi5hZGRJbmRleFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBudW1iZXJzID0gWzEsIDIsIDNdO1xuICogICAgICB2YXIgcGx1cyA9IChhLCBiKSA9PiBhICsgYjtcbiAqXG4gKiAgICAgIFIucmVkdWNlKHBsdXMsIDEwLCBudW1iZXJzKTsgLy89PiAxNlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoX3JlZHVjZSk7XG4iLCJ2YXIgX2NoZWNrRm9yTWV0aG9kID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY2hlY2tGb3JNZXRob2QnKTtcbnZhciBzbGljZSA9IHJlcXVpcmUoJy4vc2xpY2UnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYWxsIGJ1dCB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcgKG9yIG9iamVjdFxuICogd2l0aCBhIGB0YWlsYCBtZXRob2QpLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBzbGljZWAgbWV0aG9kIG9mIHRoZSBmaXJzdCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFthXSAtPiBbYV1cbiAqIEBzaWcgU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHsqfSBsaXN0XG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLmhlYWQsIFIuaW5pdCwgUi5sYXN0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50YWlsKFsxLCAyLCAzXSk7ICAvLz0+IFsyLCAzXVxuICogICAgICBSLnRhaWwoWzEsIDJdKTsgICAgIC8vPT4gWzJdXG4gKiAgICAgIFIudGFpbChbMV0pOyAgICAgICAgLy89PiBbXVxuICogICAgICBSLnRhaWwoW10pOyAgICAgICAgIC8vPT4gW11cbiAqXG4gKiAgICAgIFIudGFpbCgnYWJjJyk7ICAvLz0+ICdiYydcbiAqICAgICAgUi50YWlsKCdhYicpOyAgIC8vPT4gJ2InXG4gKiAgICAgIFIudGFpbCgnYScpOyAgICAvLz0+ICcnXG4gKiAgICAgIFIudGFpbCgnJyk7ICAgICAvLz0+ICcnXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2NoZWNrRm9yTWV0aG9kKCd0YWlsJywgc2xpY2UoMSwgSW5maW5pdHkpKTtcbiIsInZhciBfYXJpdHkgPSByZXF1aXJlKCcuL2ludGVybmFsL19hcml0eScpO1xudmFyIF9waXBlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fcGlwZScpO1xudmFyIHJlZHVjZSA9IHJlcXVpcmUoJy4vcmVkdWNlJyk7XG52YXIgdGFpbCA9IHJlcXVpcmUoJy4vdGFpbCcpO1xuXG5cbi8qKlxuICogUGVyZm9ybXMgbGVmdC10by1yaWdodCBmdW5jdGlvbiBjb21wb3NpdGlvbi4gVGhlIGxlZnRtb3N0IGZ1bmN0aW9uIG1heSBoYXZlXG4gKiBhbnkgYXJpdHk7IHRoZSByZW1haW5pbmcgZnVuY3Rpb25zIG11c3QgYmUgdW5hcnkuXG4gKlxuICogSW4gc29tZSBsaWJyYXJpZXMgdGhpcyBmdW5jdGlvbiBpcyBuYW1lZCBgc2VxdWVuY2VgLlxuICpcbiAqICoqTm90ZToqKiBUaGUgcmVzdWx0IG9mIHBpcGUgaXMgbm90IGF1dG9tYXRpY2FsbHkgY3VycmllZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKChhLCBiLCAuLi4sIG4pIC0+IG8pLCAobyAtPiBwKSwgLi4uLCAoeCAtPiB5KSwgKHkgLT4geikpIC0+ICgoYSwgYiwgLi4uLCBuKSAtPiB6KVxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3Rpb25zXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5jb21wb3NlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGYgPSBSLnBpcGUoTWF0aC5wb3csIFIubmVnYXRlLCBSLmluYyk7XG4gKlxuICogICAgICBmKDMsIDQpOyAvLyAtKDNeNCkgKyAxXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGlwZSgpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3BpcGUgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIGFyZ3VtZW50Jyk7XG4gIH1cbiAgcmV0dXJuIF9hcml0eShhcmd1bWVudHNbMF0ubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHJlZHVjZShfcGlwZSwgYXJndW1lbnRzWzBdLCB0YWlsKGFyZ3VtZW50cykpKTtcbn07XG4iLCIvKipcbiAqIFByaXZhdGUgYGNvbmNhdGAgZnVuY3Rpb24gdG8gbWVyZ2UgdHdvIGFycmF5LWxpa2Ugb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxBcmd1bWVudHN9IFtzZXQxPVtdXSBBbiBhcnJheS1saWtlIG9iamVjdC5cbiAqIEBwYXJhbSB7QXJyYXl8QXJndW1lbnRzfSBbc2V0Mj1bXV0gQW4gYXJyYXktbGlrZSBvYmplY3QuXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcsIG1lcmdlZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBfY29uY2F0KFs0LCA1LCA2XSwgWzEsIDIsIDNdKTsgLy89PiBbNCwgNSwgNiwgMSwgMiwgM11cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY29uY2F0KHNldDEsIHNldDIpIHtcbiAgc2V0MSA9IHNldDEgfHwgW107XG4gIHNldDIgPSBzZXQyIHx8IFtdO1xuICB2YXIgaWR4O1xuICB2YXIgbGVuMSA9IHNldDEubGVuZ3RoO1xuICB2YXIgbGVuMiA9IHNldDIubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gW107XG5cbiAgaWR4ID0gMDtcbiAgd2hpbGUgKGlkeCA8IGxlbjEpIHtcbiAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBzZXQxW2lkeF07XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgaWR4ID0gMDtcbiAgd2hpbGUgKGlkeCA8IGxlbjIpIHtcbiAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBzZXQyW2lkeF07XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJ2YXIgX2NvbmNhdCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbmNhdCcpO1xudmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCB3aXRoIHRoZSBnaXZlbiBlbGVtZW50IGF0IHRoZSBmcm9udCwgZm9sbG93ZWQgYnkgdGhlXG4gKiBjb250ZW50cyBvZiB0aGUgbGlzdC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIGEgLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHsqfSBlbCBUaGUgaXRlbSB0byBhZGQgdG8gdGhlIGhlYWQgb2YgdGhlIG91dHB1dCBsaXN0LlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gYWRkIHRvIHRoZSB0YWlsIG9mIHRoZSBvdXRwdXQgbGlzdC5cbiAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBhcnJheS5cbiAqIEBzZWUgUi5hcHBlbmRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnByZXBlbmQoJ2ZlZScsIFsnZmknLCAnZm8nLCAnZnVtJ10pOyAvLz0+IFsnZmVlJywgJ2ZpJywgJ2ZvJywgJ2Z1bSddXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBwcmVwZW5kKGVsLCBsaXN0KSB7XG4gIHJldHVybiBfY29uY2F0KFtlbF0sIGxpc3QpO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2hlbiBzdXBwbGllZCBhbiBvYmplY3QgcmV0dXJucyB0aGUgaW5kaWNhdGVkXG4gKiBwcm9wZXJ0eSBvZiB0aGF0IG9iamVjdCwgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyBzIC0+IHtzOiBhfSAtPiBhIHwgVW5kZWZpbmVkXG4gKiBAcGFyYW0ge1N0cmluZ30gcCBUaGUgcHJvcGVydHkgbmFtZVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHF1ZXJ5XG4gKiBAcmV0dXJuIHsqfSBUaGUgdmFsdWUgYXQgYG9iai5wYC5cbiAqIEBzZWUgUi5wYXRoXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5wcm9wKCd4Jywge3g6IDEwMH0pOyAvLz0+IDEwMFxuICogICAgICBSLnByb3AoJ3gnLCB7fSk7IC8vPT4gdW5kZWZpbmVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBwcm9wKHAsIG9iaikgeyByZXR1cm4gb2JqW3BdOyB9KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2lzVHJhbnNmb3JtZXIob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqWydAQHRyYW5zZHVjZXIvc3RlcCddID09PSAnZnVuY3Rpb24nO1xufTtcbiIsInZhciBfaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzQXJyYXknKTtcbnZhciBfaXNUcmFuc2Zvcm1lciA9IHJlcXVpcmUoJy4vX2lzVHJhbnNmb3JtZXInKTtcbnZhciBfc2xpY2UgPSByZXF1aXJlKCcuL19zbGljZScpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgZGlzcGF0Y2hlcyB3aXRoIGRpZmZlcmVudCBzdHJhdGVnaWVzIGJhc2VkIG9uIHRoZVxuICogb2JqZWN0IGluIGxpc3QgcG9zaXRpb24gKGxhc3QgYXJndW1lbnQpLiBJZiBpdCBpcyBhbiBhcnJheSwgZXhlY3V0ZXMgW2ZuXS5cbiAqIE90aGVyd2lzZSwgaWYgaXQgaGFzIGEgZnVuY3Rpb24gd2l0aCBbbWV0aG9kbmFtZV0sIGl0IHdpbGwgZXhlY3V0ZSB0aGF0XG4gKiBmdW5jdGlvbiAoZnVuY3RvciBjYXNlKS4gT3RoZXJ3aXNlLCBpZiBpdCBpcyBhIHRyYW5zZm9ybWVyLCB1c2VzIHRyYW5zZHVjZXJcbiAqIFt4Zl0gdG8gcmV0dXJuIGEgbmV3IHRyYW5zZm9ybWVyICh0cmFuc2R1Y2VyIGNhc2UpLiBPdGhlcndpc2UsIGl0IHdpbGxcbiAqIGRlZmF1bHQgdG8gZXhlY3V0aW5nIFtmbl0uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RuYW1lIHByb3BlcnR5IHRvIGNoZWNrIGZvciBhIGN1c3RvbSBpbXBsZW1lbnRhdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0geGYgdHJhbnNkdWNlciB0byBpbml0aWFsaXplIGlmIG9iamVjdCBpcyB0cmFuc2Zvcm1lclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gZGVmYXVsdCByYW1kYSBpbXBsZW1lbnRhdGlvblxuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCBkaXNwYXRjaGVzIG9uIG9iamVjdCBpbiBsaXN0IHBvc2l0aW9uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2Rpc3BhdGNoYWJsZShtZXRob2RuYW1lLCB4ZiwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmIChsZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmbigpO1xuICAgIH1cbiAgICB2YXIgb2JqID0gYXJndW1lbnRzW2xlbmd0aCAtIDFdO1xuICAgIGlmICghX2lzQXJyYXkob2JqKSkge1xuICAgICAgdmFyIGFyZ3MgPSBfc2xpY2UoYXJndW1lbnRzLCAwLCBsZW5ndGggLSAxKTtcbiAgICAgIGlmICh0eXBlb2Ygb2JqW21ldGhvZG5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBvYmpbbWV0aG9kbmFtZV0uYXBwbHkob2JqLCBhcmdzKTtcbiAgICAgIH1cbiAgICAgIGlmIChfaXNUcmFuc2Zvcm1lcihvYmopKSB7XG4gICAgICAgIHZhciB0cmFuc2R1Y2VyID0geGYuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgIHJldHVybiB0cmFuc2R1Y2VyKG9iaik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX21hcChmbiwgZnVuY3Rvcikge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGZ1bmN0b3IubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gQXJyYXkobGVuKTtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIHJlc3VsdFtpZHhdID0gZm4oZnVuY3RvcltpZHhdKTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL2luaXQnXSgpO1xuICB9LFxuICByZXN1bHQ6IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgfVxufTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9fY3VycnkyJyk7XG52YXIgX3hmQmFzZSA9IHJlcXVpcmUoJy4vX3hmQmFzZScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBYTWFwKGYsIHhmKSB7XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMuZiA9IGY7XG4gIH1cbiAgWE1hcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhNYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBfeGZCYXNlLnJlc3VsdDtcbiAgWE1hcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB0aGlzLmYoaW5wdXQpKTtcbiAgfTtcblxuICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeG1hcChmLCB4ZikgeyByZXR1cm4gbmV3IFhNYXAoZiwgeGYpOyB9KTtcbn0oKSk7XG4iLCJ2YXIgX2FyaXR5ID0gcmVxdWlyZSgnLi9fYXJpdHknKTtcbnZhciBfaXNQbGFjZWhvbGRlciA9IHJlcXVpcmUoJy4vX2lzUGxhY2Vob2xkZXInKTtcblxuXG4vKipcbiAqIEludGVybmFsIGN1cnJ5TiBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIFRoZSBhcml0eSBvZiB0aGUgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IHJlY2VpdmVkIEFuIGFycmF5IG9mIGFyZ3VtZW50cyByZWNlaXZlZCB0aHVzIGZhci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY3VycnlOKGxlbmd0aCwgcmVjZWl2ZWQsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29tYmluZWQgPSBbXTtcbiAgICB2YXIgYXJnc0lkeCA9IDA7XG4gICAgdmFyIGxlZnQgPSBsZW5ndGg7XG4gICAgdmFyIGNvbWJpbmVkSWR4ID0gMDtcbiAgICB3aGlsZSAoY29tYmluZWRJZHggPCByZWNlaXZlZC5sZW5ndGggfHwgYXJnc0lkeCA8IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHZhciByZXN1bHQ7XG4gICAgICBpZiAoY29tYmluZWRJZHggPCByZWNlaXZlZC5sZW5ndGggJiZcbiAgICAgICAgICAoIV9pc1BsYWNlaG9sZGVyKHJlY2VpdmVkW2NvbWJpbmVkSWR4XSkgfHxcbiAgICAgICAgICAgYXJnc0lkeCA+PSBhcmd1bWVudHMubGVuZ3RoKSkge1xuICAgICAgICByZXN1bHQgPSByZWNlaXZlZFtjb21iaW5lZElkeF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBhcmd1bWVudHNbYXJnc0lkeF07XG4gICAgICAgIGFyZ3NJZHggKz0gMTtcbiAgICAgIH1cbiAgICAgIGNvbWJpbmVkW2NvbWJpbmVkSWR4XSA9IHJlc3VsdDtcbiAgICAgIGlmICghX2lzUGxhY2Vob2xkZXIocmVzdWx0KSkge1xuICAgICAgICBsZWZ0IC09IDE7XG4gICAgICB9XG4gICAgICBjb21iaW5lZElkeCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gbGVmdCA8PSAwID8gZm4uYXBwbHkodGhpcywgY29tYmluZWQpXG4gICAgICAgICAgICAgICAgICAgICA6IF9hcml0eShsZWZ0LCBfY3VycnlOKGxlbmd0aCwgY29tYmluZWQsIGZuKSk7XG4gIH07XG59O1xuIiwidmFyIF9hcml0eSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2FyaXR5Jyk7XG52YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfY3VycnlOID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnlOJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCBlcXVpdmFsZW50IG9mIHRoZSBwcm92aWRlZCBmdW5jdGlvbiwgd2l0aCB0aGUgc3BlY2lmaWVkXG4gKiBhcml0eS4gVGhlIGN1cnJpZWQgZnVuY3Rpb24gaGFzIHR3byB1bnVzdWFsIGNhcGFiaWxpdGllcy4gRmlyc3QsIGl0c1xuICogYXJndW1lbnRzIG5lZWRuJ3QgYmUgcHJvdmlkZWQgb25lIGF0IGEgdGltZS4gSWYgYGdgIGlzIGBSLmN1cnJ5TigzLCBmKWAsIHRoZVxuICogZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxKSgyKSgzKWBcbiAqICAgLSBgZygxKSgyLCAzKWBcbiAqICAgLSBgZygxLCAyKSgzKWBcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqXG4gKiBTZWNvbmRseSwgdGhlIHNwZWNpYWwgcGxhY2Vob2xkZXIgdmFsdWUgYFIuX19gIG1heSBiZSB1c2VkIHRvIHNwZWNpZnlcbiAqIFwiZ2Fwc1wiLCBhbGxvd2luZyBwYXJ0aWFsIGFwcGxpY2F0aW9uIG9mIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMsXG4gKiByZWdhcmRsZXNzIG9mIHRoZWlyIHBvc2l0aW9ucy4gSWYgYGdgIGlzIGFzIGFib3ZlIGFuZCBgX2AgaXMgYFIuX19gLCB0aGVcbiAqIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKiAgIC0gYGcoXywgMiwgMykoMSlgXG4gKiAgIC0gYGcoXywgXywgMykoMSkoMilgXG4gKiAgIC0gYGcoXywgXywgMykoMSwgMilgXG4gKiAgIC0gYGcoXywgMikoMSkoMylgXG4gKiAgIC0gYGcoXywgMikoMSwgMylgXG4gKiAgIC0gYGcoXywgMikoXywgMykoMSlgXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgTnVtYmVyIC0+ICgqIC0+IGEpIC0+ICgqIC0+IGEpXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIFRoZSBhcml0eSBmb3IgdGhlIHJldHVybmVkIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3LCBjdXJyaWVkIGZ1bmN0aW9uLlxuICogQHNlZSBSLmN1cnJ5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHN1bUFyZ3MgPSAoLi4uYXJncykgPT4gUi5zdW0oYXJncyk7XG4gKlxuICogICAgICB2YXIgY3VycmllZEFkZEZvdXJOdW1iZXJzID0gUi5jdXJyeU4oNCwgc3VtQXJncyk7XG4gKiAgICAgIHZhciBmID0gY3VycmllZEFkZEZvdXJOdW1iZXJzKDEsIDIpO1xuICogICAgICB2YXIgZyA9IGYoMyk7XG4gKiAgICAgIGcoNCk7IC8vPT4gMTBcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIGN1cnJ5TihsZW5ndGgsIGZuKSB7XG4gIGlmIChsZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gX2N1cnJ5MShmbik7XG4gIH1cbiAgcmV0dXJuIF9hcml0eShsZW5ndGgsIF9jdXJyeU4obGVuZ3RoLCBbXSwgZm4pKTtcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfaGFzKHByb3AsIG9iaikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59O1xuIiwidmFyIF9oYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJndW1lbnRzKSA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXScgP1xuICAgIGZ1bmN0aW9uIF9pc0FyZ3VtZW50cyh4KSB7IHJldHVybiB0b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcmd1bWVudHNdJzsgfSA6XG4gICAgZnVuY3Rpb24gX2lzQXJndW1lbnRzKHgpIHsgcmV0dXJuIF9oYXMoJ2NhbGxlZScsIHgpOyB9O1xufSgpKTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgX2hhcyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2hhcycpO1xudmFyIF9pc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2lzQXJndW1lbnRzJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBjb250YWluaW5nIHRoZSBuYW1lcyBvZiBhbGwgdGhlIGVudW1lcmFibGUgb3duIHByb3BlcnRpZXMgb2ZcbiAqIHRoZSBzdXBwbGllZCBvYmplY3QuXG4gKiBOb3RlIHRoYXQgdGhlIG9yZGVyIG9mIHRoZSBvdXRwdXQgYXJyYXkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgY29uc2lzdGVudFxuICogYWNyb3NzIGRpZmZlcmVudCBKUyBwbGF0Zm9ybXMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHtrOiB2fSAtPiBba11cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBleHRyYWN0IHByb3BlcnRpZXMgZnJvbVxuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIHRoZSBvYmplY3QncyBvd24gcHJvcGVydGllcy5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmtleXMoe2E6IDEsIGI6IDIsIGM6IDN9KTsgLy89PiBbJ2EnLCAnYicsICdjJ11cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIC8vIGNvdmVyIElFIDwgOSBrZXlzIGlzc3Vlc1xuICB2YXIgaGFzRW51bUJ1ZyA9ICEoe3RvU3RyaW5nOiBudWxsfSkucHJvcGVydHlJc0VudW1lcmFibGUoJ3RvU3RyaW5nJyk7XG4gIHZhciBub25FbnVtZXJhYmxlUHJvcHMgPSBbJ2NvbnN0cnVjdG9yJywgJ3ZhbHVlT2YnLCAnaXNQcm90b3R5cGVPZicsICd0b1N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJ2hhc093blByb3BlcnR5JywgJ3RvTG9jYWxlU3RyaW5nJ107XG4gIC8vIFNhZmFyaSBidWdcbiAgdmFyIGhhc0FyZ3NFbnVtQnVnID0gKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICByZXR1cm4gYXJndW1lbnRzLnByb3BlcnR5SXNFbnVtZXJhYmxlKCdsZW5ndGgnKTtcbiAgfSgpKTtcblxuICB2YXIgY29udGFpbnMgPSBmdW5jdGlvbiBjb250YWlucyhsaXN0LCBpdGVtKSB7XG4gICAgdmFyIGlkeCA9IDA7XG4gICAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgICBpZiAobGlzdFtpZHhdID09PSBpdGVtKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWR4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4gdHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nICYmICFoYXNBcmdzRW51bUJ1ZyA/XG4gICAgX2N1cnJ5MShmdW5jdGlvbiBrZXlzKG9iaikge1xuICAgICAgcmV0dXJuIE9iamVjdChvYmopICE9PSBvYmogPyBbXSA6IE9iamVjdC5rZXlzKG9iaik7XG4gICAgfSkgOlxuICAgIF9jdXJyeTEoZnVuY3Rpb24ga2V5cyhvYmopIHtcbiAgICAgIGlmIChPYmplY3Qob2JqKSAhPT0gb2JqKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wLCBuSWR4O1xuICAgICAgdmFyIGtzID0gW107XG4gICAgICB2YXIgY2hlY2tBcmdzTGVuZ3RoID0gaGFzQXJnc0VudW1CdWcgJiYgX2lzQXJndW1lbnRzKG9iaik7XG4gICAgICBmb3IgKHByb3AgaW4gb2JqKSB7XG4gICAgICAgIGlmIChfaGFzKHByb3AsIG9iaikgJiYgKCFjaGVja0FyZ3NMZW5ndGggfHwgcHJvcCAhPT0gJ2xlbmd0aCcpKSB7XG4gICAgICAgICAga3Nba3MubGVuZ3RoXSA9IHByb3A7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChoYXNFbnVtQnVnKSB7XG4gICAgICAgIG5JZHggPSBub25FbnVtZXJhYmxlUHJvcHMubGVuZ3RoIC0gMTtcbiAgICAgICAgd2hpbGUgKG5JZHggPj0gMCkge1xuICAgICAgICAgIHByb3AgPSBub25FbnVtZXJhYmxlUHJvcHNbbklkeF07XG4gICAgICAgICAgaWYgKF9oYXMocHJvcCwgb2JqKSAmJiAhY29udGFpbnMoa3MsIHByb3ApKSB7XG4gICAgICAgICAgICBrc1trcy5sZW5ndGhdID0gcHJvcDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbklkeCAtPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4ga3M7XG4gICAgfSk7XG59KCkpO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfZGlzcGF0Y2hhYmxlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG52YXIgX21hcCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX21hcCcpO1xudmFyIF9yZWR1Y2UgPSByZXF1aXJlKCcuL2ludGVybmFsL19yZWR1Y2UnKTtcbnZhciBfeG1hcCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3htYXAnKTtcbnZhciBjdXJyeU4gPSByZXF1aXJlKCcuL2N1cnJ5TicpO1xudmFyIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuXG4vKipcbiAqIFRha2VzIGEgZnVuY3Rpb24gYW5kXG4gKiBhIFtmdW5jdG9yXShodHRwczovL2dpdGh1Yi5jb20vZmFudGFzeWxhbmQvZmFudGFzeS1sYW5kI2Z1bmN0b3IpLFxuICogYXBwbGllcyB0aGUgZnVuY3Rpb24gdG8gZWFjaCBvZiB0aGUgZnVuY3RvcidzIHZhbHVlcywgYW5kIHJldHVybnNcbiAqIGEgZnVuY3RvciBvZiB0aGUgc2FtZSBzaGFwZS5cbiAqXG4gKiBSYW1kYSBwcm92aWRlcyBzdWl0YWJsZSBgbWFwYCBpbXBsZW1lbnRhdGlvbnMgZm9yIGBBcnJheWAgYW5kIGBPYmplY3RgLFxuICogc28gdGhpcyBmdW5jdGlvbiBtYXkgYmUgYXBwbGllZCB0byBgWzEsIDIsIDNdYCBvciBge3g6IDEsIHk6IDIsIHo6IDN9YC5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgbWFwYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQWxzbyB0cmVhdHMgZnVuY3Rpb25zIGFzIGZ1bmN0b3JzIGFuZCB3aWxsIGNvbXBvc2UgdGhlbSB0b2dldGhlci5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIEZ1bmN0b3IgZiA9PiAoYSAtPiBiKSAtPiBmIGEgLT4gZiBiXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGV2ZXJ5IGVsZW1lbnQgb2YgdGhlIGlucHV0IGBsaXN0YC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gYmUgaXRlcmF0ZWQgb3Zlci5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgbmV3IGxpc3QuXG4gKiBAc2VlIFIudHJhbnNkdWNlLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGRvdWJsZSA9IHggPT4geCAqIDI7XG4gKlxuICogICAgICBSLm1hcChkb3VibGUsIFsxLCAyLCAzXSk7IC8vPT4gWzIsIDQsIDZdXG4gKlxuICogICAgICBSLm1hcChkb3VibGUsIHt4OiAxLCB5OiAyLCB6OiAzfSk7IC8vPT4ge3g6IDIsIHk6IDQsIHo6IDZ9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKCdtYXAnLCBfeG1hcCwgZnVuY3Rpb24gbWFwKGZuLCBmdW5jdG9yKSB7XG4gIHN3aXRjaCAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZ1bmN0b3IpKSB7XG4gICAgY2FzZSAnW29iamVjdCBGdW5jdGlvbl0nOlxuICAgICAgcmV0dXJuIGN1cnJ5TihmdW5jdG9yLmxlbmd0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGZ1bmN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgICB9KTtcbiAgICBjYXNlICdbb2JqZWN0IE9iamVjdF0nOlxuICAgICAgcmV0dXJuIF9yZWR1Y2UoZnVuY3Rpb24oYWNjLCBrZXkpIHtcbiAgICAgICAgYWNjW2tleV0gPSBmbihmdW5jdG9yW2tleV0pO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30sIGtleXMoZnVuY3RvcikpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gX21hcChmbiwgZnVuY3Rvcik7XG4gIH1cbn0pKTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgbWFwID0gcmVxdWlyZSgnLi9tYXAnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBsZW5zIGZvciB0aGUgZ2l2ZW4gZ2V0dGVyIGFuZCBzZXR0ZXIgZnVuY3Rpb25zLiBUaGUgZ2V0dGVyIFwiZ2V0c1wiXG4gKiB0aGUgdmFsdWUgb2YgdGhlIGZvY3VzOyB0aGUgc2V0dGVyIFwic2V0c1wiIHRoZSB2YWx1ZSBvZiB0aGUgZm9jdXMuIFRoZSBzZXR0ZXJcbiAqIHNob3VsZCBub3QgbXV0YXRlIHRoZSBkYXRhIHN0cnVjdHVyZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC44LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEB0eXBlZGVmbiBMZW5zIHMgYSA9IEZ1bmN0b3IgZiA9PiAoYSAtPiBmIGEpIC0+IHMgLT4gZiBzXG4gKiBAc2lnIChzIC0+IGEpIC0+ICgoYSwgcykgLT4gcykgLT4gTGVucyBzIGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGdldHRlclxuICogQHBhcmFtIHtGdW5jdGlvbn0gc2V0dGVyXG4gKiBAcmV0dXJuIHtMZW5zfVxuICogQHNlZSBSLnZpZXcsIFIuc2V0LCBSLm92ZXIsIFIubGVuc0luZGV4LCBSLmxlbnNQcm9wXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHhMZW5zID0gUi5sZW5zKFIucHJvcCgneCcpLCBSLmFzc29jKCd4JykpO1xuICpcbiAqICAgICAgUi52aWV3KHhMZW5zLCB7eDogMSwgeTogMn0pOyAgICAgICAgICAgIC8vPT4gMVxuICogICAgICBSLnNldCh4TGVucywgNCwge3g6IDEsIHk6IDJ9KTsgICAgICAgICAgLy89PiB7eDogNCwgeTogMn1cbiAqICAgICAgUi5vdmVyKHhMZW5zLCBSLm5lZ2F0ZSwge3g6IDEsIHk6IDJ9KTsgIC8vPT4ge3g6IC0xLCB5OiAyfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gbGVucyhnZXR0ZXIsIHNldHRlcikge1xuICByZXR1cm4gZnVuY3Rpb24odG9GdW5jdG9yRm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICByZXR1cm4gbWFwKFxuICAgICAgICBmdW5jdGlvbihmb2N1cykge1xuICAgICAgICAgIHJldHVybiBzZXR0ZXIoZm9jdXMsIHRhcmdldCk7XG4gICAgICAgIH0sXG4gICAgICAgIHRvRnVuY3RvckZuKGdldHRlcih0YXJnZXQpKVxuICAgICAgKTtcbiAgICB9O1xuICB9O1xufSk7XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIGN1cnJ5TiA9IHJlcXVpcmUoJy4vY3VycnlOJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCBlcXVpdmFsZW50IG9mIHRoZSBwcm92aWRlZCBmdW5jdGlvbi4gVGhlIGN1cnJpZWQgZnVuY3Rpb25cbiAqIGhhcyB0d28gdW51c3VhbCBjYXBhYmlsaXRpZXMuIEZpcnN0LCBpdHMgYXJndW1lbnRzIG5lZWRuJ3QgYmUgcHJvdmlkZWQgb25lXG4gKiBhdCBhIHRpbWUuIElmIGBmYCBpcyBhIHRlcm5hcnkgZnVuY3Rpb24gYW5kIGBnYCBpcyBgUi5jdXJyeShmKWAsIHRoZVxuICogZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxKSgyKSgzKWBcbiAqICAgLSBgZygxKSgyLCAzKWBcbiAqICAgLSBgZygxLCAyKSgzKWBcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqXG4gKiBTZWNvbmRseSwgdGhlIHNwZWNpYWwgcGxhY2Vob2xkZXIgdmFsdWUgYFIuX19gIG1heSBiZSB1c2VkIHRvIHNwZWNpZnlcbiAqIFwiZ2Fwc1wiLCBhbGxvd2luZyBwYXJ0aWFsIGFwcGxpY2F0aW9uIG9mIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMsXG4gKiByZWdhcmRsZXNzIG9mIHRoZWlyIHBvc2l0aW9ucy4gSWYgYGdgIGlzIGFzIGFib3ZlIGFuZCBgX2AgaXMgYFIuX19gLCB0aGVcbiAqIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKiAgIC0gYGcoXywgMiwgMykoMSlgXG4gKiAgIC0gYGcoXywgXywgMykoMSkoMilgXG4gKiAgIC0gYGcoXywgXywgMykoMSwgMilgXG4gKiAgIC0gYGcoXywgMikoMSkoMylgXG4gKiAgIC0gYGcoXywgMikoMSwgMylgXG4gKiAgIC0gYGcoXywgMikoXywgMykoMSlgXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCogLT4gYSkgLT4gKCogLT4gYSlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldywgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBzZWUgUi5jdXJyeU5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgYWRkRm91ck51bWJlcnMgPSAoYSwgYiwgYywgZCkgPT4gYSArIGIgKyBjICsgZDtcbiAqXG4gKiAgICAgIHZhciBjdXJyaWVkQWRkRm91ck51bWJlcnMgPSBSLmN1cnJ5KGFkZEZvdXJOdW1iZXJzKTtcbiAqICAgICAgdmFyIGYgPSBjdXJyaWVkQWRkRm91ck51bWJlcnMoMSwgMik7XG4gKiAgICAgIHZhciBnID0gZigzKTtcbiAqICAgICAgZyg0KTsgLy89PiAxMFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gY3VycnkoZm4pIHtcbiAgcmV0dXJuIGN1cnJ5Tihmbi5sZW5ndGgsIGZuKTtcbn0pO1xuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTQgUXVpbGRyZWVuIE1vdHRhIDxxdWlsZHJlZW5AZ21haWwuY29tPlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4vLyBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlc1xuLy8gKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuLy8gaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbi8vIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4vLyBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbi8vIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG4vLyBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXG4vLyBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFXG4vLyBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OXG4vLyBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbi8vIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vKipcbiAqIEBtb2R1bGUgbGliL2VpdGhlclxuICovXG5tb2R1bGUuZXhwb3J0cyA9IEVpdGhlclxuXG4vLyAtLSBBbGlhc2VzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnZhciBjbG9uZSAgICAgICAgID0gT2JqZWN0LmNyZWF0ZVxudmFyIHVuaW1wbGVtZW50ZWQgPSBmdW5jdGlvbigpeyB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4nKSB9XG52YXIgbm9vcCAgICAgICAgICA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4vLyAtLSBJbXBsZW1lbnRhdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gKiBUaGUgYEVpdGhlcihhLCBiKWAgc3RydWN0dXJlIHJlcHJlc2VudHMgdGhlIGxvZ2ljYWwgZGlzanVuY3Rpb24gYmV0d2VlbiBgYWBcbiAqIGFuZCBgYmAuIEluIG90aGVyIHdvcmRzLCBgRWl0aGVyYCBtYXkgY29udGFpbiBlaXRoZXIgYSB2YWx1ZSBvZiB0eXBlIGBhYCBvclxuICogYSB2YWx1ZSBvZiB0eXBlIGBiYCwgYXQgYW55IGdpdmVuIHRpbWUuIFRoaXMgcGFydGljdWxhciBpbXBsZW1lbnRhdGlvbiBpc1xuICogYmlhc2VkIG9uIHRoZSByaWdodCB2YWx1ZSAoYGJgKSwgdGh1cyBwcm9qZWN0aW9ucyB3aWxsIHRha2UgdGhlIHJpZ2h0IHZhbHVlXG4gKiBvdmVyIHRoZSBsZWZ0IG9uZS5cbiAqXG4gKiBUaGlzIGNsYXNzIG1vZGVscyB0d28gZGlmZmVyZW50IGNhc2VzOiBgTGVmdCBhYCBhbmQgYFJpZ2h0IGJgLCBhbmQgY2FuIGhvbGRcbiAqIG9uZSBvZiB0aGUgY2FzZXMgYXQgYW55IGdpdmVuIHRpbWUuIFRoZSBwcm9qZWN0aW9ucyBhcmUsIG5vbmUgdGhlIGxlc3MsXG4gKiBiaWFzZWQgZm9yIHRoZSBgUmlnaHRgIGNhc2UsIHRodXMgYSBjb21tb24gdXNlIGNhc2UgZm9yIHRoaXMgc3RydWN0dXJlIGlzIHRvXG4gKiBob2xkIHRoZSByZXN1bHRzIG9mIGNvbXB1dGF0aW9ucyB0aGF0IG1heSBmYWlsLCB3aGVuIHlvdSB3YW50IHRvIHN0b3JlXG4gKiBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIG9uIHRoZSBmYWlsdXJlIChpbnN0ZWFkIG9mIHRocm93aW5nIGFuIGV4Y2VwdGlvbikuXG4gKlxuICogRnVydGhlcm1vcmUsIHRoZSB2YWx1ZXMgb2YgYEVpdGhlcihhLCBiKWAgY2FuIGJlIGNvbWJpbmVkIGFuZCBtYW5pcHVsYXRlZCBieVxuICogdXNpbmcgdGhlIGV4cHJlc3NpdmUgbW9uYWRpYyBvcGVyYXRpb25zLiBUaGlzIGFsbG93cyBzYWZlbHkgc2VxdWVuY2luZ1xuICogb3BlcmF0aW9ucyB0aGF0IG1heSBmYWlsLCBhbmQgc2FmZWx5IGNvbXBvc2luZyB2YWx1ZXMgdGhhdCB5b3UgZG9uJ3Qga25vd1xuICogd2hldGhlciB0aGV5J3JlIHByZXNlbnQgb3Igbm90LCBmYWlsaW5nIGVhcmx5IChyZXR1cm5pbmcgYSBgTGVmdCBhYCkgaWYgYW55XG4gKiBvZiB0aGUgb3BlcmF0aW9ucyBmYWlsLlxuICpcbiAqIFdoaWxlIHRoaXMgY2xhc3MgY2FuIGNlcnRhaW5seSBtb2RlbCBpbnB1dCB2YWxpZGF0aW9ucywgdGhlIFtWYWxpZGF0aW9uXVtdXG4gKiBzdHJ1Y3R1cmUgbGVuZHMgaXRzZWxmIGJldHRlciB0byB0aGF0IHVzZSBjYXNlLCBzaW5jZSBpdCBjYW4gbmF0dXJhbGx5XG4gKiBhZ2dyZWdhdGUgZmFpbHVyZXMg4oCUIG1vbmFkcyBzaG9ydGN1dCBvbiB0aGUgZmlyc3QgZmFpbHVyZS5cbiAqXG4gKiBbVmFsaWRhdGlvbl06IGh0dHBzOi8vZ2l0aHViLmNvbS9mb2xrdGFsZS9kYXRhLnZhbGlkYXRpb25cbiAqXG4gKlxuICogQGNsYXNzXG4gKiBAc3VtbWFyeVxuICogRWl0aGVyW86xLCDOsl0gPDogQXBwbGljYXRpdmVbzrJdXG4gKiAgICAgICAgICAgICAgICwgRnVuY3RvclvOsl1cbiAqICAgICAgICAgICAgICAgLCBDaGFpblvOsl1cbiAqICAgICAgICAgICAgICAgLCBTaG93XG4gKiAgICAgICAgICAgICAgICwgRXFcbiAqL1xuZnVuY3Rpb24gRWl0aGVyKCkgeyB9XG5cbkxlZnQucHJvdG90eXBlID0gY2xvbmUoRWl0aGVyLnByb3RvdHlwZSlcbmZ1bmN0aW9uIExlZnQoYSkge1xuICB0aGlzLnZhbHVlID0gYVxufVxuXG5SaWdodC5wcm90b3R5cGUgPSBjbG9uZShFaXRoZXIucHJvdG90eXBlKVxuZnVuY3Rpb24gUmlnaHQoYSkge1xuICB0aGlzLnZhbHVlID0gYVxufVxuXG4vLyAtLSBDb25zdHJ1Y3RvcnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IGBFaXRoZXJbzrEsIM6yXWAgc3RydWN0dXJlIGhvbGRpbmcgYSBgTGVmdGAgdmFsdWUuIFRoaXNcbiAqIHVzdWFsbHkgcmVwcmVzZW50cyBhIGZhaWx1cmUgZHVlIHRvIHRoZSByaWdodC1iaWFzIG9mIHRoaXMgc3RydWN0dXJlLlxuICpcbiAqIEBzdW1tYXJ5IGEg4oaSIEVpdGhlclvOsSwgzrJdXG4gKi9cbkVpdGhlci5MZWZ0ID0gZnVuY3Rpb24oYSkge1xuICByZXR1cm4gbmV3IExlZnQoYSlcbn1cbkVpdGhlci5wcm90b3R5cGUuTGVmdCA9IEVpdGhlci5MZWZ0XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBgRWl0aGVyW86xLCDOsl1gIHN0cnVjdHVyZSBob2xkaW5nIGEgYFJpZ2h0YCB2YWx1ZS4gVGhpc1xuICogdXN1YWxseSByZXByZXNlbnRzIGEgc3VjY2Vzc2Z1bCB2YWx1ZSBkdWUgdG8gdGhlIHJpZ2h0IGJpYXMgb2YgdGhpc1xuICogc3RydWN0dXJlLlxuICpcbiAqIEBzdW1tYXJ5IM6yIOKGkiBFaXRoZXJbzrEsIM6yXVxuICovXG5FaXRoZXIuUmlnaHQgPSBmdW5jdGlvbihhKSB7XG4gIHJldHVybiBuZXcgUmlnaHQoYSlcbn1cbkVpdGhlci5wcm90b3R5cGUuUmlnaHQgPSBFaXRoZXIuUmlnaHRcblxuXG4vLyAtLSBDb252ZXJzaW9ucyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IGBFaXRoZXJbzrEsIM6yXWAgc3RydWN0dXJlIGZyb20gYSBudWxsYWJsZSB0eXBlLlxuICpcbiAqIFRha2VzIHRoZSBgTGVmdGAgY2FzZSBpZiB0aGUgdmFsdWUgaXMgYG51bGxgIG9yIGB1bmRlZmluZWRgLiBUYWtlcyB0aGVcbiAqIGBSaWdodGAgY2FzZSBvdGhlcndpc2UuXG4gKlxuICogQHN1bW1hcnkgzrEg4oaSIEVpdGhlclvOsSwgzrFdXG4gKi9cbkVpdGhlci5mcm9tTnVsbGFibGUgPSBmdW5jdGlvbihhKSB7XG4gIHJldHVybiBhICE9IG51bGw/ICAgICAgIG5ldyBSaWdodChhKVxuICA6ICAgICAgLyogb3RoZXJ3aXNlICovICBuZXcgTGVmdChhKVxufVxuRWl0aGVyLnByb3RvdHlwZS5mcm9tTnVsbGFibGUgPSBFaXRoZXIuZnJvbU51bGxhYmxlXG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBgRWl0aGVyW86xLCDOsl1gIHN0cnVjdHVyZSBmcm9tIGEgYFZhbGlkYXRpb25bzrEsIM6yXWAgdHlwZS5cbiAqXG4gKiBAc3VtbWFyeSBWYWxpZGF0aW9uW86xLCDOsl0g4oaSIEVpdGhlclvOsSwgzrJdXG4gKi9cbkVpdGhlci5mcm9tVmFsaWRhdGlvbiA9IGZ1bmN0aW9uKGEpIHtcbiAgcmV0dXJuIGEuZm9sZChFaXRoZXIuTGVmdCwgRWl0aGVyLlJpZ2h0KVxufVxuXG4vKipcbiAqIEV4ZWN1dGVzIGEgc3luY2hyb25vdXMgY29tcHV0YXRpb24gdGhhdCBtYXkgdGhyb3cgYW5kIGNvbnZlcnRzIGl0IHRvIGFuXG4gKiBFaXRoZXIgdHlwZS5cbiAqXG4gKiBAc3VtbWFyeSAozrHigoEsIM6x4oKCLCAuLi4sIM6x4oKZIC0+IM6yIDo6IHRocm93cyDOsykgLT4gKM6x4oKBLCDOseKCgiwgLi4uLCDOseKCmSAtPiBFaXRoZXJbzrMsIM6yXSlcbiAqL1xuRWl0aGVyLnRyeSA9IGZ1bmN0aW9uKGYpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbmV3IFJpZ2h0KGYuYXBwbHkobnVsbCwgYXJndW1lbnRzKSlcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIHJldHVybiBuZXcgTGVmdChlKVxuICAgIH1cbiAgfVxufVxuXG5cbi8vIC0tIFByZWRpY2F0ZXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKipcbiAqIFRydWUgaWYgdGhlIGBFaXRoZXJbzrEsIM6yXWAgY29udGFpbnMgYSBgTGVmdGAgdmFsdWUuXG4gKlxuICogQHN1bW1hcnkgQm9vbGVhblxuICovXG5FaXRoZXIucHJvdG90eXBlLmlzTGVmdCA9IGZhbHNlXG5MZWZ0LnByb3RvdHlwZS5pc0xlZnQgICA9IHRydWVcblxuLyoqXG4gKiBUcnVlIGlmIHRoZSBgRWl0aGVyW86xLCDOsl1gIGNvbnRhaW5zIGEgYFJpZ2h0YCB2YWx1ZS5cbiAqXG4gKiBAc3VtbWFyeSBCb29sZWFuXG4gKi9cbkVpdGhlci5wcm90b3R5cGUuaXNSaWdodCA9IGZhbHNlXG5SaWdodC5wcm90b3R5cGUuaXNSaWdodCAgPSB0cnVlXG5cblxuLy8gLS0gQXBwbGljYXRpdmUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBgRWl0aGVyW86xLCDOsl1gIGluc3RhbmNlIGhvbGRpbmcgdGhlIGBSaWdodGAgdmFsdWUgYGJgLlxuICpcbiAqIGBiYCBjYW4gYmUgYW55IHZhbHVlLCBpbmNsdWRpbmcgYG51bGxgLCBgdW5kZWZpbmVkYCBvciBhbm90aGVyXG4gKiBgRWl0aGVyW86xLCDOsl1gIHN0cnVjdHVyZS5cbiAqXG4gKiBAc3VtbWFyeSDOsiDihpIgRWl0aGVyW86xLCDOsl1cbiAqL1xuRWl0aGVyLm9mID0gZnVuY3Rpb24oYSkge1xuICByZXR1cm4gbmV3IFJpZ2h0KGEpXG59XG5FaXRoZXIucHJvdG90eXBlLm9mID0gRWl0aGVyLm9mXG5cblxuLyoqXG4gKiBBcHBsaWVzIHRoZSBmdW5jdGlvbiBpbnNpZGUgdGhlIGBSaWdodGAgY2FzZSBvZiB0aGUgYEVpdGhlclvOsSwgzrJdYCBzdHJ1Y3R1cmVcbiAqIHRvIGFub3RoZXIgYXBwbGljYXRpdmUgdHlwZS5cbiAqXG4gKiBUaGUgYEVpdGhlclvOsSwgzrJdYCBzaG91bGQgY29udGFpbiBhIGZ1bmN0aW9uIHZhbHVlLCBvdGhlcndpc2UgYSBgVHlwZUVycm9yYFxuICogaXMgdGhyb3duLlxuICpcbiAqIEBtZXRob2RcbiAqIEBzdW1tYXJ5IChARWl0aGVyW86xLCDOsiDihpIgzrNdLCBmOkFwcGxpY2F0aXZlW19dKSA9PiBmW86yXSDihpIgZlvOs11cbiAqL1xuRWl0aGVyLnByb3RvdHlwZS5hcCA9IHVuaW1wbGVtZW50ZWRcblxuTGVmdC5wcm90b3R5cGUuYXAgPSBmdW5jdGlvbihiKSB7XG4gIHJldHVybiB0aGlzXG59XG5cblJpZ2h0LnByb3RvdHlwZS5hcCA9IGZ1bmN0aW9uKGIpIHtcbiAgcmV0dXJuIGIubWFwKHRoaXMudmFsdWUpXG59XG5cblxuLy8gLS0gRnVuY3RvciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgYFJpZ2h0YCB2YWx1ZSBvZiB0aGUgYEVpdGhlclvOsSwgzrJdYCBzdHJ1Y3R1cmUgdXNpbmcgYSByZWd1bGFyXG4gKiB1bmFyeSBmdW5jdGlvbi5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAc3VtbWFyeSAoQEVpdGhlclvOsSwgzrJdKSA9PiAozrIg4oaSIM6zKSDihpIgRWl0aGVyW86xLCDOs11cbiAqL1xuRWl0aGVyLnByb3RvdHlwZS5tYXAgPSB1bmltcGxlbWVudGVkXG5MZWZ0LnByb3RvdHlwZS5tYXAgICA9IG5vb3BcblxuUmlnaHQucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uKGYpIHtcbiAgcmV0dXJuIHRoaXMub2YoZih0aGlzLnZhbHVlKSlcbn1cblxuXG4vLyAtLSBDaGFpbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSBgUmlnaHRgIHZhbHVlIG9mIHRoZSBgRWl0aGVyW86xLCDOsl1gIHN0cnVjdHVyZSB1c2luZyBhbiB1bmFyeVxuICogZnVuY3Rpb24gdG8gbW9uYWRzLlxuICpcbiAqIEBtZXRob2RcbiAqIEBzdW1tYXJ5IChARWl0aGVyW86xLCDOsl0sIG06TW9uYWRbX10pID0+ICjOsiDihpIgbVvOs10pIOKGkiBtW86zXVxuICovXG5FaXRoZXIucHJvdG90eXBlLmNoYWluID0gdW5pbXBsZW1lbnRlZFxuTGVmdC5wcm90b3R5cGUuY2hhaW4gICA9IG5vb3BcblxuUmlnaHQucHJvdG90eXBlLmNoYWluID0gZnVuY3Rpb24oZikge1xuICByZXR1cm4gZih0aGlzLnZhbHVlKVxufVxuXG5cbi8vIC0tIFNob3cgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKipcbiAqIFJldHVybnMgYSB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBgRWl0aGVyW86xLCDOsl1gIHN0cnVjdHVyZS5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAc3VtbWFyeSAoQEVpdGhlclvOsSwgzrJdKSA9PiBWb2lkIOKGkiBTdHJpbmdcbiAqL1xuRWl0aGVyLnByb3RvdHlwZS50b1N0cmluZyA9IHVuaW1wbGVtZW50ZWRcblxuTGVmdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdFaXRoZXIuTGVmdCgnICsgdGhpcy52YWx1ZSArICcpJ1xufVxuXG5SaWdodC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdFaXRoZXIuUmlnaHQoJyArIHRoaXMudmFsdWUgKyAnKSdcbn1cblxuXG4vLyAtLSBFcSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gKiBUZXN0cyBpZiBhbiBgRWl0aGVyW86xLCDOsl1gIHN0cnVjdHVyZSBpcyBlcXVhbCB0byBhbm90aGVyIGBFaXRoZXJbzrEsIM6yXWBcbiAqIHN0cnVjdHVyZS5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAc3VtbWFyeSAoQEVpdGhlclvOsSwgzrJdKSA9PiBFaXRoZXJbzrEsIM6yXSDihpIgQm9vbGVhblxuICovXG5FaXRoZXIucHJvdG90eXBlLmlzRXF1YWwgPSB1bmltcGxlbWVudGVkXG5cbkxlZnQucHJvdG90eXBlLmlzRXF1YWwgPSBmdW5jdGlvbihhKSB7XG4gIHJldHVybiBhLmlzTGVmdCAmJiAoYS52YWx1ZSA9PT0gdGhpcy52YWx1ZSlcbn1cblxuUmlnaHQucHJvdG90eXBlLmlzRXF1YWwgPSBmdW5jdGlvbihhKSB7XG4gIHJldHVybiBhLmlzUmlnaHQgJiYgKGEudmFsdWUgPT09IHRoaXMudmFsdWUpXG59XG5cblxuLy8gLS0gRXh0cmFjdGluZyBhbmQgcmVjb3ZlcmluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qKlxuICogRXh0cmFjdHMgdGhlIGBSaWdodGAgdmFsdWUgb3V0IG9mIHRoZSBgRWl0aGVyW86xLCDOsl1gIHN0cnVjdHVyZSwgaWYgaXRcbiAqIGV4aXN0cy4gT3RoZXJ3aXNlIHRocm93cyBhIGBUeXBlRXJyb3JgLlxuICpcbiAqIEBtZXRob2RcbiAqIEBzdW1tYXJ5IChARWl0aGVyW86xLCDOsl0pID0+IFZvaWQg4oaSIM6yICAgICAgICAgOjogcGFydGlhbCwgdGhyb3dzXG4gKiBAc2VlIHtAbGluayBtb2R1bGU6bGliL2VpdGhlcn5FaXRoZXIjZ2V0T3JFbHNlfSDigJQgQSBnZXR0ZXIgdGhhdCBjYW4gaGFuZGxlIGZhaWx1cmVzLlxuICogQHNlZSB7QGxpbmsgbW9kdWxlOmxpYi9laXRoZXJ+RWl0aGVyI21lcmdlfSDigJQgVGhlIGNvbnZlcmdlbmNlIG9mIGJvdGggdmFsdWVzLlxuICogQHRocm93cyB7VHlwZUVycm9yfSBpZiB0aGUgc3RydWN0dXJlIGhhcyBubyBgUmlnaHRgIHZhbHVlLlxuICovXG5FaXRoZXIucHJvdG90eXBlLmdldCA9IHVuaW1wbGVtZW50ZWRcblxuTGVmdC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW4ndCBleHRyYWN0IHRoZSB2YWx1ZSBvZiBhIExlZnQoYSkuXCIpXG59XG5cblJpZ2h0LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudmFsdWVcbn1cblxuXG4vKipcbiAqIEV4dHJhY3RzIHRoZSBgUmlnaHRgIHZhbHVlIG91dCBvZiB0aGUgYEVpdGhlclvOsSwgzrJdYCBzdHJ1Y3R1cmUuIElmIHRoZVxuICogc3RydWN0dXJlIGRvZXNuJ3QgaGF2ZSBhIGBSaWdodGAgdmFsdWUsIHJldHVybnMgdGhlIGdpdmVuIGRlZmF1bHQuXG4gKlxuICogQG1ldGhvZFxuICogQHN1bW1hcnkgKEBFaXRoZXJbzrEsIM6yXSkgPT4gzrIg4oaSIM6yXG4gKi9cbkVpdGhlci5wcm90b3R5cGUuZ2V0T3JFbHNlID0gdW5pbXBsZW1lbnRlZFxuXG5MZWZ0LnByb3RvdHlwZS5nZXRPckVsc2UgPSBmdW5jdGlvbihhKSB7XG4gIHJldHVybiBhXG59XG5cblJpZ2h0LnByb3RvdHlwZS5nZXRPckVsc2UgPSBmdW5jdGlvbihfKSB7XG4gIHJldHVybiB0aGlzLnZhbHVlXG59XG5cblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgYExlZnRgIHZhbHVlIGludG8gYSBuZXcgYEVpdGhlclvOsSwgzrJdYCBzdHJ1Y3R1cmUuIERvZXMgbm90aGluZ1xuICogaWYgdGhlIHN0cnVjdHVyZSBjb250YWluIGEgYFJpZ2h0YCB2YWx1ZS5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAc3VtbWFyeSAoQEVpdGhlclvOsSwgzrJdKSA9PiAozrEg4oaSIEVpdGhlclvOsywgzrJdKSDihpIgRWl0aGVyW86zLCDOsl1cbiAqL1xuRWl0aGVyLnByb3RvdHlwZS5vckVsc2UgPSB1bmltcGxlbWVudGVkXG5SaWdodC5wcm90b3R5cGUub3JFbHNlICA9IG5vb3BcblxuTGVmdC5wcm90b3R5cGUub3JFbHNlID0gZnVuY3Rpb24oZikge1xuICByZXR1cm4gZih0aGlzLnZhbHVlKVxufVxuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWUgb2Ygd2hpY2hldmVyIHNpZGUgb2YgdGhlIGRpc2p1bmN0aW9uIHRoYXQgaXMgcHJlc2VudC5cbiAqXG4gKiBAc3VtbWFyeSAoQEVpdGhlclvOsSwgzrFdKSA9PiBWb2lkIOKGkiDOsVxuICovXG5FaXRoZXIucHJvdG90eXBlLm1lcmdlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnZhbHVlXG59XG5cblxuLy8gLS0gRm9sZHMgYW5kIEV4dGVuZGVkIFRyYW5zZm9ybWF0aW9ucyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qKlxuICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGVhY2ggY2FzZSBpbiB0aGlzIGRhdGEgc3RydWN0dXJlLlxuICpcbiAqIEBtZXRob2RcbiAqIEBzdW1tYXJ5IChARWl0aGVyW86xLCDOsl0pID0+ICjOsSDihpIgzrMpLCAozrIg4oaSIM6zKSDihpIgzrNcbiAqL1xuRWl0aGVyLnByb3RvdHlwZS5mb2xkID0gdW5pbXBsZW1lbnRlZFxuXG5MZWZ0LnByb3RvdHlwZS5mb2xkID0gZnVuY3Rpb24oZiwgXykge1xuICByZXR1cm4gZih0aGlzLnZhbHVlKVxufVxuXG5SaWdodC5wcm90b3R5cGUuZm9sZCA9IGZ1bmN0aW9uKF8sIGcpIHtcbiAgcmV0dXJuIGcodGhpcy52YWx1ZSlcbn1cblxuLyoqXG4gKiBDYXRhbW9ycGhpc20uXG4gKiBcbiAqIEBtZXRob2RcbiAqIEBzdW1tYXJ5IChARWl0aGVyW86xLCDOsl0pID0+IHsgTGVmdDogzrEg4oaSIM6zLCBSaWdodDogzrIg4oaSIM6zIH0g4oaSIM6zXG4gKi9cbkVpdGhlci5wcm90b3R5cGUuY2F0YSA9IHVuaW1wbGVtZW50ZWRcblxuTGVmdC5wcm90b3R5cGUuY2F0YSA9IGZ1bmN0aW9uKHBhdHRlcm4pIHtcbiAgcmV0dXJuIHBhdHRlcm4uTGVmdCh0aGlzLnZhbHVlKVxufVxuXG5SaWdodC5wcm90b3R5cGUuY2F0YSA9IGZ1bmN0aW9uKHBhdHRlcm4pIHtcbiAgcmV0dXJuIHBhdHRlcm4uUmlnaHQodGhpcy52YWx1ZSlcbn1cblxuXG4vKipcbiAqIFN3YXBzIHRoZSBkaXNqdW5jdGlvbiB2YWx1ZXMuXG4gKlxuICogQG1ldGhvZFxuICogQHN1bW1hcnkgKEBFaXRoZXJbzrEsIM6yXSkgPT4gVm9pZCDihpIgRWl0aGVyW86yLCDOsV1cbiAqL1xuRWl0aGVyLnByb3RvdHlwZS5zd2FwID0gdW5pbXBsZW1lbnRlZFxuXG5MZWZ0LnByb3RvdHlwZS5zd2FwID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLlJpZ2h0KHRoaXMudmFsdWUpXG59XG5cblJpZ2h0LnByb3RvdHlwZS5zd2FwID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLkxlZnQodGhpcy52YWx1ZSlcbn1cblxuXG4vKipcbiAqIE1hcHMgYm90aCBzaWRlcyBvZiB0aGUgZGlzanVuY3Rpb24uXG4gKlxuICogQG1ldGhvZFxuICogQHN1bW1hcnkgKEBFaXRoZXJbzrEsIM6yXSkgPT4gKM6xIOKGkiDOsyksICjOsiDihpIgzrQpIOKGkiBFaXRoZXJbzrMsIM60XVxuICovXG5FaXRoZXIucHJvdG90eXBlLmJpbWFwID0gdW5pbXBsZW1lbnRlZFxuXG5MZWZ0LnByb3RvdHlwZS5iaW1hcCA9IGZ1bmN0aW9uKGYsIF8pIHtcbiAgcmV0dXJuIHRoaXMuTGVmdChmKHRoaXMudmFsdWUpKVxufVxuXG5SaWdodC5wcm90b3R5cGUuYmltYXAgPSBmdW5jdGlvbihfLCBnKSB7XG4gIHJldHVybiB0aGlzLlJpZ2h0KGcodGhpcy52YWx1ZSkpXG59XG5cblxuLyoqXG4gKiBNYXBzIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIGRpc2p1bmN0aW9uLlxuICpcbiAqIEBtZXRob2RcbiAqIEBzdW1tYXJ5IChARWl0aGVyW86xLCDOsl0pID0+ICjOsSDihpIgzrMpIOKGkiBFaXRoZXJbzrMsIM6yXVxuICovXG5FaXRoZXIucHJvdG90eXBlLmxlZnRNYXAgPSB1bmltcGxlbWVudGVkXG5SaWdodC5wcm90b3R5cGUubGVmdE1hcCAgPSBub29wXG5cbkxlZnQucHJvdG90eXBlLmxlZnRNYXAgPSBmdW5jdGlvbihmKSB7XG4gIHJldHVybiB0aGlzLkxlZnQoZih0aGlzLnZhbHVlKSlcbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxMy0yMDE0IFF1aWxkcmVlbiBNb3R0YSA8cXVpbGRyZWVuQGdtYWlsLmNvbT5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuLy8gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXNcbi8vICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbi8vIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4vLyBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuLy8gYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4vLyBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuLy8gRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORFxuLy8gTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRVxuLy8gTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTlxuLy8gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXG4vLyBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2VpdGhlcicpIiwiLyogZXNsaW50LWRpc2FibGUgbmV3LWNhcCAqL1xuXG5pbXBvcnQgSW1tdXRhYmxlIGZyb20gXCJzZWFtbGVzcy1pbW11dGFibGVcIjtcbmltcG9ydCB7IGN1cnJ5LCBsZW5zLCBwcm9wLCBwcmVwZW5kLCBvdmVyLCBzZXQsIHBpcGUgfSBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCBFaXRoZXIgZnJvbSBcImRhdGEuZWl0aGVyXCI7XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVBdCA9IGN1cnJ5KChrZXlBcnJheSwgbmV3VmFsLCBvYmopID0+IHtcbiAgY29uc3QgZGVlcE5ld1ZhbCA9IGtleUFycmF5LnJlZHVjZVJpZ2h0KFxuICAgIChyZXN1bHQsIGtleSkgPT4gKHsgW2tleV06IHJlc3VsdCB9KVxuICAgICwgbmV3VmFsXG4gICk7XG5cbiAgcmV0dXJuIEltbXV0YWJsZShvYmopLm1lcmdlKGRlZXBOZXdWYWwsIHsgZGVlcDogdHJ1ZSB9KTtcbn0pO1xuXG4vLyBTdGF0ZSBsZW5zZXNcbmV4cG9ydCBjb25zdCBTdGF0ZUxlbnNlcyA9IHtcbiAgZmllbGRUeXBlczogbGVucyhwcm9wKFwiZmllbGRUeXBlc1wiKSwgdXBkYXRlQXQoW1wiZmllbGRUeXBlc1wiXSkpLFxuICBmaWVsZHNTdGF0ZTogbGVucyhwcm9wKFwiZmllbGRzU3RhdGVcIiksIHVwZGF0ZUF0KFtcImZpZWxkc1N0YXRlXCJdKSksXG4gIGZpZWxkc1N0YXRlSGlzdG9yeTogbGVucyhwcm9wKFwiZmllbGRzU3RhdGVIaXN0b3J5XCIpLCB1cGRhdGVBdChbXCJmaWVsZHNTdGF0ZUhpc3RvcnlcIl0pKSxcbn07XG5cbi8vIF8gPT4gU3RyaW5nXG5leHBvcnQgY29uc3QgY3JlYXRlSWQgPSBfID0+XG4gIChEYXRlLm5vdygpICsgTWF0aC5yYW5kb20oKSkudG9TdHJpbmcoKTtcblxuLy8gU3RhdGUgLT4gW2ZpZWxkc1N0YXRlXSAtPiBTdGF0ZVxuZXhwb3J0IGNvbnN0IHB1c2hIaXN0b3J5U3RhdGUgPSBjdXJyeSgoc3RhdGUsIG5ld0hpc3RvcnlTdGF0ZSkgPT4gcGlwZShcbiAgLy8gQWRkIGN1cnJlbnQgc3RhdGUgdG8gaGlzdG9yeVxuICBvdmVyKFN0YXRlTGVuc2VzLmZpZWxkc1N0YXRlSGlzdG9yeSwgcHJlcGVuZChzdGF0ZS5maWVsZHNTdGF0ZSkpLFxuICAvLyBNYWtlIG5ldyBTdGF0ZSB0aGUgY3VycmVudFxuICBzZXQoU3RhdGVMZW5zZXMuZmllbGRzU3RhdGUsIG5ld0hpc3RvcnlTdGF0ZSlcbikoc3RhdGUpKTtcblxuXG4vLyBTdGF0ZSAtPiBTdGF0ZVxuZXhwb3J0IGNvbnN0IGhpZGVDb25maWdzID0gc3RhdGUgPT5cbiAgc2V0KFxuICAgIFN0YXRlTGVuc2VzLmZpZWxkc1N0YXRlLFxuICAgIHN0YXRlLmZpZWxkc1N0YXRlLm1hcChzID0+IE9iamVjdC5hc3NpZ24oe30sIHMsIHsgY29uZmlnU2hvd2luZzogZmFsc2UgfSkpLFxuICAgIHN0YXRlXG4gICk7XG5cblxuLy8gU3RyaW5nIC0+IFN0cmluZyAtPiBPYmplY3QgLT4gRWl0aGVyIFN0cmluZyBPYmplY3RcbmV4cG9ydCBjb25zdCBwcm9wZXJ0eVR5cGVDaGVjayA9IGN1cnJ5KChwcm9wZXJ0eU5hbWUsIHR5cGUsIG9iaikgPT5cbiAgdHlwZW9mIG9ialtwcm9wZXJ0eU5hbWVdID09PSB0eXBlXG4gICAgPyBFaXRoZXIuUmlnaHQob2JqKVxuICAgIDogRWl0aGVyLkxlZnQoYFByb3BlcnR5ICcke3Byb3BlcnR5TmFtZX0nIGNhbm5vdCBiZSBvZiB0eXBlICR7dHlwZW9mIG9ialtwcm9wZXJ0eU5hbWVdfWApXG4pO1xuXG4vLyBDaGVja3MgdGhhdCBhIGZpZWxkIGhhcyBpdHMgZXNzZW50aWFsIHByb3BlcnRpZXNcbi8vIE9iamVjdCAtPiBFaXRoZXIgU3RyaW5nIE9iamVjdFxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRmllbGQgPSBmaWVsZFN0YXRlID0+XG4gIEVpdGhlci5mcm9tTnVsbGFibGUoZmllbGRTdGF0ZSlcbiAgICAubGVmdE1hcChmcyA9PiBgQSBmaWVsZCBTdGF0ZSBjYW5ub3QgYmUgZW1wdHkgJHt0eXBlb2YgZnN9YClcbiAgICAuY2hhaW4ocHJvcGVydHlUeXBlQ2hlY2soXCJyZXF1aXJlZFwiLCBcImJvb2xlYW5cIikpXG4gICAgLmNoYWluKHByb3BlcnR5VHlwZUNoZWNrKFwiY29uZmlnU2hvd2luZ1wiLCBcImJvb2xlYW5cIikpXG4gICAgLmNoYWluKHByb3BlcnR5VHlwZUNoZWNrKFwiaWRcIiwgXCJzdHJpbmdcIikpO1xuIiwiaW1wb3J0IHsgU3RhdGVMZW5zZXMgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgc2V0LCBvdmVyLCBzbGljZSwgcGlwZSB9IGZyb20gXCJyYW1kYVwiO1xuXG5jb25zdCBsYXN0SGlzdG9yeVN0YXRlID0gc3RhdGUgPT5cbiAgc3RhdGUuZmllbGRzU3RhdGVIaXN0b3J5WzBdIHx8IFtdO1xuXG5jb25zdCB1bmRvID0gKHN0YXRlLCBfKSA9PiBwaXBlKFxuICAvLyBNYWtlIGxhc3QgaGlzdG9yeSBsYXN0IHN0YXRlIHRoZSBjdXJyZW50IG9uZVxuICBzZXQoU3RhdGVMZW5zZXMuZmllbGRzU3RhdGUsIGxhc3RIaXN0b3J5U3RhdGUoc3RhdGUpKSxcbiAgLy8gUmVtb3ZlIGxhc3QgaGlzdG9yeSBzdGF0ZSBmcm9tIHRoZSBoaXN0b3J5IGFycmF5XG4gIG92ZXIoU3RhdGVMZW5zZXMuZmllbGRzU3RhdGVIaXN0b3J5LCBzbGljZSgxLCBJbmZpbml0eSkpXG4pKHN0YXRlKTtcblxuZXhwb3J0IGRlZmF1bHQgdW5kbztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2lkZW50aXR5KHgpIHsgcmV0dXJuIHg7IH07XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIF9pZGVudGl0eSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2lkZW50aXR5Jyk7XG5cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgZG9lcyBub3RoaW5nIGJ1dCByZXR1cm4gdGhlIHBhcmFtZXRlciBzdXBwbGllZCB0byBpdC4gR29vZFxuICogYXMgYSBkZWZhdWx0IG9yIHBsYWNlaG9sZGVyIGZ1bmN0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIGEgLT4gYVxuICogQHBhcmFtIHsqfSB4IFRoZSB2YWx1ZSB0byByZXR1cm4uXG4gKiBAcmV0dXJuIHsqfSBUaGUgaW5wdXQgdmFsdWUsIGB4YC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmlkZW50aXR5KDEpOyAvLz0+IDFcbiAqXG4gKiAgICAgIHZhciBvYmogPSB7fTtcbiAqICAgICAgUi5pZGVudGl0eShvYmopID09PSBvYmo7IC8vPT4gdHJ1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoX2lkZW50aXR5KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgdmFsdWUgYXQgYSBnaXZlbiBwYXRoLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyBbU3RyaW5nXSAtPiB7azogdn0gLT4gdiB8IFVuZGVmaW5lZFxuICogQHBhcmFtIHtBcnJheX0gcGF0aCBUaGUgcGF0aCB0byB1c2UuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcmV0cmlldmUgdGhlIG5lc3RlZCBwcm9wZXJ0eSBmcm9tLlxuICogQHJldHVybiB7Kn0gVGhlIGRhdGEgYXQgYHBhdGhgLlxuICogQHNlZSBSLnByb3BcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnBhdGgoWydhJywgJ2InXSwge2E6IHtiOiAyfX0pOyAvLz0+IDJcbiAqICAgICAgUi5wYXRoKFsnYScsICdiJ10sIHtjOiB7YjogMn19KTsgLy89PiB1bmRlZmluZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIHBhdGgocGF0aHMsIG9iaikge1xuICB2YXIgdmFsID0gb2JqO1xuICB2YXIgaWR4ID0gMDtcbiAgd2hpbGUgKGlkeCA8IHBhdGhzLmxlbmd0aCkge1xuICAgIGlmICh2YWwgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YWwgPSB2YWxbcGF0aHNbaWR4XV07XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHZhbDtcbn0pO1xuIiwidmFyIF9jb25jYXQgPSByZXF1aXJlKCcuL2ludGVybmFsL19jb25jYXQnKTtcbnZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX3JlZHVjZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3JlZHVjZScpO1xudmFyIG1hcCA9IHJlcXVpcmUoJy4vbWFwJyk7XG5cblxuLyoqXG4gKiBhcCBhcHBsaWVzIGEgbGlzdCBvZiBmdW5jdGlvbnMgdG8gYSBsaXN0IG9mIHZhbHVlcy5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgYXBgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LiBBbHNvXG4gKiB0cmVhdHMgY3VycmllZCBmdW5jdGlvbnMgYXMgYXBwbGljYXRpdmVzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjMuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIFthIC0+IGJdIC0+IFthXSAtPiBbYl1cbiAqIEBzaWcgQXBwbHkgZiA9PiBmIChhIC0+IGIpIC0+IGYgYSAtPiBmIGJcbiAqIEBwYXJhbSB7QXJyYXl9IGZucyBBbiBhcnJheSBvZiBmdW5jdGlvbnNcbiAqIEBwYXJhbSB7QXJyYXl9IHZzIEFuIGFycmF5IG9mIHZhbHVlc1xuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIHJlc3VsdHMgb2YgYXBwbHlpbmcgZWFjaCBvZiBgZm5zYCB0byBhbGwgb2YgYHZzYCBpbiB0dXJuLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuYXAoW1IubXVsdGlwbHkoMiksIFIuYWRkKDMpXSwgWzEsMiwzXSk7IC8vPT4gWzIsIDQsIDYsIDQsIDUsIDZdXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBhcChhcHBsaWNhdGl2ZSwgZm4pIHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgYXBwbGljYXRpdmUuYXAgPT09ICdmdW5jdGlvbicgP1xuICAgICAgYXBwbGljYXRpdmUuYXAoZm4pIDpcbiAgICB0eXBlb2YgYXBwbGljYXRpdmUgPT09ICdmdW5jdGlvbicgP1xuICAgICAgZnVuY3Rpb24oeCkgeyByZXR1cm4gYXBwbGljYXRpdmUoeCkoZm4oeCkpOyB9IDpcbiAgICAvLyBlbHNlXG4gICAgICBfcmVkdWNlKGZ1bmN0aW9uKGFjYywgZikgeyByZXR1cm4gX2NvbmNhdChhY2MsIG1hcChmLCBmbikpOyB9LCBbXSwgYXBwbGljYXRpdmUpXG4gICk7XG59KTtcbiIsInZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgc2luZ2xlIGl0ZW0gYnkgaXRlcmF0aW5nIHRocm91Z2ggdGhlIGxpc3QsIHN1Y2Nlc3NpdmVseSBjYWxsaW5nXG4gKiB0aGUgaXRlcmF0b3IgZnVuY3Rpb24gYW5kIHBhc3NpbmcgaXQgYW4gYWNjdW11bGF0b3IgdmFsdWUgYW5kIHRoZSBjdXJyZW50XG4gKiB2YWx1ZSBmcm9tIHRoZSBhcnJheSwgYW5kIHRoZW4gcGFzc2luZyB0aGUgcmVzdWx0IHRvIHRoZSBuZXh0IGNhbGwuXG4gKlxuICogU2ltaWxhciB0byBgcmVkdWNlYCwgZXhjZXB0IG1vdmVzIHRocm91Z2ggdGhlIGlucHV0IGxpc3QgZnJvbSB0aGUgcmlnaHQgdG9cbiAqIHRoZSBsZWZ0LlxuICpcbiAqIFRoZSBpdGVyYXRvciBmdW5jdGlvbiByZWNlaXZlcyB0d28gdmFsdWVzOiAqKGFjYywgdmFsdWUpKlxuICpcbiAqIE5vdGU6IGBSLnJlZHVjZVJpZ2h0YCBkb2VzIG5vdCBza2lwIGRlbGV0ZWQgb3IgdW5hc3NpZ25lZCBpbmRpY2VzIChzcGFyc2VcbiAqIGFycmF5cyksIHVubGlrZSB0aGUgbmF0aXZlIGBBcnJheS5wcm90b3R5cGUucmVkdWNlYCBtZXRob2QuIEZvciBtb3JlIGRldGFpbHNcbiAqIG9uIHRoaXMgYmVoYXZpb3IsIHNlZTpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3JlZHVjZVJpZ2h0I0Rlc2NyaXB0aW9uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSxiIC0+IGEpIC0+IGEgLT4gW2JdIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBpdGVyYXRvciBmdW5jdGlvbi4gUmVjZWl2ZXMgdHdvIHZhbHVlcywgdGhlIGFjY3VtdWxhdG9yIGFuZCB0aGVcbiAqICAgICAgICBjdXJyZW50IGVsZW1lbnQgZnJvbSB0aGUgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFjYyBUaGUgYWNjdW11bGF0b3IgdmFsdWUuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4geyp9IFRoZSBmaW5hbCwgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKiBAc2VlIFIuYWRkSW5kZXhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgcGFpcnMgPSBbIFsnYScsIDFdLCBbJ2InLCAyXSwgWydjJywgM10gXTtcbiAqICAgICAgdmFyIGZsYXR0ZW5QYWlycyA9IChhY2MsIHBhaXIpID0+IGFjYy5jb25jYXQocGFpcik7XG4gKlxuICogICAgICBSLnJlZHVjZVJpZ2h0KGZsYXR0ZW5QYWlycywgW10sIHBhaXJzKTsgLy89PiBbICdjJywgMywgJ2InLCAyLCAnYScsIDEgXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gcmVkdWNlUmlnaHQoZm4sIGFjYywgbGlzdCkge1xuICB2YXIgaWR4ID0gbGlzdC5sZW5ndGggLSAxO1xuICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICBhY2MgPSBmbihhY2MsIGxpc3RbaWR4XSk7XG4gICAgaWR4IC09IDE7XG4gIH1cbiAgcmV0dXJuIGFjYztcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBhcCA9IHJlcXVpcmUoJy4vYXAnKTtcbnZhciBtYXAgPSByZXF1aXJlKCcuL21hcCcpO1xudmFyIHByZXBlbmQgPSByZXF1aXJlKCcuL3ByZXBlbmQnKTtcbnZhciByZWR1Y2VSaWdodCA9IHJlcXVpcmUoJy4vcmVkdWNlUmlnaHQnKTtcblxuXG4vKipcbiAqIFRyYW5zZm9ybXMgYSBbVHJhdmVyc2FibGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9mYW50YXN5bGFuZC9mYW50YXN5LWxhbmQjdHJhdmVyc2FibGUpXG4gKiBvZiBbQXBwbGljYXRpdmVdKGh0dHBzOi8vZ2l0aHViLmNvbS9mYW50YXN5bGFuZC9mYW50YXN5LWxhbmQjYXBwbGljYXRpdmUpIGludG8gYW5cbiAqIEFwcGxpY2F0aXZlIG9mIFRyYXZlcnNhYmxlLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBzZXF1ZW5jZWAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTkuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKEFwcGxpY2F0aXZlIGYsIFRyYXZlcnNhYmxlIHQpID0+IChhIC0+IGYgYSkgLT4gdCAoZiBhKSAtPiBmICh0IGEpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvZlxuICogQHBhcmFtIHsqfSB0cmF2ZXJzYWJsZVxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi50cmF2ZXJzZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuc2VxdWVuY2UoTWF5YmUub2YsIFtKdXN0KDEpLCBKdXN0KDIpLCBKdXN0KDMpXSk7ICAgLy89PiBKdXN0KFsxLCAyLCAzXSlcbiAqICAgICAgUi5zZXF1ZW5jZShNYXliZS5vZiwgW0p1c3QoMSksIEp1c3QoMiksIE5vdGhpbmcoKV0pOyAvLz0+IE5vdGhpbmcoKVxuICpcbiAqICAgICAgUi5zZXF1ZW5jZShSLm9mLCBKdXN0KFsxLCAyLCAzXSkpOyAvLz0+IFtKdXN0KDEpLCBKdXN0KDIpLCBKdXN0KDMpXVxuICogICAgICBSLnNlcXVlbmNlKFIub2YsIE5vdGhpbmcoKSk7ICAgICAgIC8vPT4gW05vdGhpbmcoKV1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIHNlcXVlbmNlKG9mLCB0cmF2ZXJzYWJsZSkge1xuICByZXR1cm4gdHlwZW9mIHRyYXZlcnNhYmxlLnNlcXVlbmNlID09PSAnZnVuY3Rpb24nID9cbiAgICB0cmF2ZXJzYWJsZS5zZXF1ZW5jZShvZikgOlxuICAgIHJlZHVjZVJpZ2h0KGZ1bmN0aW9uKGFjYywgeCkgeyByZXR1cm4gYXAobWFwKHByZXBlbmQsIHgpLCBhY2MpOyB9LFxuICAgICAgICAgICAgICAgIG9mKFtdKSxcbiAgICAgICAgICAgICAgICB0cmF2ZXJzYWJsZSk7XG59KTtcbiIsInZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG52YXIgbWFwID0gcmVxdWlyZSgnLi9tYXAnKTtcbnZhciBzZXF1ZW5jZSA9IHJlcXVpcmUoJy4vc2VxdWVuY2UnKTtcblxuXG4vKipcbiAqIE1hcHMgYW4gW0FwcGxpY2F0aXZlXShodHRwczovL2dpdGh1Yi5jb20vZmFudGFzeWxhbmQvZmFudGFzeS1sYW5kI2FwcGxpY2F0aXZlKS1yZXR1cm5pbmdcbiAqIGZ1bmN0aW9uIG92ZXIgYSBbVHJhdmVyc2FibGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9mYW50YXN5bGFuZC9mYW50YXN5LWxhbmQjdHJhdmVyc2FibGUpLFxuICogdGhlbiB1c2VzIFtgc2VxdWVuY2VgXSgjc2VxdWVuY2UpIHRvIHRyYW5zZm9ybSB0aGUgcmVzdWx0aW5nIFRyYXZlcnNhYmxlIG9mIEFwcGxpY2F0aXZlXG4gKiBpbnRvIGFuIEFwcGxpY2F0aXZlIG9mIFRyYXZlcnNhYmxlLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBzZXF1ZW5jZWAgbWV0aG9kIG9mIHRoZSB0aGlyZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoQXBwbGljYXRpdmUgZiwgVHJhdmVyc2FibGUgdCkgPT4gKGEgLT4gZiBhKSAtPiAoYSAtPiBmIGIpIC0+IHQgYSAtPiBmICh0IGIpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvZlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZlxuICogQHBhcmFtIHsqfSB0cmF2ZXJzYWJsZVxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi5zZXF1ZW5jZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIC8vIFJldHVybnMgYE5vdGhpbmdgIGlmIHRoZSBnaXZlbiBkaXZpc29yIGlzIGAwYFxuICogICAgICBzYWZlRGl2ID0gbiA9PiBkID0+IGQgPT09IDAgPyBOb3RoaW5nKCkgOiBKdXN0KG4gLyBkKVxuICpcbiAqICAgICAgUi50cmF2ZXJzZShNYXliZS5vZiwgc2FmZURpdigxMCksIFsyLCA0LCA1XSk7IC8vPT4gSnVzdChbNSwgMi41LCAyXSlcbiAqICAgICAgUi50cmF2ZXJzZShNYXliZS5vZiwgc2FmZURpdigxMCksIFsyLCAwLCA1XSk7IC8vPT4gTm90aGluZ1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gdHJhdmVyc2Uob2YsIGYsIHRyYXZlcnNhYmxlKSB7XG4gIHJldHVybiBzZXF1ZW5jZShvZiwgbWFwKGYsIHRyYXZlcnNhYmxlKSk7XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2FycmF5RnJvbUl0ZXJhdG9yKGl0ZXIpIHtcbiAgdmFyIGxpc3QgPSBbXTtcbiAgdmFyIG5leHQ7XG4gIHdoaWxlICghKG5leHQgPSBpdGVyLm5leHQoKSkuZG9uZSkge1xuICAgIGxpc3QucHVzaChuZXh0LnZhbHVlKTtcbiAgfVxuICByZXR1cm4gbGlzdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9mdW5jdGlvbk5hbWUoZikge1xuICAvLyBTdHJpbmcoeCA9PiB4KSBldmFsdWF0ZXMgdG8gXCJ4ID0+IHhcIiwgc28gdGhlIHBhdHRlcm4gbWF5IG5vdCBtYXRjaC5cbiAgdmFyIG1hdGNoID0gU3RyaW5nKGYpLm1hdGNoKC9eZnVuY3Rpb24gKFxcdyopLyk7XG4gIHJldHVybiBtYXRjaCA9PSBudWxsID8gJycgOiBtYXRjaFsxXTtcbn07XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGl0cyBhcmd1bWVudHMgYXJlIGlkZW50aWNhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBWYWx1ZXMgYXJlXG4gKiBpZGVudGljYWwgaWYgdGhleSByZWZlcmVuY2UgdGhlIHNhbWUgbWVtb3J5LiBgTmFOYCBpcyBpZGVudGljYWwgdG8gYE5hTmA7XG4gKiBgMGAgYW5kIGAtMGAgYXJlIG5vdCBpZGVudGljYWwuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTUuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIGEgLT4gYSAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9IGFcbiAqIEBwYXJhbSB7Kn0gYlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbyA9IHt9O1xuICogICAgICBSLmlkZW50aWNhbChvLCBvKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuaWRlbnRpY2FsKDEsIDEpOyAvLz0+IHRydWVcbiAqICAgICAgUi5pZGVudGljYWwoMSwgJzEnKTsgLy89PiBmYWxzZVxuICogICAgICBSLmlkZW50aWNhbChbXSwgW10pOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuaWRlbnRpY2FsKDAsIC0wKTsgLy89PiBmYWxzZVxuICogICAgICBSLmlkZW50aWNhbChOYU4sIE5hTik7IC8vPT4gdHJ1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gaWRlbnRpY2FsKGEsIGIpIHtcbiAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICBpZiAoYSA9PT0gYikgeyAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgIHJldHVybiBhICE9PSAwIHx8IDEgLyBhID09PSAxIC8gYjtcbiAgfSBlbHNlIHtcbiAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgIHJldHVybiBhICE9PSBhICYmIGIgIT09IGI7XG4gIH1cbn0pO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuXG4vKipcbiAqIEdpdmVzIGEgc2luZ2xlLXdvcmQgc3RyaW5nIGRlc2NyaXB0aW9uIG9mIHRoZSAobmF0aXZlKSB0eXBlIG9mIGEgdmFsdWUsXG4gKiByZXR1cm5pbmcgc3VjaCBhbnN3ZXJzIGFzICdPYmplY3QnLCAnTnVtYmVyJywgJ0FycmF5Jywgb3IgJ051bGwnLiBEb2VzIG5vdFxuICogYXR0ZW1wdCB0byBkaXN0aW5ndWlzaCB1c2VyIE9iamVjdCB0eXBlcyBhbnkgZnVydGhlciwgcmVwb3J0aW5nIHRoZW0gYWxsIGFzXG4gKiAnT2JqZWN0Jy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC44LjBcbiAqIEBjYXRlZ29yeSBUeXBlXG4gKiBAc2lnICgqIC0+IHsqfSkgLT4gU3RyaW5nXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudHlwZSh7fSk7IC8vPT4gXCJPYmplY3RcIlxuICogICAgICBSLnR5cGUoMSk7IC8vPT4gXCJOdW1iZXJcIlxuICogICAgICBSLnR5cGUoZmFsc2UpOyAvLz0+IFwiQm9vbGVhblwiXG4gKiAgICAgIFIudHlwZSgncycpOyAvLz0+IFwiU3RyaW5nXCJcbiAqICAgICAgUi50eXBlKG51bGwpOyAvLz0+IFwiTnVsbFwiXG4gKiAgICAgIFIudHlwZShbXSk7IC8vPT4gXCJBcnJheVwiXG4gKiAgICAgIFIudHlwZSgvW0Etel0vKTsgLy89PiBcIlJlZ0V4cFwiXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiB0eXBlKHZhbCkge1xuICByZXR1cm4gdmFsID09PSBudWxsICAgICAgPyAnTnVsbCcgICAgICA6XG4gICAgICAgICB2YWwgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDpcbiAgICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpLnNsaWNlKDgsIC0xKTtcbn0pO1xuIiwidmFyIF9hcnJheUZyb21JdGVyYXRvciA9IHJlcXVpcmUoJy4vX2FycmF5RnJvbUl0ZXJhdG9yJyk7XG52YXIgX2Z1bmN0aW9uTmFtZSA9IHJlcXVpcmUoJy4vX2Z1bmN0aW9uTmFtZScpO1xudmFyIF9oYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBpZGVudGljYWwgPSByZXF1aXJlKCcuLi9pZGVudGljYWwnKTtcbnZhciBrZXlzID0gcmVxdWlyZSgnLi4va2V5cycpO1xudmFyIHR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfZXF1YWxzKGEsIGIsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIGlmIChpZGVudGljYWwoYSwgYikpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlKGEpICE9PSB0eXBlKGIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIGEuZXF1YWxzID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBiLmVxdWFscyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB0eXBlb2YgYS5lcXVhbHMgPT09ICdmdW5jdGlvbicgJiYgYS5lcXVhbHMoYikgJiZcbiAgICAgICAgICAgdHlwZW9mIGIuZXF1YWxzID09PSAnZnVuY3Rpb24nICYmIGIuZXF1YWxzKGEpO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlKGEpKSB7XG4gICAgY2FzZSAnQXJndW1lbnRzJzpcbiAgICBjYXNlICdBcnJheSc6XG4gICAgY2FzZSAnT2JqZWN0JzpcbiAgICAgIGlmICh0eXBlb2YgYS5jb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICAgIF9mdW5jdGlvbk5hbWUoYS5jb25zdHJ1Y3RvcikgPT09ICdQcm9taXNlJykge1xuICAgICAgICByZXR1cm4gYSA9PT0gYjtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0Jvb2xlYW4nOlxuICAgIGNhc2UgJ051bWJlcic6XG4gICAgY2FzZSAnU3RyaW5nJzpcbiAgICAgIGlmICghKHR5cGVvZiBhID09PSB0eXBlb2YgYiAmJiBpZGVudGljYWwoYS52YWx1ZU9mKCksIGIudmFsdWVPZigpKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnRGF0ZSc6XG4gICAgICBpZiAoIWlkZW50aWNhbChhLnZhbHVlT2YoKSwgYi52YWx1ZU9mKCkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0Vycm9yJzpcbiAgICAgIHJldHVybiBhLm5hbWUgPT09IGIubmFtZSAmJiBhLm1lc3NhZ2UgPT09IGIubWVzc2FnZTtcbiAgICBjYXNlICdSZWdFeHAnOlxuICAgICAgaWYgKCEoYS5zb3VyY2UgPT09IGIuc291cmNlICYmXG4gICAgICAgICAgICBhLmdsb2JhbCA9PT0gYi5nbG9iYWwgJiZcbiAgICAgICAgICAgIGEuaWdub3JlQ2FzZSA9PT0gYi5pZ25vcmVDYXNlICYmXG4gICAgICAgICAgICBhLm11bHRpbGluZSA9PT0gYi5tdWx0aWxpbmUgJiZcbiAgICAgICAgICAgIGEuc3RpY2t5ID09PSBiLnN0aWNreSAmJlxuICAgICAgICAgICAgYS51bmljb2RlID09PSBiLnVuaWNvZGUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ01hcCc6XG4gICAgY2FzZSAnU2V0JzpcbiAgICAgIGlmICghX2VxdWFscyhfYXJyYXlGcm9tSXRlcmF0b3IoYS5lbnRyaWVzKCkpLCBfYXJyYXlGcm9tSXRlcmF0b3IoYi5lbnRyaWVzKCkpLCBzdGFja0EsIHN0YWNrQikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnSW50OEFycmF5JzpcbiAgICBjYXNlICdVaW50OEFycmF5JzpcbiAgICBjYXNlICdVaW50OENsYW1wZWRBcnJheSc6XG4gICAgY2FzZSAnSW50MTZBcnJheSc6XG4gICAgY2FzZSAnVWludDE2QXJyYXknOlxuICAgIGNhc2UgJ0ludDMyQXJyYXknOlxuICAgIGNhc2UgJ1VpbnQzMkFycmF5JzpcbiAgICBjYXNlICdGbG9hdDMyQXJyYXknOlxuICAgIGNhc2UgJ0Zsb2F0NjRBcnJheSc6XG4gICAgICBicmVhaztcbiAgICBjYXNlICdBcnJheUJ1ZmZlcic6XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgLy8gVmFsdWVzIG9mIG90aGVyIHR5cGVzIGFyZSBvbmx5IGVxdWFsIGlmIGlkZW50aWNhbC5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBrZXlzQSA9IGtleXMoYSk7XG4gIGlmIChrZXlzQS5sZW5ndGggIT09IGtleXMoYikubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGlkeCA9IHN0YWNrQS5sZW5ndGggLSAxO1xuICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICBpZiAoc3RhY2tBW2lkeF0gPT09IGEpIHtcbiAgICAgIHJldHVybiBzdGFja0JbaWR4XSA9PT0gYjtcbiAgICB9XG4gICAgaWR4IC09IDE7XG4gIH1cblxuICBzdGFja0EucHVzaChhKTtcbiAgc3RhY2tCLnB1c2goYik7XG4gIGlkeCA9IGtleXNBLmxlbmd0aCAtIDE7XG4gIHdoaWxlIChpZHggPj0gMCkge1xuICAgIHZhciBrZXkgPSBrZXlzQVtpZHhdO1xuICAgIGlmICghKF9oYXMoa2V5LCBiKSAmJiBfZXF1YWxzKGJba2V5XSwgYVtrZXldLCBzdGFja0EsIHN0YWNrQikpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlkeCAtPSAxO1xuICB9XG4gIHN0YWNrQS5wb3AoKTtcbiAgc3RhY2tCLnBvcCgpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9lcXVhbHMgPSByZXF1aXJlKCcuL2ludGVybmFsL19lcXVhbHMnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIGl0cyBhcmd1bWVudHMgYXJlIGVxdWl2YWxlbnQsIGBmYWxzZWAgb3RoZXJ3aXNlLiBIYW5kbGVzXG4gKiBjeWNsaWNhbCBkYXRhIHN0cnVjdHVyZXMuXG4gKlxuICogRGlzcGF0Y2hlcyBzeW1tZXRyaWNhbGx5IHRvIHRoZSBgZXF1YWxzYCBtZXRob2RzIG9mIGJvdGggYXJndW1lbnRzLCBpZlxuICogcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgYSAtPiBiIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7Kn0gYVxuICogQHBhcmFtIHsqfSBiXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZXF1YWxzKDEsIDEpOyAvLz0+IHRydWVcbiAqICAgICAgUi5lcXVhbHMoMSwgJzEnKTsgLy89PiBmYWxzZVxuICogICAgICBSLmVxdWFscyhbMSwgMiwgM10sIFsxLCAyLCAzXSk7IC8vPT4gdHJ1ZVxuICpcbiAqICAgICAgdmFyIGEgPSB7fTsgYS52ID0gYTtcbiAqICAgICAgdmFyIGIgPSB7fTsgYi52ID0gYjtcbiAqICAgICAgUi5lcXVhbHMoYSwgYik7IC8vPT4gdHJ1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgcmV0dXJuIF9lcXVhbHMoYSwgYiwgW10sIFtdKTtcbn0pO1xuIiwiLyogQGZsb3cgd2VhayAqL1xuLyogZXNsaW50LWRpc2FibGUgbmV3LWNhcCAqL1xuaW1wb3J0IHsgcHVzaEhpc3RvcnlTdGF0ZSwgY3JlYXRlSWQgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgY3VycnksIGVxdWFscywgdHJhdmVyc2UsIGlkZW50aXR5LCBwYXRoIH0gZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgRWl0aGVyIGZyb20gXCJkYXRhLmVpdGhlclwiO1xuXG4vLyBbYV0gPT4gRWl0aGVyIFN0cmluZyBbYV1cbmNvbnN0IGlzQXJyYXkgPSBhcnIgPT5cbiAgQXJyYXkuaXNBcnJheShhcnIpXG4gICAgPyBFaXRoZXIuUmlnaHQoYXJyKVxuICAgIDogRWl0aGVyLkxlZnQoYEludmFsaWQgc3RhdGVzIHNlbnQgd2l0aCBpbXBvcnRTdGF0ZS4gRXhwZWN0ZWQgQXJyYXkgYnV0IHJlY2VpdmVkICR7dHlwZW9mIGFycn1gKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBtYXgtbGVuXG5cbmNvbnN0IGZpZWxkVHlwZUlzVmFsaWQgPSBjdXJyeSgodmFsaWRUeXBlcywgZmllbGQpID0+XG4gIHZhbGlkVHlwZXMuZmluZChlcXVhbHMoZmllbGQudHlwZSkpXG4gICAgPyBFaXRoZXIuUmlnaHQoZmllbGQpXG4gICAgOiBFaXRoZXIuTGVmdChgSW52YWxpZCBmaWVsZCB0eXBlICR7ZmllbGQudHlwZX1gKVxuKTtcblxuY29uc3QgdmFsaWRGaWVsZFR5cGVzID0gY3VycnkoKHZhbGlkVHlwZXMsIGZpZWxkc1N0YXRlKSA9PlxuICB0cmF2ZXJzZShFaXRoZXIub2YsIGZpZWxkVHlwZUlzVmFsaWQodmFsaWRUeXBlcyksIGZpZWxkc1N0YXRlKVxuKTtcblxuXG4vLyBbYV0gLT4gW2FdIC0+IEVpdGhlciBTdHJpbmcgW2FdXG5jb25zdCB2YWxpZGF0ZUZpZWxkc1N0YXRlID0gY3VycnkoKGZpZWxkc1N0YXRlLCBzdGF0ZSkgPT5cbiAgRWl0aGVyLm9mKGZpZWxkc1N0YXRlKVxuICAgIC5jaGFpbihpc0FycmF5KVxuICAgIC5jaGFpbih2YWxpZEZpZWxkVHlwZXMoc3RhdGUuZmllbGRUeXBlcy5tYXAocGF0aChbXCJpbmZvXCIsIFwidHlwZVwiXSkpKSlcbik7XG5cblxuLy8gQWRkIHJlcXVpcmVkIHByb3BlcnRpZXMgdGhhdCBhcmUgbm90IG1hbmFnZWQgYnkgdGhlIGZpZWxkXG4vLyBjb21wb25lbnQgYnV0IGJ5IHRoZSBGb3JtQnVpbGRlciBjb21wb25lbnQgaXRzZWxmLCBzbyBtYXlcbi8vIG5vdCBiZSB0aGVyZS5cbi8vIFthXSA9PiBbYV1cbmNvbnN0IGFkZFJlcXVpcmVkUHJvcGVydGllcyA9IGZpZWxkU3RhdGVzID0+XG4gIGZpZWxkU3RhdGVzXG4gICAgLm1hcChzID0+IE9iamVjdC5hc3NpZ24oXG4gICAgICB7XG4gICAgICAgIGNvbmZpZ1Nob3dpbmc6IGZhbHNlLFxuICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgcyxcbiAgICAgIHsgaWQ6IGNyZWF0ZUlkKCkgfVxuICAgICkpO1xuXG5cbi8vIElmIHRoZXJlIGFyZSBhbnkgcHJvYmxlbXMgd2l0aCB0aGUgaW1wb3J0LCB0aGUgc2FtZSBzdGF0ZVxuLy8gd2lsbCBiZSByZXR1cm5lZFxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlLCB7IG5ld0ZpZWxkc1N0YXRlIH0pID0+XG4gIHZhbGlkYXRlRmllbGRzU3RhdGUobmV3RmllbGRzU3RhdGUsIHN0YXRlKVxuICAgIC5tYXAoYWRkUmVxdWlyZWRQcm9wZXJ0aWVzKVxuICAgIC5tYXAocHVzaEhpc3RvcnlTdGF0ZShzdGF0ZSkpXG4gICAgLmJpbWFwKGNvbnNvbGUuZXJyb3IsIGlkZW50aXR5KVxuICAgIC5nZXRPckVsc2Uoc3RhdGUpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfcmVkdWNlZCh4KSB7XG4gIHJldHVybiB4ICYmIHhbJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJ10gPyB4IDpcbiAgICB7XG4gICAgICAnQEB0cmFuc2R1Y2VyL3ZhbHVlJzogeCxcbiAgICAgICdAQHRyYW5zZHVjZXIvcmVkdWNlZCc6IHRydWVcbiAgICB9O1xufTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9fY3VycnkyJyk7XG52YXIgX3JlZHVjZWQgPSByZXF1aXJlKCcuL19yZWR1Y2VkJyk7XG52YXIgX3hmQmFzZSA9IHJlcXVpcmUoJy4vX3hmQmFzZScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBYRmluZChmLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLmYgPSBmO1xuICAgIHRoaXMuZm91bmQgPSBmYWxzZTtcbiAgfVxuICBYRmluZC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhGaW5kLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgaWYgKCF0aGlzLmZvdW5kKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdm9pZCAwKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICB9O1xuICBYRmluZC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGlucHV0KSB7XG4gICAgaWYgKHRoaXMuZihpbnB1dCkpIHtcbiAgICAgIHRoaXMuZm91bmQgPSB0cnVlO1xuICAgICAgcmVzdWx0ID0gX3JlZHVjZWQodGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gX3hmaW5kKGYsIHhmKSB7IHJldHVybiBuZXcgWEZpbmQoZiwgeGYpOyB9KTtcbn0oKSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9kaXNwYXRjaGFibGUgPSByZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcbnZhciBfeGZpbmQgPSByZXF1aXJlKCcuL2ludGVybmFsL194ZmluZCcpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgbGlzdCB3aGljaCBtYXRjaGVzIHRoZSBwcmVkaWNhdGUsIG9yXG4gKiBgdW5kZWZpbmVkYCBpZiBubyBlbGVtZW50IG1hdGNoZXMuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYGZpbmRgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBhIHwgdW5kZWZpbmVkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHRoZSBlbGVtZW50IGlzIHRoZVxuICogICAgICAgIGRlc2lyZWQgb25lLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBlbGVtZW50IGZvdW5kLCBvciBgdW5kZWZpbmVkYC5cbiAqIEBzZWUgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgeHMgPSBbe2E6IDF9LCB7YTogMn0sIHthOiAzfV07XG4gKiAgICAgIFIuZmluZChSLnByb3BFcSgnYScsIDIpKSh4cyk7IC8vPT4ge2E6IDJ9XG4gKiAgICAgIFIuZmluZChSLnByb3BFcSgnYScsIDQpKSh4cyk7IC8vPT4gdW5kZWZpbmVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKCdmaW5kJywgX3hmaW5kLCBmdW5jdGlvbiBmaW5kKGZuLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBpZiAoZm4obGlzdFtpZHhdKSkge1xuICAgICAgcmV0dXJuIGxpc3RbaWR4XTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbn0pKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuXG4vKipcbiAqIEEgaGVscGVyIGZvciBkZWxheWluZyB0aGUgZXhlY3V0aW9uIG9mIGEgZnVuY3Rpb24uXG4gKiBAcHJpdmF0ZVxuICogQHN1bW1hcnkgKEFueS4uLiAtPiBBbnkpIC0+IFZvaWRcbiAqL1xudmFyIGRlbGF5ZWQgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlICE9PSAndW5kZWZpbmVkJz8gIHNldEltbWVkaWF0ZVxuICAgICAgICAgICAgOiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCc/ICAgICAgIHByb2Nlc3MubmV4dFRpY2tcbiAgICAgICAgICAgIDogLyogb3RoZXJ3aXNlICovICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0XG5cbi8qKlxuICogQG1vZHVsZSBsaWIvdGFza1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IFRhc2s7XG5cbi8vIC0tIEltcGxlbWVudGF0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKipcbiAqIFRoZSBgVGFza1vOsSwgzrJdYCBzdHJ1Y3R1cmUgcmVwcmVzZW50cyB2YWx1ZXMgdGhhdCBkZXBlbmQgb24gdGltZS4gVGhpc1xuICogYWxsb3dzIG9uZSB0byBtb2RlbCB0aW1lLWJhc2VkIGVmZmVjdHMgZXhwbGljaXRseSwgc3VjaCB0aGF0IG9uZSBjYW4gaGF2ZVxuICogZnVsbCBrbm93bGVkZ2Ugb2Ygd2hlbiB0aGV5J3JlIGRlYWxpbmcgd2l0aCBkZWxheWVkIGNvbXB1dGF0aW9ucywgbGF0ZW5jeSxcbiAqIG9yIGFueXRoaW5nIHRoYXQgY2FuIG5vdCBiZSBjb21wdXRlZCBpbW1lZGlhdGVseS5cbiAqXG4gKiBBIGNvbW1vbiB1c2UgZm9yIHRoaXMgc3RydWN0dXJlIGlzIHRvIHJlcGxhY2UgdGhlIHVzdWFsIENvbnRpbnVhdGlvbi1QYXNzaW5nXG4gKiBTdHlsZSBmb3JtIG9mIHByb2dyYW1taW5nLCBpbiBvcmRlciB0byBiZSBhYmxlIHRvIGNvbXBvc2UgYW5kIHNlcXVlbmNlXG4gKiB0aW1lLWRlcGVuZGVudCBlZmZlY3RzIHVzaW5nIHRoZSBnZW5lcmljIGFuZCBwb3dlcmZ1bCBtb25hZGljIG9wZXJhdGlvbnMuXG4gKlxuICogQGNsYXNzXG4gKiBAc3VtbWFyeVxuICogKCjOsSDihpIgVm9pZCksICjOsiDihpIgVm9pZCkg4oaSIFZvaWQpLCAoVm9pZCDihpIgVm9pZCkg4oaSIFRhc2tbzrEsIM6yXVxuICpcbiAqIFRhc2tbzrEsIM6yXSA8OiBDaGFpblvOsl1cbiAqICAgICAgICAgICAgICAgLCBNb25hZFvOsl1cbiAqICAgICAgICAgICAgICAgLCBGdW5jdG9yW86yXVxuICogICAgICAgICAgICAgICAsIEFwcGxpY2F0aXZlW86yXVxuICogICAgICAgICAgICAgICAsIFNlbWlncm91cFvOsl1cbiAqICAgICAgICAgICAgICAgLCBNb25vaWRbzrJdXG4gKiAgICAgICAgICAgICAgICwgU2hvd1xuICovXG5mdW5jdGlvbiBUYXNrKGNvbXB1dGF0aW9uLCBjbGVhbnVwKSB7XG4gIHRoaXMuZm9yayA9IGNvbXB1dGF0aW9uO1xuXG4gIHRoaXMuY2xlYW51cCA9IGNsZWFudXAgfHwgZnVuY3Rpb24oKSB7fTtcbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IGBUYXNrW86xLCDOsl1gIGNvbnRhaW5pbmcgdGhlIHNpbmdsZSB2YWx1ZSBgzrJgLlxuICpcbiAqIGDOsmAgY2FuIGJlIGFueSB2YWx1ZSwgaW5jbHVkaW5nIGBudWxsYCwgYHVuZGVmaW5lZGAsIG9yIGFub3RoZXJcbiAqIGBUYXNrW86xLCDOsl1gIHN0cnVjdHVyZS5cbiAqXG4gKiBAc3VtbWFyeSDOsiDihpIgVGFza1vOsSwgzrJdXG4gKi9cblRhc2sucHJvdG90eXBlLm9mID0gZnVuY3Rpb24gX29mKGIpIHtcbiAgcmV0dXJuIG5ldyBUYXNrKGZ1bmN0aW9uKF8sIHJlc29sdmUpIHtcbiAgICByZXR1cm4gcmVzb2x2ZShiKTtcbiAgfSk7XG59O1xuXG5UYXNrLm9mID0gVGFzay5wcm90b3R5cGUub2Y7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBgVGFza1vOsSwgzrJdYCBjb250YWluaW5nIHRoZSBzaW5nbGUgdmFsdWUgYM6xYC5cbiAqXG4gKiBgzrFgIGNhbiBiZSBhbnkgdmFsdWUsIGluY2x1ZGluZyBgbnVsbGAsIGB1bmRlZmluZWRgLCBvciBhbm90aGVyXG4gKiBgVGFza1vOsSwgzrJdYCBzdHJ1Y3R1cmUuXG4gKlxuICogQHN1bW1hcnkgzrEg4oaSIFRhc2tbzrEsIM6yXVxuICovXG5UYXNrLnByb3RvdHlwZS5yZWplY3RlZCA9IGZ1bmN0aW9uIF9yZWplY3RlZChhKSB7XG4gIHJldHVybiBuZXcgVGFzayhmdW5jdGlvbihyZWplY3QpIHtcbiAgICByZXR1cm4gcmVqZWN0KGEpO1xuICB9KTtcbn07XG5cblRhc2sucmVqZWN0ZWQgPSBUYXNrLnByb3RvdHlwZS5yZWplY3RlZDtcblxuLy8gLS0gRnVuY3RvciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgc3VjY2Vzc2Z1bCB2YWx1ZSBvZiB0aGUgYFRhc2tbzrEsIM6yXWAgdXNpbmcgYSByZWd1bGFyIHVuYXJ5XG4gKiBmdW5jdGlvbi5cbiAqXG4gKiBAc3VtbWFyeSBAVGFza1vOsSwgzrJdID0+ICjOsiDihpIgzrMpIOKGkiBUYXNrW86xLCDOs11cbiAqL1xuVGFzay5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gX21hcChmKSB7XG4gIHZhciBmb3JrID0gdGhpcy5mb3JrO1xuICB2YXIgY2xlYW51cCA9IHRoaXMuY2xlYW51cDtcblxuICByZXR1cm4gbmV3IFRhc2soZnVuY3Rpb24ocmVqZWN0LCByZXNvbHZlKSB7XG4gICAgcmV0dXJuIGZvcmsoZnVuY3Rpb24oYSkge1xuICAgICAgcmV0dXJuIHJlamVjdChhKTtcbiAgICB9LCBmdW5jdGlvbihiKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZShmKGIpKTtcbiAgICB9KTtcbiAgfSwgY2xlYW51cCk7XG59O1xuXG4vLyAtLSBDaGFpbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSBzdWNjZXNmdWwgdmFsdWUgb2YgdGhlIGBUYXNrW86xLCDOsl1gIHVzaW5nIGEgZnVuY3Rpb24gdG8gYVxuICogbW9uYWQuXG4gKlxuICogQHN1bW1hcnkgQFRhc2tbzrEsIM6yXSA9PiAozrIg4oaSIFRhc2tbzrEsIM6zXSkg4oaSIFRhc2tbzrEsIM6zXVxuICovXG5UYXNrLnByb3RvdHlwZS5jaGFpbiA9IGZ1bmN0aW9uIF9jaGFpbihmKSB7XG4gIHZhciBmb3JrID0gdGhpcy5mb3JrO1xuICB2YXIgY2xlYW51cCA9IHRoaXMuY2xlYW51cDtcblxuICByZXR1cm4gbmV3IFRhc2soZnVuY3Rpb24ocmVqZWN0LCByZXNvbHZlKSB7XG4gICAgcmV0dXJuIGZvcmsoZnVuY3Rpb24oYSkge1xuICAgICAgcmV0dXJuIHJlamVjdChhKTtcbiAgICB9LCBmdW5jdGlvbihiKSB7XG4gICAgICByZXR1cm4gZihiKS5mb3JrKHJlamVjdCwgcmVzb2x2ZSk7XG4gICAgfSk7XG4gIH0sIGNsZWFudXApO1xufTtcblxuLy8gLS0gQXBwbHkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qKlxuICogQXBwbHlzIHRoZSBzdWNjZXNzZnVsIHZhbHVlIG9mIHRoZSBgVGFza1vOsSwgKM6yIOKGkiDOsyldYCB0byB0aGUgc3VjY2Vzc2Z1bFxuICogdmFsdWUgb2YgdGhlIGBUYXNrW86xLCDOsl1gXG4gKlxuICogQHN1bW1hcnkgQFRhc2tbzrEsICjOsiDihpIgzrMpXSA9PiBUYXNrW86xLCDOsl0g4oaSIFRhc2tbzrEsIM6zXVxuICovXG5cblRhc2sucHJvdG90eXBlLmFwID0gZnVuY3Rpb24gX2FwKHRoYXQpIHtcbiAgdmFyIGZvcmtUaGlzID0gdGhpcy5mb3JrO1xuICB2YXIgZm9ya1RoYXQgPSB0aGF0LmZvcms7XG4gIHZhciBjbGVhbnVwVGhpcyA9IHRoaXMuY2xlYW51cDtcbiAgdmFyIGNsZWFudXBUaGF0ID0gdGhhdC5jbGVhbnVwO1xuXG4gIGZ1bmN0aW9uIGNsZWFudXBCb3RoKHN0YXRlKSB7XG4gICAgY2xlYW51cFRoaXMoc3RhdGVbMF0pO1xuICAgIGNsZWFudXBUaGF0KHN0YXRlWzFdKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgVGFzayhmdW5jdGlvbihyZWplY3QsIHJlc29sdmUpIHtcbiAgICB2YXIgZnVuYywgZnVuY0xvYWRlZCA9IGZhbHNlO1xuICAgIHZhciB2YWwsIHZhbExvYWRlZCA9IGZhbHNlO1xuICAgIHZhciByZWplY3RlZCA9IGZhbHNlO1xuICAgIHZhciBhbGxTdGF0ZTtcblxuICAgIHZhciB0aGlzU3RhdGUgPSBmb3JrVGhpcyhndWFyZFJlamVjdCwgZ3VhcmRSZXNvbHZlKGZ1bmN0aW9uKHgpIHtcbiAgICAgIGZ1bmNMb2FkZWQgPSB0cnVlO1xuICAgICAgZnVuYyA9IHg7XG4gICAgfSkpO1xuXG4gICAgdmFyIHRoYXRTdGF0ZSA9IGZvcmtUaGF0KGd1YXJkUmVqZWN0LCBndWFyZFJlc29sdmUoZnVuY3Rpb24oeCkge1xuICAgICAgdmFsTG9hZGVkID0gdHJ1ZTtcbiAgICAgIHZhbCA9IHg7XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gZ3VhcmRSZXNvbHZlKHNldHRlcikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0dGVyKHgpO1xuICAgICAgICBpZiAoZnVuY0xvYWRlZCAmJiB2YWxMb2FkZWQpIHtcbiAgICAgICAgICBkZWxheWVkKGZ1bmN0aW9uKCl7IGNsZWFudXBCb3RoKGFsbFN0YXRlKSB9KTtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShmdW5jKHZhbCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ3VhcmRSZWplY3QoeCkge1xuICAgICAgaWYgKCFyZWplY3RlZCkge1xuICAgICAgICByZWplY3RlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiByZWplY3QoeCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFsbFN0YXRlID0gW3RoaXNTdGF0ZSwgdGhhdFN0YXRlXTtcbiAgfSwgY2xlYW51cEJvdGgpO1xufTtcblxuLy8gLS0gU2VtaWdyb3VwIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKipcbiAqIFNlbGVjdHMgdGhlIGVhcmxpZXIgb2YgdGhlIHR3byB0YXNrcyBgVGFza1vOsSwgzrJdYFxuICpcbiAqIEBzdW1tYXJ5IEBUYXNrW86xLCDOsl0gPT4gVGFza1vOsSwgzrJdIOKGkiBUYXNrW86xLCDOsl1cbiAqL1xuXG5UYXNrLnByb3RvdHlwZS5jb25jYXQgPSBmdW5jdGlvbiBfY29uY2F0KHRoYXQpIHtcbiAgdmFyIGZvcmtUaGlzID0gdGhpcy5mb3JrO1xuICB2YXIgZm9ya1RoYXQgPSB0aGF0LmZvcms7XG4gIHZhciBjbGVhbnVwVGhpcyA9IHRoaXMuY2xlYW51cDtcbiAgdmFyIGNsZWFudXBUaGF0ID0gdGhhdC5jbGVhbnVwO1xuXG4gIGZ1bmN0aW9uIGNsZWFudXBCb3RoKHN0YXRlKSB7XG4gICAgY2xlYW51cFRoaXMoc3RhdGVbMF0pO1xuICAgIGNsZWFudXBUaGF0KHN0YXRlWzFdKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgVGFzayhmdW5jdGlvbihyZWplY3QsIHJlc29sdmUpIHtcbiAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgIHZhciBhbGxTdGF0ZTtcbiAgICB2YXIgdGhpc1N0YXRlID0gZm9ya1RoaXMoZ3VhcmQocmVqZWN0KSwgZ3VhcmQocmVzb2x2ZSkpO1xuICAgIHZhciB0aGF0U3RhdGUgPSBmb3JrVGhhdChndWFyZChyZWplY3QpLCBndWFyZChyZXNvbHZlKSk7XG5cbiAgICByZXR1cm4gYWxsU3RhdGUgPSBbdGhpc1N0YXRlLCB0aGF0U3RhdGVdO1xuXG4gICAgZnVuY3Rpb24gZ3VhcmQoZikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgaWYgKCFkb25lKSB7XG4gICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgZGVsYXllZChmdW5jdGlvbigpeyBjbGVhbnVwQm90aChhbGxTdGF0ZSkgfSlcbiAgICAgICAgICByZXR1cm4gZih4KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH0sIGNsZWFudXBCb3RoKTtcblxufTtcblxuLy8gLS0gTW9ub2lkIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKipcbiAqIFJldHVybnMgYSBUYXNrIHRoYXQgd2lsbCBuZXZlciByZXNvbHZlXG4gKlxuICogQHN1bW1hcnkgVm9pZCDihpIgVGFza1vOsSwgX11cbiAqL1xuVGFzay5lbXB0eSA9IGZ1bmN0aW9uIF9lbXB0eSgpIHtcbiAgcmV0dXJuIG5ldyBUYXNrKGZ1bmN0aW9uKCkge30pO1xufTtcblxuVGFzay5wcm90b3R5cGUuZW1wdHkgPSBUYXNrLmVtcHR5O1xuXG4vLyAtLSBTaG93IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gKiBSZXR1cm5zIGEgdGV4dHVhbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgYFRhc2tbzrEsIM6yXWBcbiAqXG4gKiBAc3VtbWFyeSBAVGFza1vOsSwgzrJdID0+IFZvaWQg4oaSIFN0cmluZ1xuICovXG5UYXNrLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIF90b1N0cmluZygpIHtcbiAgcmV0dXJuICdUYXNrJztcbn07XG5cbi8vIC0tIEV4dHJhY3RpbmcgYW5kIHJlY292ZXJpbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKipcbiAqIFRyYW5zZm9ybXMgYSBmYWlsdXJlIHZhbHVlIGludG8gYSBuZXcgYFRhc2tbzrEsIM6yXWAuIERvZXMgbm90aGluZyBpZiB0aGVcbiAqIHN0cnVjdHVyZSBhbHJlYWR5IGNvbnRhaW5zIGEgc3VjY2Vzc2Z1bCB2YWx1ZS5cbiAqXG4gKiBAc3VtbWFyeSBAVGFza1vOsSwgzrJdID0+ICjOsSDihpIgVGFza1vOsywgzrJdKSDihpIgVGFza1vOsywgzrJdXG4gKi9cblRhc2sucHJvdG90eXBlLm9yRWxzZSA9IGZ1bmN0aW9uIF9vckVsc2UoZikge1xuICB2YXIgZm9yayA9IHRoaXMuZm9yaztcbiAgdmFyIGNsZWFudXAgPSB0aGlzLmNsZWFudXA7XG5cbiAgcmV0dXJuIG5ldyBUYXNrKGZ1bmN0aW9uKHJlamVjdCwgcmVzb2x2ZSkge1xuICAgIHJldHVybiBmb3JrKGZ1bmN0aW9uKGEpIHtcbiAgICAgIHJldHVybiBmKGEpLmZvcmsocmVqZWN0LCByZXNvbHZlKTtcbiAgICB9LCBmdW5jdGlvbihiKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZShiKTtcbiAgICB9KTtcbiAgfSwgY2xlYW51cCk7XG59O1xuXG4vLyAtLSBGb2xkcyBhbmQgZXh0ZW5kZWQgdHJhbnNmb3JtYXRpb25zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gKiBDYXRhbW9ycGhpc20uIFRha2VzIHR3byBmdW5jdGlvbnMsIGFwcGxpZXMgdGhlIGxlZnRtb3N0IG9uZSB0byB0aGUgZmFpbHVyZVxuICogdmFsdWUsIGFuZCB0aGUgcmlnaHRtb3N0IG9uZSB0byB0aGUgc3VjY2Vzc2Z1bCB2YWx1ZSwgZGVwZW5kaW5nIG9uIHdoaWNoIG9uZVxuICogaXMgcHJlc2VudC5cbiAqXG4gKiBAc3VtbWFyeSBAVGFza1vOsSwgzrJdID0+ICjOsSDihpIgzrMpLCAozrIg4oaSIM6zKSDihpIgVGFza1vOtCwgzrNdXG4gKi9cblRhc2sucHJvdG90eXBlLmZvbGQgPSBmdW5jdGlvbiBfZm9sZChmLCBnKSB7XG4gIHZhciBmb3JrID0gdGhpcy5mb3JrO1xuICB2YXIgY2xlYW51cCA9IHRoaXMuY2xlYW51cDtcblxuICByZXR1cm4gbmV3IFRhc2soZnVuY3Rpb24ocmVqZWN0LCByZXNvbHZlKSB7XG4gICAgcmV0dXJuIGZvcmsoZnVuY3Rpb24oYSkge1xuICAgICAgcmV0dXJuIHJlc29sdmUoZihhKSk7XG4gICAgfSwgZnVuY3Rpb24oYikge1xuICAgICAgcmV0dXJuIHJlc29sdmUoZyhiKSk7XG4gICAgfSk7XG4gIH0sIGNsZWFudXApO1xufTtcblxuLyoqXG4gKiBDYXRhbW9ycGhpc20uXG4gKlxuICogQHN1bW1hcnkgQFRhc2tbzrEsIM6yXSA9PiB7IFJlamVjdGVkOiDOsSDihpIgzrMsIFJlc29sdmVkOiDOsiDihpIgzrMgfSDihpIgVGFza1vOtCwgzrNdXG4gKi9cblRhc2sucHJvdG90eXBlLmNhdGEgPSBmdW5jdGlvbiBfY2F0YShwYXR0ZXJuKSB7XG4gIHJldHVybiB0aGlzLmZvbGQocGF0dGVybi5SZWplY3RlZCwgcGF0dGVybi5SZXNvbHZlZCk7XG59O1xuXG4vKipcbiAqIFN3YXBzIHRoZSBkaXNqdW5jdGlvbiB2YWx1ZXMuXG4gKlxuICogQHN1bW1hcnkgQFRhc2tbzrEsIM6yXSA9PiBWb2lkIOKGkiBUYXNrW86yLCDOsV1cbiAqL1xuVGFzay5wcm90b3R5cGUuc3dhcCA9IGZ1bmN0aW9uIF9zd2FwKCkge1xuICB2YXIgZm9yayA9IHRoaXMuZm9yaztcbiAgdmFyIGNsZWFudXAgPSB0aGlzLmNsZWFudXA7XG5cbiAgcmV0dXJuIG5ldyBUYXNrKGZ1bmN0aW9uKHJlamVjdCwgcmVzb2x2ZSkge1xuICAgIHJldHVybiBmb3JrKGZ1bmN0aW9uKGEpIHtcbiAgICAgIHJldHVybiByZXNvbHZlKGEpO1xuICAgIH0sIGZ1bmN0aW9uKGIpIHtcbiAgICAgIHJldHVybiByZWplY3QoYik7XG4gICAgfSk7XG4gIH0sIGNsZWFudXApO1xufTtcblxuLyoqXG4gKiBNYXBzIGJvdGggc2lkZXMgb2YgdGhlIGRpc2p1bmN0aW9uLlxuICpcbiAqIEBzdW1tYXJ5IEBUYXNrW86xLCDOsl0gPT4gKM6xIOKGkiDOsyksICjOsiDihpIgzrQpIOKGkiBUYXNrW86zLCDOtF1cbiAqL1xuVGFzay5wcm90b3R5cGUuYmltYXAgPSBmdW5jdGlvbiBfYmltYXAoZiwgZykge1xuICB2YXIgZm9yayA9IHRoaXMuZm9yaztcbiAgdmFyIGNsZWFudXAgPSB0aGlzLmNsZWFudXA7XG5cbiAgcmV0dXJuIG5ldyBUYXNrKGZ1bmN0aW9uKHJlamVjdCwgcmVzb2x2ZSkge1xuICAgIHJldHVybiBmb3JrKGZ1bmN0aW9uKGEpIHtcbiAgICAgIHJldHVybiByZWplY3QoZihhKSk7XG4gICAgfSwgZnVuY3Rpb24oYikge1xuICAgICAgcmV0dXJuIHJlc29sdmUoZyhiKSk7XG4gICAgfSk7XG4gIH0sIGNsZWFudXApO1xufTtcblxuLyoqXG4gKiBNYXBzIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIGRpc2p1bmN0aW9uIChmYWlsdXJlKS5cbiAqXG4gKiBAc3VtbWFyeSBAVGFza1vOsSwgzrJdID0+ICjOsSDihpIgzrMpIOKGkiBUYXNrW86zLCDOsl1cbiAqL1xuVGFzay5wcm90b3R5cGUucmVqZWN0ZWRNYXAgPSBmdW5jdGlvbiBfcmVqZWN0ZWRNYXAoZikge1xuICB2YXIgZm9yayA9IHRoaXMuZm9yaztcbiAgdmFyIGNsZWFudXAgPSB0aGlzLmNsZWFudXA7XG5cbiAgcmV0dXJuIG5ldyBUYXNrKGZ1bmN0aW9uKHJlamVjdCwgcmVzb2x2ZSkge1xuICAgIHJldHVybiBmb3JrKGZ1bmN0aW9uKGEpIHtcbiAgICAgIHJldHVybiByZWplY3QoZihhKSk7XG4gICAgfSwgZnVuY3Rpb24oYikge1xuICAgICAgcmV0dXJuIHJlc29sdmUoYik7XG4gICAgfSk7XG4gIH0sIGNsZWFudXApO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi90YXNrJyk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuZXctY2FwICovXG5pbXBvcnQgeyBwcm9wLCBmaW5kLCBpZGVudGl0eSwgcGlwZSB9IGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgY3JlYXRlSWQgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IEVpdGhlciBmcm9tIFwiZGF0YS5laXRoZXJcIjtcbmltcG9ydCBUYXNrIGZyb20gXCJkYXRhLnRhc2tcIjtcbmltcG9ydCBJbW11dGFibGUgZnJvbSBcInNlYW1sZXNzLWltbXV0YWJsZVwiO1xuaW1wb3J0IHsgZmllbGRDcmVhdGVkIH0gZnJvbSBcIi4uL0FjdGlvbnNcIjtcblxuLy8gU3RhdGUgLT4gU3RyaW5nIC0+IEVpdGhlciBTdHJpbmcgRnVuY3Rpb25cbmNvbnN0IHR5cGVDb25zdHJ1Y3RvciA9IChzdGF0ZSwgZmllbGRUeXBlKSA9PiB7XG4gIHJldHVybiBFaXRoZXIub2Yoc3RhdGUpXG4gICAgLm1hcChwcm9wKFwiZmllbGRUeXBlc1wiKSlcbiAgICAubWFwKGZpbmQodiA9PiB2LmluZm8udHlwZSA9PT0gZmllbGRUeXBlKSlcbiAgICAuY2hhaW4oRWl0aGVyLmZyb21OdWxsYWJsZSlcbiAgICAuYmltYXAoXyA9PiBgRmllbGQgXCIke2ZpZWxkVHlwZX1cIiBkb2VzIG5vdCBleGlzdC5gLCBpZGVudGl0eSk7XG59O1xuXG4vLyB7IGluaXRpYWxTdGF0ZTogRnVuY3Rpb24gfSAtPiBUYXNrIFN0cmluZyBPYmplY3RcbmNvbnN0IGNyZWF0ZUZpZWxkID0gY29uc3RyID0+XG4gIG5ldyBUYXNrKChyZWplY3QsIHJlc29sdmUpID0+IHtcbiAgICAvLyBNYWtlIHN1cmUgdGhlIHByb21pc2UgaXMgb25seSByZXNvbHZlZCBvbmNlXG4gICAgbGV0IGNhbGxlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGZpZWxkU3RhdGUgPSBjb25zdHIuaW5pdGlhbFN0YXRlKCk7XG5cbiAgICBpZiAoIShmaWVsZFN0YXRlIGluc3RhbmNlb2YgUHJvbWlzZSkpIHtcbiAgICAgIHJlc29sdmUoZmllbGRTdGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpZWxkU3RhdGVcbiAgICAgIC50aGVuKHYgPT4ge1xuICAgICAgICBpZiAoY2FsbGVkKSB7IHJldHVybjsgfVxuICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICByZXNvbHZlKHYpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCh2ID0+IHtcbiAgICAgICAgaWYgKGNhbGxlZCkgeyB0aHJvdyB2OyB9XG4gICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgIHJlamVjdCh2KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbi8vIE9iamVjdCAtPiBPYmplY3RcbmNvbnN0IGluc2VydFJlcXVpcmVkUHJvcHMgPSBmaWVsZCA9PlxuICBJbW11dGFibGUoZmllbGQpLm1lcmdlKHtcbiAgICBpZDogY3JlYXRlSWQoKSxcbiAgICBjb25maWdTaG93aW5nOiB0cnVlLFxuICB9LCB7XG4gICAgZGVlcDogdHJ1ZSxcbiAgfSk7XG5cbmNvbnN0IGNyZWF0ZUZpZWxkQXN5bmNocm9ub3VzbHkgPSAoc3RhdGUsIGZpZWxkVHlwZSwgYXN5bmNEaXNwYXRjaCkgPT5cbiAgdHlwZUNvbnN0cnVjdG9yKHN0YXRlLCBmaWVsZFR5cGUpXG4gIC5tYXAoY3JlYXRlRmllbGQpIC8vIEVpdGhlciBTdHJpbmcgKFRhc2sgU3RyaW5nIE9iamVjdClcbiAgLmxlZnRNYXAoVGFzay5yZWplY3RlZClcbiAgLm1lcmdlKCkgLy8gVGFzayBTdHJpbmcgT2JqZWN0XG4gIC5tYXAoaW5zZXJ0UmVxdWlyZWRQcm9wcylcbiAgLmZvcmsoIC8vIGV4ZWN1dGUgdGFza1xuICAgIGVyciA9PiBjb25zb2xlLmVycm9yKFwiVGFzayByZWplY3RlZFwiLCBlcnIpLFxuICAgIHBpcGUoZmllbGRDcmVhdGVkLCBhc3luY0Rpc3BhdGNoKVxuICApO1xuXG4vLyBUaGlzIGlzIGFuIGFzeW5jIGFjdGlvbi4gV2hlbiBpdCBpcyBmaW5pc2hlZCBpdCB3aWxsIHRyaWdnZXIgdGhlXG4vLyBmaWVsZCBjcmVhdGVkIGFjdGlvblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlLCB7IGZpZWxkVHlwZSwgYXN5bmNEaXNwYXRjaCB9KSA9PiB7XG4gIGNyZWF0ZUZpZWxkQXN5bmNocm9ub3VzbHkoc3RhdGUsIGZpZWxkVHlwZSwgYXN5bmNEaXNwYXRjaCk7XG4gIHJldHVybiBzdGF0ZTtcbn07XG4iLCJ2YXIgX2NvbmNhdCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbmNhdCcpO1xudmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCBjb250YWluaW5nIHRoZSBjb250ZW50cyBvZiB0aGUgZ2l2ZW4gbGlzdCwgZm9sbG93ZWQgYnlcbiAqIHRoZSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgYSAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0geyp9IGVsIFRoZSBlbGVtZW50IHRvIGFkZCB0byB0aGUgZW5kIG9mIHRoZSBuZXcgbGlzdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3Qgd2hvc2UgY29udGVudHMgd2lsbCBiZSBhZGRlZCB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBvdXRwdXRcbiAqICAgICAgICBsaXN0LlxuICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGxpc3QgY29udGFpbmluZyB0aGUgY29udGVudHMgb2YgdGhlIG9sZCBsaXN0IGZvbGxvd2VkIGJ5IGBlbGAuXG4gKiBAc2VlIFIucHJlcGVuZFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuYXBwZW5kKCd0ZXN0cycsIFsnd3JpdGUnLCAnbW9yZSddKTsgLy89PiBbJ3dyaXRlJywgJ21vcmUnLCAndGVzdHMnXVxuICogICAgICBSLmFwcGVuZCgndGVzdHMnLCBbXSk7IC8vPT4gWyd0ZXN0cyddXG4gKiAgICAgIFIuYXBwZW5kKFsndGVzdHMnXSwgWyd3cml0ZScsICdtb3JlJ10pOyAvLz0+IFsnd3JpdGUnLCAnbW9yZScsIFsndGVzdHMnXV1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIGFwcGVuZChlbCwgbGlzdCkge1xuICByZXR1cm4gX2NvbmNhdChsaXN0LCBbZWxdKTtcbn0pO1xuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTQgUXVpbGRyZWVuIE1vdHRhIDxxdWlsZHJlZW5AZ21haWwuY29tPlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4vLyBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlc1xuLy8gKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuLy8gaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbi8vIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4vLyBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbi8vIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG4vLyBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXG4vLyBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFXG4vLyBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OXG4vLyBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbi8vIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vKipcbiAqIEBtb2R1bGUgbGliL21heWJlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gTWF5YmVcblxuLy8gLS0gQWxpYXNlcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG52YXIgY2xvbmUgICAgICAgICA9IE9iamVjdC5jcmVhdGVcbnZhciB1bmltcGxlbWVudGVkID0gZnVuY3Rpb24oKXsgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQuJykgfVxudmFyIG5vb3AgICAgICAgICAgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcyAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbi8vIC0tIEltcGxlbWVudGF0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKipcbiAqIEEgc3RydWN0dXJlIGZvciB2YWx1ZXMgdGhhdCBtYXkgbm90IGJlIHByZXNlbnQsIG9yIGNvbXB1dGF0aW9ucyB0aGF0IG1heVxuICogZmFpbC4gYE1heWJlKGEpYCBleHBsaWNpdGx5IG1vZGVscyB0aGUgZWZmZWN0cyB0aGF0IGFyZSBpbXBsaWNpdCBpblxuICogYE51bGxhYmxlYCB0eXBlcywgdGh1cyBoYXMgbm9uZSBvZiB0aGUgcHJvYmxlbXMgYXNzb2NpYXRlZCB3aXRoXG4gKiBgbnVsbGAgb3IgYHVuZGVmaW5lZGAg4oCUIGxpa2UgYE51bGxQb2ludGVyRXhjZXB0aW9uc2AuXG4gKlxuICogVGhlIGNsYXNzIG1vZGVscyB0d28gZGlmZmVyZW50IGNhc2VzOlxuICpcbiAqICArIGBKdXN0IGFgIOKAlCByZXByZXNlbnRzIGEgYE1heWJlKGEpYCB0aGF0IGNvbnRhaW5zIGEgdmFsdWUuIGBhYCBtYXlcbiAqICAgICBiZSBhbnkgdmFsdWUsIGluY2x1ZGluZyBgbnVsbGAgb3IgYHVuZGVmaW5lZGAuXG4gKlxuICogICsgYE5vdGhpbmdgIOKAlCByZXByZXNlbnRzIGEgYE1heWJlKGEpYCB0aGF0IGhhcyBubyB2YWx1ZXMuIE9yIGFcbiAqICAgICBmYWlsdXJlIHRoYXQgbmVlZHMgbm8gYWRkaXRpb25hbCBpbmZvcm1hdGlvbi5cbiAqXG4gKiBDb21tb24gdXNlcyBvZiB0aGlzIHN0cnVjdHVyZSBpbmNsdWRlcyBtb2RlbGxpbmcgdmFsdWVzIHRoYXQgbWF5IG9yIG1heVxuICogbm90IGJlIHByZXNlbnQgaW4gYSBjb2xsZWN0aW9uLCB0aHVzIGluc3RlYWQgb2YgbmVlZGluZyBhXG4gKiBgY29sbGVjdGlvbi5oYXMoYSlgLCB0aGUgYGNvbGxlY3Rpb24uZ2V0KGEpYCBvcGVyYXRpb24gZ2l2ZXMgeW91IGFsbFxuICogdGhlIGluZm9ybWF0aW9uIHlvdSBuZWVkIOKAlCBgY29sbGVjdGlvbi5nZXQoYSkuaXMtbm90aGluZ2AgYmVpbmdcbiAqIGVxdWl2YWxlbnQgdG8gYGNvbGxlY3Rpb24uaGFzKGEpYDsgU2ltaWxhcmx5IHRoZSBzYW1lIHJlYXNvbmluZyBtYXlcbiAqIGJlIGFwcGxpZWQgdG8gY29tcHV0YXRpb25zIHRoYXQgbWF5IGZhaWwgdG8gcHJvdmlkZSBhIHZhbHVlLCBlLmcuOlxuICogYGNvbGxlY3Rpb24uZmluZChwcmVkaWNhdGUpYCBjYW4gc2FmZWx5IHJldHVybiBhIGBNYXliZShhKWAgaW5zdGFuY2UsXG4gKiBldmVuIGlmIHRoZSBjb2xsZWN0aW9uIGNvbnRhaW5zIG51bGxhYmxlIHZhbHVlcy5cbiAqXG4gKiBGdXJ0aGVybW9yZSwgdGhlIHZhbHVlcyBvZiBgTWF5YmUoYSlgIGNhbiBiZSBjb21iaW5lZCBhbmQgbWFuaXB1bGF0ZWRcbiAqIGJ5IHVzaW5nIHRoZSBleHByZXNzaXZlIG1vbmFkaWMgb3BlcmF0aW9ucy4gVGhpcyBhbGxvd3Mgc2FmZWx5XG4gKiBzZXF1ZW5jaW5nIG9wZXJhdGlvbnMgdGhhdCBtYXkgZmFpbCwgYW5kIHNhZmVseSBjb21wb3NpbmcgdmFsdWVzIHRoYXRcbiAqIHlvdSBkb24ndCBrbm93IHdoZXRoZXIgdGhleSdyZSBwcmVzZW50IG9yIG5vdCwgZmFpbGluZyBlYXJseVxuICogKHJldHVybmluZyBhIGBOb3RoaW5nYCkgaWYgYW55IG9mIHRoZSBvcGVyYXRpb25zIGZhaWwuXG4gKlxuICogSWYgb25lIHdhbnRzIHRvIHN0b3JlIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gYWJvdXQgZmFpbHVyZXMsIHRoZVxuICogW0VpdGhlcl1bXSBhbmQgW1ZhbGlkYXRpb25dW10gc3RydWN0dXJlcyBwcm92aWRlIHN1Y2ggYSBjYXBhYmlsaXR5LCBhbmRcbiAqIHNob3VsZCBiZSB1c2VkIGluc3RlYWQgb2YgdGhlIGBNYXliZShhKWAgc3RydWN0dXJlLlxuICpcbiAqIFtFaXRoZXJdOiBodHRwczovL2dpdGh1Yi5jb20vZm9sa3RhbGUvZGF0YS5laXRoZXJcbiAqIFtWYWxpZGF0aW9uXTogaHR0cHM6Ly9naXRodWIuY29tL2ZvbGt0YWxlL2RhdGEudmFsaWRhdGlvblxuICpcbiAqXG4gKiBAY2xhc3NcbiAqL1xuZnVuY3Rpb24gTWF5YmUoKSB7fVxuXG4vLyBUaGUgY2FzZSBmb3Igc3VjY2Vzc2Z1bCB2YWx1ZXNcbkp1c3QucHJvdG90eXBlID0gY2xvbmUoTWF5YmUucHJvdG90eXBlKVxuZnVuY3Rpb24gSnVzdChhKXtcbiAgdGhpcy52YWx1ZSA9IGFcbn1cblxuLy8gVGhlIGNhc2UgZm9yIGZhaWx1cmUgdmFsdWVzXG5Ob3RoaW5nLnByb3RvdHlwZSA9IGNsb25lKE1heWJlLnByb3RvdHlwZSlcbmZ1bmN0aW9uIE5vdGhpbmcoKXt9XG5cblxuLy8gLS0gQ29uc3RydWN0b3JzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBgTWF5YmVbzrFdYCBzdHJ1Y3R1cmUgd2l0aCBhbiBhYnNlbnQgdmFsdWUuIENvbW1vbmx5IHVzZWRcbiAqIHRvIHJlcHJlc2VudCBhIGZhaWx1cmUuXG4gKlxuICogQHN1bW1hcnkgVm9pZCDihpIgTWF5YmVbzrFdXG4gKi9cbk1heWJlLk5vdGhpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBOb3RoaW5nXG59XG5NYXliZS5wcm90b3R5cGUuTm90aGluZyA9IE1heWJlLk5vdGhpbmdcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IGBNYXliZVvOsV1gIHN0cnVjdHVyZSB0aGF0IGhvbGRzIHRoZSBzaW5nbGUgdmFsdWVcbiAqIGDOsWAuIENvbW1vbmx5IHVzZWQgdG8gcmVwcmVzZW50IGEgc3VjY2Vzcy5cbiAqXG4gKiBgzrFgIGNhbiBiZSBhbnkgdmFsdWUsIGluY2x1ZGluZyBgbnVsbGAsIGB1bmRlZmluZWRgIG9yIGFub3RoZXJcbiAqIGBNYXliZVvOsV1gIHN0cnVjdHVyZS5cbiAqXG4gKiBAc3VtbWFyeSDOsSDihpIgTWF5YmVbzrFdXG4gKi9cbk1heWJlLkp1c3QgPSBmdW5jdGlvbihhKSB7XG4gIHJldHVybiBuZXcgSnVzdChhKVxufVxuTWF5YmUucHJvdG90eXBlLkp1c3QgPSBNYXliZS5KdXN0XG5cblxuLy8gLS0gQ29udmVyc2lvbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBgTWF5YmVbzrFdYCBzdHJ1Y3R1cmUgZnJvbSBhIG51bGxhYmxlIHR5cGUuXG4gKlxuICogSWYgdGhlIHZhbHVlIGlzIGVpdGhlciBgbnVsbGAgb3IgYHVuZGVmaW5lZGAsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyBhXG4gKiBgTm90aGluZ2AsIG90aGVyd2lzZSB0aGUgdmFsdWUgaXMgd3JhcHBlZCBpbiBhIGBKdXN0KM6xKWAuXG4gKlxuICogQHN1bW1hcnkgzrEg4oaSIE1heWJlW86xXVxuICovXG5NYXliZS5mcm9tTnVsbGFibGUgPSBmdW5jdGlvbihhKSB7XG4gIHJldHVybiBhICE9IG51bGw/ICAgICAgIG5ldyBKdXN0KGEpXG4gIDogICAgICAvKiBvdGhlcndpc2UgKi8gIG5ldyBOb3RoaW5nXG59XG5NYXliZS5wcm90b3R5cGUuZnJvbU51bGxhYmxlID0gTWF5YmUuZnJvbU51bGxhYmxlXG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBgTWF5YmVbzrJdYCBzdHJ1Y3R1cmUgZnJvbSBhbiBgRWl0aGVyW86xLCDOsl1gIHR5cGUuXG4gKlxuICogVGhlIGxlZnQgc2lkZSBvZiB0aGUgYEVpdGhlcmAgYmVjb21lcyBgTm90aGluZ2AsIGFuZCB0aGUgcmlnaHQgc2lkZVxuICogaXMgd3JhcHBlZCBpbiBhIGBKdXN0KM6yKWAuXG4gKlxuICogQHN1bW1hcnkgRWl0aGVyW86xLCDOsl0g4oaSIE1heWJlW86yXVxuICovXG5NYXliZS5mcm9tRWl0aGVyID0gZnVuY3Rpb24oYSkge1xuICByZXR1cm4gYS5mb2xkKE1heWJlLk5vdGhpbmcsIE1heWJlLkp1c3QpXG59XG5NYXliZS5wcm90b3R5cGUuZnJvbUVpdGhlciA9IE1heWJlLmZyb21FaXRoZXJcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IGBNYXliZVvOsl1gIHN0cnVjdHVyZSBmcm9tIGEgYFZhbGlkYXRpb25bzrEsIM6yXWAgdHlwZS5cbiAqXG4gKiBUaGUgZmFpbHVyZSBzaWRlIG9mIHRoZSBgVmFsaWRhdGlvbmAgYmVjb21lcyBgTm90aGluZ2AsIGFuZCB0aGUgcmlnaHRcbiAqIHNpZGUgaXMgd3JhcHBlZCBpbiBhIGBKdXN0KM6yKWAuXG4gKlxuICogQG1ldGhvZFxuICogQHN1bW1hcnkgVmFsaWRhdGlvblvOsSwgzrJdIOKGkiBNYXliZVvOsl1cbiAqL1xuTWF5YmUuZnJvbVZhbGlkYXRpb24gICAgICAgICAgID0gTWF5YmUuZnJvbUVpdGhlclxuTWF5YmUucHJvdG90eXBlLmZyb21WYWxpZGF0aW9uID0gTWF5YmUuZnJvbUVpdGhlclxuXG5cbi8vIC0tIFByZWRpY2F0ZXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKipcbiAqIFRydWUgaWYgdGhlIGBNYXliZVvOsV1gIHN0cnVjdHVyZSBjb250YWlucyBhIGZhaWx1cmUgKGkuZS46IGBOb3RoaW5nYCkuXG4gKlxuICogQHN1bW1hcnkgQm9vbGVhblxuICovXG5NYXliZS5wcm90b3R5cGUuaXNOb3RoaW5nICAgPSBmYWxzZVxuTm90aGluZy5wcm90b3R5cGUuaXNOb3RoaW5nID0gdHJ1ZVxuXG5cbi8qKlxuICogVHJ1ZSBpZiB0aGUgYE1heWJlW86xXWAgc3RydWN0dXJlIGNvbnRhaW5zIGEgc2luZ2xlIHZhbHVlIChpLmUuOiBgSnVzdCjOsSlgKS5cbiAqXG4gKiBAc3VtbWFyeSBCb29sZWFuXG4gKi9cbk1heWJlLnByb3RvdHlwZS5pc0p1c3QgPSBmYWxzZVxuSnVzdC5wcm90b3R5cGUuaXNKdXN0ICA9IHRydWVcblxuXG4vLyAtLSBBcHBsaWNhdGl2ZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGBNYXliZVvOsV1gIHN0cnVjdHVyZSBob2xkaW5nIHRoZSBzaW5nbGUgdmFsdWUgYM6xYC5cbiAqXG4gKiBgzrFgIGNhbiBiZSBhbnkgdmFsdWUsIGluY2x1ZGluZyBgbnVsbGAsIGB1bmRlZmluZWRgLCBvciBhbm90aGVyXG4gKiBgTWF5YmVbzrFdYCBzdHJ1Y3R1cmUuXG4gKlxuICogQHN1bW1hcnkgzrEg4oaSIE1heWJlW86xXVxuICovXG5NYXliZS5vZiA9IGZ1bmN0aW9uKGEpIHtcbiAgcmV0dXJuIG5ldyBKdXN0KGEpXG59XG5NYXliZS5wcm90b3R5cGUub2YgPSBNYXliZS5vZlxuXG5cbi8qKlxuICogQXBwbGllcyB0aGUgZnVuY3Rpb24gaW5zaWRlIHRoZSBgTWF5YmVbzrFdYCBzdHJ1Y3R1cmUgdG8gYW5vdGhlclxuICogYXBwbGljYXRpdmUgdHlwZS5cbiAqXG4gKiBUaGUgYE1heWJlW86xXWAgc3RydWN0dXJlIHNob3VsZCBjb250YWluIGEgZnVuY3Rpb24gdmFsdWUsIG90aGVyd2lzZSBhXG4gKiBgVHlwZUVycm9yYCBpcyB0aHJvd24uXG4gKlxuICogQG1ldGhvZFxuICogQHN1bW1hcnkgKEBNYXliZVvOsSDihpIgzrJdLCBmOkFwcGxpY2F0aXZlW19dKSA9PiBmW86xXSDihpIgZlvOsl1cbiAqL1xuTWF5YmUucHJvdG90eXBlLmFwID0gdW5pbXBsZW1lbnRlZFxuXG5Ob3RoaW5nLnByb3RvdHlwZS5hcCA9IG5vb3BcblxuSnVzdC5wcm90b3R5cGUuYXAgPSBmdW5jdGlvbihiKSB7XG4gIHJldHVybiBiLm1hcCh0aGlzLnZhbHVlKVxufVxuXG5cblxuXG4vLyAtLSBGdW5jdG9yIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2YWx1ZSBvZiB0aGUgYE1heWJlW86xXWAgc3RydWN0dXJlIHVzaW5nIGEgcmVndWxhciB1bmFyeVxuICogZnVuY3Rpb24uXG4gKlxuICogQG1ldGhvZFxuICogQHN1bW1hcnkgQE1heWJlW86xXSA9PiAozrEg4oaSIM6yKSDihpIgTWF5YmVbzrJdXG4gKi9cbk1heWJlLnByb3RvdHlwZS5tYXAgICA9IHVuaW1wbGVtZW50ZWRcbk5vdGhpbmcucHJvdG90eXBlLm1hcCA9IG5vb3BcblxuSnVzdC5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24oZikge1xuICByZXR1cm4gdGhpcy5vZihmKHRoaXMudmFsdWUpKVxufVxuXG5cbi8vIC0tIENoYWluIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZhbHVlIG9mIHRoZSBgTWF5YmVbzrFdYCBzdHJ1Y3R1cmUgdXNpbmcgYW4gdW5hcnkgZnVuY3Rpb25cbiAqIHRvIG1vbmFkcy5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAc3VtbWFyeSAoQE1heWJlW86xXSwgbTpNb25hZFtfXSkgPT4gKM6xIOKGkiBtW86yXSkg4oaSIG1bzrJdXG4gKi9cbk1heWJlLnByb3RvdHlwZS5jaGFpbiAgID0gdW5pbXBsZW1lbnRlZFxuTm90aGluZy5wcm90b3R5cGUuY2hhaW4gPSBub29wXG5cbkp1c3QucHJvdG90eXBlLmNoYWluID0gZnVuY3Rpb24oZikge1xuICByZXR1cm4gZih0aGlzLnZhbHVlKVxufVxuXG5cbi8vIC0tIFNob3cgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKipcbiAqIFJldHVybnMgYSB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBgTWF5YmVbzrFdYCBzdHJ1Y3R1cmUuXG4gKlxuICogQG1ldGhvZFxuICogQHN1bW1hcnkgQE1heWJlW86xXSA9PiBWb2lkIOKGkiBTdHJpbmdcbiAqL1xuTWF5YmUucHJvdG90eXBlLnRvU3RyaW5nID0gdW5pbXBsZW1lbnRlZFxuXG5Ob3RoaW5nLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ01heWJlLk5vdGhpbmcnXG59XG5cbkp1c3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnTWF5YmUuSnVzdCgnICsgdGhpcy52YWx1ZSArICcpJ1xufVxuXG5cbi8vIC0tIEVxIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKipcbiAqIFRlc3RzIGlmIGEgYE1heWJlW86xXWAgc3RydWN0dXJlIGlzIGVxdWFsIHRvIGFub3RoZXIgYE1heWJlW86xXWAgc3RydWN0dXJlLlxuICpcbiAqIEBtZXRob2RcbiAqIEBzdW1tYXJ5IEBNYXliZVvOsV0gPT4gTWF5YmVbzrFdIOKGkiBCb29sZWFuXG4gKi9cbk1heWJlLnByb3RvdHlwZS5pc0VxdWFsID0gdW5pbXBsZW1lbnRlZFxuXG5Ob3RoaW5nLnByb3RvdHlwZS5pc0VxdWFsID0gZnVuY3Rpb24oYikge1xuICByZXR1cm4gYi5pc05vdGhpbmdcbn1cblxuSnVzdC5wcm90b3R5cGUuaXNFcXVhbCA9IGZ1bmN0aW9uKGIpIHtcbiAgcmV0dXJuIGIuaXNKdXN0XG4gICYmICAgICBiLnZhbHVlID09PSB0aGlzLnZhbHVlXG59XG5cblxuLy8gLS0gRXh0cmFjdGluZyBhbmQgcmVjb3ZlcmluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qKlxuICogRXh0cmFjdHMgdGhlIHZhbHVlIG91dCBvZiB0aGUgYE1heWJlW86xXWAgc3RydWN0dXJlLCBpZiBpdFxuICogZXhpc3RzLiBPdGhlcndpc2UgdGhyb3dzIGEgYFR5cGVFcnJvcmAuXG4gKlxuICogQG1ldGhvZFxuICogQHN1bW1hcnkgQE1heWJlW86xXSA9PiBWb2lkIOKGkiBhLCAgICAgIDo6IHBhcnRpYWwsIHRocm93c1xuICogQHNlZSB7QGxpbmsgbW9kdWxlOmxpYi9tYXliZX5NYXliZSNnZXRPckVsc2V9IOKAlCBBIGdldHRlciB0aGF0IGNhbiBoYW5kbGUgZmFpbHVyZXNcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgdGhlIHN0cnVjdHVyZSBoYXMgbm8gdmFsdWUgKGBOb3RoaW5nYCkuXG4gKi9cbk1heWJlLnByb3RvdHlwZS5nZXQgPSB1bmltcGxlbWVudGVkXG5cbk5vdGhpbmcucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2FuJ3QgZXh0cmFjdCB0aGUgdmFsdWUgb2YgYSBOb3RoaW5nLlwiKVxufVxuXG5KdXN0LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudmFsdWVcbn1cblxuXG4vKipcbiAqIEV4dHJhY3RzIHRoZSB2YWx1ZSBvdXQgb2YgdGhlIGBNYXliZVvOsV1gIHN0cnVjdHVyZS4gSWYgdGhlcmUgaXMgbm8gdmFsdWUsXG4gKiByZXR1cm5zIHRoZSBnaXZlbiBkZWZhdWx0LlxuICpcbiAqIEBtZXRob2RcbiAqIEBzdW1tYXJ5IEBNYXliZVvOsV0gPT4gzrEg4oaSIM6xXG4gKi9cbk1heWJlLnByb3RvdHlwZS5nZXRPckVsc2UgPSB1bmltcGxlbWVudGVkXG5cbk5vdGhpbmcucHJvdG90eXBlLmdldE9yRWxzZSA9IGZ1bmN0aW9uKGEpIHtcbiAgcmV0dXJuIGFcbn1cblxuSnVzdC5wcm90b3R5cGUuZ2V0T3JFbHNlID0gZnVuY3Rpb24oXykge1xuICByZXR1cm4gdGhpcy52YWx1ZVxufVxuXG5cbi8qKlxuICogVHJhbnNmb3JtcyBhIGZhaWx1cmUgaW50byBhIG5ldyBgTWF5YmVbzrFdYCBzdHJ1Y3R1cmUuIERvZXMgbm90aGluZyBpZiB0aGVcbiAqIHN0cnVjdHVyZSBhbHJlYWR5IGNvbnRhaW5zIGEgdmFsdWUuXG4gKlxuICogQG1ldGhvZFxuICogQHN1bW1hcnkgQE1heWJlW86xXSA9PiAoVm9pZCDihpIgTWF5YmVbzrFdKSDihpIgTWF5YmVbzrFdXG4gKi9cbk1heWJlLnByb3RvdHlwZS5vckVsc2UgPSB1bmltcGxlbWVudGVkXG5cbk5vdGhpbmcucHJvdG90eXBlLm9yRWxzZSA9IGZ1bmN0aW9uKGYpIHtcbiAgcmV0dXJuIGYoKVxufVxuXG5KdXN0LnByb3RvdHlwZS5vckVsc2UgPSBmdW5jdGlvbihfKSB7XG4gIHJldHVybiB0aGlzXG59XG5cblxuLyoqXG4gKiBDYXRhbW9ycGhpc20uXG4gKiBcbiAqIEBtZXRob2RcbiAqIEBzdW1tYXJ5IEBNYXliZVvOsV0gPT4geyBOb3RoaW5nOiBWb2lkIOKGkiDOsiwgSnVzdDogzrEg4oaSIM6yIH0g4oaSIM6yXG4gKi9cbk1heWJlLnByb3RvdHlwZS5jYXRhID0gdW5pbXBsZW1lbnRlZFxuXG5Ob3RoaW5nLnByb3RvdHlwZS5jYXRhID0gZnVuY3Rpb24ocGF0dGVybikge1xuICByZXR1cm4gcGF0dGVybi5Ob3RoaW5nKClcbn1cblxuSnVzdC5wcm90b3R5cGUuY2F0YSA9IGZ1bmN0aW9uKHBhdHRlcm4pIHtcbiAgcmV0dXJuIHBhdHRlcm4uSnVzdCh0aGlzLnZhbHVlKTtcbn1cblxuXG4vKipcbiAqIEpTT04gc2VyaWFsaXNhdGlvblxuICpcbiAqIEBtZXRob2RcbiAqIEBzdW1tYXJ5IEBNYXliZVvOsV0gPT4gVm9pZCDihpIgT2JqZWN0XG4gKi9cbk1heWJlLnByb3RvdHlwZS50b0pTT04gPSB1bmltcGxlbWVudGVkXG5cbk5vdGhpbmcucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4geyAnI3R5cGUnOiAnZm9sa3RhbGU6TWF5YmUuTm90aGluZycgfVxufVxuXG5KdXN0LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHsgJyN0eXBlJzogJ2ZvbGt0YWxlOk1heWJlLkp1c3QnXG4gICAgICAgICAsIHZhbHVlOiB0aGlzLnZhbHVlIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxMy0yMDE0IFF1aWxkcmVlbiBNb3R0YSA8cXVpbGRyZWVuQGdtYWlsLmNvbT5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuLy8gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXNcbi8vICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbi8vIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4vLyBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuLy8gYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4vLyBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuLy8gRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORFxuLy8gTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRVxuLy8gTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTlxuLy8gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXG4vLyBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL21heWJlJykiLCJpbXBvcnQgeyBjdXJyeSwgcGlwZSwgcHJvcCwgb3ZlciwgYXBwZW5kIH0gZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBoaWRlQ29uZmlncywgU3RhdGVMZW5zZXMsIHB1c2hIaXN0b3J5U3RhdGUgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IE1heWJlIGZyb20gXCJkYXRhLm1heWJlXCI7XG5cbi8vIFN0YXRlIC0+IE9iamVjdCAtPiBTdGF0ZVxuY29uc3QgaGlzdG9yeVN0YXRlV2l0aE5ld0ZpZWxkID0gY3VycnkoKHN0YXRlLCBuZXdGaWVsZCkgPT4gcGlwZShcbiAgaGlkZUNvbmZpZ3MsXG4gIG92ZXIoU3RhdGVMZW5zZXMuZmllbGRzU3RhdGUsIGFwcGVuZChuZXdGaWVsZCkpXG4pKHN0YXRlKSk7XG5cbmV4cG9ydCBkZWZhdWx0IChzdGF0ZSwgeyBjcmVhdGVkRmllbGRTdGF0ZSB9KSA9PlxuICBNYXliZS5mcm9tTnVsbGFibGUoY3JlYXRlZEZpZWxkU3RhdGUpXG4gIC5tYXAoaGlzdG9yeVN0YXRlV2l0aE5ld0ZpZWxkKHN0YXRlKSlcbiAgLm1hcChwcm9wKFwiZmllbGRzU3RhdGVcIikpXG4gIC5tYXAocHVzaEhpc3RvcnlTdGF0ZShzdGF0ZSkpXG4gIC5nZXRPckVsc2Uoc3RhdGUpO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbmV3LWNhcCAqL1xuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCBNYXliZSBmcm9tIFwiZGF0YS5tYXliZVwiO1xuaW1wb3J0IEltbXV0YWJsZSBmcm9tIFwic2VhbWxlc3MtaW1tdXRhYmxlXCI7XG5pbXBvcnQgeyBwdXNoSGlzdG9yeVN0YXRlIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgdG9nZ2xlQ29uZmlnID0gZmllbGRTdGF0ZSA9PlxuICBJbW11dGFibGUoZmllbGRTdGF0ZSkuc2V0KFwiY29uZmlnU2hvd2luZ1wiLCAhZmllbGRTdGF0ZS5jb25maWdTaG93aW5nKTtcblxuY29uc3QgcmVwbGFjZUZpZWxkU3RhdGUgPSBjdXJyeSgoc3RhdGUsIGZpZWxkU3RhdGUpID0+XG4gIHN0YXRlXG4gICAgLmZpZWxkc1N0YXRlXG4gICAgLm1hcChhRmllbGQgPT4gYUZpZWxkLmlkID09PSBmaWVsZFN0YXRlLmlkXG4gICAgICA/IGZpZWxkU3RhdGVcbiAgICAgIDogYUZpZWxkXG4gICAgKVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlLCB7IGZpZWxkU3RhdGUgfSkgPT5cbiAgTWF5YmUuZnJvbU51bGxhYmxlKGZpZWxkU3RhdGUpXG4gIC5tYXAodG9nZ2xlQ29uZmlnKVxuICAubWFwKHJlcGxhY2VGaWVsZFN0YXRlKHN0YXRlKSlcbiAgLm1hcChwdXNoSGlzdG9yeVN0YXRlKHN0YXRlKSlcbiAgLmdldE9yRWxzZShzdGF0ZSk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuZXctY2FwICovXG5pbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IE1heWJlIGZyb20gXCJkYXRhLm1heWJlXCI7XG5pbXBvcnQgSW1tdXRhYmxlIGZyb20gXCJzZWFtbGVzcy1pbW11dGFibGVcIjtcbmltcG9ydCB7IHB1c2hIaXN0b3J5U3RhdGUgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5jb25zdCB0b2dnbGVSZXF1aXJlZCA9IGZpZWxkU3RhdGUgPT5cbiAgSW1tdXRhYmxlKGZpZWxkU3RhdGUpLnNldChcInJlcXVpcmVkXCIsICFmaWVsZFN0YXRlLnJlcXVpcmVkKTtcblxuY29uc3QgcmVwbGFjZUZpZWxkU3RhdGUgPSBjdXJyeSgoc3RhdGUsIGZpZWxkU3RhdGUpID0+XG4gIHN0YXRlXG4gICAgLmZpZWxkc1N0YXRlXG4gICAgLm1hcChhRmllbGQgPT4gYUZpZWxkLmlkID09PSBmaWVsZFN0YXRlLmlkXG4gICAgICA/IGZpZWxkU3RhdGVcbiAgICAgIDogYUZpZWxkXG4gICAgKVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlLCB7IGZpZWxkU3RhdGUgfSkgPT5cbiAgTWF5YmUuZnJvbU51bGxhYmxlKGZpZWxkU3RhdGUpXG4gIC5tYXAodG9nZ2xlUmVxdWlyZWQpXG4gIC5tYXAocmVwbGFjZUZpZWxkU3RhdGUoc3RhdGUpKVxuICAubWFwKHB1c2hIaXN0b3J5U3RhdGUoc3RhdGUpKVxuICAuZ2V0T3JFbHNlKHN0YXRlKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2ZpbHRlcihmbiwgbGlzdCkge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGlmIChmbihsaXN0W2lkeF0pKSB7XG4gICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBsaXN0W2lkeF07XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfaXNPYmplY3QoeCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBPYmplY3RdJztcbn07XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vX2N1cnJ5MicpO1xudmFyIF94ZkJhc2UgPSByZXF1aXJlKCcuL194ZkJhc2UnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gWEZpbHRlcihmLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLmYgPSBmO1xuICB9XG4gIFhGaWx0ZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYRmlsdGVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gX3hmQmFzZS5yZXN1bHQ7XG4gIFhGaWx0ZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24ocmVzdWx0LCBpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmYoaW5wdXQpID8gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KSA6IHJlc3VsdDtcbiAgfTtcblxuICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeGZpbHRlcihmLCB4ZikgeyByZXR1cm4gbmV3IFhGaWx0ZXIoZiwgeGYpOyB9KTtcbn0oKSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9kaXNwYXRjaGFibGUgPSByZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcbnZhciBfZmlsdGVyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fZmlsdGVyJyk7XG52YXIgX2lzT2JqZWN0ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNPYmplY3QnKTtcbnZhciBfcmVkdWNlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fcmVkdWNlJyk7XG52YXIgX3hmaWx0ZXIgPSByZXF1aXJlKCcuL2ludGVybmFsL194ZmlsdGVyJyk7XG52YXIga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG5cbi8qKlxuICogVGFrZXMgYSBwcmVkaWNhdGUgYW5kIGEgXCJmaWx0ZXJhYmxlXCIsIGFuZCByZXR1cm5zIGEgbmV3IGZpbHRlcmFibGUgb2YgdGhlXG4gKiBzYW1lIHR5cGUgY29udGFpbmluZyB0aGUgbWVtYmVycyBvZiB0aGUgZ2l2ZW4gZmlsdGVyYWJsZSB3aGljaCBzYXRpc2Z5IHRoZVxuICogZ2l2ZW4gcHJlZGljYXRlLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBmaWx0ZXJgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIEZpbHRlcmFibGUgZiA9PiAoYSAtPiBCb29sZWFuKSAtPiBmIGEgLT4gZiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkXG4gKiBAcGFyYW0ge0FycmF5fSBmaWx0ZXJhYmxlXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBzZWUgUi5yZWplY3QsIFIudHJhbnNkdWNlLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGlzRXZlbiA9IG4gPT4gbiAlIDIgPT09IDA7XG4gKlxuICogICAgICBSLmZpbHRlcihpc0V2ZW4sIFsxLCAyLCAzLCA0XSk7IC8vPT4gWzIsIDRdXG4gKlxuICogICAgICBSLmZpbHRlcihpc0V2ZW4sIHthOiAxLCBiOiAyLCBjOiAzLCBkOiA0fSk7IC8vPT4ge2I6IDIsIGQ6IDR9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKCdmaWx0ZXInLCBfeGZpbHRlciwgZnVuY3Rpb24ocHJlZCwgZmlsdGVyYWJsZSkge1xuICByZXR1cm4gKFxuICAgIF9pc09iamVjdChmaWx0ZXJhYmxlKSA/XG4gICAgICBfcmVkdWNlKGZ1bmN0aW9uKGFjYywga2V5KSB7XG4gICAgICAgIGlmIChwcmVkKGZpbHRlcmFibGVba2V5XSkpIHtcbiAgICAgICAgICBhY2Nba2V5XSA9IGZpbHRlcmFibGVba2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30sIGtleXMoZmlsdGVyYWJsZSkpIDpcbiAgICAvLyBlbHNlXG4gICAgICBfZmlsdGVyKHByZWQsIGZpbHRlcmFibGUpXG4gICk7XG59KSk7XG4iLCJpbXBvcnQgeyBjdXJyeSwgcHJvcCwgb3ZlciwgZmlsdGVyIH0gZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBTdGF0ZUxlbnNlcywgcHVzaEhpc3RvcnlTdGF0ZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgTWF5YmUgZnJvbSBcImRhdGEubWF5YmVcIjtcblxuLy8gU3RhdGUgLT4gT2JqZWN0IC0+IFN0YXRlXG5jb25zdCBoaXN0b3J5U3RhdGVXaXRob3V0RmllbGQgPSBjdXJyeSgoc3RhdGUsIGZpZWxkU3RhdGUpID0+XG4gIG92ZXIoXG4gICAgU3RhdGVMZW5zZXMuZmllbGRzU3RhdGUsXG4gICAgZmlsdGVyKGZzID0+IGZzLmlkICE9PSBmaWVsZFN0YXRlLmlkKSxcbiAgICBzdGF0ZVxuICApXG4pO1xuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGUsIHsgZmllbGRTdGF0ZSB9KSA9PlxuICBNYXliZS5mcm9tTnVsbGFibGUoZmllbGRTdGF0ZSlcbiAgLm1hcChoaXN0b3J5U3RhdGVXaXRob3V0RmllbGQoc3RhdGUpKVxuICAubWFwKHByb3AoXCJmaWVsZHNTdGF0ZVwiKSlcbiAgLm1hcChwdXNoSGlzdG9yeVN0YXRlKHN0YXRlKSlcbiAgLmdldE9yRWxzZShzdGF0ZSk7XG4iLCJpbXBvcnQgeyBjdXJyeSwgcHJvcCwgb3ZlciwgbWFwIH0gZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBTdGF0ZUxlbnNlcywgcHVzaEhpc3RvcnlTdGF0ZSwgdmFsaWRhdGVGaWVsZCB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbi8vIFN0YXRlIC0+IE9iamVjdCAtPiBTdGF0ZVxuY29uc3QgdXBkYXRlRmllbGRTdGF0ZSA9IGN1cnJ5KChzdGF0ZSwgbmV3RmllbGRTdGF0ZSkgPT5cbiAgb3ZlcihcbiAgICBTdGF0ZUxlbnNlcy5maWVsZHNTdGF0ZSxcbiAgICBtYXAoZnMgPT4gZnMuaWQgPT09IG5ld0ZpZWxkU3RhdGUuaWQgPyBuZXdGaWVsZFN0YXRlIDogZnMpLFxuICAgIHN0YXRlXG4gIClcbik7XG5cbmV4cG9ydCBkZWZhdWx0IChzdGF0ZSwgeyBuZXdGaWVsZFN0YXRlIH0pID0+XG4gIHZhbGlkYXRlRmllbGQobmV3RmllbGRTdGF0ZSkgLy8gRWl0aGVyXG4gIC5tYXAodXBkYXRlRmllbGRTdGF0ZShzdGF0ZSkpXG4gIC5tYXAocHJvcChcImZpZWxkc1N0YXRlXCIpKVxuICAubWFwKHB1c2hIaXN0b3J5U3RhdGUoc3RhdGUpKVxuICAubGVmdE1hcChjb25zb2xlLmVycm9yKVxuICAuZ2V0T3JFbHNlKHN0YXRlKTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX3NsaWNlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fc2xpY2UnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBjb3B5IG9mIHRoZSBsaXN0LCBzb3J0ZWQgYWNjb3JkaW5nIHRvIHRoZSBjb21wYXJhdG9yIGZ1bmN0aW9uLFxuICogd2hpY2ggc2hvdWxkIGFjY2VwdCB0d28gdmFsdWVzIGF0IGEgdGltZSBhbmQgcmV0dXJuIGEgbmVnYXRpdmUgbnVtYmVyIGlmIHRoZVxuICogZmlyc3QgdmFsdWUgaXMgc21hbGxlciwgYSBwb3NpdGl2ZSBudW1iZXIgaWYgaXQncyBsYXJnZXIsIGFuZCB6ZXJvIGlmIHRoZXlcbiAqIGFyZSBlcXVhbC4gUGxlYXNlIG5vdGUgdGhhdCB0aGlzIGlzIGEgKipjb3B5Kiogb2YgdGhlIGxpc3QuIEl0IGRvZXMgbm90XG4gKiBtb2RpZnkgdGhlIG9yaWdpbmFsLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEsYSAtPiBOdW1iZXIpIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBhcmF0b3IgQSBzb3J0aW5nIGZ1bmN0aW9uIDo6IGEgLT4gYiAtPiBJbnRcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gc29ydFxuICogQHJldHVybiB7QXJyYXl9IGEgbmV3IGFycmF5IHdpdGggaXRzIGVsZW1lbnRzIHNvcnRlZCBieSB0aGUgY29tcGFyYXRvciBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZGlmZiA9IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEgLSBiOyB9O1xuICogICAgICBSLnNvcnQoZGlmZiwgWzQsMiw3LDVdKTsgLy89PiBbMiwgNCwgNSwgN11cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIHNvcnQoY29tcGFyYXRvciwgbGlzdCkge1xuICByZXR1cm4gX3NsaWNlKGxpc3QpLnNvcnQoY29tcGFyYXRvcik7XG59KTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5ldy1jYXAgKi9cbmltcG9ydCB7IGN1cnJ5LCBwaXBlLCBwcm9wLCBvdmVyLCBzb3J0IH0gZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBoaWRlQ29uZmlncywgU3RhdGVMZW5zZXMsIHB1c2hIaXN0b3J5U3RhdGUgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IEVpdGhlciBmcm9tIFwiZGF0YS5laXRoZXJcIjtcblxuLy8gU3RhdGUgLT4gT2JqZWN0IC0+IFN0YXRlXG5jb25zdCBoaXN0b3J5U3RhdGVXaXRoTmV3T3JkZXIgPSBjdXJyeSgoc3RhdGUsIG5ld09yZGVyKSA9PiBwaXBlKFxuICBoaWRlQ29uZmlncyxcbiAgb3ZlcihcbiAgICBTdGF0ZUxlbnNlcy5maWVsZHNTdGF0ZSxcbiAgICBzb3J0KChmMSwgZjIpID0+IG5ld09yZGVyLmluZGV4T2YoZjEuaWQpIC0gbmV3T3JkZXIuaW5kZXhPZihmMi5pZCkpXG4gIClcbikoc3RhdGUpKTtcblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlLCB7IG5ld0ZpZWxkc09yZGVyIH0pID0+XG4gIChuZXdGaWVsZHNPcmRlciAmJiBBcnJheS5pc0FycmF5KG5ld0ZpZWxkc09yZGVyKVxuICAgID8gRWl0aGVyLlJpZ2h0KG5ld0ZpZWxkc09yZGVyKVxuICAgIDogRWl0aGVyLkxlZnQoYG5ld0ZpZWxkc09yZGVyIG11c3QgYmUgYW4gYXJyYXkgYnV0IHJlY2VpdmVkICR7dHlwZW9mIG5ld0ZpZWxkc09yZGVyfWApXG4gIClcbiAgLmNoYWluKG8gPT5cbiAgICBvLmxlbmd0aCA9PT0gc3RhdGUuZmllbGRzU3RhdGUubGVuZ3RoXG4gICAgICA/IEVpdGhlci5SaWdodChvKVxuICAgICAgOiBFaXRoZXIuTGVmdChgbmV3RmllbGRzT3JkZXIgaGFzICR7by5sZW5ndGh9IGVsZW1lbnRzLCBidXQgdGhlIGN1cnJlbnQgc3RhdGUgaGFzICR7c3RhdGUuZmllbGRzU3RhdGUubGVuZ3RofSBlbGVtZW50c2ApIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbWF4LWxlblxuICApXG4gIC5jaGFpbihvID0+IHtcbiAgICBjb25zdCBzdGF0ZUlkcyA9IHN0YXRlLmZpZWxkc1N0YXRlLm1hcChwcm9wKFwiaWRcIikpO1xuICAgIGNvbnN0IG5vTWlzc2luZ0lkID0gc3RhdGVJZHMucmVkdWNlKChhY2MsIGZJZCkgPT4gYWNjICYmIG8uaW5jbHVkZXMoZklkKSwgdHJ1ZSk7XG4gICAgcmV0dXJuIG5vTWlzc2luZ0lkXG4gICAgICA/IEVpdGhlci5SaWdodChvKVxuICAgICAgOiBFaXRoZXIuTGVmdChcIk5vdCBhbGwgaWRzIGluIHRoZSBuZXcgb3JkZXIgYXJlIG1hdGNoZWQgaW4gdGhlIGV4aXN0aW5nIHN0YXRlIGlkcy5cIik7XG4gIH0pXG4gIC5tYXAoaGlzdG9yeVN0YXRlV2l0aE5ld09yZGVyKHN0YXRlKSlcbiAgLm1hcChwcm9wKFwiZmllbGRzU3RhdGVcIikpXG4gIC5tYXAocHVzaEhpc3RvcnlTdGF0ZShzdGF0ZSkpXG4gIC5sZWZ0TWFwKGVyciA9PiBjb25zb2xlLmVycm9yKGBVbmFibGUgdG8gcmVvcmRlcjogJHtlcnJ9YCkpXG4gIC5nZXRPckVsc2Uoc3RhdGUpO1xuIiwiLyogQGZsb3cgd2VhayAqL1xuLyogZXNsaW50LWRpc2FibGUgbmV3LWNhcCAqL1xuaW1wb3J0IHsgU3RhdGVMZW5zZXMsIHByb3BlcnR5VHlwZUNoZWNrIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IG92ZXIsIHRyYXZlcnNlLCBjdXJyeSB9IGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IEVpdGhlciBmcm9tIFwiZGF0YS5laXRoZXJcIjtcblxuLy8gW2FdID0+IEVpdGhlciBTdHJpbmcgW2FdXG5jb25zdCBpc0FycmF5ID0gYXJyID0+XG4gIEFycmF5LmlzQXJyYXkoYXJyKVxuICAgID8gRWl0aGVyLlJpZ2h0KGFycilcbiAgICA6IEVpdGhlci5MZWZ0KGBFeHBlY3RlZCBBcnJheSBidXQgcmVjZWl2ZWQgJHt0eXBlb2YgYXJyfWApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG1heC1sZW5cblxuLy8gT2JqZWN0IC0+IEVpdGhlciBTdHJpbmcgT2JqZWN0XG5jb25zdCBoYXNSZXF1aXJlZEluZm8gPSBjb21wb25lbnQgPT5cbiAgcHJvcGVydHlUeXBlQ2hlY2soXCJpbml0aWFsU3RhdGVcIiwgXCJmdW5jdGlvblwiLCBjb21wb25lbnQpXG4gIC5jaGFpbihwcm9wZXJ0eVR5cGVDaGVjayhcIlJlbmRlckVkaXRvclwiLCBcImZ1bmN0aW9uXCIpKVxuICAuY2hhaW4ocHJvcGVydHlUeXBlQ2hlY2soXCJpbmZvXCIsIFwib2JqZWN0XCIpKVxuICAuY2hhaW4oYyA9PiBFaXRoZXIuZnJvbU51bGxhYmxlKGMuaW5mbykpXG4gIC5jaGFpbihwcm9wZXJ0eVR5cGVDaGVjayhcInR5cGVcIiwgXCJzdHJpbmdcIikpXG4gIC5jaGFpbihwcm9wZXJ0eVR5cGVDaGVjayhcImRpc3BsYXlOYW1lXCIsIFwic3RyaW5nXCIpKVxuICAuY2hhaW4ocHJvcGVydHlUeXBlQ2hlY2soXCJncm91cFwiLCBcInN0cmluZ1wiKSlcbiAgLmNoYWluKF8gPT4gRWl0aGVyLlJpZ2h0KGNvbXBvbmVudCkpO1xuXG5jb25zdCBpc0NvbXBvbmVudFZhbGlkID0gY3VzdG9tQ29tcG9uZW50cyA9PlxuICB0cmF2ZXJzZShFaXRoZXIub2YsIGhhc1JlcXVpcmVkSW5mbywgY3VzdG9tQ29tcG9uZW50cyk7XG5cbi8vIFthXSAtPiBbYV0gLT4gRWl0aGVyIFN0cmluZyBbYV1cbmNvbnN0IHZhbGlkYXRlQ29tcG9uZW50cyA9IGN1c3RvbUNvbXBvbmVudHMgPT5cbiAgRWl0aGVyLlJpZ2h0KGN1c3RvbUNvbXBvbmVudHMpXG4gICAgLmNoYWluKGlzQXJyYXkpXG4gICAgLmNoYWluKGlzQ29tcG9uZW50VmFsaWQpO1xuXG5jb25zdCBhZGRUb0ZpZWxkVHlwZXMgPSBjdXJyeSgoc3RhdGUsIGN1c3RvbUNvbXBvbmVudHMpID0+XG4gIG92ZXIoU3RhdGVMZW5zZXMuZmllbGRUeXBlcywgcyA9PiBzLmNvbmNhdChjdXN0b21Db21wb25lbnRzKSwgc3RhdGUpXG4pO1xuXG4vLyBJZiB0aGVyZSBhcmUgYW55IHByb2JsZW1zIHdpdGggdGhlIGltcG9ydCwgdGhlIHNhbWUgc3RhdGVcbi8vIHdpbGwgYmUgcmV0dXJuZWRcbmV4cG9ydCBkZWZhdWx0IChzdGF0ZSwgeyBjdXN0b21Db21wb25lbnRzIH0pID0+XG4gIChjdXN0b21Db21wb25lbnRzXG4gICAgPyBFaXRoZXIuUmlnaHQoY3VzdG9tQ29tcG9uZW50cylcbiAgICA6IEVpdGhlci5MZWZ0KFwiRW1wdHkgY3VzdG9tIGNvbXBvbmVudHNcIilcbiAgKVxuICAgIC5jaGFpbih2YWxpZGF0ZUNvbXBvbmVudHMpXG4gICAgLmxlZnRNYXAoZXJyID0+IGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIGN1c3RvbSBjb21wb25lbnRzOlwiLCBlcnIpKVxuICAgIC5tYXAoYWRkVG9GaWVsZFR5cGVzKHN0YXRlKSlcbiAgICAuZ2V0T3JFbHNlKHN0YXRlKTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5pbXBvcnQgYXNzZXJ0IGZyb20gXCJmbC1hc3NlcnRcIjtcbmltcG9ydCB1bmRvIGZyb20gXCIuL3VuZG9cIjtcbmltcG9ydCBpbXBvcnRTdGF0ZSBmcm9tIFwiLi9pbXBvcnRTdGF0ZVwiO1xuaW1wb3J0IGNyZWF0ZUZpZWxkIGZyb20gXCIuL2NyZWF0ZUZpZWxkXCI7XG5pbXBvcnQgZmllbGRDcmVhdGVkIGZyb20gXCIuL2ZpZWxkQ3JlYXRlZFwiO1xuaW1wb3J0IHRvZ2dsZUNvbmZpZyBmcm9tIFwiLi9maWVsZC50b2dnbGVDb25maWdcIjtcbmltcG9ydCB0b2dnbGVSZXF1aXJlZCBmcm9tIFwiLi9maWVsZC50b2dnbGVSZXF1aXJlZFwiO1xuaW1wb3J0IGRlbGV0ZUZpZWxkIGZyb20gXCIuL2ZpZWxkLmRlbGV0ZUZpZWxkXCI7XG5pbXBvcnQgdXBkYXRlRmllbGQgZnJvbSBcIi4vZmllbGQudXBkYXRlRmllbGRcIjtcbmltcG9ydCByZW9yZGVyRmllbGRzIGZyb20gXCIuL3Jlb3JkZXJGaWVsZHNcIjtcbmltcG9ydCBpbXBvcnRDdXN0b21Db21wb25lbnRzIGZyb20gXCIuL2ltcG9ydEN1c3RvbUNvbXBvbmVudHNcIjtcblxuY29uc3QgYWN0aW9uSGFuZGxlcnMgPSB7XG4gIHVuZG8sXG4gIGltcG9ydFN0YXRlLFxuICBjcmVhdGVGaWVsZCxcbiAgZmllbGRDcmVhdGVkLFxuICB0b2dnbGVDb25maWcsXG4gIHRvZ2dsZVJlcXVpcmVkLFxuICBkZWxldGVGaWVsZCxcbiAgdXBkYXRlRmllbGQsXG4gIHJlb3JkZXJGaWVsZHMsXG4gIGltcG9ydEN1c3RvbUNvbXBvbmVudHMsXG59O1xuXG5jb25zdCBpc0V4cGVjdGVkQWN0aW9uID0gYSA9PiBhICYmIGEudHlwZSAmJiBhY3Rpb25IYW5kbGVyc1thLnR5cGVdO1xuY29uc3QgaXNSZWR1eEFjdGlvbiA9IGEgPT4gYSAmJiBhLnR5cGUgJiYgYS50eXBlLmluY2x1ZGVzKFwiQEByZWR1eFwiKTtcblxuXG5jb25zdCB1cGRhdGUgPSAoc3RhdGUsIGFjdGlvbikgPT5cbiAgaXNFeHBlY3RlZEFjdGlvbihhY3Rpb24pXG4gICAgPyBhY3Rpb25IYW5kbGVyc1thY3Rpb24udHlwZV0oc3RhdGUsIGFjdGlvbilcbiAgOiBpc1JlZHV4QWN0aW9uKGFjdGlvbilcbiAgICA/IHN0YXRlXG4gIDogYXNzZXJ0KGZhbHNlLCBgSW52YWxpZCBhY3Rpb24gdHlwZTogJHthY3Rpb24udHlwZX1gKTtcblxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlO1xuIiwiLyogZXNsaW50LWVudiBqYXNtaW5lICovXG5cbmltcG9ydCB7IHVuZG8gYXMgdW5kb0FjdGlvbiB9IGZyb20gXCIuLi8uLi9qcy9BY3Rpb25zXCI7XG5pbXBvcnQgdXBkYXRlIGZyb20gXCIuLi8uLi9qcy9VcGRhdGVcIjtcblxuY29uc3QgY3VycmVudEZpZWxkc1N0YXRlID0gW1wiY3VycmVudFwiXTtcbmNvbnN0IG9sZEZpZWxkc1N0YXRlID0gW1wib2xkXCJdO1xuY29uc3QgbW9ja1N0YXRlID0ge1xuICBmaWVsZFR5cGVzOiBbXSxcbiAgZmllbGRzU3RhdGU6IGN1cnJlbnRGaWVsZHNTdGF0ZSxcbiAgZmllbGRzU3RhdGVIaXN0b3J5OiBbb2xkRmllbGRzU3RhdGVdLFxufTtcblxuY29uc3QgZW1wdHlNb2NrU3RhdGUgPSB7XG4gIGZpZWxkVHlwZXM6IFtdLFxuICBmaWVsZHNTdGF0ZTogW10sXG4gIGZpZWxkc1N0YXRlSGlzdG9yeTogW10sXG59O1xuXG5jb25zdCBlbXB0eUhpc3RvcnlNb2NrU3RhdGUgPSB7XG4gIGZpZWxkVHlwZXM6IFtdLFxuICBmaWVsZHNTdGF0ZTogY3VycmVudEZpZWxkc1N0YXRlLFxuICBmaWVsZHNTdGF0ZUhpc3Rvcnk6IFtdLFxufTtcblxuZGVzY3JpYmUoXCJVcGRhdGUudW5kb1wiLCAoKSA9PiB7XG4gIGl0KFwicmVtb3ZlcyBmaXJzdCBvbGQgc3RhdGUgZnJvbSBoaXN0b3J5XCIsICgpID0+IHtcbiAgICBjb25zdCBtb2RpZmllZFN0YXRlID0gdXBkYXRlKG1vY2tTdGF0ZSwgdW5kb0FjdGlvbigpKTtcbiAgICBleHBlY3QobW9kaWZpZWRTdGF0ZS5maWVsZHNTdGF0ZUhpc3RvcnkubGVuZ3RoKS50b0VxdWFsKDApO1xuICB9KTtcblxuICBpdChcInNldHMgZmlyc3Qgb2xkIHN0YXRlIGFzIGN1cnJlbnQgc3RhdGVcIiwgKCkgPT4ge1xuICAgIGNvbnN0IG1vZGlmaWVkU3RhdGUgPSB1cGRhdGUobW9ja1N0YXRlLCB1bmRvQWN0aW9uKCkpO1xuICAgIGV4cGVjdChtb2RpZmllZFN0YXRlLmZpZWxkc1N0YXRlKS50b0VxdWFsKG9sZEZpZWxkc1N0YXRlKTtcbiAgfSk7XG5cbiAgaXQoXCJkb2Vzbid0IG1vZGlmeSB0aGUgc3RhdGUgaWYgdGhlcmUgYXJlbid0IG1vcmUgaGlzdG9yeSBzdGF0ZXMgdG8gdW5kb1wiLCAoKSA9PiB7XG4gICAgY29uc3QgbW9kaWZpZWRTdGF0ZSA9IHVwZGF0ZShlbXB0eU1vY2tTdGF0ZSwgdW5kb0FjdGlvbigpKTtcbiAgICBleHBlY3QobW9kaWZpZWRTdGF0ZSkudG9FcXVhbChlbXB0eU1vY2tTdGF0ZSk7XG4gIH0pO1xuXG4gIGl0KFwic2V0J3MgdGhlIGN1cnJlbnQgc3RhdGUgdG8gZW1wdHkgaWYgdGhlcmUgYXJlIG5vIG1vcmUgaGlzdG9yeSBzdGF0ZXNcIiwgKCkgPT4ge1xuICAgIGNvbnN0IG1vZGlmaWVkU3RhdGUgPSB1cGRhdGUoZW1wdHlIaXN0b3J5TW9ja1N0YXRlLCB1bmRvQWN0aW9uKCkpO1xuICAgIGV4cGVjdChtb2RpZmllZFN0YXRlLmZpZWxkc1N0YXRlLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgfSk7XG59KTtcbiIsIi8qIGVzbGludC1lbnYgamFzbWluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgcXVvdGUtcHJvcHMgKi9cblxuaW1wb3J0IHsgaW1wb3J0U3RhdGUgfSBmcm9tIFwiLi4vLi4vanMvQWN0aW9uc1wiO1xuaW1wb3J0IHVwZGF0ZSBmcm9tIFwiLi4vLi4vanMvVXBkYXRlXCI7XG5cbmNvbnN0IHR5cGVzQXJyYXkgPSBbe1xuICBcImluZm9cIjoge1xuICAgIFwidHlwZVwiOiBcIlJhZGlvQnV0dG9uc1wiLFxuICB9LFxufSwge1xuICBcImluZm9cIjoge1xuICAgIFwidHlwZVwiOiBcIkNoZWNrYm94ZXNcIixcbiAgfSxcbn0sIHtcbiAgXCJpbmZvXCI6IHtcbiAgICBcInR5cGVcIjogXCJEcm9wZG93blwiLFxuICB9LFxufSwge1xuICBcImluZm9cIjoge1xuICAgIFwidHlwZVwiOiBcIlRleHRCb3hcIixcbiAgfSxcbn0sIHtcbiAgXCJpbmZvXCI6IHtcbiAgICBcInR5cGVcIjogXCJFbWFpbEJveFwiLFxuICB9LFxufSwge1xuICBcImluZm9cIjoge1xuICAgIFwidHlwZVwiOiBcIlRlbGVwaG9uZUJveFwiLFxuICB9LFxufSwge1xuICBcImluZm9cIjoge1xuICAgIFwidHlwZVwiOiBcIk51bWJlckJveFwiLFxuICB9LFxufSwge1xuICBcImluZm9cIjoge1xuICAgIFwidHlwZVwiOiBcIlRleHRBcmVhXCIsXG4gIH0sXG59LCB7XG4gIFwiaW5mb1wiOiB7XG4gICAgXCJ0eXBlXCI6IFwiRGF0ZUZpZWxkXCIsXG4gIH0sXG59XTtcblxuY29uc3QgbW9ja0N1cnJlbnRTdGF0ZSA9IFtcImFcIiwgXCJiXCJdO1xuY29uc3QgbW9ja0hpc3RvcnkgPSBbXTtcbmNvbnN0IG1vY2tTdGF0ZSA9IHtcbiAgZmllbGRUeXBlczogdHlwZXNBcnJheSxcbiAgZmllbGRzU3RhdGU6IG1vY2tDdXJyZW50U3RhdGUsXG4gIGZpZWxkc1N0YXRlSGlzdG9yeTogbW9ja0hpc3RvcnksXG59O1xuXG5jb25zdCBuZXdWYWxpZFN0YXRlID0gW3tcbiAgXCJ0eXBlXCI6IFwiQ2hlY2tib3hlc1wiLFxuICBcImRpc3BsYXlOYW1lXCI6IFwiQ2hlY2tib3hlc1wiLFxuICBcImdyb3VwXCI6IFwiT3B0aW9ucyBDb21wb25lbnRzXCIsXG4gIFwiaHRtbElucHV0VHlwZVwiOiBcImNoZWNrYm94XCIsXG4gIFwidGl0bGVcIjogXCJBZGQgYSB0aXRsZVwiLFxuICBcImlkXCI6IDIsXG4gIFwib3B0aW9uc1wiOiBbe1xuICAgIFwiY2FwdGlvblwiOiBcIkluc2VydCBhbiBvcHRpb25cIixcbiAgfV0sXG4gIFwibmV3T3B0aW9uQ2FwdGlvblwiOiBcIlwiLFxufV07XG5cbmNvbnN0IG5ld0ludmFsaWRTdGF0ZSA9IFt7XG4gIFwidHlwZVwiOiBcIkludmFsaWQgdHlwZVwiLFxuICBcImRpc3BsYXlOYW1lXCI6IFwiQ2hlY2tib3hlc1wiLFxuICBcImdyb3VwXCI6IFwiT3B0aW9ucyBDb21wb25lbnRzXCIsXG4gIFwiaHRtbElucHV0VHlwZVwiOiBcImNoZWNrYm94XCIsXG4gIFwidGl0bGVcIjogXCJBZGQgYSB0aXRsZVwiLFxuICBcIm9wdGlvbnNcIjogW3tcbiAgICBcImNhcHRpb25cIjogXCJJbnNlcnQgYW4gb3B0aW9uXCIsXG4gIH1dLFxuICBcIm5ld09wdGlvbkNhcHRpb25cIjogXCJcIixcbn1dO1xuXG5kZXNjcmliZShcIlVwZGF0ZS5pbXBvcnRTdGF0ZVwiLCAoKSA9PiB7XG4gIGl0KFwiUmV0dXJucyBhbiB1bmNoYW5nZWQgYXJyYXkgaWYgdGhlIG5ldyBzdGF0ZSBpcyBpbnZhbGlkXCIsICgpID0+IHtcbiAgICBleHBlY3QodXBkYXRlKG1vY2tTdGF0ZSwgaW1wb3J0U3RhdGUoe30pKSkudG9FcXVhbChtb2NrU3RhdGUpO1xuICAgIGV4cGVjdCh1cGRhdGUobW9ja1N0YXRlLCBpbXBvcnRTdGF0ZShudWxsKSkpLnRvRXF1YWwobW9ja1N0YXRlKTtcbiAgfSk7XG5cbiAgaXQoXCJSZXR1cm5zIGFuIHVuY2hhbmdlZCBhcnJheSBpZiB0aGUgYSBmaWVsZCdzIHR5cGUgaXMgbm90IGluIGZpZWxkVHlwZXNcIiwgKCkgPT4ge1xuICAgIGV4cGVjdCh1cGRhdGUobW9ja1N0YXRlLCBpbXBvcnRTdGF0ZShuZXdJbnZhbGlkU3RhdGUpKSkudG9FcXVhbChtb2NrU3RhdGUpO1xuICB9KTtcblxuICBpdChcIlNlbmRzIHRoZSBsYXN0IGN1cnJlbnQgc3RhdGUgdG8gdGhlIGhpc3RvcnlcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHVwZGF0ZWQgPSB1cGRhdGUobW9ja1N0YXRlLCBpbXBvcnRTdGF0ZShuZXdWYWxpZFN0YXRlKSk7XG4gICAgZXhwZWN0KHVwZGF0ZWQuZmllbGRzU3RhdGVIaXN0b3J5WzBdLnRvU3RyaW5nKCkpLnRvRXF1YWwobW9ja0N1cnJlbnRTdGF0ZS50b1N0cmluZygpKTtcbiAgICBleHBlY3QodXBkYXRlZC5maWVsZHNTdGF0ZUhpc3RvcnkubGVuZ3RoKS50b0VxdWFsKG1vY2tIaXN0b3J5Lmxlbmd0aCArIDEpO1xuICB9KTtcblxuICBpdChcIlNldHMgdGhlIG5ldyBzdGF0ZSBhcyBjdXJyZW50XCIsICgpID0+IHtcbiAgICBjb25zdCB1cGRhdGVkID0gdXBkYXRlKG1vY2tTdGF0ZSwgaW1wb3J0U3RhdGUobmV3VmFsaWRTdGF0ZSkpO1xuICAgIGV4cGVjdCh1cGRhdGVkLmZpZWxkc1N0YXRlWzBdLnR5cGUpLnRvRXF1YWwobmV3VmFsaWRTdGF0ZVswXS50eXBlKTtcbiAgICBleHBlY3QodXBkYXRlZC5maWVsZHNTdGF0ZVswXS50eXBlKS5ub3QudG9FcXVhbCh1bmRlZmluZWQpO1xuICAgIGV4cGVjdCh1cGRhdGVkLmZpZWxkc1N0YXRlWzBdLmRpc3BsYXlOYW1lKS50b0VxdWFsKG5ld1ZhbGlkU3RhdGVbMF0uZGlzcGxheU5hbWUpO1xuICAgIGV4cGVjdCh1cGRhdGVkLmZpZWxkc1N0YXRlWzBdLmRpc3BsYXlOYW1lKS5ub3QudG9FcXVhbCh1bmRlZmluZWQpO1xuICAgIGV4cGVjdCh1cGRhdGVkLmZpZWxkc1N0YXRlWzBdLmdyb3VwKS50b0VxdWFsKG5ld1ZhbGlkU3RhdGVbMF0uZ3JvdXApO1xuICAgIGV4cGVjdCh1cGRhdGVkLmZpZWxkc1N0YXRlWzBdLmdyb3VwKS5ub3QudG9FcXVhbCh1bmRlZmluZWQpO1xuICB9KTtcblxuICBpdChcIk1ha2VzIHN1cmUgYWxsIGlkcyBhcmUgc3RyaW5nc1wiLCAoKSA9PiB7XG4gICAgY29uc3QgdmFsaWRTdGF0ZTIgPSBuZXdWYWxpZFN0YXRlXG4gICAgICAubWFwKCh2LCBpZHgpID0+IGlkeCAhPT0gMCA/IHYgOiBPYmplY3QuYXNzaWduKHt9LCB2LCB7IGlkOiAyIH0pKTtcbiAgICBjb25zdCB1cGRhdGVkID0gdXBkYXRlKG1vY2tTdGF0ZSwgaW1wb3J0U3RhdGUodmFsaWRTdGF0ZTIpKTtcbiAgICBleHBlY3QodHlwZW9mIHVwZGF0ZWQuZmllbGRzU3RhdGVbMF0uaWQpLnRvRXF1YWwoXCJzdHJpbmdcIik7XG4gIH0pO1xufSk7XG4iLCIvKiBlc2xpbnQtZW52IGphc21pbmUgKi9cbi8qIGVzbGludC1kaXNhYmxlIHF1b3RlLXByb3BzICovXG5cbmltcG9ydCB7IGNyZWF0ZUZpZWxkIH0gZnJvbSBcIi4uLy4uL2pzL0FjdGlvbnNcIjtcbmltcG9ydCB1cGRhdGUgZnJvbSBcIi4uLy4uL2pzL1VwZGF0ZVwiO1xuXG5jb25zdCBwcm9taXNlVHlwZUluc3RhbmNlID0geyB0eXBlOiBcInByb21pc2UtaW5zdGFuY2VcIiB9O1xuY29uc3QgcHJvbWlzZVR5cGUgPSB7XG4gIGluZm86IHsgdHlwZTogXCJQcm9taXNlVHlwZVwiIH0sXG4gIGluaXRpYWxTdGF0ZTogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHByb21pc2VUeXBlSW5zdGFuY2UpLFxufTtcblxuY29uc3Qgc3luY1R5cGVJbnN0YW5jZSA9IHsgdHlwZTogXCJzeW5jLWluc3RhbmNlXCIgfTtcbmNvbnN0IHN5bmNUeXBlID0ge1xuICBpbmZvOiB7IHR5cGU6IFwiU3luY1R5cGVcIiB9LFxuICBpbml0aWFsU3RhdGU6ICgpID0+IHN5bmNUeXBlSW5zdGFuY2UsXG59O1xuXG5jb25zdCB0eXBlc0FycmF5ID0gW3Byb21pc2VUeXBlLCBzeW5jVHlwZV07XG5jb25zdCBtb2NrQ3VycmVudFN0YXRlID0gW1wiYVwiLCBcImJcIl07XG5jb25zdCBtb2NrSGlzdG9yeSA9IFtdO1xuY29uc3QgbW9ja1N0YXRlID0ge1xuICBmaWVsZFR5cGVzOiB0eXBlc0FycmF5LFxuICBmaWVsZHNTdGF0ZTogbW9ja0N1cnJlbnRTdGF0ZSxcbiAgZmllbGRzU3RhdGVIaXN0b3J5OiBtb2NrSGlzdG9yeSxcbn07XG5cbmRlc2NyaWJlKFwiVXBkYXRlLmNyZWF0ZUZpZWxkXCIsICgpID0+IHtcbiAgaXQoXCJjcmVhdGVzIGZpZWxkcyBhc3luY2hyb25vdXNseVwiLCBkb25lID0+IHtcbiAgICBjb25zdCBhc3luY0Rpc3BhdGNoID0gdiA9PiB7XG4gICAgICBleHBlY3Qodikubm90LnRvRXF1YWwodW5kZWZpbmVkKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgYXN5bmNBY2lvbiA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7IGFzeW5jRGlzcGF0Y2ggfSxcbiAgICAgIGNyZWF0ZUZpZWxkKHN5bmNUeXBlLmluZm8udHlwZSlcbiAgICApO1xuXG4gICAgdXBkYXRlKG1vY2tTdGF0ZSwgYXN5bmNBY2lvbik7XG4gIH0pO1xuXG4gIGl0KFwicmV0dXJucyBhICdmaWVsZENyZWF0ZWQnIGFjdGlvbiB3aGVuIGZpZWxkIGlzIGNyZWF0ZWRcIiwgZG9uZSA9PiB7XG4gICAgY29uc3QgYXN5bmNEaXNwYXRjaCA9IGFjdGlvbiA9PiB7XG4gICAgICBleHBlY3QoYWN0aW9uLnR5cGUpLnRvRXF1YWwoXCJmaWVsZENyZWF0ZWRcIik7XG4gICAgICBkb25lKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGFzeW5jQWNpb24gPSBPYmplY3QuYXNzaWduKFxuICAgICAgeyBhc3luY0Rpc3BhdGNoIH0sXG4gICAgICBjcmVhdGVGaWVsZChzeW5jVHlwZS5pbmZvLnR5cGUpXG4gICAgKTtcblxuICAgIHVwZGF0ZShtb2NrU3RhdGUsIGFzeW5jQWNpb24pO1xuICB9KTtcblxuICBpdChcImNyZWF0ZXMgdHlwZXMgd2l0aCBjb25zdHJ1Y3RvcnMgdGhhdCByZXR1cm4gYSBwbGFpbiBvYmplY3RcIiwgZG9uZSA9PiB7XG4gICAgY29uc3QgYXN5bmNEaXNwYXRjaCA9IGFjdGlvbiA9PiB7XG4gICAgICBleHBlY3QoYWN0aW9uLmNyZWF0ZWRGaWVsZFN0YXRlKS5ub3QudG9FcXVhbCh1bmRlZmluZWQpO1xuICAgICAgZXhwZWN0KGFjdGlvbi5jcmVhdGVkRmllbGRTdGF0ZS50eXBlKS50b0VxdWFsKHN5bmNUeXBlSW5zdGFuY2UudHlwZSk7XG4gICAgICBkb25lKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGFzeW5jQWNpb24gPSBPYmplY3QuYXNzaWduKFxuICAgICAgeyBhc3luY0Rpc3BhdGNoIH0sXG4gICAgICBjcmVhdGVGaWVsZChzeW5jVHlwZS5pbmZvLnR5cGUpXG4gICAgKTtcblxuICAgIHVwZGF0ZShtb2NrU3RhdGUsIGFzeW5jQWNpb24pO1xuICB9KTtcblxuICBpdChcImNyZWF0ZXMgdHlwZXMgd2l0aCBjb25zdHJ1Y3RvcnMgdGhhdCByZXR1cm4gYSBwcm9taXNlXCIsIGRvbmUgPT4ge1xuICAgIGNvbnN0IGFzeW5jRGlzcGF0Y2ggPSBhY3Rpb24gPT4ge1xuICAgICAgZXhwZWN0KGFjdGlvbi5jcmVhdGVkRmllbGRTdGF0ZSkubm90LnRvRXF1YWwodW5kZWZpbmVkKTtcbiAgICAgIGV4cGVjdChhY3Rpb24uY3JlYXRlZEZpZWxkU3RhdGUudHlwZSkudG9FcXVhbChwcm9taXNlVHlwZUluc3RhbmNlLnR5cGUpO1xuICAgICAgZG9uZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBhc3luY0FjaW9uID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHsgYXN5bmNEaXNwYXRjaCB9LFxuICAgICAgY3JlYXRlRmllbGQocHJvbWlzZVR5cGUuaW5mby50eXBlKVxuICAgICk7XG5cbiAgICB1cGRhdGUobW9ja1N0YXRlLCBhc3luY0FjaW9uKTtcbiAgfSk7XG5cbiAgaXQoXCJhZGRzIHJlcXVpcmVkIGZpZWxkcyB0byBpbnN0YW5jZVwiLCBkb25lID0+IHtcbiAgICBjb25zdCBhc3luY0Rpc3BhdGNoID0gYWN0aW9uID0+IHtcbiAgICAgIGV4cGVjdChhY3Rpb24uY3JlYXRlZEZpZWxkU3RhdGUuaWQpLm5vdC50b0VxdWFsKHVuZGVmaW5lZCk7XG4gICAgICBleHBlY3QodHlwZW9mIGFjdGlvbi5jcmVhdGVkRmllbGRTdGF0ZS5jb25maWdTaG93aW5nKS50b0VxdWFsKFwiYm9vbGVhblwiKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgYXN5bmNBY2lvbiA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7IGFzeW5jRGlzcGF0Y2ggfSxcbiAgICAgIGNyZWF0ZUZpZWxkKHByb21pc2VUeXBlLmluZm8udHlwZSlcbiAgICApO1xuXG4gICAgdXBkYXRlKG1vY2tTdGF0ZSwgYXN5bmNBY2lvbik7XG4gIH0pO1xuXG4gIGl0KFwiZG9lcyBub3QgY3JlYXRlIGEgZmllbGQgaWYgdHlwZSBpcyBub3QgaW4gbW9kZWwuZmllbGRUeXBlc1wiLCBkb25lID0+IHtcbiAgICBjb25zdCBhc3luY0Rpc3BhdGNoID0gamFzbWluZS5jcmVhdGVTcHkoXCJhc3luY0Rpc3BhdGNoXCIpO1xuXG4gICAgY29uc3QgYXN5bmNBY2lvbiA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7IGFzeW5jRGlzcGF0Y2ggfSxcbiAgICAgIGNyZWF0ZUZpZWxkKFwibm9uLWV4aXN0aW5nLXR5cGVcIilcbiAgICApO1xuXG4gICAgdXBkYXRlKG1vY2tTdGF0ZSwgYXN5bmNBY2lvbik7XG5cbiAgICBzZXRUaW1lb3V0KFxuICAgICAgKCkgPT4geyBleHBlY3QoYXN5bmNEaXNwYXRjaCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTsgZG9uZSgpOyB9LFxuICAgICAgNTBcbiAgICApO1xuICB9KTtcbn0pO1xuIiwiLyogZXNsaW50LWVudiBqYXNtaW5lICovXG4vKiBlc2xpbnQtZGlzYWJsZSBxdW90ZS1wcm9wcyAqL1xuXG5pbXBvcnQgeyBmaWVsZENyZWF0ZWQgfSBmcm9tIFwiLi4vLi4vanMvQWN0aW9uc1wiO1xuaW1wb3J0IHVwZGF0ZSBmcm9tIFwiLi4vLi4vanMvVXBkYXRlXCI7XG5cbmNvbnN0IGNyZWF0ZWRGaWVsZFN0YXRlID0geyB0eXBlOiBcImZpY3RpdGlvdXMtaW5zdGFuY2VcIiB9O1xuY29uc3QgbW9ja0N1cnJlbnRTdGF0ZSA9IFtcImFcIiwgXCJiXCJdO1xuY29uc3QgbW9ja0hpc3RvcnkgPSBbXTtcbmNvbnN0IG1vY2tTdGF0ZSA9IHtcbiAgZmllbGRUeXBlczogW3sgaW5mbzogeyB0eXBlOiBcImZpY3RpdGlvdXMtaW5zdGFuY2VcIiB9IH1dLFxuICBmaWVsZHNTdGF0ZTogbW9ja0N1cnJlbnRTdGF0ZSxcbiAgZmllbGRzU3RhdGVIaXN0b3J5OiBtb2NrSGlzdG9yeSxcbn07XG5cbmNvbnN0IGZpZWxkQ3JlYXRlZEFjdGlvbiA9IGZpZWxkQ3JlYXRlZChjcmVhdGVkRmllbGRTdGF0ZSk7XG5jb25zdCBuZXdTdGF0ZSA9IHVwZGF0ZShtb2NrU3RhdGUsIGZpZWxkQ3JlYXRlZEFjdGlvbik7XG5cbmRlc2NyaWJlKFwiVXBkYXRlLmZpZWxkQ3JlYXRlZFwiLCAoKSA9PiB7XG4gIGl0KFwib3V0cHV0cyBhIHN0YXRlIHdpdGggdGhlIG5ldyBmaWVsZCBpbmNsdWRlZFwiLCAoKSA9PiB7XG4gICAgZXhwZWN0KG5ld1N0YXRlLmZpZWxkc1N0YXRlLmxlbmd0aCkudG9FcXVhbChtb2NrU3RhdGUuZmllbGRzU3RhdGUubGVuZ3RoICsgMSk7XG4gICAgZXhwZWN0KFxuICAgICAgbmV3U3RhdGUuZmllbGRzU3RhdGVcbiAgICAgIC5maW5kKHYgPT4gdi50eXBlID09PSBjcmVhdGVkRmllbGRTdGF0ZS50eXBlKVxuICAgICkubm90LnRvRXF1YWwodW5kZWZpbmVkKTtcbiAgfSk7XG5cbiAgaXQoXCJzZW5kcyB0aGUgY3VycmVudCBzdGF0ZSB0byBoaXN0b3J5XCIsICgpID0+IHtcbiAgICBleHBlY3QobmV3U3RhdGUuZmllbGRzU3RhdGVIaXN0b3J5WzBdWzBdKS50b0VxdWFsKG1vY2tDdXJyZW50U3RhdGVbMF0pO1xuICAgIGV4cGVjdChuZXdTdGF0ZS5maWVsZHNTdGF0ZUhpc3RvcnlbMF1bMV0pLnRvRXF1YWwobW9ja0N1cnJlbnRTdGF0ZVsxXSk7XG4gIH0pO1xuXG4gIGl0KFwiUmV0dXJucyB0aGUgY3VycmVudCBzdGF0ZSBpZiBubyBuZXcgZmllbGQgaXMgZ2l2ZW4gdG8gaXRcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHNhbWVTdGF0ZSA9IHVwZGF0ZShtb2NrU3RhdGUsIGZpZWxkQ3JlYXRlZChudWxsKSk7XG4gICAgZXhwZWN0KHNhbWVTdGF0ZS5maWVsZFR5cGVzLmxlbmd0aCkudG9FcXVhbChtb2NrU3RhdGUuZmllbGRUeXBlcy5sZW5ndGgpO1xuICAgIGV4cGVjdChzYW1lU3RhdGUuZmllbGRzU3RhdGUubGVuZ3RoKS50b0VxdWFsKG1vY2tTdGF0ZS5maWVsZHNTdGF0ZS5sZW5ndGgpO1xuICAgIGV4cGVjdChzYW1lU3RhdGUuZmllbGRzU3RhdGVIaXN0b3J5Lmxlbmd0aCkudG9FcXVhbChtb2NrU3RhdGUuZmllbGRzU3RhdGVIaXN0b3J5Lmxlbmd0aCk7XG4gIH0pO1xuXG4gIGl0KFwiZG9lcyBub3QgYnJlYWsgdGhlIHN0YXRlIGFmdGVyIGNyZWF0aW5nIG9uZSBvYmplY3RcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGNoYW5nZWQxID0gdXBkYXRlKG1vY2tTdGF0ZSwgZmllbGRDcmVhdGVkKGNyZWF0ZWRGaWVsZFN0YXRlKSk7XG4gICAgY29uc3QgY2hhbmdlZDIgPSB1cGRhdGUoY2hhbmdlZDEsIGZpZWxkQ3JlYXRlZChjcmVhdGVkRmllbGRTdGF0ZSkpO1xuICAgIGNvbnN0IGNoYW5nZWQzID0gdXBkYXRlKGNoYW5nZWQyLCBmaWVsZENyZWF0ZWQoY3JlYXRlZEZpZWxkU3RhdGUpKTtcbiAgICBleHBlY3QoY2hhbmdlZDMuZmllbGRUeXBlcy5sZW5ndGgpLnRvRXF1YWwobW9ja1N0YXRlLmZpZWxkVHlwZXMubGVuZ3RoKTtcbiAgICBleHBlY3QoY2hhbmdlZDMuZmllbGRzU3RhdGUubGVuZ3RoKS50b0VxdWFsKG1vY2tDdXJyZW50U3RhdGUubGVuZ3RoICsgMyk7XG4gICAgZXhwZWN0KGNoYW5nZWQzLmZpZWxkc1N0YXRlSGlzdG9yeS5sZW5ndGgpLnRvRXF1YWwoMyk7XG4gIH0pO1xufSk7XG4iLCIvKiBlc2xpbnQtZW52IGphc21pbmUgKi9cblxuaW1wb3J0IHsgdG9nZ2xlQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2pzL0FjdGlvbnNcIjtcbmltcG9ydCB1cGRhdGUgZnJvbSBcIi4uLy4uL2pzL1VwZGF0ZVwiO1xuXG5cbmNvbnN0IGZpZWxkU3RhdGVDb25maWdTaG93aW5nID0ge1xuICBpZDogMTIzLFxuICBjb25maWdTaG93aW5nOiB0cnVlLFxufTtcblxuY29uc3QgZmllbGRTdGF0ZUNvbmZpZ05vdFNob3dpbmcgPSB7XG4gIGlkOiAzMjEsXG4gIGNvbmZpZ1Nob3dpbmc6IGZhbHNlLFxufTtcblxuY29uc3QgbW9ja1N0YXRlID0ge1xuICBmaWVsZFR5cGVzOiBbXSxcbiAgZmllbGRzU3RhdGU6IFtmaWVsZFN0YXRlQ29uZmlnU2hvd2luZywgZmllbGRTdGF0ZUNvbmZpZ05vdFNob3dpbmddLFxuICBmaWVsZHNTdGF0ZUhpc3Rvcnk6IFtdLFxufTtcblxuZGVzY3JpYmUoXCJVcGRhdGUudG9nZ2xlQ29uZmlnXCIsICgpID0+IHtcbiAgaXQoXCJ0dXJucyB0aGUgY29uZmlnIG9wdGlvbiB0byBmYWxzZSB3aGVuIG5lZWRlZFwiLCAoKSA9PiB7XG4gICAgY29uc3QgbW9kaWZpZWRTdGF0ZSA9IHVwZGF0ZShtb2NrU3RhdGUsIHRvZ2dsZUNvbmZpZyhmaWVsZFN0YXRlQ29uZmlnU2hvd2luZykpO1xuICAgIGV4cGVjdChcbiAgICAgIG1vZGlmaWVkU3RhdGUuZmllbGRzU3RhdGVcbiAgICAgIC5maW5kKGYgPT4gZi5pZCA9PT0gZmllbGRTdGF0ZUNvbmZpZ1Nob3dpbmcuaWQpXG4gICAgICAuY29uZmlnU2hvd2luZ1xuICAgICkudG9FcXVhbChmYWxzZSk7XG4gIH0pO1xuXG4gIGl0KFwidHVybnMgdGhlIGNvbmZpZyBvcHRpb24gdG8gdHJ1ZSB3aGVuIG5lZWRlZFwiLCAoKSA9PiB7XG4gICAgY29uc3QgbW9kaWZpZWRTdGF0ZSA9IHVwZGF0ZShtb2NrU3RhdGUsIHRvZ2dsZUNvbmZpZyhmaWVsZFN0YXRlQ29uZmlnTm90U2hvd2luZykpO1xuICAgIGV4cGVjdChcbiAgICAgIG1vZGlmaWVkU3RhdGUuZmllbGRzU3RhdGVcbiAgICAgIC5maW5kKGYgPT4gZi5pZCA9PT0gZmllbGRTdGF0ZUNvbmZpZ1Nob3dpbmcuaWQpXG4gICAgICAuY29uZmlnU2hvd2luZ1xuICAgICkudG9FcXVhbCh0cnVlKTtcbiAgfSk7XG5cbiAgaXQoXCJhZGRzIHRoZSBsYXN0IHN0YXRlIHRvIHRoZSBoaXN0b3J5XCIsICgpID0+IHtcbiAgICBjb25zdCBtb2RpZmllZFN0YXRlID0gdXBkYXRlKG1vY2tTdGF0ZSwgdG9nZ2xlQ29uZmlnKGZpZWxkU3RhdGVDb25maWdTaG93aW5nKSk7XG4gICAgZXhwZWN0KG1vZGlmaWVkU3RhdGUuZmllbGRzU3RhdGVIaXN0b3J5Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICBleHBlY3QobW9kaWZpZWRTdGF0ZS5maWVsZHNTdGF0ZUhpc3RvcnlbMF1bMF0uaWQpLnRvRXF1YWwobW9ja1N0YXRlLmZpZWxkc1N0YXRlWzBdLmlkKTtcbiAgICBleHBlY3QobW9kaWZpZWRTdGF0ZS5maWVsZHNTdGF0ZUhpc3RvcnlbMF1bMV0uaWQpLnRvRXF1YWwobW9ja1N0YXRlLmZpZWxkc1N0YXRlWzFdLmlkKTtcbiAgfSk7XG59KTtcbiIsIi8qIGVzbGludC1lbnYgamFzbWluZSAqL1xuXG5pbXBvcnQgeyB0b2dnbGVSZXF1aXJlZCB9IGZyb20gXCIuLi8uLi9qcy9BY3Rpb25zXCI7XG5pbXBvcnQgdXBkYXRlIGZyb20gXCIuLi8uLi9qcy9VcGRhdGVcIjtcblxuXG5jb25zdCBmaWVsZFN0YXRlSXNSZXF1aXJlZCA9IHtcbiAgaWQ6IDEyMyxcbiAgcmVxdWlyZWQ6IHRydWUsXG59O1xuXG5jb25zdCBmaWVsZFN0YXRlSXNOb3RSZXF1aXJlZCA9IHtcbiAgaWQ6IDMyMSxcbiAgcmVxdWlyZWQ6IGZhbHNlLFxufTtcblxuY29uc3QgbW9ja1N0YXRlID0ge1xuICBmaWVsZFR5cGVzOiBbXSxcbiAgZmllbGRzU3RhdGU6IFtmaWVsZFN0YXRlSXNSZXF1aXJlZCwgZmllbGRTdGF0ZUlzTm90UmVxdWlyZWRdLFxuICBmaWVsZHNTdGF0ZUhpc3Rvcnk6IFtdLFxufTtcblxuZGVzY3JpYmUoXCJVcGRhdGUudG9nZ2xlUmVxdWlyZWRcIiwgKCkgPT4ge1xuICBpdChcInR1cm5zIHRoZSByZXF1aXJlZCBvcHRpb24gdG8gZmFsc2Ugd2hlbiBuZWVkZWRcIiwgKCkgPT4ge1xuICAgIGNvbnN0IG1vZGlmaWVkU3RhdGUgPSB1cGRhdGUobW9ja1N0YXRlLCB0b2dnbGVSZXF1aXJlZChmaWVsZFN0YXRlSXNSZXF1aXJlZCkpO1xuICAgIGV4cGVjdChcbiAgICAgIG1vZGlmaWVkU3RhdGUuZmllbGRzU3RhdGVcbiAgICAgIC5maW5kKGYgPT4gZi5pZCA9PT0gZmllbGRTdGF0ZUlzUmVxdWlyZWQuaWQpXG4gICAgICAucmVxdWlyZWRcbiAgICApLnRvRXF1YWwoZmFsc2UpO1xuICB9KTtcblxuICBpdChcInR1cm5zIHRoZSByZXF1aXJlZCBvcHRpb24gdG8gdHJ1ZSB3aGVuIG5lZWRlZFwiLCAoKSA9PiB7XG4gICAgY29uc3QgbW9kaWZpZWRTdGF0ZSA9IHVwZGF0ZShtb2NrU3RhdGUsIHRvZ2dsZVJlcXVpcmVkKGZpZWxkU3RhdGVJc05vdFJlcXVpcmVkKSk7XG4gICAgZXhwZWN0KFxuICAgICAgbW9kaWZpZWRTdGF0ZS5maWVsZHNTdGF0ZVxuICAgICAgLmZpbmQoZiA9PiBmLmlkID09PSBmaWVsZFN0YXRlSXNSZXF1aXJlZC5pZClcbiAgICAgIC5yZXF1aXJlZFxuICAgICkudG9FcXVhbCh0cnVlKTtcbiAgfSk7XG5cbiAgaXQoXCJhZGRzIHRoZSBsYXN0IHN0YXRlIHRvIHRoZSBoaXN0b3J5XCIsICgpID0+IHtcbiAgICBjb25zdCBtb2RpZmllZFN0YXRlID0gdXBkYXRlKG1vY2tTdGF0ZSwgdG9nZ2xlUmVxdWlyZWQoZmllbGRTdGF0ZUlzUmVxdWlyZWQpKTtcbiAgICBleHBlY3QobW9kaWZpZWRTdGF0ZS5maWVsZHNTdGF0ZUhpc3RvcnkubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgIGV4cGVjdChtb2RpZmllZFN0YXRlLmZpZWxkc1N0YXRlSGlzdG9yeVswXVswXS5pZCkudG9FcXVhbChtb2NrU3RhdGUuZmllbGRzU3RhdGVbMF0uaWQpO1xuICAgIGV4cGVjdChtb2RpZmllZFN0YXRlLmZpZWxkc1N0YXRlSGlzdG9yeVswXVsxXS5pZCkudG9FcXVhbChtb2NrU3RhdGUuZmllbGRzU3RhdGVbMV0uaWQpO1xuICB9KTtcbn0pO1xuIiwiLyogZXNsaW50LWVudiBqYXNtaW5lICovXG4vKiBlc2xpbnQtZGlzYWJsZSBxdW90ZS1wcm9wcyAqL1xuXG5pbXBvcnQgeyBkZWxldGVGaWVsZCB9IGZyb20gXCIuLi8uLi9qcy9BY3Rpb25zXCI7XG5pbXBvcnQgdXBkYXRlIGZyb20gXCIuLi8uLi9qcy9VcGRhdGVcIjtcblxuY29uc3QgdG9CZURlbGV0ZWRGaWVsZFN0YXRlID0geyB0eXBlOiBcImZpY3RpdGlvdXMtaW5zdGFuY2VcIiwgaWQ6IDAgfTtcbmNvbnN0IG1vY2tDdXJyZW50U3RhdGUgPSBbdG9CZURlbGV0ZWRGaWVsZFN0YXRlLCB7IGlkOiAxIH0sIHsgaWQ6IDIgfV07XG5jb25zdCBtb2NrSGlzdG9yeSA9IFtdO1xuY29uc3QgbW9ja1N0YXRlID0ge1xuICBmaWVsZFR5cGVzOiBbeyBpbmZvOiB7IHR5cGU6IFwiZmljdGl0aW91cy1pbnN0YW5jZVwiIH0gfV0sXG4gIGZpZWxkc1N0YXRlOiBtb2NrQ3VycmVudFN0YXRlLFxuICBmaWVsZHNTdGF0ZUhpc3Rvcnk6IG1vY2tIaXN0b3J5LFxufTtcblxuY29uc3QgZmllbGREZWxldGVBY3Rpb24gPSBkZWxldGVGaWVsZCh0b0JlRGVsZXRlZEZpZWxkU3RhdGUpO1xuY29uc3QgbmV3U3RhdGUgPSB1cGRhdGUobW9ja1N0YXRlLCBmaWVsZERlbGV0ZUFjdGlvbik7XG5cbmRlc2NyaWJlKFwiVXBkYXRlLmRlbGV0ZUZpZWxkXCIsICgpID0+IHtcbiAgaXQoXCJvdXRwdXRzIGEgc3RhdGUgd2l0aG91dCB0aGUgZmllbGQgaW5jbHVkZWRcIiwgKCkgPT4ge1xuICAgIGV4cGVjdChuZXdTdGF0ZS5maWVsZHNTdGF0ZS5sZW5ndGgpLnRvRXF1YWwobW9ja1N0YXRlLmZpZWxkc1N0YXRlLmxlbmd0aCAtIDEpO1xuICAgIGV4cGVjdChcbiAgICAgIG5ld1N0YXRlLmZpZWxkc1N0YXRlXG4gICAgICAuZmluZCh2ID0+IHYuaWQgPT09IHRvQmVEZWxldGVkRmllbGRTdGF0ZS5pZClcbiAgICApLnRvRXF1YWwodW5kZWZpbmVkKTtcbiAgfSk7XG5cbiAgaXQoXCJzZW5kcyB0aGUgY3VycmVudCBzdGF0ZSB0byBoaXN0b3J5XCIsICgpID0+IHtcbiAgICBjb25zdCByZWNlbnRIaXN0b3J5U3RhdGUgPSBuZXdTdGF0ZS5maWVsZHNTdGF0ZUhpc3RvcnlbMF07XG4gICAgZXhwZWN0KHJlY2VudEhpc3RvcnlTdGF0ZS5sZW5ndGgpLnRvRXF1YWwobW9ja0N1cnJlbnRTdGF0ZS5sZW5ndGgpO1xuICAgIGV4cGVjdChyZWNlbnRIaXN0b3J5U3RhdGVbMF0uaWQpLnRvRXF1YWwobW9ja0N1cnJlbnRTdGF0ZVswXS5pZCk7XG4gICAgZXhwZWN0KHJlY2VudEhpc3RvcnlTdGF0ZVsxXS5pZCkudG9FcXVhbChtb2NrQ3VycmVudFN0YXRlWzFdLmlkKTtcbiAgfSk7XG5cbiAgaXQoXCJSZXR1cm5zIHRoZSBjdXJyZW50IHN0YXRlIGlmIG5vIG5ldyBmaWVsZCBpcyBnaXZlbiB0byBpdFwiLCAoKSA9PiB7XG4gICAgY29uc3Qgc2FtZVN0YXRlID0gdXBkYXRlKG1vY2tTdGF0ZSwgZGVsZXRlRmllbGQobnVsbCkpO1xuICAgIGV4cGVjdChzYW1lU3RhdGUuZmllbGRUeXBlcy5sZW5ndGgpLnRvRXF1YWwobW9ja1N0YXRlLmZpZWxkVHlwZXMubGVuZ3RoKTtcbiAgICBleHBlY3Qoc2FtZVN0YXRlLmZpZWxkc1N0YXRlLmxlbmd0aCkudG9FcXVhbChtb2NrU3RhdGUuZmllbGRzU3RhdGUubGVuZ3RoKTtcbiAgICBleHBlY3Qoc2FtZVN0YXRlLmZpZWxkc1N0YXRlSGlzdG9yeS5sZW5ndGgpLnRvRXF1YWwobW9ja1N0YXRlLmZpZWxkc1N0YXRlSGlzdG9yeS5sZW5ndGgpO1xuICB9KTtcblxuICBpdChcImRvZXMgbm90IGJyZWFrIHRoZSBzdGF0ZSBhZnRlciBkZWxldGluZyBhIGZpZWxkXCIsICgpID0+IHtcbiAgICBjb25zdCBtb2NrRmllbGQxID0gT2JqZWN0LmFzc2lnbih7fSwgdG9CZURlbGV0ZWRGaWVsZFN0YXRlLCB7IGlkOiA1IH0pO1xuICAgIGNvbnN0IG1vY2tGaWVsZDIgPSBPYmplY3QuYXNzaWduKHt9LCB0b0JlRGVsZXRlZEZpZWxkU3RhdGUsIHsgaWQ6IDYgfSk7XG4gICAgY29uc3QgbW9ja0ZpZWxkMyA9IE9iamVjdC5hc3NpZ24oe30sIHRvQmVEZWxldGVkRmllbGRTdGF0ZSwgeyBpZDogNyB9KTtcblxuICAgIGNvbnN0IG1vY2tTdGF0ZTIgPSBPYmplY3QuYXNzaWduKHt9LCBtb2NrU3RhdGUsIHtcbiAgICAgIGZpZWxkc1N0YXRlOiBbXG4gICAgICAgIG1vY2tGaWVsZDEsXG4gICAgICAgIG1vY2tGaWVsZDIsXG4gICAgICAgIG1vY2tGaWVsZDMsXG4gICAgICBdLFxuICAgIH0pO1xuICAgIGNvbnN0IGNoYW5nZWQxID0gdXBkYXRlKG1vY2tTdGF0ZTIsIGRlbGV0ZUZpZWxkKG1vY2tGaWVsZDEpKTtcbiAgICBjb25zdCBjaGFuZ2VkMiA9IHVwZGF0ZShjaGFuZ2VkMSwgZGVsZXRlRmllbGQobW9ja0ZpZWxkMikpO1xuICAgIGNvbnN0IGNoYW5nZWQzID0gdXBkYXRlKGNoYW5nZWQyLCBkZWxldGVGaWVsZChtb2NrRmllbGQzKSk7XG4gICAgZXhwZWN0KGNoYW5nZWQzLmZpZWxkVHlwZXMubGVuZ3RoKS50b0VxdWFsKG1vY2tTdGF0ZTIuZmllbGRUeXBlcy5sZW5ndGgpO1xuICAgIGV4cGVjdChjaGFuZ2VkMy5maWVsZHNTdGF0ZS5sZW5ndGgpLnRvRXF1YWwobW9ja1N0YXRlMi5maWVsZHNTdGF0ZS5sZW5ndGggLSAzKTtcbiAgICBleHBlY3QoY2hhbmdlZDMuZmllbGRzU3RhdGVIaXN0b3J5Lmxlbmd0aCkudG9FcXVhbCgzKTtcbiAgfSk7XG59KTtcbiIsIi8qIGVzbGludC1lbnYgamFzbWluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgcXVvdGUtcHJvcHMgKi9cblxuaW1wb3J0IHsgdXBkYXRlRmllbGQgfSBmcm9tIFwiLi4vLi4vanMvQWN0aW9uc1wiO1xuaW1wb3J0IHVwZGF0ZSBmcm9tIFwiLi4vLi4vanMvVXBkYXRlXCI7XG5cbmNvbnN0IG9sZEZpZWxkU3RhdGUgPSB7XG4gIHR5cGU6IFwiZmljdGl0aW91cy1pbnN0YW5jZVwiLFxuICBpZDogXCIwXCIsXG4gIGNvbmZpZ1Nob3dpbmc6IGZhbHNlLFxuICByZXF1aXJlZDogZmFsc2UsXG4gIGNvbG9yOiBcImJsdWVcIixcbn07XG5jb25zdCBuZXdGaWVsZFN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgb2xkRmllbGRTdGF0ZSwgeyBjb2xvcjogXCJncmVlblwiIH0pO1xuY29uc3QgbW9ja0N1cnJlbnRTdGF0ZSA9IFtvbGRGaWVsZFN0YXRlLCB7IGlkOiAxIH0sIHsgaWQ6IDIgfV07XG5jb25zdCBtb2NrSGlzdG9yeSA9IFtdO1xuY29uc3QgbW9ja1N0YXRlID0ge1xuICBmaWVsZFR5cGVzOiBbeyBpbmZvOiB7IHR5cGU6IFwiZmljdGl0aW91cy1pbnN0YW5jZVwiIH0gfV0sXG4gIGZpZWxkc1N0YXRlOiBtb2NrQ3VycmVudFN0YXRlLFxuICBmaWVsZHNTdGF0ZUhpc3Rvcnk6IG1vY2tIaXN0b3J5LFxufTtcblxuY29uc3QgZmllbGRVcGRhdGVBY3Rpb24gPSB1cGRhdGVGaWVsZChuZXdGaWVsZFN0YXRlKTtcbmNvbnN0IG5ld1N0YXRlID0gdXBkYXRlKG1vY2tTdGF0ZSwgZmllbGRVcGRhdGVBY3Rpb24pO1xuXG5kZXNjcmliZShcIlVwZGF0ZS51cGRhdGVGaWVsZFwiLCAoKSA9PiB7XG4gIGl0KFwib3V0cHV0cyBhIHN0YXRlIHRoZSBmaWVsZCB1cGRhdGVkXCIsICgpID0+IHtcbiAgICBleHBlY3QobmV3U3RhdGUuZmllbGRzU3RhdGUubGVuZ3RoKS50b0VxdWFsKG1vY2tTdGF0ZS5maWVsZHNTdGF0ZS5sZW5ndGgpO1xuICAgIGV4cGVjdChcbiAgICAgIG5ld1N0YXRlLmZpZWxkc1N0YXRlXG4gICAgICAuZmluZCh2ID0+IHYuY29sb3IgPT09IG5ld0ZpZWxkU3RhdGUuY29sb3IpXG4gICAgKS5ub3QudG9FcXVhbCh1bmRlZmluZWQpO1xuICB9KTtcblxuICBpdChcIm91dHB1dHMgYSBzdGF0ZSB0aGUgdXBkYXRlZCBmaWVsZCBpbiB0aGUgY29ycmVjdCBvcmRlclwiLCAoKSA9PiB7XG4gICAgZXhwZWN0KG5ld1N0YXRlLmZpZWxkc1N0YXRlWzBdLmlkKS50b0VxdWFsKG1vY2tTdGF0ZS5maWVsZHNTdGF0ZVswXS5pZCk7XG4gICAgZXhwZWN0KG5ld1N0YXRlLmZpZWxkc1N0YXRlWzBdLmNvbG9yKS50b0VxdWFsKG5ld0ZpZWxkU3RhdGUuY29sb3IpO1xuICB9KTtcblxuICBpdChcInNlbmRzIHRoZSBjdXJyZW50IHN0YXRlIHRvIGhpc3RvcnlcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHJlY2VudEhpc3RvcnlTdGF0ZSA9IG5ld1N0YXRlLmZpZWxkc1N0YXRlSGlzdG9yeVswXTtcbiAgICBleHBlY3QocmVjZW50SGlzdG9yeVN0YXRlLmxlbmd0aCkudG9FcXVhbChtb2NrQ3VycmVudFN0YXRlLmxlbmd0aCk7XG4gICAgZXhwZWN0KHJlY2VudEhpc3RvcnlTdGF0ZVswXS5pZCkudG9FcXVhbChtb2NrQ3VycmVudFN0YXRlWzBdLmlkKTtcbiAgICBleHBlY3QocmVjZW50SGlzdG9yeVN0YXRlWzBdLmNvbG9yKS50b0VxdWFsKG1vY2tDdXJyZW50U3RhdGVbMF0uY29sb3IpO1xuICB9KTtcblxuICBpdChcIlJldHVybnMgdGhlIGN1cnJlbnQgc3RhdGUgaWYgYW4gaW52YWxpZCBmaWVsZCBzdGF0ZSBpcyBnaXZlbiB0byBpdFwiLCAoKSA9PiB7XG4gICAgY29uc3QgaXNTYW1lID0gKHN0YXRlMSwgc3RhdGUyKSA9PiB7XG4gICAgICBleHBlY3Qoc3RhdGUxLmZpZWxkVHlwZXMubGVuZ3RoKS50b0VxdWFsKHN0YXRlMi5maWVsZFR5cGVzLmxlbmd0aCk7XG4gICAgICBleHBlY3Qoc3RhdGUxLmZpZWxkc1N0YXRlLmxlbmd0aCkudG9FcXVhbChzdGF0ZTIuZmllbGRzU3RhdGUubGVuZ3RoKTtcbiAgICAgIGV4cGVjdChzdGF0ZTEuZmllbGRzU3RhdGVbMF0uY29sb3IpLnRvRXF1YWwoc3RhdGUyLmZpZWxkc1N0YXRlWzBdLmNvbG9yKTtcbiAgICAgIGV4cGVjdChzdGF0ZTEuZmllbGRzU3RhdGVbMF0uaWQpLnRvRXF1YWwoc3RhdGUyLmZpZWxkc1N0YXRlWzBdLmlkKTtcbiAgICAgIGV4cGVjdChzdGF0ZTEuZmllbGRzU3RhdGVIaXN0b3J5Lmxlbmd0aCkudG9FcXVhbChzdGF0ZTIuZmllbGRzU3RhdGVIaXN0b3J5Lmxlbmd0aCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNhbWVTdGF0ZTEgPSB1cGRhdGUobW9ja1N0YXRlLCB1cGRhdGVGaWVsZChudWxsKSk7XG4gICAgaXNTYW1lKG1vY2tTdGF0ZSwgc2FtZVN0YXRlMSk7XG5cbiAgICBjb25zdCBzYW1lU3RhdGUyID0gdXBkYXRlKFxuICAgICAgbW9ja1N0YXRlLFxuICAgICAgdXBkYXRlRmllbGQoT2JqZWN0LmFzc2lnbih7fSwgbmV3RmllbGRTdGF0ZSwgeyBpZDogbnVsbCB9KSlcbiAgICApO1xuICAgIGlzU2FtZShtb2NrU3RhdGUsIHNhbWVTdGF0ZTIpO1xuXG4gICAgY29uc3Qgc2FtZVN0YXRlMyA9IHVwZGF0ZShcbiAgICAgIG1vY2tTdGF0ZSxcbiAgICAgIHVwZGF0ZUZpZWxkKE9iamVjdC5hc3NpZ24oe30sIG5ld0ZpZWxkU3RhdGUsIHsgY29uZmlnU2hvd2luZzogbnVsbCB9KSlcbiAgICApO1xuICAgIGlzU2FtZShtb2NrU3RhdGUsIHNhbWVTdGF0ZTMpO1xuXG4gICAgY29uc3Qgc2FtZVN0YXRlNCA9IHVwZGF0ZShcbiAgICAgIG1vY2tTdGF0ZSxcbiAgICAgIHVwZGF0ZUZpZWxkKE9iamVjdC5hc3NpZ24oe30sIG5ld0ZpZWxkU3RhdGUsIHsgcmVxdWlyZWQ6IG51bGwgfSkpXG4gICAgKTtcblxuICAgIGlzU2FtZShtb2NrU3RhdGUsIHNhbWVTdGF0ZTQpO1xuICB9KTtcblxuICBpdChcImRvZXMgbm90IGJyZWFrIHRoZSBzdGF0ZSBhZnRlciB1cGRhdGluZyBhIGZpZWxkIG11bHRpcGxlIHRpbWVzIGEgZmllbGRcIiwgKCkgPT4ge1xuICAgIGNvbnN0IG1vY2tGaWVsZDEgPSBPYmplY3QuYXNzaWduKHt9LCBvbGRGaWVsZFN0YXRlLCB7IGNvbG9yOiBcInllbGxvd1wiIH0pO1xuICAgIGNvbnN0IG1vY2tGaWVsZDIgPSBPYmplY3QuYXNzaWduKHt9LCBvbGRGaWVsZFN0YXRlLCB7IGNvbG9yOiBcIm9yYW5nZVwiIH0pO1xuICAgIGNvbnN0IG1vY2tGaWVsZDMgPSBPYmplY3QuYXNzaWduKHt9LCBvbGRGaWVsZFN0YXRlLCB7IGNvbG9yOiBcInB1cnBsZVwiIH0pO1xuXG4gICAgY29uc3QgY2hhbmdlZDEgPSB1cGRhdGUobW9ja1N0YXRlLCB1cGRhdGVGaWVsZChtb2NrRmllbGQxKSk7XG4gICAgY29uc3QgY2hhbmdlZDIgPSB1cGRhdGUoY2hhbmdlZDEsIHVwZGF0ZUZpZWxkKG1vY2tGaWVsZDIpKTtcbiAgICBjb25zdCBjaGFuZ2VkMyA9IHVwZGF0ZShjaGFuZ2VkMiwgdXBkYXRlRmllbGQobW9ja0ZpZWxkMykpO1xuICAgIGV4cGVjdChjaGFuZ2VkMy5maWVsZFR5cGVzLmxlbmd0aCkudG9FcXVhbChtb2NrU3RhdGUuZmllbGRUeXBlcy5sZW5ndGgpO1xuICAgIGV4cGVjdChjaGFuZ2VkMy5maWVsZHNTdGF0ZS5sZW5ndGgpLnRvRXF1YWwobW9ja1N0YXRlLmZpZWxkc1N0YXRlLmxlbmd0aCk7XG4gICAgZXhwZWN0KGNoYW5nZWQzLmZpZWxkc1N0YXRlWzBdLmlkKS50b0VxdWFsKG1vY2tTdGF0ZS5maWVsZHNTdGF0ZVswXS5pZCk7XG4gICAgZXhwZWN0KGNoYW5nZWQzLmZpZWxkc1N0YXRlWzBdLmNvbG9yKS50b0VxdWFsKG1vY2tGaWVsZDMuY29sb3IpO1xuICAgIGV4cGVjdChjaGFuZ2VkMy5maWVsZHNTdGF0ZUhpc3RvcnkubGVuZ3RoKS50b0VxdWFsKDMpO1xuICB9KTtcbn0pO1xuIiwiLyogZXNsaW50LWVudiBqYXNtaW5lICovXG4vKiBlc2xpbnQtZGlzYWJsZSBxdW90ZS1wcm9wcyAqL1xuXG5pbXBvcnQgeyByZW9yZGVyRmllbGRzIH0gZnJvbSBcIi4uLy4uL2pzL0FjdGlvbnNcIjtcbmltcG9ydCB1cGRhdGUgZnJvbSBcIi4uLy4uL2pzL1VwZGF0ZVwiO1xuXG5jb25zdCB0ZW1wbGF0ZUZpZWxkID0ge1xuICB0eXBlOiBcImZpY3RpdGlvdXMtaW5zdGFuY2VcIixcbiAgcmVxdWlyZWQ6IGZhbHNlLFxuICBjb25maWdTaG93aW5nOiBmYWxzZSxcbiAgaWQ6IFwiMFwiLFxufTtcbmNvbnN0IGZpZWxkMSA9IE9iamVjdC5hc3NpZ24oe30sIHRlbXBsYXRlRmllbGQsIHsgaWQ6IFwiMVwiIH0pO1xuY29uc3QgZmllbGQyID0gT2JqZWN0LmFzc2lnbih7fSwgdGVtcGxhdGVGaWVsZCwgeyBpZDogXCIyXCIgfSk7XG5jb25zdCBmaWVsZDMgPSBPYmplY3QuYXNzaWduKHt9LCB0ZW1wbGF0ZUZpZWxkLCB7IGlkOiBcIjNcIiB9KTtcbmNvbnN0IG1vY2tDdXJyZW50U3RhdGUgPSBbZmllbGQxLCBmaWVsZDIsIGZpZWxkM107XG5jb25zdCBtb2NrSGlzdG9yeSA9IFtdO1xuY29uc3QgbW9ja1N0YXRlID0ge1xuICBmaWVsZFR5cGVzOiBbeyBpbmZvOiB7IHR5cGU6IFwiZmljdGl0aW91cy1pbnN0YW5jZVwiIH0gfV0sXG4gIGZpZWxkc1N0YXRlOiBtb2NrQ3VycmVudFN0YXRlLFxuICBmaWVsZHNTdGF0ZUhpc3Rvcnk6IG1vY2tIaXN0b3J5LFxufTtcblxuY29uc3QgbmV3T3JkZXIgPSBbXCIyXCIsIFwiM1wiLCBcIjFcIl07XG5jb25zdCByZW9yZGVyRmllbGRzQWN0aW9uID0gcmVvcmRlckZpZWxkcyhuZXdPcmRlcik7XG5jb25zdCBuZXdTdGF0ZSA9IHVwZGF0ZShtb2NrU3RhdGUsIHJlb3JkZXJGaWVsZHNBY3Rpb24pO1xuXG5kZXNjcmliZShcIlVwZGF0ZS5yZW9yZGVyRmllbGRzXCIsICgpID0+IHtcbiAgaXQoXCJvdXRwdXRzIGEgc3RhdGUgd2l0aCBmaWVsZHMgaW4gdGhlIG5ldyBvcmRlclwiLCAoKSA9PiB7XG4gICAgZXhwZWN0KG5ld1N0YXRlLmZpZWxkc1N0YXRlLmxlbmd0aCkudG9FcXVhbChtb2NrU3RhdGUuZmllbGRzU3RhdGUubGVuZ3RoKTtcbiAgICBleHBlY3QobmV3U3RhdGUuZmllbGRzU3RhdGVbMF0uaWQpLnRvRXF1YWwobmV3T3JkZXJbMF0pO1xuICAgIGV4cGVjdChuZXdTdGF0ZS5maWVsZHNTdGF0ZVsxXS5pZCkudG9FcXVhbChuZXdPcmRlclsxXSk7XG4gICAgZXhwZWN0KG5ld1N0YXRlLmZpZWxkc1N0YXRlWzJdLmlkKS50b0VxdWFsKG5ld09yZGVyWzJdKTtcbiAgfSk7XG5cbiAgaXQoXCJzZW5kcyB0aGUgY3VycmVudCBzdGF0ZSB0byBoaXN0b3J5XCIsICgpID0+IHtcbiAgICBleHBlY3QobmV3U3RhdGUuZmllbGRzU3RhdGVIaXN0b3J5WzBdWzBdLmlkKS50b0VxdWFsKG1vY2tDdXJyZW50U3RhdGVbMF0uaWQpO1xuICAgIGV4cGVjdChuZXdTdGF0ZS5maWVsZHNTdGF0ZUhpc3RvcnlbMF1bMV0uaWQpLnRvRXF1YWwobW9ja0N1cnJlbnRTdGF0ZVsxXS5pZCk7XG4gICAgZXhwZWN0KG5ld1N0YXRlLmZpZWxkc1N0YXRlSGlzdG9yeVswXVsyXS5pZCkudG9FcXVhbChtb2NrQ3VycmVudFN0YXRlWzJdLmlkKTtcbiAgfSk7XG5cbiAgaXQoXCJSZXR1cm5zIHRoZSBjdXJyZW50IHN0YXRlIGlmIGFueSBmaWVsZCBpZCBpcyBtaXNzaW5nXCIsICgpID0+IHtcbiAgICBjb25zdCBzYW1lU3RhdGUgPSB1cGRhdGUobW9ja1N0YXRlLCByZW9yZGVyRmllbGRzKFtcIjFcIiwgXCIyXCJdKSk7XG4gICAgZXhwZWN0KHNhbWVTdGF0ZS5maWVsZFR5cGVzLmxlbmd0aCkudG9FcXVhbChtb2NrU3RhdGUuZmllbGRUeXBlcy5sZW5ndGgpO1xuICAgIGV4cGVjdChzYW1lU3RhdGUuZmllbGRzU3RhdGVbMF0uaWQpLnRvRXF1YWwobW9ja1N0YXRlLmZpZWxkc1N0YXRlWzBdLmlkKTtcbiAgICBleHBlY3Qoc2FtZVN0YXRlLmZpZWxkc1N0YXRlWzFdLmlkKS50b0VxdWFsKG1vY2tTdGF0ZS5maWVsZHNTdGF0ZVsxXS5pZCk7XG4gICAgZXhwZWN0KHNhbWVTdGF0ZS5maWVsZHNTdGF0ZVsyXS5pZCkudG9FcXVhbChtb2NrU3RhdGUuZmllbGRzU3RhdGVbMl0uaWQpO1xuICAgIGV4cGVjdChzYW1lU3RhdGUuZmllbGRzU3RhdGUubGVuZ3RoKS50b0VxdWFsKG1vY2tTdGF0ZS5maWVsZHNTdGF0ZS5sZW5ndGgpO1xuICAgIGV4cGVjdChzYW1lU3RhdGUuZmllbGRzU3RhdGVIaXN0b3J5Lmxlbmd0aCkudG9FcXVhbChtb2NrU3RhdGUuZmllbGRzU3RhdGVIaXN0b3J5Lmxlbmd0aCk7XG4gIH0pO1xuXG4gIGl0KFwiUmV0dXJucyB0aGUgY3VycmVudCBzdGF0ZSBpZiB0aGUgcmVvcmRlciBhcnJheSBoYXMgbW9yZSBlbGVtZW50cyB0aGFuIGl0IHNob3VsZFwiLCAoKSA9PiB7XG4gICAgY29uc3Qgc2FtZVN0YXRlID0gdXBkYXRlKG1vY2tTdGF0ZSwgcmVvcmRlckZpZWxkcyhbXCIxXCIsIFwiMlwiLCBcIjNcIiwgXCI0XCJdKSk7XG4gICAgZXhwZWN0KHNhbWVTdGF0ZS5maWVsZFR5cGVzLmxlbmd0aCkudG9FcXVhbChtb2NrU3RhdGUuZmllbGRUeXBlcy5sZW5ndGgpO1xuICAgIGV4cGVjdChzYW1lU3RhdGUuZmllbGRzU3RhdGVbMF0uaWQpLnRvRXF1YWwobW9ja1N0YXRlLmZpZWxkc1N0YXRlWzBdLmlkKTtcbiAgICBleHBlY3Qoc2FtZVN0YXRlLmZpZWxkc1N0YXRlWzFdLmlkKS50b0VxdWFsKG1vY2tTdGF0ZS5maWVsZHNTdGF0ZVsxXS5pZCk7XG4gICAgZXhwZWN0KHNhbWVTdGF0ZS5maWVsZHNTdGF0ZVsyXS5pZCkudG9FcXVhbChtb2NrU3RhdGUuZmllbGRzU3RhdGVbMl0uaWQpO1xuICAgIGV4cGVjdChzYW1lU3RhdGUuZmllbGRzU3RhdGUubGVuZ3RoKS50b0VxdWFsKG1vY2tTdGF0ZS5maWVsZHNTdGF0ZS5sZW5ndGgpO1xuICAgIGV4cGVjdChzYW1lU3RhdGUuZmllbGRzU3RhdGVIaXN0b3J5Lmxlbmd0aCkudG9FcXVhbChtb2NrU3RhdGUuZmllbGRzU3RhdGVIaXN0b3J5Lmxlbmd0aCk7XG4gIH0pO1xuXG4gIGl0KFwiZG9lcyBub3QgYnJlYWsgdGhlIHN0YXRlIGFmdGVyIGNyZWF0aW5nIG9uZSBvYmplY3RcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGNoYW5nZWQxID0gdXBkYXRlKG1vY2tTdGF0ZSwgcmVvcmRlckZpZWxkcyhbXCIxXCIsIFwiMlwiLCBcIjNcIl0pKTtcbiAgICBjb25zdCBjaGFuZ2VkMiA9IHVwZGF0ZShjaGFuZ2VkMSwgcmVvcmRlckZpZWxkcyhbXCIzXCIsIFwiMVwiLCBcIjJcIl0pKTtcbiAgICBjb25zdCBjaGFuZ2VkMyA9IHVwZGF0ZShjaGFuZ2VkMiwgcmVvcmRlckZpZWxkcyhbXCIzXCIsIFwiMlwiLCBcIjFcIl0pKTtcbiAgICBleHBlY3QoY2hhbmdlZDMuZmllbGRUeXBlcy5sZW5ndGgpLnRvRXF1YWwobW9ja1N0YXRlLmZpZWxkVHlwZXMubGVuZ3RoKTtcbiAgICBleHBlY3QoY2hhbmdlZDMuZmllbGRzU3RhdGUubGVuZ3RoKS50b0VxdWFsKG1vY2tDdXJyZW50U3RhdGUubGVuZ3RoKTtcbiAgICBleHBlY3QoY2hhbmdlZDMuZmllbGRzU3RhdGVIaXN0b3J5Lmxlbmd0aCkudG9FcXVhbCgzKTtcbiAgICBleHBlY3QoY2hhbmdlZDMuZmllbGRzU3RhdGVbMF0uaWQpLnRvRXF1YWwoXCIzXCIpO1xuICAgIGV4cGVjdChjaGFuZ2VkMy5maWVsZHNTdGF0ZVsxXS5pZCkudG9FcXVhbChcIjJcIik7XG4gICAgZXhwZWN0KGNoYW5nZWQzLmZpZWxkc1N0YXRlWzJdLmlkKS50b0VxdWFsKFwiMVwiKTtcbiAgfSk7XG59KTtcbiIsIi8qIGVzbGludC1lbnYgamFzbWluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgcXVvdGUtcHJvcHMgKi9cblxuaW1wb3J0IHsgaW1wb3J0Q3VzdG9tQ29tcG9uZW50cyB9IGZyb20gXCIuLi8uLi9qcy9BY3Rpb25zXCI7XG5pbXBvcnQgdXBkYXRlIGZyb20gXCIuLi8uLi9qcy9VcGRhdGVcIjtcblxuY29uc3QgY3JlYXRlVHlwZSA9IG5hbWUgPT4gKHtcbiAgaW5pdGlhbFN0YXRlOiBfID0+IF8sXG4gIFJlbmRlckVkaXRvcjogXyA9PiBfLFxuICBpbmZvOiB7IHR5cGU6IG5hbWUsIGdyb3VwOiBcImN1c3RvbVwiLCBkaXNwbGF5TmFtZTogbmFtZSB9LFxufSk7XG5cbmNvbnN0IG1vY2tTdGF0ZSA9IHtcbiAgZmllbGRUeXBlczogW2NyZWF0ZVR5cGUoXCJmaWN0aXRpb3VzLWluc3RhbmNlXCIpXSxcbiAgZmllbGRzU3RhdGU6IFtdLFxuICBmaWVsZHNTdGF0ZUhpc3Rvcnk6IFtdLFxufTtcblxuY29uc3QgY3VzdG9tVHlwZXMgPSBbXG4gIGNyZWF0ZVR5cGUoXCJjdXN0b20tMVwiKSxcbiAgY3JlYXRlVHlwZShcImN1c3RvbS0yXCIpLFxuICBjcmVhdGVUeXBlKFwiY3VzdG9tLTNcIiksXG5dO1xuXG5jb25zdCBpbXBvcnRDdXN0b21Db21wb25lbnRzQWN0aW9uID0gaW1wb3J0Q3VzdG9tQ29tcG9uZW50cyhjdXN0b21UeXBlcyk7XG5jb25zdCBuZXdTdGF0ZSA9IHVwZGF0ZShtb2NrU3RhdGUsIGltcG9ydEN1c3RvbUNvbXBvbmVudHNBY3Rpb24pO1xuXG5cbmRlc2NyaWJlKFwiVXBkYXRlLmltcG9ydEN1c3RvbUNvbXBvbmVudHNcIiwgKCkgPT4ge1xuICBpdChcIkFwcGVuZHMgdGhlIG5ldyB2YWxpZCBjdXN0b20gdHlwZXMgdG8gdGhlIGVuZCBvZiB0aGUgZXhpc3RpbmcgdHlwZXNcIiwgKCkgPT4ge1xuICAgIGV4cGVjdChuZXdTdGF0ZS5maWVsZFR5cGVzLmxlbmd0aCkudG9FcXVhbChtb2NrU3RhdGUuZmllbGRUeXBlcy5sZW5ndGggKyBjdXN0b21UeXBlcy5sZW5ndGgpO1xuICAgIGV4cGVjdChuZXdTdGF0ZS5maWVsZFR5cGVzWzFdLmluZm8udHlwZSkudG9FcXVhbChjdXN0b21UeXBlc1swXS5pbmZvLnR5cGUpO1xuICAgIGV4cGVjdChuZXdTdGF0ZS5maWVsZFR5cGVzWzJdLmluZm8udHlwZSkudG9FcXVhbChjdXN0b21UeXBlc1sxXS5pbmZvLnR5cGUpO1xuICAgIGV4cGVjdChuZXdTdGF0ZS5maWVsZFR5cGVzWzNdLmluZm8udHlwZSkudG9FcXVhbChjdXN0b21UeXBlc1syXS5pbmZvLnR5cGUpO1xuICB9KTtcblxuICBpdChcIlJldHVybnMgYW4gdW5jaGFuZ2VkIGFycmF5IGlmIGN1c3RvbVR5cGVzIGlzIGludmFsaWRcIiwgKCkgPT4ge1xuICAgIGV4cGVjdCh1cGRhdGUobW9ja1N0YXRlLCBpbXBvcnRDdXN0b21Db21wb25lbnRzKG51bGwpKSkudG9FcXVhbChtb2NrU3RhdGUpO1xuXG4gICAgY29uc3QgaW52YWxpZDEgPSBbXG4gICAgICBPYmplY3QuYXNzaWduKHt9LCBjcmVhdGVUeXBlKFwiY3VzdG9tLTFcIiksIHsgaW5mbzogbnVsbCB9KSxcbiAgICBdO1xuICAgIGV4cGVjdCh1cGRhdGUobW9ja1N0YXRlLCBpbXBvcnRDdXN0b21Db21wb25lbnRzKGludmFsaWQxKSkpLnRvRXF1YWwobW9ja1N0YXRlKTtcblxuICAgIGNvbnN0IGludmFsaWQyID0gW1xuICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAge30sXG4gICAgICAgIGNyZWF0ZVR5cGUoXCJjdXN0b20tMVwiKSxcbiAgICAgICAgeyBpbmZvOiB7IHR5cGU6IG51bGwsIGdyb3VwOiBcImN1c3RvbVwiLCBkaXNwbGF5TmFtZTogXCJjdXN0b21cIiB9IH0pLFxuICAgIF07XG4gICAgZXhwZWN0KHVwZGF0ZShtb2NrU3RhdGUsIGltcG9ydEN1c3RvbUNvbXBvbmVudHMoaW52YWxpZDIpKSkudG9FcXVhbChtb2NrU3RhdGUpO1xuXG4gICAgY29uc3QgaW52YWxpZDMgPSBbXG4gICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICB7fSxcbiAgICAgICAgY3JlYXRlVHlwZShcImN1c3RvbS0xXCIpLFxuICAgICAgICB7IGluZm86IHsgdHlwZTogXCJjdXN0b21cIiwgZ3JvdXA6IG51bGwsIGRpc3BsYXlOYW1lOiBcImN1c3RvbVwiIH0gfVxuICAgICAgKSxcbiAgICBdO1xuICAgIGV4cGVjdCh1cGRhdGUobW9ja1N0YXRlLCBpbXBvcnRDdXN0b21Db21wb25lbnRzKGludmFsaWQzKSkpLnRvRXF1YWwobW9ja1N0YXRlKTtcblxuICAgIGNvbnN0IGludmFsaWQ0ID0gW1xuICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAge30sXG4gICAgICAgIGNyZWF0ZVR5cGUoXCJjdXN0b20tMVwiKSxcbiAgICAgICAgeyBpbmZvOiB7IHR5cGU6IFwiY3VzdG9tXCIsIGdyb3VwOiBcImN1c3RvbVwiLCBkaXNwbGF5TmFtZTogbnVsbCB9IH0pLFxuICAgIF07XG4gICAgZXhwZWN0KHVwZGF0ZShtb2NrU3RhdGUsIGltcG9ydEN1c3RvbUNvbXBvbmVudHMoaW52YWxpZDQpKSkudG9FcXVhbChtb2NrU3RhdGUpO1xuXG4gICAgY29uc3QgaW52YWxpZDUgPSBbXG4gICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICB7fSxcbiAgICAgICAgY3JlYXRlVHlwZShcImN1c3RvbS0xXCIpLFxuICAgICAgICB7IFJlbmRlckVkaXRvcjogXCJub3QgYSBmdW5jdGlvblwiIH0pLFxuICAgIF07XG4gICAgZXhwZWN0KHVwZGF0ZShtb2NrU3RhdGUsIGltcG9ydEN1c3RvbUNvbXBvbmVudHMoaW52YWxpZDUpKSkudG9FcXVhbChtb2NrU3RhdGUpO1xuXG4gICAgY29uc3QgaW52YWxpZDYgPSBbXG4gICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICB7fSxcbiAgICAgICAgY3JlYXRlVHlwZShcImN1c3RvbS0xXCIpLFxuICAgICAgICB7IGluaXRpYWxTdGF0ZTogXCJub3QgYSBmdW5jdGlvblwiIH0pLFxuICAgIF07XG4gICAgZXhwZWN0KHVwZGF0ZShtb2NrU3RhdGUsIGltcG9ydEN1c3RvbUNvbXBvbmVudHMoaW52YWxpZDYpKSkudG9FcXVhbChtb2NrU3RhdGUpO1xuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbInVuZG8iLCJpbXBvcnRDdXN0b21Db21wb25lbnRzIiwiaW1wb3J0U3RhdGUiLCJjcmVhdGVGaWVsZCIsImZpZWxkQ3JlYXRlZCIsInRvZ2dsZUNvbmZpZyIsInRvZ2dsZVJlcXVpcmVkIiwiZGVsZXRlRmllbGQiLCJ1cGRhdGVGaWVsZCIsInJlb3JkZXJGaWVsZHMiLCJkZXNjcmliZSIsImFjdGlvbiIsInR5cGUiLCJ0b0VxdWFsIiwibW9ja1N0YXRlVG9JbXBvcnQiLCJuZXdGaWVsZHNTdGF0ZSIsImZpZWxkVHlwZSIsImNyZWF0ZWRGaWVsZFN0YXRlIiwiZmllbGRTdGF0ZSIsIm5ld0ZpZWxkU3RhdGUiLCJuZXdGaWVsZHNPcmRlciIsImN1c3RvbUNvbXBvbmVudHMiLCJnbG9iYWwiLCJhc3luY0Rpc3BhdGNoTWlkZGxld2FyZSIsInN5bmNBY3Rpdml0eUZpbmlzaGVkIiwiYWN0aW9uUXVldWUiLCJmbHVzaFF1ZXVlIiwiZm9yRWFjaCIsInN0b3JlIiwiZGlzcGF0Y2giLCJhIiwiYXN5bmNEaXNwYXRjaCIsImFzeW5jQWN0aW9uIiwiY29uY2F0IiwiYWN0aW9uV2l0aEFzeW5jRGlzcGF0Y2giLCJJbW11dGFibGUiLCJtZXJnZSIsImZha2VBY3Rpb24iLCJkb25lIiwibmV4dCIsInJldHVybmVkQWN0aW9uIiwibm90IiwidW5kZWZpbmVkIiwiZmFrZUFzeW5jQWN0aW9uIiwiZmFrZVN0b3JlIiwiX2lzQXJyYXkiLCJfc2xpY2UiLCJyZXF1aXJlJCQxIiwicmVxdWlyZSQkMCIsIl9jaGVja0Zvck1ldGhvZCIsIl9pc1BsYWNlaG9sZGVyIiwiX2N1cnJ5MSIsIl9jdXJyeTIiLCJyZXF1aXJlJCQyIiwiX2N1cnJ5MyIsImFsd2F5cyIsIm92ZXIiLCJzZXQiLCJfYXJpdHkiLCJfcGlwZSIsIl94d3JhcCIsImJpbmQiLCJfaXNTdHJpbmciLCJpc0FycmF5TGlrZSIsIl9yZWR1Y2UiLCJzbGljZSIsInJlcXVpcmUkJDMiLCJfY29uY2F0IiwicHJvcCIsIl9pc1RyYW5zZm9ybWVyIiwiX2Rpc3BhdGNoYWJsZSIsIl9tYXAiLCJfeG1hcCIsIl9jdXJyeU4iLCJjdXJyeU4iLCJfaGFzIiwiX2lzQXJndW1lbnRzIiwia2V5cyIsInJlcXVpcmUkJDYiLCJyZXF1aXJlJCQ1IiwicmVxdWlyZSQkNCIsIm1hcCIsImxlbnMiLCJjdXJyeSIsIkVpdGhlciIsInVwZGF0ZUF0IiwiX2RlZmF1bHQiLCJrZXlBcnJheSIsIm5ld1ZhbCIsIm9iaiIsImRlZXBOZXdWYWwiLCJyZWR1Y2VSaWdodCIsInJlc3VsdCIsImtleSIsImRlZXAiLCJTdGF0ZUxlbnNlcyIsIl9kZWZhdWx0MiIsIl9kZWZhdWx0MyIsImNyZWF0ZUlkIiwiRGF0ZSIsIm5vdyIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInB1c2hIaXN0b3J5U3RhdGUiLCJzdGF0ZSIsIm5ld0hpc3RvcnlTdGF0ZSIsIl9kZWZhdWx0NCIsImZpZWxkc1N0YXRlSGlzdG9yeSIsIl9kZWZhdWx0NiIsImZpZWxkc1N0YXRlIiwiaGlkZUNvbmZpZ3MiLCJfZGVmYXVsdDciLCJPYmplY3QiLCJhc3NpZ24iLCJzIiwiY29uZmlnU2hvd2luZyIsInByb3BlcnR5VHlwZUNoZWNrIiwicHJvcGVydHlOYW1lIiwiYmFiZWxIZWxwZXJzLnR5cGVvZiIsIlJpZ2h0IiwiTGVmdCIsInZhbGlkYXRlRmllbGQiLCJmcm9tTnVsbGFibGUiLCJsZWZ0TWFwIiwiZnMiLCJjaGFpbiIsImxhc3RIaXN0b3J5U3RhdGUiLCJfIiwiSW5maW5pdHkiLCJfaWRlbnRpdHkiLCJhcCIsInByZXBlbmQiLCJzZXF1ZW5jZSIsIl9hcnJheUZyb21JdGVyYXRvciIsIl9mdW5jdGlvbk5hbWUiLCJpZGVudGljYWwiLCJfZXF1YWxzIiwiaXNBcnJheSIsIkFycmF5IiwiYXJyIiwiZmllbGRUeXBlSXNWYWxpZCIsInZhbGlkVHlwZXMiLCJmaWVsZCIsImZpbmQiLCJ2YWxpZEZpZWxkVHlwZXMiLCJvZiIsInZhbGlkYXRlRmllbGRzU3RhdGUiLCJmaWVsZFR5cGVzIiwiYWRkUmVxdWlyZWRQcm9wZXJ0aWVzIiwiZmllbGRTdGF0ZXMiLCJpZCIsImJpbWFwIiwiY29uc29sZSIsImVycm9yIiwiZ2V0T3JFbHNlIiwiX3JlZHVjZWQiLCJfeGZCYXNlIiwiX3hmaW5kIiwiVGFzayIsInR5cGVDb25zdHJ1Y3RvciIsInYiLCJpbmZvIiwicmVqZWN0IiwicmVzb2x2ZSIsImNhbGxlZCIsImNvbnN0ciIsImluaXRpYWxTdGF0ZSIsIlByb21pc2UiLCJ0aGVuIiwiY2F0Y2giLCJpbnNlcnRSZXF1aXJlZFByb3BzIiwiY3JlYXRlRmllbGRBc3luY2hyb25vdXNseSIsInJlamVjdGVkIiwiZm9yayIsImVyciIsIk1heWJlIiwiY2xvbmUiLCJ1bmltcGxlbWVudGVkIiwibm9vcCIsImhpc3RvcnlTdGF0ZVdpdGhOZXdGaWVsZCIsIm5ld0ZpZWxkIiwiX2RlZmF1bHQ1IiwicmVwbGFjZUZpZWxkU3RhdGUiLCJhRmllbGQiLCJyZXF1aXJlZCIsIl9maWx0ZXIiLCJfaXNPYmplY3QiLCJfeGZpbHRlciIsImhpc3RvcnlTdGF0ZVdpdGhvdXRGaWVsZCIsInVwZGF0ZUZpZWxkU3RhdGUiLCJoaXN0b3J5U3RhdGVXaXRoTmV3T3JkZXIiLCJuZXdPcmRlciIsImYxIiwiZjIiLCJpbmRleE9mIiwibyIsImxlbmd0aCIsInN0YXRlSWRzIiwibm9NaXNzaW5nSWQiLCJyZWR1Y2UiLCJhY2MiLCJmSWQiLCJpbmNsdWRlcyIsImhhc1JlcXVpcmVkSW5mbyIsImNvbXBvbmVudCIsImMiLCJpc0NvbXBvbmVudFZhbGlkIiwidmFsaWRhdGVDb21wb25lbnRzIiwiYWRkVG9GaWVsZFR5cGVzIiwiYWN0aW9uSGFuZGxlcnMiLCJpc0V4cGVjdGVkQWN0aW9uIiwiaXNSZWR1eEFjdGlvbiIsInVwZGF0ZSIsImFzc2VydCIsImN1cnJlbnRGaWVsZHNTdGF0ZSIsIm9sZEZpZWxkc1N0YXRlIiwibW9ja1N0YXRlIiwiZW1wdHlNb2NrU3RhdGUiLCJlbXB0eUhpc3RvcnlNb2NrU3RhdGUiLCJtb2RpZmllZFN0YXRlIiwidW5kb0FjdGlvbiIsInR5cGVzQXJyYXkiLCJtb2NrQ3VycmVudFN0YXRlIiwibW9ja0hpc3RvcnkiLCJuZXdWYWxpZFN0YXRlIiwibmV3SW52YWxpZFN0YXRlIiwidXBkYXRlZCIsImRpc3BsYXlOYW1lIiwiZ3JvdXAiLCJ2YWxpZFN0YXRlMiIsImlkeCIsInByb21pc2VUeXBlSW5zdGFuY2UiLCJwcm9taXNlVHlwZSIsInN5bmNUeXBlSW5zdGFuY2UiLCJzeW5jVHlwZSIsImFzeW5jQWNpb24iLCJqYXNtaW5lIiwiY3JlYXRlU3B5IiwidG9IYXZlQmVlbkNhbGxlZCIsImZpZWxkQ3JlYXRlZEFjdGlvbiIsIm5ld1N0YXRlIiwic2FtZVN0YXRlIiwiY2hhbmdlZDEiLCJjaGFuZ2VkMiIsImNoYW5nZWQzIiwiZmllbGRTdGF0ZUNvbmZpZ1Nob3dpbmciLCJmaWVsZFN0YXRlQ29uZmlnTm90U2hvd2luZyIsImYiLCJmaWVsZFN0YXRlSXNSZXF1aXJlZCIsImZpZWxkU3RhdGVJc05vdFJlcXVpcmVkIiwidG9CZURlbGV0ZWRGaWVsZFN0YXRlIiwiZmllbGREZWxldGVBY3Rpb24iLCJyZWNlbnRIaXN0b3J5U3RhdGUiLCJtb2NrRmllbGQxIiwibW9ja0ZpZWxkMiIsIm1vY2tGaWVsZDMiLCJtb2NrU3RhdGUyIiwib2xkRmllbGRTdGF0ZSIsImNvbG9yIiwiZmllbGRVcGRhdGVBY3Rpb24iLCJpc1NhbWUiLCJzdGF0ZTEiLCJzdGF0ZTIiLCJzYW1lU3RhdGUxIiwic2FtZVN0YXRlMiIsInNhbWVTdGF0ZTMiLCJzYW1lU3RhdGU0IiwidGVtcGxhdGVGaWVsZCIsImZpZWxkMSIsImZpZWxkMiIsImZpZWxkMyIsInJlb3JkZXJGaWVsZHNBY3Rpb24iLCJjcmVhdGVUeXBlIiwibmFtZSIsImN1c3RvbVR5cGVzIiwiaW1wb3J0Q3VzdG9tQ29tcG9uZW50c0FjdGlvbiIsImludmFsaWQxIiwiaW52YWxpZDIiLCJpbnZhbGlkMyIsImludmFsaWQ0IiwiaW52YWxpZDUiLCJSZW5kZXJFZGl0b3IiLCJpbnZhbGlkNiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFJQSxBQUFPLElBQU1BLE9BQU8sU0FBUEEsSUFBTztTQUNuQjtVQUNPO0dBRlk7Q0FBYjs7QUFLUCxBQUFPLElBQU1DLHlCQUF5QixTQUF6QkEsc0JBQXlCO1NBQ3JDO1VBQ08sd0JBRFA7O0dBRHFDO0NBQS9COztBQU9QLEFBQU8sSUFBTUMsY0FBYyxTQUFkQSxXQUFjO1NBQzFCO1VBQ08sYUFEUDs7R0FEMEI7Q0FBcEI7O0FBTVAsQUFBTyxJQUFNQyxjQUFjLFNBQWRBLFdBQWM7U0FDMUI7VUFDTyxhQURQOztHQUQwQjtDQUFwQjs7QUFNUCxBQUFPLElBQU1DLGVBQWUsU0FBZkEsWUFBZTtTQUMzQjtVQUNPLGNBRFA7O0dBRDJCO0NBQXJCOztBQU1QLEFBQU8s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RUFBRSxDQUFDLENBQUMsQ0FBQztDQUNqQyxDQUFDLENBQUM7O0FDN0JILFlBQWMsR0FBRyxTQUFTRSxRQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTs7RUFFdEMsUUFBUSxDQUFDO0lBQ1AsS0FBSyxDQUFDLEVBQUUsT0FBTyxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDaEUsS0FBSyxDQUFDLEVBQUUsT0FBTyxTQUFTLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2xFLEtBQUssQ0FBQyxFQUFFLE9BQU8sU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdEUsS0FBSyxDQUFDLEVBQUUsT0FBTyxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDMUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzlFLEtBQUssQ0FBQyxFQUFFLE9BQU8sU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDbEYsS0FBSyxDQUFDLEVBQUUsT0FBTyxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdEYsS0FBSyxDQUFDLEVBQUUsT0FBTyxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzFGLEtBQUssQ0FBQyxFQUFFLE9BQU8sU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDOUYsS0FBSyxDQUFDLEVBQUUsT0FBTyxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDbEcsS0FBSyxFQUFFLEVBQUUsT0FBTyxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3ZHLFNBQVMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2RUFBNkUsQ0FBQyxDQUFDO0dBQ3pHO0NBQ0YsQ0FBQzs7QUNoQkYsV0FBYyxHQUFHLFNBQVNDLE9B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