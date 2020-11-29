import getRefs from './getRefs';
import ApiService from './apiService';
import photoCardTpl from '../templates/photo-card.hbs';
import { loadBtn } from './loadButton';
import { notification } from './notify';
import { onImageClick } from './onModal';


const refs = getRefs();
console.log(refs);

refs.searchForm.addEventListener("submit", onSearch);

export const apiService = new ApiService();

function onSearch(event) {
    event.preventDefault();
    apiService.inputQuery = event.target.elements.query.value.trim();
    if (apiService.inputQuery === '') {
        notification('error', 'Ты забыл написать что ищешь!');
        return;
    }

    loadBtn.showBtn();
    apiService.resetPage();
    clearGallery();
    fetchImages();
    
}


export function renderGallery(hits) {
    refs.imagesContainer.insertAdjacentHTML('beforeend', photoCardTpl(hits))
}


function clearGallery() {
    refs.imagesContainer.innerHTML = '';
} 

export function fetchImages() {
    loadBtn.disableBtn();
    apiService.getQuery().then(hits => { 
        if (hits.length === 0) {
            notification('error', 'А бредовее запроса ты не мог придумать?');
            loadBtn.hideBtn();
            return;
        }
       
        if (hits.length > 0) {
            renderGallery(hits)
            loadBtn.enableBtn();
        }
        
    });
}
