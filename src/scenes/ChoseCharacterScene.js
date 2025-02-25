class CharacterSelectionScene extends Phaser.Scene {

    static KEY = 'CharacterSelectionScene';
    static text = {
        notYetAchieved: "Еще не открыт\n",
        red: "Базовый персонаж",
        blue: "Может двигать два\nящика за раз",
        green: "Может прыгать в два\nраза выше",
    };

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
        this.score = this.params.repository.get(Repository.MY_SCORE);
        this.add.rectangle(0, 0, config.width, config.height, config.color.smoke)
            .setOrigin(0, 0);
        this.selectedCharacterIndex = 0;
        this.selectedCharacter = this.add.image(config.width / 2, 0, Asset.PORTRAIT_RED)
            .setOrigin(0.5, 0);
        this.text = this.add.bitmapText(0, 38, Asset.FONT_BASIS33, CharacterSelectionScene.text.red, 16)
            .setTint(config.color.text)
            .setOrigin(0)
            .setDepth(1);

        const leftAction = () => {
            this.selectedCharacterIndex = (this.selectedCharacterIndex - 1 + 3) % 3;
            this.updateCharacterSelection();
        };
        const rightAction = () => {
            this.selectedCharacterIndex = (this.selectedCharacterIndex + 1) % 3;
            this.updateCharacterSelection();
        };
        const selectAction = () => {
            let available = true;
            switch (this.selectedCharacterIndex) {
                case 0:
                    this.params.stackerColor = Color.RED;
                    break;
                case 1:
                    this.params.stackerColor = Color.BLUE;
                    available = this.score >= 350;
                    break;
                case 2:
                    this.params.stackerColor = Color.GREEN;
                    available = this.score >= 700;
                    break;
            }
            if (available) {
                return this.scene.start(GameScene.KEY, this.params);
            }
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
        this.input.keyboard.on('keydown-ESC', goToMenu);
    }

    updateCharacterSelection() {
        switch (this.selectedCharacterIndex) {
            case 0:
                this.selectedCharacter.setTexture(Asset.PORTRAIT_RED);
                this.text.text = CharacterSelectionScene.text.red;
                break;
            case 1:
                this.selectedCharacter.setTexture(Asset.PORTRAIT_BLUE);
                this.text.text = `${this.score < 350 ? CharacterSelectionScene.text.notYetAchieved : ""}${CharacterSelectionScene.text.blue}`;
                break;
            case 2:
                this.selectedCharacter.setTexture(Asset.PORTRAIT_GREEN);
                this.text.text = `${this.score < 700 ? CharacterSelectionScene.text.notYetAchieved : ""}${CharacterSelectionScene.text.green}`;
                break;
        }
    }
}
