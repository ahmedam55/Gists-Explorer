import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const Gist = {
  get(username) {
    if (username) {
      return axios
        .get(`https://api.github.com/users/${username}/gists`, {
          headers: { Authorization: `token ${process.env.REACT_APP_TOKEN_KEY}` },
        })
        .then(response => {
          const gists = response.data

          const gistsMapped = gists.map(gist => {
            const filesnames = Object.keys(gist.files)

            const files = filesnames.map(filename => {
              const currentFile = gist.files[filename]

              //as the files array doesn't have unique ids for this list from GitHub API
              const uniqueId = uuidv4()

              return {
                id: uniqueId,
                filename: currentFile.filename,
                language: currentFile.language,
              }
            })

            return { id: gist.id, files: files, description: gist.description, url: gist.html_url }
          })

          return gistsMapped
        })
    } else {
      return []
    }
  },
}

export default Gist
