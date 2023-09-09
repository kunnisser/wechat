/**
 * Created by kunnisser on 2017/8/2.
 * 初始化Game
 * */

import * as PIXI from 'pixi.js';
import Game from 'ts@/kuni/lib/core';
import StateHive from 'ts@/kuni/src/hive';
import Preloader from 'ts@/kuni/lib/loader/kn_preloader';
import { install } from '@pixi/unsafe-eval';
class initGame {
  constructor() {
    const { windowWidth, windowHeight } = wx.getSystemInfoSync();
    install(PIXI);

    const game = new Game({
      width: windowWidth, // Config.width,
      height: windowHeight, // Config.ratio,
      view: globalThis.canvas,
      isPureCanvas: true,
    });

    const GameHive = StateHive(game);
    game.entryHive = GameHive['Welcome'];
    const previewLoader = game.sceneManager.addScene(
      'global_preloader',
      Preloader
    );
    game.sceneManager.changeScene(null, previewLoader);
  }
}

export default initGame;
