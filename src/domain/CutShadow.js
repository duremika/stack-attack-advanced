const CutShadowDirection = Object.freeze({
    DL: Symbol("dl"),
    DR: Symbol("dr"),
    UL: Symbol("ul"),
    UR: Symbol("ur"),
});

class CutShadow {
    constructor(coordinates, percent, direction) {
        this.coordinates = coordinates;
        this.percent = percent;
        this.direction = direction;
    }
}
