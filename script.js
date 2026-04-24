/**
<<<<<<< HEAD
 * Ignite '26 - Main JavaScript
 * Handles registration, animations, and site interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // --- Registration Form Handling ---
    const regForm = document.querySelector('.register-form');
    const successMsg = document.getElementById('success-message');
    const successText = document.getElementById('success-text');
    const closeBtn = document.getElementById('success-close');

    if (regForm) {
        regForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Collect registration data
            const registrationData = {
                name: document.getElementById('reg-name').value.trim(),
                email: document.getElementById('reg-email').value.trim(),
                campus: document.getElementById('reg-college').value,
                phone: document.getElementById('reg-phone').value.trim(),
                event: document.getElementById('reg-events').value
            };

            // Store in localStorage for the receipt page
            localStorage.setItem('ignite_registration', JSON.stringify(registrationData));

            // Visual feedback before redirect
            const name = registrationData.name;
            if (successText) {
                successText.textContent = `Thank you, ${name}! Redirecting to your receipt...`;
            }
            regForm.style.display = 'none';
            if (successMsg) {
                successMsg.style.display = 'flex';
            }

            // Redirect to receipt page after a short delay
            setTimeout(() => {
                window.location.href = 'receipt.html';
            }, 2000);
        });
    }

    if (closeBtn && regForm && successMsg) {
        closeBtn.addEventListener('click', function () {
            regForm.reset();
            regForm.style.display = 'flex';
            successMsg.style.display = 'none';
        });
    }

    // --- Sponsor Logos Scroll Interaction ---
    const sponsorScroll = document.querySelector('.sponsor-logos-scroll');
    const sponsorSection = document.getElementById('sponsors');
    
    if (sponsorScroll) {
        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;

        // Mouse Drag Events
        sponsorScroll.addEventListener('mousedown', (e) => {
            isDragging = true;
            sponsorScroll.classList.add('dragging');
            startX = e.pageX - sponsorScroll.offsetLeft;
            scrollLeft = sponsorScroll.scrollLeft;
        });

        sponsorScroll.addEventListener('mouseleave', () => {
            isDragging = false;
            sponsorScroll.classList.remove('dragging');
        });

        sponsorScroll.addEventListener('mouseup', () => {
            isDragging = false;
            sponsorScroll.classList.remove('dragging');
        });

        sponsorScroll.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - sponsorScroll.offsetLeft;
            const walk = (x - startX) * 1.5;
            sponsorScroll.scrollLeft = scrollLeft - walk;
        });

        // Touch Interaction
        sponsorScroll.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - sponsorScroll.offsetLeft;
            scrollLeft = sponsorScroll.scrollLeft;
        }, { passive: true });

        sponsorScroll.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - sponsorScroll.offsetLeft;
            const walk = (x - startX) * 1.5;
            sponsorScroll.scrollLeft = scrollLeft - walk;
        }, { passive: true });

        // Scroll-based auto-scroll
        const updateSponsorScrollFromPage = () => {
            if (!sponsorSection || !sponsorScroll) return;
            const rect = sponsorSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Only update when section is in view
            if (rect.top < windowHeight && rect.bottom > 0) {
                const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);
                const maxScroll = sponsorScroll.scrollWidth - sponsorScroll.clientWidth;
                sponsorScroll.scrollLeft = maxScroll * progress;
            }
        };

        window.addEventListener('scroll', updateSponsorScrollFromPage, { passive: true });
        window.addEventListener('resize', updateSponsorScrollFromPage);
        updateSponsorScrollFromPage();
    }

    // --- Smooth Scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navToggle = document.getElementById('nav-toggle');
                if (navToggle && navToggle.checked) {
                    navToggle.checked = false;
                }
            }
        });
    });
=======
 * Ignite '26 - Global Scripts
 * Handles common interactions like navbar toggles
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    // No explicit JS needed for the checkbox toggle itself (handled by CSS)
    // but we can add logic to close the menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.checked = false;
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
>>>>>>> 6c73199b896529b5eb319e36f4121165094447b1
});
