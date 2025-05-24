# Repository Restructure Plan

## Purpose

This document outlines the plan to restructure the repository for best-in-class readability, security, and performance, with a focus on self-contained, pluckable apps for technical education and adult learning scenarios.

---

## Rationale
- **Self-contained apps:** Each demo, API, or web app should be fully portable—copy the folder, and it "just works."
- **Readability:** Clear separation of code, assets, data, and docs.
- **Security:** Sensitive data and code are isolated; public assets are easy to audit.
- **Performance:** Easier CI/CD, asset management, and onboarding for new contributors.

---

## BEFORE: Current Structure (Simplified)

```plaintext
/
├── 80s-items/
├── account-log-in/
│   ├── code/
│   ├── images/
├── account-sign-up/
│   ├── account-sign-up/
│   ├── images/
│   ├── mocks/
├── unsubscribe/
│   ├── code/
│   ├── mocks/
├── dashboards/
├── datasets/
├── globomantics-asset-bundle/
├── ...
```

---

## AFTER: Proposed Structure

```plaintext
/
├── apps/
│   ├── account-log-in/
│   │   ├── src/
│   │   ├── assets/
│   │   ├── data/
│   │   ├── public/
│   │   └── README.md
│   ├── account-sign-up/
│   ├── unsubscribe/
│   ├── dashboards/
│   └── ...
├── docs/
│   ├── README.md
│   ├── fictitious-names-list.md
│   ├── job-roles-list.md
│   └── ...
├── data/
├── assets/
├── .github/
├── LICENSE
├── REPO-RESTRUCTURE-PLAN.md
└── ...
```

---

## Migration Steps
1. **Identify all self-contained apps** (websites, APIs, demos, etc.).
2. **For each app:**
   - Move all code, assets, and data into its own `/apps/<app-name>/` folder.
   - Add a local `README.md` with setup and usage instructions.
   - Update all references (images, CSS, data) to use local, relative paths.
3. **Global docs and branding** stay in `/docs` or `/branding` as needed.
4. **Smoke test:** After migration, verify each app runs/opens standalone with no broken links.

---

## Notes
- This plan is designed for maximum pluggability and ease of use for instructors, learners, and contributors.
- If you add a new app, follow the same self-contained structure.
- For questions or suggestions, open an issue or PR. 