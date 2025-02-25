function createButton(scene, x, y, text, callback) {
    const button = scene.add.rectangle(x, y, config.width, 11, config.color.button.default)
        .setOrigin(0)
        .setInteractive()
        .setDepth(0);
    scene.add.bitmapText(x, y-2, Asset.FONT_BASIS33, text, 16)
        .setTint(config.color.button.text)
        .setOrigin(0)
        .setDepth(1);

    button.callback = callback;

    button.on('pointerdown', () => {
        button.callback(scene);
    });
    button.on('pointerover', () => {
        scene.selectedButtonIndex = scene.buttons.indexOf(button);
        updateButtonSelection(scene);
    });
    button.on('pointerout', () => {
        updateButtonSelection(scene);
    });

    return button;
}

function updateButtonSelection(scene) {
    scene.buttons.forEach((button, index) => {
        button.setFillStyle(index === scene.selectedButtonIndex ? config.color.button.selected : config.color.button.default);
    });
}
