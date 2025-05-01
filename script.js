// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Préchargeur
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Animer les éléments de la page d'accueil après le chargement
            animateHeroElements();
        }, 2000);
    });
    
    // Curseur personnalisé
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Ajouter un léger délai pour l'outline
        setTimeout(function() {
            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Effet de grossissement sur les liens et boutons
    const links = document.querySelectorAll('a, button, .social-icon, .theme-toggle');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'transparent';
            cursorOutline.style.background = 'rgba(108, 99, 255, 0.2)';
        });
        
        link.addEventListener('mouseleave', function() {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'var(--primary-color)';
            cursorOutline.style.background = 'transparent';
        });
    });
    
    // Masquer le curseur sur les appareils tactiles
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorOutline.style.display = 'none';
    }
    
    // Navigation et menu burger
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const header = document.querySelector('.header');
    
    burger.addEventListener('click', function() {
        // Basculer la navigation
        nav.classList.toggle('nav-active');
        
        // Animation des liens
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Animation du burger
        burger.classList.toggle('toggle');
    });
    
    // Changer le style du header au défilement
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Effet de parallaxe pour l'arrière-plan du héro
    document.addEventListener('mousemove', function(e) {
        const layers = document.querySelectorAll('.layer');
        const x = e.clientX;
        const y = e.clientY;
        
        layers.forEach(layer => {
            const depth = layer.getAttribute('data-depth');
            const moveX = (x * depth / 10);
            const moveY = (y * depth / 10);
            
            layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Animation de l'effet de machine à écrire
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    const textArray = ['Développeur Web', 'Designer UI/UX', 'Créateur Digital', 'Étudiant Passionné'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            }
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            }
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) {
                textArrayIndex = 0;
            }
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    if (textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }
    
    // Animation des éléments du héro
    function animateHeroElements() {
        gsap.from('.hero-text h1', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
        
        gsap.from('.typewriter', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.3
        });
        
        gsap.from('.hero-description', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.6
        });
        
        gsap.from('.hero-buttons', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.9
        });
        
        gsap.from('.social-icons', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 1.2
        });
        
        gsap.from('.profile-image-container', {
            duration: 1.5,
            scale: 0.8,
            opacity: 0,
            ease: 'elastic.out(1, 0.3)',
            delay: 0.5
        });
        
        gsap.from('.shape', {
            duration: 1,
            scale: 0,
            opacity: 0,
            ease: 'back.out(1.7)',
            delay: 1.5,
            stagger: 0.2
        });
        
        gsap.from('.scroll-indicator', {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: 'power3.out',
            delay: 2
        });
    }
    
    // Animations au défilement avec GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation de la section À propos
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });
    
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });
    
    gsap.from('.detail-item', {
        scrollTrigger: {
            trigger: '.about-details',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Animation des compétences
    gsap.from('.skill-card', {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        onComplete: animateSkillBars
    });
    
    // Fonction pour animer les barres de compétences
    function animateSkillBars() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        skillLevels.forEach(level => {
            const width = level.style.width;
            level.style.setProperty('--skill-percent', width);
            level.style.width = '0';
            
            setTimeout(() => {
                level.classList.add('animate');
            }, 200);
        });
    }
    
    // Observer pour déclencher l'animation lorsque la section est visible
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
    
    // Animer les barres de compétences lors du changement d'onglet
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(animateSkillBars, 100);
        });
    });
    
    // Animation des projets
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Filtrage des projets
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Supprimer la classe active de tous les boutons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    gsap.to(card, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: 'power3.out',
                        onStart: function() {
                            card.style.display = 'block';
                        }
                    });
                } else if (card.getAttribute('data-category') === filter) {
                    gsap.to(card, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: 'power3.out',
                        onStart: function() {
                            card.style.display = 'block';
                        }
                    });
                } else {
                    gsap.to(card, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power3.out',
                        onComplete: function() {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
    
    // Onglets de compétences
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Supprimer la classe active de tous les boutons et panneaux
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Afficher le panneau correspondant
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
             
            // Animer les barres de compétences dans l'onglet actif
            animateSkillBars();
        });
    });
    
    // Basculement du thème clair/sombre
    const themeToggle = document.querySelector('.theme-toggle');
    
    themeToggle.addEventListener('click', function() {
        document.body.setAttribute('data-theme', 
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
        );
        
        // Changer l'icône
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-moon')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        
        // Sauvegarder la préférence dans le localStorage
        localStorage.setItem('theme', document.body.getAttribute('data-theme'));
    });
    
    // Vérifier la préférence de thème enregistrée
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        
        // Mettre à jour l'icône
        const icon = themeToggle.querySelector('i');
        if (savedTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    // Animation de l'effet glitch sur le titre
    const glitchText = document.querySelector('.glitch-text');
    
    if (glitchText) {
        setInterval(() => {
            glitchText.classList.add('glitch-active');
            
            setTimeout(() => {
                glitchText.classList.remove('glitch-active');
            }, 200);
        }, 5000);
    }
    
    // Animation des formes flottantes
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        gsap.to(shape, {
            y: -20,
            x: index % 2 === 0 ? 10 : -10,
            rotation: index % 2 === 0 ? 15 : -15,
            duration: 2 + index,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
    
    // Validation du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation simple
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (!input.value.trim() && input.hasAttribute('required')) {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Créer un message d'erreur s'il n'existe pas déjà
                    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('div');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'Ce champ est requis';
                        input.parentNode.insertBefore(errorMsg, input.nextSibling);
                    }
                } else if (input.type === 'email' && input.value.trim()) {
                    // Validation simple de l'email
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value)) {
                        isValid = false;
                        input.classList.add('error');
                        
                        if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                            const errorMsg = document.createElement('div');
                            errorMsg.classList.add('error-message');
                            errorMsg.textContent = 'Veuillez entrer une adresse email valide';
                            input.parentNode.insertBefore(errorMsg, input.nextSibling);
                        }
                    }
                } else {
                    input.classList.remove('error');
                    if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                        input.nextElementSibling.remove();
                    }
                }
            });
            
            if (isValid) {
                // Simuler l'envoi du formulaire
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Envoi en cours...';
                submitBtn.disabled = true;
                
                // Animation de succès
                setTimeout(() => {
                    contactForm.innerHTML = `
                        <div class="success-message">
                            <div class="success-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h3>Message envoyé avec succès!</h3>
                            <p>Merci de m'avoir contacté. Je vous répondrai dans les plus brefs délais.</p>
                        </div>
                    `;
                }, 1500);
            }
        });
        
        // Réinitialiser les erreurs lors de la saisie
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                if (this.nextElementSibling && this.nextElementSibling.classList.contains('error-message')) {
                    this.nextElementSibling.remove();
                }
            });
        });
    }
    
    // Animation de défilement fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
    
    // Animation des nombres dans les statistiques
    const stats = document.querySelectorAll('.stat-number');
    
    if (stats.length > 0) {
        gsap.from(stats, {
            scrollTrigger: {
                trigger: '.stats-container',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            textContent: 0,
            duration: 2,
            ease: 'power1.inOut',
            snap: { textContent: 1 },
            stagger: 0.2,
            onUpdate: function() {
                this.targets().forEach(target => {
                    const value = Math.round(target.textContent);
                    target.textContent = value + (target.dataset.suffix || '');
                });
            }
        });
    }
    
    // Animation de la souris de défilement
    gsap.to('.wheel', {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'sine.inOut'
    });
    
    // Effet de parallaxe au défilement
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.2;
            element.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
    
    // Animation des témoignages
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.classList.add('active');
            } else {
                testimonial.classList.remove('active');
            }
        });
    }
    
    if (testimonials.length > 0) {
        // Afficher le premier témoignage
        showTestimonial(0);
        
        // Changer automatiquement de témoignage
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
        
        // Navigation des témoignages
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
            
            nextBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }
    }
    
    // Effet de révélation des images au survol
    const projectImages = document.querySelectorAll('.project-image');
    
    projectImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.classList.add('reveal');
        });
        
        image.addEventListener('mouseleave', function() {
            this.classList.remove('reveal');
        });
    });
    
    // Animation des particules de fond (si présentes)
    const particlesContainer = document.querySelector('.particles-container');
    
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Position et taille aléatoires
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Animation aléatoire
            const duration = Math.random() * 20 + 10;
            particle.style.animation = `float ${duration}s linear infinite`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
});