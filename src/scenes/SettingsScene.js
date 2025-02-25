class SettingsScene extends Phaser.Scene {
    static KEY = 'SettingsScene';

    constructor() {
        super(SettingsScene.KEY);
    }

    init(params) {
        this.repository = params.repository;
    }

    create() {
        const settings = JSON.parse(this.repository.get(Repository.SETTINGS)) || {
            music: false,
        };
        this.add.rectangle(0, 0, config.width, config.height, config.color.smoke)
            .setOrigin(0, 0);
        this.add.bitmapText(5, 20, Asset.FONT_BASIS33, "Музыка", 16)
            .setTint(0x000000)
            .setOrigin(0, 0);
        const checkBox = this.add.rectangle(config.width - 20, 20, 15, 15, config.color.button.default)
            .setOrigin(0, 0)
            .setStrokeStyle(2, config.color.button.selected, 0.7)
            .setInteractive();
        const musicCheckSprite = this.add.image(config.width - 18, 22, settings.music ? Asset.CHECKBOX_YES : Asset.CHECKBOX_NO)
            .setOrigin(0);

        const change = () => {
            settings.music = !settings.music;
            musicCheckSprite.setTexture(settings.music ? Asset.CHECKBOX_YES : Asset.CHECKBOX_NO);
            this.repository.save(Repository.SETTINGS, JSON.stringify(settings));
        };
        checkBox.on('pointerdown', change);
        checkBox.on('pointerover', () => checkBox.setFillStyle(config.color.button.selected));
        checkBox.on('pointerout', () => checkBox.setFillStyle(config.color.button.default));

        const goToMenu = () => {
            this.scene.start(MenuScene.KEY);
        };
        this.buttons = [
            createButton(this, 0, config.height - 11, "В меню", goToMenu),
        ];
        this.selectedButtonIndex = 0;
        updateButtonSelection(this);

        this.input.keyboard.on('keydown-ENTER', goToMenu);
        this.input.keyboard.on('keydown-ESC', goToMenu);
    }
}
