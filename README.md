# Mahadev Work Force Solution — Static Website (HTML5 / CSS3 / Vanilla JS)

This directory (`static-site/`) contains the complete, pixel-perfect, static conversion of the **Mahadev Work Force Solution** website.

It operates with **zero server dependencies**:
- No Next.js or React runtime
- No Node.js server
- No backend API routes
- No database
- No recurring server hosting bills

Deployable immediately to 100% free or low-cost static hosts such as **Cloudflare Pages**, **GitHub Pages**, **Netlify**, **Vercel**, or any Apache/Nginx web server.

---

## 📁 Directory Structure

```text
static-site/
├── index.html            # Home page (Hero, Key Competencies, 3-Row Marquee, Portfolio, CTA)
├── services.html         # 6 Detailed Service Cards, Deployment Process, Consultation CTA
├── industries.html       # 8 Sector Showcase Cards, Staffing Profiles, Marquee
├── about.html            # Mission, CEO Prabhash Tripathi Profile, Compliance Dashboard, Timeline
├── contact.html          # Office Details, Contact Cards, Quotation Form (WhatsApp & Mailto)
├── 404.html              # Custom 404 Error Page with return links
├── favicon.ico           # Shield logo favicon
├── css/
│   ├── style.css         # Color tokens, typography, glassmorphism, forms, navbar, footer
│   ├── responsive.css    # Responsive grids, tablet/mobile rules, layout stacking
│   └── animations.css    # 3-row marquee keyframes, theme transitions, reduced motion
├── js/
│   ├── theme.js          # Dark/Light theme toggle, anti-FOUC, localStorage persistence
│   ├── main.js           # Dynamic year, mobile drawer toggle, body scroll lock, active nav
│   └── contact.js        # Form validation, URL parameter parsing, WhatsApp & mailto dispatch
├── assets/
│   ├── images/           # Industrial photography (hero, pharma, chemical, logistics, etc.)
│   ├── logo/             # 17 Vector & high-res client logos (Danopharm, Tatva Chintan, etc.)
│   └── person/           # Leadership portrait (ceo_prabhash.png)
├── MIGRATION-REPORT.md   # Architectural audit & migration analysis
├── TEST-REPORT.md        # Multi-viewport browser test matrix & screenshots
└── README.md             # This deployment & maintenance guide
```

---

## 🚀 Local Preview and Testing

You do not need `npm run dev`. You can preview the website locally using any standard static file server:

### Option A: Using Python (Installed by default on most systems)
Open a terminal in the project root:
```bash
# Serve static-site directly on port 8080
python -m http.server 8080 --directory static-site
```
Then visit: `http://localhost:8080`

### Option B: Using Node / npx (No install needed)
```bash
npx -y serve static-site -p 8080
```
Then visit: `http://localhost:8080`

### Option C: VS Code "Live Server" Extension
1. Open the folder in VS Code.
2. Right click `static-site/index.html` and select **"Open with Live Server"**.

*(Note: While HTML files can technically be opened via `file://`, a local HTTP server is recommended to ensure all browser features such as localStorage and relative asset paths operate without browser security restrictions).*

---

## 🌐 Free Static Hosting Deployment Guide

### 1. Cloudflare Pages (Recommended — Fast & 100% Free)
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages**.
2. **Direct Upload Option:**
   - Select **"Upload assets"**.
   - Create a project name (e.g., `mahadev-workforce`).
   - Drag and drop the `static-site` folder directly into the browser.
   - Click **Deploy Site**. Done!
3. **Git Integration Option:**
   - Connect your GitHub repository.
   - **Build command:** *(leave empty)*
   - **Build output directory:** `static-site`
   - Click **Save and Deploy**.

### 2. Netlify (Drag & Drop or Git)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the `static-site` folder into the drop zone.
3. Your site will be live instantly with a free `.netlify.app` subdomain or your custom domain with free automatic SSL.

### 3. GitHub Pages
1. Push the repository to GitHub.
2. Go to repository **Settings** → **Pages**.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: `main` (or your default branch)
   - Folder: If your repository only contains `static-site`, select `/ (root)`. If your repository contains the whole project, configure GitHub Actions to deploy the `static-site/` folder, or create a `gh-pages` branch containing only `static-site` files.

---

## 🔒 Contact Form & Enquiry Dispatching

### How the Contact Form Works by Default
The original Next.js website used Gmail SMTP via a backend API route (`/api/contact`). Because static hosting does not have a backend, **storing the Gmail App Password in browser JavaScript would expose the password to everyone**.

To keep the site 100% secure with zero maintenance costs:
1. **Client-Side Validation:** Ensures Full Name, 10-digit Phone Number, and Requirement details are valid before submission.
2. **WhatsApp Direct Dispatch:** Immediately formats an organized, multi-line quotation enquiry and opens WhatsApp directed to the company's verified number:
   `+91 816 084 1776`
3. **Email (mailto) Direct Dispatch:** Opens the user's default email client addressed to:
   `mahadevworkforcesolution@gmail.com` with the pre-filled subject and requirement details.
4. **Honest UX:** The form does not display a false "Email Sent!" message. It presents the formatted message with 1-click dispatch buttons.

### Optional: Connecting a Free Hosted Serverless Form Endpoint
If you wish to receive silent, automatic form emails without maintaining a server:
1. Sign up for a free service such as [Web3Forms](https://web3forms.com/) or [Formspree](https://formspree.io/).
2. Obtain your free access key.
3. In `static-site/contact.html`, add the form action or update the `fetch()` call in `static-site/js/contact.js`:
   ```javascript
   // Example Web3Forms submission (Free 250 submissions/month):
   const response = await fetch("https://api.web3forms.com/submit", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
       name: data.fullName,
       phone: data.phoneNumber,
       company: data.companyName,
       email: data.email,
       service: data.service,
       message: data.requirement
     })
   });
   ```

---

## ✏️ How to Update Content and Branding

### Updating Company Details
The verified company information is located in:
- **Phone Numbers:** `+91 816 084 1776` (Primary) & `9429126676` (Secondary)
- **Email:** `mahadevworkforcesolution@gmail.com`
- **Address:** `Shop No. FF-01, Dhanlaxmi Enterprise, Asian Paints Chowkdi, Plot No. 2603, 12&3, Ankleshwar GIDC, Ankleshwar, Gujarat 393002`
- **Hours:** `9 AM to 6 PM`

To update these, edit the footer and contact sections in the `.html` files, and update `static-site/js/contact.js` for the default WhatsApp recipient number.

### Updating Images and Logos
- **Hero and Sector Photos:** Replace or add photos in `static-site/assets/images/`.
- **Client Logos:** Add new partner logos into `static-site/assets/logo/` and add corresponding `<img>` tags inside the marquee tracks in `index.html` and `industries.html`.
- **Leadership Photo:** Replace `static-site/assets/person/ceo_prabhash.png`.

### Updating Colors and Styling
All design tokens are defined as CSS variables at the top of `static-site/css/style.css`:
- `--amber-500`: `#F59E0B` (Primary brand accent)
- `--bg-primary` (Dark): `#0B1220` (Navy 950)
- `--bg-primary` (Light): `#F5F3EE` (Ivory 100)
- `--text-primary` & `--text-secondary`

---

## 🛡️ Original Next.js Project Preservation
The original Next.js project remains **100% intact** in the parent directory (`src/`, `public/`, `package.json`, etc.). It has not been modified or removed. You can return to it at any time if you ever decide to run a server-side Next.js environment in the future.
