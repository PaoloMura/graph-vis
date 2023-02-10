/**
 *
 * @param {*} name 分类的名称
 * @example
 * debug('Tooltip')('render','...')
 * @todo https://developer.mozilla.org/zh-CN/docs/Web/API/Console
 *
 */
declare const debug: (name: string) => (...message: any[]) => void;
export default debug;
