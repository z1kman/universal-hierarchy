import { useEffect, useRef, useState } from 'react'
import style from './app.module.scss'
import { Item } from './components/Item'
import { DraggableWrapper } from './containers/DraggableWrapper'

const ITEMS = [
  {
    label: 'item1',
  },
  { label: 'item2' },
]

function App() {
  const [firstBlock, setFirstBlock] = useState([])
  const [secondBlock, setSecondBlock] = useState([...ITEMS])
  const [draggableElement, setDraggableElement] = useState(null)
  const [targetElement, setTargetElement] = useState(null)
  const [currentDirection, setCurrentDirection] = useState(1)

  function deleteElement(index, itemsTargetElement, setState) {
    const newState = [...itemsTargetElement]
    newState.splice(index, 1)
    setState(newState)
  }

  function createElement(
    indexDragElement,
    indexTargetElement = 0,
    senderItems,
    recipientItems,
    setStateRecipinet,
    direction = 1
  ) {
    const newState = [...recipientItems]
    console.log('dasdsa', direction)
    if (direction === 1) {
      newState.splice(indexTargetElement + 1, 0, senderItems[indexDragElement])
    } else if (direction === -1) {
      newState.splice(indexTargetElement, 0, senderItems[indexDragElement])
    }

    setStateRecipinet(newState)
  }

  useEffect(() => {
    console.log(currentDirection)
  }, [currentDirection])
  const callbackOnDropFirstBlock = (e) => {
    if (targetElement) {
      createElement(
        draggableElement.index,
        targetElement.index,
        secondBlock,
        firstBlock,
        setFirstBlock,
        draggableElement.direction
      )
    } else {
      createElement(
        draggableElement.index,
        0,
        secondBlock,
        firstBlock,
        setFirstBlock,
        draggableElement.direction
      )
    }

    deleteElement(draggableElement.index, secondBlock, setSecondBlock)
    setDraggableElement(null)
    setCurrentDirection(1)
  }

  const callbackOnDropSecondBlock = (e) => {
    createElement(
      draggableElement.index,
      firstBlock,
      secondBlock,
      setSecondBlock
    )
    deleteElement(draggableElement.index, firstBlock, setFirstBlock)
    setDraggableElement(null)
  }

  const handleOnDragStart = (e, index, block) => {
    setDraggableElement({ element: e.target, index: index, block: block })
  }

  const handleDragOver = (e, index, block) => {
    if (block !== draggableElement.block) {
      const targetEl = getCoordElement(e.target)
      const eventPos = e.clientY
      const direction = getDirection(targetEl, eventPos)
      setDraggableElement((prevState) => ({
        ...prevState,
        direction: direction,
      }))
      setTargetElement({
        element: e.target,
        index: index,
        block: block,
        direction: direction,
      })
    } else {
      setTargetElement(null)
    }
  }

  const getCoordElement = (element) => {
    const coordinateElement = element.getBoundingClientRect()
    const startPositionElement = coordinateElement.y
    const endPositionElement = coordinateElement.height + coordinateElement.y
    const heightOfElement = coordinateElement.height
    const midOfLemenet = startPositionElement + heightOfElement / 2
    const centralAreaCoverage = heightOfElement / 3
    const centerZoneFrom = midOfLemenet - centralAreaCoverage
    const centerZoneTo = midOfLemenet + centralAreaCoverage

    return {
      start: startPositionElement,
      end: endPositionElement,
      height: heightOfElement,
      centerZoneFrom: centerZoneFrom,
      centerZoneTo: centerZoneTo,
    }
  }

  const getDirection = (targetEl, eventPos) => {
    if (eventPos < targetEl.centerZoneFrom) {
      return -1
    } else if (eventPos > targetEl.centerZoneTo) {
      return 1
    } else {
      return 0
    }
  }

  return (
    <div className={style.App}>
      <DraggableWrapper
        draggableElement={draggableElement}
        callbackOnDrop={callbackOnDropFirstBlock}
      >
        <div className={style.App__FirstBlock}>
          {firstBlock.map((item, index) => (
            <Item
              label={item.label}
              onDragOver={(e) => handleDragOver(e, index, '1')}
              onDragStart={(e) => handleOnDragStart(e, index, '1')}
            />
          ))}
        </div>
      </DraggableWrapper>
      <DraggableWrapper
        draggableElement={draggableElement}
        callbackOnDrop={callbackOnDropSecondBlock}
      >
        <div className={style.App__SecondBlock}>
          {secondBlock.map((item, index) => (
            <Item
              label={item.label}
              onDragOver={(e) => handleDragOver(e, index, '2')}
              onDragStart={(e) => handleOnDragStart(e, index, '2')}
            />
          ))}
        </div>
      </DraggableWrapper>
    </div>
  )
}

export default App
