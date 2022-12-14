import styles from './index.module.scss'

// Helpers
import cn from 'classnames'
import PropType from 'prop-types'

export function Block(props) {
  const { children } = props

  const isHasChildren = Boolean(children?.length > 0)

  return (
    <div
      className={cn(styles.Block, {
        [styles.Block_noContent]: !isHasChildren,
      })}
    >
      {!isHasChildren && (
        <div className={styles.Block__Label}>Drag something here</div>
      )}
      {children}
    </div>
  )
}

Block.propTypes = {
  children: PropType.node,
}
