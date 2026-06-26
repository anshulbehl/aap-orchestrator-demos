# Disk Demo 101: Threshold Routing

Check disk usage. Switch on how full the filesystem is. Three paths — not success/fail.

```
Check disk usage
       |
  Switch on %
       |
-------------------------
<80%     80-95%     >95%
  |         |          |
 Notify    Cleanup   Extend volume
 (ok)      logs      or page admin
```

## What you need

- AAP 2.7+ with Automation Orchestrator
- One RHEL host AAP can reach

## Setup

**1. Register four job templates** from `aap/playbooks/`:

| Job template | Playbook |
|---|---|
| Check Disk Usage | `check_disk.yml` |
| Remediate Disk Cleanup | `remediate_disk_cleanup.yml` |
| Remediate Disk Escalate | `remediate_disk_escalate.yml` |
| Notify Team | `notify_chatroom.yml` |

Use `inventory/hosts.yml` for the target host.

**2. Import the workflow** — `ao/disk-demo-101-manual.json` into Orchestrator. Open each AAP job node and set `job_template_id` to the matching job template in your Controller (IDs are environment-specific; `1` is a placeholder).

**3. Launch** from the AO UI. Default input is `disk_mount=/`.

## Switch routing

| `disk_tier` | Use % | Action |
|---|---|---|
| `ok` | < 80% | No action — notify only |
| `warn` | 80–95% | Clean package cache and old logs |
| `critical` | > 95% | Extend volume or page admin |

The check playbook publishes `disk_tier` via `set_stats`. The switch node reads it — no nested success/failure nodes.

## Try each branch

```bash
./test/show_disk_tier.sh        # see current tier
./test/fill_disk.sh 85          # trigger warn
./test/fill_disk.sh 96          # trigger critical
```
