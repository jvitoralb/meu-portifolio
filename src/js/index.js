const navbarLinks = document.querySelector('.navbar-links-list');
const toggleNavbarInputButton = document.querySelector('#hamburguer-checkbox');


toggleNavbarInputButton.addEventListener('click', (e) => {
    const navbarClassList = navbarLinks.classList;

    navbarClassList.toggle('navbar-open');
    document.body.classList.toggle('hidden-overflow');
});