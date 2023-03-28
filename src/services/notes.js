import axios from 'axios'

const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
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