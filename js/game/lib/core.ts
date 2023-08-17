import KnFactory from "../lib/gameobjects/kn_factory";
import KnLoader from "../lib/loader/kn_loader";
import KnSceneManager from "../lib/gameobjects/kn_scene_manager";
import { Application, settings, SCALE_MODES } from "../pixi";
import { math } from "../lib/utils/common";
import KnScene from "./gameobjects/kn_scene";
import KnTranstion from "../lib/gameui/kn_transtion";
import KnCursor from "./gameui/kn_cursor";
import CoverMask from "./dev/editor_mask/cover";
import KnGroup from "./gameobjects/kn_group";

interface EnterProps {
  width: number;
  editorWidth?: number;
  editorHeight?: number;
  height: number;
  antialias?: boolean;
  transparent?: boolean;
  view?: any;
  isPureCanvas?: boolean;
  dpr?: number;
}

export default class Game {
  public edit: symbol; // 编辑模式
  public redux: any; // 外部redux对象
  public entryStateKey: string;
  public gui: any;
  public view: HTMLElement;
  public dpr: number;
  public preloader: KnScene;
  public ticker: PIXI.Ticker;
  public math: IMath;
  public camera: {
    width?: number;
    height?: number;
    half_w?: number;
    half_h?: number;
  };
  public config: {
    width: number;
    height: number;
    half_w: number;
    half_h: number;
  };
  public stage: PIXI.Container;
  public world: PIXI.Container;
  public coverMask: CoverMask;
  public sceneManager: KnSceneManager;
  public app: Application;
  public loader: KnLoader;
  public add: KnFactory;
  public currentScene: KnScene; // 当前场景
  public overlay: KnTranstion; // 转场遮罩
  public cursor: KnCursor; // 游戏光标
  public editX: number; // 编辑区的坐标
  public editY: number; // 编辑区的坐标
  public size: {
    width: number;
    height: number;
  }; // 游戏尺寸
  public hive: any;
  entryHive: any;
  ratio: number;
  constructor(config: EnterProps) {
    window["PIXI"] = PIXI;
    const dpr = this.dpr = config.dpr || window.devicePixelRatio;
    this.camera = {};

    // 设置游戏画布基本尺寸
    this.config = {
      width: config.width * dpr,
      height: config.height * dpr,
      half_w: config.width * dpr * 0.5,
      half_h: config.height * dpr * 0.5
    };

    this.app = new Application({
      width: this.config.width,
      height: this.config.height,
      antialias: config.antialias || false,
      transparent: config.transparent || !1,
      view: config.view,
      resolution: this.dpr
    });

    // globalThis.__PIXI_APP__ = this.app;

    // 添加加载器实例
    this.loader = new KnLoader(this);

    // 添加生成游戏对象的快捷方式
    this.add = new KnFactory(this);

    // 初始化画布
    this.stage = this.app.stage;

    // 定义游戏容器
    this.world = new KnGroup(this, "world", this.stage);


    // 载入相关math方法
    this.math = math;

    // 适配幕布
    this.size = this.resizeStage(config);

    // 添加场景管理实例
    this.sceneManager = new KnSceneManager(this);

    // 初始化渲染器
    this.app.renderer.render(this.stage);

    // 初始化光标
    this.cursor = new KnCursor(this, this.world);

    // 定义和添加游戏编辑层
    if (!config.isPureCanvas) {
      this.coverMask = new CoverMask(this, this.stage);
      this.coverMask.scale.set(this.size.width / this.config.width);
    }

    // 页面尺寸改变
    // window.onresize = () => {
    //   // 防抖函数
    //   debounce.handler(() => {
    //     this.resizeStage(this.view, config);
    //   });
    // };

    // 定义场景render刷新
    this.refresh();
  }

  // 重置画布尺寸
  resizeStage(config: EnterProps) {
    // this.app.view.style.width = size.width + "px";
    // this.app.view.style.height = size.height + "px";

    // 屏幕适配
    this.app.renderer["autoResize"] = true;
    this.app.renderer.resize(config.width, config.height);
    settings.SCALE_MODE = SCALE_MODES.NEAREST;
    settings.FILTER_RESOLUTION = window.devicePixelRatio;


    // 游戏容器适配
    this.world.scale.set(1 / this.dpr);

    // 镜头尺寸设置
    this.camera.width = config.width;
    this.camera.height = config.height;
    this.camera.half_w = config.width * 0.5;
    this.camera.half_h = config.height * 0.5;
    return { width: config.width, height: config.height };
  }

  refresh() {
    // 创建全局刷新器
    this.ticker = PIXI["ticker"].shared;
    this.ticker.autoStart = false;
    this.ticker.stop();
  }
}
