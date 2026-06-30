# Patch Management 101: Patch Severity Routing

**Status: Coming soon** — scaffold only. Playbooks and AO workflow JSON not built yet.

## What this demo shows

Run a patch assessment playbook that publishes `highest_severity` from `dnf updateinfo` or an Insights scan. Switch on the value and route to the response that matches your change policy.

| `highest_severity` | Action |
|---|---|
| `critical` | Patch now + open maintenance window |
| `important` | Schedule change window |
| `moderate` | Add to weekly batch |
| `none` | Report compliant, exit |

## Workflow

```mermaid
flowchart TD
  Trigger[Manual or schedule] --> Scan[JT: patch_assessment]
  Scan --> Switch{highest_severity}
  Switch -->|critical| PatchNow[JT: patch_now]
  Switch -->|important| Schedule[JT: schedule_change]
  Switch -->|moderate| Batch[JT: weekly_batch]
  Switch -->|none| Compliant[JT: report_compliant]
  PatchNow --> Notify[Notify operators]
  Schedule --> Notify
  Batch --> Notify
  Compliant --> Notify
```

## Playbooks

🚧 **Under development** — playbook list and source links will be added when this demo is built.

## Planned artifacts

```
101-patch-severity-routing/
  ao/
  aap/playbooks/
  README.md
```
