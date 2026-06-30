# Intelligent Cert Lifecycle (101)

AI-driven certificate renewal — an automation orchestrator workflow where an AI agent picks the correct AAP job template, an operator approves, and Ansible renews and validates TLS.

## What this demo shows

Two certificates expire on production services at the same time. Splunk fires alerts to automation orchestrator. An AI agent analyzes each certificate, discovers available AAP job templates, and selects the correct renewal strategy — PEM for nginx, Java keystore for the API server — without hardcoded routing.

## Workflow

```mermaid
flowchart TD
  A[Splunk alert — cert expired] --> B[AO webhook trigger]
  B --> C[Plan renewal — AI agent]
  C --> D[Approve renewal — operator]
  D --> E[Run renewal job — dynamic template]
  E --> F[Validate renewal — TLS check]
```

## Docs

| Document | Purpose |
|---|---|
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Step-by-step environment setup |
| [REQUIREMENTS.md](REQUIREMENTS.md) | Prerequisites and infrastructure |
| [DEMO_SCRIPT.md](DEMO_SCRIPT.md) | Live demo narration script |

## Import workflow

- Manual trigger: [`ao/cert-demo-101-manual.json`](ao/cert-demo-101-manual.json)
- Webhook trigger: [`ao/cert-demo-101-webhook.json`](ao/cert-demo-101-webhook.json)
