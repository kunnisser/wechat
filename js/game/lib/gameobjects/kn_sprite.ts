/*
 * @Author: kunnisser
 * @Date: 2023-02-14 16:15:56
 * @LastEditors: kunnisser
 * @LastEditTime: 2023-08-31 17:18:49
 * @FilePath: /wechat/js/game/lib/gameobjects/kn_sprite.ts
 * @Description: ---- sprite类 ----
 */
import { Sprite, Texture } from "@/pixi";
import Game from "../core";

class KnSprite extends Sprite {
  game: Game;
  public id: String;
  public boot: Boolean;
  public on: any;
  constructor(key: string, id: string, texture: Texture) {
    super(texture);
    this.id = id;
    this.name = key || id;
    this.boot = true;
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
