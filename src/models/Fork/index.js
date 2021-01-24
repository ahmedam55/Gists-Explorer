import axios from 'axios'

const Fork = {
  getAll(gistsIds) {
    const hasGistIds = gistsIds.length > 0

    if (hasGistIds) {
      const requestsList = gistsIds.map(gistId =>
        axios.get(`https://api.github.com/gists/${gistId}/forks`, {
          headers: { Authorization: `token ${process.env.REACT_APP_TOKEN_KEY}` },
        }),
      )

      return axios.all(requestsList).then(
        axios.spread((...responses) => {
          const forksLookup = responses.reduce((acc, currentResponse, index) => {
            const forks = currentResponse.data
            const lastThreeForks = forks.slice(-3)

            const forksMapped = lastThreeForks.map(fork => {
              const { avatar_url: image, login: name, html_url: url, id } = fork.owner

              return { image, name, url, id }
            })

            const gistId = gistsIds[index]

            acc[gistId] = forksMapped

            return acc
          }, {})
          
          return forksLookup
        }),
      )
    } else {
      return {}
    }
  },
}

export default Fork
