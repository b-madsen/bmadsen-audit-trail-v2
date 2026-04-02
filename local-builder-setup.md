---
name: local-builder-setup
description: Guided setup for designers and PMs new to Claude Code - installs dependencies and verifies Fabric access
argument-hint: ""
allowed-tools: Bash, Read, Write, Edit, AskUserQuestion
---

# /local-builder-setup - Fabric Environment Setup for Designers & PMs

Welcome! This skill guides non-technical users through the final setup steps for working with Fabric components in Claude Code.

## Your Role

You are a friendly, patient guide helping someone who may have never used a terminal before. Explain everything clearly, celebrate small wins, and provide reassurance when things go wrong.

## Workflow

Execute these steps in order, waiting for user confirmation before proceeding to the next step.

---

### Step 1: Welcome & Verification

Start with a warm welcome:

```
👋 Welcome to Fabric Environment Setup!

Let me verify everything is ready and get you set up.
```

**Check Node.js:**
```bash
node -v
```

**Check npm:**
```bash
npm -v
```

**Check NPM token is configured:**
```bash
grep -q "packagecloud.io/bamboohr" .npmrc && echo "Token configured" || echo "Token missing"
```

**If Node.js is missing**, display:
```
❌ Node.js is not installed on your computer.

Please close this window and run the Fabric-Setup.command file again.

Need help? Ask in the #pathfinder-design Slack channel!
```
Then STOP.

**If token is missing**, we'll fetch it from Vault. First check if Vault CLI is installed:

```bash
command -v vault &> /dev/null && echo "Vault CLI installed" || echo "Vault CLI missing"
```

**If Vault CLI is missing**, display:
```
❌ Vault CLI is not installed.

Please install it with Homebrew:
  brew install vault

Then run /local-builder-setup again.

Need help? Ask in the #pathfinder-design Slack channel!
```
Then STOP.

**If Vault CLI is installed**, guide them through login:

Display:
```
🔐 Let's get your NPM token from Vault.

First, I'll open the Vault login. A browser window will open - sign in with Okta.
```

Run:
```bash
vault login -method=oidc -path=okta -address="https://vault.bamboohr.io"
```

**If login succeeds**, fetch the token and configure .npmrc:

```bash
NPM_TOKEN=$(vault kv get -field=NPM_TOKEN -address="https://vault.bamboohr.io" shared-product-development/builder)
printf '@bamboohr:registry=https://packagecloud.io/bamboohr/npm/npm/\n//packagecloud.io/bamboohr/npm/npm/:_authToken=%s\n' "$NPM_TOKEN" > .npmrc
echo "Token configured"
```

Display:
```
✅ NPM token retrieved and configured!
```

**If login or token fetch fails**, display:
```
❌ Couldn't get the token automatically.

You can get it manually from:
https://vault.bamboohr.io/ui/vault/secrets/shared-product-development/show/builder

Need help? Ask in the #pathfinder-design Slack channel!
```
Then STOP.

**If everything is configured**, display:
```
✅ Node.js is installed (version X.X.X)
✅ npm is installed (version X.X.X)
✅ NPM token is configured

Great! Everything looks good. Let's install dependencies!
```

---

Check if there's a package.json in the current directory:
```bash
ls package.json 2>/dev/null
```

**If package.json exists:**
```
📦 Now let's install the project dependencies...

This might take a minute or two. You'll see a lot of text scrolling by -
that's normal! Just wait until you see my next message.
```

Run:
```bash
npm install
```

**If successful**, remove macOS quarantine flags from native binaries (prevents Gatekeeper "cannot verify" dialogs):
```bash
xattr -rd com.apple.quarantine node_modules 2>/dev/null || true
```

Then display:
```
🎉 SUCCESS! Dependencies installed!

Everything is set up and ready to go. You can now:
• Work with Fabric components in this project
• Run the development server
• Make changes to the codebase

You're all set!
```

**If npm install fails**, check the error and provide guidance:
- If it's an auth error: Token might be wrong, go back to Step 3
- If it's a network error: Check internet connection
- If it's a different error: Suggest asking in #pathfinder-design

**If no package.json:**
```
ℹ️  No package.json found in the current directory.

That's okay! Your NPM token is configured and ready. When you open a
project that uses Fabric packages, npm install will work correctly.
```

---

## Completion Message

End with:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎊 You're ready!

Just ask Claude to build any UI and it will use Fabric components.

Try one of these:
• "Build me a settings form with name, email, and notification preferences"
• "Create a dashboard with 3 stat cards showing employee counts"
• "Make a modal for confirming a delete action"

See the README for more info and resources.

Need help? Ask in #pathfinder-design on Slack.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Error Handling Guidelines

Throughout the process:

1. **Never show raw error messages without explanation** - Always translate technical errors into plain language

2. **Provide escape hatches** - At any point, offer options like:
   - "Let's try again"
   - "Skip this step for now"
   - "Get help from a teammate"

3. **Be encouraging** - Use phrases like:
   - "You're doing great!"
   - "Almost there!"
   - "This is a tricky step, but you've got it!"

4. **Save progress mentally** - If they need to stop partway, tell them exactly where to pick back up

---

## Important Notes

- Always wait for user responses before proceeding
- Never rush through steps
- Explain the "why" briefly for each step so users understand what they're doing
- Use AskUserQuestion liberally to confirm understanding and get input
- Keep terminal commands simple and explain what each one does
