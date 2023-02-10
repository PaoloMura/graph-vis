import { NodeTheme } from './index';
/**
 * getNodeStyleByTheme 通过主题，获取节点的样式
 * @param inputNodeTheme
 */
declare const getNodeStyleByTheme: (inputNodeTheme: NodeTheme) => {
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
export default getNodeStyleByTheme;
