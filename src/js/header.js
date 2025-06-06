import { getCurrentTheme, onThemeChange } from './theme.js';

export function headerChange() {
    const sections = {
        tecnologias: document.getElementById('tecnologias'),
        impactados: document.getElementById('impactados'),
        beneficios: document.getElementById('beneficios'),
        solucao: document.getElementById('solucao'),
        quiz: document.getElementById('quiz'),
    };

    const nav = document.querySelector('header');
    const linkNavs = document.querySelectorAll('.linkNav');
    const logoImg = document.getElementById('logo');
    const sun = document.getElementById('clear');
    const moon = document.getElementById('night');
    const rain = document.getElementById('rain');

    function updateIcon(element, name, isnight) {
        if (element) {
            element.src = `src/assets/imgs/${name}-${isnight ? 'night' : 'clear'}.png`;
        }
    }

    function setHeaderStyle({ bgClass = '', textnight = false }) {
        nav.classList.remove('glassBg', 'clearBg', 'nightBg');
        if (bgClass) nav.classList.add(bgClass);

        updateIcon(logoImg, 'logo', textnight);
        updateIcon(sun, 'sun', textnight);
        updateIcon(moon, 'moon', textnight);
        updateIcon(rain, 'rain', textnight);

        linkNavs.forEach(link => link.classList.toggle('nightText', textnight));
    }

    function handleScroll() {
        const techTop = sections.tecnologias.getBoundingClientRect().top;

        const theme = getCurrentTheme();
        const isnightTheme = theme === 'night' || theme === 'rain';
        const themedBgClass = isnightTheme ? 'nightBg' : 'clearBg';

        if (window.scrollY === 0) {
            setHeaderStyle({});
        } else {
            // Inverte a lógica do texto para melhor contraste
            setHeaderStyle({ bgClass: themedBgClass, textnight: !isnightTheme });
        }
    }

    window.addEventListener('scroll', handleScroll);
    onThemeChange(handleScroll);
    handleScroll();
}