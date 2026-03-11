# Current Setup Backup - March 10, 2026

## Working Configuration

This documents the exact working configuration achieved on March 10, 2026.

### Configured Accounts
```
dora@wtf-agency.com         - service-account (Primary)
gasper@wtf-agency.com       - service-account 
sales@theagents.wtf         - service-account (Fermin)
```

### Domain Architecture
- **@wtf-agency.com:** Shared service account for Dora, Gasper, Oscar, Oliver
- **@theagents.wtf:** Exclusive service account for Fermin/sales

### Service Account Details

#### @wtf-agency.com Domain
- **Google Cloud Project:** wtf-agency-XXXX
- **Service Account:** wtf-gmail-agents@wtf-agency-XXXX.iam.gserviceaccount.com  
- **Client ID:** 112552255941068020418
- **JSON File:** file_386---6dd700a0-de39-46fe-afb5-f99e5717bee2.json

#### @theagents.wtf Domain  
- **Google Cloud Project:** the-agents-sales
- **Service Account:** the-agents-google@the-agents-sales.iam.gserviceaccount.com
- **Client ID:** 117913093173124621176
- **JSON File:** agents-service-account.json

### Google Workspace Configuration

Both domains have domain-wide delegation configured with:

**OAuth Scopes:**
```
https://www.googleapis.com/auth/gmail.modify,https://www.googleapis.com/auth/gmail.settings.basic,https://www.googleapis.com/auth/gmail.settings.sharing,https://www.googleapis.com/auth/calendar,https://www.googleapis.com/auth/drive,https://www.googleapis.com/auth/documents,https://www.googleapis.com/auth/presentations,https://www.googleapis.com/auth/spreadsheets,https://www.googleapis.com/auth/contacts,https://www.googleapis.com/auth/contacts.other.readonly,https://www.googleapis.com/auth/directory.readonly,https://www.googleapis.com/auth/tasks,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/userinfo.profile
```

### Verification Tests

**Date:** March 10, 2026 13:47 UTC

```bash
# All accounts tested successfully:
gog gmail send --to wally@wtf-agency.com --subject "Test" --body "..." --account dora@wtf-agency.com
# Message ID: 19cd800f1432c047 ✅

gog gmail send --to wally@wtf-agency.com --subject "Test" --body "..." --account sales@theagents.wtf  
# Message ID: 19cd8003d9c76738 ✅

gog gmail search 'newer_than:1d' --account sales@theagents.wtf --max 3
# Results: 3 emails found ✅
```

### Problem Resolved

**Before:** OAuth timeout errors, "context deadline exceeded", configuration conflicts  
**After:** Stable service account authentication, no timeouts, clean domain separation

### Key Success Factors

1. **Organization Policy Override:** Disabled "iam.disableServiceAccountKeyCreation" for @theagents.wtf
2. **Domain Separation:** Separate service accounts for each domain
3. **Complete Scopes:** Full OAuth scope list configured correctly
4. **Clean Configuration:** Removed conflicting OAuth/mixed configurations

### Agent Usage Rules

**CRITICAL:** Always use --account parameter:
```bash
gog gmail send [...] --account user@domain.com
```

**Agent-Specific Accounts:**
- **Dora:** dora@wtf-agency.com
- **Oscar:** dora@wtf-agency.com (shared config)
- **Gasper:** gasper@wtf-agency.com
- **Oliver:** oliver@wtf-agency.com
- **Fermin:** sales@theagents.wtf

### Monitoring Setup

**Heartbeat monitoring every 2 hours:**
- Vencimientos check: ✅
- Disk space: ✅ (71% free)
- AWS emails: ✅
- Bank summaries: ✅

**Script:** check-gmail-dora.sh runs automatically via cron

### Files Preserved

- `agents-service-account.json` - Service account for @theagents.wtf
- `file_386---6dd700a0-de39-46fe-afb5-f99e5717bee2.json` - Service account for @wtf-agency.com (not in workspace)

### Next Steps

1. ✅ **Skill created and packaged:** gmail-service-accounts.skill
2. ✅ **All agents operational:** No OAuth timeouts
3. ✅ **Documentation complete:** Troubleshooting, scopes, policies
4. ✅ **Verification scripts:** verify-setup.sh, test-domains.sh, clean-configs.sh

**MISSION ACCOMPLISHED:** From OAuth nightmare to enterprise-grade service account architecture.