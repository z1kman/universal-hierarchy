export function getLinkParentElement(targetEl, items) {
  const newData = [...items]
  let linkOnStructure
  let indexOfStructure = -1

  targetEl.path.forEach((item) => {
    if (!linkOnStructure) {
      const indexStructure = newData.findIndex((subItem) => subItem.id === item)
      if (indexStructure !== -1) {
        linkOnStructure = newData[indexStructure]
        indexOfStructure = indexStructure
      } else {
        indexOfStructure = -1
      }
    } else {
      if (linkOnStructure.child) {
        const indexStructure = linkOnStructure.child.findIndex(
          (subItem) => subItem.id === item
        )
        if (indexStructure !== -1) {
          linkOnStructure = linkOnStructure.child[indexStructure]
          indexOfStructure = indexStructure
        } else {
            indexOfStructure = -1
        }
      }
    }
  })

  return { newItems: newData, link: linkOnStructure, index: indexOfStructure }
}
