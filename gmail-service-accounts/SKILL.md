---
name: gmail-service-accounts
description: Configure stable Gmail access for multiple agents using service accounts with domain-wide delegation. Eliminates OAuth timeout issues and provides enterprise-grade email automation. Use when setting up Gmail access for AI agents, resolving OAuth timeouts, or configuring multi-domain email systems.
---

# Gmail Service Accounts for AI Agents

Comprehensive solution for configuring stable, timeout-free Gmail access across multiple AI agents using Google Workspace service accounts with domain-wide delegation.

## Overview

This skill replaces problematic OAuth flows with enterprise service accounts, eliminating the "context deadline exceeded" and timeout errors that plague automated Gmail access.

**Problem Solved:** OAuth timeout errors, configuration conflicts, unreliable email automation  
**Solution:** Domain-wide service accounts with proper separation by domain  
**Result:** 100% stable Gmail access for all agents without browser dependencies

## Architecture

### Domain Separation Strategy
- **One service account per Google Workspace domain**
- **Clean separation** between different organizational domains
- **No cross-domain interference** or configuration conflicts

Example setup:
```
@company.com domain → Service Account A
@sales-team.com domain → Service Account B  
@subsidiario.com domain → Service Account C
```

### Agent Configuration
Each agent gets specific account access:
```bash
gog auth service-account set agent@domain.com --key service-account.json
# Usage: gog gmail send [...] --account agent@domain.com
```

## Quick Setup (TL;DR)

1. **Google Cloud Console:** Create service account + enable domain-wide delegation
2. **Download JSON key** (requires org policy adjustment if blocked)
3. **Google Workspace Admin:** Add client ID + OAuth scopes to domain-wide delegation
4. **Configure agent:** `gog auth service-account set user@domain.com --key file.json`
5. **Test:** `gog gmail search 'newer_than:1d' --account user@domain.com`

## Detailed Implementation

### Step 1: Google Cloud Console Setup

1. **Create Project** (or use existing)
2. **Enable Gmail API** in API Library
3. **IAM & Admin → Service Accounts → Create Service Account**
   - Name: descriptive (e.g., "company-gmail-agents")
   - Description: "Service account for AI agent Gmail access"
4. **Edit service account → Enable Google Workspace Domain-wide Delegation**
5. **Keys tab → ADD KEY → Create new key → JSON → Download**

**⚠️ Organization Policy Issue?**
If you see "violates constraint iam.disableServiceAccountKeyCreation":
- **Security → Organization policies** 
- **Find "Disable service account key creation"**
- **Override parent's policy → Off → Set policy**

### Step 2: Google Workspace Admin Configuration

1. **Go to admin.google.com** (with domain admin account)
2. **Security → API controls → Domain-wide delegation**
3. **Add new client** with:
   - **Client ID:** (from service account, 21-digit number)
   - **OAuth scopes:**
     ```
     https://www.googleapis.com/auth/gmail.modify,https://www.googleapis.com/auth/gmail.settings.basic,https://www.googleapis.com/auth/gmail.settings.sharing,https://www.googleapis.com/auth/calendar,https://www.googleapis.com/auth/drive,https://www.googleapis.com/auth/documents,https://www.googleapis.com/auth/presentations,https://www.googleapis.com/auth/spreadsheets,https://www.googleapis.com/auth/contacts,https://www.googleapis.com/auth/contacts.other.readonly,https://www.googleapis.com/auth/directory.readonly,https://www.googleapis.com/auth/tasks,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/userinfo.profile
     ```

### Step 3: Agent Configuration

```bash
# Configure service account for specific user
gog auth service-account set username@domain.com --key service-account.json

# Verify configuration
gog auth list

# Test access  
gog gmail search 'newer_than:1d' --account username@domain.com --max 3
```

### Step 4: Usage Rules

**CRITICAL:** Always specify `--account` parameter:
```bash
# ✅ CORRECT
gog gmail send --to recipient@example.com --subject "Test" --body "Message" --account user@domain.com

# ❌ WRONG (may use wrong account)
gog gmail send --to recipient@example.com --subject "Test" --body "Message"
```

## Multi-Domain Setup

For organizations with multiple domains:

### Domain A Configuration
1. Service account in Google Cloud project for Domain A
2. Domain-wide delegation in Google Workspace Admin for Domain A
3. Configure agents: `gog auth service-account set agent@domainA.com --key domainA.json`

### Domain B Configuration  
1. **Separate** service account in Google Cloud project for Domain B
2. Domain-wide delegation in Google Workspace Admin for Domain B
3. Configure agents: `gog auth service-account set agent@domainB.com --key domainB.json`

**Result:** Complete isolation between domains, no configuration conflicts.

## Verification & Maintenance

### Check Agent Configurations
```bash
gog auth list
# Should show only the accounts you expect, with service-account type
```

### Clean Problematic Configurations
```bash
# Remove misconfigured accounts
gog auth remove problematic@domain.com --force

# Or delete service account files directly
rm ~/.config/gogcli/sa-*.json
```

### Test Email Sending
```bash
gog gmail send --to test@domain.com --subject "Service Account Test" --body "Testing stable Gmail access" --account configured@domain.com
```

## Troubleshooting

**Common Issues:**
- **"Invalid email or User ID"** → User doesn't exist in Google Workspace
- **"Invalid grant"** → Service account not authorized in domain-wide delegation
- **OAuth timeouts** → Still using OAuth instead of service account
- **Wrong sender** → Not using `--account` parameter

**Configuration Conflicts:**
- Multiple service account files for same domain
- Mixed OAuth + service account configurations  
- Default account fallback to wrong user

**See references/troubleshooting.md for detailed solutions.**

## Scripts

- **scripts/verify-setup.sh** - Comprehensive configuration verification
- **scripts/clean-configs.sh** - Remove problematic gog configurations
- **scripts/test-domains.sh** - Test all configured service accounts

## References

- **references/troubleshooting.md** - Detailed error solutions and debugging
- **references/oauth-scopes.md** - Complete scope definitions and explanations
- **references/organization-policies.md** - Google Cloud org policy configuration

## Professional Email Branding

### Display Name Configuration

**Limitation:** Gmail uses Google Workspace Directory display name for sender field.  
**Workaround:** Professional signature for branding.

```bash
# Configure professional signature
gog gmail settings sendas update user@domain.com \
  --display-name "Name - Company" \
  --signature "<div style='font-family: Arial, sans-serif; color: #333; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 15px;'>
<strong>Name - Company</strong> 🚀<br>
<em>Role/Title</em><br>
<span style='color: #666; font-size: 12px;'>email@domain.com | Company Name</span>
</div>" \
  --account user@domain.com
```

**Result:** Professional signature appears in all sent emails with proper branding.

## Benefits

✅ **No timeouts** - Service accounts eliminate OAuth browser dependencies  
✅ **Reliable automation** - No token refresh issues or user intervention needed  
✅ **Enterprise security** - Domain administrators control access via delegation  
✅ **Clean separation** - Multiple domains without configuration conflicts  
✅ **Professional branding** - HTML signatures for consistent email appearance  
✅ **Production ready** - Stable for automated monitoring and email processing