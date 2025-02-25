class Box extends Entity {
    constructor(color, coordinates) {
        super(coordinates);
        this.color = color;
        this.isMovable = color !== Color.GRAY;
    }
}