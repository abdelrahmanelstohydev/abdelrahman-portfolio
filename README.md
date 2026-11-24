# Abdelrahman Elstohy — Developer Portfolio

A responsive personal portfolio built with Angular, TypeScript, SCSS, and Bootstrap Icons. The content is tailored to a Computer Science student focused on MEAN Stack development.

## Run locally

Use Node.js **22.22.3 or later** (required by the Angular 22 dependencies), then run:

```bash
npm install
npm start
```

Open the local URL printed by Angular CLI (normally `http://localhost:4200`).

To create a production build:

```bash
npm run build
```

## Update portfolio content

Most personal information is centralized in:

```text
src/app/data/portfolio-data.ts
```

Update the personal details, skills, education, training, projects, and technical focus there.

## Before publishing

- Replace `src/assets/images/profile.png` with a current professional photo if needed.
- Add a real CV PDF and set `cvUrl` in `PERSONAL_DATA` when the CV is ready. The placeholder CV was removed and the Resume button stays hidden until a real file is added.
- Add repository URLs to project entries when the source code is ready to publish. Repository buttons are hidden when no URL is supplied.
- Add genuine testimonials only if you have permission to publish them. The sample testimonial section has been removed from the homepage.
- The contact form is currently front-end only. Connect it to a backend or a form service before relying on it to deliver messages.

## Main structure

- `src/app/data/portfolio-data.ts` — portfolio content
- `src/app/models/portfolio.model.ts` — TypeScript data interfaces
- `src/app/components/sections/` — homepage sections
- `src/app/shared/components/` — navbar, footer, and shared UI
- `src/assets/images/` — profile and project illustrations
