
export class Subscriber {

    constructor(parent) {
        this.parent = parent;
        this.subs = [];
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
        this.subs.forEach(sub => {
            sub();
        });
        if (this.parent) {
            this.parent.notify();
        }
    }

}
