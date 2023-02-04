(() => {
    const DARK = 'dark';
    const LIGHT = 'light';

    const icon = {
        [LIGHT]: '☀️',
        [DARK]: '🌒',
    };

    const button = document.createElement('button');
    button.className = 'switcher';
    button.id = 'theme-toggle';

    document.getElementsByTagName('header')[0].append(button);

    const switcher = document.querySelector('.switcher');

    switcher.addEventListener('click', () => {
        const currentMode = document.documentElement.getAttribute('data-theme');
        const isDark = currentMode === DARK;
        const theme = isDark ? LIGHT : DARK;
        document.documentElement.setAttribute('data-theme', theme);
        window.localStorage.setItem('theme', theme);
        document.getElementById('theme-toggle').innerHTML =
            icon[theme === DARK ? LIGHT : DARK];
    });

    const mediaTheme =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
            ? DARK
            : LIGHT;

    const theme = window.localStorage.getItem('theme') ?? mediaTheme;

    if (!window.localStorage.getItem('theme')) {
        window.localStorage.setItem('theme', theme);
    }

    document.documentElement.setAttribute('data-theme', theme);
    switcher.innerHTML = theme === LIGHT ? icon[DARK] : icon[LIGHT];
})();
