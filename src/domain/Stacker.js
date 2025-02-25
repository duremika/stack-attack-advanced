class Stacker {
    constructor(color, direction, coordinates) {
        this.color = color;
        this.hp = 1;
        this.xp = 0;
        this.direction = direction;
        this.coordinates = coordinates;
        this.state = State.IDLE;
        this.doubleJump = color === Color.GREEN;
        this.force = color === Color.BLUE;
        this.item = null;
        this.head = new Head(this);
    }

    moveForward() {
        this.state = State.RUN;
        this.antigravity = true;
        let action;
        switch (this.direction) {
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
        this.startAction(action);
    }

    push() {
        this.state = State.PUSH;
        this.antigravity = true;
        let action;
        switch (this.direction) {
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
        this.startAction(action);
    }

    pull() {
        this.state = State.PUSH;
        this.antigravity = true;
        let action;
        switch (this.direction) {
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
        this.startAction(action);
    }

    jumpUp(nextAction) {
        this.antigravity = true;
        this.state = State.JUMP;
        const offset = this.doubleJump ? 0.5 : 0.25;
        this.startAction(() => this.coordinates.z += offset, nextAction);
    }

    jumpUpAndForward() {
        this.antigravity = true;
        this.state = State.JUMP;
        const offset = this.doubleJump ? 0.5 : 0.25;
        let action;
        switch (this.direction) {
            case Direction.NORTH:
                action = () => {
                    this.coordinates.z += offset;
                    this.coordinates.y -= 0.25;
                };
                break;
            case Direction.EAST:
                action = () => {
                    this.coordinates.z += offset;
                    this.coordinates.x += 0.25;
                };
                break;
            case Direction.SOUTH:
                action = () => {
                    this.coordinates.z += offset;
                    this.coordinates.y += 0.25;
                };
                break;
            case Direction.WEST:
                action = () => {
                    this.coordinates.z += offset;
                    this.coordinates.x -= 0.25;
                };
                break;
        }
        this.startAction(action);
    }

    startAction(action, nextAction) {
        for (let i = 0; i < 4; i++) {
            setTimeout(action, i * 125);
        }
        setTimeout(() => {
            if (nextAction) {
                nextAction();
            } else {
                this.reset();
            }
        }, 495);
    }

    reset() {
        this.state = State.IDLE;
        this.antigravity = false;
    }
}