# Mohamed Almefrej — Live CV

A simple, smart and responsive Live CV built with plain HTML, CSS and JavaScript.

## Features

- Responsive layout for mobile, tablet and desktop
- Swedish / English language switch
- Light / dark mode with saved preference
- Project cards with optional thumbnails
- Optional GitHub and live demo links per project
- Project search and category filters
- Project detail dialog
- Download CV button
- SEO-friendly metadata and favicon
- No framework and no build step required

## File structure

```txt
live-cv-project/
  index.html
  style.css
  data.js
  script.js
  assets/
    cv/
      Mohamed_Almefrej_CV.pdf
    images/
      favicon.svg
      og-image.svg
    projects/
      project-thumbnails.svg
```

## How to run locally

Open `index.html` directly in your browser.

For the most realistic local test, run a small local server:

```bash
python -m http.server 8000
```

Then open:

```txt
http://localhost:8000
```

## How to update projects

Open `data.js` and edit the `projects` array.

Each project supports:

```js
{
  id: "my-project",
  featured: true,
  year: "2026",
  category: { sv: "Webb", en: "Web" },
  title: { sv: "Mitt projekt", en: "My Project" },
  summary: {
    sv: "Kort svensk beskrivning.",
    en: "Short English description."
  },
  details: {
    problem: { sv: "Problem...", en: "Problem..." },
    solution: { sv: "Lösning...", en: "Solution..." },
    result: { sv: "Resultat...", en: "Result..." }
  },
  tags: ["HTML", "CSS", "JavaScript"],
  image: "assets/projects/my-project.png",
  githubUrl: "https://github.com/your-user/your-repo",
  liveUrl: "https://your-demo-link.com"
}
```

If you do not want a thumbnail, set:

```js
image: ""
```

If you do not want a GitHub link, set:

```js
githubUrl: ""
```

If you do not want a live demo link, set:

```js
liveUrl: ""
```

## How to update the CV PDF

Replace this file:

```txt
assets/cv/Mohamed_Almefrej_CV.pdf
```

Keep the same filename if you do not want to update the HTML.

## Deployment options

Good simple options:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

For GitHub Pages, push this folder to a repository and enable Pages from repository settings.
