# Subscription Management 101: RHEL Subscription Routing

**Status: Coming soon** — scaffold only.

## What this demo shows

Switch on RHEL subscription state after a compliance check:

| `subscription_status` | Action |
|---|---|
| `registered` | Log compliant |
| `expiring` | Notify + schedule renewal |
| `expired` | Register or attach subscription |
| `unregistered` | Register with activation key |

## Workflow

```mermaid
flowchart TD
  Trigger[Schedule] --> Check[JT: check_subscription]
  Check --> Switch{subscription_status}
  Switch -->|registered| OK[JT: log_compliant]
  Switch -->|expiring| Warn[JT: notify_expiring]
  Switch -->|expired| Renew[JT: renew_subscription]
  Switch -->|unregistered| Register[JT: register_system]
```

## Playbooks

🚧 **Under development** — playbook list and source links will be added when this demo is built.

## Planned artifacts

```
101-rhel-subscription-routing/
  ao/
  aap/playbooks/
  README.md
```
