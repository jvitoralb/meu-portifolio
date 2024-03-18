import projectsBank from './projects-data.js';


class GenerateProjectArticle {
    constructor({ id, title, desc, repo, img }) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.repo = repo;
        this.img = img;
        this.article = null;
        this.container = document.createElement('div');
    }
    set setArticle(projectId) {
        this.article = document.querySelector(`#project-${projectId}-info`);
    }

    fixIdString(idString) {
        return idString.replaceAll(' ', '-').toLowerCase();
    }

    genTitle() {
        const projectLink = document.createElement('a');
        projectLink.setAttribute('href', this.repo);
        projectLink.setAttribute('target', '_blank');
        projectLink.setAttribute('rel', 'external');
        projectLink.setAttribute('title', 'Go to this project repository');
        projectLink.appendChild(document.createTextNode(this.title));

        const projectTitle = document.createElement('h2');
        projectTitle.setAttribute('id', `project-${this.fixIdString(this.title)}`);
        projectTitle.appendChild(projectLink);

        this.container.appendChild(projectTitle);
    }
    genDescription() {
        const projectDescription = document.createElement('p');
        projectDescription.setAttribute('id', 'project-description');
        projectDescription.appendChild(document.createTextNode(this.desc));

        this.container.appendChild(projectDescription);
    }
    genImage() {
        if (window.innerWidth < 520) return;

        const projectImage = document.createElement('img');
        projectImage.setAttribute('id', `${this.fixIdString(this.title)}-img`);
        projectImage.setAttribute('src', this.img);

        this.article.appendChild(projectImage);
    }
    
    generate() {
        this.setArticle = this.id;

        this.genTitle();
        this.genDescription();
        this.genImage();

        this.article.appendChild(this.container);
    }
}

const main = () => {
    for(let i = 0; i < projectsBank.length; i++) {
        let project = new GenerateProjectArticle(projectsBank[i]);
        project.generate();
    }
}

main();