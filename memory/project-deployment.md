---
name: project-deployment
description: Deployment setup for saimobile-web — GitHub, Vercel accounts, and known gotchas
metadata:
  type: project
---

GitHub repo: github.com/2ndhandwala/saimobile-web (public — made public so Vercel Hobby plan auto-deploys work).

Vercel project: vercel.com/2ndhandwala/saimobile-web, logged in as 2ndhandwalatech-4407.

Custom domain: 2ndhandwala.com (nameservers pointing to Vercel DNS, confirmed).

**Why:** Vercel Hobby plan doesn't support auto-deploy for private repos. Making it public was the fix.

**How to apply:** If auto-deploys break again, first check repo visibility. CLI deploys via `vercel --prod --scope 2ndhandwala` also work as a fallback.

Pending: RESEND_API_KEY and ADMIN_PASSWORD must still be added to Vercel environment variables (Production) for forms and admin panel to work.
