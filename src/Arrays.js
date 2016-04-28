import {isPlainObject, isArray} from './Util';

export const interceptedArray = (function() {
    var arrayProto = Array.prototype;
    var proto = Object.create(arrayProto);

    var modifyMethods = [
        'push',
        'pop',
        'shift',
        'unshift',
        'splice',
        'sort',
        'reverse'
    ];

    var removeDepends = function(items, depend) {
        items
            .filter(item => isPlainObject(item) || isArray(item))
            .forEach(item => {
                item.__wa__.subscriber._removeDep(depend);
            });
    };

    modifyMethods.forEach(function(method) {
        // cache original method
        var original = arrayProto[method];

        Object.defineProperty(proto, method, {
            value: function() {
                var args = arrayProto.slice.apply(arguments);
                var result = original.apply(this, args);
                var inserted,
                    removed;
                switch (method) {
                    case 'push':
                        inserted = args;
                        break;
                    case 'unshift':
                        inserted = args;
                        break;
                    case 'splice':
                        inserted = args.slice(2);
                        removed = result;
                        break;
                    case 'pop':
                        removed = [result];
                        break;
                    case 'shift':
                        removed = typeof result === 'undefined' ? [] : [result];
                        break;
                    default:
                        break;
                }
                if (inserted) {
                    this.__wa__._goThroughArray.bind(this.__wa__)(inserted);
                }

                if (removed) {
                    removeDepends(removed, this.__wa__);
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
}());
