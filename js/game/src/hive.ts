/*
 * @Author: kunnisser
 * @Date: 2023-08-16 17:48:14
 * @LastEditors: kunnisser
 * @LastEditTime: 2024-02-08 00:49:45
 * @FilePath: /wechat/js/game/src/hive.ts
 * @Description: ---- 场景汇总 ----
 */
// 场景映射配置
import Card from './card/scene';

const StateHiveKey = {
  Card: Card,
};

const StateHive = (game) => {
  const hive = {};
  for (let key in StateHiveKey) {
    hive[key] = game.sceneManager.addScene(key, StateHiveKey[key]);
  }
  return hive;
};

export default StateHive;
