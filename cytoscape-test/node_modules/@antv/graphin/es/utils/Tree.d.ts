import { GraphinTreeData } from '../typings/type';
export interface Node extends GraphinTreeData {
    parent?: Node;
}
export default class Tree {
    private root;
    private nodeIds;
    constructor(root?: Node);
    bfs: (cb: (node: Node) => boolean) => Node | undefined;
    getRoot: () => Node | undefined;
    getNode: (id: string) => Node | undefined;
    private addRoot;
    addNode: (conf: {
        parentId?: string;
        id: string;
        data?: any;
    }) => void;
}
