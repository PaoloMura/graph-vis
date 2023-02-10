interface Props {
    type: string;
    defaultConfig: Record<string, unknown>;
    userProps: any;
    mode?: string;
}
declare const useBehaviorHook: (params: Props) => void;
export default useBehaviorHook;
