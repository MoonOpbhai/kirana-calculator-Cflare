# 🏪 Kirana Hisab Calculator

Ek simple aur kaam ka calculator jo kirana dukaan ke liye banaya gaya hai.

## Features
- 💰 **Gram se Daam** — Kitne gram ki kitni price
- ⚖️ **Daam se Gram** — Kitne rupaye mein kitna gram  
- 🧾 **Bill Banana** — Kai cheezein ek saath bill mein add karo
- ❓ **Info Button** — Har tab ke paas ❓ se samjhao kya karta hai

---

## GitHub + Cloudflare pe Deploy Kaise Kare?

### Step 1 — GitHub pe Upload Karo

```bash
git init
git add .
git commit -m "Kirana calculator launch 🚀"
git branch -M main
git remote add origin https://github.com/AAPKA-USERNAME/kirana-calculator.git
git push -u origin main
```

### Step 2 — Cloudflare API Token Banao

1. https://dash.cloudflare.com pe jao
2. **My Profile → API Tokens → Create Token**
3. Template: **"Edit Cloudflare Workers"** choose karo
4. Token copy kar lo

### Step 3 — GitHub Secrets Set Karo

1. GitHub repo → **Settings → Secrets and variables → Actions**
2. Do secrets add karo:

| Secret Name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | (woh token jo copy kiya) |
| `CLOUDFLARE_ACCOUNT_ID` | (Cloudflare dashboard ke right sidebar mein milega) |

### Step 4 — Deploy!

Bas `main` branch pe koi bhi push karo — GitHub Actions automatically deploy karega!

```bash
git commit --allow-empty -m "Deploy!"
git push
```

### Aapka URL hoga:
```
https://kirana-calculator.AAPKA-CF-USERNAME.workers.dev
```

---

## Local Test Karna Hai?

```bash
# Install wrangler
npm install -g wrangler

# Local pe chalao
wrangler dev worker.js

# Browser mein kholo: http://localhost:8787
```

---

Made with ❤️ for kirana store owners
