const toggleNavbarInputButton = document.querySelector('#hamburguer-checkbox');

function responsiveNavbarHandler(e) {
    const navbarLinks = document.querySelector('.navbar-links-list');
    const header = document.querySelector('#portfolio-header');
    const documentClassList = document.body.classList;
    const navbarClassList = navbarLinks.classList;
    const headerClassList = header.classList;

    headerClassList.toggle('header-bg-nav-open');
    navbarClassList.toggle('navbar-open');
    documentClassList.toggle('hidden-overflow');

    window.addEventListener('resize', (e) => {
        if (window.innerWidth < 690) return;

        if (documentClassList.contains('hidden-overflow')) documentClassList.remove('hidden-overflow');
        if (headerClassList.contains('header-bg-nav-open')) headerClassList.remove('header-bg-nav-open');
        if (navbarClassList.contains('navbar-open')) navbarClassList.remove('navbar-open');
        if (toggleNavbarInputButton.checked) toggleNavbarInputButton.checked = false;
    });
}

toggleNavbarInputButton.addEventListener('click', responsiveNavbarHandler);
