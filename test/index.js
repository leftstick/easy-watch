
import {EasyWatch as Watch} from '../src/index';

describe('dirty checker', function() {

    it('one level object', function() {
        var obj = {name: 'Beijing'};
        var watcher = new Watch(obj);

        watcher.subscribe(function() {
            expect(obj.name).to.be.equal('Shanghai');
        });

        obj.name = 'Shanghai';
    });

    it('one level object: multiple subscribers', function() {
        var obj = {name: 'Beijing'};
        var watcher = new Watch(obj);

        watcher.subscribe(function() {
            expect(obj.name).to.be.equal('Shanghai');
        });

        watcher.subscribe(function() {
            expect(obj.name).to.be.equal('Shanghai');
        });

        obj.name = 'Shanghai';
    });

    it('one level object: multiple properties', function(done) {
        var obj = {name: 'Beijing', size: 16410.54, population: 2152};
        var watcher = new Watch(obj);

        var counter = 0;
        watcher.subscribe(function() {
            if (counter === 0) {
                expect(obj.name).to.be.equal('Shanghai');
            } else if (counter === 1) {
                expect(obj.size).to.be.equal(6340);
            } else if (counter === 2) {
                expect(obj.population).to.be.equal(2426);
                done();
            }
            counter++;
        });

        setTimeout(function() {
            obj.name = 'Shanghai';
            obj.size = 6340;
            obj.population = 2426;
        });
    });

    it('two levels object', function(done) {
        var user = {
            name: 'Xiaoguang',
            child: {
                nickname: 'xxguang',
                age: 11
            }
        };
        var watcher = new Watch(user);

        watcher.subscribe(function() {
            expect(user.child.age).to.be.equal(9);
            done();
        });

        setTimeout(function() {
            user.child.age = 9;
        });
    });

    it('four levels object', function(done) {
        var user = {
            name: 'Xiaoguang',
            child: {
                nickname: 'xxguang',
                age: 11,
                level3: {
                    test: 'testtt',
                    level4: {
                        city: 'Tianjin'
                    }
                }
            }
        };
        var watcher = new Watch(user);

        watcher.subscribe(function() {
            expect(user.child.level3.level4).to.be.equal('Hangzhou');
            done();
        });

        setTimeout(function() {
            user.child.level3.level4 = 'Hangzhou';
        });
    });

    it('two levels object: change child reference', function(done) {
        var user = {
            name: 'Xiaoguang',
            child: {
                nickname: 'xxguang',
                age: 11
            }
        };
        var watcher = new Watch(user);

        watcher.subscribe(function() {
            expect(user.child.noway).to.be.equal('nonono');
            done();
        });

        setTimeout(function() {
            user.child = {noway: 'nonono'};
        });
    });

    it('multiple levels object: change child reference, and later changed', function(done) {
        var child = {nickname: 'xxguang', age: 11};
        var user = {name: 'Xiaoguang', child: child};
        var watcher = new Watch(user);

        var counter = 0;
        watcher.subscribe(function() {
            counter++;
            setTimeout(function() {
                expect(user.child.noway).to.be.equal('nonono');
                expect(counter).to.be.equal(1);
                done();
            }, 50);
        });

        setTimeout(function() {
            user.child = {noway: 'nonono'};
            child.age = 33;
        });
    });

    it('simeple array', function(done) {
        var arr = ['Beijing', 'Shanghai'];
        var watcher = new Watch(arr);

        watcher.subscribe(function() {
            expect(arr.length).to.be.equal(1);
            expect(arr[0]).to.be.equal('Beijing');
            done();
        });

        setTimeout(function() {
            arr.pop();
        });
    });

    it('array with simple object', function(done) {
        var arr = [{name: 'Beijing'}, {name: 'Shanghai'}];
        var watcher = new Watch(arr);

        watcher.subscribe(function() {
            expect(arr.length).to.be.equal(2);
            expect(arr[0].name).to.be.equal('Nanjing');
            done();
        });

        setTimeout(function() {
            arr[0].name = 'Nanjing';
        });
    });

    it('object with array as property', function(done) {
        var obj = {
            name: 'Beijing',
            districts: ['Daxing', 'Changping', 'Haidian', 'Chaoyang']
        };
        var watcher = new Watch(obj);

        watcher.subscribe(function() {
            expect(obj.districts.length).to.be.equal(6);
            expect(obj.districts[5]).to.be.equal('Fengtai');
            done();
        });

        setTimeout(function() {
            obj.districts.push('Tongzhou', 'Fengtai');
        });
    });

    it('object with array as property: object in array', function(done) {
        var obj = {
            name: 'Shanghai',
            districts: [{
                name: 'Changning'
            }]
        };
        var watcher = new Watch(obj);

        watcher.subscribe(function() {
            expect(obj.districts.length).to.be.equal(2);
            expect(obj.districts[1].name).to.be.equal('Putuo');
            done();
        });

        setTimeout(function() {
            obj.districts.push({name: 'Putuo'});
        });
    });

    it('object removed from array, later change should not trigger subscribe', function(done) {
        var district = {name: 'Changning'};
        var obj = {name: 'Shanghai', districts: [district]};
        var watcher = new Watch(obj);

        var counter = 0;
        watcher.subscribe(function() {
            counter++;
            setTimeout(function() {
                expect(obj.districts.length).to.be.equal(0);
                expect(counter).to.be.equal(1);
                done();
            }, 50);
        });

        setTimeout(function() {
            obj.districts.pop();
            district.name = 'Putuo';
        });
    });

    it('new property added to object', function(done) {
        var obj = {};
        var watcher = new Watch(obj);

        watcher.subscribe(function() {
            expect(obj.name).to.be.equal('Beijing');
            done();
        });

        setTimeout(function() {
            obj.$set('name', 'Beijing');
        });
    });

    it('new property added to object and later changed', function(done) {
        var obj = {};
        var watcher = new Watch(obj);
        var counter = 0;
        watcher.subscribe(function() {
            if (counter === 0) {
                expect(obj.name).to.be.equal('Beijing');
            } else if (counter === 1) {

                expect(obj.name).to.be.equal('Shanghai');
                done();
            }
            counter++;
        });

        setTimeout(function() {
            obj.$set('name', 'Beijing');
            setTimeout(function() {
                obj.name = 'Shanghai';
            }, 10);
        });
    });

    it('new property added to 3 levels depth in object', function(done) {
        var obj = {
            child: {
                kids: [
                    {
                        name: 'Shanghai'
                    }
                ]
            }
        };
        var watcher = new Watch(obj);

        watcher.subscribe(function() {
            expect(obj.child.kids[0].size).to.be.equal(16410.54);
            done();
        });

        setTimeout(function() {
            obj.child.kids[0].$set('size', 16410.54);
        });
    });

    it('property removed from object', function(done) {
        var obj = {name: 'Shanghai'};
        var watcher = new Watch(obj);

        watcher.subscribe(function() {
            expect(obj.name).to.be.equal(undefined);
            done();
        });

        setTimeout(function() {
            obj.$remove('name');
        });
    });

    it('property removed from 2 levels depth object', function(done) {
        var changning = {name: 'Changning'};

        var obj = {
            name: 'Shanghai',
            districts: [changning, {
                name: 'Putuo'
            }]
        };
        var watcher = new Watch(obj);

        var counter = 0;

        watcher.subscribe(function() {
            counter++;
            setTimeout(function() {
                expect(counter).to.be.equal(1);
                done();
            }, 10);
        });

        setTimeout(function() {
            obj.$remove('districts');

            //following update won't trigger subscribe
            //since it was removed from the watched node
            changning.name = 'Hebei';
        });
    });

    it('unsubscribe', function(done) {
        var obj = {name: 'Beijing'};
        var watcher = new Watch(obj);

        var counter = 0;
        var unsubscribe = watcher.subscribe(() => {
            counter++;
        });

        unsubscribe();

        setTimeout(function() {
            obj.name = 'Shanghai';
            setTimeout(function() {
                expect(counter).to.be.equal(0);
                done();
            });
        });

    });
});
