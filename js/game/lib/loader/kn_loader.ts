import Game from "../core";
class KnLoader {
  public game: Game;
  public preloader: any;
  loader: any;
  constructor(game: Game) {
    this.game = game;
    this.preloader = game.app.loader;
  }

  // 队列载入
  filling(resources: any) {
    console.log(resources);
    console.log(this.preloader);
    for (let key of Object.keys(resources)) {
      if (!this.preloader.resources[key]) {
        this.preloader.add(key, resources[key]);
      }
    }
  }
}

export default KnLoader;
