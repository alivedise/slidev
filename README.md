# Slidev Presentations

A repository for hosting multiple Slidev presentations on GitHub Pages.

## Structure

```
presentations/
├── presentation-20250827/
│   └── slides.md
└── [other-presentations]/
    └── slides.md
```

## Adding New Presentations

1. Create a new directory under `presentations/` with your presentation name
2. Add a `slides.md` file with your Slidev content
3. Commit and push - GitHub Actions will automatically build and deploy

## Local Development

```bash
# Install dependencies
pnpm install

# Develop a specific presentation
cd presentations/presentation-20250827
pnpm slidev

# Build all presentations
pnpm run build
```

## Deployment

The repository automatically deploys to GitHub Pages when you push to the main branch. Each presentation will be available at:

```
https://[username].github.io/[repo-name]/[presentation-name]/
```

For example: `https://alivedise.github.io/slidev/presentation-20250827/`