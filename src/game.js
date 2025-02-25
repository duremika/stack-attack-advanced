const config = {
    type: Phaser.AUTO,
    width: 132,
    height: 176,
    backgroundColor: 0x000000,
    scene: [PreloadScene, MenuScene, HighscoreScene, SettingsScene, TutorialsListScene, CharacterSelectionScene, GameScene],
    parent: 'gameContainer',
    pixelArt: true,

    color: {
        smoke: 0xDDDDDD,
        button: {
            text: 0x221100,
            selected: 0x333399,
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
