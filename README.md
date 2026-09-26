# The Institute of Almost Superintelligence

A little garden for very big questions. An independent, lighthearted art website at https://altman.si with seven discoverable AI papers, a persistent field notebook, and a very slow snail race.

The haystack drags sideways; a library spine wobbles and pulls out; the greenhouse plant uproots; the duck panics three times before revealing its book; and a telescope opens a constellation field with a clickable book. Original field-book and snail discoveries remain. Touch and keyboard alternatives are supported. On narrow screens, the illustrated garden scrolls horizontally to preserve its scale.

## Run locally

No build step or runtime dependencies. Serve this directory with `python3 -m http.server 4173` and visit http://localhost:4173.

## Deploy

GitHub Pages publishes `main` from the repository root. `CNAME` configures `altman.si`. Apex DNS A records: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153. Optional `www` CNAME: `boovines.github.io`.

## Edit

- `index.html`: original SVG garden and page structure
- `style.css`: responsive layout, texture, and reduced-motion support
- `app.js`: curated paper data, discovery interactions, local-storage notebook

Paper links point to original arXiv abstracts. Discovery progress stays in the visitor's browser. No analytics, accounts, remote fonts, or backend.

Visual inspiration: Bao To (https://www.baothiento.com/). All garden artwork here is original. This project is not affiliated with Sam Altman, OpenAI, or any AI laboratory.
