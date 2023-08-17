/*
 * @Author: kunnisser
 * @Date: 2023-08-16 17:48:44
 * @LastEditors: kunnisser
 * @LastEditTime: 2023-08-17 18:20:34
 * @FilePath: /wechat/js/game/src/ast/scene.ts
 * @Description: ----  ----
 */
import Game from "@/lib/core";
import KnScene from "@/lib/gameobjects/kn_scene";
import KnText from "@/lib/gameobjects/kn_text";
class AST extends KnScene {
  public game: Game;
  constructor(game: Game, key: string) {
    super(game, key);
    this.game = game;
    this.resources = {
      titleBg: "assets/images/titleBg.png",
      startBtn: "assets/images/startBtn.png",
      role: "assets/images/role.png",
      gameBg: "assets/images/gameBg.png",
      mainPeak: "assets/images/mainPeak.png",
      mountain: "assets/images/mountain.png",
      platform: "assets/images/platform.png"
    };
  }

  boot() {}

  create() {
    const gameBg = this.game.add.background("gameBg", "gameBg");
    this.addChild(gameBg);
    const demoText: KnText = this.game.add.text(
      "demoText",
      "WELCOME",
      {
        fontSize: 100
      },
      [0.5, 0.5]
    );
    demoText.scale.x = 1;
    demoText.style.fontSize = 68;
    demoText.style.fill = "#ff6161";
    demoText.angle = 0;
    demoText.scale.y = 1;
    demoText.alpha = 1;
    demoText.text = "多多词汇峰";
    demoText.anchor.set(0.5, 0.5);
    demoText.visible = true;
    demoText.style.dropShadowDistance = 16;
    demoText.style.dropShadowBlur = 10;
    demoText.style.dropShadowAngle = 0.6;
    demoText.style.dropShadow = true;
    demoText.style.dropShadowColor = "#57d8d8";
    demoText.style.strokeThickness = 20;
    demoText.style.stroke = "#2a5860";
    demoText.x = 379;
    demoText.y = 303;
    const cloud = this.game.add.image("cloud", "titleBg", this);
    cloud.y = 301;
    cloud.x = 375;
    cloud.scale.y = 0.7;
    cloud.scale.x = 0.7;
    cloud.anchor.set(0.5, 0.5);
    this.addChild(demoText);
    const mainPeak = this.game.add.image("mainPeak", "mainPeak", this);
    mainPeak.scale.y = 1;
    mainPeak.scale.x = 1;
    mainPeak.y = 613;
    mainPeak.x = -3;
    const mountain = this.game.add.image("mountain", "mountain", this);
    mountain.scale.y = 0.9;
    mountain.scale.x = 0.9;
    mountain.y = 1049;
    mountain.x = -7;
    const platform = this.game.add.image("platform", "platform", this);
    platform.anchor.set(1, 1);
    platform.scale.y = 1;
    platform.scale.x = 1;
    platform.y = 1334;
    platform.x = 750;
    const start = this.game.add.button("start", "startBtn", "startBtn", this);
    start.anchor.set(0.5, 0.5);
    start.y = 667.0224119530416;
    start.x = 375;

    start.next = () => {
      this.game.sceneManager.changeScene(
        this.game.currentScene,
        this.game.hive["Welcome"]
      );
    };

    const boy = this.game.add.image("boy", "role", this);
    boy.anchor.set(0.5, 0.5);
    boy.scale.y = 1;
    boy.scale.x = 1;
    boy.y = 744;
    boy.x = 612;
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
