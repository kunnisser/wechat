/**
 * Created by kunnisser on 2017/8/2.
 * 初始化Game
 * */
require('./js/libs/weapp-adapter');
import './js/libs/symbol';
import * as PIXI from 'pixi.min';
import { canvas } from './js/libs/weapp-adapter';
import * as Spine from 'pixi-spine';
GameGlobal.PIXI = PIXI;

require('unsafe-eval.min');
class initGame{
    constructor () {
      // let conf = configCreate.createConfig();
      const { pixelRatio, windowWidth, windowHeight } = wx.getSystemInfoSync()
      const app = new PIXI.Application(
        {
          width: windowWidth,
          height: windowHeight,
          view: canvas
        }
      );

      const world = new PIXI.Container();
      app.stage.addChild(world);
        console.log(Spine);
      // const loader = app.loader;
      // loader.add('role_tex', './assets/role_tex.json');
      // loader.load(() => {
      //   console.log(Spine);
      //   const spine = new Spine(loader.resources['role_tex'].spineData);
      //   spine.name = 'role_tex';
      //   world.addChild(spine);
      // })
      console.log(world);



      // window.gameConfig = conf;
      // // 符合条件进入boot状态
      // this.state.add('boot', boot, !0);
      // this.state.add('preloader', preloader, !1);
      // this.state.add('menu', menu, !1);
      // this.state.add('fight_scene', SceneFight, !1);
    };
}

export default initGame;