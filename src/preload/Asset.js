class Asset {
    static BANNERS_RIGHT = "banners/banners_right";
    static BANNERS_LEFT = "banners/banners_left";
    static CHECKBOX_NO = "buttons/no_s";
    static CHECKBOX_YES = "buttons/yes_s";
    static BOXES = "entities/boxes";
    static EXPLOSION = "entities/explosion";
    static MARKERS = "entities/markers";
    static FONT_BASIS33 = "fonts/basis33/basis33";
    static ARROWS = "hud/arrows";
    static HEART_HUD = "hud/heart_s";
    static HUD_DOWN = "hud/hud_down";
    static HUD_TOP = "hud/hud_top";
    static NUMBERS = "hud/numbers";
    static BOMBS = "items/bombs";
    static ITEMS = "items/items";
    static BACKGROUND_MUSIC = "sounds/12";
    static PORTRAIT_BLUE = "stacker/blue/portrait_blue"
    static BLUE_IDLE_FEET = "stacker/blue/blue_idle_feet";
    static BLUE_IDLE_TORSO = "stacker/blue/blue_idle_torso";
    static BLUE_JUMP_FEET = "stacker/blue/blue_jump_feet";
    static BLUE_JUMP_TORSO = "stacker/blue/blue_jump_torso";
    static BLUE_PUSH_FEET = "stacker/blue/blue_push_feet";
    static BLUE_PUSH_TORSO = "stacker/blue/blue_push_torso";
    static BLUE_RUN_FEET = "stacker/blue/blue_run_feet";
    static BLUE_RUN_TORSO = "stacker/blue/blue_run_torso";
    static PORTRAIT_GREEN = "stacker/green/portrait_green"
    static GREEN_IDLE_FEET = "stacker/green/green_idle_feet";
    static GREEN_IDLE_TORSO = "stacker/green/green_idle_torso";
    static GREEN_JUMP_FEET = "stacker/green/green_jump_feet";
    static GREEN_JUMP_TORSO = "stacker/green/green_jump_torso";
    static GREEN_PUSH_FEET = "stacker/green/green_push_feet";
    static GREEN_PUSH_TORSO = "stacker/green/green_push_torso";
    static GREEN_RUN_FEET = "stacker/green/green_run_feet";
    static GREEN_RUN_TORSO = "stacker/green/green_run_torso";
    static PORTRAIT_RED = "stacker/red/portrait_red"
    static RED_IDLE_FEET = "stacker/red/red_idle_feet";
    static RED_IDLE_TORSO = "stacker/red/red_idle_torso";
    static RED_JUMP_FEET = "stacker/red/red_jump_feet";
    static RED_JUMP_TORSO = "stacker/red/red_jump_torso";
    static RED_PUSH_FEET = "stacker/red/red_push_feet";
    static RED_PUSH_TORSO = "stacker/red/red_push_torso";
    static RED_RUN_FEET = "stacker/red/red_run_feet";
    static RED_RUN_TORSO = "stacker/red/red_run_torso";
    static CUT_SHADOW_DL = "stacker/cut_shadow_dl";
    static CUT_SHADOW_DR = "stacker/cut_shadow_dr";
    static CUT_SHADOW_UL = "stacker/cut_shadow_ul";
    static CUT_SHADOW_UR = "stacker/cut_shadow_ur";
    static BACKGROUND = "full_bg";
    static SPLASH = "splash";

    static load(scene) {
        Asset.loadSpriteSheet(scene, Asset.BANNERS_RIGHT, {frameWidth: 43, frameHeight: 58});
        Asset.loadSpriteSheet(scene, Asset.BANNERS_LEFT, {frameWidth: 43, frameHeight: 58});
        Asset.loadImage(scene, Asset.CHECKBOX_NO);
        Asset.loadImage(scene, Asset.CHECKBOX_YES);
        Asset.loadImage(scene, Asset.SPLASH);
        Asset.loadBitmapFont(scene, Asset.FONT_BASIS33);
        Asset.loadSpriteSheet(scene, Asset.BOXES);
        Asset.loadSpriteSheet(scene, Asset.EXPLOSION);
        Asset.loadSpriteSheet(scene, Asset.MARKERS, {frameWidth: 16, frameHeight: 12});
        Asset.loadSpriteSheet(scene, Asset.ARROWS, {frameWidth: 22, frameHeight: 22});
        Asset.loadImage(scene, Asset.HEART_HUD);
        Asset.loadSpriteSheet(scene, Asset.HUD_DOWN, {frameWidth: 31, frameHeight: 31});
        Asset.loadSpriteSheet(scene, Asset.HUD_TOP, {frameWidth: 39, frameHeight: 13});
        Asset.loadSpriteSheet(scene, Asset.NUMBERS, {frameWidth: 5, frameHeight: 9});
        Asset.loadSpriteSheet(scene, Asset.BOMBS);
        Asset.loadSpriteSheet(scene, Asset.ITEMS);
        Asset.loadMusic(scene, Asset.BACKGROUND_MUSIC);
        Asset.loadSpriteSheet(scene, Asset.RED_IDLE_FEET);
        Asset.loadSpriteSheet(scene, Asset.RED_IDLE_TORSO);
        Asset.loadSpriteSheet(scene, Asset.RED_JUMP_FEET);
        Asset.loadSpriteSheet(scene, Asset.RED_JUMP_TORSO);
        Asset.loadSpriteSheet(scene, Asset.RED_PUSH_FEET);
        Asset.loadSpriteSheet(scene, Asset.RED_PUSH_TORSO);
        Asset.loadSpriteSheet(scene, Asset.RED_RUN_FEET);
        Asset.loadSpriteSheet(scene, Asset.RED_RUN_TORSO);
        Asset.loadSpriteSheet(scene, Asset.BLUE_IDLE_FEET);
        Asset.loadSpriteSheet(scene, Asset.BLUE_IDLE_TORSO);
        Asset.loadSpriteSheet(scene, Asset.BLUE_JUMP_FEET);
        Asset.loadSpriteSheet(scene, Asset.BLUE_JUMP_TORSO);
        Asset.loadSpriteSheet(scene, Asset.BLUE_PUSH_FEET);
        Asset.loadSpriteSheet(scene, Asset.BLUE_PUSH_TORSO);
        Asset.loadSpriteSheet(scene, Asset.BLUE_RUN_FEET);
        Asset.loadSpriteSheet(scene, Asset.BLUE_RUN_TORSO);
        Asset.loadSpriteSheet(scene, Asset.GREEN_IDLE_FEET);
        Asset.loadSpriteSheet(scene, Asset.GREEN_IDLE_TORSO);
        Asset.loadSpriteSheet(scene, Asset.GREEN_JUMP_FEET);
        Asset.loadSpriteSheet(scene, Asset.GREEN_JUMP_TORSO);
        Asset.loadSpriteSheet(scene, Asset.GREEN_PUSH_FEET);
        Asset.loadSpriteSheet(scene, Asset.GREEN_PUSH_TORSO);
        Asset.loadSpriteSheet(scene, Asset.GREEN_RUN_FEET);
        Asset.loadSpriteSheet(scene, Asset.GREEN_RUN_TORSO);
        Asset.loadSpriteSheet(scene, Asset.CUT_SHADOW_DL, {frameWidth: 16, frameHeight: 12});
        Asset.loadSpriteSheet(scene, Asset.CUT_SHADOW_DR, {frameWidth: 16, frameHeight: 12});
        Asset.loadSpriteSheet(scene, Asset.CUT_SHADOW_UL, {frameWidth: 16, frameHeight: 12});
        Asset.loadSpriteSheet(scene, Asset.CUT_SHADOW_UR, {frameWidth: 16, frameHeight: 12});
        Asset.loadImage(scene, Asset.BACKGROUND);
    }

    static loadImage(scene, name) {
        scene.load.image(name, "/assets/" + name + ".png");
    }

    static loadSpriteSheet(scene, name, frameConfig) {
        if (!frameConfig) {
            frameConfig = {frameWidth: 16, frameHeight: 19};
        }
        scene.load.spritesheet(name, "/assets/" + name + ".png", frameConfig);
    }

    static loadBitmapFont(scene, name) {
        scene.load.bitmapFont(name, '/assets/' + name + '.png', '/assets/' + name + '.xml');
    }

    static loadMusic(scene, name) {
        scene.load.audio(name, '/assets/' + name + '.wav');
    }
}