import { refs } from '../../constants/refs'

export const makePhotoCards = (PhotoCards) => {
  PhotoCards.forEach((card, index) => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = card

    const cardMarkup = `
      <div class="photo-card">
        <a href='${largeImageURL}'><img class='card-image' src="${webformatURL}" alt="${tags}" title="${tags}" loading="lazy" /></a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <span>${likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b>
            <span>${views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <span>${comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <span>${downloads}</span>
          </p>
        </div>
      </div>`

    refs.gallery.insertAdjacentHTML('beforeend', cardMarkup)
  })
}
