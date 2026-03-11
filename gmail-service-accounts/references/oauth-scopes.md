# OAuth Scopes Reference

Complete reference for Google Workspace OAuth scopes used with Gmail service accounts.

## Complete Scope List

Copy this exact scope list for domain-wide delegation configuration:

```
https://www.googleapis.com/auth/gmail.modify,https://www.googleapis.com/auth/gmail.settings.basic,https://www.googleapis.com/auth/gmail.settings.sharing,https://www.googleapis.com/auth/calendar,https://www.googleapis.com/auth/drive,https://www.googleapis.com/auth/documents,https://www.googleapis.com/auth/presentations,https://www.googleapis.com/auth/spreadsheets,https://www.googleapis.com/auth/contacts,https://www.googleapis.com/auth/contacts.other.readonly,https://www.googleapis.com/auth/directory.readonly,https://www.googleapis.com/auth/tasks,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/userinfo.profile
```

**Important:** Use commas without spaces between scopes when entering in Google Workspace Admin Console.

## Scope Breakdown

### Gmail Scopes

**`https://www.googleapis.com/auth/gmail.modify`**
- **Purpose:** Read, send, delete, and manage email messages and threads
- **Required for:** All Gmail operations (read, send, delete, search)
- **Critical:** This is the primary Gmail scope

**`https://www.googleapis.com/auth/gmail.settings.basic`**
- **Purpose:** Manage basic Gmail settings (vacation responder, signature)
- **Required for:** Advanced Gmail configuration

**`https://www.googleapis.com/auth/gmail.settings.sharing`**
- **Purpose:** Manage Gmail sharing settings and delegates
- **Required for:** Delegation management

### Google Workspace Scopes

**`https://www.googleapis.com/auth/calendar`**
- **Purpose:** Full access to Calendar (read, create, modify events)
- **Required for:** Calendar integration, scheduling

**`https://www.googleapis.com/auth/drive`**
- **Purpose:** Full access to Google Drive (read, write, create files)
- **Required for:** File operations, document management

**`https://www.googleapis.com/auth/documents`**
- **Purpose:** Access to Google Docs (create, edit documents)
- **Required for:** Document automation

**`https://www.googleapis.com/auth/presentations`**  
- **Purpose:** Access to Google Slides (create, edit presentations)
- **Required for:** Presentation automation

**`https://www.googleapis.com/auth/spreadsheets`**
- **Purpose:** Access to Google Sheets (create, edit spreadsheets)
- **Required for:** Data processing, reporting

**`https://www.googleapis.com/auth/contacts`**
- **Purpose:** Full access to contacts (read, write, delete)
- **Required for:** Contact management

**`https://www.googleapis.com/auth/contacts.other.readonly`**
- **Purpose:** Read-only access to other contacts and profile info
- **Required for:** Extended contact visibility

### Directory & User Scopes

**`https://www.googleapis.com/auth/directory.readonly`**
- **Purpose:** Read-only access to directory data (users, groups, etc.)
- **Required for:** User lookups, organizational data

**`https://www.googleapis.com/auth/userinfo.email`**
- **Purpose:** Access to user's email address
- **Required for:** Identity verification

**`https://www.googleapis.com/auth/userinfo.profile`**
- **Purpose:** Access to basic profile information
- **Required for:** User context

**`https://www.googleapis.com/auth/tasks`**
- **Purpose:** Access to Google Tasks (create, manage tasks)
- **Required for:** Task automation

## Minimal Scope Sets

For specific use cases, you can use reduced scope sets:

### Gmail-Only Configuration
```
https://www.googleapis.com/auth/gmail.modify,https://www.googleapis.com/auth/userinfo.email
```

### Gmail + Calendar
```
https://www.googleapis.com/auth/gmail.modify,https://www.googleapis.com/auth/calendar,https://www.googleapis.com/auth/userinfo.email
```

### Gmail + Drive + Docs
```
https://www.googleapis.com/auth/gmail.modify,https://www.googleapis.com/auth/drive,https://www.googleapis.com/auth/documents,https://www.googleapis.com/auth/spreadsheets,https://www.googleapis.com/auth/userinfo.email
```

## Common Scope Errors

**Missing `gmail.modify`:**
- Error: "Insufficient permissions for Gmail operations"
- Fix: Always include `gmail.modify` for any Gmail access

**Missing `userinfo.email`:**
- Error: "Cannot identify user"  
- Fix: Include `userinfo.email` for identity context

**Typos in scope URLs:**
- Error: "Invalid scope"
- Fix: Copy exact URLs from this reference

**Spaces in scope list:**
- Error: "Malformed scope list"
- Fix: Use commas without spaces: `scope1,scope2,scope3`

## Security Considerations

**Principle of Least Privilege:**
- Use minimal scopes for your specific use case
- Regularly audit granted scopes
- Remove unused scopes

**Scope Expansion:**
- Adding scopes requires updating domain-wide delegation
- Changes may take 5-10 minutes to propagate
- Test scope changes in development first

## Verification

After configuring scopes, verify with:

```bash
# Test Gmail access
gog gmail search 'newer_than:1d' --account user@domain.com --max 1

# Test Calendar access  
gog calendar list --account user@domain.com

# Test Drive access
gog drive list --account user@domain.com
```

## Reference Links

- [Gmail API Scopes](https://developers.google.com/gmail/api/auth/scopes)
- [Google Workspace Admin SDK Scopes](https://developers.google.com/admin-sdk/directory/v1/guides/authorizing)
- [Google Drive API Scopes](https://developers.google.com/drive/api/v3/about-auth)
- [Calendar API Scopes](https://developers.google.com/calendar/api/auth)