class Warehouse {
    static lastEntityId = 0;
    static shadowZOffset = 0.01;

    constructor(stacker) {
        this.stats = new Stats();
        this.stacker = stacker;
        this.entities = new Set();
        this.usingItem = false;
        this.pauseDrop = false;
    }

    addEntity(entity) {
        entity.id = ++Warehouse.lastEntityId;
        this.entities.add(entity);
    }

    getSortedEntities() {
        return Array.from(this.entities)
            .concat(this.stacker)
            .concat(this.stacker.head)
            .concat(...this.getShadows())
            .sort((a, b) => {
                const diff = a.coordinates.z - b.coordinates.z;
                if (Math.abs(diff) === Warehouse.shadowZOffset) {
                    return diff;
                } else {
                    return a.coordinates.depth() - b.coordinates.depth();
                }
            });
    }

    getShadows() {
        const shadows = [];
        Array.from(this.entities).forEach(entity => {
            const coordinates = new Coordinates(
                entity.coordinates.x,
                entity.coordinates.y,
                0
            );

            while (coordinates.z < entity.coordinates.z) {
                const [found] = this.findEntities([coordinates]);
                if (!found || found === entity) {
                    break;
                }
                coordinates.z++;
            }
            if (coordinates.z !== entity.coordinates.z) {
                coordinates.z -= Warehouse.shadowZOffset;
                shadows.push(new Shadow(coordinates, entity));
            }
        });

        const [xPercent, yPercent] = [this.stacker.coordinates.x % 1, this.stacker.coordinates.y % 1];
        if (xPercent === 0 && yPercent === 0 || this.stacker.coordinates.z === 0) {
            const coordinates = new Coordinates(
                this.stacker.coordinates.x,
                this.stacker.coordinates.y,
                0
            );

            while (coordinates.z < this.stacker.coordinates.z) {
                const [found] = this.findEntities([coordinates]);
                if (!found || found === this.stacker) {
                    break;
                }
                coordinates.z++;
            }
            coordinates.z -= Warehouse.shadowZOffset;
            shadows.push(new Shadow(coordinates, this.stacker));
        } else {
            let forward;
            let back;
            let forwardDirection;
            let backDirection;
            let forwardPercent;
            let backPercent;
            switch (this.stacker.direction) {
                case Direction.NORTH:
                    forward = new Coordinates(
                        this.stacker.coordinates.x,
                        Math.floor(this.stacker.coordinates.y),
                        0
                    );
                    back = new Coordinates(
                        this.stacker.coordinates.x,
                        Math.ceil(this.stacker.coordinates.y),
                        0
                    );
                    forwardDirection = CutShadowDirection.DL;
                    backDirection = CutShadowDirection.UR;
                    forwardPercent = 1 - yPercent;
                    backPercent = yPercent
                    break;
                case Direction.EAST:
                    forward = new Coordinates(
                        Math.ceil(this.stacker.coordinates.x),
                        this.stacker.coordinates.y,
                        0
                    );
                    back = new Coordinates(
                        Math.floor(this.stacker.coordinates.x),
                        this.stacker.coordinates.y,
                        0
                    );
                    forwardDirection = CutShadowDirection.UL;
                    backDirection = CutShadowDirection.DR;
                    forwardPercent = xPercent;
                    backPercent = 1 - xPercent
                    break;
                case Direction.SOUTH:
                    forward = new Coordinates(
                        this.stacker.coordinates.x,
                        Math.ceil(this.stacker.coordinates.y),
                        0
                    );
                    back = new Coordinates(
                        this.stacker.coordinates.x,
                        Math.floor(this.stacker.coordinates.y),
                        0
                    );
                    forwardDirection = CutShadowDirection.UR;
                    backDirection = CutShadowDirection.DL;
                    forwardPercent = yPercent;
                    backPercent = 1 - yPercent
                    break;
                case Direction.WEST:
                    forward = new Coordinates(
                        Math.floor(this.stacker.coordinates.x),
                        this.stacker.coordinates.y,
                        0
                    );
                    back = new Coordinates(
                        Math.ceil(this.stacker.coordinates.x),
                        this.stacker.coordinates.y,
                        0
                    );
                    forwardDirection = CutShadowDirection.DR;
                    backDirection = CutShadowDirection.UL;
                    forwardPercent = 1 - xPercent;
                    backPercent = xPercent
                    break;
            }
            while (forward.z < this.stacker.coordinates.z) {
                const [found] = this.findEntities([forward]);
                if (!found) {
                    break;
                }
                forward.z++;
            }
            while (back.z < this.stacker.coordinates.z) {
                const [found] = this.findEntities([back]);
                if (!found) {
                    break;
                }
                back.z++;
            }
            if (forward.z === back.z) {
                const coordinates = new Coordinates(
                    this.stacker.coordinates.x,
                    this.stacker.coordinates.y,
                    forward.z
                );
                coordinates.z -= Warehouse.shadowZOffset;
                shadows.push(new Shadow(coordinates, this.stacker));
            } else if (forward.z > back.z) {
                forward.z -= Warehouse.shadowZOffset;
                back.z -= Warehouse.shadowZOffset;
                shadows.push(new CutShadow(forward, forwardPercent, forwardDirection));
                shadows.push(new CutShadow(back, backPercent, backDirection));
            } else {
                forward.z -= Warehouse.shadowZOffset;
                back.z -= Warehouse.shadowZOffset;
                shadows.push(new CutShadow(forward, forwardPercent, forwardDirection));
                shadows.push(new CutShadow(back, backPercent, backDirection));
            }
        }
        return shadows;
    }

