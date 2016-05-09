
export class Subscriber {

    constructor(depend) {
        this.subs = [];
        this.deps = [];

        this._addDep(depend);

        this.timer = setImmediate || setTimeout;
        this.timerClear = clearImmediate || clearTimeout;
        this.lastNotifyId;
    }

    _addDep(depend) {
        if (depend) {
            this.deps.push(depend);
        }
    }

    _removeDep(depend) {
        if (depend) {
            var index = this.deps.indexOf(depend);
            if (index > -1) {
                return this.deps.splice(index, 1);
            }
        }
    }

    add(sub) {
        this.subs.push(sub);
    }

    remove(sub) {
        var index = this.subs.indexOf(sub);
        if (index > -1) {
            return this.subs.splice(index, 1);
        }
    }

    notify() {
        this.timerClear(this.lastNotifyId);
        this.lastNotifyId = this.timer(() => {
            this.subs.forEach(sub => {
                sub();
            });

            this.deps.forEach(dep => {
                dep._notify();
            });
        });
    }

}
