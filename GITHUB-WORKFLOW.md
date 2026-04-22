# Humble Claw Site — GitHub Workflow Guide

**Learn once, update forever. Here's how the machine works.**

---

## HOW THE SITE DEPLOYS

```
You push to GitHub → GitHub Pages auto-deploys → humble-claw.com goes live
```

That's it. No manual server. No FTP. GitHub Pages handles everything for free.

**Flow:**
```
Mac mini (local files)
    ↓ git push
GitHub repo (ironsheikbot/humble-claw-site)
    ↓ GitHub Pages (auto)
Live at humble-claw.com (~1-2 min after push)
```

**Current setup:**
- Branch: `main`
- Root: `/ (root)`
- CNAME: humble-claw.com (configured via CNAME file)
- Domain: points to GitHub Pages (you need to set this in your DNS provider)

---

## YOUR DAILY GIT PULL WORKFLOW

Every time you sit down to update the site:

### Step 1: Pull latest (before you start)
```
git pull origin main
```
This fetches any changes that might have been pushed from another machine or by me.

### Step 2: Make your changes
Edit any file:
- `index.html` — main homepage
- `portfolio.html` — portfolio page
- `board.html` — board/team page
- Add new images (put them in the folder)

### Step 3: Check what changed
```
git status
```
Shows you exactly which files you modified.

### Step 4: Commit your changes
```
git add -A
git commit -m "your message here"
```
Example: `git commit -m "Update portfolio with new project"`

### Step 5: Push to GitHub
```
git push origin main
```

### Step 6: Wait ~1-2 minutes
GitHub Pages rebuilds automatically. Then humble-claw.com shows your changes.

---

## THE FILES

| File | What It Is | When to Edit |
|------|-----------|--------------|
| `index.html` | Main homepage | Update regularly |
| `portfolio.html` | Portfolio/work samples | When you ship something new |
| `board.html` | Team/board page | When empire changes |
| `BUILDLOG.md` | Build history log | After each significant update |
| `CNAME` | Domain config (DO NOT DELETE) | Never |
| `board-sheik.jpg` | Image assets | When you want new photos |

---

## COMMON TASKS

### Add an image
1. Save the image to the site folder (e.g., `new-photo.jpg`)
2. Edit the HTML file to reference it: `<img src="new-photo.jpg">`
3. Commit and push

### Edit text on the homepage
1. `git pull`
2. Open `index.html` in a text editor
3. Find the text you want to change (search for keywords)
4. Edit, save
5. `git add -A && git commit -m "Updated intro text" && git push`

### Check if your changes are live
1. Push to GitHub
2. Wait 1-2 minutes
3. Visit humble-claw.com

---

## GIT COMMANDS CHEAT SHEET

```
git pull origin main      Pull latest changes (DO THIS FIRST every session)
git status                See what files you changed
git diff                  See exact lines you changed
git add -A                Stage all changes for commit
git commit -m "message"   Commit with a message
git push origin main      Push to GitHub (deploys the site)
git log --oneline         See recent commits
git log --oneline --graph Visual branch history
```

---

## IMPORTANT RULES

1. **ALWAYS `git pull origin main` BEFORE you start editing** — otherwise you might create a merge conflict
2. **Commit early, push often** — don't accumulate 50 changes and push them all at once
3. **Write good commit messages** — "fixed stuff" is bad, "Updated board.html with new bot roster" is good
4. **The CNAME file must stay** — it tells GitHub Pages to use humble-claw.com
5. **Don't commit secrets** — if you add an API key or password, the world sees it

---

## HOW TO EDIT FILES

### Option A: Through Me (Easiest)
Just tell me what you want changed. I'll pull, edit, commit, and push. You don't need to know any code.

### Option B: Text Editor on Mac
Open the file in any text editor:
- TextEdit (free, built-in)
- VS Code (better, free download from code.visualstudio.com)
- BBEdit (free, Mac-native)

### Option C: GitHub Web Interface (No setup needed)
1. Go to https://github.com/ironsheikbot/humble-claw-site
2. Click on a file (e.g., index.html)
3. Click the pencil icon (edit)
4. Make changes
5. Scroll down, commit directly to main

**Drawback:** No local copy, harder to preview images.

### Option D: Clone to Another Mac
If you want to edit on a different computer:
```
git clone git@github.com:ironsheikbot/humble-claw-site.git
```
Then that machine has a full copy. Pull before editing, push when done.

---

## DNS — STILL NEEDED

The GitHub side is ready. Your domain registrar (wherever you bought humble-claw.com) needs:

- **A record:** `@ → 185.199.108.153` (or one of GitHub's IPs)
- **CNAME:** `www → ironsheikbot.github.io`

If you tell me who your registrar is (GoDaddy, Namecheap, Google Domains, etc.) I can walk you through the exact steps. This is a 5-minute task.

---

## WHAT "INFRASTRUCTURE AS CODE" MEANS HERE

Right now, your site = code in a GitHub repo. "Infrastructure as code" means:

- **Your site is versioned** — every change is tracked, can be reverted
- **Your site is reproducible** — delete everything, `git clone` and it's back
- **Your site is collaborative** — multiple people can work on it
- **Your site deploys automatically** — no manual server management

As you get more comfortable, you can add:
- **Branch previews** — work on a `dev` branch, merge to `main` when ready
- **Automatic checks** — validate HTML before it deploys
- **Image optimization** — compress images before committing

But for now: pull → edit → commit → push → live. That's the whole game.
