# Coffee Solutions — React + TypeScript

A responsive recreation of the supplied coffee shop UI reference using Vite, React, TypeScript, and plain CSS.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project.
2. Run `npm install`.
3. Run `npm run deploy` to publish the `dist` directory to the `gh-pages` branch.
4. In GitHub, open **Settings → Pages** and select the `gh-pages` branch if it is not selected automatically.

The Vite config uses a relative base (`./`) so assets work from a GitHub Pages project path.

## Included interactions

- Responsive mobile navigation
- Search panel
- Add-to-bag feedback for milkshakes
- Expand/collapse blog excerpts
- Newsletter form feedback
- Smooth anchor navigation

Coffee photography is loaded from Unsplash URLs and therefore requires an internet connection.
