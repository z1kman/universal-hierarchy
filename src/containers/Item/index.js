import { useState } from 'react'
import styles from './index.module.scss'

// Components
import { Item } from '../../components/Item'

export function ItemContainer(props) {
  const { children, ...otherProps } = props
  const [open, setOpen] = useState(false)

  const handleOnClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <Item
        {...otherProps}
        open={open}
        isHasChildren={Boolean(children && children.length > 0)}
        onClick={handleOnClick}
      />
      <div className={styles.ItemContainer__Child}>{open && children}</div>
    </>
  )
}
