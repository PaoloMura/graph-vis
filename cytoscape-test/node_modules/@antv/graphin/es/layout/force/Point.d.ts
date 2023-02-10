import Vector from './Vector';
import { IUserNode as Node } from '../../typings/type';
declare class Point {
    /** 点的位置，用[x,y]向量来表示 */
    p: Vector;
    /** 点的质量，默认为1.0 */
    m: number;
    /** 速度，初始值为向量零 [0,0] velocity, init with x=0, y=0 */
    v: Vector;
    a: Vector;
    id: string;
    data: Node;
    constructor(position: Vector, id: string, data: Node, mass?: number);
    updateAcc: (force: Vector) => void;
}
export default Point;
