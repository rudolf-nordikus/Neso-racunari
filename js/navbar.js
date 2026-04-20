(function () {
  var navbar = document.querySelector('.newnavbar');
  if (!navbar) return;

  // Set transition directly — prevents Webflow scripts from overriding CSS
  navbar.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

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
  var navbarHeight = navbar.offsetHeight;

  function updateVisibility() {
    var currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > navbarHeight) {
      // Scrolling down — hide fast
      navbar.style.transitionDuration = '220ms';
      navbar.classList.add('is-hidden');
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up — show smooth
      navbar.style.transitionDuration = '300ms';
      navbar.classList.remove('is-hidden');
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

  // Run once on load
  updateShadow();

  // ---- Dropdown ----
  document.querySelectorAll('.nav-dropdown__toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var dropdown = this.closest('.nav-dropdown');
      var isOpen = dropdown.classList.contains('is-open');
      document.querySelectorAll('.nav-dropdown').forEach(function (d) {
        d.classList.remove('is-open');
      });
      if (!isOpen) dropdown.classList.add('is-open');
    });
  });

  document.addEventListener('click', function () {
    document.querySelectorAll('.nav-dropdown').forEach(function (d) {
      d.classList.remove('is-open');
    });
  });

  document.querySelectorAll('.nav-dropdown__link').forEach(function (link) {
    link.addEventListener('click', function () {
      var btn = document.querySelector('.w-nav-button');
      if (btn && getComputedStyle(btn).display !== 'none') btn.click();
    });
  });
})();
