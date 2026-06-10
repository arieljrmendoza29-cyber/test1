# The Shop of AG — Auto Repair Website

Official website for **The Shop of AG**, a full-service auto repair shop located in Starke, FL.

---

## 📍 Business Info

| Field | Details |
|-------|---------|
| **Business Name** | The Shop of AG |
| **Industry** | Auto Repair |
| **Phone** | (352) 745-6112 |
| **Address** | 10362 Hampton Ave, Starke, FL 32091 |
| **Email** | frantz@theshopofag.com |
| **Alt. Email** | theshopp@windstream.com |
| **Established** | January 2023 |

---

## 📄 Pages

| File | Page | Description |
|------|------|-------------|
| `index.html` | Home | Hero, services preview, why us, reviews carousel, CTA |
| `about.html` | About Us | Company overview, core values, stats |
| `services.html` | Services | Full 12-service grid with details |
| `history.html` | Our History | Timeline, milestones, location info |
| `mission.html` | Mission & Vision | Mission statement, vision, core commitments |
| `reviews.html` | Customer Reviews | Full review grid |
| `contact.html` | Contact & Quote | Form, contact info, embedded map |
| `style.css` | Stylesheet | Shared styles — white/black/yellow/red palette |
| `main.js` | JavaScript | Navbar, animations, form, carousel |

---

## 🎨 Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--white` | `#ffffff` | Base background — primary surface |
| `--off-white` | `#f7f7f5` | Section backgrounds, cards |
| `--black` | `#0a0a0a` | Hero sections, navbar, footer, dark cards |
| `--yellow` | `#f5c800` | Primary accent — CTAs, headings, trust bar |
| `--yellow-dark` | `#d4aa00` | Hover states for yellow elements |
| `--red` | `#c0392b` | Secondary accent — alert bands, highlights |
| `--gray` | `#555` | Body text |
| `--gray-light` | `#888` | Labels, secondary text |

### Typography
- **Display / Headings:** Barlow Condensed (900, 800, 700) — uppercase, tight tracking
- **Body:** Barlow (400, 500, 600, 700)
- Loaded from Google Fonts

### Key Design Elements
- Yellow left-border stripe on all hero/page-hero sections
- Yellow underline hover animation on nav links
- Yellow top-border on service cards, review cards, contact form
- Red accent band used sparingly for urgency CTAs
- All backgrounds use embedded SVG data URIs — no external image dependencies

---

## 🗂 Project Structure

```
shopofag/
├── index.html        # Homepage
├── about.html        # About Us page
├── services.html     # Full services page
├── history.html      # Company history & timeline
├── mission.html      # Mission & Vision page
├── reviews.html      # Customer reviews page
├── contact.html      # Contact & quote request page
├── style.css         # All styles (responsive: mobile, tablet, desktop)
├── main.js           # Navbar, scroll, animations, form handling
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

---

## 🚀 Deploying to GitHub Pages

### Step-by-step

1. **Create a new GitHub repository** at [github.com/new](https://github.com/new)
   - Name it something like `shopofag-website`
   - Set visibility to **Public** (required for free GitHub Pages)
   - Do **not** initialize with a README (you already have one)

2. **Push this folder to GitHub:**
   ```bash
   cd shopofag/
   git init
   git add .
   git commit -m "Initial commit — The Shop of AG website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repo → **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Set branch to `main`, folder to `/ (root)`
   - Click **Save**

4. **Your site goes live at:**
   ```
   https://<your-username>.github.io/<repo-name>/
   ```
   *(Usually takes 1–3 minutes to publish after the first push)*

---

## 🌐 Custom Domain Setup

To use `theshopofag.com` (or any custom domain):

1. **Add a CNAME file** to this repo with your domain:
   ```
   theshopofag.com
   ```

2. **Update your DNS** (at your domain registrar):
   | Type | Name | Value |
   |------|------|-------|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | `<your-username>.github.io` |

3. In **GitHub → Settings → Pages**, enter your custom domain and enable **Enforce HTTPS**.

> DNS changes can take up to 48 hours to propagate globally.

---

## 📱 Browser & Device Support

- ✅ iOS Safari (iPhone & iPad) — notch/safe-area aware
- ✅ Android Chrome & Firefox
- ✅ Desktop Chrome, Firefox, Safari, Edge
- ✅ Tablet (portrait & landscape)
- ✅ Respects `prefers-reduced-motion`
- ✅ No external image or asset dependencies — fully self-contained

---

## ✏️ Making Changes

All pages share `style.css` and `main.js`. To update content:

- **Business info / copy** → edit the relevant `.html` file directly
- **Colors** → edit the `:root` variables at the top of `style.css`
- **Navigation links** → update both the `<nav>` and `<div class="mobile-menu">` blocks in each `.html` file (they share the same structure)
- **SVG background patterns** → the `style` attribute on `.page-hero-bg` and `.hero-bg` elements in each page
- **Review content** → `reviews.html` (full grid) and `index.html` (carousel)
- **Services** → `services.html` (full) and `index.html` (preview 6)

### Adding a new page

1. Copy any existing page (e.g. `about.html`) as a starting point
2. Update the `<title>`, `<meta name="description">`, and `<body>` content
3. Add a new entry to the `navMap` object in `main.js`
4. Add the link to the `<nav>` and `<div class="mobile-menu">` in all HTML files

---

## 🔧 No Build Tools Required

This is a plain HTML/CSS/JS site — no npm, no bundler, no framework. Open any `.html` file directly in a browser to preview locally. No server needed.

---

*Built for The Shop of AG — Starke, FL*
