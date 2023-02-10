import { NodeStyle } from '../typings/type';
/**
 *
 * @param shapes 元素组合的shape集合
 * @param statusStyle 该节点的样式：可以是状态激活样式，也可以是默认样式
 * @param parseAttr 将用户传递的JSON解析为G理解的Attr
 */
export declare const setStatusStyle: (shapes: any, statusStyle: any, parseAttr: (style: any, shapeName: string) => any) => void;
export declare function removeDumpAttrs<T>(attrs: T): T;
/**
 * 将 size 转换为宽度和高度
 * @param size
 */
export declare const convertSizeToWH: (size: number | number[] | undefined) => number[];
export declare const getLabelXYByPosition: (cfg: NodeStyle) => {
    x: number;
    y: number;
    textBaseline?: 'top' | 'bottom';
};
export declare const getBadgePosition: (position: string | undefined, r: number) => {
    x: number;
    y: number;
};
