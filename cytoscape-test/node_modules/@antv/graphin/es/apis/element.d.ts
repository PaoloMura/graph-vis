import { Graph } from '@antv/g6';
/**
 * 高亮节点
 * @param graph
 */
export declare const highlightNodeById: (graph: Graph) => (nodeIds: string[]) => void;
/**
 * Focus 节点
 * @param graph
 */
export declare const focusNodeById: (graph: Graph) => (nodeId: string) => void;
