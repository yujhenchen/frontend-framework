import type { VirtualNodeType } from "../h";

export function withoutNulls(elementNodes: Array<VirtualNodeType | null | string>) {
    // Note the use of the operator, as opposed to !==. You use this operator to remove != both and values null undefined
    return elementNodes.filter(item => item != null);
}
