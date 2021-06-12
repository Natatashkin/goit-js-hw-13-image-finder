import '../styles.css';
import getRefs from './getRefs';
import '../images/830.gif';
// import ApiService from './apiService';
// import photoCardTpl from '../templates/photo-card.hbs';
// import renderGallery from './onSearch';

const refs = getRefs();

const lightboxRef = document.querySelector('.lightbox');
const lightboxCloser = document.querySelector('.lightbox-closer');
const lightboxImage = document.querySelector('.lightbox-image');
// const preloaderRef = document.querySelector('.js-preloader');

refs.imagesContainer.addEventListener('click', onModalOpen);
lightboxCloser.addEventListener('click', onCloseBtnModal);

function onImageClick(event) {
  return event.target.dataset.source;
}

function onModalOpen(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  showPreloader();
  lightboxRef.classList.add('is-open');
  lightboxImage.onload = function () {
    removePreloader();
    onChangeLightboxImageUrl(event);
  };
}

function onCloseBtnModal() {
  lightboxRef.classList.remove('is-open');
  removeImageAtr();
}

function onChangeLightboxImageUrl(event) {
  if (lightboxRef.classList.contains('is-open')) {
    lightboxImage.src = onImageClick(event);
    console.log(lightboxImage.src);
  }
}

function removeImageAtr() {
  lightboxImage.removeAttribute('src');
}

function showPreloader() {
  lightboxImage.classList.add('preloader');
  lightboxImage.src = '../images/830.gif';
}

function removePreloader() {
  lightboxImage.classList.remove('preloader');
}
