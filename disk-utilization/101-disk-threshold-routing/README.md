# Disk Demo 101: Threshold Routing

Check disk usage. Switch on how full the filesystem is. Three paths — not success/fail.

```
Check disk usage
       |
  Switch on %
       |
-----------------------------------------
<80%     80-95%     >95%     (default)
  |         |          |          |
Continue   Cleanup   Expand    Fallback
 (ok)      logs      EBS       manual review
```

## What you need

- AAP 2.7+ with Automation Orchestrator
- One RHEL EC2 host AAP can reach
- AWS credentials on the execution environment for EBS volume modification

## Setup

**1. Register seven job templates** from `aap/playbooks/`:

| Job template | Playbook |
|---|---|
| Check Disk Usage | `check_disk.yml` |
| Remediate Disk Continue | `remediate_disk_continue.yml` |
| Remediate Disk Cleanup | `remediate_disk_cleanup.yml` |
| Remediate Disk Expand | `remediate_disk_expand.yml` |
| Remediate Disk Fallback | `remediate_disk_fallback.yml` |
| Notify Team | `notify_chatroom.yml` |

Use `inventory/hosts.yml` for the target host. `ec2_instance_id` in inventory is optional — the expand playbook auto-discovers the instance via EC2 metadata or AWS API IP lookup.

**2. Import the workflow** — `ao/disk-demo-101.json` into Orchestrator. This export matches the nostromo layout (check → switch → continue/cleanup → converge → notify). Re-import replaces the workflow; activity UUIDs in the file must match your environment or AO will reassign them on import.

**3. Launch** from the AO UI. Default input is `disk_mount=/`.

## Switch routing

| `disk_tier` | Use % | Action |
|---|---|---|
| `ok` | < 80% | Continue — publish notify artifacts, no remediation |
| `warn` | 80–95% | Clean package cache and old logs |
| `critical` | > 95% | Expand EBS volume by 5 GiB, then grow partition and XFS |
| *(default)* | any other `disk_tier` | Fallback — no automated remediation; notify as unsupported |

The check playbook publishes `disk_tier` via `set_stats`. The switch node reads it — no nested success/failure nodes.

Each remediation branch publishes a **full notify artifact bundle** via `set_stats` (see `aap/playbooks/tasks/publish_notify_artifacts.yml`). Every branch emits the same keys; branch-specific fields get real values and everything else is `unknown` / `0` / `false`.

## Converging notify node — extra_vars pattern

Remediate branches converge into one notify node (continue + cleanup in the current export). Only **one** remediate job runs per workflow execution, so notify must not reference artifacts from the branch that was skipped.

**Do not** map notify fields from `check_disk` plus scattered remediate nodes (e.g. cleanup stats from `remediate_cleanup` and expand stats from `remediate_expand` in the same block). That breaks on branches where those nodes never ran.

**Do** map every notify field from the **upstream remediate node on the executed path** only.

### Option A — AO UI (recommended, validated)

After import, open the **Notify Team** node. For every `extra_vars` key, use the **same activity UUID** — the remediate step that ran on that branch:

```json
{
  "notify_host": "${activity_<REMEDIATE_UUID>.artifacts.notify_host}",
  "disk_mount": "${activity_<REMEDIATE_UUID>.artifacts.disk_mount}",
  "disk_use_percent": "${activity_<REMEDIATE_UUID>.artifacts.disk_use_percent}",
  "disk_tier": "${activity_<REMEDIATE_UUID>.artifacts.disk_tier}",
  "remediation_action": "${activity_<REMEDIATE_UUID>.artifacts.remediation_action}",
  "disk_use_percent_before": "${activity_<REMEDIATE_UUID>.artifacts.disk_use_percent_before}",
  "disk_use_percent_after": "${activity_<REMEDIATE_UUID>.artifacts.disk_use_percent_after}",
  "total_reclaimed_mb": "${activity_<REMEDIATE_UUID>.artifacts.total_reclaimed_mb}",
  "dnf_cache_removed": "${activity_<REMEDIATE_UUID>.artifacts.dnf_cache_removed}",
  "dnf_cache_freed_mb": "${activity_<REMEDIATE_UUID>.artifacts.dnf_cache_freed_mb}",
  "log_archives_removed": "${activity_<REMEDIATE_UUID>.artifacts.log_archives_removed}",
  "logs_freed_mb": "${activity_<REMEDIATE_UUID>.artifacts.logs_freed_mb}",
  "log_retention_days": "${activity_<REMEDIATE_UUID>.artifacts.log_retention_days}",
  "dry_run": "${activity_<REMEDIATE_UUID>.artifacts.dry_run}",
  "disk_expand_gb": "${activity_<REMEDIATE_UUID>.artifacts.disk_expand_gb}",
  "volume_size_before_gb": "${activity_<REMEDIATE_UUID>.artifacts.volume_size_before_gb}",
  "volume_size_after_gb": "${activity_<REMEDIATE_UUID>.artifacts.volume_size_after_gb}"
}
```

Replace `<REMEDIATE_UUID>` with the activity ID of the remediate node upstream of notify on that run (continue or cleanup in the two-branch demo).

**Important:** Re-run the remediate job after syncing the project so all artifact keys exist before testing notify. AO errors like `Key 'disk_use_percent_after' not found in namespace path` mean the upstream job ran an older playbook revision.

### Option B — Coalesce in exported JSON

[`ao/disk-demo-101.json`](ao/disk-demo-101.json) uses `||` coalesce between **Continue** (`activity_ee976dab...`) and **Clean Disk** (`activity_5f6d0c2e...`) so the single notify node resolves whichever branch executed. If your AO build rejects coalesce on skipped namespaces, use Option A instead.

### Canonical artifact keys

| Key | ok / fallback | warn | critical |
|-----|---------------|------|----------|
| `notify_host`, `disk_mount`, `disk_tier`, `remediation_action` | yes | yes | yes |
| `disk_use_percent` | from check | **after** cleanup | from check |
| cleanup stats (`total_reclaimed_mb`, `dnf_*`, `logs_*`, `dry_run`, …) | `unknown` / `0` | real values | `unknown` / `0` |
| expand stats (`disk_expand_gb`, `volume_size_*`) | `unknown` | `unknown` | real values |

## Critical path — EBS expand

`remediate_disk_expand.yml` runs two plays:

1. **AWS (localhost)** — looks up the instance root EBS volume and increases size by `disk_expand_gb` (default 5).
2. **Linux host** — runs `growpart` on the root partition, then `xfs_growfs` on the mount.

Target layout (RHEL 9 on EC2): GPT disk `/dev/nvme0n1`, root partition `nvme0n1p4`, XFS on `/`.

## Try each branch

```bash
./test/show_disk_tier.sh        # see current tier
./test/fill_disk.sh 85          # trigger warn
./test/fill_disk.sh 96          # trigger critical
```
