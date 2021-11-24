import { Notify } from 'notiflix';
import { markup } from './getImages/markup';
import { getRefs } from './getImages/getRefs';
import { getImages } from './getImages/getImages';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './sass/main.scss';

const refs = getRefs();
let page = 1;
let searchQuery = '';
let totalHits;

refs.searchForm.addEventListener('submit', onSearchClick);
refs.loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
refs.loadMoreButton.classList.add('is-hidden');

function onSearchClick(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.searchQuery.value;
  refs.loadMoreButton.classList.remove('is-hidden');
  refs.gallery.innerHTML = '';
  page = 1;

  if (searchQuery === '') {
    return Notify.failure('Please enter your search data');
  }
  event.target.reset();
  getImages(searchQuery, page).then(res => {
    const imageArray = res.data.hits;
    totalHits = res.data.totalHits;

    if (imageArray.length === 0) {
      refs.loadMoreButton.classList.add('is-hidden');
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again',
      );
    }

    Notify.success(`Hooray! We found ${totalHits} images.`);
    markup(res);
    refs.loadMoreButton.classList.remove('is-hidden');
    isAllImages(page, totalHits);
    page += 1;
  });
}

function isAllImages(page, totalHits) {
  if (page * 40 >= totalHits) {
    refs.loadMoreButton.classList.add('is-hidden');
    Notify.success("We're sorry, but you've reached the end of search results");
  }
}

function onLoadMoreButtonClick() {
  getImages(searchQuery, page).then(res => {
    markup(res);
    isAllImages(page, totalHits);
    page += 1;
  });
}
