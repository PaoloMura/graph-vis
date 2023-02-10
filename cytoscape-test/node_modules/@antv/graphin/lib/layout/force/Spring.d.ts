import Point from './Point';
declare class Spring {
    /** 源节点ID */
    source: Point;
    /** 目标节点ID */
    target: Point;
    /** 弹簧的长度 */
    length: number;
    constructor(source: Point, target: Point, length: number);
}
export default Spring;
