# Disk Demo 101 - Setup Guide

## Step-by-step

### 1. Register job templates in AAP

Create four job templates pointing at playbooks in `aap/playbooks/`:

- **Check Disk Usage** → `check_disk.yml`
- **Remediate Disk Continue** → `remediate_disk_continue.yml`
- **Remediate Disk Cleanup** → `remediate_disk_cleanup.yml`
- **Remediate Disk Escalate** → `remediate_disk_escalate.yml`

Use the inventory in `inventory/hosts.yml` and enable **Prompt on launch** for extra vars if you want to override `disk_mount` from AAP directly.

### 2. Import the AO workflow

1. Open Automation Orchestrator
2. Import `ao/disk-demo-101-manual.json`
3. On each **AAP Job Template** node, set `credential_id` to your AAP credential (replace `REPLACE_WITH_AAP_CREDENTIAL_ID`)

### 3. Run the demo

Launch from the AO UI. Default input: `disk_mount=/`.

To exercise each branch on a test host:

```bash
# ok branch — normal usage, under 80%
./test/show_disk_tier.sh

# warn branch — fill disk to ~85% (see test/fill_disk.sh)
./test/fill_disk.sh 85

# critical branch — fill disk above 95%
./test/fill_disk.sh 96
```

### 4. Verify routing

Check the AO execution view. The switch node should route to exactly one remediation path based on `disk_tier` published by the check playbook via `set_stats`.
