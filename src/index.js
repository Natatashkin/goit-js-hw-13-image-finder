import './styles.css';
import 'material-design-icons/iconfont/material-icons.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { notification } from './js/notify';
import ApiService from './js/apiService';
import getRefs from './js/getRefs';
import photoCardTpl from './templates/photo-card.hbs';
// import loadMoreBtn from './templates/loadMoreBtn.hbs';
import LoadMoreButton from './js/loadMoreBtn';
import { setTimeout } from 'core-js';




const loadBtn = new LoadMoreButton({
    selector: '.load-more-btn'
})

const refs = getRefs();

refs.searchForm.addEventListener("submit", onSearch);
loadBtn.refs.button.addEventListener('click', onLoadButtonMore);
// loadBtn.refs.button.addEventListener('click', scrollDocument);


const apiService = new ApiService();


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


function renderGallery(hits) {
    refs.imagesContainer.insertAdjacentHTML('beforeend', photoCardTpl(hits))
}


function clearGallery() {
    refs.imagesContainer.innerHTML = '';
} 

function fetchImages() {
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
            return;
        }
        
    });
}

async function onLoadButtonMore() {
    const renderPage = await fetchImages();
    const documentHeight = await window.pageYOffset;
    console.log(documentHeight);
    const screenHeight = document.documentElement.clientHeight;
    console.log(screenHeight);
    const nextPage = window.scrollBy(0, 700);
    // return nextPage;
}





