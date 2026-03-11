#!/bin/bash
# test-domains.sh - Test all configured Gmail service accounts

set -e

echo "🧪 GMAIL SERVICE ACCOUNT TESTING"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if any accounts are configured
if ! gog auth list | grep -q service-account; then
    echo "❌ No service accounts configured"
    echo "Run: gog auth service-account set user@domain.com --key service-account.json"
    exit 1
fi

echo "📋 Testing configured service accounts..."
echo ""

total_accounts=0
successful_tests=0

# Test each service account
gog auth list | grep service-account | while read line; do
    account=$(echo "$line" | awk '{print $1}')
    total_accounts=$((total_accounts + 1))
    
    echo -n "🔍 Testing $account: "
    
    # Test basic Gmail access
    if timeout 15 gog gmail search 'newer_than:7d' --account "$account" --max 1 > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASS${NC}"
        successful_tests=$((successful_tests + 1))
        
        # Get some basic stats
        echo -n "   📊 Recent emails: "
        recent_count=$(timeout 10 gog gmail search 'newer_than:1d' --account "$account" --max 50 2>/dev/null | wc -l || echo "0")
        echo "$recent_count"
        
    else
        echo -e "${RED}❌ FAIL${NC}"
        echo "   🔍 Common causes:"
        echo "      - User doesn't exist in Google Workspace"  
        echo "      - Service account not authorized in domain-wide delegation"
        echo "      - Gmail API not enabled"
    fi
    echo ""
done

# Summary would be printed by the main shell, but subshell variables don't persist
# So we do a second pass for summary
echo "📊 SUMMARY:"
total=$(gog auth list | grep -c service-account)
successful=0

gog auth list | grep service-account | awk '{print $1}' | while read account; do
    if timeout 10 gog gmail search 'newer_than:7d' --account "$account" --max 1 > /dev/null 2>&1; then
        successful=$((successful + 1))
    fi
done

echo "Total accounts: $total"
echo "Working accounts: checking..."

# Do a simple success rate check
echo ""
echo "🎯 QUICK VERIFICATION:"
working=0
total=0
for account in $(gog auth list | grep service-account | awk '{print $1}'); do
    total=$((total + 1))
    if timeout 5 gog gmail search 'newer_than:7d' --account "$account" --max 1 > /dev/null 2>&1; then
        working=$((working + 1))
    fi
done

echo "Working: $working/$total"

if [ "$working" -eq "$total" ] && [ "$total" -gt 0 ]; then
    echo -e "${GREEN}✅ All service accounts working!${NC}"
elif [ "$working" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Some accounts working, some failing${NC}"
else
    echo -e "${RED}❌ No accounts working${NC}"
    echo ""
    echo "🔧 TROUBLESHOOTING STEPS:"
    echo "1. Verify service account has domain-wide delegation enabled"
    echo "2. Check Google Workspace Admin → Security → API controls → Domain-wide delegation"
    echo "3. Ensure client ID and scopes are correctly configured"
    echo "4. Verify user exists in Google Workspace"
fi

echo ""
echo "💡 USAGE REMINDER:"
echo "gog gmail send --to user@example.com --subject 'Test' --body 'Message' --account YOUR@DOMAIN.COM"