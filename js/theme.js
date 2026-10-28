/**
 * MAHADEV WORK FORCE SOLUTION — THEME MANAGER
 * Manages light/dark themes, localStorage persistence, and OS preference sync.
 */

(function () {
  'use strict';

  var THEME_KEY = 'mws_theme';

  function getSavedTheme() {
    try {
      var saved = localStorage.getItem(THEME_KEY);
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    } catch (e) {
      return 'dark';
    }
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }

    // Update meta theme-color
    var metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#0B1220' : '#F5F3EE');
    }

    // Update aria-label on toggle buttons
    var toggleBtns = document.querySelectorAll('[data-action="toggle-theme"]');
    toggleBtns.forEach(function (btn) {
      btn.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme');
    });
  }

  function setTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // Storage access might be restricted
    }
    applyTheme(theme);
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || getSavedTheme();
    var next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  // Initial apply
  var initialTheme = getSavedTheme();
  applyTheme(initialTheme);

  // Bind to DOM when ready
  document.addEventListener('DOMContentLoaded', function () {
    var toggleBtns = document.querySelectorAll('[data-action="toggle-theme"]');
    toggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        toggleTheme();
      });
    });

    // Listen for OS system preference changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        try {
          var saved = localStorage.getItem(THEME_KEY);
          if (!saved) {
            applyTheme(e.matches ? 'dark' : 'light');
          }
        } catch (err) {}
      });
    }

    // Listen for cross-tab storage changes
    window.addEventListener('storage', function (e) {
      if (e.key === THEME_KEY && (e.newValue === 'dark' || e.newValue === 'light')) {
        applyTheme(e.newValue);
      }
    });
  });

  // Expose to window for global access
  window.MWSTheme = {
    get: getSavedTheme,
    set: setTheme,
    toggle: toggleTheme,
  };
})();
