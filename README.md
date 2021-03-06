easy-watch
================

[![NPM version][npm-image]][npm-url]
![][travis-url]
![][david-url]
![][dt-url]
![][license-url]

Super simple dirty checker inspired by [@尤小右](https://github.com/yyx990803)'s [vue](http://vuejs.org/). BTW, [vue](http://vuejs.org/) is really awesome^^!

You may think of this as some kind of black magic, but `Object.defineProperty` is part of standard. And it's faster to go in this way than `AngularJS`'s `$digest` cycle.

## Installation ##

```bash
npm install --save easy-watch
```

## Usage ##

### Import ###

**commonjs**

```javascript
var Watch = require('easy-watch').EasyWatch;
```

**ES2015(ES6)**
```javascript
import {EasyWatch as Watch} from 'easy-watch';
```

**script**
```html
<script src="easy-watch/dist/easywatch.js" charset="utf-8" type="text/javascript"></script>
<script type="text/javascript">
    var Watch = window.EasyWatch;
</script>
```

### Watch Object ###

```javascript
var userInfo = {
    name: 'leftstick',
    age: 31
};

var watcher = new Watch(userInfo);

watcher.subscribe(function(){
    //gets called whenever userInfo changes
    console.log(userInfo);// { name: 'leftstick', age: 26 }
});

setTimeout(function() {
    userInfo.age = 26;
});
```

### Watch Array ###

```javascript
var cities = ['Beijing', 'Shanghai'];

var watcher = new Watch(cities);

watcher.subscribe(function(){
    //gets called whenever cities changes
    console.log(cities);// ['Beijing', 'Shanghai', 'Tianjin']
});

setTimeout(function() {
    cities.push('Tianjin');
});
```

### Unsubscribe ###

```javascript
var obj = {name: 'Beijing'};
var watcher = new Watch(obj);

var unsubscribe = watcher.subscribe(() => {
    //never gets called because it is unsubscribed immediately
});

unsubscribe();

setTimeout(function() {
    obj.name = 'Shanghai';
});
```

**Due to limitation of current JavaScript implementation, it's hard to detect if new property added to the object, or property removed from object. So we need extra method to handle those scenario**

### add property to Object via $set ###

```javascript
var userInfo = {};

var watcher = new Watch(userInfo);

watcher.subscribe(function(){
    //gets called while new property "name" is added via $set method
    console.log(userInfo);// { name: 'Beijing' }
});

setTimeout(function() {
    userInfo.$set('name', 'Beijing');
});
```

### remove property from Object via $remove ###

```javascript
var userInfo = {name: 'Shanghai'};

var watcher = new Watch(userInfo);

watcher.subscribe(function(){
    //gets called while new property "name" is added via $set method
    console.log(userInfo);// {  }
});

setTimeout(function() {
    userInfo.$remove('name');
});
```


## Run Unit-tests ##

I wrote some unit-tests to verify the functionality. In case you want to see how they passed, all test cases placed in `test` folder, and execute following command would perform the test.

```bash
npm test
```


## LICENSE ##

[MIT License](https://raw.githubusercontent.com/leftstick/easy-watch/master/LICENSE)


[npm-url]: https://npmjs.org/package/easy-watch
[npm-image]: https://badge.fury.io/js/easy-watch.png
[travis-url]:https://api.travis-ci.org/leftstick/easy-watch.svg?branch=master
[david-url]: https://david-dm.org/leftstick/easy-watch.png
[dt-url]:https://img.shields.io/npm/dt/easy-watch.svg
[license-url]:https://img.shields.io/npm/l/easy-watch.svg
