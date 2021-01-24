import { memo } from 'react'

import styles from './style.module.scss'

const ForksList = memo(({ data = [] }) => {
  return (
    <ul className={styles.forksList}>
      {data.map(fork => (
        <li key={fork.id} className={styles.forkItem}>
          <img className={styles.forkItemImage} alt={fork.login} src={`${fork.image}&s=60`} />
          <span className={styles.forkItemName}>{fork.name}</span>

          <a href={fork.url} target="_blank" rel="noreferrer" className={styles.forkItemLink}>
            go to fork
          </a>
        </li>
      ))}
    </ul>
  )
})

export default ForksList
