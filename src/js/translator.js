export default class PageTranslator {
    constructor(pt, en) {
        this.actualLang = document.documentElement.getAttribute('lang');
        this.selectedLang = null;
        this.selectedLangData = null;
        this.supportedLangs = ['pt-BR', 'en-US'];
        this.languagesData = {
            'pt-BR': pt,
            'en-US': en,
        }
    }
    set setSelectedLanguage(selectedLang) {
        let langIdx = this.supportedLangs.indexOf(selectedLang);
        let pageLang = this.supportedLangs.at(langIdx >= 0 ? langIdx : 1);

        localStorage.setItem('lang', pageLang);
        this.selectedLang = selectedLang;

        this.selectedLangData = this.languagesData[this.selectedLang];
    }

    jsonKeyToElementId(jsonKey) {
        let id = '';

        for(let i = 0; i < jsonKey.length; i++) {
            let char = jsonKey.charAt(i);

            if (!isNaN(char * 1)) {
                id += '-';
            } else if (char === char.toUpperCase()) {
                id += '-';
                char = char.toLowerCase();
            }
            id += char;
        }

        return id;
    }
    renderTexts() {
        for(const [ key, value ] of Object.entries(this.selectedLangData)) {
            if (key === 'title') {
                document.querySelector(key).text = value;
                continue;
            }

            const el = document.querySelector(`#${this.jsonKeyToElementId(key)}`);
            if (typeof value === 'object') {
                for(const [ subKey, subValue ] of Object.entries(value)) {
                    el[subKey] = subValue
                }
            } else {
                if (value.includes('</span>')) {
                    el.innerHTML = value;
                } else {
                    el.textContent = value;
                }
            }
        }
    }
    main() {
        document.documentElement.setAttribute('lang', this.selectedLang);
        this.renderTexts();
    }
}