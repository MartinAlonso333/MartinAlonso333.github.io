# Franco Martín Alonso — Professional Portfolio

Single-page personal portfolio for Franco Martín Alonso, a Computer Engineering
student at FIUBA (University of Buenos Aires) looking for a backend internship or
first role. The site presents the profile, skills, education, featured projects and
contact information, and is fully bilingual (English/Spanish) with light/dark theming.

The project is compiled as a **100% static site** and published to GitHub Pages.

## Tech stack

- **Next.js 16** (App Router, `output: "export"`) with **React 19**
- **TypeScript** in `strict` mode
- **Tailwind CSS v4** with semantic color tokens (`src/app/globals.css`)
- No tests framework, no state/UI/i18n libraries — the site relies on a small custom
  language provider and a theme store to keep the client JavaScript minimal
- Dependencies are pinned to exact versions (no `^`/`~`) and locked with
  `package-lock.json`

## Requirements

- Node.js **20 LTS** (or newer)
- npm

## Scripts

| Script              | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Start the development server at `http://localhost:3000` |
| `npm run build`     | Build the static site into `out/`                     |
| `npm start`         | Serve the built `out/` folder locally (`serve out`)   |
| `npm run lint`      | Run ESLint                                            |
| `npm run typecheck` | Run `tsc --noEmit`                                    |

## Project structure

```text
.github/workflows/deploy.yml   GitHub Pages deployment workflow
public/                        Static assets (favicon, profile photo, CV PDF)
src/
├── app/
│   ├── layout.tsx             <html lang>, metadata, anti-flash theme script, providers
│   ├── page.tsx               Section composition (about, skills, education, projects, contact)
│   └── globals.css            Tailwind import, color tokens, dark variant
├── components/
│   ├── Header.tsx             Sticky navigation + language/theme toggles
│   ├── Hero.tsx               Profile, photo reservation and CV button
│   ├── Skills.tsx             Skills grouped by category
│   ├── Education.tsx          Academic and complementary education
│   ├── Projects.tsx           Featured projects list
│   ├── ProjectCard.tsx        Single project with repositories
│   ├── Contact.tsx            Email (selectable + copy button), GitHub, LinkedIn reservation
│   ├── LanguageProvider.tsx   Client island: language context (`useLanguage`)
│   ├── LanguageToggle.tsx     Client island: switch language
│   └── ThemeToggle.tsx        Client island: switch light/dark theme
├── content/
│   ├── portfolio.ts           SINGLE SOURCE OF TRUTH for bilingual content
│   └── ui.ts                  Bilingual interface strings (nav, labels, metadata)
├── types/content.ts           Content model interfaces (the compile-time contract)
└── lib/
    ├── i18n.ts                Language constants and `pick` helper
    ├── theme.ts               Theme constants and resolution helper
    └── content.ts             Derived labels (project status, private repository)
next.config.ts                 `output: "export"`, `images.unoptimized`
```

## Editing content

All content lives in **`src/content/portfolio.ts`**. Components only read from it, so
editing or adding content never requires touching the presentation logic. The file is
typed by `src/types/content.ts`, and `npm run build` fails if the data does not match
the contract.

Everything readable is either:

- a `LocalizedText` — `{ es: string; en: string }` — both languages are mandatory, or
- a plain `string` for proper nouns, technologies and email/username values that are
  not translated.

Common edits:

- **Profile**: update `profile` (`fullName`, `professionalTitle`, `summary`, `location`,
  `languages`). `summary` paragraphs are separated by a blank line (`\n\n`).
- **Skills**: edit the `skills` array. Each category has a localized `name` and a list of
  `skills`; technology names are plain strings, while a phrase can be a `LocalizedText`
  (for example the "Methodology" category).
- **Education**: edit `education` (`program`, `institution`, `status`, `type`).
- **Projects**: add or edit items in `projects`. Each project has a `status`
  (`"in-progress"` or `"completed"`) and a `repositories` list. A repository is either
  `visibility: "public"` with a `url` (rendered as a button), `visibility: "public"`
  without a `url` (pending, no link), or `visibility: "private"` (shows a "Private
  repository" label). To publish a pending repository, just add its `url`.
- **Contact**: edit `contact`. Set `available: false` to reserve a channel without a
  broken link. The email is rendered as selectable text with a copy button; a `url` is
  not used for it.
- **Deferred assets** (photo, CV): set `available: true` and place the file in `public/`
  (`public/foto.jpg`, `public/cv.pdf`). While `available` is `false`, the components show
  an accessible placeholder and the CV button stays disabled.

### Language and theme

- The site is pre-rendered in **English (`lang="en"`)** by default; visitors can switch
  to Spanish instantly with the header toggle, and the choice is stored in
  `localStorage`. Interface strings live in `src/content/ui.ts`.
- Light/dark theme respects the system preference, can be toggled manually, persists in
  `localStorage`, and is applied without a flash thanks to an inline script in
  `layout.tsx`.

## Deployment

The site is deployed to GitHub Pages via `.github/workflows/deploy.yml`, which runs on
every push to the `main` branch:

1. `actions/checkout`
2. Node.js 20 with npm caching (`actions/setup-node`)
3. `npm ci`
4. `npm run build` (produces `out/`)
5. `actions/upload-pages-artifact` with `path: out`
6. `actions/deploy-pages`

**One-time repository setup**: in **Settings → Pages**, set **Build and deployment →
Source** to **GitHub Actions**. No secrets or extra credentials are required.

Because this is a user site served at the domain root (`https://martinalonso333.github.io`),
`next.config.ts` intentionally defines **no `basePath` and no `assetPrefix`**; the built
assets are referenced from the root (`/_next/...`).

## Notes

- No third-party fonts, icons or scripts: SVG icons are inline and the site uses the
  system font stack.
- The only client-side JavaScript is the language and theme handling; every other
  component is statically rendered.
- Accessibility target: WCAG 2.1 AA (semantic HTML, keyboard operability, visible focus,
  sufficient contrast).
