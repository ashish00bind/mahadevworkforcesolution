/**
 * MAHADEV WORK FORCE SOLUTION — MAIN SITE JAVASCRIPT
 * Controls navigation drawer, active link styling, dynamic year, and interactions.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Dynamic Footer Year
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Drawer Navigation
  var menuToggleBtn = document.getElementById('mobile-menu-btn');
  var drawerOverlay = document.getElementById('mobile-drawer');
  var drawerCloseBtn = document.getElementById('drawer-close-btn');
  var drawerContent = document.querySelector('.mobile-drawer-content');

  function openDrawer() {
    if (!drawerOverlay) return;
    drawerOverlay.classList.add('open');
    drawerOverlay.setAttribute('aria-hidden', 'false');
    if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawerOverlay) return;
    drawerOverlay.classList.remove('open');
    drawerOverlay.setAttribute('aria-hidden', 'true');
    if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = drawerOverlay && drawerOverlay.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeDrawer();
    });
  }

  // Click outside drawer content to close
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', function (e) {
      if (e.target === drawerOverlay) {
        closeDrawer();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawerOverlay && drawerOverlay.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close on window resize above tablet breakpoint (768px)
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768 && drawerOverlay && drawerOverlay.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close drawer when any drawer link is clicked
  var drawerLinks = document.querySelectorAll('.drawer-nav-link, .drawer-cta-btn');
  drawerLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeDrawer();
    });
  });

  // 3. Highlight Active Navigation Item based on Current URL
  var currentPath = window.location.pathname.toLowerCase();
  var filename = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  if (filename === '') filename = 'index.html';

  var navLinks = document.querySelectorAll('.nav-link, .drawer-nav-link');
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var linkTarget = href.split('?')[0].split('#')[0].toLowerCase();
    if (
      linkTarget === filename ||
      (filename === 'index.html' && (linkTarget === '/' || linkTarget === './' || linkTarget === 'index.html'))
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
