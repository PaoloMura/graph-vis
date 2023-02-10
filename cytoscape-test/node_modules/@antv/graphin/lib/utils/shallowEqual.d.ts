export interface Indexable {
    [index: string]: any;
}
declare const shallowEqual: <T extends Indexable>(prev: T, current: T) => boolean;
export default shallowEqual;
