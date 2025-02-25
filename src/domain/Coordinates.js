class Coordinates {

    static MAX = 8;

    static randomXYonZ(z) {
        return new Coordinates(
            Math.floor(Math.random() * Coordinates.MAX),
            Math.floor(Math.random() * Coordinates.MAX),
            z
        );
    }

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    isValidCoordinates() {
        return this.x >= 0 && this.x < Coordinates.MAX &&
            this.y >= 0 && this.y < Coordinates.MAX &&
            this.z >= 0 && this.z < Coordinates.MAX;
    }

    isAdjacent(other) {
        if (this.x === other.x) {
            if (this.y === other.y) {
                return Math.abs(this.z - other.z) === 1;
            }
            return this.z === other.z && Math.abs(this.y - other.y) === 1;
        }
        return this.y === other.y && this.z === other.z && Math.abs(this.x - other.x) === 1;
    }

    equals(coordinates) {
        return this.x === coordinates.x && this.y === coordinates.y && this.z === coordinates.z;
    }

    forward(direction) {
        switch (direction) {
            case Direction.NORTH:
                return new Coordinates(this.x, this.y - 1, this.z);
            case Direction.EAST:
                return new Coordinates(this.x + 1, this.y, this.z);
            case Direction.SOUTH:
                return new Coordinates(this.x, this.y + 1, this.z);
            case Direction.WEST:
                return new Coordinates(this.x - 1, this.y, this.z);
        }
    }

    back(direction) {
        switch (direction) {
            case Direction.NORTH:
                return new Coordinates(this.x, this.y + 1, this.z);
            case Direction.EAST:
                return new Coordinates(this.x - 1, this.y, this.z);
            case Direction.SOUTH:
                return new Coordinates(this.x, this.y - 1, this.z);
            case Direction.WEST:
                return new Coordinates(this.x + 1, this.y, this.z);
        }
    }

    up() {
        return new Coordinates(this.x, this.y, this.z + 1);
    }

    down() {
        return new Coordinates(this.x, this.y, this.z - 1);
    }

    presses(coordinates) {
        return coordinates.x <= this.x + 0.75 && this.x - 0.75 <= coordinates.x &&
            coordinates.y <= this.y + 0.75 && this.y - 0.75 <= coordinates.y &&
            coordinates.z >= this.z - 0.75 && this.z > coordinates.z
    }
}