import axios from 'axios'

const BASE_URL = `https://pixabay.com/api/`
const PER_PAGE = 40

const createOptions = (options) => {
  const keys = Object.keys(options)
  const parameters = `?` + keys.map((key) => `${key}=${options[key]}`).join('&')

  return parameters
}

export const getImages = (query, page = 1) => {
  const options = {
    key: '24886744-18a3e769c9cca3e97ac99edd9',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: PER_PAGE,
  }

  return axios.get(BASE_URL + createOptions(options))
}
