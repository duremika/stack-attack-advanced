function getLang() {
    let lang = navigator.language.substring(0, 2);
    if (!strings[lang]) {
        lang = "en";
    }
    return lang;
}

const strings = {
    ru: {
        start: "Начать",
        startGame: "Начать игру",
        settings: "Настройки",
        tutorial: "Туториал",
        highscores: "Рекорды",
        notYetAchieved: "Еще не открыт\n",
        red: "Базовый персонаж",
        blue: "Может толкать\nдва ящика за раз",
        green: "Может прыгать\nв два раза выше",
        next: "Следующий",
        select: "Выбрать",
        toMenu: "В меню",
        myHighscore: "Мой рекорд:",
        topPlayers: "Топ игроков:",
        music: "Музыка",
        movement: "    Передвижение",
        removeBoxes: "    Сбор ящиков",
        bombs: "    Бомбы",
        items: "    Предметы",
        powerUps: "    Бонусы",
        movementDescription: "Передвиньте синий\nящик, поднимитесь\nна вершину горы из\nсерых ящиков\n\n" +
            "Стрелки - для\nдвижения.\nПробел - для\nпрыжка",
        removeBoxesDescription: "Очистите склад\n\nУничтожьте все\nящики, выстраивая\n" +
            "комбинации\nпо цвету или\nзаполняя ряды",
        bombsDescription: "Используйте бомбы\n(shift), чтобы\nзабрать сердце.\n\n" +
            "Серая бомба -\nвзрывает всё\nвокруг грузчика.\nЦветная бомба -\nуничтожает ящики\nсоответствующего\nцвета",
        itemsDescription: "Очистите склад\n\nМолоток -\nразбивает предмет\nвпереди.\n" +
            "Магнит -\nпритягивает\nпредмет впереди.\nПесочные часы -\nостанавливают\nпоявление новых\nпредметов",
        powerUpsDescription: "Заберите сердце,\nиспользуя бонусы\n\nПеро - даёт\nдвойной прыжок.\n" +
            "Штанга -\nпозволяет толкать\nдва ящика\nодновременно",
        gameOver: "Конец игры",
        score: "Счет:",
        boxesDropped: "Сброшено ящиков:",
        linesRemoved: "Линий уничтожено:",
        combinations: "Комбинации:",
    },
    en: {
        start: "Start",
        startGame: "Start Game",
        settings: "Settings",
        tutorial: "Tutorial",
        highscores: "Highscores",
        notYetAchieved: "Not yet achieved\n",
        red: "Basic character",
        blue: "Can push two boxes\nat once",
        green: "Can jump twice\nas high",
        next: "Next",
        select: "Select",
        toMenu: "To Menu",
        myHighscore: "My Highscore:",
        topPlayers: "Top Players:",
        music: "Music",
        movement: "    Movement",
        removeBoxes: "    Remove Boxes",
        bombs: "    Bombs",
        items: "    Items",
        powerUps: "    Power-Ups",
        movementDescription: "Move the blue box,\nclimb to the top\nof the mountain\nof gray boxes\n\n" +
            "Arrow keys - for\nmovement.\nSpace - for\njumping",
        removeBoxesDescription: "Clear the\nwarehouse\n\nDestroy all boxes\nby creating color\n" +
            "combinations or\nfilling rows",
        bombsDescription: "Use bombs (shift)\nto collect the\nheart.\n\n" +
            "Gray bomb -\nremoves all\naround the\nstacker.\nColored bomb -\ndestroys boxes of\nthe corresponding\ncolor",
        itemsDescription: "Clear the\nwarehouse\n\nHammer - breaks\nthe object\nin front.\n" +
            "Magnet - attracts\nthe object\nin front.\nHourglass - stops\nnew items from\nappearing",
        powerUpsDescription: "Collect the heart\nusing power-ups\n\nFeather - allows\ndouble jump.\n" +
            "Barbell - allows\npushing two boxes\nat once",
        gameOver: "Game Over",
        score: "Score:",
        boxesDropped: "Boxes dropped:",
        linesRemoved: "Lines removed:",
        combinations: "Combinations:",
    }
}