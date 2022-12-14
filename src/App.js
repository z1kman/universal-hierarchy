import { useCallback, useState } from 'react'
import style from './app.module.scss'

// Components
import { PinnedBlock } from './components/PinnedBlock'

// Containers
import { ItemContainer } from './containers/Item/'
import { DraggableWrapper } from './containers/DraggableWrapper'

// Handlers
import { createElement } from './handlers/createElement'
import { createUniqElements } from './handlers/createUniqElements'
import { getDirection } from './handlers/getDirection'
import { getCoordElement } from './handlers/getCoordElement'
import { deleteElement } from './handlers/deleteElement'
import { getBaseParentId } from './handlers/getBaseParentId'

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

const renderRecursive = (item, key, handleDragOverItem, handleOnDragStart) => {
  return (
    <ItemContainer
      key={key}
      label={item.label}
      onDragOver={(e) => handleDragOverItem(e, item)}
      onDragStart={(e) => handleOnDragStart(e, item)}
    >
      {item.child &&
        item.child.length > 0 &&
        item.child.map((subItem, subIndex) =>
          renderRecursive(
            subItem,
            subItem.id,
            handleDragOverItem,
            handleOnDragStart
          )
        )}
    </ItemContainer>
  )
}

function App() {
  const [items, setItems] = useState([...createUniqElements(ITEMS)])
  const [draggableElement, setDraggableElement] = useState(null)
  const [targetElement, setTargetElement] = useState(null)

  const callbackOnDrop = (event, indexPanel) => {
    let newItems = createElement({
      draggableElement: draggableElement,
      targetElement: targetElement,
      targetPanelIndex: indexPanel,
      allItems: items,
      direction: draggableElement.direction,
    })
    newItems = deleteElement(newItems, draggableElement)
    console.log(newItems)
    setItems([...createUniqElements(newItems)])
  }

  const handleOnDragStart = (e, item) => {
    const parentBaseId = getBaseParentId(item)
    setDraggableElement({
      element: e.target,
      elementObj: item,
      parentBaseId: parentBaseId,
    })
  }

  const handleDragOverItem = (e, item) => {
    if (item.id !== draggableElement.elementObj.id) {
      const targetParentBaseId = getBaseParentId(item)
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
        callbackOnDrop={(event) => callbackOnDrop(event, 0)}
      >
        <PinnedBlock>
          {items[0].child.map((item, index) =>
            renderRecursive(
              item,
              item.id,
              handleDragOverItem,
              handleOnDragStart
            )
          )}
        </PinnedBlock>
      </DraggableWrapper>
      <DraggableWrapper
        name={BLOCKS.OTHER_ITEMS}
        draggableElement={draggableElement}
        callbackOnDrop={(event) => callbackOnDrop(event, 1)}
      >
        <div className={style.App__SecondBlock}>
          {items[1].child.map((item, index) =>
            renderRecursive(
              item,
              item.id,
              handleDragOverItem,
              handleOnDragStart
            )
          )}
        </div>
      </DraggableWrapper>
    </div>
  )
}

export default App
