import { EdgeStyle } from '../typings/type';
export declare enum EnumNodeAndEdgeStatus {
    NORMAL = "normal",
    SELECTED = "selected",
    HOVERED = "hovered",
    DISABLED = "disabled"
}
export declare function removeDumpAttrs(attrs: any): any;
export declare function parseLabel(json: EdgeStyle['label']): any;
export declare function parseKeyShape(json: EdgeStyle['keyshape']): any;
export declare function parseHalo(json: EdgeStyle['halo']): any;
declare const _default: () => void;
export default _default;