    getBoxesByColor() {
        const result = new Map();
        this.entities.forEach(entity => {
            if (!(entity instanceof Box)) {
                return;
            }
            const color = entity.color;
            let entities = result.get(color);
            if (!entities) {
                entities = [];
                result.set(color, entities);
            }
            entities.push(entity);
        });

        return result;
    }

    moveStacker(direction, force) {
        if (this.stacker.direction !== direction) {
            this.stacker.direction = direction;
            return;
        }
        if (!force && this.stacker.coordinates.z !== 0 &&
            !this.findEntities([this.stacker.coordinates.down()])[0]) {
            return;
        }

        const forwardCoordinates = this.stacker.coordinates.forward(direction);
        const forwardUpCoordinates = forwardCoordinates.up();
        if (!forwardCoordinates.isValidCoordinates()) {
            return;
        }

        let [forwardEntity, forwardUpEntity] = this.findEntities([forwardCoordinates, forwardUpCoordinates]);
        if (!forwardUpEntity) {
            if (forwardEntity instanceof Heart && this.stacker.hp < 3) {
                this.stacker.hp++;
                this.entities.delete(forwardEntity);
                forwardEntity = null;
            } else if ((forwardEntity instanceof Item || forwardEntity instanceof Bomb) && !this.stacker.item) {
                this.stacker.item = forwardEntity;
                this.entities.delete(forwardEntity);
                forwardEntity = null;
            }

            if (!forwardEntity) {
                this.stacker.moveForward();
                return;
            }
        } else if (!forwardEntity) {
            this.stacker.reset();
            return;
        }

        const doubleForwardCoordinates = forwardCoordinates.forward(direction);
        if (!doubleForwardCoordinates.isValidCoordinates()) {
            this.stacker.reset();
            return;
        }
        const [doubleForwardEntity] = this.findEntities([doubleForwardCoordinates]);

        const forPush = [];
        if (this.stacker.force) {
            if (doubleForwardEntity && forwardUpEntity) {
                this.stacker.reset();
                return;
            }
            const tripleForwardCoordinates = doubleForwardCoordinates.forward(direction);
            const [forwardDoubleUpEntity, doubleForwardUpEntity, tripleForwardEntity] = this.findEntities(
                [forwardUpCoordinates.up(), doubleForwardCoordinates.up(), doubleForwardCoordinates.forward(direction)])
            if (doubleForwardEntity) {
                if (doubleForwardUpEntity || !tripleForwardCoordinates.isValidCoordinates() || tripleForwardEntity) {
                    this.stacker.reset();
                    return;
                }
                forPush.push(doubleForwardEntity);
            } else if (forwardUpEntity) {
                if (forwardDoubleUpEntity || doubleForwardEntity || doubleForwardUpEntity) {
                    this.stacker.reset();
                    return;
                }
                forPush.push(forwardUpEntity);
            }
            forPush.push(forwardEntity);
        } else {
            if (doubleForwardEntity || forwardUpEntity) {
                this.stacker.reset();
                return;
            }
            forPush.push(forwardEntity);
        }

        if (forPush.some(e => !e.isMovable)) {
            this.stacker.reset();
            return;
        }

        this.stacker.push();
        forPush.forEach(entity => {
            entity.moveForward(direction);
        });
    }

