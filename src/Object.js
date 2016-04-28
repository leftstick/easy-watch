import {isPlainObject, isArray} from './Util';

export const interceptedObject = (function() {
    var proto = Object.create({});

    Object.defineProperty(proto, '$set', {
        enumerable: false,
        writable: false,
        configurable: false,
        value: function(property, value) {
            if (isPlainObject(value)) {
                this.__wa__._goThroughObj(value);
            } else if (isArray(value)) {
                this.__wa__._goThroughArray(value);
            } else {
                this.__wa__._redefineProperty(this, property, value);
            }
            this.__wa__._notify();
        }
    });

    Object.defineProperty(proto, '$remove', {
        enumerable: false,
        writable: false,
        configurable: false,
        value: function(property) {
            if (isPlainObject(this[property]) || isArray(this[property])) {
                this[property].__wa__.subscriber._removeDep(this.__wa__);
            }
            delete this[property];

            this.__wa__._notify();
        }
    });

    return proto;
}());
