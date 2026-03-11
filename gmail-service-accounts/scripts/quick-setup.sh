#!/bin/bash
# quick-setup.sh - Interactive setup for Gmail service accounts

set -e

echo "🚀 GMAIL SERVICE ACCOUNT QUICK SETUP"
echo "===================================="

# Check prerequisites
if ! command -v gog &> /dev/null; then
    echo "❌ gog CLI not found"
    echo "Install with: go install github.com/ssttevee/go-google-cli/cmd/gog@latest"
    exit 1
fi

echo "✅ gog CLI found"
echo ""

# Get user input
read -p "📧 Enter email address for agent (e.g., agent@company.com): " email
read -p "📄 Path to service account JSON file: " json_file

# Validate inputs
if [[ ! "$email" =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
    echo "❌ Invalid email format"
    exit 1
fi

if [[ ! -f "$json_file" ]]; then
    echo "❌ Service account JSON file not found: $json_file"
    exit 1
fi

# Extract domain
domain=$(echo "$email" | cut -d'@' -f2)
echo ""
echo "🏢 Detected domain: $domain"

# Check if JSON is valid
if ! python3 -m json.tool "$json_file" > /dev/null 2>&1; then
    echo "❌ Invalid JSON file format"
    exit 1
fi

# Extract client ID for reference
client_id=$(cat "$json_file" | python3 -c "import sys, json; print(json.load(sys.stdin)['client_id'])" 2>/dev/null || echo "Not found")
echo "🔑 Service account client ID: $client_id"

echo ""
echo "⚙️  CONFIGURATION STEPS:"
echo ""

# Step 1: Configure gog
echo "1️⃣  Configuring gog..."
if gog auth service-account set "$email" --key "$json_file"; then
    echo "✅ gog configured successfully"
else
    echo "❌ gog configuration failed"
    exit 1
fi

# Step 2: Test basic connectivity
echo ""
echo "2️⃣  Testing connectivity..."
if timeout 15 gog gmail search 'newer_than:7d' --account "$email" --max 1 > /dev/null 2>&1; then
    echo "✅ Gmail access working!"
else
    echo "❌ Gmail access failed"
    echo ""
    echo "🔧 TROUBLESHOOTING CHECKLIST:"
    echo "   □ Service account has domain-wide delegation enabled"
    echo "   □ Google Workspace Admin has client ID: $client_id"
    echo "   □ OAuth scopes configured (see references/oauth-scopes.md)"
    echo "   □ User $email exists in Google Workspace"
    echo "   □ Gmail API enabled in Google Cloud Console"
    echo ""
    echo "Run 'scripts/verify-setup.sh' for detailed diagnosis"
fi

# Step 3: Show usage
echo ""
echo "3️⃣  Usage examples:"
echo ""
echo "📤 Send email:"
echo "gog gmail send --to recipient@example.com --subject 'Hello' --body 'Test message' --account $email"
echo ""
echo "🔍 Search emails:"
echo "gog gmail search 'newer_than:1d' --account $email --max 10"
echo ""
echo "📋 List recent emails:"
echo "gog gmail list --account $email --max 5"

echo ""
echo "✅ SETUP COMPLETE!"
echo ""
echo "🔧 Diagnostic tools:"
echo "   scripts/verify-setup.sh    - Check all configurations"
echo "   scripts/test-domains.sh    - Test all service accounts" 
echo "   scripts/clean-configs.sh   - Clean problematic configs"

echo ""
echo "⚠️  IMPORTANT: Always use --account $email parameter in commands!"