    jumpStacker() {
        if (this.stacker.coordinates.z !== 0 && this.findEntities([this.stacker.coordinates.down()]).some(e => e === null)) {
            return;
        }
        const forwardCoordinates = this.stacker.coordinates.forward(this.stacker.direction);
        const validForwardCoordinates = forwardCoordinates.isValidCoordinates();
        const forwardUpCoordinates = forwardCoordinates.up();
        const [forwardEntity, forwardUpEntity, forwardDoubleUpEntity] =
            this.findEntities([forwardCoordinates, forwardUpCoordinates, forwardUpCoordinates.up()]);
        if (validForwardCoordinates && !forwardEntity && !forwardUpEntity &&
            (!this.stacker.doubleJump || !forwardDoubleUpEntity)) {
            this.stacker.jumpUpAndForward();
        } else if (forwardEntity) {
            const nextAction = () => this.moveStacker(this.stacker.direction, true);
            this.stacker.jumpUp(nextAction);
        } else {
            this.stacker.jumpUp();
        }
    }

    useItemStacker() {
        if (!this.stacker.item || this.usingItem) {
            return;
        }
        switch (this.stacker.item.type) {
            case ItemType.HOUR_GLASS:
                this.pauseDrop = true;
                this.usingItem = true;
                setTimeout(() => {
                    this.stacker.item = null;
                    this.pauseDrop = false;
                    this.usingItem = false;
                }, 5000);
                break;
            case ItemType.WEIGHT:
                this.stacker.force = true;
                this.usingItem = true;
                setTimeout(() => {
                    this.stacker.item = null;
                    this.stacker.force = this.stacker.color === Color.BLUE;
                    this.usingItem = false;
                }, 3000);
                break;
            case ItemType.FEATHER:
                this.stacker.doubleJump = true;
                this.usingItem = true;
                setTimeout(() => {
                    this.stacker.item = null;
                    this.stacker.doubleJump = this.stacker.color === Color.GREEN;
                    this.usingItem = false;
                }, 3000);
                break;
            case ItemType.MAGNET: {
                if (this.stacker.state === State.PUSH) {
                    return;
                }
                const forwardCoordinates = this.stacker.coordinates.forward(this.stacker.direction);
                const [forwardEntity] = this.findEntities([forwardCoordinates]);
                const backCoordinates = this.stacker.coordinates.back(this.stacker.direction);
                if (!forwardEntity ||
                    !forwardEntity.isMovable ||
                    !backCoordinates.isValidCoordinates() ||
                    this.findEntities([backCoordinates, backCoordinates.up()]).some(e => e !== null)
                ) {
                    return;
                }
                forwardEntity.moveBack(this.stacker.direction);
                this.stacker.pull();
                this.stacker.item = null;
                break;
            }
            case ItemType.HAMMER: {
                const forwardCoordinates = this.stacker.coordinates.forward(this.stacker.direction);
                const [forwardEntity] = this.findEntities([forwardCoordinates]);
                if (!forwardEntity) {
                    return;
                }
                this.stacker.item = null;
                const explosion = this.destroyEntity(forwardEntity);
                setTimeout(() => {
                    this.entities.delete(explosion);
                }, 1000);
                break;
            }
            case ItemType.BOMB:
                const color = this.stacker.item.color;
                this.stacker.item = null;
                if (color === Color.GRAY) {
                    this.explosionAround();
                } else {
                    this.explosionByColor(color);
                }
        }
    }

    explosionAround() {
        let forDestroy = [];
        this.entities.forEach(entity => {
            if (this.stacker.coordinates.x - 1.75 <= entity.coordinates.x && entity.coordinates.x <= this.stacker.coordinates.x + 1.75
                && this.stacker.coordinates.y - 1.75 <= entity.coordinates.y && entity.coordinates.y <= this.stacker.coordinates.y + 1.75
                && this.stacker.coordinates.z - 2.75 <= entity.coordinates.z && entity.coordinates.z <= this.stacker.coordinates.z + 2.75) {
                forDestroy.push(entity);
            }
        });
        forDestroy.forEach(entity => {
            const explosion = this.destroyEntity(entity);
            setTimeout(() => {
                this.entities.delete(explosion);
            }, 1000);
        });
    }

    explosionByColor(color) {
        const boxes = this.getBoxesByColor().get(color);
        if (!boxes) {
            return;
        }
        boxes.forEach(box => {
            const explosion = this.destroyEntity(box);
            setTimeout(() => {
                this.entities.delete(explosion);
            }, 1000);
        });
    }

    findEntities(coordinatesList) {
        const found = [];
        coordinatesList.forEach(coordinates => {
            let f = null;
            this.entities.forEach(entity => {
                const eCoordinates = new Coordinates(
                    entity.coordinates.x,
                    entity.coordinates.y,
                    Math.floor(entity.coordinates.z)
                );
                if (coordinates.equals(eCoordinates)) {
                    f = entity;
                }
            });
            found.push(f);
        });
        return found;
    }

