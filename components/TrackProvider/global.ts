// 用于表示是否开启埋点
export let GLOBAL_DISABLED = true;

export function setGlobalDisabled(disabled: boolean) {
  GLOBAL_DISABLED = disabled;
}
