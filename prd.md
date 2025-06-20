# PRD – Fusiox Corporate Website

## 🏷️ Project Name

Fusiox Corporate Website

## 🧩 Objective

Create a professional, fast-loading, and mobile-friendly website to showcase Fusiox's services, capture leads, and build brand credibility. The site will use the DaisyUI `coffee` theme and Alpine.js for interactivity.

---

## 🖼️ Tech Stack

| Layer            | Stack                            |
| ---------------- | -------------------------------- |
| Frontend         | HTML + Tailwind CSS + DaisyUI    |
| JS Interactivity | Alpine.js                        |
| Hosting          | Vercel / Netlify / GitHub Pages  |
| Form Handling    | Formspree or custom Node backend |
| Blog (optional)  | Markdown or static HTML          |

---

## 🎯 Features

### 1. Home Page

- Hero section with call-to-action (CTA)
- Quick services summary (cards)
- Why Fusiox? (3-column grid)
- Testimonials (Alpine.js carousel)
- CTA banner ("Start Your Incorporation")

### 2. About Page

- Company mission/vision
- Founder + advisor bios (cards)
- Timeline or milestones

### 3. Services Page

- Grid of all core + add-on services
- Accordion or toggle panels for details (Alpine.js)

### 4. How It Works

- 4-step DaisyUI stepper (data collection → auto-fill → review → submission)
- Illustrations or process diagrams (optional)

### 5. For Startups / For Funds

- Two mini-landing pages with tailored messaging
- Conditional rendering or tabs (Alpine.js)

### 6. FAQs Page

- Accordion with categories
- DaisyUI `collapse` + Alpine toggles

### 7. Contact Page

- DaisyUI form (name, email, message)
- Submit via Formspree or backend route
- Office address + email

### 8. Footer

- Contact info, social links, disclaimer

---

## 🖌️ Design

- Use **DaisyUI "coffee" theme**
- Rounded cards, clean layout, whitespace-rich sections
- Font: Inter, Work Sans, or default Tailwind stack

---

## 📦 Folder Structure (suggested)

```
fusiox-site/
├── index.html
├── about.html
├── services.html
├── how-it-works.html
├── startups.html
├── funds.html
├── faq.html
├── contact.html

├── css/
│   └── styles.css
├── js/
│   └── alpine.js
├── assets/
│   └── images/
├── tailwind.config.js
```

---

## ✅ MVP Scope

- Static site using DaisyUI + Alpine.js
- Deployed on Vercel or Netlify
- Contact form connected to Formspree or backend
- Fully responsive (mobile-first)

---

## 🔜 Post-MVP Ideas

- Client login/dashboard
- CR e-Services API integration preview
- Admin portal integration
