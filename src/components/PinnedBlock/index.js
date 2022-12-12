import styles from './index.module.scss'

// Helpers
import cn from 'classnames'
import PropType from 'prop-types'

export function PinnedBlock(props) {
  const { children } = props

  const isHasChildren = Boolean(children?.length > 0)

  return (
    <div
      className={cn(styles.PinnedBlock, {
        [styles.PinnedBlock_noContent]: !isHasChildren,
      })}
    >
      {!isHasChildren && (
        <div className={styles.PinnedBlock__Label}>Drag here to pin</div>
      )}
      {children}
    </div>
  )
}

PinnedBlock.propTypes = {
  children: PropType.node,
}
