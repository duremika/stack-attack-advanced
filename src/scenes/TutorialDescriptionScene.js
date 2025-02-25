class TutorialDescriptionScene extends Phaser.Scene {

    static KEY = "TutorialDescriptionScene";

    constructor() {
        super(TutorialDescriptionScene.KEY);
    }

    init(params) {
        this.params = params;
    }

    create() {
        this.add.rectangle(0, 0, config.width, config.height, config.color.smoke)
            .setOrigin(0, 0);
        this.text = this.add.bitmapText(0, 0, Asset.FONT_BASIS33,
            strings[this.params.lang][this.params.tutorial.description+'Description'], 16)
            .setLineSpacing(-4)
            .setTint(config.color.text)
            .setOrigin(0);

        const goToMenu = () => {
            this.scene.start(MenuScene.KEY);
        };
        this.buttons = [
            createButton(this, 0, config.height - 23, strings[this.params.lang].start, () => {
                this.scene.start(GameScene.KEY, this.params);
            }),
            createButton(this, 0, config.height - 11, strings[this.params.lang].toMenu, goToMenu),
        ];
        this.selectedButtonIndex = 0;
        updateButtonSelection(this);

        this.input.keyboard.on('keydown-UP', () => {
            this.selectedButtonIndex = (this.selectedButtonIndex - 1 + this.buttons.length) % this.buttons.length;
            updateButtonSelection(this);
        });
        this.input.keyboard.on('keydown-DOWN', () => {
            this.selectedButtonIndex = (this.selectedButtonIndex + 1) % this.buttons.length;
            updateButtonSelection(this);
        });
        this.input.keyboard.on('keydown-ENTER', () => {
            this.buttons[this.selectedButtonIndex].callback(this);
        });
        this.input.keyboard.on('keydown-ESC', goToMenu);
    }
}
