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

// --- 1. ODHALOVÁNÍ PRVKŮ (Opakované) ---
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            // PŘIDÁNO: Jakmile prvek zmizí z obrazovky, sebereme mu třídu active.
            // Až k němu scroluješ znovu, animace proběhne nanovo.
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));


// --- 2. EFEKT PSACÍHO STROJE ---
const words = ["Programátor", "AI nadšenec", "Student Informatiky"]; // Slova, co se budou střídat
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeTarget = document.getElementById("typewriter");

function typeEffect() {
    if (!typeTarget) return; // Pojistka

    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typeTarget.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeTarget.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Rychlost psaní vs. mazání
    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Jak dlouho slovo zůstane napsané, než se začne mazat
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Posun na další slovo
        typeSpeed = 500; // Pauza před začátkem psaní nového slova
    }

    setTimeout(typeEffect, typeSpeed);
}

typeEffect(); // Spuštění psacího stroje

// --- 3. VYPISOVÁNÍ NADPISŮ PŘI SCROLLOVÁNÍ (Opakované) ---
const scrollTypeElements = document.querySelectorAll('.scroll-type');

const typeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (!entry.target.classList.contains('typed')) {
                entry.target.classList.add('typed');
                const textToType = entry.target.getAttribute('data-text');
                entry.target.textContent = ''; // Vymažeme aktuální text
                
                let i = 0;
                // Uložíme interval, abychom ho mohli zastavit
                const typingInterval = setInterval(() => {
                    if (i < textToType.length) {
                        entry.target.textContent += textToType.charAt(i);
                        i++;
                    } else {
                        clearInterval(typingInterval);
                    }
                }, 80);
                entry.target.dataset.intervalId = typingInterval;
            }
        } else {
            // PŘIDÁNO: Reset celého psacího stroje při odscrolování
            entry.target.classList.remove('typed');
            entry.target.textContent = ''; // Smaže text, aby se mohl napsat znovu
            clearInterval(entry.target.dataset.intervalId); // Zastaví případné nedopsané psaní
        }
    });
}, { threshold: 0.5 });

scrollTypeElements.forEach(el => typeObserver.observe(el));