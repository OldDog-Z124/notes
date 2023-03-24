import axios from 'axios'

const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true,
  }
  return request.then(response => response.data.concat(nonExisting))
}

const create = newNote => {
  const request = axios.post(baseUrl, newNote)
  return request.then(response => response.data)
}

const update = (id, changeNote) => {
  const request = axios.put(`${baseUrl}/${id}`, changeNote)
  return request.then(response => response.data)
}

const noteService = {
  getAll,
  create,
  update,
}

export default noteService