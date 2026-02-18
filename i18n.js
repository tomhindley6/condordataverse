// Simple client-side i18n: English (en) and Spanish (es).
const I18N_STRINGS = {
    en: {
        siteTitle: 'Operation Condor Interactive Dataverse',
        intro: 'Welcome to the interactive dataverse for Operation Condor. This site has been developed as an interactive aspect of the plancondor.org website and uses data from site resources. This site is a work in progress and is regularly updated.',
        'nav.victims': 'Victims',
        'nav.justice': 'The path to justice',
        'nav.more': 'More (TBC)',
        'victims.title': 'Victims',
        'victims.desc': 'Placeholder for visualisations and text about victims.',
        'justice.title': 'The path to justice',
        'justice.desc': 'Placeholder for visualisations and text about justice processes.',
        'more.title': 'More (TBC)',
        'more.desc': 'Additional visualisations and content will be added here.'
    },
    es: {
        siteTitle: 'Dataverso interactivo de la Operación Cóndor',
        intro: 'Bienvenido al dataverso interactivo de la Operación Cóndor. Este sitio se ha desarrollado como un aspecto interactivo del sitio plancondor.org y utiliza datos de recursos del sitio. El sitio está en desarrollo y se actualiza regularmente.',
        'nav.victims': 'Víctimas',
        'nav.justice': 'El camino hacia la justicia',
        'nav.more': 'Más (por confirmar)',
        'victims.title': 'Víctimas',
        'victims.desc': 'Espacio reservado para visualizaciones y texto sobre las víctimas.',
        'justice.title': 'El camino hacia la justicia',
        'justice.desc': 'Espacio reservado para visualizaciones y texto sobre los procesos de justicia.',
        'more.title': 'Más (por confirmar)',
        'more.desc': 'Aquí se añadirán visualizaciones y contenido adicional.'
    }
};

function applyTranslations(lang) {
    const strings = I18N_STRINGS[lang] || I18N_STRINGS.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (strings[key]) el.textContent = strings[key];
    });

    // Set Flourish `data-src` attributes for current language before Flourish script runs
    document.querySelectorAll('.flourish-embed').forEach(el => {
        const srcKey = el.getAttribute(`data-src-${lang}`) || el.getAttribute('data-src-en');
        if (srcKey) el.setAttribute('data-src', srcKey);
    });

    // Update active language button styling
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

function setLanguage(lang) {
    localStorage.setItem('siteLang', lang);
    // Reload so third-party embeds initialise with selected data-src
    location.reload();
}

/* THEME HANDLING */
function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
        root.classList.add('dark');
    } else if (theme === 'light') {
        root.classList.remove('dark');
    } else if (theme === 'system') {
        // follow system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', prefersDark);
    }
    // Update toggle button appearance
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = document.documentElement.classList.contains('dark') ? '🌙' : '☀️';
}

function setTheme(theme) {
    localStorage.setItem('siteTheme', theme);
    applyTheme(theme);
}

document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('siteLang') || 'en';
    // Attach handlers
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
    });

    // Theme init
    const savedTheme = localStorage.getItem('siteTheme') || 'system';
    applyTheme(savedTheme);
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            setTheme(next);
        });
    }

    applyTranslations(lang);
});

// Expose for debugging
window.i18n = { setLanguage, applyTranslations, strings: I18N_STRINGS };
