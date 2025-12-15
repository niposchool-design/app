import { jsx as _jsx } from "react/jsx-runtime";
import { DESIGN_UTILS } from '../../lib/constants/design';
export const OrientalGrid = ({ children, level, className = '' }) => {
    const gridCols = DESIGN_UTILS.gridCols[level];
    const gridGap = DESIGN_UTILS.gridGaps[level];
    return (_jsx("div", { className: `grid ${gridCols} ${gridGap} ${className}`, children: children }));
};
