import { Graph } from '@antv/g6';
import Graphin from '../Graphin';
declare class LayoutController {
    graph: Graph;
    graphin: Graphin;
    presetLayout: any;
    prevOptions: any;
    options: any;
    instance: any;
    constructor(context: Graphin);
    hasPosition(): any;
    /**
     * 初始化布局
     */
    init(): void;
    /** 启动布局 */
    start(): void;
    /** 重新布局 */
    changeLayout(): false | undefined;
    /** 更新布局参数 */
    updateOptions: () => void;
    processForce: () => void;
    refreshPosition: () => void;
    destroy: () => void;
    getDataFromGraph: () => {
        nodes: (import("@antv/g6").EdgeConfig | import("@antv/g6").NodeConfig | import("@antv/g6").TreeGraphData | import("@antv/g6").ComboConfig)[];
        edges: (import("@antv/g6").EdgeConfig | import("@antv/g6").NodeConfig | import("@antv/g6").TreeGraphData | import("@antv/g6").ComboConfig)[];
        combos: (import("@antv/g6").EdgeConfig | import("@antv/g6").NodeConfig | import("@antv/g6").TreeGraphData | import("@antv/g6").ComboConfig)[];
        comboEdges: (import("@antv/g6").EdgeConfig | import("@antv/g6").NodeConfig | import("@antv/g6").TreeGraphData | import("@antv/g6").ComboConfig)[];
    };
}
export default LayoutController;
