This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Deploy to GitHub Pages

1. **Push the repo to GitHub** (if you haven’t already).

2. **Turn on GitHub Pages**
   - Open the repo on GitHub → **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, choose **GitHub Actions**.

3. **Deploy**
   - Push to the `main` branch. The workflow `.github/workflows/deploy-gh-pages.yml` will run: it installs deps, runs `npm run build` (with `BASE_PATH` set to your repo name), and deploys the `out/` folder to GitHub Pages.
   - Or run it manually: **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

4. **Open the site**
   - After the workflow finishes, the site is at:  
     **`https://<your-username>.github.io/<repo-name>/`**  
     (e.g. `https://jane.github.io/nefl-frontend/`).

**Local build** (for testing the static export):

```bash
npm run build
```

Static files are in the `out/` folder. To test with the same base path as GitHub Pages:

```bash
BASE_PATH=/nefl-frontend npm run build
```
