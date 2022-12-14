import { useRef, useEffect, useCallback } from 'react'
import styles from './index.module.scss'
import PropTypes from 'prop-types'

export function DraggableWrapper(props) {
  const { children, draggableElement, callbackOnDrop, handleDragOver } = props
  const ref = useRef()

  const onDrop = useCallback(
    (e) => {
      callbackOnDrop(e)
    },
    [callbackOnDrop]
  )

  const onDragOver = useCallback((e) => {
    e.preventDefault()
    handleDragOver(e)
  },[handleDragOver])

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
  }, [draggableElement, onDrop, onDragOver])

  return (
    <div className={styles.DraggableWrapper} ref={ref}>
      {children}
    </div>
  )
}

DraggableWrapper.propTypes = {
  children: PropTypes.node, 
  draggableElement: PropTypes.object, 
  callbackOnDrop: PropTypes.func, 
  handleDragOver: PropTypes.func
}