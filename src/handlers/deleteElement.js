import { getLinkParentElement } from './getLinkParentElement'

export function deleteElement(items, draggableElement) {
  const { newItems, link } = getLinkParentElement(
    { ...draggableElement.elementObj },
    items
  )
  const index = draggableElement.elementObj.index
  link.child.splice(index, 1)

  return newItems
}
