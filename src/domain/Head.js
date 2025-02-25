class Head {
    constructor(stacker) {
        this.stacker = stacker;
    }

    get coordinates() {
        return this.stacker.coordinates.up();
    }
}
