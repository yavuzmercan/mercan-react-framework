# Mercan React Framework

[![npm](https://img.shields.io/npm/v/@yavuzmercan/ui.svg?style=flat-square)](https://www.npmjs.com/package/@yavuzmercan/ui)
[![CI](https://github.com/yavuzmercan/mercan-react-framework/actions/workflows/ci.yml/badge.svg)](https://github.com/yavuzmercan/mercan-react-framework/actions/workflows/ci.yml)
[![Docs](https://img.shields.io/badge/docs-live-3b6cff?style=flat-square)](https://yavuzmercan.github.io/mercan-react-framework/)
[![license](https://img.shields.io/npm/l/@yavuzmercan/ui.svg?style=flat-square)](./LICENSE)

Theme-aware, i18n-ready React UI framework for the web — published as a single package: **[`@yavuzmercan/ui`](https://www.npmjs.com/package/@yavuzmercan/ui)**.

> 70+ components · 88 icons · 55 hooks · theme/i18n/Google Fonts in one install.

## 📖 [Live documentation → yavuzmercan.github.io/mercan-react-framework](https://yavuzmercan.github.io/mercan-react-framework/)

Live demos for every component, theme customizer, copy-paste examples, complete API reference.

---

This repository is the monorepo that develops the package, hosts the showcase apps, and runs CI/release. **If you just want to use the framework**, install from npm:

```bash
npm install @yavuzmercan/ui
```

…and read the [live docs](https://yavuzmercan.github.io/mercan-react-framework/) or the package [README](./packages/ui/README.md).

The rest of this document is for **contributors and maintainers**.

---

## Workspace layout

```
mercan-react-framework/
├── packages/
│   └── ui/              # @yavuzmercan/ui — the published package
│       ├── src/
│       │   ├── core/    # theme, i18n, hooks, utils
│       │   ├── icons/   # 88 SVG icons + createIcon helper
│       │   ├── components/  # 70+ UI components
│       │   ├── styles.css   # single bundled stylesheet
│       │   └── index.ts     # barrel re-export
│       ├── tsup.config.ts
│       └── vitest.config.ts
├── apps/
│   ├── sample-web/      # Vite showcase consuming the workspace package
│   └── docs/            # Storybook-like documentation app
├── .changeset/          # pending Changesets entries
├── .github/
│   ├── workflows/
│   │   ├── ci.yml       # PR/push: typecheck + test + build
│   │   └── release.yml  # main: open Version PR or publish to npm
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── dependabot.yml
└── tsconfig.base.json
```

## Getting started

```bash
git clone https://github.com/yavuzmercan/mercan-react-framework.git
cd mercan-react-framework
npm install
npm run dev          # Sample app:  http://localhost:5173
npm run docs         # Docs app:    http://localhost:5174
```

`npm install` runs the package's `prepare` script, which builds `packages/ui/dist/`. The apps consume the built output via the workspace symlink, so the workspace works the same way an end-user install would.

If you change library code, run a watch build in another terminal so the apps see updates:

```bash
npm run dev --workspace packages/ui   # tsup --watch
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the sample-web Vite app |
| `npm run docs` | Start the docs Vite app |
| `npm run build:packages` | Build `@yavuzmercan/ui` (ESM + CJS + d.ts + CSS) |
| `npm run build` | Build everything (packages + apps) |
| `npm test` | Run vitest test suite (47 tests) |
| `npm run typecheck` | TypeScript project-references build |
| `npm run changeset` | Create a new changeset entry |
| `npm run version` | Apply pending changesets — bumps version, updates CHANGELOG |
| `npm run release` | Build + `changeset publish` (manual local publish) |

## Tech stack

- **Build:** [tsup](https://tsup.egoist.dev/) (ESM + CJS + .d.ts)
- **Test:** [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) + jsdom
- **Apps:** [Vite](https://vitejs.dev/) + React 18
- **Versioning:** [Changesets](https://github.com/changesets/changesets)
- **CI:** GitHub Actions (test + auto-release)
- **Bot updates:** Dependabot (weekly, grouped)

## Contributing

1. Fork + clone
2. `git checkout -b feature/your-thing`
3. Code your change
4. `npm test && npm run typecheck`
5. **Create a changeset:** `npm run changeset`
   - Pick `@yavuzmercan/ui`
   - Bump type: `patch` (fix), `minor` (new feature), `major` (breaking)
   - Write a short user-facing description
6. Commit `.changeset/*.md` + your code
7. Open a PR

The PR template guides you through the rest. Every PR runs CI (typecheck + tests + build).

## Releasing

Two flows are supported:

### CI-driven (preferred)
- Push to `main` with a `.changeset/*.md` file
- CI bot opens a "Version Packages" PR — review, merge
- CI bot then publishes to npm and creates a GitHub Release

### Manual
- `npm run changeset` → `npm run version` → `npm run release`

Full details: [RELEASING.md](./RELEASING.md).

For CI publishing to work, two GitHub secrets/settings are needed once:
- **`NPM_TOKEN`** secret in repo settings (npm Automation token)
- Repo Settings → Actions → General → **Workflow permissions: Read and write** + **Allow GitHub Actions to create and approve pull requests**

## Project status

Pre-1.0 (`0.x`). Minor bumps may include breaking changes.

## License

MIT © Yavuz Mercan

## Links

- 📖 [Live documentation](https://yavuzmercan.github.io/mercan-react-framework/)
- 📦 [npm package](https://www.npmjs.com/package/@yavuzmercan/ui)
- 📋 [CHANGELOG](./packages/ui/CHANGELOG.md)
- 🚀 [Release process](./RELEASING.md)
- 🐛 [Issues](https://github.com/yavuzmercan/mercan-react-framework/issues)
