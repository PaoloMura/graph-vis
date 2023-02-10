interface Node {
    x: number;
    y: number;
}
export declare function forceNBodyBruteForce(nodes: Node[], coulombDisScale: number, repulsion: number): {
    vx: number;
    vy: number;
}[];
export declare function forceNBody(nodes: Node[], coulombDisScale: number, repulsion: number): {
    vx: number;
    vy: number;
}[];
export {};
