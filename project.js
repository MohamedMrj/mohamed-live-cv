"use strict";

(function initProjectPage() {
  const app = window.LIVE_CV;

  if (!app) {
    console.error("LIVE_CV data is missing. Make sure data.js is loaded before project.js.");
    return;
  }

  const storageKeys = {
    language: "live-cv-language",
    theme: "live-cv-theme"
  };

  const state = {
    language: getInitialLanguage(),
    theme: getInitialTheme()
  };

  const els = {
    html: document.documentElement,
    body: document.body,
    page: document.querySelector("[data-project-page]"),
    menuToggle: document.querySelector("[data-menu-toggle]"),
    navPanel: document.querySelector("[data-nav-panel]"),
    languageToggle: document.querySelector("[data-language-toggle]"),
    themeToggle: document.querySelector("[data-theme-toggle]"),
    themeLabel: document.querySelector("[data-theme-label]"),
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
    if (Array.isArray(value)) return value;
    if (value && typeof value === "object") return value[state.language] ?? value.en ?? value.sv ?? "";
    return value ?? "";
  }

  function localizedArray(value) {
    const localizedValue = localized(value);
    if (Array.isArray(localizedValue)) return localizedValue.filter(Boolean);
    return localizedValue ? [localizedValue] : [];
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function titleMarkup(value) {
    function chunkLongWord(word) {
      if (word.length <= 13) return word;

      const chunks = [];
      for (let index = 0; index < word.length; index += 11) {
        chunks.push(word.slice(index, index + 11));
      }
      return chunks.join("<wbr>");
    }

    return escapeHtml(value)
      .split(/(\s+)/)
      .map((part) => {
        if (!part.trim()) return part;
        return part.split("-").map(chunkLongWord).join("-<wbr>");
      })
      .join("");
  }

  function getProjectId() {
    return new URLSearchParams(window.location.search).get("id") || "";
  }

  function getProject() {
    const id = getProjectId();
    return app.projects.find((project) => project.id === id);
  }

  function projectInitials(project) {
    return localized(project.title)
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("") || "P";
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

  function setI18nText() {
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      node.textContent = t(key);
    });

    els.html.lang = state.language;
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

  function imageMarkup(project, image, className) {
    const title = localized(project.title);

    if (!image) {
      return `
        <div class="${className} project-detail-fallback" aria-hidden="true">
          <div class="project-placeholder">${escapeHtml(projectInitials(project))}</div>
        </div>
      `;
    }

    return `
      <div class="${className}">
        <div class="project-placeholder" aria-hidden="true">${escapeHtml(projectInitials(project))}</div>
        <img src="${escapeHtml(image)}" alt="${escapeHtml(title)}" loading="lazy" onerror="this.remove()" />
      </div>
    `;
  }

  function sectionMarkup(title, body) {
    if (Array.isArray(body)) {
      if (!body.length) return "";
      return `
        <section class="project-detail-section">
          <h2>${escapeHtml(title)}</h2>
          <ul class="detail-list">
            ${body.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </section>
      `;
    }

    if (!body) return "";
    return `
      <section class="project-detail-section">
        <h2>${escapeHtml(title)}</h2>
        <p class="muted">${escapeHtml(body)}</p>
      </section>
    `;
  }

  function renderProject(project) {
    const title = localized(project.title);
    const summary = localized(project.summary);
    const links = projectLinks(project);
    const images = Array.isArray(project.images) ? project.images.filter(Boolean) : [];
    const mainImage = projectThumbnail(project) || images[0] || "";

    document.title = `${title} | ${t("brandName")}`;

    els.page.innerHTML = `
      <section class="project-detail section-pad">
        <div class="container">
          <a class="back-link" href="index.html#projects">${escapeHtml(t("backToProjects"))}</a>

          <div class="project-detail-hero">
            <div class="project-detail-copy">
              <p class="section-kicker">${escapeHtml(localized(project.category))} / ${escapeHtml(project.year)}</p>
              <h1>${titleMarkup(title)}</h1>
              <p class="hero-text">${escapeHtml(summary)}</p>

              ${links.length ? `
                <div class="project-detail-actions">
                  ${links.map((link) => `<a class="button" href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`).join("")}
                </div>
              ` : ""}
            </div>

            ${imageMarkup(project, mainImage, "project-detail-media")}
          </div>

          <div class="project-detail-grid">
            <aside class="project-detail-meta card">
              <h2>${escapeHtml(t("projectMeta"))}</h2>
              <dl>
                <div><dt>${escapeHtml(t("projectId"))}</dt><dd>${escapeHtml(project.id)}</dd></div>
                <div><dt>${escapeHtml(t("yearAndCategory"))}</dt><dd>${escapeHtml(project.year)} / ${escapeHtml(localized(project.category))}</dd></div>
                <div><dt>${escapeHtml(t("role"))}</dt><dd>${escapeHtml(localized(project.role))}</dd></div>
              </dl>
              <div class="project-tags">
                ${(project.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
              </div>
            </aside>

            <div class="project-detail-content">
              ${localizedArray(project.description).map((paragraph) => `<p class="detail-lead">${escapeHtml(paragraph)}</p>`).join("")}
              ${sectionMarkup(t("problem"), localized(project.problem))}
              ${sectionMarkup(t("solution"), localized(project.solution))}
              ${sectionMarkup(t("result"), localized(project.result))}
              ${sectionMarkup(t("technicalDecisions"), localizedArray(project.technicalDecisions))}
              ${sectionMarkup(t("learned"), localizedArray(project.learned))}
            </div>
          </div>

          ${images.length ? `
            <section class="project-gallery">
              <h2>${escapeHtml(t("gallery"))}</h2>
              <div class="gallery-grid">
                ${images.map((image) => imageMarkup(project, image, "gallery-item")).join("")}
              </div>
            </section>
          ` : ""}
        </div>
      </section>
    `;
  }

  function renderNotFound() {
    document.title = `${t("projectNotFound")} | ${t("brandName")}`;
    els.page.innerHTML = `
      <section class="section-pad">
        <div class="container not-found-card card">
          <p class="section-kicker">${escapeHtml(t("details"))}</p>
          <h1>${escapeHtml(t("projectNotFound"))}</h1>
          <p class="muted">${escapeHtml(t("projectNotFoundText"))}</p>
          <a class="button primary" href="index.html#projects">${escapeHtml(t("backToProjects"))}</a>
        </div>
      </section>
    `;
  }

  function renderAll() {
    setI18nText();
    const project = getProject();
    if (project) renderProject(project);
    else renderNotFound();
    els.year.textContent = new Date().getFullYear();
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
      renderAll();
    });

    els.themeToggle.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      applyTheme();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") toggleMenu(true);
    });
  }

  function boot() {
    applyTheme();
    setupEvents();
    renderAll();
  }

  boot();
})();
