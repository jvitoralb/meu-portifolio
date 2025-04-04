import projectsBank from './projects-data.js';
import GenerateProjectCard from './project-card.js';
import { openModal } from './modal.js';


const main = () => {
    for(let i = 0; i < projectsBank.length; i++) {
        let project = new GenerateProjectCard(projectsBank[i]);
        project.generate();
    }

    const inputs = document.querySelectorAll('label.project-hamburguer > input');

    inputs.forEach((input) => {
        input.addEventListener('click', (e) => {
            let targetProject = e.target.id;
            let targetElem = targetProject.replace('hamburguer-checkbox', '');

            e.target.parentNode.classList.toggle('ham-bg');

            document
            .querySelector(`#${targetElem}description-container`)
            .classList.toggle('show-project-info');

            document
            .querySelector(`#${targetElem}info > div`)
            .classList.toggle('hide-project-img');
        });
    });

    const images = document.querySelectorAll('.project > div');

    images.forEach((img) => {
        img.addEventListener('click', (e) => {
            let targetAlbum = e.target.id;
            openModal(targetAlbum);
            e.stopPropagation();
        });
    });
}

main();
