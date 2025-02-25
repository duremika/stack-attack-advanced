class CharacterSelectionScene extends Phaser.Scene {

    static KEY = 'CharacterSelectionScene';

    constructor() {
        super(CharacterSelectionScene.KEY);
    }

    init(params) {
        this.params = {
            repository: params.repository,
        };
    }

    preload() {
        Asset.loadImage(this, Asset.PORTRAIT_RED);
        Asset.loadImage(this, Asset.PORTRAIT_BLUE);
        Asset.loadImage(this, Asset.PORTRAIT_GREEN);
    }

    create() {
        this.selectedCharacterIndex = 0;
        this.selectedCharacter = this.add.image(config.width / 2,0, Asset.PORTRAIT_RED)
            .setOrigin(0.5, 0);

        const leftAction = () => {
            this.selectedCharacterIndex = (this.selectedCharacterIndex - 1 + 3) % 3;
            this.updateCharacterSelection();
        };
        const rightAction = () => {
            this.selectedCharacterIndex = (this.selectedCharacterIndex + 1) % 3;
            this.updateCharacterSelection();
        };
        const selectAction = () => {
            switch (this.selectedCharacterIndex) {
                case 0:
                    this.params.stackerColor = Color.RED;
                    break;
                case 1:
                    this.params.stackerColor = Color.BLUE;
                    break;
                case 2:
                    this.params.stackerColor = Color.GREEN;
                    break;
            }
            return  this.scene.start(GameScene.KEY, this.params);
        };
        const goToMenu = () => {
            this.scene.start(MenuScene.KEY);
        };

        this.buttons = [
            createButton(this, 0, 141, 'Следующий', rightAction),
            createButton(this, 0, 153, 'Выбрать', selectAction),
            createButton(this, 0, 165, 'В меню', goToMenu),
        ];
        this.selectedButtonIndex = 1;
        updateButtonSelection(this);

        this.input.keyboard.on('keydown-UP', () => {
            this.selectedButtonIndex = (this.selectedButtonIndex - 1 + this.buttons.length) % this.buttons.length;
            updateButtonSelection(this);
        });
        this.input.keyboard.on('keydown-DOWN', () => {
            this.selectedButtonIndex = (this.selectedButtonIndex + 1) % this.buttons.length;
            updateButtonSelection(this);
        });
        this.input.keyboard.on('keydown-LEFT', leftAction);
        this.input.keyboard.on('keydown-RIGHT', rightAction);
        this.input.keyboard.on('keydown-ENTER', () => {
            this.buttons[this.selectedButtonIndex].callback(this);
        });
    }

    updateCharacterSelection() {
        switch (this.selectedCharacterIndex) {
            case 0:
                this.selectedCharacter.setTexture(Asset.PORTRAIT_RED);
                break;
            case 1:
                this.selectedCharacter.setTexture(Asset.PORTRAIT_BLUE);
                break;
            case 2:
                this.selectedCharacter.setTexture(Asset.PORTRAIT_GREEN);
                break;
        }
    }
}
