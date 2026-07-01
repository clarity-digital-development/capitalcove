# Deployment — Railway + Cloudflare

**Audience:** Tanner (executor) + Dalton (account owner)
**Time required:** ~45 minutes end-to-end
**Prereqs:** Domain purchased (e.g. `thecapitalcove.com`), GitHub repo for the project, GHL token + IDs in hand

---

## Overview

```
   Browser
      |
      v
  Cloudflare DNS  ──── caches static assets, handles SSL, blocks bots
      |
      v
  Railway (Next.js standalone Docker container)
      |
      v
  GoHighLevel API (form submissions)
```

We're using Railway for the Next.js app (excellent Next 15 support, $5/mo Hobby plan handles this traffic easily) and Cloudflare for DNS + SSL + edge caching (free tier is plenty).

---

## Part 1 — Push the code to GitHub (5 min)

If the project isn't already on GitHub:

1. Open the project at `c:\Users\tanne\capitalcove` in your terminal
2. Create a private GitHub repo named `the-capital-cove`
3. From the project root:
   ```bash
   git init
   git add .
   git commit -m "Initial production build"
   git branch -M main
   git remote add origin git@github.com:<your-username>/the-capital-cove.git
   git push -u origin main
   ```

⚠️ **Confirm `.env.local` is in `.gitignore` before pushing.** Run `cat .gitignore | grep env` — should show `.env*.local`. If your real GHL token ends up in GitHub, rotate it immediately.

---

## Part 2 — Deploy to Railway (15 min)

### 2a. Create the project

1. Go to **https://railway.app** and sign in (GitHub login is easiest)
2. Click **+ New Project** → **Deploy from GitHub repo**
3. Select the `the-capital-cove` repo
4. Railway will auto-detect the Dockerfile (already present in the repo) and start building

### 2b. Set environment variables

While the first build runs, click into your service → **Variables** tab → **+ New Variable**. Paste each:

```
GHL_API_TOKEN=<paste the GHL API token from .env.local / your password manager — never commit the real value>
GHL_LOCATION_ID=5VvXdqWzabMZ7HBBo47G
GHL_PIPELINE_ID=Y4xbxOq1PUi1GuXzY3Gf
GHL_STAGE_NEW_LEAD=ed3cfa25-0d4a-4b4a-be16-8411b69b2897
GHL_CHAT_WIDGET_ID=69e2f5db29e84623243954c1
NEXT_PUBLIC_GA_ID=                  ← leave blank until Dalton sends it
NEXT_PUBLIC_SITE_URL=https://thecapitalcove.com
NODE_ENV=production
```

After saving variables, click **Deploy** → **Redeploy** so the rebuilt container picks them up.

### 2c. Verify the deploy

1. **Deployments** tab → wait for green checkmark (typically 2-3 min)
2. **Settings** → **Networking** → **Generate Domain** to get a temporary `*.up.railway.app` URL
3. Open that URL — should load the homepage with eligibility gates first, just like local
4. Submit a test lead through the Quick Quote form (use clearly-marked test data) — verify it lands in GHL pipeline

⚠️ **If the deploy fails**, the most common cause is Dockerfile permissions on Railway's Linux runners. Check the build log; if you see anything weird, ping me.

---

## Part 3 — Cloudflare DNS setup (15 min)

### 3a. Add the domain to Cloudflare

1. Go to **https://dash.cloudflare.com** and sign in (create a free account if needed)
2. Click **+ Add a Site** → enter `thecapitalcove.com` → **Continue**
3. Select **Free plan** → **Continue**
4. Cloudflare scans for existing DNS records (probably empty)
5. **Important:** Copy the two Cloudflare nameservers shown (something like `lana.ns.cloudflare.com` and `russell.ns.cloudflare.com`)

### 3b. Point the domain at Cloudflare

Go to wherever you bought the domain (Namecheap, Google Domains, GoDaddy, etc.):

