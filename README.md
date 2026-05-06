# Mohamed Almefrej - Live CV

A simple, smart and responsive Live CV built with plain HTML, CSS and JavaScript.

## Features

- Responsive layout for mobile, tablet and desktop
- Swedish / English language switch
- Light / dark mode with saved preference
- Project cards with optional thumbnails
- Dedicated project detail pages with `project.html?id=project-id`
- Optional GitHub, live demo and LinkedIn/article links per project
- Project search and category filters
- Download CV button
- SEO-friendly metadata and favicon
- No framework and no build step required

## File structure

```txt
live-cv-project/
  index.html
  project.html
  style.css
  data.js
  script.js
  project.js
  assets/
    cv/
      Mohamed_Almefrej_CV.pdf
    images/
      favicon.svg
      og-image.svg
    projects/
      project-id/
        thumbnail.png
        screenshot-1.png
        screenshot-2.png
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

Open `data.js` and edit the `projects` array. Each project detail page opens with:

```txt
project.html?id=my-project
```

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
  description: {
    sv: ["Langre svensk beskrivning."],
    en: ["Longer English description."]
  },
  problem: { sv: "Problem...", en: "Problem..." },
  solution: { sv: "Losning...", en: "Solution..." },
  result: { sv: "Resultat...", en: "Result..." },
  role: { sv: "Min roll", en: "My role" },
  technicalDecisions: {
    sv: ["Tekniskt val..."],
    en: ["Technical decision..."]
  },
  learned: {
    sv: ["Lardom..."],
    en: ["Learning..."]
  },
  tags: ["HTML", "CSS", "JavaScript"],
  thumbnail: "assets/projects/my-project/thumbnail.png",
  images: [
    "assets/projects/my-project/thumbnail.png",
    "assets/projects/my-project/screenshot-1.png"
  ],
  links: [
    { label: "GitHub", url: "https://github.com/your-user/your-repo" },
    { label: "Live Demo", url: "https://your-demo-link.com" },
    { label: "LinkedIn", url: "https://linkedin.com/..." }
  ]
}
```

If you do not want a thumbnail, set `thumbnail: ""`.
If you do not want a gallery, set `images: []`.
If you do not want external buttons, set `links: []`.

## How to update project images

Use this convention:

```txt
assets/
  projects/
    project-id/
      thumbnail.png
      screenshot-1.png
      screenshot-2.png
```

Missing image files will fall back to a clean generated visual, so the site will not break while content is in progress.

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

For Cloudflare Pages, deploy the repository as a static site with no build command.
