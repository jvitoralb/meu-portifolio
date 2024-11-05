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
            
            document
            .querySelector(`#${targetElem}description-container`)
            .classList.toggle('show-project-info');

            document
            .querySelector(`#${targetElem}info > img`)
            .classList.toggle('hide-project-img');
        });
    });

    const images = document.querySelectorAll('.project > img');

    images.forEach((img) => {
        img.addEventListener('click', (e) => {
            let targetAlbum = e.target.id;
            console.log(targetAlbum)
            openModal(targetAlbum);
            e.stopPropagation();
        });
    });
}

main();
