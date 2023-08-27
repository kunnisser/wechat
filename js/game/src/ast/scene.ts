/*
 * @Author: kunnisser
 * @Date: 2023-08-16 17:48:44
 * @LastEditors: kunnisser
 * @LastEditTime: 2023-08-27 23:29:32
 * @FilePath: \wechat\js\game\src\ast\scene.ts
 * @Description: ----  ----
 */
import Game from '@/lib/core';
import KnScene from '@/lib/gameobjects/kn_scene';
import KnText from '@/lib/gameobjects/kn_text';
import dragonBones from '@/dragonBones.min.js';
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
    };
  }

  boot() {}

  create() {
    const gameBg = this.game.add.background('gameBg', 'gameBg');
    this.addChild(gameBg);
    const demoText: KnText = this.game.add.text(
      'demoText',
      'WELCOME',
      {
        fontSize: 100,
      },
      [0.5, 0.5]
    );
    demoText.scale.x = 1;
    demoText.style.fontSize = 68;
    demoText.style.fill = '#ff6161';
    demoText.angle = 0;
    demoText.scale.y = 1;
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
    demoText.x = 379;
    demoText.y = 303;
    const cloud = this.game.add.image('cloud', 'titleBg', this);
    cloud.x = this.game.config.half_w;
    cloud.y = 301;
    cloud.scale.y = 0.7;
    cloud.scale.x = 0.7;
    cloud.anchor.set(0.5, 0.5);
    this.addChild(demoText);
    const mainPeak = this.game.add.image('mainPeak', 'mainPeak', this);
    mainPeak.anchor.set(0, 1);
    mainPeak.scale.y = 1;
    mainPeak.scale.x = 1;
    mainPeak.y = this.game.config.height;
    mainPeak.x = 0;
    const mountain = this.game.add.image('mountain', 'mountain', this);
    mountain.anchor.set(0, 1);
    mountain.scale.y = 0.9;
    mountain.scale.x = 0.9;
    mountain.y = this.game.config.height;
    mountain.x = 0;
    mountain.width = this.game.config.width;
    const platform = this.game.add.image('platform', 'platform', this);
    platform.y = this.game.config.height;
    platform.x = this.game.config.width;
    platform.anchor.set(1, 1);
    platform.scale.y = 1;
    platform.scale.x = 1;
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
    loader.add('texSke', 'assets/role_ske.json');
    loader.add('texData', 'assets/role_tex.json');
    loader.add('tex', 'assets/role_tex.png');
    loader.add('monsterSke', 'assets/monster_ske.json');
    loader.add('monsterData', 'assets/monster_tex.json');
    loader.add('monster', 'assets/monster_tex.png');
    loader.load(() => {
      console.log(loader.resources);
      console.log(PIXI.utils.TextureCache);
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
      monster.scale.set(0.8);
      monster.animation.play('idle');
      this.addChild(sprite, monster);
      const temp = ['idle', 'running', 'attack'];
      let index = 0;
      sprite.on('pointerdown', () => {
        index += 1;
        index >= 3 && (index = 0);
        sprite.animation.play(temp[index]);
      });
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
