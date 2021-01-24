import { memo } from 'react'

import ForksList from '../ForksList'
import LanguageBadge from '../LanguageBadge'

import styles from './style.module.scss'

const GistItem = memo(({ description = '', files = [], url = '', forksList = [] }) => {

  const hasForks = forksList != null && forksList.length > 0

  return (
    <div className={styles.gistItem}>
      <a href={url} target="_blank" rel="noreferrer" className={styles.gistItemLink}>
        <p className={styles.gistItemDescription}>{description}</p>

        {files.map(file => (
          <p className={styles.gistItemFilename} key={file.id}>
            {file.filename} <LanguageBadge language={file.language} />
          </p>
        ))}
      </a>

      {hasForks && <ForksList data={forksList} />}
    </div>
  )
})

export default GistItem
