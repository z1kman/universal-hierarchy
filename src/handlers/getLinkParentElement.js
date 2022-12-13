export function getLinkParentElement(element, items) {
  const newData = [...items]
  let linkOnStructure
  let indexOfStructure = -1

  element.path.forEach((item) => {
    if (!linkOnStructure) {
      const index = newData.findIndex((subItem) => subItem.id === item)
      if (index !== -1) {
        linkOnStructure = newData[index]
        indexOfStructure = index
      } else {
        indexOfStructure = -1
      }
    } else {
      if (linkOnStructure.child) {
        const index = linkOnStructure.child.findIndex(
          (subItem) => subItem.id === item
        )
        if (index !== -1) {
          linkOnStructure = linkOnStructure.child[index]
          indexOfStructure = index
        } else {
            indexOfStructure = -1
        }
      }
    }
  })

  return { newItems: newData, link: linkOnStructure, index: indexOfStructure }
}
