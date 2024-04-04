const navbarLinks = document.querySelector('.navbar-links-list');
const toggleNavbarInputButton = document.querySelector('#hamburguer-checkbox');


toggleNavbarInputButton.addEventListener('click', (e) => {
    const navbarClassList = navbarLinks.classList;

    navbarClassList.toggle('navbar-open');
    document.body.classList.toggle('hidden-overflow');
});

const langsDropdown = document.querySelector('#langs-dropdown-btn');
const dropdownLabel = document.querySelector('#dropdown-label');
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
        const dropdownLabel = document.querySelector('#langs-dropdown-label');
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
