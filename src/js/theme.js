let currentTheme = 'clear';
let themeChangeListeners = [];

const cards = document.querySelectorAll('.tecnologiaCard')
const wokwi = document.getElementById('wokwi');
const github = document.getElementById('github');

export function toggleTheme() {
    const updateTheme = (bgColor, color, theme) => {
        document.body.style.backgroundColor = bgColor;
        document.body.style.color = color;
        currentTheme = theme
        const isclearOrrain = theme === 'clear' || theme === 'rain';

        github.src = `src/assets/svgs/${isclearOrrain ? 'night' : 'clear'}-github.svg`;
        wokwi.src = `src/assets/imgs/wokwi-${isclearOrrain ? 'night' : 'clear'}.png`;

        const hoverClass = `cardHover${isclearOrrain ? 'night' : 'clear'}`;

        cards.forEach(c => {
            c.classList.remove('lightCardBorder', 'nightCardBorder', 'rainCardBorder');
            c.classList.add(`${theme}CardBorder`);

                c.classList.remove('cardHoverclear', 'cardHovernight');
                c.classList.add(hoverClass);
            
        });

        themeChangeListeners.forEach(cb => cb(theme));
    };

    document.getElementById("clearTheme").addEventListener("click", function () {
        updateTheme("#ffffff", "#000000", "clear");
    });

    document.getElementById("nightTheme").addEventListener("click", function () {
        updateTheme("#121212", "#f0f0f0", "night");
    });

    document.getElementById("rainTheme").addEventListener("click", function () {
        updateTheme("#b0b0b0", "#2a2a2a", "rain");
    });
}

export function getCurrentTheme() {
    return currentTheme;
}

export function onThemeChange(callback) {
    themeChangeListeners.push(callback);
}