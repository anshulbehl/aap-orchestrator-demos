# Patch Management Demos

Switch-based patch response — one scan job, four remediation strategies based on severity.

## The use case

After `dnf updateinfo` or a Red Hat Lightspeed/Insights scan, hosts report different patch urgency levels. Binary pass/fail cannot express "important but not emergency." A switch on `highest_severity` routes each host to the response that matches operational policy.

**One-liner:** *One scan job. Four remediation strategies.*

## Demos

| Level | Demo | Status | What it shows |
|---|---|---|---|
| [101](101-patch-severity-routing/) | Patch Severity Routing | Coming soon | Scan → switch on severity → patch now, schedule, batch, or report compliant |
