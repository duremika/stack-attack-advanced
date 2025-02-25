class TutorialDescriptionScene extends Phaser.Scene {

    static KEY = "TutorialDescriptionScene";
    static description = new Map([
        [Tutorial.MOVEMENT, "Нужно передвинуть\nсиний ящик и\nподняться на верх\nгоры серых ящиков\nСтрелки клавиатуры\nдля движения\nПробел для прыжка"],
        [Tutorial.REMOVE_BOXES, "Уничтожь все ящики\nвыстроив комбинации\nпо цвету или\nзаполнив ряд"],
        [Tutorial.BOMBS, "Используя бомбы\nзабери сердце\nСерая - взрывает\nвсё вокруг грузчика\nЦветная - ящики\nэтого цвета"],
        [Tutorial.ITEMS, "Очисти склад\nМолоток разбивает\nто что впереди\nМагнит притягивает\nто что впереди\nПесочные часы\nостанавливают сброс\nновых предметов"],
        [Tutorial.POWER_UPS, "Забери сердце\nиспользуя бонусы\nПеро дает\nдвойной прыжок\nШтанга позволяет\nтолкать два ящика"],
    ])

    constructor() {
        super(TutorialDescriptionScene.KEY);
    }

    init(params) {
        this.params = params;
    }

    create() {
        this.add.rectangle(0, 0, config.width, config.height, config.color.smoke)
            .setOrigin(0, 0);
        this.text = this.add.bitmapText(0, 0, Asset.FONT_BASIS33, TutorialDescriptionScene.description.get(this.params.tutorial), 16)
            .setTint(config.color.text)
            .setOrigin(0);

        const goToMenu = () => {
            this.scene.start(MenuScene.KEY);
        };
        this.buttons = [
            createButton(this, 0, config.height - 23, "Начать", () => {
                this.scene.start(GameScene.KEY, this.params);
            }),
            createButton(this, 0, config.height - 11, "В меню", goToMenu),
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
