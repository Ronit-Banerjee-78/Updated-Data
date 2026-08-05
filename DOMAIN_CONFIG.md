# Custom Domain & Vercel / VPS Configuration Guide

This guide explains how to connect your domain (`jiyonkathi.org` / `www.jiyonkathi.org`) to your Jiyonkathi deployment.

---

## Option 1: Vercel Deployment (Recommended)

### Step 1: Push to GitHub & Connect to Vercel
1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Set Environment Variables in Vercel settings (e.g. `DATABASE_URL`, `FIREBASE_STORAGE_BUCKET`, etc.).

### Step 2: Add Custom Domain in Vercel
1. In Vercel, navigate to **Project Settings** > **Domains**.
2. Type `jiyonkathi.org` and click **Add**.
3. Also add `www.jiyonkathi.org` and set redirect to `jiyonkathi.org`.

### Step 3: Configure DNS Records at Domain Registrar (GoDaddy, Namecheap, Cloudflare, etc.)
Log into your DNS Provider and add the following records:

| Type | Name / Host | Value / Target | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` | Automatic |
| **CNAME** | `www` | `cname.vercel-dns.com.` | Automatic |

*Vercel will automatically generate and renew SSL certificates for HTTPS.*

---

## Option 2: Docker / Cloud Run / Custom VPS Deployment

### Deploying with Docker Container
```bash
# Build the Docker image
docker build -t jiyonkathi-app .

# Run the container
docker run -d -p 3000:3000 --env-file .env --name jiyonkathi jiyonkathi-app
```

### Nginx Reverse Proxy Configuration (for Custom VPS)
Place this block in `/etc/nginx/sites-available/jiyonkathi.org`:

```nginx
server {
    listen 80;
    server_name jiyonkathi.org www.jiyonkathi.org;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable SSL with Certbot:
```bash
sudo certbot --nginx -d jiyonkathi.org -d www.jiyonkathi.org
```
