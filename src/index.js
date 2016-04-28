import {Subscriber} from './Subscriber';
import {interceptedArray} from './Arrays';
import {interceptedObject} from './Object';

import {isPlainObject, isArray} from './Util';

export class EasyWatch {

    constructor(src, depend) {
        if (!isArray(src) && !isPlainObject(src)) {
            throw new Error('Only object or array can be watched');
        }
        Object.defineProperty(src, '__wa__', {
            value: this,
            enumerable: false,
            writable: true,
            configurable: true
        });
        this.value = src;
        this.subscriber = new Subscriber(depend);

        this._goThrough(this.value);
    }

    subscribe(sub) {
        this.subscriber.add(sub);
        return () => {
            this.subscriber.remove(sub);
        };
    }

    _goThrough(value) {
        if (isArray(value)) {
            return this._goThroughArray(value);
        }
        this._goThroughObj(value);
    }

    _goThroughArray(arr) {
        // eslint-disable-next-line no-proto
        arr.__proto__ = interceptedArray;

        arr
            .filter(item => isArray(item) || isPlainObject(item))
            .forEach(item => {
                // eslint-disable-next-line no-new
                new EasyWatch(item, this);
            });
    }

    _goThroughObj(obj) {
        // eslint-disable-next-line no-proto
        obj.__proto__ = interceptedObject;

        var keys = Object.keys(obj);
        keys.forEach(key => {
            this._redefineProperty(obj, key, obj[key]);
        });
    }

    _redefineProperty(obj, key, val) {
        var value = val;
        var _this = this;

        this._watch(val);

        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                return value;
            },
            set: function(newValue) {
                if (value === newValue) {
                    return;
                }
                if (isPlainObject(value) || isArray(value)) {
                    value.__wa__.subscriber._removeDep(this.__wa__);
                }
                value = newValue;
                _this._watch(newValue);
                _this._notify();
            }
        });
    }

    _watch(obj) {
        if (!obj || typeof obj !== 'object') {
            return;
        }
        return new EasyWatch(obj, this);
    }

    _notify() {
        this.subscriber.notify();
    }
}
