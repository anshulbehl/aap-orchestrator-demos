# User Lifecycle Demos

Switch-based identity operations — one intake form, four completely different runbooks.

## The use case

HR or IT service management submits a user request. The request type — new hire, contractor, role change, or termination — maps cleanly to a string value. automation orchestrator switches on `request_type` and runs the runbook that matches, without nested approval trees or monolithic playbooks.

**One-liner:** *One form. Four completely different runbooks.*

## Demos

| Level | Demo | Status | What it shows |
|---|---|---|---|
| [101](101-request-type-routing/) | Request Type Routing | Coming soon | Survey/webhook → switch on `request_type` → provision, update, or deprovision |
