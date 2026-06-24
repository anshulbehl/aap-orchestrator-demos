# Certificate Rotation Demos

Automated certificate lifecycle management using Ansible Automation Platform and Automation Orchestrator.

## Levels

| Level | Demo | Description |
|-------|------|-------------|
| [101](101-single-cert-renewal/) | Single Cert Renewal | One VM, one expired cert, one renewal. Proves the end-to-end flow. |
| [201](201-risk-based-routing/) | Risk-Based Routing | Multiple services with different cert types. AI classifies risk, workflow routes accordingly. |
| [301](301-proactive-assessment/) | Proactive Assessment | Scheduled scanning, AI classification, auto-remediation for low risk, monitoring integration. |

## The Story

A monitoring alert fires: a TLS certificate has expired (or is about to). The automation platform receives the alert, an AI agent analyzes the certificate and selects the correct renewal strategy, an operator approves the plan, and the certificate is renewed and validated automatically.

At the 101 level, this is a simple linear flow. At 201, the AI agent assesses risk and the workflow routes low-risk renewals to auto-fix while escalating high-risk ones with blast radius context. At 301, the system scans proactively on a schedule so alerts rarely fire at all.
