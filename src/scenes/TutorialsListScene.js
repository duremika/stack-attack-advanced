class TutorialsListScene extends Phaser.Scene {

    static KEY = "TutorialsListScene";

    constructor() {
        super(TutorialsListScene.KEY);
    }

    init(params) {
        this.params = params;
        this.params.stackerColor = Color.RED;
    }

    create() {
        this.add.rectangle(0, 0, config.width, config.height, config.color.smoke)
            .setAlpha(config.color.smokeAlpha)
            .setOrigin(0, 0);

        const goToMenu = () => {
            this.scene.start(MenuScene.KEY);
        };
        this.buttons = [
            createButton(this, 0, 0, strings[this.params.lang].movement, () => {
                this.scene.start(TutorialDescriptionScene.KEY, Object.assign({tutorial: Tutorial.MOVEMENT}, this.params));
            }),
            createButton(this, 0, 12, strings[this.params.lang].removeBoxes, () => {
                this.scene.start(TutorialDescriptionScene.KEY, Object.assign({tutorial: Tutorial.REMOVE_BOXES}, this.params));
            }),
            createButton(this, 0, 24, strings[this.params.lang].bombs, () => {
                this.scene.start(TutorialDescriptionScene.KEY, Object.assign({tutorial: Tutorial.BOMBS}, this.params));
            }),
            createButton(this, 0, 36, strings[this.params.lang].items, () => {
                this.scene.start(TutorialDescriptionScene.KEY, Object.assign({tutorial: Tutorial.ITEMS}, this.params));
            }),
            createButton(this, 0, 48, strings[this.params.lang].powerUps, () => {
                this.scene.start(TutorialDescriptionScene.KEY, Object.assign({tutorial: Tutorial.POWER_UPS}, this.params));
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

        const tutorial = JSON.parse(this.params.repository.get(Repository.TUTORIAL)) || {};
        this.add.image(2, 0, tutorial[Tutorial.MOVEMENT.description] ? Asset.CHECKBOX_YES : Asset.CHECKBOX_NO)
            .setOrigin(0);
        this.add.image(2, 12, tutorial[Tutorial.REMOVE_BOXES.description] ? Asset.CHECKBOX_YES : Asset.CHECKBOX_NO)
            .setOrigin(0);
        this.add.image(2, 24, tutorial[Tutorial.BOMBS.description] ? Asset.CHECKBOX_YES : Asset.CHECKBOX_NO)
            .setOrigin(0);
        this.add.image(2, 36, tutorial[Tutorial.ITEMS.description] ? Asset.CHECKBOX_YES : Asset.CHECKBOX_NO)
            .setOrigin(0);
        this.add.image(2, 48, tutorial[Tutorial.POWER_UPS.description]  ? Asset.CHECKBOX_YES : Asset.CHECKBOX_NO)
            .setOrigin(0);
    }
}
