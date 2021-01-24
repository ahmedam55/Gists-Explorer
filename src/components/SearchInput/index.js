import { memo } from 'react'

import styles from './style.module.scss'

const SearchInput = memo(({ value, onChange }) => {
  return (
    <input
      className={styles.searchInput}
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search…"
    />
  )
})

export default SearchInput
