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
    cvDownload: document.querySelector("[data-cv-download]"),
    heroTitle: document.querySelector("[data-hero-title]"),
    facts: document.querySelector("[data-facts]"),
    aboutText: document.querySelector("[data-about-text]"),
    skills: document.querySelector("[data-skills]"),
    projectSearch: document.querySelector("[data-project-search]"),
    projectFilters: document.querySelector("[data-project-filters]"),
    projects: document.querySelector("[data-projects]"),
    emptyProjects: document.querySelector("[data-empty-projects]"),
    courses: document.querySelector("[data-courses]"),
    experience: document.querySelector("[data-experience]"),
    contactLinks: document.querySelector("[data-contact-links]"),
    year: document.querySelector("[data-year]")
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
    syncCvDownload();
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

  function syncCvDownload() {
    if (!els.cvDownload || !app.cvFiles) return;

    const cvPath = app.cvFiles[state.language] ?? app.cvFiles.en ?? app.cvFiles.sv;
    if (!cvPath) return;

    els.cvDownload.href = cvPath;
    els.cvDownload.setAttribute("download", cvPath.split("/").pop());
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

  function projectDetailsUrl(project) {
    return `project.html?id=${encodeURIComponent(project.id)}`;
  }

  function projectThumbnail(project) {
    return project.thumbnail || project.image || "";
  }

  function projectLinks(project) {
    if (Array.isArray(project.links)) return project.links.filter((link) => link?.url);

    const links = [];
    if (project.githubUrl) links.push({ label: t("github"), url: project.githubUrl });
    if (project.liveUrl) links.push({ label: t("liveDemo"), url: project.liveUrl });
    return links;
  }

  function projectYear(project) {
    const year = Number.parseInt(project.year, 10);
    return Number.isFinite(year) ? year : 0;
  }

  function compareProjectsNewestFirst(a, b) {
    const yearDifference = projectYear(b) - projectYear(a);
    if (yearDifference !== 0) return yearDifference;

    return Number(b.featured) - Number(a.featured);
  }

  function renderProjectImage(project) {
    const thumbnail = projectThumbnail(project);

    if (thumbnail) {
      return `
        <div class="project-media">
          <div class="project-placeholder">${escapeHtml(projectInitials(project))}</div>
          <img src="${escapeHtml(thumbnail)}" alt="${escapeHtml(localized(project.title))} thumbnail" loading="lazy" onerror="this.remove()" />
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
    const sortedProjects = [...app.projects].sort(compareProjectsNewestFirst);
    const filteredProjects = sortedProjects.filter(projectMatches);

    els.projects.innerHTML = filteredProjects
      .map((project) => {
        const links = projectLinks(project);

        return `
          <article class="project-card reveal">
            ${renderProjectImage(project)}
            <div class="project-body">
              <div class="project-meta">
                <span>${escapeHtml(localized(project.category))} / ${escapeHtml(project.year)}</span>
                ${project.featured ? `<span class="featured-badge">${escapeHtml(t("featured"))}</span>` : ""}
              </div>
              <h3>${escapeHtml(localized(project.title))}</h3>
              <p>${escapeHtml(localized(project.summary))}</p>
              <div class="project-tags">
                ${(project.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
              </div>
              <div class="project-actions">
                <a class="text-link" href="${escapeHtml(projectDetailsUrl(project))}">${escapeHtml(t("viewDetails"))} &rarr;</a>
                ${links.map((link) => `<a class="text-link" href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)} &rarr;</a>`).join("")}
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    els.emptyProjects.hidden = filteredProjects.length > 0;
    observeRevealElements();
  }

  function renderCourses() {
    if (!els.courses) return;

    els.courses.innerHTML = app.courses[state.language]
      .map((course) => `
        <article class="course-item reveal">
          <span class="course-mark" aria-hidden="true"></span>
          <span>${escapeHtml(course)}</span>
        </article>
      `)
      .join("");
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
    renderCourses();
    renderExperience();
    renderContactLinks();
    setText("[data-year]", new Date().getFullYear());
    observeRevealElements();
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
