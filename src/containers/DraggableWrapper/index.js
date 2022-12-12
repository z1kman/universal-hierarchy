import { useRef, useEffect } from 'react'

export function DraggableWrapper(props) {
  const { children, callbackOnDrop, draggableElement } = props
  const ref = useRef()

  useEffect(() => {
    let currentref = null
    if (ref.current) {
      currentref = ref.current
      currentref.addEventListener('drop', onDrop)
      currentref.addEventListener('dragover', onDragOver)

      return () => {
        currentref.removeEventListener('dragover', onDragOver)
        currentref.removeEventListener('drop', onDrop)
      }
    }
  }, [draggableElement])

  const onDrop = (e) => {
    callbackOnDrop()
  }

  function onDragOver(e) {
    e.preventDefault()
    // const targetEl = getCoordElement(e.target)
    // const eventPos = e.y
    // const direction = getDirection(targetEl, eventPos)

    // console.log(direction)
    // console.log(srcEl)
    // console.log({ targetEl, srcEl })
    // const srcEl = getCoordElement(e.toElement)
  }

//   const getCoordElement = (element) => {
//     const coordinateElement = element.getBoundingClientRect()
//     const startPositionElement = coordinateElement.y
//     const endPositionElement = coordinateElement.height + coordinateElement.y
//     const heightOfElement = coordinateElement.height
//     const midOfLemenet = startPositionElement + heightOfElement / 2
//     const centralAreaCoverage = heightOfElement / 3
//     const centerZoneFrom = midOfLemenet - centralAreaCoverage
//     const centerZoneTo = midOfLemenet + centralAreaCoverage

//     return {
//       start: startPositionElement,
//       end: endPositionElement,
//       height: heightOfElement,
//       centerZoneFrom: centerZoneFrom,
//       centerZoneTo: centerZoneTo,
//     }
//   }

//   const getDirection = (targetEl, eventPos) => {
//     if (eventPos < targetEl.centerZoneFrom) {
//       return -1
//     } else if (eventPos > targetEl.centerZoneTo) {
//       return 1
//     } else {
//       return 0
//     }
//   }

  return <div ref={ref}>{children}</div>
}
