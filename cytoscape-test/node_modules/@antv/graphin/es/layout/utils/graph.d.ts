import { Edge } from '../../layout/force/Elements';
import { IUserNode as Node } from '../../typings/type';
export declare const getRelativeNodesType: (nodes: Node[], nodeClusterBy: string) => any[];
export declare const getMinDistanceNode: (sameTypeNodes: Node[]) => Node;
export declare const getAvgNodePosition: (nodes: Node[]) => {
    x: number;
    y: number;
};
declare const _default: {
    getDegree: (node: Node, edges: Edge[]) => {
        degree: number;
        sDegree: number;
        tDegree: number;
    };
    getRelativeNodesType: (nodes: Node[], nodeClusterBy: string) => any[];
    getCoreNodeAndRelativeLeafNodes: (type: "all" | "leaf", node: Node, edges: Edge[], nodeClusterBy: string) => {
        coreNode: Node;
        relativeLeafNodes: Node[];
        sameTypeLeafNodes: Node[];
    };
    getCoreNode: (type: "source" | "target", node: Node, edges: Edge[]) => Node;
    getSameTypeNodes: (type: "all" | "leaf", nodeClusterBy: string, node: Node, relativeNodes: Node[]) => Node[];
    getMinDistanceNode: (sameTypeNodes: Node[]) => Node;
    getAvgNodePosition: (nodes: Node[]) => {
        x: number;
        y: number;
    };
};
export default _default;
