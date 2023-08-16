/**
 * Created by kunnisser on 2017/8/2.
 * 初始化Game
 * */
import "../libs/index";
import "../libs/symbol";
import { Container, Application } from "@/pixi";
import { canvas } from "../libs/window";
import "./unsafe-eval.min.js";
import dragonBones from "./dragonBones.min.js";
class initGame {
  constructor() {
    const { windowWidth, windowHeight } = wx.getSystemInfoSync();
    const app = new Application({
      width: windowWidth,
      height: windowHeight,
      view: canvas
    });

    const world = new Container();
    app.stage.addChild(world);
    const loader = app.loader;
    loader.add("texSke", "assets/role_ske.json");
    loader.add("texData", "assets/role_tex.json");
    loader.add("tex", "assets/role_tex.png");
    loader.load(() => {
      console.log(loader.resources);
      console.log(PIXI.utils.TextureCache);
      const factory: any = dragonBones.PixiFactory.factory;
      factory.parseDragonBonesData(loader.resources["texSke"].data);
      factory.parseTextureAtlasData(
        loader.resources["texData"].data,
        PIXI.utils.TextureCache["tex"]
      );
      //
      const sprite = factory.buildArmatureDisplay("role");
      sprite.x = 180.0;
      sprite.y = 300.0;
      sprite.scale.set(0.4);
      console.log(sprite);
      sprite.animation.play("idle");
      sprite.animation.timeScale = 2;
      sprite.interactive = true;
      const temp = ['idle', 'running', 'attack'];
      let index = 0;
      sprite.on('pointerdown', () => {
        index += 1;
        index >= 3 && (index = 0);
        sprite.animation.play(temp[index]);
      });
      world.addChild(sprite);
    });

    app.renderer.render(app.stage);

    // window.gameConfig = conf;
    // // 符合条件进入boot状态
    // this.state.add('boot', boot, !0);
    // this.state.add('preloader', preloader, !1);
    // this.state.add('menu', menu, !1);
    // this.state.add('fight_scene', SceneFight, !1);
  }
}

export default initGame;
