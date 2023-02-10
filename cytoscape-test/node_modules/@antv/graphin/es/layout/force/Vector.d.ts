/**
 * 向量运算 Youtube教程：https://www.youtube.com/watch?v=Kti2mNKDOTw&list=PLA9470D64579500CE&index=6
 *
 * 向量有3个容易混淆概念
 * scalar Multip 系数积
 * dot Product 内积/点积
 * cross product 外积/有向积
 */
declare class Vector {
    /** x点坐标 */
    x: number;
    /** y点坐标 */
    y: number;
    constructor(x: number, y: number);
    getvec: () => this;
    add: (v2: Vector) => Vector;
    subtract: (v2: Vector) => Vector;
    magnitude: () => number;
    normalise: () => Vector;
    divide: (n: number) => Vector;
    scalarMultip: (n: number) => Vector;
}
export default Vector;
