export function withoutNulls(arr: Array<Record<string | number | symbol, unknown>>) {
    // Note the use of the operator, as opposed to !==. You use this operator to remove != both and values null undefined
    return arr.filter(item => item != null);
}
