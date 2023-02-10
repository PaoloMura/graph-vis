export interface EdgeTheme {
    /** 节点的大小 */
    edgeSize: number;
    /** 主要颜色 */
    primaryEdgeColor: string;
    /** 主题模式： 'light' | 'dark' */
    mode: 'light' | 'dark';
}
declare const getEdgeStyleByTheme: (inputTheme: EdgeTheme) => {
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
export default getEdgeStyleByTheme;
