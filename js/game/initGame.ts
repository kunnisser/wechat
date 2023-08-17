/**
 * Created by kunnisser on 2017/8/2.
 * 初始化Game
 * */

import "../libs/index";
import "../libs/symbol";
import { canvas } from "../libs/window";
import "@/pixi";
import "./unsafe-eval.min.js";

// import dragonBones from "./dragonBones.min.js";
import Game from "@/lib/core";
import StateHive from "@/src/hive";
import Preloader from "@/lib/loader/kn_preloader";

class initGame {
  constructor() {
    const { windowWidth, windowHeight } = wx.getSystemInfoSync();
    const game = new Game({
      width: windowWidth, // Config.width,
      height: windowHeight, // Config.ratio,
      view: canvas,
      isPureCanvas: true
    });
    const GameHive = StateHive(game);
    game.entryHive = GameHive["Ast"];
    const previewLoader = game.sceneManager.addScene(
      "global_preloader",
      Preloader
    );
    console.log(previewLoader);
    game.sceneManager.changeScene(null, previewLoader);
    // const app = new Application({
    //   width: windowWidth,
    //   height: windowHeight,
    //   view: canvas
    // });

    // const world = new Container();
    // app.stage.addChild(world);
    // const loader = app.loader;
    // loader.add("texSke", "assets/role_ske.json");
    // loader.add("texData", "assets/role_tex.json");
    // loader.add("tex", "assets/role_tex.png");
    // loader.load(() => {
    //   console.log(loader.resources);
    //   console.log(PIXI.utils.TextureCache);
    //   const factory: any = dragonBones.PixiFactory.factory;
    //   factory.parseDragonBonesData(loader.resources["texSke"].data);
    //   factory.parseTextureAtlasData(
    //     loader.resources["texData"].data,
    //     PIXI.utils.TextureCache["tex"]
    //   );
    //   //
    //   const sprite: any = factory.buildArmatureDisplay("role");
    //   sprite.x = 180.0;
    //   sprite.y = 300.0;
    //   sprite.scale.set(0.4);
    //   console.log(sprite);
    //   sprite.animation.play("idle");
    //   sprite.animation.timeScale = 2;
    //   sprite.interactive = true;
    //   const temp = ["idle", "running", "attack"];
    //   let index = 0;
    //   sprite.on("pointerdown", () => {
    //     index += 1;
    //     index >= 3 && (index = 0);
    //     sprite.animation.play(temp[index]);
    //   });
    //   world.addChild(sprite);
    // });
  }
}

export default initGame;
