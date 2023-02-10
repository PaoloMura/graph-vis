import { Graph } from '@antv/g6';
export declare const handleZoomOut: (graph: Graph) => () => {
    text: string;
    ratio: number;
} | undefined;
export declare const handleZoomIn: (graph: Graph) => () => {
    text: string;
    ratio: number;
} | undefined;
export declare const handleChangeZoom: (graph: Graph) => ({ text, ratio }: {
    text: string;
    ratio: number;
}) => {
    text: string;
    ratio: number;
} | undefined;
export declare const handleRealZoom: (graph: Graph) => () => {
    text: string;
    ratio: number;
} | undefined;
export declare const handleAutoZoom: (graph: Graph) => () => {
    text: string;
    ratio: number;
} | undefined;
