import React from 'react';
import { Graph as IGraph } from '@antv/g6';
import { ApisType } from './apis/types';
import { ThemeType } from './theme/index';
import LayoutController from './layout';
export interface GraphinContextType {
    graph: IGraph;
    apis: ApisType;
    theme: ThemeType;
    layout: LayoutController;
    [key: string]: any;
}
declare const GraphinContext: React.Context<GraphinContextType>;
export default GraphinContext;
