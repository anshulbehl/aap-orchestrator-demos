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
Continue   Cleanup   Expand EBS
 (ok)      logs      + grow FS
```

## What you need

- AAP 2.7+ with Automation Orchestrator
- One RHEL EC2 host AAP can reach
- AWS credentials on the execution environment for EBS volume modification

## Setup

**1. Register six job templates** from `aap/playbooks/`:

| Job template | Playbook |
|---|---|
| Check Disk Usage | `check_disk.yml` |
| Remediate Disk Continue | `remediate_disk_continue.yml` |
| Remediate Disk Cleanup | `remediate_disk_cleanup.yml` |
| Remediate Disk Expand | `remediate_disk_expand.yml` |
| Notify Team | `notify_chatroom.yml` |

Use `inventory/hosts.yml` for the target host. `ec2_instance_id` in inventory is optional — the expand playbook auto-discovers the instance via EC2 metadata or AWS API IP lookup.

**2. Import the workflow** — `ao/disk-demo-101-manual.json` into Orchestrator. Open each AAP job node and set `job_template_id` to the matching job template in your Controller (IDs are environment-specific; `1` is a placeholder).

**3. Launch** from the AO UI. Default input is `disk_mount=/`.

## Switch routing

| `disk_tier` | Use % | Action |
|---|---|---|
| `ok` | < 80% | Continue — publish notify artifacts, no remediation |
| `warn` | 80–95% | Clean package cache and old logs |
| `critical` | > 95% | Expand EBS volume by 5 GiB, then grow partition and XFS |

The check playbook publishes `disk_tier` via `set_stats`. The switch node reads it — no nested success/failure nodes.

Each remediation branch publishes a full notify artifact bundle via `set_stats`. Map notify extra vars from the remediation node on that branch (`remediate_continue`, `remediate_cleanup`, or `remediate_expand`).

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