    gravity() {
        this.entities.forEach(entity => {
            if (entity.coordinates.z === 0 || entity.antigravity) {
                return;
            }
            const [down] = this.findEntities([entity.coordinates.down()]);
            if (!down) {
                entity.coordinates.z -= 0.25;
            }
            if (entity.coordinates.presses(this.stacker.head.coordinates)) {
                if (entity instanceof Box) {
                    this.stacker.hp--;
                    if (this.stacker.hp > 0) {
                        this.stacker.coordinates.z += 2;
                    }
                } else if (entity instanceof Heart) {
                    if (this.stacker.hp < 3) {
                        this.stacker.hp++;
                    }
                    this.entities.delete(entity);
                } else if (entity instanceof Item || entity instanceof Bomb) {
                    if (!this.stacker.item) {
                        this.stacker.item = entity;
                        this.entities.delete(entity);
                    } else {
                        this.stacker.hp--;
                        if (this.stacker.hp > 0) {
                            this.stacker.coordinates.z += 2;
                        }
                    }
                }
            }
        });

        if (this.stacker.antigravity ||
            this.stacker.coordinates.z === 0 ||
            this.stacker.coordinates.x % 1 !== 0 || this.stacker.coordinates.y % 1 !== 0) {
            return;
        }
        let downEntity
        if (this.stacker.coordinates.z % 1 === 0) {
            downEntity = this.findEntities([this.stacker.coordinates.down()])[0];
            if (downEntity instanceof Item && !this.stacker.item) {
                this.entities.delete(downEntity);
                this.stacker.item = downEntity;
                downEntity = null;
            }
            if (downEntity instanceof Heart && this.stacker.hp < 3) {
                this.entities.delete(downEntity);
                this.stacker.hp++;
                downEntity = null;
            }
            if (downEntity) {
                return;
            }
        }

        this.stacker.state = State.JUMP;
        this.stacker.coordinates.z -= 0.25;

        if (this.stacker.coordinates.z % 1 !== 0) {
            return;
        }
        downEntity = this.findEntities([this.stacker.coordinates.down()])[0];
        if (downEntity instanceof Item && !this.stacker.item) {
            this.entities.delete(downEntity);
            this.stacker.item = downEntity;
            downEntity = null;
        }
        if (downEntity instanceof Heart && this.stacker.hp < 3) {
            this.entities.delete(downEntity);
            this.stacker.hp++;
            downEntity = null;
        }
        if (this.stacker.coordinates.z === 0 || downEntity) {
            this.stacker.state = State.IDLE;
        }
    }

    dropNewEntity() {
        if (this.pauseDrop) {
            return;
        }
        const coordinates = Coordinates.randomXYonZ(7);
        if (this.findEntities([coordinates.down()]).some(e => e !== null)) {
            return;
        }
        let rand = Math.random() * 10;
        if (rand > 1) {
            return;
        }

        let drop;
        if (rand < 0.06) {
            drop = new Box(Color.GRAY, coordinates);
        } else if (rand < 0.245) {
            drop = new Box(Color.BLUE, coordinates);
        } else if (rand < 0.43) {
            drop = new Box(Color.YELLOW, coordinates);
        } else if (rand < 0.615) {
            drop = new Box(Color.RED, coordinates);
        } else if (rand < 0.8) {
            drop = new Box(Color.GREEN, coordinates);
        } else if (rand < 0.84) {
            drop = new Item(coordinates, ItemType.HOUR_GLASS);
        } else if (rand < 0.86) {
            drop = new Item(coordinates, ItemType.MAGNET);
        } else if (rand < 0.88) {
            drop = new Item(coordinates, ItemType.HAMMER);
        } else if (rand < 0.91) {
            drop = new Item(coordinates, ItemType.FEATHER);
        } else if (rand < 0.94) {
            drop = new Item(coordinates, ItemType.WEIGHT);
        } else if (rand < 0.949) {
            drop = new Heart(coordinates);
        } else if (rand < 0.96) {
            drop = new Bomb(coordinates, Color.RED);
        } else if (rand < 0.971) {
            drop = new Bomb(coordinates, Color.BLUE);
        } else if (rand < 0.982) {
            drop = new Bomb(coordinates, Color.YELLOW);
        } else if (rand < 0.993) {
            drop = new Bomb(coordinates, Color.GREEN);
        } else {
            drop = new Bomb(coordinates, Color.GRAY);
        }

        if (drop instanceof Box) {
            this.stats.score += 1;
            this.stats.boxesDropped += 1;
            this.stacker.xp += 1;
        }
        this.addEntity(drop);
    }

    destroyEntity(box) {
        const explosion = new Explosion(box.id, box.coordinates);
        this.entities.add(explosion);
        this.entities.delete(box);
        return explosion;
    }
}