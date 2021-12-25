import { getImages } from '../constants/api'
import { refs } from '../constants/refs'
import { makePhotoCards } from '../components/PhotoCard/PhotoCard'
import Notiflix from 'notiflix'

const store = {
  page: 1,
  query: '',
}

const clickSubmit = (e) => {
  e.preventDefault()
  refs.gallery.innerHTML = ''
  refs.loadMoreBtn.classList.add('visually-hidden')

  const query = refs.searchForm.elements.searchQuery.value
  store.query = query
  store.page = 1

  if (!query) {
    Notiflix.Notify.failure('Please, type your query...')
    return
  } else {
    async function resFunc(query) {
      try {
        const res = await getImages(query)
        const data = await res.data
        if (data.totalHits) {
          Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
          makePhotoCards(data.hits)
          refs.loadMoreBtn.classList.remove('visually-hidden')
        } else {
          refs.gallery.innerHTML = ''
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          )
        }
      } catch (err) {
        alert('ERROR: ' + err)
      }
    }
    resFunc(query)
  }
}

const clickLoadMore = (e) => {
  const query = store.query
  store.page += 1

  async function resFunc(query) {
    try {
      const res = await getImages(query, store.page)
      const data = res.data
      if (data.hits.length) {
        makePhotoCards(data.hits)
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
      } else {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        )
        refs.loadMoreBtn.classList.add('visually-hidden')
      }
    } catch (err) {
      alert('ERROR: ' + err)
    }
  }
  resFunc(query)
}

export let clickSubmitEvent = refs.searchForm.addEventListener(
  'submit',
  clickSubmit
)
export let clickLoadMoreEvent = refs.loadMoreBtn.addEventListener(
  'click',
  clickLoadMore
)
