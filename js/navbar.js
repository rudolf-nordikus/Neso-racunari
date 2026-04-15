(function () {
  // ---- Scroll shadow ----
  var navbar = document.querySelector('.newnavbar');
  if (navbar) {
    var onScroll = function () {
      if (window.scrollY > 40) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

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

  // Zatvori dropdown klikom van
  document.addEventListener('click', function () {
    document.querySelectorAll('.nav-dropdown').forEach(function (d) {
      d.classList.remove('is-open');
    });
  });

  // Zatvori mobilni meni klikom na dropdown link
  document.querySelectorAll('.nav-dropdown__link').forEach(function (link) {
    link.addEventListener('click', function () {
      var btn = document.querySelector('.w-nav-button');
      if (btn && getComputedStyle(btn).display !== 'none') btn.click();
    });
  });
})();
