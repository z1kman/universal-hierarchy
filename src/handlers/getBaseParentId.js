export function getBaseParentId(item) {
  if (item.path) {
    return item.path[0]
  } else {
    return -1
  }
}
