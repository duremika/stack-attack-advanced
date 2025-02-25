class GameScene extends Phaser.Scene {

    static KEY = 'GameScene';
    static boxColorToIndex = new Map([
        [Color.GRAY, 0],
        [Color.BLUE, 1],
        [Color.YELLOW, 2],
        [Color.RED, 3],
        [Color.GREEN, 4],
    ]);
    static itemTypeToIndex = new Map([
        [ItemType.HOUR_GLASS, 0],
        [ItemType.MAGNET, 1],
        [ItemType.HAMMER, 2],
        [ItemType.HEART, 3],
        [ItemType.FEATHER, 4],
        [ItemType.WEIGHT, 5],
    ]);
    static bombColorToIndex = new Map([
        [Color.GRAY, 0],
        [Color.BLUE, 1],
        [Color.YELLOW, 2],
        [Color.RED, 3],
        [Color.GREEN, 4],
    ]);

    constructor() {
        super(GameScene.KEY);
        this.entitySprities = new Map();
        this.scoreSprites = [];
        this.heartSprites = [];
        this.shadowSprites = [];
        this.lastPressedKey = null;
    }

    init(data) {
        this.repository = data.repository;
        this.tutorial = data.tutorial;
        this.warehouse = new Warehouse(
            new Stacker(data.stackerColor, Direction.NORTH, Coordinates.randomXYonZ(0))
        );
        switch (this.tutorial) {
            case Tutorial.MOVEMENT:
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(2, 3, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(3, 3, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(4, 3, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(5, 3, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(3, 3, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(4, 3, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(3, 3, 2)));
                this.warehouse.addEntity(new Box(Color.BLUE, new Coordinates(5, 5, 0)));
                this.warehouse.stacker.coordinates = new Coordinates(7, 7, 0);
                break;
            case Tutorial.REMOVE_BOXES:
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(0, 1, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(1, 1, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(2, 1, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(3, 1, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(4, 1, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(5, 1, 0)));
                this.warehouse.addEntity(new Box(Color.GREEN, new Coordinates(6, 2, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(7, 1, 0)));
                this.warehouse.addEntity(new Box(Color.RED, new Coordinates(3, 2, 0)));
                this.warehouse.addEntity(new Box(Color.RED, new Coordinates(2, 3, 0)));
                this.warehouse.addEntity(new Box(Color.RED, new Coordinates(4, 3, 0)));
                this.warehouse.addEntity(new Box(Color.RED, new Coordinates(3, 4, 0)));
                this.warehouse.addEntity(new Box(Color.YELLOW, new Coordinates(1, 4, 0)));
                this.warehouse.addEntity(new Box(Color.YELLOW, new Coordinates(1, 6, 0)));
                this.warehouse.addEntity(new Box(Color.YELLOW, new Coordinates(1, 6, 1)));
                this.warehouse.addEntity(new Box(Color.BLUE, new Coordinates(4, 5, 0)));
                this.warehouse.addEntity(new Box(Color.BLUE, new Coordinates(6, 5, 0)));
                this.warehouse.addEntity(new Box(Color.BLUE, new Coordinates(5, 6, 0)));
                this.warehouse.stacker.coordinates = new Coordinates(7, 7, 0);
                break;
            case Tutorial.BOMBS:
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(0, 2, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(0, 1, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(0, 0, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(1, 0, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(2, 0, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(0, 2, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(0, 1, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(0, 0, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(1, 0, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(2, 0, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(0, 2, 2)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(0, 1, 2)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(0, 0, 2)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(1, 0, 2)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(2, 0, 2)));
                this.warehouse.addEntity(new Heart(new Coordinates(0, 0, 3)));
                this.warehouse.addEntity(new Box(Color.BLUE, new Coordinates(1, 6, 0)));
                this.warehouse.addEntity(new Bomb(new Coordinates(1, 6, 1), Color.YELLOW));
                this.warehouse.addEntity(new Box(Color.BLUE, new Coordinates(1, 6, 2)));
                this.warehouse.addEntity(new Box(Color.BLUE, new Coordinates(1, 6, 3)));
                this.warehouse.addEntity(new Box(Color.YELLOW, new Coordinates(6, 1, 0)));
                this.warehouse.addEntity(new Bomb(new Coordinates(6, 1, 1), Color.GRAY));
                this.warehouse.addEntity(new Box(Color.YELLOW, new Coordinates(6, 1, 2)));
                this.warehouse.addEntity(new Box(Color.YELLOW, new Coordinates(6, 1, 3)));
                this.warehouse.addEntity(new Bomb(new Coordinates(4, 4, 0), Color.BLUE));
                this.warehouse.stacker.coordinates = new Coordinates(7, 7, 0);
                break;
            case Tutorial.ITEMS:
                this.warehouse.addEntity(new Box(Color.RED, new Coordinates(0, 4, 0)));
                this.warehouse.addEntity(new Box(Color.GREEN, new Coordinates(0, 5, 0)));
                this.warehouse.addEntity(new Box(Color.RED, new Coordinates(0, 6, 0)));
                this.warehouse.addEntity(new Box(Color.YELLOW, new Coordinates(0, 4, 1)));
                this.warehouse.addEntity(new Box(Color.RED, new Coordinates(0, 5, 1)));
                this.warehouse.addEntity(new Box(Color.YELLOW, new Coordinates(0, 6, 1)));
                this.warehouse.addEntity(new Box(Color.YELLOW, new Coordinates(0, 5, 2)));
                this.warehouse.addEntity(new Box(Color.RED, new Coordinates(4, 0, 0)));
                this.warehouse.addEntity(new Box(Color.YELLOW, new Coordinates(5, 0, 0)));
                this.warehouse.addEntity(new Box(Color.RED, new Coordinates(6, 0, 0)));
                this.warehouse.addEntity(new Box(Color.RED, new Coordinates(5, 0, 1)));
                this.warehouse.addEntity(new Box(Color.YELLOW, new Coordinates(4, 1, 0)));
                this.warehouse.addEntity(new Box(Color.YELLOW, new Coordinates(6, 1, 0)));
                this.warehouse.addEntity(new Item(new Coordinates(2, 5, 0), ItemType.HAMMER));
                this.warehouse.addEntity(new Item(new Coordinates(5, 3, 0), ItemType.MAGNET));
                this.warehouse.addEntity(new Item(new Coordinates(5, 5, 0), ItemType.HOUR_GLASS));
                this.warehouse.stacker.coordinates = new Coordinates(7, 7, 0);

                let addGreenBox = () => {
                    this.warehouse.addEntity(new Box(Color.GREEN, new Coordinates(0, 0, 7)));
                };
                addGreenBox();
                this.time.addEvent({
                    delay: 8000,
                    callback: addGreenBox,
                    callbackScope: this,
                    loop: true
                });
                break;
            case Tutorial.POWER_UPS:
                this.warehouse.addEntity(new Heart(new Coordinates(0, 0, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(0, 2, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(1, 2, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(2, 2, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(3, 2, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(4, 2, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(5, 2, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(6, 2, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(7, 2, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(0, 2, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(1, 2, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(2, 2, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(3, 2, 1)));
                this.warehouse.addEntity(new Box(Color.RED, new Coordinates(4, 2, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(5, 2, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(6, 2, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(7, 2, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(0, 2, 2)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(1, 2, 2)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(2, 2, 2)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(3, 2, 2)));
                this.warehouse.addEntity(new Box(Color.RED, new Coordinates(4, 2, 2)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(5, 2, 2)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(6, 2, 2)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(7, 2, 2)));
                this.warehouse.addEntity(new Item(new Coordinates(0, 3, 0), ItemType.WEIGHT));
                this.warehouse.addEntity(new Item(new Coordinates(1, 3, 0), ItemType.WEIGHT));
                this.warehouse.addEntity(new Item(new Coordinates(2, 3, 0), ItemType.WEIGHT));
                this.warehouse.addEntity(new Item(new Coordinates(3, 3, 0), ItemType.WEIGHT));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(0, 6, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(1, 6, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(2, 6, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(3, 6, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(4, 6, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(5, 6, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(6, 6, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(7, 6, 0)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(0, 6, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(1, 6, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(2, 6, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(3, 6, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(4, 6, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(5, 6, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(6, 6, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(7, 6, 1)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(0, 6, 2)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(1, 6, 2)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(2, 6, 2)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(3, 6, 2)));
                this.warehouse.addEntity(new Box(Color.RED, new Coordinates(4, 6, 2)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(5, 6, 2)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(6, 6, 2)));
                this.warehouse.addEntity(new Box(Color.GRAY, new Coordinates(7, 6, 2)));
                this.warehouse.addEntity(new Item(new Coordinates(0, 7, 0), ItemType.FEATHER));
                this.warehouse.addEntity(new Item(new Coordinates(1, 7, 0), ItemType.FEATHER));
                this.warehouse.addEntity(new Item(new Coordinates(2, 7, 0), ItemType.FEATHER));
                this.warehouse.addEntity(new Item(new Coordinates(3, 7, 0), ItemType.FEATHER));
                this.warehouse.stacker.coordinates = new Coordinates(7, 7, 0);
                break;
        }
    }

    preload() {
        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }

    create() {
        const settings = JSON.parse(this.repository.get(Repository.SETTINGS)) || {};
        if (settings.music) {
            this.backgroundMusic = this.sound.add(Asset.BACKGROUND_MUSIC);
            this.backgroundMusic.setLoop(true);
            this.backgroundMusic.play();
        }
        this.add.sprite(0, 0, Asset.BACKGROUND).setOrigin(0, 0);
        this.add.sprite(0, 0, Asset.HUD_TOP, 0).setOrigin(0, 0);
        this.scoreSprites = [];
        for (let i = 0; i < 6; i++) {
            this.scoreSprites.push(
                this.add.sprite(1 + 6 * i, 1, null)
                    .setOrigin(0, 0)
                    .setVisible(false)
            );
        }
        this.add.sprite(config.width, 0, Asset.HUD_TOP, 1).setOrigin(1, 0);
        for (let i = 1; i <= 3; i++) {
            this.heartSprites.push(
                this.add.sprite(config.width - 12 * i, 1, Asset.HEART_HUD)
                    .setOrigin(0, 0)
                    .setVisible(this.warehouse.stacker.hp >= i)
            );
        }
        this.add.sprite(0, config.height, Asset.HUD_DOWN, 0).setOrigin(0, 1);
        this.itemSprite = this.add.sprite(7, config.height - 6, Asset.ITEMS, 0)
            .setOrigin(0, 1)
            .setVisible(false);
        this.add.sprite(config.width, config.height, Asset.HUD_DOWN, 1).setOrigin(1, 1);
        this.add.sprite(0, 0, Asset.ARROWS, 0).setPosition(config.width - 15, config.height - 15);
        let assetFeet;
        let assetTorso;
        switch (this.warehouse.stacker.color) {
            case Color.RED:
                assetFeet = Asset.RED_IDLE_FEET;
                assetTorso = Asset.RED_IDLE_TORSO;
                break;
        }
        this.stackerSprite = this.add.sprite()
            .play(Animation.getAnimationStacker(this.warehouse.stacker));
        this.stackerHeadSprite = this.add.sprite()
            .play(Animation.getAnimationStackerHead(this.warehouse.stacker));

        this.gameFrame = 0;
        this.time.addEvent({
            delay: 125,
            callback: () => {
                this.fixedUpdate();
            },
            callbackScope: this,
            loop: true
        });
    }

    update() {
        if (this.warehouse.stacker.hp <= 0) {
            this.drawGameOver();
            this.heartSprites[0].setVisible(false);
            if (this.repository.get(Repository.MY_SCORE) < this.warehouse.stats.score) {
                this.repository.save(Repository.MY_SCORE, this.warehouse.stats.score);
                let top = JSON.parse(this.repository.get(Repository.TOP_PLAYERS)) || [];
                top.push({
                    player: "I", // TODO
                    score: this.warehouse.stats.score,
                });
                top = top.sort((a, b) => {
                    return b.score - a.score;
                }).slice(0, 5);
                this.repository.save(Repository.TOP_PLAYERS, JSON.stringify(top));
            }
            this.scene.pause();
        }

        this.draw();
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.shift)) {
            this.lastPressedKey = this.cursorKeys.shift;
        } else if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.space)) {
            this.lastPressedKey = this.cursorKeys.space;
        } else if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.up)) {
            this.lastPressedKey = this.cursorKeys.up;
        } else if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.right)) {
            this.lastPressedKey = this.cursorKeys.right;
        } else if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.down)) {
            this.lastPressedKey = this.cursorKeys.down;
        } else if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.left)) {
            this.lastPressedKey = this.cursorKeys.left;
        }
    }

    drawGameOver() {
        this.add.rectangle(0, 0, config.width, config.height, config.color.smoke)
            .setDepth(1000)
            .setAlpha(0.4)
            .setOrigin(0, 0);
        this.add.rectangle(config.width / 2, 20, config.width - 40, 14, config.color.gameOver.background)
            .setDepth(1000)
            .setStrokeStyle(1, config.color.gameOver.backgroundFrame)
            .setOrigin(0.5, 0);
        this.add.bitmapText(config.width / 2, 20, Asset.FONT_BASIS33, "Конец игры", 16)
            .setDepth(1000)
            .setTint(config.color.gameOver.text)
            .setDropShadow(1, 1, 0x880000, 0.3)
            .setOrigin(0.5, 0);

        this.add.bitmapText(5, 40, Asset.FONT_BASIS33, "Счет:", 16)
            .setDepth(1000)
            .setTint(0x000000)
            .setOrigin(0, 0);
        this.add.bitmapText(5, 50, Asset.FONT_BASIS33, this.warehouse.stats.score, 16)
            .setDepth(1000)
            .setTint(0x000000)
            .setOrigin(0, 0);


        this.add.bitmapText(5, 60, Asset.FONT_BASIS33, "Сброшено ящиков:", 16)
            .setDepth(1000)
            .setTint(0x000000)
            .setOrigin(0, 0);
        this.add.bitmapText(5, 70, Asset.FONT_BASIS33, this.warehouse.stats.boxesDropped, 16)
            .setDepth(1000)
            .setTint(0x000000)
            .setOrigin(0, 0);

        this.add.bitmapText(5, 80, Asset.FONT_BASIS33, "Линий уничтожено:", 16)
            .setDepth(1000)
            .setTint(0x000000)
            .setOrigin(0, 0);
        this.add.bitmapText(5, 90, Asset.FONT_BASIS33, this.warehouse.stats.linesRemoved, 16)
            .setDepth(1000)
            .setTint(0x000000)
            .setOrigin(0, 0);

        this.add.bitmapText(5, 100, Asset.FONT_BASIS33, "Комбинации:", 16)
            .setDepth(1000)
            .setTint(0x000000)
            .setOrigin(0, 0);

        let y = 110;
        if (this.warehouse.stats.combinations.size === 0) {
            this.add.bitmapText(5, y, Asset.FONT_BASIS33, 0, 16)
                .setDepth(1000)
                .setTint(0x000000)
                .setOrigin(0, 0);
        } else {
            this.warehouse.stats.combinations.forEach((v, k) => {
                this.add.bitmapText(5, y, Asset.FONT_BASIS33, `${k}:${v}`, 16)
                    .setDepth(1000)
                    .setTint(0x000000)
                    .setOrigin(0, 0);
                y += 10;
            });
        }


        setTimeout(() => {
            this.scene.start(MenuScene.KEY);
        }, 3000);
    }

    fixedUpdate() {
        switch (this.tutorial) {
            case Tutorial.MOVEMENT:
                if (!this.warehouse.findEntities([new Coordinates(5, 5, 0)])[0] &&
                    this.warehouse.stacker.coordinates.z >= 3) {
                    this.time.delayedCall(2000, () => {
                        const data = JSON.parse(this.repository.get(Repository.TUTORIAL)) || {};
                        data[Tutorial.MOVEMENT.description] = true;
                        this.repository.save(Repository.TUTORIAL, JSON.stringify(data));
                        this.scene.start(TutorialsListScene.KEY);
                    });
                }
                break;
            case Tutorial.REMOVE_BOXES:
                if (this.warehouse.getBoxesByColor().size === 0) {
                    this.time.delayedCall(2000, () => {
                        const data = JSON.parse(this.repository.get(Repository.TUTORIAL)) || {};
                        data[Tutorial.REMOVE_BOXES.description] = true;
                        this.repository.save(Repository.TUTORIAL, JSON.stringify(data));
                        this.scene.start(TutorialsListScene.KEY);
                    });
                }
                break;
            case Tutorial.BOMBS:
                if (this.warehouse.entities.size === 0 && this.warehouse.stacker.hp === 2) {
                    this.time.delayedCall(2000, () => {
                        const data = JSON.parse(this.repository.get(Repository.TUTORIAL)) || {};
                        data[Tutorial.BOMBS.description] = true;
                        this.repository.save(Repository.TUTORIAL, JSON.stringify(data));
                        this.scene.start(TutorialsListScene.KEY);
                    });
                }
                break;
            case Tutorial.ITEMS:
                if ([...this.warehouse.entities].filter(e => e.color !== Color.GREEN).length === 0) {
                    this.time.delayedCall(2000, () => {
                        const data = JSON.parse(this.repository.get(Repository.TUTORIAL)) || {};
                        data[Tutorial.ITEMS.description] = true;
                        this.repository.save(Repository.TUTORIAL, JSON.stringify(data));
                        this.scene.start(TutorialsListScene.KEY);
                    });
                }
                break;
            case Tutorial.POWER_UPS:
                if (this.warehouse.stacker.hp === 2) {
                    this.time.delayedCall(2000, () => {
                        const data = JSON.parse(this.repository.get(Repository.TUTORIAL)) || {};
                        data[Tutorial.POWER_UPS.description] = true;
                        this.repository.save(Repository.TUTORIAL, JSON.stringify(data));
                        this.scene.start(TutorialsListScene.KEY);
                    });
                }
                break;
        }
        if (++this.gameFrame === 4) {
            this.gameFrame = 0;
            if (this.tutorial !== Tutorial.POWER_UPS) {
                this.removeAdjacent();
            }
            if (!this.tutorial) {
                this.warehouse.dropNewEntity();
            }
        }
        this.handlePressedKey();
        this.warehouse.gravity();

    }

    handlePressedKey() {
        if (this.warehouse.stacker.state !== State.IDLE) {
            return;
        }
        let pressedKey;
        if (this.lastPressedKey) {
            pressedKey = this.lastPressedKey;
            this.lastPressedKey = null
        } else {
            return;
        }
        if (pressedKey === this.cursorKeys.up) {
            this.warehouse.moveStacker(Direction.NORTH);
        } else if (pressedKey === this.cursorKeys.right) {
            this.warehouse.moveStacker(Direction.EAST);
        } else if (pressedKey === this.cursorKeys.down) {
            this.warehouse.moveStacker(Direction.SOUTH);
        } else if (pressedKey === this.cursorKeys.left) {
            this.warehouse.moveStacker(Direction.WEST);
        } else if (pressedKey === this.cursorKeys.shift) {
            this.warehouse.useItemStacker();
            if (this.warehouse.stacker.item && this.warehouse.usingItem) {
                let i = 0;
                const loop = this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        if (!this.warehouse.usingItem) {
                            loop.destroy()
                        }
                        this.itemSprite.setVisible(++i % 2 !== 0);
                    },
                    callbackScope: this,
                    loop: true
                });
            }
        } else if (pressedKey === this.cursorKeys.space) {
            this.warehouse.jumpStacker();
        }
    }

    removeAdjacent() {
        const pairs = [];
        const boxesByColor = this.warehouse.getBoxesByColor();
        const arr = Array.from({length: 8}, () =>
            Array.from({length: 8}, () =>
                Array(8).fill(null)));
        boxesByColor.forEach((boxes, color) => {
            for (let i = 0; i < boxes.length; i++) {
                const a = boxes[i];
                if (a.coordinates.x % 1 === 0 && a.coordinates.y % 1 === 0 && a.coordinates.z % 1 === 0) {
                    arr[a.coordinates.z][a.coordinates.y][a.coordinates.x] = a;
                }

                if (color === Color.GRAY) {
                    continue;
                }
                for (let j = i + 1; j < boxes.length; j++) {
                    const b = boxes[j];
                    if (a.coordinates.isAdjacent(b.coordinates)) {
                        pairs.push([a, b]);
                    }
                }
            }
        });
        const forRemove = new Map();
        pairs.forEach((pair, i) => {
            const [f, s] = pair;
            const j = i + 1;
            if (j >= pairs.length) {
                return;
            }
            pairs.slice(j).forEach(otherPair => {
                const [fo, so] = otherPair;
                if (f === fo || f === so ||
                    s === fo || s === so) {
                    forRemove.set(f, true);
                    forRemove.set(s, true);
                    forRemove.set(fo, true);
                    forRemove.set(so, true);
                }
            });
        });
        this.updateStats(forRemove)

        for (const floor of arr) {
            const columnIsFilled = Array(8).fill(true);
            for (let i = 0; i < 8; i++) {
                columnIsFilled[i] = true;
            }
            for (const row of floor) {
                let rowIsFilled = true;
                for (let x = 0; x < row.length; x++) {
                    const e = row[x];
                    if (e === null) {
                        columnIsFilled[x] = false;
                        rowIsFilled = false;
                    }
                }
                if (rowIsFilled) {
                    this.warehouse.stats.linesRemoved += 1;
                    row.forEach(e => {
                        if (e) {
                            forRemove.set(e, true);
                        }
                    });
                }
            }
            for (let x = 0; x < columnIsFilled.length; x++) {
                if (columnIsFilled[x]) {
                    this.warehouse.stats.linesRemoved += 1;
                    for (let y = 0; y < 8; y++) {
                        const box = floor[y][x];
                        if (box) {
                            forRemove.set(box, true);
                        }
                    }
                }
            }
        }

        for (const box of forRemove.keys()) {
            this.entitySprities.get(box.id).destroy(true);
            this.entitySprities.delete(box.id);
            const explosion = this.warehouse.destroyEntity(box);
            this.time.delayedCall(1000, () => {
                this.warehouse.entities.delete(explosion);
            });
        }
    }

    updateStats(forRemove) {
        const figures = new Map();
        for (const box of forRemove.keys()) {
            const color = box.color;
            figures.set(color, (figures.get(color) || 0) + 1);
        }
        figures.forEach((count) => {
            this.warehouse.stats.combinations.set(count, (parseInt(this.warehouse.stats.combinations.get(count)) || 0) + 1);
            const score = (count - 2) * count;
            this.warehouse.stats.score += score;
            this.warehouse.stacker.xp += score;
        });
    }

    to2dCoordinates(coordinates) {
        return {
            x: (coordinates.x - coordinates.y) * 8 + 66,
            y: (coordinates.x + coordinates.y) * 6 - coordinates.z * 8 + 75
        };
    }

    draw() {
        while (this.shadowSprites.length > 0) {
            this.shadowSprites.pop().destroy();
        }
        let depth = 10;
        const renderedEntitySprites = [];
        this.warehouse.getSortedEntities().forEach(entity => {
            let {x, y} = this.to2dCoordinates(entity.coordinates);
            if (entity instanceof Stacker) {
                this.stackerSprite.x = x;
                this.stackerSprite.y = y;
                this.stackerSprite.setDepth(++depth);

                let newAnimation = Animation.getAnimationStacker(this.warehouse.stacker);
                if (this.stackerSprite.anims.currentAnim.key !== newAnimation) {
                    this.stackerSprite.play(newAnimation);
                    this.stackerHeadSprite.play(Animation.getAnimationStackerHead(this.warehouse.stacker));
                }
            } else if (entity instanceof Head) {
                this.stackerHeadSprite.x = this.stackerSprite.x;
                this.stackerHeadSprite.y = this.stackerSprite.y - 8;
                this.stackerHeadSprite.setDepth(++depth);
            } else if (entity instanceof Box) {
                let sprite = this.entitySprities.get(entity.id);
                if (sprite) {
                    sprite.setPosition(x, y);
                    sprite.setDepth(++depth);
                } else {
                    sprite = this.add.sprite(x, y, Asset.BOXES, GameScene.boxColorToIndex.get(entity.color));
                    sprite.setDepth(++depth);
                    this.entitySprities.set(entity.id, sprite);
                }
                renderedEntitySprites.push(entity.id);
            } else if (entity instanceof Item || entity instanceof Heart) {
                let sprite = this.entitySprities.get(entity.id);
                y -= 2;
                if (sprite) {
                    sprite.setPosition(x, y);
                    sprite.setDepth(++depth);
                } else {
                    let texture;
                    let frame;
                    if (entity.type === ItemType.BOMB) {
                        texture = Asset.BOMBS;
                        frame = GameScene.bombColorToIndex.get(entity.color);
                    } else {
                        texture = Asset.ITEMS;
                        frame = GameScene.itemTypeToIndex.get(entity.type);
                    }
                    sprite = this.add.sprite(x, y, texture, frame);
                    sprite.setDepth(++depth);
                    this.entitySprities.set(entity.id, sprite);
                }
                renderedEntitySprites.push(entity.id);
            } else if (entity instanceof Explosion) {
                let sprite = this.entitySprities.get(entity.id);
                if (sprite && (!sprite.anims.currentAnim || sprite.anims.currentAnim.key !== Animation.EXPLOSION)) {
                    sprite.destroy();
                    sprite = this.add.sprite(x, y, Asset.EXPLOSION);
                    sprite.play(Animation.EXPLOSION);
                    this.entitySprities.set(entity.id, sprite);
                } else if (!sprite) {
                    sprite = this.add.sprite(x, y, Asset.EXPLOSION);
                    sprite.play(Animation.EXPLOSION);
                    this.entitySprities.set(entity.id, sprite);
                }
                this.entitySprities.set(entity.id, sprite);
                sprite.setDepth(++depth);
                renderedEntitySprites.push(entity.id);
            } else if (entity instanceof Shadow) {
                let frame;
                if (entity.entity instanceof Box) {
                    switch (entity.entity.color) {
                        case Color.GRAY:
                            frame = 0;
                            break;
                        case Color.BLUE:
                            frame = 1;
                            break;
                        case Color.YELLOW:
                            frame = 2;
                            break;
                        case Color.RED:
                            frame = 3;
                            break;
                        case Color.GREEN:
                            frame = 4;
                            break;
                    }
                } else if (entity.entity instanceof Stacker) {
                    y -= 1;
                    frame = 7;
                } else if (entity.entity instanceof Item
                    || entity.entity instanceof Heart
                    || entity.entity instanceof Bomb) {
                    frame = 5;
                } else {
                    return;
                }
                this.shadowSprites.push(
                    this.add.sprite(x, y + 4, Asset.MARKERS, frame)
                        .setDepth(++depth)
                );
            } else if (entity instanceof CutShadow) {
                let frame;
                if (entity.percent === 0.75) {
                    frame = 0;
                } else if (entity.percent === 0.5) {
                    frame = 1;
                } else if (entity.percent === 0.25) {
                    frame = 2;
                }
                let asset;
                switch (entity.direction) {
                    case CutShadowDirection.DL:
                        asset = Asset.CUT_SHADOW_DL;
                        break;
                    case CutShadowDirection.DR:
                        asset = Asset.CUT_SHADOW_DR;
                        break;
                    case CutShadowDirection.UL:
                        asset = Asset.CUT_SHADOW_UL;
                        break;
                    case CutShadowDirection.UR:
                        asset = Asset.CUT_SHADOW_UR;
                        break;
                }
                this.shadowSprites.push(
                    this.add.sprite(x, y + 4, asset, frame)
                        .setDepth(++depth)
                );
            }
        });
        this.entitySprities.forEach((sprite, id) => {
            if (!renderedEntitySprites.includes(id)) {
                this.entitySprities.get(id).destroy();
                this.entitySprities.delete(id);
            }
        });
        this.drawHud();
    }

    drawHud() {
        if (!this.tutorial) {
            const digitsArray = String(this.warehouse.stacker.xp).split('').map(Number);
            const numbers = [
                ...(new Array(6 - digitsArray.length).fill(null)),
                ...digitsArray
            ];
            for (let i = 0; i < 6; i++) {
                const number = numbers[i];
                if (number === null) {

                    continue;
                }
                this.scoreSprites[i]
                    .setVisible(true)
                    .setTexture(Asset.NUMBERS)
                    .setFrame(number);
            }
        }
        for (let i = 0; i < 3; i++) {
            this.heartSprites[i].setVisible(this.warehouse.stacker.hp > i);
        }

        const item = this.warehouse.stacker.item;
        if (!item) {
            this.itemSprite.setVisible(false);
        } else {
            let texture;
            let frame;
            if (item.type === ItemType.BOMB) {
                texture = Asset.BOMBS;
                frame = GameScene.bombColorToIndex.get(item.color);
            } else {
                texture = Asset.ITEMS;
                frame = GameScene.itemTypeToIndex.get(item.type);
            }
            this.itemSprite.setTexture(texture).setFrame(frame)

            if (!this.warehouse.usingItem) {
                this.itemSprite.setVisible(true);
            }
        }
    }
}
