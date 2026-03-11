# Google Cloud Organization Policies

Guide for configuring Google Cloud organization policies that affect service account key creation.

## Overview

Google Cloud organizations often implement security policies that restrict service account key creation. This guide covers identifying, understanding, and resolving these policy constraints.

## Policy: "Disable service account key creation"

### Constraint Names
- **New constraint:** `iam.managed.disableServiceAccountKeyCreation`
- **Legacy constraint:** `iam.disableServiceAccountKeyCreation`

Both may be active simultaneously, requiring separate resolution.

### Common Error Messages

```
This request violates constraint iam.disableServiceAccountKeyCreation set on resource projects/PROJECT-ID by an Organization Policy Administrator.
```

```
The organization policy prevents service account key creation for this project.
```

## Resolution Steps

### Step 1: Navigate to Organization Policies

1. **Google Cloud Console → Security → Organization policies**
2. **Search:** "service account key" or "iam.disableServiceAccountKeyCreation"
3. **Look for:** Both legacy and new constraint versions

### Step 2: Check Policy Status

**Policy Status Indicators:**
- ✅ **"Not enforced"** - Policy allows key creation
- ❌ **"Enforced"** - Policy blocks key creation  
- ⚠️ **"Inherit parent's policy"** - Using organization-level setting

**Legacy Constraint Warning:**
If you see a blue notice about "legacy constraint," click "View legacy constraint" to check its status separately.

### Step 3: Override Parent Policy

**For Project-Level Override:**
1. **Click the constraint** you need to modify
2. **Select:** "Override parent's policy"
3. **Choose:** "Off" (to allow service account key creation)
4. **Click:** "Set policy"

**For Organization-Level Change:**
1. **Requires Organization Policy Administrator role**
2. **Navigate to organization-level policies**
3. **Same process:** Override → Off → Set policy

### Step 4: Wait for Propagation

- **Policy changes** take 5-10 minutes to propagate
- **Clear browser cache** or use incognito mode
- **Test key creation** after waiting period

## Policy Inheritance Hierarchy

```
Organization Level
├── Folder Level (optional)
│   └── Project Level
└── Project Level (direct)
```

**Inheritance Rules:**
- Child policies can **restrict further** but cannot **relax** parent policies
- To allow what parent forbids, must override at parent level or higher
- Project-level override only works if organization allows it

## Multiple Policy Types

### Legacy vs New Constraints

**Legacy Constraint:** `iam.disableServiceAccountKeyCreation`
- Older policy system
- May still be active even if new constraints exist
- Must be disabled separately

**New Constraint:** `iam.managed.disableServiceAccountKeyCreation`  
- Current policy system
- More granular controls
- Preferred for new implementations

**Resolution Strategy:**
1. Check both constraint types
2. Disable legacy constraint first
3. Configure new constraint as needed
4. Verify both show "Not enforced"

## Common Scenarios

### Scenario 1: Organization Allows, Project Restricts
- **Organization:** Not enforced
- **Project:** Enforced
- **Solution:** Override at project level

### Scenario 2: Organization Restricts Everything  
- **Organization:** Enforced
- **Project:** Inherit (blocked)
- **Solution:** Must override at organization level (requires admin)

### Scenario 3: Mixed Legacy/New Policies
- **Legacy:** Enforced  
- **New:** Not enforced
- **Result:** Still blocked by legacy
- **Solution:** Disable legacy constraint

### Scenario 4: Folder-Level Restrictions
- **Organization:** Not enforced
- **Folder:** Enforced  
- **Project:** Inherit (blocked)
- **Solution:** Override at folder level or move project

## Troubleshooting

### Error: "Cannot override parent policy"
**Cause:** Parent policy explicitly prevents overrides
**Solution:** Must change policy at parent level or higher

### Error: Policy change not taking effect
**Causes:**
- Browser cache showing old state
- Policy propagation delay (up to 10 minutes)
- Wrong constraint type modified

**Solutions:**
- Wait 10 minutes and retry
- Use incognito browser window
- Check both legacy and new constraints
- Verify correct policy level (org/folder/project)

### Error: "Insufficient permissions"
**Cause:** User lacks Organization Policy Administrator role
**Solutions:**
- Request role from organization admin
- Ask admin to make policy change
- Use alternative authentication method (OAuth individual)

## Verification

### Check Policy Status
```bash
# List all organization policies for project
gcloud org-policies list --project=PROJECT-ID

# Describe specific constraint
gcloud org-policies describe iam.disableServiceAccountKeyCreation --project=PROJECT-ID
```

### Test Key Creation
After policy changes:
1. **Wait 5-10 minutes**
2. **Clear browser cache**
3. **Navigate to Service Accounts → [service account] → Keys**
4. **Click "ADD KEY" → "Create new key"**
5. **Should work without constraint error**

## Security Best Practices

### Alternative Approaches

**If Organization Policies Cannot Be Changed:**
1. **Use OAuth individual authentication** (less stable)
2. **Request exception** for specific projects
3. **Use external identity providers** (Workload Identity Federation)

### Least Privilege Configuration

**Instead of completely disabling constraint:**
1. **Allow for specific projects only**
2. **Set expiration on policy exceptions**
3. **Monitor service account key usage**
4. **Regular audit of created keys**

### Policy Documentation

**Document policy changes:**
- Why exception was needed
- Which projects affected  
- Approval process followed
- Review/expiration dates

## Reference

- [Organization Policy Constraints](https://cloud.google.com/resource-manager/docs/organization-policy/org-policy-constraints)
- [IAM Conditions](https://cloud.google.com/iam/docs/conditions-overview)
- [Service Account Best Practices](https://cloud.google.com/iam/docs/best-practices-for-using-service-accounts)