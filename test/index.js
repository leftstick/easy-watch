
import {EasyWatch} from '../src/index';

describe('dirty checker', function() {

    it('one level object', function() {
        var obj = {name: 'Beijing'};
        var watcher = new EasyWatch(obj);

        watcher.subscribe(function() {
            expect(obj.name).to.be.equal('Shanghai');
        });

        obj.name = 'Shanghai';
    });

    it('one level object: multiple subscribers', function() {
        var obj = {name: 'Beijing'};
        var watcher = new EasyWatch(obj);

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
        var watcher = new EasyWatch(obj);

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
        var watcher = new EasyWatch(user);

        watcher.subscribe(function() {
            expect(user.child.age).to.be.equal(9);
            done();
        });

        setTimeout(function() {
            user.child.age = 9;
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
        var watcher = new EasyWatch(user);

        watcher.subscribe(function() {
            expect(user.child.noway).to.be.equal('nonono');
            done();
        });

        setTimeout(function() {
            user.child = {noway: 'nonono'};
        });
    });

    it('simeple array', function(done) {
        var arr = ['Beijing', 'Shanghai'];
        var watcher = new EasyWatch(arr);

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
        var watcher = new EasyWatch(arr);

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
        var watcher = new EasyWatch(obj);

        watcher.subscribe(function() {
            expect(obj.districts.length).to.be.equal(6);
            expect(obj.districts[5]).to.be.equal('Fengtai');
            done();
        });

        setTimeout(function() {
            obj.districts.push('Tongzhou', 'Fengtai');
        });
    });
});
