['linkedin', 'github', 'contact'].forEach((social) => {
    document.querySelector(`#${social}-svg`)
    .addEventListener('click', () => {
        document.querySelector(`#about-me-socials-${social}`).click();
    });
});
