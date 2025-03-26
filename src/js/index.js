import './navbar.js';
import PageTranslator from './translator.js';


function pageLangHandler() {
    const translator = new PageTranslator();

    (async function resolvePageLocales() {
        let page = '';
        let portfolio = false;
    
        switch(window.location.pathname) {
            case '/about.html':
                page = 'about';
                break;
            case '/portfolio/index.html':
                portfolio = true;
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
            fetch(`${(portfolio ? '../' : './')}src/locales/pt/${page}.json`).then(res => res.json()),
            fetch(`${(portfolio ? '../' : './')}src/locales/en/${page}.json`).then(res => res.json()),
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

function dropdownHandler(changePageLang) {
    const langsList = document.querySelector('#langs-dropdown-list');
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
        changePageLang(e.target.getAttribute('itemid'));
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
