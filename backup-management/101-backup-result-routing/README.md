# Backup Management 101: Backup Result Routing

**Status: Coming soon** — scaffold only.

## What this demo shows

Backup jobs often return outcomes that binary workflows mishandle. Switch on `backup_result`:

| `backup_result` | Action |
|---|---|
| `success` | Verify restore point, log OK |
| `partial` | Retry failed targets, notify ops |
| `failed` | Escalate, open incident |
| `skipped` | Log reason, check schedule |

## Workflow

```mermaid
flowchart TD
  Trigger[Schedule or event] --> Check[JT: check_backup_result]
  Check --> Switch{backup_result}
  Switch -->|success| Verify[JT: verify_backup]
  Switch -->|partial| Retry[JT: retry_partial]
  Switch -->|failed| Escalate[JT: escalate_failed]
  Switch -->|skipped| Log[JT: log_skipped]
```

## Playbooks

🚧 **Under development** — playbook list and source links will be added when this demo is built.

## Planned artifacts

```
101-backup-result-routing/
  ao/
  aap/playbooks/
  README.md
```
