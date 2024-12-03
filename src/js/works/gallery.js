import projectsData from './projects-data.js';


export default class Gallery {
    constructor() {
        this.currentImage = '';
        this.currentAlbum = [];
        this.currentIndex = 0;
    }
    updateImage() {
        const galleryImage = document.querySelector('#gallery-image');
        
        if (this.currentImage.includes('full')) {
            galleryImage.style.minWidth = '12vw';
        } else {
            galleryImage.style.minWidth = '';
        }

        galleryImage.setAttribute('src', this.currentImage);
    }
    setCurrentAlbum(targetAlbum) {
        let [ { img } ] = projectsData.filter((project) => project.alias === targetAlbum);
        this.currentAlbum = img;
    }
    setCurrentImage() {
        this.currentImage = this.currentAlbum[this.currentIndex];
        this.updateImage();
    }
    setIndex(newIndex) {
        this.currentIndex = newIndex;
    }
    previousImage = (e) => {
        let newIndex = this.currentIndex - 1;

        if (newIndex < 0) {
            return;
        }
        this.setIndex(newIndex);
        this.setCurrentImage();
    }
    nextImage = (e) => {
        let newIndex = this.currentIndex + 1;

        if (newIndex >= this.currentAlbum.length) {
            return;
        }
        this.setIndex(newIndex);
        this.setCurrentImage();
    }
    init(targetAlbum) {
        this.setIndex(0);
        this.setCurrentAlbum(targetAlbum);
        this.setCurrentImage();
    }
}
