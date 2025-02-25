class Entity {
    constructor(coordinates) {
        this.coordinates = coordinates;
        this.isMovable = true;
        this.antigravity = false;
    }

    moveForward(direction) {
        this.antigravity = true;
        let action;
        switch (direction) {
            case Direction.NORTH:
                action = () => this.coordinates.y -= 0.25;
                break;
            case Direction.EAST:
                action = () => this.coordinates.x += 0.25;
                break;
            case Direction.SOUTH:
                action = () => this.coordinates.y += 0.25;
                break;
            case Direction.WEST:
                action = () => this.coordinates.x -= 0.25;
                break;
        }

        for (let i = 0; i < 4; i++) {
            setTimeout(action, i * 125);
        }
        setTimeout(() => {
            this.antigravity = false;
        }, 500);
    }

    moveBack(direction) {
        this.antigravity = true;
        let action;
        switch (direction) {
            case Direction.NORTH:
                action = () => this.coordinates.y += 0.25;
                break;
            case Direction.EAST:
                action = () => this.coordinates.x -= 0.25;
                break;
            case Direction.SOUTH:
                action = () => this.coordinates.y -= 0.25;
                break;
            case Direction.WEST:
                action = () => this.coordinates.x += 0.25;
                break;
        }

        for (let i = 0; i < 4; i++) {
            setTimeout(action, i * 125);
        }
        setTimeout(() => {
            this.antigravity = false;
        }, 500);
    }
}