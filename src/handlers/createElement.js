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

  if (
    !targetElement ||
    targetPanelIndex !== Number(targetElement?.parentBaseId)
  ) {
    if (newState[targetPanelIndex].child) {
      newState[targetPanelIndex].child.push({ ...draggableElement.elementObj })
    } else {
      newState[targetPanelIndex].child = [{ ...draggableElement.elementObj }]
    }
  } else {
    const { newItems, link } = getLinkParentElement(
      { ...targetElement.elementObj },
      allItems
    )
    const indexTargetEl = targetElement.elementObj.index
    const contentTargetEl = link.child

    if (direction === positive) {
      contentTargetEl.splice(indexTargetEl + 1, 0, {
        ...draggableElement.elementObj,
      })
      newState = [...newItems]
    } else if (direction === negative) {
      contentTargetEl.splice(indexTargetEl, 0, {
        ...draggableElement.elementObj,
      })

      newState = [...newItems]
    } else {
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
