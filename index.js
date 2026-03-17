// Initialize Smooth Scrolling with Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

// Integrate Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            gsap.fromTo(mobileMenu,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            );
        } else {
            gsap.to(mobileMenu, {
                opacity: 0,
                y: -20,
                duration: 0.2,
                ease: 'power2.in',
                onComplete: () => {
                    mobileMenu.classList.add('hidden');
                }
            });
        }
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
const navBg = document.getElementById('nav-bg');

if (navbar && navBg) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navBg.classList.add('opacity-100');
            navBg.classList.remove('opacity-0');
            navbar.classList.add('shadow-sm');
        } else {
            navBg.classList.add('opacity-0');
            navBg.classList.remove('opacity-100');
            navbar.classList.remove('shadow-sm');
        }
    });

    // Initial check
    if (window.scrollY <= 50) {
        navBg.classList.add('opacity-0');
        navBg.classList.remove('opacity-100');
        navbar.classList.remove('shadow-sm');
    }
}

// Hero Animations
const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

heroTimeline
    .to('.hero-element', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        delay: 0.2
    })
    .to('.hero-metrics', {
        opacity: 1,
        y: 0,
        duration: 1
    }, "-=0.5");

// Parallax Hero BG
gsap.to('.hero-bg-img', {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// About Section Animation
const aboutTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#about",
        start: "top 70%",
    }
});

aboutTl.to('.about-content', {
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out"
}).to('.about-visual', {
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out"
}, "-=0.8");

// Number Counter Animation
gsap.utils.toArray('.stat-counter').forEach(counter => {
    ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        once: true,
        onEnter: () => {
            const target = parseInt(counter.getAttribute('data-target'));
            gsap.to(counter, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: "power2.out",
                onUpdate: function () {
                    counter.innerText = Math.round(this.targets()[0].innerText);
                }
            });
        }
    });
});

// Services Section Animation
gsap.to('.section-header', {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#services",
        start: "top 80%",
    }
});

gsap.to('.service-card', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".service-card",
        start: "top 85%",
    }
});

// Industries Animations
gsap.to('.ind-header', {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#industries",
        start: "top 80%",
    }
});

gsap.to('.ind-card', {
    scale: 1,
    opacity: 1,
    duration: 0.5,
    stagger: 0.1,
    ease: "back.out(1.5)",
    scrollTrigger: {
        trigger: ".ind-card",
        start: "top 85%",
    }
});

// Opportunities Animations
gsap.to('.opp-header', {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#opportunities",
        start: "top 80%",
    }
});

gsap.to('.opp-card', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".opp-card",
        start: "top 85%",
    }
});

gsap.to('.opp-conversion', {
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".opp-conversion",
        start: "top 85%",
    }
});

// Government Schemes Animation
const schemesTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".schemes-content",
        start: "top 75%",
    }
});

schemesTl.to('.schemes-content', {
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out"
}).to('.schemes-visual', {
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    onComplete: () => {
        // Orbit Animation
        const orbitContainer = document.getElementById('regulatory-orbit-container');
        const items = document.querySelectorAll('.orbiting-item');
        const radius = orbitContainer.offsetWidth / 2;

        items.forEach((item, i) => {
            const angle = (i / items.length) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            gsap.set(item, {
                x: x,
                y: y,
                xPercent: -50,
                yPercent: -50,
                left: '50%',
                top: '50%'
            });

            // Rotation animation
            gsap.to(item, {
                duration: 20,
                repeat: -1,
                ease: "none",
                modifiers: {
                    x: gsap.utils.unitize(x => {
                        const newAngle = angle + (parseFloat(gsap.getProperty(item, "rotation") || 0) * Math.PI / 180);
                        return Math.cos(newAngle) * radius;
                    }),
                    y: gsap.utils.unitize(y => {
                        const newAngle = angle + (parseFloat(gsap.getProperty(item, "rotation") || 0) * Math.PI / 180);
                        return Math.sin(newAngle) * radius;
                    })
                }
            });

            // Better approach for orbit: Animate a proxy object or just use a simple timeline
            const orbitTl = gsap.timeline({ repeat: -1 });
            orbitTl.to(item, {
                duration: 40,
                ease: "none",
                motionPath: {
                    path: (function () {
                        const path = [];
                        for (let a = 0; a <= 360; a += 10) {
                            const rad = (a * Math.PI / 180) + angle;
                            path.push({
                                x: Math.cos(rad) * radius,
                                y: Math.sin(rad) * radius
                            });
                        }
                        return path;
                    })(),
                    curviness: 1.5,
                    autoRotate: false
                }
            });
        });

        // Simpler orbit implementation for stability
        gsap.to('#regulatory-orbit-container', {
            rotation: 360,
            duration: 60,
            repeat: -1,
            ease: "none"
        });

        // Counter-rotate items to keep them upright
        gsap.to('.orbiting-item', {
            rotation: -360,
            duration: 60,
            repeat: -1,
            ease: "none"
        });

        // Hover effect on central MSME
        const centralMsme = document.getElementById('central-msme');
        if (centralMsme) {
            centralMsme.addEventListener('mouseenter', () => {
                gsap.to(centralMsme, { scale: 1.1, duration: 0.3, ease: "back.out(2)" });
            });
            centralMsme.addEventListener('mouseleave', () => {
                gsap.to(centralMsme, { scale: 1, duration: 0.3, ease: "power2.out" });
            });
        }
    }
}, "-=0.8");

// Process Timeline Animation
gsap.to('.process-header', {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#process",
        start: "top 80%",
    }
});

// Animate vertical line down
gsap.to('.process-line', {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
        trigger: "#process",
        start: "top 50%",
        end: "bottom 80%",
        scrub: true
    }
});

// Animate process steps staggering in
const processSteps = gsap.utils.toArray('.process-step');
processSteps.forEach((step, i) => {
    gsap.to(step, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: step,
            start: "top 85%",
        }
    });
});

// Case Studies
gsap.to('.cs-header', {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#case-studies",
        start: "top 80%",
    }
});

gsap.from('.cs-slider > div', {
    x: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".cs-slider",
        start: "top 80%",
    }
});

// Blog Grid
gsap.to('.blog-grid', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".blog-grid",
        start: "top 80%",
    }
});

// Contact Form Handling (Formspree AJAX)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
        formStatus.innerText = '';
        formStatus.classList.remove('hidden', 'bg-red-500/20', 'text-red-400', 'bg-brand-500/20', 'text-brand-400');

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.innerText = 'Success! Your enquiry has been sent directly to Mahir.';
                formStatus.classList.add('bg-brand-500/20', 'text-brand-400', 'block');
                formStatus.classList.remove('hidden');
                contactForm.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    formStatus.innerText = data.errors.map(error => error.message).join(", ");
                } else {
                    formStatus.innerText = 'Oops! There was a problem submitting your form.';
                }
                formStatus.classList.add('bg-red-500/20', 'text-red-400', 'block');
                formStatus.classList.remove('hidden');
            }
        } catch (error) {
            formStatus.innerText = 'Oops! There was a problem connecting to the server.';
            formStatus.classList.add('bg-red-500/20', 'text-red-400', 'block');
            formStatus.classList.remove('hidden');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        }
    });
}
