/**
 * EcoRide - Landing Page Scripts
 * Arquitectura modular y accesible sin variables en el scope global.
 */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Inicialización de módulos
  initNavigation();
  initHeaderScroll();
  initDynamicYear();
  initSmoothScrollFocus();
});

/**
 * Control del Menú Hamburguesa Móvil y Accesibilidad (A11y)
 */
function initNavigation() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const primaryNav = document.getElementById("primary-nav");

  if (!hamburgerBtn || !primaryNav) return;

  // Alterna el estado del menú
  const toggleMenu = () => {
    const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
    const nextState = !isExpanded;

    hamburgerBtn.setAttribute("aria-expanded", String(nextState));
    hamburgerBtn.setAttribute(
      "aria-label",
      nextState ? "Cerrar menú de navegación" : "Abrir menú de navegación"
    );
    primaryNav.classList.toggle("is-open", nextState);
  };

  // Cierra el menú móvil de forma segura
  const closeMenu = () => {
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.setAttribute("aria-label", "Abrir menú de navegación");
    primaryNav.classList.remove("is-open");
  };

  // Evento de clic en botón hamburguesa
  hamburgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Delegación de eventos: cerrar al hacer clic en cualquier enlace dentro del nav
  primaryNav.addEventListener("click", (event) => {
    const targetLink = event.target.closest("a");
    if (targetLink) {
      closeMenu();
    }
  });

  // Cerrar menú al hacer clic fuera del header
  document.addEventListener("click", (event) => {
    const isClickInside = primaryNav.contains(event.target) || hamburgerBtn.contains(event.target);
    if (!isClickInside && primaryNav.classList.contains("is-open")) {
      closeMenu();
    }
  });

  // Accesibilidad: Cerrar menú al pulsar la tecla Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
      closeMenu();
      hamburgerBtn.focus();
    }
  });
}

/**
 * Efecto visual de elevación del Navbar al hacer scroll
 */
function initHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  };

  // Escuchar con soporte pasivo para máximo rendimiento de scroll
  window.addEventListener("scroll", handleScroll, { passive: true });
}

/**
 * Actualización dinámica del año de Copyright
 */
function initDynamicYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Gestión de enfoque para enlaces ancla (A11y Enhancement)
 */
function initSmoothScrollFocus() {
  document.addEventListener("click", (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute("href");
    if (targetId === "#" || targetId === "") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Garantizar que elementos no interactivos reciban foco para lectores de pantalla
      if (!targetElement.hasAttribute("tabindex")) {
        targetElement.setAttribute("tabindex", "-1");
      }
      targetElement.focus({ preventScroll: true });
    }
  });
}
