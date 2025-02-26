class MenuScene extends Phaser.Scene {

    static KEY = "MenuScene";

    constructor() {
        super(MenuScene.KEY);
        this.params = {
            repository: new LocalStorage(),
            lang: getLang(),
        };
    }

    create() {
        this.add.rectangle(0, 0, config.width, config.height, 0x000000)
            .setOrigin(0, 0);
        this.add.image(1, 0, Asset.SPLASH).setOrigin(0);

        this.buttons = [
            createButton(this, 0, 129, strings[this.params.lang].startGame, this.startGame),
            createButton(this, 0, 141, strings[this.params.lang].settings, this.openSettings),
            createButton(this, 0, 153, strings[this.params.lang].tutorial, this.openTutorial),
            createButton(this, 0, 165, strings[this.params.lang].highscores, this.openHighscore)
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
    }

    startGame(scene) {
        scene.scene.start(CharacterSelectionScene.KEY, scene.params);
    }

    openSettings(scene) {
        scene.scene.start(SettingsScene.KEY, scene.params);
    }

    openTutorial(scene) {
        scene.scene.start(TutorialsListScene.KEY, scene.params);
    }

    openHighscore(scene) {
        scene.scene.start(HighscoreScene.KEY, scene.params);
    }
}