/*
 * @Author: kunnisser
 * @Date: 2023-08-16 17:48:14
 * @LastEditors: kunnisser
 * @LastEditTime: 2023-09-05 17:31:30
 * @FilePath: /wechat/js/game/src/hive.ts
 * @Description: ---- 场景汇总 ----
 */
// 场景映射配置
import Ast from "./ast/scene";
import Welcome from "./welcome/scene";

const StateHiveKey = {
  Ast: Ast,
  Welcome: Welcome
};

const StateHive = (game) => {
  const hive = {};
  for (let key in StateHiveKey) {
    hive[key] = game.sceneManager.addScene(key, StateHiveKey[key]);
  }
  return hive;
};

export default StateHive;
