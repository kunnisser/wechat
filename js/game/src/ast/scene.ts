/*
 * @Author: kunnisser
 * @Date: 2023-08-16 17:48:44
 * @LastEditors: kunnisser
 * @LastEditTime: 2023-09-08 17:15:42
 * @FilePath: /wechat/js/game/src/ast/scene.ts
 * @Description: ----  ----
 */
import Game from 'ts@/kuni/lib/core';
import KnScene from 'ts@/kuni/lib/gameobjects/kn_scene';
import KnText from 'ts@/kuni/lib/gameobjects/kn_text';
import dragonBones from 'dragonBones.js';
class AST extends KnScene {
  public game: Game;
  constructor(game: Game, key: string) {
    super(game, key);
    this.game = game;
    this.resources = {
      titleBg: 'assets/images/titleBg.png',
      startBtn: 'assets/images/startBtn.png',
      role: 'assets/images/role.png',
      gameBg: 'assets/images/gameBg.png',
      mainPeak: 'assets/images/mainPeak.png',
      mountain: 'assets/images/mountain.png',
      platform: 'assets/images/platform.png',
      skills: 'assets/atlas/skills.json',
      texSke: 'assets/role_ske.json',
      texData: 'assets/role_tex.json',
      tex: 'assets/role_tex.png',
      monsterSke: 'assets/monster_ske.json',
      monsterData: 'assets/monster_tex.json',
      monster: 'assets/monster_tex.png',
    };
  }

  boot() {}

  create() {
    const bg = this.game.add.background("bg", "gameBg");
    this.addChild(bg);
    const demoText: KnText = this.game.add.text(
      'demoText',
      'WELCOME',
      {},
      [0.5, 0.5]
    );
    demoText.style.fontSize = 240;
    demoText.style.fill = '#ff6161';
    demoText.angle = 0;
    demoText.alpha = 1;
    demoText.text = '多多词汇峰';
    demoText.anchor.set(0.5, 0.5);
    demoText.visible = true;
    demoText.style.dropShadowDistance = 16;
    demoText.style.dropShadowBlur = 10;
    demoText.style.dropShadowAngle = 0.6;
    demoText.style.dropShadow = true;
    demoText.style.dropShadowColor = '#57d8d8';
    demoText.style.strokeThickness = 20;
    demoText.style.stroke = '#2a5860';
    demoText.x = this.game.config.half_w;
    demoText.y = 303;
    const cloud = this.game.add.image('cloud', 'titleBg', this);
    cloud.x = this.game.config.half_w;
    cloud.y = 301;
    cloud.scale.set(0.7);
    cloud.anchor.set(0.5, 0.5);
    this.addChild(demoText);
    const mainPeak = this.game.add.image('mainPeak', 'mainPeak', this);
    mainPeak.anchor.set(0, 1);
    mainPeak.y = this.game.config.height;
    mainPeak.x = 0;
    const mountain = this.game.add.image('mountain', 'mountain', this);
    mountain.anchor.set(0, 1);
    mountain.y = this.game.config.height;
    mountain.x = 0;
    const platform = this.game.add.image('platform', 'platform', this);
    platform.y = this.game.config.height;
    platform.x = this.game.config.width;
    platform.anchor.set(1, 1);
    const start = this.game.add.button('start', 'startBtn', 'startBtn', this);
    start.anchor.set(0.5, 0.5);
    start.y = this.game.config.half_h;
    start.x = this.game.config.half_w;

    start.next = () => {
      this.game.sceneManager.changeScene(
        this.game.currentScene,
        this.game.hive['Welcome']
      );
    };

    const boy = this.game.add.image('boy', 'role', this);
    boy.anchor.set(0.5, 0.5);
    boy.scale.y = 1;
    boy.scale.x = 1;
    boy.y = 744;
    boy.x = 612;

    const loader = this.game.app.loader;
    const factory: any = dragonBones.PixiFactory.factory;
    factory.parseDragonBonesData(loader.resources['texSke'].data);
    factory.parseTextureAtlasData(
      loader.resources['texData'].data,
      PIXI.utils.TextureCache['tex']
    );
    factory.parseDragonBonesData(loader.resources['monsterSke'].data);
    factory.parseTextureAtlasData(
      loader.resources['monsterData'].data,
      PIXI.utils.TextureCache['monster']
    );
    //
    const sprite: any = factory.buildArmatureDisplay('role');
    sprite.x = this.game.config.half_w - start.width;
    sprite.y = this.game.config.half_h;
    sprite.scale.set(0.4);
    sprite.animation.play('idle');
    sprite.animation.timeScale = 2;
    sprite.interactive = true;
    const monster: any = factory.buildArmatureDisplay('monster');
    monster.x = this.game.config.half_w + start.width;
    monster.y = this.game.config.half_h;
    monster.animation.play('idle');
    this.addChild(sprite, monster);
    const temp = ['idle', 'running', 'attack'];
    let index = 0;
    sprite.on('pointerdown', () => {
      index += 1;
      index >= 3 && (index = 0);
      sprite.animation.play(temp[index]);
    });
  }

  update() {}

  reset() {
    if (this.children.length > 1) {
      // 清除场景对象
      this.removeChildren(1, this.children.length);
    }
  }
}

export default AST;
