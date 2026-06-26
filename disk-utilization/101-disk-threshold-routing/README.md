# Disk Demo 101: Threshold Routing

Three business decisions from one disk observation. A switch node routes to continue, cleanup, or escalate based on `disk_tier`.

## Switch routing

| `disk_tier` | Use % | AAP job template | Action |
|---|---|---|---|
| `ok` | < 80% | Remediate Disk Continue | No action needed |
| `warn` | 80–95% | Remediate Disk Cleanup | Clean package cache and old logs |
| `critical` | > 95% | Remediate Disk Escalate | Extend volume or page admin |

## Quick start

```bash
cd disk-utilization/101-disk-threshold-routing

# Register playbooks as AAP job templates (see SETUP_GUIDE.md)
# Import ao/disk-demo-101-manual.json into Automation Orchestrator
# Launch from AO UI with disk_mount=/ (default)
```

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for full setup steps.
