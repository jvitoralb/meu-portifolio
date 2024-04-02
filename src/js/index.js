const navbarLinks = document.querySelector('.navbar-links-list');
const toggleNavbarInputButton = document.querySelector('#hamburguer-checkbox');


toggleNavbarInputButton.addEventListener('click', (e) => {
    const navbarClassList = navbarLinks.classList;

    navbarClassList.toggle('navbar-open');
    document.body.classList.toggle('hidden-overflow');
});

const langsDropdown = document.querySelector('#langs-dropdown-btn');
const langsList = document.querySelector('#langs-dropdown-list');


function dropdownHandler() {
    const langsListClassList = langsList.classList;
    const langsItems = langsList.children;

    function closeDropdownByDocument(e) {
        if (langsList.classList.contains('open-dropdown') && ![...langsItems, langsDropdown].includes(e.target)) {
            closeDropdown();
        }
    }
    function langsItemsClickEvent(e) {
        langsDropdown.textContent = e.target.textContent;
        closeDropdown();
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
