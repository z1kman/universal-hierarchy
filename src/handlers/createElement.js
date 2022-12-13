// Handlers
import { getLinkParentElement } from './getLinkParentElement'

export const createElement = ({
  draggableElement,
  targetElement,
  targetPanelIndex,
  allItems,
  direction = 1,
}) => {
  let newState = [...allItems]
  const positive = 1
  const negative = -1

  if (!targetElement || targetPanelIndex !== Number(targetElement?.parentBaseId)) {
    newState[targetPanelIndex].child.push({ ...draggableElement.elementObj })
  } else {
    const { newItems, link, index } = getLinkParentElement(
      { ...targetElement.elementObj },
      allItems
    )

    if (direction === positive) {
      link.child.splice(index + 1, 0, { ...draggableElement.elementObj })
      newState = [...newItems]
    } else if (direction === negative) {
      link.child.splice(index, 0, { ...draggableElement.elementObj })
      newState = [...newItems]
    } else {
      const indexTargetEl = targetElement.elementObj.index
      const contentTargetEl = link.child[indexTargetEl]

      if (contentTargetEl.child) {
        contentTargetEl.child.push({ ...draggableElement.elementObj })
      } else {
        contentTargetEl.child = [{ ...draggableElement.elementObj }]
      }
    }
  }
  newState = [...newState]
  return newState
}
