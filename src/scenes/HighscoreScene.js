﻿class HighscoreScene extends Phaser.Scene {
    static KEY = 'HighscoreScene';

    constructor() {
        super(HighscoreScene.KEY);
    }

    init(params) {
        this.params = params;
    }

    create() {
        this.add.rectangle(0, 0, config.width, config.height, config.color.smoke)
            .setAlpha(config.color.smokeAlpha)
            .setOrigin(0, 0);
        this.add.bitmapText(5, 20, Asset.FONT_BASIS33, strings[this.params.lang].myHighscore, 16)
            .setTint(0x000000)
            .setOrigin(0, 0);
        this.add.bitmapText(5, 30, Asset.FONT_BASIS33, this.params.repository.get(Repository.MY_SCORE) || 0, 16)
            .setTint(0x000000)
            .setOrigin(0, 0);
        this.add.bitmapText(5, 45, Asset.FONT_BASIS33, strings[this.params.lang].topPlayers, 16)
            .setTint(0x000000)
            .setOrigin(0, 0);
        let y = 55;
        (JSON.parse(this.params.repository.get(Repository.TOP_PLAYERS)) || []).forEach((entry) => {
            let text = entry.player.substring(0, 10).replace(' ', '  ');
            text += ':';
            for (let i = text.length; i <= 10; i++) {
                text += '  ';
            }
            text += entry.score;
            this.add.bitmapText(5, y, Asset.FONT_BASIS33, text, 16)
                .setTint(0x000000)
                .setOrigin(0, 0);
            y += 10;
        });

        const goToMenu = () => {
            this.scene.start(MenuScene.KEY);
        };
        this.buttons = [
            createButton(this, 0, config.height - 11, strings[this.params.lang].toMenu, goToMenu),
        ];
        this.selectedButtonIndex = 0;
        updateButtonSelection(this);

        this.input.keyboard.on('keydown-ENTER', goToMenu);
        this.input.keyboard.on('keydown-ESC', goToMenu);
    }
}
