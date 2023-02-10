export declare type FitViewProps = Partial<{
    /**
     * @description 适配视窗的间距 padding
     * @default [0,0]
     */
    padding: number[];
    /**
     * @description 是否绑定布局变化：即每次布局变化后，都执行FitView操作
     * @default false
     */
    isBindLayoutChange: boolean;
}>;
declare const FitView: (props: FitViewProps) => null;
export default FitView;
