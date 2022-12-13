export function getAccumData(items) {
  const accum = []
  function getDeepData(items) {
    items.map((item) => {
      const newItem = {
        id: item.id,
        parentId: item.parentId,
        label: item.label,
        child: item?.child,
        path: item?.path
      }
      accum.push(newItem)

      if (item.child) {
        return getDeepData(item.child)
      }
    })
  }

  getDeepData(items)
  return accum
}
