import { IUserNode as NodeType, IUserEdge as EdgeType } from '../../typings/type';
export declare class Node {
    id: string;
    data: NodeType;
    x: number;
    y: number;
    constructor(data: NodeType);
}
export declare class Edge {
    id: string;
    source: NodeType;
    target: NodeType;
    data: EdgeType;
    constructor(id: string, source: NodeType, target: NodeType, data: EdgeType);
}
