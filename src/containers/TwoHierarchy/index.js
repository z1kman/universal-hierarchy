import { useState } from 'react'
import style from './index.module.scss'
import PropTypes from 'prop-types'

// Components
import { Block } from '../../components/Block'

// Containers
import { ItemContainer } from '../Item/'
import { DraggableWrapper } from '../DraggableWrapper'

// Handlers
import { createElement } from '../../handlers/createElement'
import { createUniqElements } from '../../handlers/createUniqElements'
import { getDirection } from '../../handlers/getDirection'
import { getCoordElement } from '../../handlers/getCoordElement'
import { deleteElement } from '../../handlers/deleteElement'
import { getBaseParentId } from '../../handlers/getBaseParentId'

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

export function TwoHierarhy(props) {
  const { data } = props
  const [items, setItems] = useState([...createUniqElements(data)])
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
    newItems = deleteElement(
      [...createUniqElements(newItems)],
      draggableElement
    )
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

  const handleDragOverPanel = (e) => {
    if (e.target !== targetElement?.element) {
      setTargetElement(null)
    }
  }

  return (
    <div className={style.TwoHierarchy}>
      <DraggableWrapper
        draggableElement={draggableElement}
        callbackOnDrop={(event) => callbackOnDrop(event, 0)}
        handleDragOver={handleDragOverPanel}
      >
        <Block>
          {items[0]?.child &&
            items[0].child.map((item, index) =>
              renderRecursive(
                item,
                item.id,
                handleDragOverItem,
                handleOnDragStart
              )
            )}
        </Block>
      </DraggableWrapper>
      <DraggableWrapper
        draggableElement={draggableElement}
        callbackOnDrop={(event) => callbackOnDrop(event, 1)}
        handleDragOver={handleDragOverPanel}
      >
        <div className={style.TwoHierarchy__Block}>
          <Block>
            {items[1]?.child &&
              items[1].child.map((item, index) =>
                renderRecursive(
                  item,
                  item.id,
                  handleDragOverItem,
                  handleOnDragStart
                )
              )}
          </Block>
        </div>
      </DraggableWrapper>
    </div>
  )
}

TwoHierarhy.propTypes = {
  data: PropTypes.array,
}
