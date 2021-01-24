import { memo, useMemo } from 'react'

import randomColor from '../../helpers/RandomColor'

import styles from './style.module.scss'

const LanguageBadge = memo(({ language }) => {
  const color = useMemo(() => {
    return randomColor(language)
  }, [language])

  return (
    language != null && (
      <span className={styles.badge}>
        <span className={styles.badgeDot} style={{ backgroundColor: color }} />
        <span className={styles.badgeText}>{language}</span>
      </span>
    )
  )
})

export default LanguageBadge
