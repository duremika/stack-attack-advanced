class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
    }

    preload() {
        Asset.load(this);
    }

    create() {
        Animation.createAll(this);
        this.scene.start(MenuScene.KEY);
    }
}