import { useCallback, useEffect, useState } from 'react'
import style from './app.module.scss'

// Components
import { Item } from './components/Item'
import { PinnedBlock } from './components/PinnedBlock'

// Containers
import { ItemContainer } from './containers/Item/'
import { DraggableWrapper } from './containers/DraggableWrapper'

// Handlers
import { getAccumData } from './handlers/getAccumData'
import { createUniqElements } from './handlers/createUniqElements'
import { getDirection } from './handlers/getDirection'
import { getCoordElement } from './handlers/getCoordElement'
import { getLinkParentElement } from './handlers/getLinkParentElement'

const BLOCKS = {
  PINNED_ITEMS: 'pinned_items',
  OTHER_ITEMS: 'other_items',
}

const ITEMS = [
  { name: BLOCKS.PINNED_ITEMS, child: [] },
  {
    name: BLOCKS.OTHER_ITEMS,
    child: [
      {
        label: 'item1',
        child: [
          { label: 'item3' },
          { label: 'item4', child: [{ label: 'item5' }] },
        ],
      },
      { label: 'item2' },
    ],
  },
]

function App() {
  const [items, setItems] = useState([...ITEMS])
  const [accumulateData, setAccumulateData] = useState([])
  const [draggableElement, setDraggableElement] = useState(null)
  const [targetElement, setTargetElement] = useState(null)
  const [currentDirection, setCurrentDirection] = useState(1)

  function deleteElement(items) {
    const { newItems, link, index } = getLinkParentElement(
      draggableElement.elementObj,
      items
    )
    link.child.splice(index, 0)

    console.log('index',index, link)
    return newItems
  }

  useEffect(() => {
    if (items) {
      const itemsWithId = createUniqElements(items)
      const accumData = getAccumData(itemsWithId)

      setItems([...itemsWithId])
      setAccumulateData([...accumData])
    }
  }, [])

  const createElement = ({
    draggableElement,
    targetElement,
    allItems,
    direction = 1,
  }) => {
    let newState = [...allItems]
    const positive = 1
    const negative = -1
    const neutral = 0

    if (!targetElement) {
      newState[0].child.push({ ...draggableElement.elementObj })
    } else {
      const { newItems, link, index } = getLinkParentElement(
        targetElement.elementObj,
        items
      )

      if (direction === positive) {
        link.child.splice(index + 1, 0, { ...draggableElement.elementObj })
        newState = [...newItems]
      } else if (direction === negative) {
        link.child.splice(index, 0, { ...draggableElement.elementObj })
        newState = [...newItems]
      }
    }
    newState = [...createUniqElements(newState)]
    return newState
  }

  function getBaseParentId(item) {
    if (item.path) {
      return item.path[0]
    } else {
      return -1
    }
  }

  const callbackOnDrop = useCallback(() => {
    let newItems = createElement({
      draggableElement: draggableElement,
      targetElement: targetElement,
      allItems: items,
      direction: draggableElement.direction,
    })
    newItems = deleteElement(newItems)

    setItems(newItems)
  }, [draggableElement, targetElement, items, setItems])

  const handleOnDragStart = (e, item) => {
    const parentBaseId = getBaseParentId(item)
    setDraggableElement({
      element: e.target,
      elementObj: item,
      parentBaseId: parentBaseId,
    })
  }

  const handleDragOverItem = (e, item) => {
    const targetParentBaseId = getBaseParentId(item)

    if (
      item.id !== draggableElement.elementObj.id &&
      targetParentBaseId !== draggableElement.parentBaseId
    ) {
      const targetEl = getCoordElement(e.target)
      const eventPos = e.clientY
      const direction = getDirection(targetEl, eventPos)

      setDraggableElement((prevState) => ({
        ...prevState,
        direction: direction,
      }))
      setTargetElement({
        element: e.target,
        elementObj: item,
        parentBaseId: targetParentBaseId,
      })
    } else {
      setTargetElement(null)
    }
  }

  return (
    <div className={style.App}>
      <DraggableWrapper
        name={BLOCKS.PINNED_ITEMS}
        draggableElement={draggableElement}
        callbackOnDrop={callbackOnDrop}
      >
        <PinnedBlock>
          {items[0].child.map((item, index) =>
            renderRecursive(item, handleDragOverItem, handleOnDragStart)
          )}
        </PinnedBlock>
      </DraggableWrapper>
      <DraggableWrapper
        name={BLOCKS.OTHER_ITEMS}
        draggableElement={draggableElement}
        callbackOnDrop={callbackOnDrop}
      >
        <div className={style.App__SecondBlock}>
          {items[1].child.map((item, index) =>
            renderRecursive(item, handleDragOverItem, handleOnDragStart)
          )}
        </div>
      </DraggableWrapper>
    </div>
  )
}

const renderRecursive = (item, handleDragOverItem, handleOnDragStart) => {
  return (
    <ItemContainer
      label={item.label}
      onDragOver={(e) => handleDragOverItem(e, item)}
      onDragStart={(e) => handleOnDragStart(e, item)}
    >
      {item.child &&
        item.child.length > 0 &&
        item.child.map((subItem) =>
          renderRecursive(subItem, handleDragOverItem, handleOnDragStart)
        )}
    </ItemContainer>
  )
}
export default App