1. Find **Nameservers** or **DNS** settings for `thecapitalcove.com`
2. Switch from "default" to **custom nameservers**
3. Paste the two Cloudflare nameservers
4. Save

DNS propagation takes 5 minutes to 24 hours. Usually it's under an hour.

### 3c. Add Railway as a custom domain

Back in Railway:

1. **Settings** → **Networking** → **Custom Domain**
2. Add `thecapitalcove.com` AND `www.thecapitalcove.com` (one at a time)
3. Railway shows you a CNAME target like `something.up.railway.app`

Back in Cloudflare:

1. Open the site → **DNS** → **Records** → **+ Add record**
2. Add two records:
   - **Type:** `CNAME` · **Name:** `@` · **Target:** `<railway-cname-target>` · **Proxy status:** Proxied (orange cloud) · TTL: Auto
   - **Type:** `CNAME` · **Name:** `www` · **Target:** `<railway-cname-target>` · **Proxy status:** Proxied · TTL: Auto

⚠️ **One gotcha:** Some DNS providers don't allow CNAMEs on the apex (`@`). If Cloudflare warns about this, use a **CNAME flattening** trick — Cloudflare handles this automatically for proxied records on the apex, so it should just work.

### 3d. Cloudflare SSL settings

1. **SSL/TLS** → **Overview** → set encryption mode to **Full (strict)**
2. **SSL/TLS** → **Edge Certificates** → enable **Always Use HTTPS** + **Automatic HTTPS Rewrites**

After 5-10 minutes, `https://thecapitalcove.com` should resolve to your Railway deployment with a valid SSL cert.

---

## Part 4 — Post-launch smoke test (5 min)

Once `thecapitalcove.com` is live:

| Check | How |
|-------|-----|
| Homepage loads | Visit `https://thecapitalcove.com` — should see eligibility gates first |
| SSL valid | Padlock icon in browser, no warnings |
| Forms work | Submit a test lead — verify it lands in GHL `1️⃣ New Lead` stage |
| Chat widget loads | Bottom-right bubble appears within 3 seconds |
| OG image generates | Visit `https://thecapitalcove.com/opengraph-image` — should return a 1200x630 PNG |
| LocalBusiness JSON-LD | View page source, search for `"FinancialService"` — should find it |
| Mobile responsive | Open DevTools, switch to mobile viewport — hero stacks, slash adapts |

---

## Part 5 — A2P SMS campaign re-registration (Dalton's task, post-launch)

Per the original spec section 11 — Dalton's GHL A2P campaign was rejected because it was registered as "2FA" instead of "Transactional / Non-Marketing". Now that the site is live with a privacy policy and terms page, he can resubmit:

1. GHL → **Settings** → **Phone Numbers** → **Trust Center** → **Brand & Campaigns**
2. **Create Campaign** (don't edit the rejected one)
3. Use case: **Transactional / Non-Marketing**
4. Fill in:
   - **Description:** mention `thecapitalcove.com`, loan application status updates, document requests
   - **Sample messages:** use his actual GHL workflow messages
   - **Opt-in:** "Users submit a loan application form on our website with SMS consent checkbox"
   - **Website URL:** `https://thecapitalcove.com`
   - **Privacy policy URL:** `https://thecapitalcove.com/privacy`
   - **Terms URL:** `https://thecapitalcove.com/terms`
5. Submit — typical approval 1-3 business days

---

## What to send Tanner before you can deploy

- Confirm the domain you purchased — I assumed `thecapitalcove.com`. If different, tell me before I update `NEXT_PUBLIC_SITE_URL`.
- GitHub access — invite Tanner to the private repo, or push the code yourself and share the repo URL.
- Railway access — either share an invite to the Railway project, or grant collaborator access on the repo and let Tanner trigger the deploy.

Most efficient flow: Dalton creates the GitHub repo + Railway project + Cloudflare account in his name, invites Tanner as collaborator on all three. Future deploys just become `git push origin main` from anywhere.
