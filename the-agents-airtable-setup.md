# THE AGENTS - AIRTABLE CRM SETUP

## Base: "The Agents Sales Pipeline"

### Table 1: LEADS
**Fields:**
- Company Name (Single line text) - PRIMARY
- Website (URL)
- Industry (Select: SaaS, E-commerce, Agency, Traditional Business)
- Employee Count (Number)
- Location (Single line text)
- Lead Score (Number: 0-100)
- Status (Select: Research, Outreach, Responded, Demo, Proposal, Won, Lost)
- Source (Select: Web Research, LinkedIn, Referral, Inbound)
- Contact Email (Email)
- Contact Name (Single line text)
- Contact Title (Single line text)
- LinkedIn URL (URL)
- Pain Points (Long text)
- Notes (Long text)
- Created Date (Created time)
- Last Activity (Date)

### Table 2: ACTIVITIES
**Fields:**
- Lead (Link to Leads table)
- Activity Type (Select: Email Sent, Email Received, Call, Demo, Meeting)
- Date (Date)
- Subject (Single line text)
- Content (Long text)
- Response Received (Checkbox)
- Next Action (Single line text)
- Assigned To (Select: SalesBot, Wally)

### Table 3: EMAIL TEMPLATES
**Fields:**
- Template Name (Single line text) - PRIMARY
- Use Case (Select: Initial Outreach, Follow Up, Value Add, Break Up)
- Subject Line (Single line text)
- Email Body (Long text)
- Target Segment (Select: SaaS, E-commerce, Agency, Traditional)
- Performance (Number: 0-100)
- Last Updated (Last modified time)

### Table 4: CAMPAIGNS
**Fields:**
- Campaign Name (Single line text) - PRIMARY
- Start Date (Date)
- End Date (Date)
- Target Segment (Select: SaaS, E-commerce, Agency, Traditional)
- Email Template (Link to Email Templates)
- Leads Targeted (Number)
- Response Rate (Percent)
- Demos Booked (Number)
- Status (Select: Planning, Active, Paused, Completed)

## Views to Create:

**LEADS Table Views:**
- Hot Prospects (Score > 70, Status = Research/Outreach)
- Active Pipeline (Status = Responded/Demo/Proposal)
- Need Follow Up (Last Activity > 7 days ago)
- By Industry (Group by Industry)

**ACTIVITIES Table Views:**
- This Week (Date = Current week)
- Pending Responses (Response Received = False)
- By Lead (Group by Lead)

**Templates Performance:**
- Best Performers (Sort by Performance DESC)
- By Use Case (Group by Use Case)