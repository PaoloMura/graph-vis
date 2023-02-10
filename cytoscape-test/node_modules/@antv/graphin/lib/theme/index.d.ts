import { ComboStyle, EdgeStyle, NodeStyle } from '../typings/type';
export declare const DEFAULT_THEME: {
    mode: string;
    primaryColor: string;
    nodeSize: number;
    edgeSize: number;
    primaryEdgeColor: string;
};
export interface ThemeType {
    /**
     * @description 模式 light | dark
     * @default light
     */
    mode: 'light' | 'dark';
    /**
     * @description 画布背景色
     * @default #fff
     */
    background: string;
    /**
     * @description 节点大小
     * @default 26
     */
    nodeSize: number;
    /**
     * @description 节点主要颜色
     * @default #269a99
     */
    primaryColor: string;
    /**
     * @description 边的大小
     * @default 1
     */
    edgeSize: number;
    /**
     * @description 边的主要颜色
     * @default #ddd
     */
    primaryEdgeColor: string;
}
export declare type NodeTheme = Pick<ThemeType, 'mode' | 'primaryColor' | 'nodeSize'>;
export declare type EdgeTheme = Pick<ThemeType, 'mode' | 'primaryEdgeColor' | 'edgeSize'>;
export interface ThemeData extends ThemeType {
    defaultNodeStyle: NodeStyle & {
        type: string;
    };
    defaultNodeStatusStyle: NodeStyle['status'];
    defaultEdgeStyle: EdgeStyle & {
        type: string;
    };
    defaultEdgeStatusStyle: EdgeStyle['status'];
    defaultComboStyle: ComboStyle & {
        type: string;
    };
    defaultComboStatusStyle: ComboStyle['status'];
}
export declare const getDefaultStyleByTheme: (inputTheme: Partial<ThemeType> | undefined) => {
    mode: "light" | "dark";
    background: string;
    defaultNodeStyle: {
        type: string;
        style: {
            keyshape: {
                size: number;
                fill: string;
                fillOpacity: number;
                stroke: string;
                strokeOpacity: number;
                lineWidth: number;
                opacity: number;
                type: string;
            };
            label: {
                position: string;
                value: string;
                fill: string;
                fontSize: number;
                offset: number;
                background: undefined;
                fillOpacity: number;
            };
            icon: {
                type: string;
                value: string;
                size: number;
                fill: string;
                fillOpacity: number;
                offset: number[];
            };
            badges: never[];
            halo: {
                visible: boolean;
                fillOpacity: number;
            };
        };
    };
    defaultNodeStatusStyle: {
        status: {
            normal: {};
            selected: {
                halo: {
                    visible: boolean;
                };
                keyshape: {
                    lineWidth: number;
                };
            };
            hover: {
                halo: {
                    visible: boolean;
                };
            };
            active: {};
            inactive: {
                keyshape: {
                    fillOpacity: number;
                    strokeOpacity: number;
                };
                icon: {
                    fillOpacity: number;
                };
                label: {
                    fillOpacity: number;
                };
            };
            disabled: {
                halo: {
                    visible: boolean;
                };
                keyshape: {
                    fill: string;
                    stroke: string;
                };
                icon: {
                    fill: string;
                };
                label: {
                    fill: string;
                };
            };
        };
    };
    defaultEdgeStyle: {
        type: string;
        style: {
            keyshape: {
                type: string;
                lineWidth: number;
                stroke: string;
                strokeOpacity: number;
                lineAppendWidth: number;
                cursor: string;
            };
            halo: {
                visible: boolean;
                cursor: string;
                strokeOpacity: number;
            };
            label: {
                value: string;
                position: string;
                fill: string;
                fontSize: number;
                textAlign: string;
            };
            animate: {};
        };
    };
    defaultEdgeStatusStyle: {
        status: {
            hover: {
                halo: {
                    visible: boolean;
                };
            };
            selected: {
                halo: {
                    visible: boolean;
                };
                keyshape: {
                    lineWidth: number;
                };
                label: {
                    visible: boolean;
                };
            };
            active: {
                halo: {
                    visible: boolean;
                };
                keyshape: {
                    lineWidth: number;
                };
                label: {
                    visible: boolean;
                };
            };
            inactive: {
                halo: {
                    visible: boolean;
                };
                keyshape: {
                    strokeOpacity: number;
                };
                label: {
                    visible: boolean;
                };
            };
            disabled: {
                halo: {
                    visible: boolean;
                };
                keyshape: {
                    lineWidth: number;
                    stroke: string;
                };
                label: {
                    visible: boolean;
                };
            };
        };
    };
    defaultComboStyle: {
        type: string;
        style: {
            labelCfg: {
                position: string;
            };
        };
    };
    defaultComboStatusStyle: {
        status: {};
    };
    /**
     * @description 节点大小
     * @default 26
     */
    nodeSize: number;
    /**
     * @description 节点主要颜色
     * @default #269a99
     */
    primaryColor: string;
    /**
     * @description 边的大小
     * @default 1
     */
    edgeSize: number;
    /**
     * @description 边的主要颜色
     * @default #ddd
     */
    primaryEdgeColor: string;
};
