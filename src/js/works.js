import projectsBank from './projects-data.js';


class GenerateProjectArticle {
    constructor({ id, title, desc, repo, img }) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.repo = repo;
        this.img = img;
        this.article = null;
        this.titleContainer = null;
        this.container = null;
    }
    set setArticle(projectId) {
        this.article = document.querySelector(`#project-${projectId}-info`);
    }

    fixIdString(idString) {
        return idString.replaceAll(' ', '-').toLowerCase();
    }

    genProjectContainer() {
        this.container = document.createElement('div');
        this.container.setAttribute('id', 'project-container');
    }
    genTitleContainer() {
        this.titleContainer = document.createElement('div');
        this.titleContainer.setAttribute('class', `title-container${this.id % 2 === 0 ? ' title-inverse' : ''}`);        

        this.container.appendChild(this.titleContainer);
    }
    genGitHubIcon() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("id", "github-svg");
        svg.setAttribute("height", "32");
        svg.setAttribute("shape-rendering", "geometricPrecision");
        svg.setAttribute("text-rendering", "geometricPrecision");
        svg.setAttribute("image-rendering", "optimizeQuality");
        svg.setAttribute("fill", "#FFFFFF");
        svg.setAttribute("fill-rule", "evenodd");
        svg.setAttribute("clip-rule", "evenodd");
        svg.setAttribute("viewBox", "0 0 640 640");

        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z");

        svg.appendChild(path);

        svg.addEventListener('click', () => 
            this.titleContainer.querySelector(`#project-${this.id}-header-link`).click()
        );

        this.titleContainer.appendChild(svg);
    }
    genTitle() {
        const projectLink = document.createElement('a');
        projectLink.setAttribute('href', this.repo);
        projectLink.setAttribute('target', '_blank');
        projectLink.setAttribute('rel', 'external');
        projectLink.setAttribute('id', `project-${this.id}-header-link`);

        projectLink.appendChild(document.createTextNode(this.title));

        const projectTitle = document.createElement('h2');
        projectTitle.setAttribute('id', `project-${this.fixIdString(this.title)}`);
        projectTitle.appendChild(projectLink);

        this.titleContainer.appendChild(projectTitle);
    }
    genDescription() {
        const projectDescription = document.createElement('p');
        projectDescription.setAttribute('id', `project-${this.id}-description`);
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

        this.genProjectContainer();
        this.genTitleContainer();
        this.genTitle();
        this.genGitHubIcon();
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