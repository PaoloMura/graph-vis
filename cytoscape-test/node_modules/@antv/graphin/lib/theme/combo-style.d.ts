export interface ComboTheme {
    /** 节点的大小 */
    comboSize: number;
    /** 主要颜色 */
    primaryComboColor: string;
    /** 主题模式： 'light' | 'dark' */
    mode: 'light' | 'dark';
}
declare const getComboStyleByTheme: () => {
    type: string;
    style: {
        labelCfg: {
            position: string;
        };
    };
    status: {};
};
export default getComboStyleByTheme;
