import { memo } from 'react'

import styles from './style.module.scss'

const Loading = memo(() => {
  return (
    <div className={styles.loading}>
      <div className={styles.bounce1} />
      <div className={styles.bounce2} />
    </div>
  )
})

export default Loading
