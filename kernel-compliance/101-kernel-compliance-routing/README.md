# Kernel Compliance 101: Kernel Compliance Routing

**Status: Coming soon** — scaffold only.

## What this demo shows

Switch on kernel compliance state from a scan playbook:

| `kernel_compliance` | Action |
|---|---|
| `compliant` | Log OK |
| `reboot_required` | Schedule maintenance reboot |
| `drift` | Apply kernel update playbook |
| `eol` | Flag for migration planning |

## Workflow

```mermaid
flowchart TD
  Trigger[Schedule] --> Scan[JT: scan_kernel_compliance]
  Scan --> Switch{kernel_compliance}
  Switch -->|compliant| OK[JT: log_compliant]
  Switch -->|reboot_required| Reboot[JT: schedule_reboot]
  Switch -->|drift| Patch[JT: apply_kernel_update]
  Switch -->|eol| Migrate[JT: flag_eol_migration]
```

## Planned artifacts

```
101-kernel-compliance-routing/
  ao/
  aap/playbooks/
  README.md
```
