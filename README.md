<p align="center">
  <img src="./src/assets/signature.svg" width="280" alt="Devansh Grover Signature" />
</p>

<h1 align="center">
  <code><b>S T E E L C I R C U I T S</b></code>
</h1>

<p align="center">
  <b>Devansh Grover — Interactive Engineering, Robotics & AI Systems Portfolio</b>
</p>

<p align="center">
  <a href="https://github.com/devansh8011-oss/SteelCircuits">
    <img src="https://img.shields.io/github/stars/devansh8011-oss/SteelCircuits?style=for-the-badge&color=8A2BE2&logo=github" alt="Stars" />
  </a>
  <a href="https://steelandstack.com">
    <img src="https://img.shields.io/badge/Steel_%26_Stack-Founder-%23161012?style=for-the-badge" alt="Steel & Stack" />
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React_19-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React 19" />
  </a>
  <a href="https://vite.dev/">
    <img src="https://img.shields.io/badge/Vite_8-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_v4-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  </a>
  <a href="https://gsap.com/">
    <img src="https://img.shields.io/badge/GSAP_3-%2388CE02.svg?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP 3" />
  </a>
</p>

<p align="center">
  My personal portfolio built at the intersection of robotics, embedded hardware, AI systems, and tactile web engineering. Designed with scroll-driven physics, mechanical split-flap typography, and fluid motion across desktop and mobile.
</p>

---

## The Core Experience

I engineered this site as a physical, scroll-reactive showcase rather than a static resume:

