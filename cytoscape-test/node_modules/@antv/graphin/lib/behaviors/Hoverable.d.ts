import * as React from 'react';
export interface HoverableProps {
    bindType?: 'node' | 'edge';
    disabled?: boolean;
}
declare const Hoverable: React.FunctionComponent<HoverableProps>;
export default Hoverable;
