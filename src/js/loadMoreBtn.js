export default class LoadMoreButton {
    constructor({ selector }) {
        this.refs = this.getBtnRefs(selector)

    }

    getBtnRefs(selector) {
        const btnRefs = {};
        btnRefs.button = document.querySelector(selector);
        btnRefs.label = btnRefs.button.querySelector('.btn-label');    
        btnRefs.spinner = btnRefs.button.querySelector('.spinner');
        return btnRefs;
    }

    showBtn() {
        this.refs.button.classList.remove('is-hidden');
    }

    hideBtn() {
        this.refs.button.classList.add('is-hidden');
    }

    enableBtn() {
        this.refs.button.disabled = false;
        this.refs.label.textContent = 'Показать ещё';
        this.refs.spinner.classList.add('is-hidden');
        
    }

    disableBtn() {
        this.refs.button.disabled = true;
        this.refs.label.textContent = 'Загружаем...';
        this.refs.spinner.classList.remove('is-hidden');
    }


}

