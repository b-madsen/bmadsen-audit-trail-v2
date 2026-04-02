#!/bin/bash

# Fabric Environment Setup for Designers & PMs
# Double-click this file to run it

set -e

# Where to install the project
INSTALL_DIR="$HOME/fabric-claude-env"

# Where this script is located (the unzipped folder)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Clear screen for clean experience
clear

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Fabric Environment Setup for Designers & PMs"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 0: Move project to correct location if needed
if [ "$SCRIPT_DIR" != "$INSTALL_DIR" ]; then
    echo "Setting up project folder..."
    echo ""

    if [ -d "$INSTALL_DIR" ]; then
        echo "✅ Project folder already exists at: $INSTALL_DIR"
        echo "   Using existing folder."
        echo ""
    else
        echo "Moving project to: $INSTALL_DIR"
        cp -R "$SCRIPT_DIR" "$INSTALL_DIR"
        echo "✅ Project folder ready!"
        echo ""
    fi
fi

# Step 1: Check/Install Homebrew (needed for other dependencies)
echo "Checking prerequisites..."
echo ""

if ! command -v brew &> /dev/null; then
    echo "Installing Homebrew..."
    echo ""
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    # Add Homebrew to PATH for this session (Apple Silicon vs Intel)
    if [ -f "/opt/homebrew/bin/brew" ]; then
        eval "$(/opt/homebrew/bin/brew shellenv)"
    elif [ -f "/usr/local/bin/brew" ]; then
        eval "$(/usr/local/bin/brew shellenv)"
    fi
    echo ""
    echo "✅ Homebrew installed"
else
    echo "✅ Homebrew is installed"
fi

# Step 2: Check/Install Node.js
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    brew install node
    echo ""
    echo "✅ Node.js installed"
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js is installed ($NODE_VERSION)"

NPM_VERSION=$(npm -v)
echo "✅ npm is installed ($NPM_VERSION)"
echo ""

# Step 3: Check/Install Claude Code
echo "Checking for Claude Code..."
echo ""

if command -v claude &> /dev/null; then
    echo "✅ Claude Code is already installed"
else
    echo "Installing Claude Code..."
    echo "(This may take a moment)"
    echo ""

    # Install via native installer
    curl -fsSL https://claude.ai/install.sh | bash

    # Source the updated PATH
    export PATH="$HOME/.local/bin:$PATH"

    if command -v claude &> /dev/null; then
        echo ""
        echo "✅ Claude Code installed successfully!"
    else
        echo ""
        echo "⚠️  Almost done! Claude Code was installed but needs a terminal restart."
        echo ""
        echo "Please:"
        echo "  1. Close this window"
        echo "  2. Double-click this file again from: $INSTALL_DIR"
        echo ""
        echo "Press Enter to close..."
        read
        exit 1
    fi
fi

echo ""

# Step 4: Configure NPM token via Vault
echo "Checking NPM token..."
echo ""

NPMRC_FILE="$INSTALL_DIR/.npmrc"

if [ -f "$NPMRC_FILE" ] && grep -q "packagecloud.io/bamboohr" "$NPMRC_FILE" && ! grep -q '${NPM_TOKEN}' "$NPMRC_FILE"; then
    echo "✅ NPM token already configured"
else
    echo "Need to fetch NPM token from Vault."
    echo ""

    # Check for Vault CLI, install if missing
    if ! command -v vault &> /dev/null; then
        echo "Installing Vault CLI..."
        brew install vault
        echo "✅ Vault CLI installed"
    else
        echo "✅ Vault CLI is installed"
    fi
    echo ""
    echo "A browser window will open - sign in with Okta."
    echo ""

    # Login to Vault
    if vault login -method=oidc -path=okta -address="https://vault.bamboohr.io"; then
        echo ""
        echo "✅ Logged in to Vault"
        echo ""

        # Fetch the token
        NPM_TOKEN=$(vault kv get -field=NPM_TOKEN -address="https://vault.bamboohr.io" shared-product-development/builder 2>/dev/null)

        if [ -n "$NPM_TOKEN" ]; then
            cat > "$NPMRC_FILE" <<EOF
@bamboohr:registry=https://packagecloud.io/bamboohr/npm/npm/
//packagecloud.io/bamboohr/npm/npm/:_authToken=$NPM_TOKEN
EOF
            echo "✅ NPM token configured!"
        else
            echo "❌ Couldn't fetch the token."
            echo ""
            echo "You can get it manually from:"
            echo "https://vault.bamboohr.io/ui/vault/secrets/shared-product-development/show/builder"
            echo ""
            echo "Press Enter to continue anyway..."
            read
        fi
    else
        echo ""
        echo "❌ Vault login failed."
        echo ""
        echo "You can get the token manually from:"
        echo "https://vault.bamboohr.io/ui/vault/secrets/shared-product-development/show/builder"
        echo ""
        echo "Press Enter to continue anyway..."
        read
    fi
fi

echo ""

# Step 5: Install dependencies
echo "Installing project dependencies..."
echo "(This may take a minute or two)"
echo ""

cd "$INSTALL_DIR"

set +e
if npm install; then
    echo ""
    echo "✅ Dependencies installed!"
    echo ""

    # Remove macOS quarantine flags from native binaries (Gatekeeper fix)
    echo "Finalizing setup..."
    xattr -rd com.apple.quarantine node_modules 2>/dev/null || true
    echo "✅ Setup finalized!"
else
    echo ""
    echo "⚠️  Dependency installation failed."
    echo "   This is usually a token issue. Claude Code can help fix it."
fi
set -e

echo ""

# Step 6: Launch Claude Code
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Launching Claude Code..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Claude Code will now open. When it does:"
echo ""
echo "  1. Sign in with your Anthropic account (first time only)"
echo "  2. Type:  /local-builder-setup"
echo "  3. Press Enter"
echo ""
echo "This will verify everything is working!"
echo ""
echo "Press Enter to launch Claude Code..."
read

claude
