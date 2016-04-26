
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
});
