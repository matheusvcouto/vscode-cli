function isObject(value: any): value is object {
  return typeof value === 'object' && value !== null;
}

function hasKeyProperty(option: {} | { key?: string | undefined }): option is { key?: string | undefined } {
  return typeof option === 'object' && 'key' in option;
}
export { isObject, hasKeyProperty }