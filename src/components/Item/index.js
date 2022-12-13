import styles from './index.module.scss'

// Helpers
import cn from 'classnames'
import PropType from 'prop-types'
// Svg
import chevronSvg from '../../svg/chevron.svg'

export function Item(props) {
  const { isHasChildren, open, label, onClick, onDragStart, onDragOver } = props

  return (
    <div
      className={styles.Item}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
    >
      <div className={styles.Item__Header}>
        <div
          onClick={onClick}
          className={cn(styles.Item__Icon, {
            [styles.Item__Icon_hidden]: !isHasChildren,
            [styles.Item__Icon_open]: open,
          })}
        >
          <img src={chevronSvg} alt="chevron" />
        </div>
        <div className={styles.Item__Label}>{label}</div>
      </div>
    </div>
  )
}

Item.propTypes = {
  open: PropType.bool,
  label: PropType.string,
  isHasChildren: PropType.bool,
  onClick: PropType.func,
  onDragStart: PropType.func,
  onDragOver: PropType.func,
}

Item.defaultProps = {
  label: 'label',
  open: false,
}
