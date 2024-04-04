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

    const [ pt, en ] = await Promise.all([
        fetch(`src/locales/pt/${page}.json`).then(res => res.json()),
        fetch(`src/locales/en/${page}.json`).then(res => res.json()),
    ]);

    handlePageLang(pt, en);
}

const main = () => handlePagePath();

const langsDropdown = document.querySelector('#langs-dropdown-btn');
const langsList = document.querySelector('#langs-dropdown-list');

function dropdownHandler() {
    const langsListClassList = langsList.classList;
    const langsItems = langsList.children;

    function closeDropdownByDocument(e) {
        let elementsToIgnore = [ ...langsItems, ...langsDropdown.children, langsDropdown ];
        if (langsList.classList.contains('open-dropdown') && !elementsToIgnore.includes(e.target)) {
            closeDropdown();
        }
    }
    function langsItemsClickEvent(e) {
        const dropdownLabel = document.querySelector('#dropdown-label');
        dropdownLabel.textContent = e.target.textContent;
        closeDropdown();
        // translate ~~ 
    }
    function closeDropdown() {
        langsListClassList.remove('open-dropdown');
        for(let i = 0; i < langsItems.length; i++) {
            langsItems[i].removeEventListener('click', langsItemsClickEvent);
        }
        document.removeEventListener('click', closeDropdownByDocument);
    }
    function openDropdown() {
        langsListClassList.add('open-dropdown');
        for(let i = 0; i < langsItems.length; i++) {
            langsItems[i].addEventListener('click', langsItemsClickEvent);
        }
        document.addEventListener('click', closeDropdownByDocument);
    }
    
    if (langsListClassList.contains('open-dropdown')) {
        closeDropdown();
    } else {
        openDropdown();
    }
}

langsDropdown.addEventListener('click', dropdownHandler);

window.onload = (e) => main();
