import PageTranslator from './translator.js';

const navbarLinks = document.querySelector('.navbar-links-list');
const toggleNavbarInputButton = document.querySelector('#hamburguer-checkbox');


toggleNavbarInputButton.addEventListener('click', (e) => {
    const navbarClassList = navbarLinks.classList;

    navbarClassList.toggle('navbar-open');
    document.body.classList.toggle('hidden-overflow');
});

function pageLangHandler() {
    const translator = new PageTranslator();

    (async function resolvePageLocales() {
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
    
        const loadedLocales = await Promise.all([
            fetch(`src/locales/pt/${page}.json`).then(res => res.json()),
            fetch(`src/locales/en/${page}.json`).then(res => res.json()),
        ]);

        translator.setLocalesTranslations = loadedLocales;
        resolvePageLang();
    })();
    function resolvePageLang() {
        let selectedLang = localStorage.getItem('lang') || window.navigator.language;
        translator.setSelectedLanguage = selectedLang;
        translator.main();
    }
    function changePageLang(selectedLang) {
        translator.setSelectedLanguage = selectedLang;
        translator.main();
    }

    return changePageLang;
}

const langsDropdown = document.querySelector('#langs-dropdown-btn');
const langsList = document.querySelector('#langs-dropdown-list');

function dropdownHandler(changePageLang) {
    const langsListClassList = langsList.classList;
    const langsItems = langsList.children;

    function closeDropdownByDocument(e) {
        let elementsToIgnore = [ ...langsItems, ...langsDropdown.children, langsDropdown ];
        if (langsList.classList.contains('open-dropdown') && !elementsToIgnore.includes(e.target)) {
            closeDropdown();
        }
    }
    function langsItemsClickEvent(e) {
        const dropdownLabel = document.querySelector('#langs-dropdown-label');
        dropdownLabel.textContent = e.target.textContent;
        closeDropdown();

        let selectedLang = '';

        switch(e.target.getAttribute('itemid')) {
            case '0':
                selectedLang = 'pt-BR';
                break;
            case '1':
                selectedLang = 'en-US';
                break;
            default:
                selectedLang = 'pt-BR';
        }

        changePageLang(selectedLang);
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

window.onload = (e) => {
    let changePageLang = pageLangHandler();
    langsDropdown.addEventListener('click', () => dropdownHandler(changePageLang));
};
