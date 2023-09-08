/*
 * @Author: kunnisser
 * @Date: 2021-02-26 14:50:22
 * @LastEditors: kunnisser
 * @LastEditTime: 2023-09-08 17:10:04
 * @FilePath: /wechat/js/game/src/welcome/scene.ts
 * @Description: ---- 示例欢迎场景 ----
 */
import KnScene from "ts@/kuni/lib/gameobjects/kn_scene";
import Game from "ts@/kuni/lib/core";
import KnSprite from "ts@/kuni/lib/gameobjects/kn_sprite";
import KnGroup from "ts@/kuni/lib/gameobjects/kn_group";

class Welcome extends KnScene {
  game: Game;
  key: String;
  moon: KnSprite;
  moonGroup: KnGroup;

  constructor(game: Game, key: string) {
    super(game, key);
    this.game = game;
    this.key = key;
    this.resources = {
      gameBg: "assets/images/gameBg.png",
      rocket: "assets/images/rocket.png",
      fire: "assets/atlas/fire.json",
      moon: "assets/images/moon.png"
    };
  }

  boot() {}

  create() {
    const welcomeBg: KnSprite = this.game.add.background("welcomeBg", "gameBg");
    welcomeBg.visible = true;
    this.addChild(welcomeBg);
    this.moonGroup = this.game.add.group("planet", this);
    this.moonGroup.x = this.game.config.half_w;
    this.moonGroup.y = this.game.config.half_h;

    const moon = this.game.add.image("moon", "moon", this.moonGroup);
    moon.anchor.set(0.5, 0.5);
    moon.x = 0;
    moon.y = 0;
    this.moon = moon;
    const rocket: KnSprite = this.game.add.image(
      "rocket",
      "rocket",
      this.moonGroup
    );
    rocket.anchor.set(0.5, 1);
    rocket.x = moon.x;
    rocket.y = moon.y - moon.height * 0.5;
    // const fire = this.game.add.animation(
    //   ['fire1.png', 'fire2.png', 'fire3.png'].map(
    //     (key) => utils.TextureCache[key]
    //   ),
    //   0.4
    // );
    // fire.anchor.set(0.5);
    // fire.scale.set(0.55);
    // fire.position.set(rocket.x, rocket.y + rocket.height - 10);
    // fire.angle = 180;
    // this.addChild(fire);
    // fire.visible = false;
    // fire.play();
  }

  update() {
    this.moonGroup.rotation += Math.PI / 180;
  }

  reset() {
    if (this.children.length > 1) {
      // 清除场景对象
      this.removeChildren(1, this.children.length);
    }
  }
}

export default Welcome;
