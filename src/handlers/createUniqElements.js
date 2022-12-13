export function createUniqElements(items, parentIndex, path = []) {
    const uniqItems = [...items]
    if (uniqItems) {
      uniqItems.map((item, index) => {
        let id
        if (parentIndex) {
          item.parentId = parentIndex
          item.path = [...path]
          id = String(parentIndex) + String(index)
          item.index = index
        } else {
          id = String(index)
        }

        if (item?.child) {
          item.id = id
          createUniqElements(item?.child, id, [...path, id])
        } else {
          item.id = id
        }
        return item
      })
    }
    return uniqItems
  }