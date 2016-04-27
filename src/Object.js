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
            if (isPlainObject(this[property]) || isArray(this[property])) {
                this[property].__wa__.subscriber.parent = null;
                if (isArray(this[property])) {
                    this[property].forEach(item => {
                        item.__wa__.subscriber.parent = null;
                        delete item.__wa__;
                    });
                }
                delete this[property].__wa__;
            }
            delete this[property];

            this.__wa__._notify.bind(this.__wa__)();
        }
    });

    return proto;
}());
