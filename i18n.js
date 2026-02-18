// Simple client-side i18n: English (en) and Spanish (es).
const I18N_STRINGS = {
    en: {
        siteTitle: 'Operation Condor Interactive Dataverse',
        intro: 'Welcome to the interactive dataverse for Operation Condor. This site has been developed as an interactive aspect of the plancondor.org website and uses data from site resources. This site is a work in progress and is regularly updated.',
        'nav.victims': 'Victims',
        'nav.justice': 'The Path to Justice',
        'nav.more': 'More (TBC)',
        'victims.title': 'Victims',
        'victims.desc': 'Placeholder for visualisations and text about victims.',
        'justice.title': 'The Path to Justice',
        'justice.desc': 'Placeholder for visualisations and text about justice processes.',
        'more.title': 'More (TBC)',
        'more.desc': 'Additional visualisations and content will be added here.'
    },
    es: {
        siteTitle: 'Dataverso interactivo de la Operación Cóndor',
        intro: 'Bienvenido al dataverso interactivo del Plan Cóndor. Este sitio se ha desarrollado como un aspecto interactivo del sitio plancondor.org y utiliza datos de recursos del sitio. El sitio está en desarrollo y se actualiza regularmente.',
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
document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('siteLang') || 'en';
    // Attach handlers
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
    });
    applyTranslations(lang);

    // Collapsible sections: restore saved state and attach toggles
    document.querySelectorAll('.page-section').forEach(section => {
        const id = section.id;
        const key = `collapsed_${id}`;
        const collapsed = localStorage.getItem(key) === 'true';
        if (collapsed) section.classList.add('collapsed');
        const btn = section.querySelector('.collapse-btn');
        const body = section.querySelector('.section-body');
        if (btn && body) {
            btn.setAttribute('aria-expanded', String(!section.classList.contains('collapsed')));
            btn.addEventListener('click', () => {
                const isCollapsed = section.classList.toggle('collapsed');
                btn.setAttribute('aria-expanded', String(!isCollapsed));
                localStorage.setItem(key, String(isCollapsed));
            });
        }
    });
});

// Expose for debugging
window.i18n = { setLanguage, applyTranslations, strings: I18N_STRINGS };
