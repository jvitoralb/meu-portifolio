import PageTranslator from './translator.js';

const navbarLinks = document.querySelector('.navbar-links-list');
const toggleNavbarInputButton = document.querySelector('#hamburguer-checkbox');


toggleNavbarInputButton.addEventListener('click', (e) => {
    const navbarClassList = navbarLinks.classList;

    navbarClassList.toggle('navbar-open');
    document.body.classList.toggle('hidden-overflow');
});

const handlePageLang = (pt, en) => {
    const translator = new PageTranslator(pt, en);
    const langSelector = document.querySelector('#lang-selector');

    langSelector.addEventListener('change', (e) => {
        translator.setSelectedLanguage = e.target.value;
        translator.main();
    });

    let selectedLang = localStorage.getItem('lang') || window.navigator.language;
    translator.setSelectedLanguage = selectedLang;
    langSelector.value = selectedLang;
    translator.main();
}

const handlePagePath = async () => {
    let page = '';

    switch(window.location.pathname) {
        case '/about.html':
            page = 'about';
            break;
        case '/works.html':
            page = 'works';
            break;
        case '/contact.html':
            page = 'contact';
            break;
        default:
            page = 'index';
    }

    const pageVersions = await Promise.all([
        fetch(`src/locales/pt/${page}.json`).then(res => res.json()),
        fetch(`src/locales/en/${page}.json`).then(res => res.json()),
    ]);

    return pageVersions;
}

const main = async () => {
    const [ pt, en ] = await handlePagePath();
    handlePageLang(pt, en);
}

main();