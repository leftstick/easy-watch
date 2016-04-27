import {isPlainObject, isArray} from './Util';

export const interceptedObject = (function() {
    var proto = Object.create({});

    Object.defineProperty(proto, '$set', {
        enumerable: false,
        writable: false,
        configurable: false,
        value: function(property, value) {
            this[property] = value;
            if (isPlainObject(value)) {
                this.__wa__._goThroughObj.bind(this.__wa__)(value);
            } else if (isArray(value)) {
                this.__wa__._goThroughArray.bind(this.__wa__)(value);
            }
            this.__wa__._notify.bind(this.__wa__)();
        }
    });

    Object.defineProperty(proto, '$remove', {
        enumerable: false,
        writable: false,
        configurable: false,
        value: function(property) {
            delete this[property];
            if (isPlainObject(value)) {
                this.__wa__._goThroughObj.bind(this.__wa__)(value);
            } else if (isArray(value)) {
                this.__wa__._goThroughArray.bind(this.__wa__)(value);
            }
            this.__wa__._notify.bind(this.__wa__)();
        }
    });

    return proto;
}());
