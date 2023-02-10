import Tree from './Tree';
import { IUserNode, IUserEdge, GraphinData, GraphinTreeData } from '../typings/type';
declare const defaultOptions: {
    /** 节点 */
    nodeCount: number;
    nodeType: string;
};
declare type OptionType = typeof defaultOptions;
/**
 * 1,mock data with edges,nodes
 * 2.mock nodes properties
 * 3.filter edges
 * 4.
 */
export declare class Mock {
    nodes: IUserNode[];
    edges: IUserEdge[];
    options: OptionType;
    nodeIds: string[];
    combosData: any;
    treeData: Tree;
    constructor(count: number);
    initNodes: () => void;
    expand: (snodes: IUserNode[]) => this;
    type: (nodeType: string) => this;
    circle: (centerId?: string) => this;
    /**
     * @param ratio 随机的稀疏程度，默认0.5
     */
    random: (ratio?: number) => this;
    tree: () => this;
    value: () => {
        nodes: IUserNode[];
        edges: IUserEdge[];
    };
    combos: (chunkSize: number) => this;
    graphin: () => GraphinData;
    graphinTree: () => GraphinTreeData;
}
declare const mock: (count: number) => Mock;
export default mock;
