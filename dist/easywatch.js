(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EasyWatch = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Subscriber = __webpack_require__(1);

	var _Arrays = __webpack_require__(2);

	var _Object = __webpack_require__(3);

	var _Util = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EasyWatch = exports.EasyWatch = function () {
	    function EasyWatch(src, parent) {
	        _classCallCheck(this, EasyWatch);

	        if (!(0, _Util.isArray)(src) && !(0, _Util.isPlainObject)(src)) {
	            throw new Error('Only object or array can be watched');
	        }
	        Object.defineProperty(src, '__wa__', {
	            value: this,
	            enumerable: false,
	            writable: true,
	            configurable: true
	        });
	        this.value = src;
	        this.subscriber = new _Subscriber.Subscriber(parent && parent.subscriber);

	        this._goThrough(this.value);
	    }

	    _createClass(EasyWatch, [{
	        key: 'subscribe',
	        value: function subscribe(sub) {
	            var _this2 = this;

	            this.subscriber.add(sub);
	            return function () {
	                _this2.subscriber.remove(sub);
	            };
	        }
	    }, {
	        key: '_goThrough',
	        value: function _goThrough(value) {
	            if ((0, _Util.isArray)(value)) {
	                return this._goThroughArray(value);
	            }
	            this._goThroughObj(value);
	        }
	    }, {
	        key: '_goThroughObj',
	        value: function _goThroughObj(obj) {
	            var _this3 = this;

	            // eslint-disable-next-line no-proto
	            obj.__proto__ = _Object.interceptedObject;

	            var keys = Object.keys(obj);
	            keys.forEach(function (key) {
	                _this3._redefineProperty(obj, key, obj[key]);
	            });
	        }
	    }, {
	        key: '_goThroughArray',
	        value: function _goThroughArray(arr) {
	            var _this4 = this;

	            // eslint-disable-next-line no-proto
	            arr.__proto__ = _Arrays.interceptedArray;

	            arr.filter(function (item) {
	                return (0, _Util.isArray)(item) || (0, _Util.isPlainObject)(item);
	            }).forEach(function (item) {
	                // eslint-disable-next-line no-new
	                new EasyWatch(item, _this4);
	            });
	        }
	    }, {
	        key: '_redefineProperty',
	        value: function _redefineProperty(obj, key, val) {
	            var value = val;
	            var _this = this;

	            this._watch(val);

	            Object.defineProperty(obj, key, {
	                enumerable: true,
	                configurable: true,
	                get: function get() {
	                    return value;
	                },
	                set: function set(newValue) {
	                    if (value === newValue) {
	                        return;
	                    }
	                    value = newValue;
	                    _this._watch(newValue);
	                    _this._notify();
	                }
	            });
	        }
	    }, {
	        key: '_watch',
	        value: function _watch(obj) {
	            if (!obj || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
	                return;
	            }
	            return new EasyWatch(obj, this);
	        }
	    }, {
	        key: '_notify',
	        value: function _notify() {
	            this.subscriber.notify();
	        }
	    }]);

	    return EasyWatch;
	}();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Subscriber = exports.Subscriber = function () {
	    function Subscriber(parent) {
	        _classCallCheck(this, Subscriber);

	        this.parent = parent;
	        this.subs = [];
	    }

	    _createClass(Subscriber, [{
	        key: "add",
	        value: function add(sub) {
	            this.subs.push(sub);
	        }
	    }, {
	        key: "remove",
	        value: function remove(sub) {
	            var index = this.subs.indexOf(sub);
	            if (index > -1) {
	                return this.subs.splice(index, 1);
	            }
	        }
	    }, {
	        key: "notify",
	        value: function notify() {
	            this.subs.forEach(function (sub) {
	                sub();
	            });
	            if (this.parent) {
	                this.parent.notify();
	            }
	        }
	    }]);

	    return Subscriber;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var interceptedArray = exports.interceptedArray = function () {
	    var arrayProto = Array.prototype;
	    var proto = Object.create(arrayProto);

	    var modifyMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

	    modifyMethods.forEach(function (method) {
	        // cache original method
	        var original = arrayProto[method];

	        Object.defineProperty(proto, method, {
	            value: function value() {
	                var args = arrayProto.slice.apply(arguments);
	                var result = original.apply(this, args);
	                var inserted;
	                switch (method) {
	                    case 'push':
	                        inserted = args;
	                        break;
	                    case 'unshift':
	                        inserted = args;
	                        break;
	                    case 'splice':
	                        inserted = args.slice(2);
	                        break;
	                    default:
	                        break;
	                }
	                if (inserted) {
	                    this.__wa__._goThroughArray.bind(this.__wa__)(inserted);
	                }
	                this.__wa__._notify.bind(this.__wa__)();
	                return result;
	            },
	            enumerable: false,
	            writable: true,
	            configurable: true
	        });
	    });

	    return proto;
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.interceptedObject = undefined;

	var _Util = __webpack_require__(4);

	var interceptedObject = exports.interceptedObject = function () {
	    var proto = Object.create({});

	    Object.defineProperty(proto, '$set', {
	        enumerable: false,
	        writable: false,
	        configurable: false,
	        value: function (_value) {
	            function value(_x, _x2) {
	                return _value.apply(this, arguments);
	            }

	            value.toString = function () {
	                return _value.toString();
	            };

	            return value;
	        }(function (property, value) {
	            this[property] = value;
	            if ((0, _Util.isPlainObject)(value)) {
	                this.__wa__._goThroughObj.bind(this.__wa__)(value);
	            } else if ((0, _Util.isArray)(value)) {
	                this.__wa__._goThroughArray.bind(this.__wa__)(value);
	            }
	            this.__wa__._notify.bind(this.__wa__)();
	        })
	    });

	    Object.defineProperty(proto, '$remove', {
	        enumerable: false,
	        writable: false,
	        configurable: false,
	        value: function (_value2) {
	            function value(_x3) {
	                return _value2.apply(this, arguments);
	            }

	            value.toString = function () {
	                return _value2.toString();
	            };

	            return value;
	        }(function (property) {
	            delete this[property];
	            if ((0, _Util.isPlainObject)(value)) {
	                this.__wa__._goThroughObj.bind(this.__wa__)(value);
	            } else if ((0, _Util.isArray)(value)) {
	                this.__wa__._goThroughArray.bind(this.__wa__)(value);
	            }
	            this.__wa__._notify.bind(this.__wa__)();
	        })
	    });

	    return proto;
	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isArray = exports.isArray = function isArray(arr) {
	  return Object.prototype.toString.call(arr) === '[object Array]';
	};

	var isPlainObject = exports.isPlainObject = function isPlainObject(obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]';
	};

/***/ }
/******/ ])
});
;