# Gmail Service Account Troubleshooting

Comprehensive guide for diagnosing and fixing common Gmail service account issues.

## Error: "Invalid email or User ID"

**Symptoms:**
```
Get "https://gmail.googleapis.com/gmail/v1/users/me/threads": oauth2: cannot fetch token: 400 Bad Request
Response: {
  "error": "invalid_grant", 
  "error_description": "Invalid email or User ID"
}
```

**Root Cause:** The email address doesn't exist in the Google Workspace domain.

**Solutions:**
1. **Verify user exists** in Google Workspace Admin Console
2. **Create user** if needed: admin.google.com → Users → Add new user
3. **Check domain spelling** - common mistakes:
   - `@agents.wtf` vs `@theagents.wtf`
   - `@company.com` vs `@company-domain.com`

**Quick Check:**
```bash
# List all users in domain (requires domain admin)
gog directory users list --account admin@yourdomain.com
```

---

## Error: "violates constraint iam.disableServiceAccountKeyCreation"

**Symptoms:**
- Cannot create service account keys in Google Cloud Console
- Error when clicking "ADD KEY" button
- Organization policy blocking key creation

**Root Cause:** Google Cloud organization has security policies preventing service account key creation.

**Solution:**
1. **Google Cloud Console → Security → Organization policies**
2. **Find:** "Disable service account key creation"
3. **Click policy → Override parent's policy → Off → Set policy**
4. **Retry** creating service account key

**Note:** Requires Organization Policy Administrator role.

---

## Error: "insufficient permission" or "access_denied"

**Symptoms:**
```
Error: insufficient permission  
Error: access_denied
```

**Root Cause:** Service account not properly configured for domain-wide delegation or missing scopes.

**Solutions:**
1. **Verify domain-wide delegation is enabled** on service account
2. **Check Google Workspace Admin configuration:**
   - admin.google.com → Security → API controls → Domain-wide delegation
   - Verify Client ID matches service account Client ID
   - Verify scopes are complete (see oauth-scopes.md)
3. **Re-add client** if needed with complete scope list

---

## OAuth Timeouts Still Occurring

**Symptoms:**
- "context deadline exceeded" errors
- Browser-based OAuth prompts appearing
- Timeouts during automated operations

**Root Cause:** Still using OAuth instead of service account method.

**Solutions:**
1. **Clean OAuth configurations:**
   ```bash
   # Remove OAuth tokens
   find ~/.config/gogcli/keyring/ -name "*oauth*" -delete
   ```

2. **Verify service account setup:**
   ```bash
   gog auth list
   # Should show "service-account" type, not "oauth"
   ```

3. **Always specify --account parameter:**
   ```bash
   gog gmail send [...] --account user@domain.com
   ```

---

## Configuration Conflicts Between Agents

**Symptoms:**
- Emails sent from wrong account
- Unexpected sender addresses
- Mixed authentication methods

**Root Cause:** Multiple agents sharing gog configuration, mixed OAuth/service account setups.

**Solutions:**
1. **Use separate service account files per domain:**
   ```
   domain1-service-account.json → user@domain1.com
   domain2-service-account.json → user@domain2.com
   ```

2. **Clean duplicate configurations:**
   ```bash
   # Check for conflicts
   gog auth list | sort
   
   # Remove duplicates
   gog auth remove duplicate@domain.com --force
   ```

3. **Domain separation strategy:**
   - One service account per Google Workspace domain
   - Never mix domains in same service account
   - Use descriptive service account names

---

## Wrong Email Sender

**Symptoms:**
- Emails appear to come from different agent than expected
- Agent A sending emails as Agent B
- Confusion about message source

**Root Cause:** Not specifying `--account` parameter, causing gog to use default account.

**Solution:**
**ALWAYS specify --account parameter:**
```bash
# ✅ CORRECT
gog gmail send --to recipient@example.com --subject "Test" --body "Message" --account sender@domain.com

# ❌ WRONG - Uses default account
gog gmail send --to recipient@example.com --subject "Test" --body "Message"
```

**Find default account:**
```bash
gog auth list | head -1  # First account is default
```

---

## Service Account Key Not Working After Creation

**Symptoms:**
- JSON key downloads successfully
- Configuration appears correct
- Still getting authentication errors

**Root Cause:** Domain-wide delegation not properly configured or propagation delay.

**Solutions:**
1. **Wait 5-10 minutes** for Google's systems to propagate changes
2. **Verify Client ID matches exactly:**
   ```bash
   # From service account JSON
   cat service-account.json | grep client_id
   
   # Should match exactly in Google Workspace Admin
   ```
3. **Check OAuth scopes are complete** (see oauth-scopes.md)
4. **Verify Gmail API is enabled** in Google Cloud Console

---

## Multiple Domains Not Working

**Symptoms:**
- First domain works fine
- Additional domains fail with authentication errors
- Mixed success rates

**Root Cause:** Using single service account across multiple domains (not supported).

**Solution:**
**Create separate service accounts per domain:**

1. **Domain A:**
   - Service account in Google Cloud project
   - Domain-wide delegation in Workspace Admin for Domain A
   - Configure: `gog auth service-account set user@domainA.com --key domainA.json`

2. **Domain B:**
   - **Separate** service account (can be same project)
   - Domain-wide delegation in Workspace Admin for Domain B  
   - Configure: `gog auth service-account set user@domainB.com --key domainB.json`

---

## Diagnostic Commands

**Check current configuration:**
```bash
gog auth list
ls ~/.config/gogcli/sa-*.json
```

**Test basic access:**
```bash
gog gmail search 'newer_than:1d' --account user@domain.com --max 3
```

**Verify service account details:**
```bash
cat ~/.config/gogcli/sa-*.json | grep -E '"client_id"|"client_email"'
```

**Clean slate reset:**
```bash
# Backup first!
cp -r ~/.config/gogcli ~/.config/gogcli.backup

# Reset configurations
rm -rf ~/.config/gogcli/keyring/*
rm -f ~/.config/gogcli/sa-*.json
```

---

## Prevention Best Practices

1. **One service account per Google Workspace domain**
2. **Always use --account parameter**  
3. **Test configuration immediately after setup**
4. **Document working Client IDs and scope configurations**
5. **Regular verification with scripts/verify-setup.sh**
6. **Keep service account JSON files secure and backed up**

---

## Emergency Recovery

If everything breaks:

1. **Backup configurations:**
   ```bash
   cp -r ~/.config/gogcli ~/.config/gogcli.backup-$(date +%Y%m%d)
   ```

2. **Use working example:**
   Start with known working domain, replicate exact steps for new domains

3. **Step-by-step verification:**
   - Google Cloud: Service account exists + domain-wide delegation enabled
   - Google Workspace: Client ID + scopes configured  
   - Local: `gog auth service-account set` with correct JSON
   - Test: Simple gmail search

4. **Contact support:**
   Include output from `scripts/verify-setup.sh` and error messages