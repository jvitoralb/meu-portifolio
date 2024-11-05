import Gallery from './gallery.js';

const modal = document.querySelector('#gallery-modal-sec');
const backward = document.querySelector('#backward');
const forward = document.querySelector('#forward');
const gallery = new Gallery();


const handleOutsideClick = (e) => {
    let target = e.target;
    const allowedTargets = ['gallery-image', 'backward', 'forward'];

    if (!allowedTargets.includes(target.id) || target.id === 'exit-gallery') {
        closeModal();
    }
}

const startWatchingClicks = () => {
    document.addEventListener('click', handleOutsideClick);
}
const stopWatchingClicks = () => {
    document.removeEventListener('click', handleOutsideClick);
}

const closeModal = () => {
    const galleryImage = document.querySelector('#gallery-image');

    backward.removeEventListener('click', gallery.previousImage);
    forward.removeEventListener('click', gallery.nextImage);

    galleryImage.removeAttribute('src');
    modal.classList.remove('modal-open');
    document.body.classList.remove('block-scroll');

    stopWatchingClicks();
}

export const openModal = (targetAlbum) => {
    gallery.init(targetAlbum);

    backward.addEventListener('click', gallery.previousImage);
    forward.addEventListener('click', gallery.nextImage);

    document.body.classList.add('block-scroll');
    modal.classList.add('modal-open');

    startWatchingClicks();
}
