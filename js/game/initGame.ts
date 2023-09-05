/**
 * Created by kunnisser on 2017/8/2.
 * 初始化Game
 * */

import "../libs/index";
import "../libs/symbol";
import { canvas } from "../libs/window";
import "ts@/kuni/pixi";
import "./unsafe-eval.min.js";

import Game from "ts@/kuni/lib/core";
import StateHive from "ts@/kuni/src/hive";
import Preloader from "ts@/kuni/lib/loader/kn_preloader";

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
    game.entryHive = GameHive["Welcome"];
    const previewLoader = game.sceneManager.addScene(
      "global_preloader",
      Preloader
    );
    console.log(previewLoader);
    game.sceneManager.changeScene(null, previewLoader);
  }
}

export default initGame;
