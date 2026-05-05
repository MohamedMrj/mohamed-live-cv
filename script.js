"use strict";

(function initLiveCv() {
  const app = window.LIVE_CV;

  if (!app) {
    console.error("LIVE_CV data is missing. Make sure data.js is loaded before script.js.");
    return;
  }

  const storageKeys = {
    language: "live-cv-language",
    theme: "live-cv-theme"
  };

  const state = {
    language: getInitialLanguage(),
    theme: getInitialTheme(),
    activeCategory: null,
    query: ""
  };

  const els = {
    html: document.documentElement,
    body: document.body,
    menuToggle: document.querySelector("[data-menu-toggle]"),
    navPanel: document.querySelector("[data-nav-panel]"),
    languageToggle: document.querySelector("[data-language-toggle]"),
    themeToggle: document.querySelector("[data-theme-toggle]"),
    themeLabel: document.querySelector("[data-theme-label]"),
    heroTitle: document.querySelector("[data-hero-title]"),
    facts: document.querySelector("[data-facts]"),
    aboutText: document.querySelector("[data-about-text]"),
    skills: document.querySelector("[data-skills]"),
    projectSearch: document.querySelector("[data-project-search]"),
    projectFilters: document.querySelector("[data-project-filters]"),
    projects: document.querySelector("[data-projects]"),
    emptyProjects: document.querySelector("[data-empty-projects]"),
    experience: document.querySelector("[data-experience]"),
    contactLinks: document.querySelector("[data-contact-links]"),
    year: document.querySelector("[data-year]"),
    dialog: document.querySelector("[data-project-dialog]"),
    dialogContent: document.querySelector("[data-dialog-content]"),
    dialogClose: document.querySelector("[data-dialog-close]")
  };

  function getInitialLanguage() {
    const saved = localStorage.getItem(storageKeys.language);
    if (app.availableLanguages.includes(saved)) return saved;

    const browserLanguage = navigator.language?.toLowerCase().startsWith("sv") ? "sv" : "en";
    return app.availableLanguages.includes(browserLanguage) ? browserLanguage : app.defaultLanguage;
  }

  function getInitialTheme() {
    const saved = localStorage.getItem(storageKeys.theme);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function t(key) {
    return app.content[state.language][key] ?? app.content.en[key] ?? key;
  }

  function localized(value) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value[state.language] ?? value.en ?? value.sv ?? "";
    }
    return value ?? "";
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value;
    });
  }

  function renderI18nText() {
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      node.textContent = t(key);
    });

    document.title = t("brandName") + " | Live CV";
    els.html.lang = state.language;
    els.heroTitle.innerHTML = t("heroTitle");
    els.projectSearch.placeholder = t("searchPlaceholder");
    els.projectSearch.setAttribute("aria-label", t("searchLabel"));
    els.emptyProjects.textContent = t("noProjects");
    els.languageToggle.textContent = t("switchToEnglish");
    els.menuToggle.setAttribute("aria-label", state.language === "sv" ? "Öppna meny" : "Open menu");
    syncThemeLabel();
  }

  function applyTheme() {
    els.html.dataset.theme = state.theme;
    localStorage.setItem(storageKeys.theme, state.theme);
    syncThemeLabel();
  }

  function syncThemeLabel() {
    if (!els.themeLabel) return;
    els.themeLabel.textContent = state.theme === "dark" ? t("lightMode") : t("darkMode");
    els.themeToggle.setAttribute(
      "aria-label",
      state.theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  function renderFacts() {
    els.facts.innerHTML = app.facts[state.language]
      .map(([label, value]) => `
        <div class="fact">
          <span>${escapeHtml(label)}</span>
          <span>${escapeHtml(value)}</span>
        </div>
      `)
      .join("");
  }

  function renderAbout() {
    els.aboutText.innerHTML = app.about[state.language]
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join("");
  }

  function renderSkills() {
    els.skills.innerHTML = app.skills[state.language]
      .map((group) => `
        <article class="skill-group reveal">
          <h3>${escapeHtml(group.group)}</h3>
          <div class="skill-list">
            ${group.items.map((item) => `<span class="skill-tag">${escapeHtml(item)}</span>`).join("")}
          </div>
        </article>
      `)
      .join("");
  }

  function categories() {
    const categoriesFromProjects = app.projects.map((project) => localized(project.category));
    return [t("allProjects"), ...new Set(categoriesFromProjects)];
  }

  function renderProjectFilters() {
    const allCategories = categories();

    if (!state.activeCategory || !allCategories.includes(state.activeCategory)) {
      state.activeCategory = t("allProjects");
    }

    els.projectFilters.innerHTML = allCategories
      .map((category) => `
        <button class="category-button ${category === state.activeCategory ? "active" : ""}" type="button" data-category="${escapeHtml(category)}">
          ${escapeHtml(category)}
        </button>
      `)
      .join("");
  }

  function searchableProjectText(project) {
    return [
      localized(project.title),
      localized(project.summary),
      localized(project.category),
      project.year,
      ...(project.tags || [])
    ].join(" ").toLowerCase();
  }

  function projectMatches(project) {
    const selectedAll = state.activeCategory === t("allProjects");
    const categoryMatch = selectedAll || localized(project.category) === state.activeCategory;
    const queryMatch = searchableProjectText(project).includes(state.query.trim().toLowerCase());
    return categoryMatch && queryMatch;
  }

  function projectInitials(project) {
    return localized(project.title)
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("") || "P";
  }

  function renderProjectImage(project) {
    if (project.image) {
      return `
        <div class="project-media">
          <img src="${escapeHtml(project.image)}" alt="${escapeHtml(localized(project.title))} thumbnail" loading="lazy" />
        </div>
      `;
    }

    return `
      <div class="project-media" aria-hidden="true">
        <div class="project-placeholder">${escapeHtml(projectInitials(project))}</div>
      </div>
    `;
  }

  function renderProjects() {
    const sortedProjects = [...app.projects].sort((a, b) => Number(b.featured) - Number(a.featured));
    const filteredProjects = sortedProjects.filter(projectMatches);

    els.projects.innerHTML = filteredProjects
      .map((project) => `
        <article class="project-card reveal">
          ${renderProjectImage(project)}
          <div class="project-body">
            <div class="project-meta">
              <span>${escapeHtml(localized(project.category))} · ${escapeHtml(project.year)}</span>
              ${project.featured ? `<span class="featured-badge">${escapeHtml(t("featured"))}</span>` : ""}
            </div>
            <h3>${escapeHtml(localized(project.title))}</h3>
            <p>${escapeHtml(localized(project.summary))}</p>
            <div class="project-tags">
              ${(project.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
            </div>
            <div class="project-actions">
              <button class="text-link" type="button" data-project-id="${escapeHtml(project.id)}">${escapeHtml(t("readMore"))} →</button>
              ${project.githubUrl ? `<a class="text-link" href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("github"))} →</a>` : ""}
              ${project.liveUrl ? `<a class="text-link" href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("liveDemo"))} →</a>` : ""}
            </div>
          </div>
        </article>
      `)
      .join("");

    els.emptyProjects.hidden = filteredProjects.length > 0;
    observeRevealElements();
  }

  function renderExperience() {
    els.experience.innerHTML = app.experience[state.language]
      .map((item) => `
        <article class="timeline-item reveal">
          <div class="timeline-top">
            <div>
              <h3>${escapeHtml(item.role)}</h3>
              <p class="muted">${escapeHtml(item.company)}</p>
            </div>
            <span class="timeline-period">${escapeHtml(item.period)}</span>
          </div>
          <ul>
            ${item.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}
          </ul>
        </article>
      `)
      .join("");
  }

  function renderContactLinks() {
    els.contactLinks.innerHTML = app.contactLinks
      .map((link) => `
        <a class="button" href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">${escapeHtml(link.value)}</a>
      `)
      .join("");
  }

  function renderAll() {
    renderI18nText();
    renderFacts();
    renderAbout();
    renderSkills();
    renderProjectFilters();
    renderProjects();
    renderExperience();
    renderContactLinks();
    setText("[data-year]", new Date().getFullYear());
    observeRevealElements();
  }

  function openProjectDialog(projectId) {
    const project = app.projects.find((item) => item.id === projectId);
    if (!project) return;

    const imageMarkup = project.image
      ? `<div class="dialog-hero"><img src="${escapeHtml(project.image)}" alt="${escapeHtml(localized(project.title))} thumbnail" /></div>`
      : `<div class="dialog-hero"><div class="project-placeholder">${escapeHtml(projectInitials(project))}</div></div>`;

    els.dialogContent.innerHTML = `
      ${imageMarkup}
      <div class="dialog-body">
        <p class="section-kicker">${escapeHtml(localized(project.category))} · ${escapeHtml(project.year)}</p>
        <h2 id="dialog-title">${escapeHtml(localized(project.title))}</h2>
        <p class="muted">${escapeHtml(localized(project.summary))}</p>

        <div class="project-tags">
          ${(project.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>

        <div class="dialog-section">
          <strong>${escapeHtml(t("problem"))}</strong>
          <p class="muted">${escapeHtml(localized(project.details.problem))}</p>
        </div>
        <div class="dialog-section">
          <strong>${escapeHtml(t("solution"))}</strong>
          <p class="muted">${escapeHtml(localized(project.details.solution))}</p>
        </div>
        <div class="dialog-section">
          <strong>${escapeHtml(t("result"))}</strong>
          <p class="muted">${escapeHtml(localized(project.details.result))}</p>
        </div>

        <div class="dialog-links">
          ${project.githubUrl ? `<a class="button" href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("github"))}</a>` : ""}
          ${project.liveUrl ? `<a class="button" href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("liveDemo"))}</a>` : ""}
        </div>
      </div>
    `;

    if (typeof els.dialog.showModal === "function") {
      els.dialog.showModal();
    } else {
      els.dialog.setAttribute("open", "");
    }
  }

  function closeProjectDialog() {
    if (typeof els.dialog.close === "function") {
      els.dialog.close();
    } else {
      els.dialog.removeAttribute("open");
    }
  }

  function toggleMenu(forceClose = false) {
    const shouldOpen = forceClose ? false : !els.body.classList.contains("menu-open");
    els.body.classList.toggle("menu-open", shouldOpen);
    els.menuToggle.setAttribute("aria-expanded", String(shouldOpen));
  }

  function setupEvents() {
    els.menuToggle.addEventListener("click", () => toggleMenu());

    els.navPanel.addEventListener("click", (event) => {
      if (event.target.closest("a")) toggleMenu(true);
    });

    els.languageToggle.addEventListener("click", () => {
      state.language = state.language === "sv" ? "en" : "sv";
      localStorage.setItem(storageKeys.language, state.language);
      state.activeCategory = null;
      renderAll();
    });

    els.themeToggle.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      applyTheme();
    });

    els.projectSearch.addEventListener("input", (event) => {
      state.query = event.target.value;
      renderProjects();
    });

    els.projectFilters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      state.activeCategory = button.getAttribute("data-category");
      renderProjectFilters();
      renderProjects();
    });

    els.projects.addEventListener("click", (event) => {
      const button = event.target.closest("[data-project-id]");
      if (!button) return;
      openProjectDialog(button.getAttribute("data-project-id"));
    });

    els.dialogClose.addEventListener("click", closeProjectDialog);

    els.dialog.addEventListener("click", (event) => {
      if (event.target === els.dialog) closeProjectDialog();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") toggleMenu(true);
    });
  }

  function observeRevealElements() {
    const revealElements = document.querySelectorAll(".reveal:not(.visible)");

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));
  }

  function boot() {
    applyTheme();
    setupEvents();
    renderAll();
  }

  boot();
})();
