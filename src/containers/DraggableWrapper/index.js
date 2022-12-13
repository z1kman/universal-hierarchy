import { useRef, useEffect, useCallback } from 'react'

export function DraggableWrapper(props) {
  const { children, callbackOnDrop, draggableElement } = props
  const ref = useRef()

  const onDrop = useCallback(
    (e) => {
      callbackOnDrop(e)
    },
    [callbackOnDrop]
  )

  const onDragOver = (e) => {
    e.preventDefault()
  }

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
  }, [draggableElement, onDrop])

  return <div ref={ref}>{children}</div>
}
