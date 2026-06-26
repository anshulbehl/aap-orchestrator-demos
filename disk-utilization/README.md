# Disk Utilization Demos

Switch-based disk threshold routing using Automation Orchestrator. One check, three business decisions.

## Demos

| Level | Demo | What It Shows |
|---|---|---|
| [101](101-disk-threshold-routing/) | Disk Threshold Routing | Manual trigger, `df` check, switch on `disk_tier`, three remediation paths |

## The Story

Check disk usage on a mount. Route by how full the filesystem is — not whether the job passed or failed.

```
Check disk usage
       |
  Switch on %
       |
-------------------------
<80%     80-95%     >95%
  |         |          |
Continue   Cleanup   Extend volume
           logs      or page admin
```

**One-liner:** *Don't page someone at 72%. Don't just log at 97%.*
