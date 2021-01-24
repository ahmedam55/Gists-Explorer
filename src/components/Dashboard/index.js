import { memo, useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import GistItem from '../../components/GistItem'
import SearchInput from '../../components/SearchInput'
import { useDebounce } from '../../helpers/Hooks'
import Fork from '../../models/Fork'
import Gist from '../../models/Gist'
import Error from '../Error'
import Loading from '../Loading'

import styles from './style.module.scss'

const Dashboard = memo(() => {
  const [username, setUsername] = useState('')
  const debouncedUserName = useDebounce(username, 300)

  const gistsQuery = useQuery(['gists', debouncedUserName], () => Gist.get(debouncedUserName))

  const activeGistsIds = useMemo(() => {
    const hasData = gistsQuery.data != null

    return hasData ? gistsQuery.data.map(gist => gist.id) : []
  }, [gistsQuery.data])

  const forksLookupQuery = useQuery(activeGistsIds, () => Fork.getAll(activeGistsIds))

  const changeUserName = useCallback(event => {
    const { value } = event.target

    setUsername(value)
  }, [])

  return (
    <div className={styles.app}>
      <div className="container">
        <SearchInput value={username} onChange={changeUserName} />
        
        <div className={styles.gistsWrapper}>
          {gistsQuery.isLoading ? (
            <Loading />
          ) : gistsQuery.isError ? (
            <Error />
          ) : (
            gistsQuery.data.map(gist => {
              const id = gist.id
              const gistForks = forksLookupQuery.data != null ? forksLookupQuery.data[id] : []

              return (
                <GistItem
                  key={id}
                  description={gist.description}
                  files={gist.files}
                  url={gist.url}
                  forksList={gistForks}
                />
              )
            })
          )}
        </div>
      </div>
    </div>
  )
})

export default Dashboard
