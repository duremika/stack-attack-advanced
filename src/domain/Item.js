const ItemType = Object.freeze({
    HOUR_GLASS: Symbol("hourglass"),
    MAGNET: Symbol("magnet"),
    HAMMER: Symbol("hammer"),
    HEART: Symbol("heart"),
    FEATHER: Symbol("feather"),
    WEIGHT: Symbol("weight"),
    BOMB: Symbol("bomb"),
});

class Item extends Entity {
    constructor(coordinates, type) {
        super(coordinates);
        this.type = type;
    }
}