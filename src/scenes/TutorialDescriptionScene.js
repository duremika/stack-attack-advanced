class TutorialDescriptionScene extends Phaser.Scene {

    static KEY = "TutorialDescriptionScene";
    static description = new Map([
        [Tutorial.MOVEMENT, "Передвиньте синий\nящик, поднимитесь\nна вершину горы из\nсерых ящиков\n\n" +
        "Стрелки - для\nдвижения.\nПробел - для\nпрыжка"],
        [Tutorial.REMOVE_BOXES, "Очистите склад\n\nУничтожьте все\nящики, выстраивая\n" +
        "комбинации\nпо цвету или\nзаполняя ряды"],
        [Tutorial.BOMBS, "Используйте бомбы,\nчтобы забрать\nсердце.\n\n" +
        "Серая бомба -\nвзрывает всё\nвокруг грузчика.\nЦветная бомба -\nуничтожает ящики\nсоответствующего\nцвета"],
        [Tutorial.ITEMS, "Очистите склад\n\nМолоток -\nразбивает предмет\nвпереди.\n" +
        "Магнит -\nпритягивает\nпредмет впереди.\nПесочные часы -\nостанавливают\nпоявление новых\nпредметов"],
        [Tutorial.POWER_UPS, "Заберите сердце,\nиспользуя бонусы\n\nПеро - даёт\nдвойной прыжок.\n" +
        "Штанга -\nпозволяет толкать\nдва ящика\nодновременно"],
    ]);

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
            TutorialDescriptionScene.description.get(this.params.tutorial), 16)
            .setLineSpacing(-4)
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
