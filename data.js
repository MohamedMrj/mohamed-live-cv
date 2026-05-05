"use strict";

window.LIVE_CV = {
  defaultLanguage: "sv",
  availableLanguages: ["sv", "en"],

  content: {
    sv: {
      brandName: "Mohamed Almefrej",
      navAbout: "Om mig",
      navSkills: "Skills",
      navProjects: "Projekt",
      navExperience: "Erfarenhet",
      navContact: "Kontakt",
      heroEyebrow: "Tillgänglig för spännande byggprojekt",
      heroTitle: "Jag bygger <strong>system, automation och plattformar</strong>.",
      heroText: "Software Engineer / Data Platform Engineer med fokus på att skapa robusta, skalbara och smarta lösningar med Python, JavaScript, SQL, Microsoft Fabric, integrationer och automatiserade flöden.",
      viewProjects: "Se projekt",
      downloadCv: "Ladda ner CV",
      profileName: "Mohamed Almefrej",
      profileRole: "Software Engineer / Systemutvecklare",
      aboutKicker: "Om mig",
      aboutTitle: "En byggarprofil med software engineering i centrum.",
      skillsKicker: "Verktygslåda",
      skillsTitle: "Skills grupperade efter hur jag använder dem.",
      skillsSubtitle: "En tydlig översikt istället för en lång ostrukturerad lista.",
      projectsKicker: "Projekt",
      projectsTitle: "Utvalda saker jag har byggt.",
      projectsSubtitle: "Filtrera, sök och öppna detaljer. Projekt kan ha thumbnails, GitHub-länkar och live demo-länkar.",
      searchLabel: "Sök projekt",
      searchPlaceholder: "Sök projekt, teknik eller kategori...",
      allProjects: "Alla",
      featured: "Utvalt",
      readMore: "Läs mer",
      github: "GitHub",
      liveDemo: "Live demo",
      details: "Detaljer",
      problem: "Problem",
      solution: "Lösning",
      result: "Resultat",
      noProjects: "Inga projekt matchar filtret.",
      experienceKicker: "Erfarenhet",
      experienceTitle: "En kort tidslinje fokuserad på påverkan.",
      contactKicker: "Kontakt",
      contactTitle: "Vill du prata om system, automation eller en roll?",
      contactText: "Det enklaste sättet att nå mig är via email eller LinkedIn.",
      footerText: "Byggd med HTML, CSS och JavaScript.",
      backToTop: "Till toppen",
      darkMode: "Mörkt",
      lightMode: "Ljust",
      switchToEnglish: "English"
    },

    en: {
      brandName: "Mohamed Almefrej",
      navAbout: "About",
      navSkills: "Skills",
      navProjects: "Projects",
      navExperience: "Experience",
      navContact: "Contact",
      heroEyebrow: "Available for interesting building projects",
      heroTitle: "I build <strong>systems, automation and platforms</strong>.",
      heroText: "Software Engineer / Data Platform Engineer focused on building robust, scalable and smart solutions with Python, JavaScript, SQL, Microsoft Fabric, integrations and automated workflows.",
      viewProjects: "View projects",
      downloadCv: "Download CV",
      profileName: "Mohamed Almefrej",
      profileRole: "Software Engineer / System Developer",
      aboutKicker: "About",
      aboutTitle: "A builder profile with software engineering at the center.",
      skillsKicker: "Toolbox",
      skillsTitle: "Skills grouped by how I use them.",
      skillsSubtitle: "A clear overview instead of a long, unstructured list.",
      projectsKicker: "Projects",
      projectsTitle: "Selected work and things I have built.",
      projectsSubtitle: "Filter, search and open details. Projects can include thumbnails, GitHub links and live demo links.",
      searchLabel: "Search projects",
      searchPlaceholder: "Search projects, technology or category...",
      allProjects: "All",
      featured: "Featured",
      readMore: "Read more",
      github: "GitHub",
      liveDemo: "Live demo",
      details: "Details",
      problem: "Problem",
      solution: "Solution",
      result: "Result",
      noProjects: "No projects match the current filter.",
      experienceKicker: "Experience",
      experienceTitle: "A concise timeline focused on impact.",
      contactKicker: "Contact",
      contactTitle: "Want to talk about systems, automation or a role?",
      contactText: "The easiest way to reach me is by email or LinkedIn.",
      footerText: "Built with HTML, CSS and JavaScript.",
      backToTop: "Back to top",
      darkMode: "Dark",
      lightMode: "Light",
      switchToEnglish: "Svenska"
    }
  },

  facts: {
    sv: [
      ["Plats", "Norrköping, Sverige"],
      ["Fokus", "Bygga saker"],
      ["Domän", "Dataintensiva system"],
      ["Språk", "Svenska / Engelska / Arabiska"]
    ],
    en: [
      ["Location", "Norrköping, Sweden"],
      ["Focus", "Building things"],
      ["Domain", "Data-intensive systems"],
      ["Languages", "Swedish / English / Arabic"]
    ]
  },

  about: {
    sv: [
      "Jag är en systemutvecklare som gillar att bygga lösningar från idé till fungerande system. Min styrka är att kombinera programmering, automation, dataplattformar och verksamhetsförståelse för att skapa lösningar som är enkla att använda och möjliga att vidareutveckla.",
      "Jag arbetar gärna nära komplexa problem: integrationer mellan system, metadata-driven logik, pipelines, API:er, datamodellering och verktyg som gör vardagen lättare för andra.",
      "Min riktning är tydlig: jag vill bygga robusta system, smart automation och skalbara plattformar – inte bara konsumera verktyg, utan skapa lösningar som andra kan använda."
    ],
    en: [
      "I am a system developer who enjoys building solutions from idea to working system. My strength is combining programming, automation, data platforms and business understanding to create solutions that are easy to use and possible to evolve over time.",
      "I like working close to complex problems: system integrations, metadata-driven logic, pipelines, APIs, data modeling and tools that make everyday work easier for others.",
      "My direction is clear: I want to build robust systems, smart automation and scalable platforms – not just consume tools, but create solutions that others can use."
    ]
  },

  skills: {
    sv: [
      {
        group: "Software Engineering",
        items: ["Python", "JavaScript", "HTML", "CSS", "SQL", "Git", "System Design"]
      },
      {
        group: "Data & Plattformar",
        items: ["Microsoft Fabric", "PySpark", "SparkSQL", "Delta Lake", "ETL/ELT", "Power BI"]
      },
      {
        group: "Automation & Integration",
        items: ["API-integrationer", "Pipelines", "Metadata-driven design", "Monitorering", "Felhantering"]
      }
    ],
    en: [
      {
        group: "Software Engineering",
        items: ["Python", "JavaScript", "HTML", "CSS", "SQL", "Git", "System Design"]
      },
      {
        group: "Data & Platforms",
        items: ["Microsoft Fabric", "PySpark", "SparkSQL", "Delta Lake", "ETL/ELT", "Power BI"]
      },
      {
        group: "Automation & Integration",
        items: ["API integrations", "Pipelines", "Metadata-driven design", "Monitoring", "Error handling"]
      }
    ]
  },

  projects: [
    {
      id: "metadata-driven-etl-framework",
      featured: true,
      year: "2025–2026",
      category: { sv: "Plattform", en: "Platform" },
      title: { sv: "Metadata-driven ETL Framework", en: "Metadata-driven ETL Framework" },
      summary: {
        sv: "Ett ramverk för att styra ingestion, transformation, felhantering och orkestrering via metadata i Microsoft Fabric.",
        en: "A framework for controlling ingestion, transformation, error handling and orchestration through metadata in Microsoft Fabric."
      },
      details: {
        problem: {
          sv: "Många dataflöden behöver köras på ett konsekvent sätt utan hårdkodning, med tydlig spårbarhet och felhantering.",
          en: "Many data flows need to run consistently without hardcoding, with clear traceability and error handling."
        },
        solution: {
          sv: "Byggde metadata-driven logik med TaskGroup, Task och TaskItem där körningar styrs via metadata och exekveras i PySpark/Fabric.",
          en: "Built metadata-driven logic with TaskGroup, Task and TaskItem where executions are controlled by metadata and executed in PySpark/Fabric."
        },
        result: {
          sv: "Mer återanvändbara flöden, bättre monitorering och enklare vidareutveckling av plattformen.",
          en: "More reusable workflows, better monitoring and easier platform evolution."
        }
      },
      tags: ["Python", "PySpark", "Microsoft Fabric", "SQL", "Delta Lake"],
      image: "assets/projects/etl-framework.svg",
      githubUrl: "",
      liveUrl: ""
    },
    {
      id: "live-cv-website",
      featured: true,
      year: "2026",
      category: { sv: "Webb", en: "Web" },
      title: { sv: "Live CV Website", en: "Live CV Website" },
      summary: {
        sv: "En responsiv personlig CV-sida byggd med HTML, CSS och JavaScript med projekt, språkbyte och CV-download.",
        en: "A responsive personal CV website built with HTML, CSS and JavaScript with projects, language switch and CV download."
      },
      details: {
        problem: {
          sv: "En LinkedIn-profil är ofta för statisk och visar inte projekt på ett tillräckligt kontrollerat sätt.",
          en: "A LinkedIn profile is often too static and does not showcase projects with enough control."
        },
        solution: {
          sv: "Byggde en statisk men smart portfolio med data-driven rendering, filter, sök, dark/light mode och två språk.",
          en: "Built a static but smart portfolio with data-driven rendering, filters, search, dark/light mode and two languages."
        },
        result: {
          sv: "En lättförvaltad live-CV som kan växa med fler projekt utan att layouten behöver byggas om.",
          en: "An easy-to-maintain live CV that can grow with more projects without redesigning the layout."
        }
      },
      tags: ["HTML", "CSS", "JavaScript", "Responsive UI"],
      image: "assets/projects/live-cv.svg",
      githubUrl: "",
      liveUrl: ""
    },
    {
      id: "power-bi-metadata-catalog",
      featured: false,
      year: "2025",
      category: { sv: "Automation", en: "Automation" },
      title: { sv: "Power BI Metadata Catalog", en: "Power BI Metadata Catalog" },
      summary: {
        sv: "Automatiserad insamling av metadata för workspaces, semantic models, tabeller, kolumner, relationer och behörigheter.",
        en: "Automated metadata collection for workspaces, semantic models, tables, columns, relationships and permissions."
      },
      details: {
        problem: {
          sv: "Organisationer behöver förstå vilka rapporter, modeller och beroenden som finns i Power BI-miljön.",
          en: "Organizations need to understand which reports, models and dependencies exist in their Power BI environment."
        },
        solution: {
          sv: "Använde API:er och Python-baserad insamling för att strukturera metadata i en analysbar modell.",
          en: "Used APIs and Python-based collection to structure metadata into an analyzable model."
        },
        result: {
          sv: "Bättre överblick över rapportmiljön och enklare styrning av innehåll och behörigheter.",
          en: "Better overview of the reporting environment and easier governance of content and permissions."
        }
      },
      tags: ["Python", "Power BI REST API", "Automation", "Metadata"],
      image: "assets/projects/metadata-catalog.svg",
      githubUrl: "",
      liveUrl: ""
    },
    {
      id: "api-ingestion-notebook",
      featured: false,
      year: "2026",
      category: { sv: "Integration", en: "Integration" },
      title: { sv: "API Ingestion Notebook", en: "API Ingestion Notebook" },
      summary: {
        sv: "En återanvändbar notebook-struktur för autentisering, API-anrop, felsökning och lagring till lakehouse.",
        en: "A reusable notebook structure for authentication, API calls, diagnostics and storing data in a lakehouse."
      },
      details: {
        problem: {
          sv: "API-inläsningar blir snabbt svåra att felsöka om autentisering, parametrar, paging och felhantering blandas ihop.",
          en: "API ingestion quickly becomes hard to debug when authentication, parameters, paging and error handling are mixed together."
        },
        solution: {
          sv: "Delade upp token-hantering, endpoint-konfiguration, request-logik och lagring i tydliga block.",
          en: "Separated token handling, endpoint configuration, request logic and persistence into clear blocks."
        },
        result: {
          sv: "En tydligare bas för nya API-flöden och enklare felsökning när endpoints beter sig oväntat.",
          en: "A clearer base for new API flows and easier debugging when endpoints behave unexpectedly."
        }
      },
      tags: ["Python", "API", "OAuth2", "Fabric"],
      image: "",
      githubUrl: "",
      liveUrl: ""
    }
  ],

  experience: {
    sv: [
      {
        role: "Systemutvecklare / Data Platform Engineer",
        company: "Norrköpings kommun",
        period: "Aug 2024 – Nuvarande",
        bullets: [
          "Bygger och vidareutvecklar tekniska lösningar för dataplattformar, integrationer och analys.",
          "Utvecklar metadata-drivna flöden för ingestion, transformation och orkestrering i Microsoft Fabric.",
          "Arbetar med Python, PySpark, SparkSQL, SQL, Delta Lake, pipelines och Power BI.",
          "Fokuserar på skalbarhet, spårbarhet, datakvalitet, felhantering och underhållbarhet."
        ]
      },
      {
        role: "API Developer",
        company: "Addima",
        period: "Sep 2023 – Dec 2023",
        bullets: [
          "Byggde API-integrationer mellan Zoho och andra molnlösningar.",
          "Arbetade med automatiserade arbetsflöden och systemintegrationer."
        ]
      }
    ],
    en: [
      {
        role: "System Developer / Data Platform Engineer",
        company: "Norrköpings kommun",
        period: "Aug 2024 – Present",
        bullets: [
          "Build and improve technical solutions for data platforms, integrations and analytics.",
          "Develop metadata-driven workflows for ingestion, transformation and orchestration in Microsoft Fabric.",
          "Work with Python, PySpark, SparkSQL, SQL, Delta Lake, pipelines and Power BI.",
          "Focus on scalability, traceability, data quality, error handling and maintainability."
        ]
      },
      {
        role: "API Developer",
        company: "Addima",
        period: "Sep 2023 – Dec 2023",
        bullets: [
          "Built API integrations between Zoho and other cloud solutions.",
          "Worked with automated workflows and system integrations."
        ]
      }
    ]
  },

  contactLinks: [
    { key: "email", label: "Email", value: "Email", href: "mailto:mohamed.al-mefrej@hotmail.com" },
    { key: "linkedin", label: "LinkedIn", value: "LinkedIn", href: "https://www.linkedin.com/in/mohamed-almefrej" },
    { key: "github", label: "GitHub", value: "GitHub", href: "https://github.com/MohamedMrj" },
    { key: "website", label: "Website", value: "Website", href: "https://mohamedalmefrej.com" }
  ]
};
