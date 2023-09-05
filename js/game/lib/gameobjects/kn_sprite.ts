/*
 * @Author: kunnisser
 * @Date: 2023-02-14 16:15:56
 * @LastEditors: kunnisser
 * @LastEditTime: 2023-09-01 01:17:22
 * @FilePath: \wechat\js\game\lib\gameobjects\kn_sprite.ts
 * @Description: ---- sprite类 ----
 */
import { Sprite, Texture } from "ts@/kuni/pixi";
import Game from "../core";

class KnSprite extends Sprite {
  game: Game;
  public id: String;
  public boot: Boolean;
  public on: any;
  constructor(key: string, id: string, texture: Texture, game?: Game) {
    super(texture);
    this.id = id;
    this.name = key || id;
    this.boot = true;
    if (game) {
      this.texture.orig.width *= game?.gameScale;
      this.texture.orig.height *= game?.gameScale;
    }
  }

  set tintColor(color: string) {
    const colorNumber: number = +`0x${color.split("#")[1]}`;
    this.tint = colorNumber;
  }

  get tintColor() {
    const tintString = this.tint.toString(16);
    return "#" + tintString;
  }
}

export default KnSprite;
