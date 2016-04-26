import {Subscriber} from './Subscriber';

export class EasyWatch {

    constructor(src, parent) {
        this.value = src;
        this.subscrbier = new Subscriber(parent && parent.subscrbier);

        this._toThrough(this.value);
    }

    subscribe(sub) {
        this.subscrbier.add(sub);
        return () => {
            this.subscrbier.remove(sub);
        };
    }

    _toThrough(obj) {
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
        this.subscrbier.notify();
    }
}
