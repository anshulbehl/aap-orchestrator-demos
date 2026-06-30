# Service Health Demos

Switch-based service recovery — one check playbook, four remediation paths based on what `systemd` actually reports.

## The use case

A monitoring alert or scheduled check finds `httpd` in an unexpected state. Classic AAP workflows branch on job success or failure and guess at meaning. automation orchestrator **switch** routes on `service_state` — active, inactive, failed, or not installed — and runs the fix that matches.

**One-liner:** *Same check, four different fixes — one switch.*

## Demos

| Level | Demo | Status | What it shows |
|---|---|---|---|
| [101](101-service-state-routing/) | Service State Routing | Coming soon | Check `httpd` → switch on `service_state` → log OK, start, restart, or install |

## Why automation orchestrator switches fit here

| Classic workflow branching | automation orchestrator switch |
|---|---|
| Nested decision nodes after one check | One switch, four ports |
| Failure might mean "missing" or "broken" | `service_state` encodes the actual situation |
| One recovery playbook with `when:` soup | Small single-purpose job templates per path |
