import LoadMoreButton from './loadMoreBtn';
import { fetchImages } from './onSearch';

export const loadBtn = new LoadMoreButton({
    selector: '.load-more-btn'
})

loadBtn.refs.button.addEventListener('click', onLoadButtonMore);

function onLoadButtonMore() {
    fetchImages();
    onScrollTo();
}

function onScrollTo() {
    let value = document.body.scrollHeight;
    console.log(value);
     setTimeout(() => {
      window.scrollTo({
        top: value,
        left: 0,
        behavior: 'smooth',
      });
    }, 1000);
}