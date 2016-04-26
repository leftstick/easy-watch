easy-watch
================

[![NPM version][npm-image]][npm-url]
![][travis-url]
![][david-url]
![][dt-url]
![][license-url]

Super simple dirty checker inspired by [@尤小右](https://github.com/yyx990803)'s [vue](http://vuejs.org/). BTW, [vue](http://vuejs.org/) is really awesome^^!

## Installation ##

```bash
npm install --save easy-watch
```

## Usage ##

### Import ###

```javascript
//commonjs
var Watch = require('easy-watch').EasyWatch;

//ES2015
import {EasyWatch} from 'easy-watch';
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

## LICENSE ##

[MIT License](https://raw.githubusercontent.com/leftstick/easy-watch/master/LICENSE)


[npm-url]: https://npmjs.org/package/easy-watch
[npm-image]: https://badge.fury.io/js/easy-watch.png
[travis-url]:https://api.travis-ci.org/leftstick/easy-watch.svg?branch=master
[david-url]: https://david-dm.org/leftstick/easy-watch.png
[dt-url]:https://img.shields.io/npm/dt/easy-watch.svg
[license-url]:https://img.shields.io/npm/l/easy-watch.svg
