# 🪐 Dheeraj Kumar — Product Designer Portfolio (Dheerajsorbit)

A pixel-perfect, fully responsive, and highly interactive portfolio website built strictly from Figma 2x PNG exports (`dj_home.png`, `dj_work.png`, `dj_about.png`, `dj_home — Contact modal open.png`) and the official design system specification (`Dheerajsorbit — Portfolio design system.png`).

---

## 🚀 Live Pages & Surfaces

1. **DJ Home (`index.html`):**
   - Precise 1440×900 desktop viewport framing (no vertical desktop scroll).
   - Mathematical vector orbit arc (`rx=757, ry=364, rotate(-16.9deg)`) with radial gradient 3D orange sphere.
   - Header lockup (32px retina mark + "Dheeraj Kumar" Arimo wordmark + Work/About nav).
   - Split layout with intro copy (417px wide), "Let's talk" CTA, and client roster (Zendesk with brand marker, DHL, Citibank, Perkinelmer, Avellino, ITC, Flipkart).
   - Monumental signature display headline: **"Product Designer"** (Arimo 158px / -10px tracking).
   - Responsive scaling down to mobile viewports (375px) with single-column stacking and fluid typography.

2. **DJ Work (`work.html`):**
   - Protected access password gate card (458×392px, radius 12px, border `#E9E9E9`).
   - Clean orbit background (planet removed per Figma specification).
   - Key icon glyph, title, email access trigger (`mailto:` + Contact Modal hook), input with custom focus state, and "Unlock work" pill CTA.
   - Interactive client-side passcode authentication (`orbit31`, `dheeraj`, `portfolio`, `zendesk`) with error shake animation and success state.
   - Active navigation indicator in brand accent (`#EB5624`).

3. **DJ About (`about.html`):**
   - Complete 6-section editorial layout (1344px max content width):
     - **Hero & Bio:** High-res portrait photo (`dheerajkumar_about_pic.png`), social handle lockup (`@dheerajsorbit` with LinkedIn, Medium, X, Dribbble), "ABOUT" eyebrow, and "Hello, I'm Dheeraj" heading.
     - **Story:** "The intersection of craft, systems, and human stories" longform narrative with 40px visual balance offset.
     - **Experience:** Timeline entries for Zendesk (Lead / Staff Product Designer), Persistent Systems (Lead UX Designer), WongDoody / Infosys (Senior UX Designer), and Ittisa (UX/UI Designer).
     - **Education & Credentials:** Welingkar Institute and Interaction Design Foundation HCI credentials.
     - **Life Unplugged:** Creative interests (Photography, Mechanical Keyboards, Visual Arts) with inline SVG iconography.
     - **Over To You:** Closing CTA card with "Let's Talk" button hooked directly to the Contact Modal.

4. **DJ Contact Modal (`#contact-modal`):**
   - Accessible dialog overlaid on Home, Work, and About pages when "Let's Talk" is triggered.
   - Smooth scale/fade-in animation (`cubic-bezier(0.16, 1, 0.3, 1)`) with background blur (`backdrop-filter: blur(4px)`) and dark overlay (`rgba(17, 17, 18, 0.4)`).
   - "Great work starts with a **Hello**" heading (orange accent `#EB5624`).
   - "Email me ↗" primary button, one-click copy to clipboard with toast notification, divider, and LinkedIn/Dribbble outbound links.
   - Accessible keyboard support (ESC to close, background click-outside, focus management).

---

## 🎨 Design System Tokens

- **Typography:**
  - **Display / Headings / Navigation:** `Arimo` (Weights: 400 Regular, 700 Bold)
  - **Body / Buttons / Form Inputs:** `Roboto` (Weights: 400 Regular, 500 Medium, 700 Bold)
- **Color Palette:**
  - `Canvas / Surface`: `#FFFFFF`
  - `Subdued / Inputs`: `#F5F5F5`
  - `Ink / Primary Text`: `#111112`
  - `Secondary Copy`: `#706F6F`
  - `Placeholder`: `#ABABAB`
  - `Brand Accent`: `#EB5624`
  - `Divider / Border`: `#E9E9E9`
  - `Asset Green / Success`: `#33CD94`
- **Elevations (Drop Shadows):**
  - `--elevation-cta`: `0 17px 27px 1px rgba(0, 0, 0, 0.1412), 0 5px 9px 0 rgba(0, 0, 0, 0.1255)`
  - `--elevation-gate`: `0 4px 24px 0 rgba(0, 0, 0, 0.0392), 0 1px 6px 0 rgba(0, 0, 0, 0.0314)`
  - `--elevation-dialog`: `0 24px 64px 0 rgba(0, 0, 0, 0.1412)`

---

## 🔍 SEO Strategy (Rank #1 for "Dheeraj Kumar as Product Designer")

- **Google JSON-LD Structured Data:**
  - Schema `@type: Person` on every page declaring:
    - Name: `Dheeraj Kumar`
    - Job Title: `Product Designer`
    - Works For: `Zendesk`
    - Location: `Pune, India`
    - `sameAs`: LinkedIn, Dribbble, Medium profiles
    - `knowsAbout`: Product Design, Design Systems, Enterprise SaaS, AI Workflows, UX Design
  - Schema `@type: WebSite` with official branding.
- **Semantic HTML & Meta:**
  - Target meta keywords and search descriptions emphasizing "Dheeraj Kumar", "Product Designer", "Zendesk Product Designer", "Enterprise SaaS Designer".
  - Canonical URLs pointing to `https://dheerajkumar.design/`.
  - Open Graph and Twitter Card tags.
  - Production `robots.txt` and `sitemap.xml`.

---

## 💻 How to Preview Locally

Open any of the pages directly in your browser:
```bash
open portfolio/index.html
open portfolio/work.html
open portfolio/about.html
```
Or start a local development server:
```bash
cd portfolio && python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```