*   **Fluid Scroll Inertia:** Intercepts native scroll velocity with [Lenis](https://github.com/darkroomengineering/lenis) synced cleanly to GSAP ScrollTrigger timelines.
*   **Custom Signature Preloader:** Traces my hand-drawn vector signature (`signature.svg`) on load before revealing the stage.
*   **Dynamic SVG Scroll Curve:** Generates a responsive Bezier vector path measured live from the Hero headline's **"I"** down into the Roles section without text collisions on desktop or mobile.
*   **Mechanical Split-Flap Typography:** Renders the **FEATURED WORKS** section header using an interactive, viewport-triggered 14-tile split-flap departure board (`SplitFlapText.jsx`).
*   **Proximity Variable Fonts & 3D Depth:** Combines Three.js scene primitives, Roboto Flex variable font axis interpolation, and circular mask transitions for the Contact reveal.

---

## Tech Stack & Architecture

| Layer | Technology | Usage |
| :--- | :--- | :--- |
| **Framework** | **React 19** | Modular section architecture & stateful interactive controls |
| **Build Engine** | **Vite 8** | Fast HMR development server & bundled production build |
| **Styling** | **Tailwind CSS v4 + Custom CSS** | Design tokens, responsive clamp sizing, and mobile-first rules |
| **Animations** | **GSAP 3 + ScrollTrigger** | Scrubbed scroll blur, circular contact reveal, and curve drawing |
| **Scroller** | **Lenis** | Smooth scroll inertia & frame synchronization |
| **3D / Morphing** | **Three.js + Flubber** | WebGL geometry & SVG path interpolation utilities |

---

## Interactive Engineering Details

<details>
<summary><b>1. Scroll-Synced SVG Gutter Curve (click to expand)</b></summary>

As the visitor scrolls through the Hero and Roles sections, an SVG curve draws downward from the right side of **"I"** in `NOT JUST WEBSITES — I BUILD`.
*   **Live DOM Measurement:** Reads bounding rectangles of `.hero-headline` and `.roles-list` dynamically across viewport resizes so the path routes cleanly along the margin on both wide monitors and narrow mobile screens.
*   **Scroll-Scrub Timeline:** GSAP's `ScrollTrigger` animates `strokeDashoffset` in lockstep with scroll progress while `requestAnimationFrame` tracks blur-driven element offsets.
</details>

<details>
<summary><b>2. In-View Split-Flap Board (`SplitFlapText`) (click to expand)</b></summary>

The **FEATURED WORKS** section heading uses a 14-tile mechanical split-flap display (`SplitFlapText.jsx` + `SplitFlapText.css`).
*   **Viewport Trigger:** Uses an `IntersectionObserver` gate (`threshold: 0.2`) so the board holds blank offscreen and cascades cleanly into `FEATURED WORKS` as you scroll into `#projects`.
*   **Responsive Sizing:** Uses fluid `clamp()` font sizing and tile gaps to keep all 14 tiles centered on a single row across desktop and mobile without horizontal overflow.
</details>

<details>
<summary><b>3. Proximity-Driven Variable Typography (click to expand)</b></summary>

Selected headings morph Roboto Flex `wght` and `wdth` axes in real time based on cursor distance $(x_m, y_m)$ to each character glyph center $(x_c, y_c)$:

$$d = \sqrt{(x_m - x_c)^2 + (y_m - y_c)^2}$$

$$\text{Weight} = \text{BoldWght} + (\text{ThinWght} - \text{BoldWght}) \times \max\left(0, 1 - \frac{d}{\text{Radius}}\right)$$
</details>

---

## Project Structure

```text
SteelCircuits/
├── src/
│   ├── assets/                   # Portrait media, signature SVG, project visuals & video loops
│   ├── App.jsx                   # Root layout & Lenis smooth scroll setup
│   ├── IntroLoader.jsx           # Animated signature draw-in preloader
│   ├── HeroReveal.jsx            # Scroll-faded primary portrait stage
│   ├── Hero.jsx                  # Hero typography, rotating discipline words & navigation drawer
│   ├── DiveIntro.jsx             # Transition dive statement before headline showcase
│   ├── ScrollCurve.jsx           # Responsive GSAP-scrubbed gutter curve SVG
│   ├── Roles.jsx                 # Roles showcase including Founder @ Steel & Stack
│   ├── SteelAndStackSection.jsx  # Steel & Stack highlight band
│   ├── SplitFlapText.jsx         # Mechanical split-flap heading board
│   ├── FeaturedWorks.jsx         # Project showcase cards, repo links & video preview modal
│   ├── Contact.jsx               # Scroll-pinned circular reveal & social links
│   ├── Footer.jsx                # Viewport-fitting footer wordmark
│   ├── VariableFontText.jsx      # Cursor-proximity variable font animation helper
│   └── index.css                 # Palette tokens, typography & global overflow guards
```

---

## Setup & Installation

### Prerequisites
Ensure [Node.js](https://nodejs.org/) (`18.x` or newer) and `npm` are installed:
```bash
node --version
npm --version
```

### Run Locally
1. **Clone the repository:**
   ```bash
   git clone https://github.com/devansh8011-oss/SteelCircuits.git
   cd SteelCircuits
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.
4. **Build for production:**
   ```bash
   npm run build
   ```

---

## Featured Projects

* **[Zap fit](https://dpsi-zap-fit.vercel.app)** — *[GitHub](https://github.com/devansh8011-oss/zap-fit)*
  AI-powered post-workout nutrition and athletic performance platform engineered to optimize training recovery and meal timing.
* **[Warehouse Monitoring System](https://warehouse-xi-ten.vercel.app)** — *[GitHub](https://github.com/devansh8011-oss/smart-warehouse-monitoring-system)*
  Smart IoT cold-storage and logistics telemetry platform tracking live ambient sensors, thermal heatmaps, and real-time anomaly alarms.
* **[Autonomous AI Lab Monitor](https://ai-lab-monitor.pages.dev)** — *[GitHub](https://github.com/devansh8011-oss/ai-lab-monitor)*
  Vision-based autonomous agent supervising laboratory experiments, safety protocols, chemical hazard detection, and robotic hardware.
* **Nexus Delivery Robot** — *[GitHub](https://github.com/devansh8011-oss/Nexus-Delivery-Robot)*
  Autonomous indoor and last-mile mobile delivery platform built with obstacle avoidance, ultrasonic sensor fusion, fleet telemetry, and cargo dispatch.

---

## Reach Out

<p align="center">
  <a href="https://steelandstack.com">
    <img src="https://img.shields.io/badge/Steel_%26_Stack-steelandstack.com-161012?style=flat-square" alt="Steel & Stack" />
  </a>
  <a href="mailto:devansh8011@gmail.com">
    <img src="https://img.shields.io/badge/Email-devansh8011%40gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white" alt="Email" />
  </a>
  <a href="https://github.com/devansh8011-oss">
    <img src="https://img.shields.io/badge/GitHub-devansh8011--oss-24292e?style=flat-square&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://www.instagram.com/Devansh999AI">
    <img src="https://img.shields.io/badge/Instagram-Devansh999AI-E4405F?style=flat-square&logo=instagram&logoColor=white" alt="Instagram" />
  </a>
  <a href="https://wa.me/917303177088">
    <img src="https://img.shields.io/badge/WhatsApp-Chat-25D366?style=flat-square&logo=whatsapp&logoColor=white" alt="WhatsApp" />
  </a>
</p>

---

<p align="center">Built by Devansh Grover · <a href="https://steelandstack.com">Steel & Stack</a></p>
