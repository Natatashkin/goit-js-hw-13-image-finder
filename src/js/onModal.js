import getRefs from './getRefs';
import ApiService from './apiService';
import photoCardTpl from '../templates/photo-card.hbs';
import renderGallery from './onSearch';

const refs = getRefs();

const lightboxRef = document.querySelector('.lightbox');
const overlay = document.querySelector('.lightbox-overlay');
const lightboxContent = document.querySelector('.lightbox-content');
const lightboxCloser = document.querySelector('.lightbox-closer');
const lightboxImage = document.querySelector('.lightbox-image');

refs.imagesContainer.addEventListener('click', onModalOpen);
lightboxCloser.addEventListener('click', onCloseBtnModal);


function onImageClick(event) {
  return event.target.dataset.source;
}

function onModalOpen(event) {
  
  setTimeout(() => {
    event.preventDefault();
  if (event.target.nodeName !== "IMG") {
        return;
    }
    lightboxRef.classList.add('is-open');
    onChangeLightboxImageUrl(event);
    
  }, 500);
}

function onCloseBtnModal() {
  lightboxRef.classList.remove('is-open');
  removeImageAtr()
}

function onChangeLightboxImageUrl(event) {
  if (lightboxRef.classList.contains("is-open")) {
    lightboxImage.src = onImageClick(event);
  }
}

function removeImageAtr() {
  lightboxImage.removeAttribute('src');
}

