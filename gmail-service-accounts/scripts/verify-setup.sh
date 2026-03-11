#!/bin/bash
# verify-setup.sh - Comprehensive Gmail service account verification

set -e

echo "🔍 GMAIL SERVICE ACCOUNT VERIFICATION"
echo "===================================="

# Check if gog is installed
if ! command -v gog &> /dev/null; then
    echo "❌ gog CLI not found. Install with: go install github.com/ssttevee/go-google-cli/cmd/gog@latest"
    exit 1
fi

echo "✅ gog CLI found: $(which gog)"

# List all configured accounts
echo ""
echo "📋 CONFIGURED ACCOUNTS:"
gog auth list

echo ""
echo "🧹 CONFIGURATION FILES:"
ls -la ~/.config/gogcli/sa-*.json 2>/dev/null | wc -l | xargs echo "Service account files:"
ls ~/.config/gogcli/sa-*.json 2>/dev/null || echo "No service account files found"

echo ""
echo "🔍 POTENTIAL ISSUES:"

# Check for mixed configurations
oauth_count=$(gog auth list | grep -c "oauth" || true)
sa_count=$(gog auth list | grep -c "service-account" || true)

if [ "$oauth_count" -gt 0 ] && [ "$sa_count" -gt 0 ]; then
    echo "⚠️  Mixed OAuth + Service Account configurations detected"
    echo "   Consider removing OAuth configurations for consistency"
fi

# Check for duplicate domains
echo ""
echo "📊 DOMAIN ANALYSIS:"
domains=$(gog auth list | awk '{print $1}' | grep '@' | cut -d'@' -f2 | sort | uniq -c | sort -nr)
echo "$domains"

duplicate_domains=$(echo "$domains" | awk '$1 > 1 {print $2}')
if [ -n "$duplicate_domains" ]; then
    echo "⚠️  Multiple accounts for same domain(s): $duplicate_domains"
    echo "   This may cause confusion about which account to use"
fi

echo ""
echo "🧪 TESTING BASIC GMAIL ACCESS:"

# Test each service account
gog auth list | grep service-account | awk '{print $1}' | while read account; do
    echo -n "Testing $account: "
    if timeout 10 gog gmail search 'newer_than:7d' --account "$account" --max 1 > /dev/null 2>&1; then
        echo "✅ OK"
    else
        echo "❌ FAILED"
    fi
done

echo ""
echo "🎯 VERIFICATION COMPLETE"
echo ""
echo "💡 USAGE REMINDER:"
echo "Always use --account parameter:"
echo "gog gmail send [...] --account your@domain.com"