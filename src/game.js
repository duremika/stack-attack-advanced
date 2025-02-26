const config = {
    type: Phaser.AUTO,
    width: 132,
    height: 176,
    transparent: true,
    scene: [
        PreloadScene,
        MenuScene,
        HighscoreScene,
        SettingsScene,
        TutorialsListScene,
        TutorialDescriptionScene,
        CharacterSelectionScene,
        GameScene
    ],
    parent: 'gameContainer',
    pixelArt: true,

    color: {
        smoke: 0xDDDDDD,
        smokeAlpha: 0.73,
        text: 0x101010,
        button: {
            text: 0x111100,
            selected: 0x3333BB,
            default: 0x222277,
        },
        gameOver: {
            text: 0xFF1100,
            background: 0x807E7F,
            backgroundFrame: 0xA09E9F,
        }
    },
};

new Phaser.Game(config);
