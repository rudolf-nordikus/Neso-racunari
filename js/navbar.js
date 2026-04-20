window.addEventListener('load', function () {
  var navbar = document.querySelector('.newnavbar');
  if (!navbar) return;

  var EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
  var HIDE_DURATION = '220ms';
  var SHOW_DURATION = '300ms';

  // Set transition after all scripts (including Webflow) have run
  navbar.style.transition = 'transform ' + SHOW_DURATION + ' ' + EASING + ', box-shadow 0.3s ease';

  // ---- Scroll shadow ----
  function updateShadow() {
    if (window.scrollY > 40) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }

  // ---- Hide on scroll down, show on scroll up ----
  var lastScrollY = window.scrollY;
  var ticking = false;
  var hidden = false;

  function updateVisibility() {
    var currentScrollY = window.scrollY;
    var navbarHeight = navbar.offsetHeight;

    if (currentScrollY > lastScrollY && currentScrollY > navbarHeight) {
      if (!hidden) {
        navbar.style.transition = 'transform ' + HIDE_DURATION + ' ' + EASING + ', box-shadow 0.3s ease';
        navbar.style.transform = 'translateY(-100%)';
        navbar.classList.add('is-hidden');
        hidden = true;
      }
    } else if (currentScrollY < lastScrollY) {
      if (hidden) {
        navbar.style.transition = 'transform ' + SHOW_DURATION + ' ' + EASING + ', box-shadow 0.3s ease';
        navbar.style.transform = 'translateY(0)';
        navbar.classList.remove('is-hidden');
        hidden = false;
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    updateShadow();
    if (!ticking) {
      window.requestAnimationFrame(updateVisibility);
      ticking = true;
    }
  }, { passive: true });

  updateShadow();
});
