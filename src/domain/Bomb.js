class Bomb extends Item {
    constructor(coordinates, color) {
        super(coordinates, ItemType.BOMB);
        this.color = color;
    }
}
