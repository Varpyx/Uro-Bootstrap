const navBar = document.getElementById('mainNav');
const dotLinks = document.querySelectorAll('.dot-link'); // Najdeme všechny tečky

const observerOptions = { threshold: 0.6 };

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const theme = entry.target.getAttribute('data-bg');
            const sectionId = entry.target.getAttribute('id');
            
            // 1. Změna barvy pozadí a menu (to už máš)
            if (theme === 'dark') {
                document.body.classList.add('bg-dark-mode');
                document.body.classList.remove('bg-light-mode');
                navBar.classList.replace('navbar-light', 'navbar-dark');
                navBar.classList.replace('bg-light', 'bg-dark');
            } else {
                document.body.classList.add('bg-light-mode');
                document.body.classList.remove('bg-dark-mode');
                navBar.classList.replace('navbar-dark', 'navbar-light');
                navBar.classList.replace('bg-dark', 'bg-light');
            }

            // 2. AKTIVACE TEČEK: Odstraníme 'active' ze všech a dáme ji té správné
            dotLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    scrollObserver.observe(section);
});