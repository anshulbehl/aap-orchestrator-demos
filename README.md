# AAP Automation Orchestrator Demos

Hands-on demos for **Ansible Automation Platform Automation Orchestrator (AO)** — intelligent workflows that combine Ansible playbooks, AI agents, approvals, and event-driven triggers.

**[Browse demos on GitHub Pages →](https://ansible-tmm.github.io/aap-orchestrator-demos/)**

**[Developer setup & technical docs →](DEVELOPER.md)**

## What is Automation Orchestrator?

Automation Orchestrator is the workflow engine in AAP for visual, multi-step automation:

- **AI agent nodes** — reason and decide using LLMs
- **AAP job template nodes** — run Ansible playbooks
- **Approval nodes** — human-in-the-loop governance
- **Event triggers** — react to Splunk, Prometheus, webhooks, and more
- **Switch nodes** — route on a value, not just success/failure

## Demo catalog

| Demo | Level | Status | Description |
|---|---|---|---|
| [Disk Utilization & Remediation](disk-utilization/101-disk-threshold-routing/) | 101 | **Active** | Check disk usage → switch on % → continue, cleanup, EBS expand, or fallback → Mattermost notify |
| [Intelligent Cert Lifecycle](cert-rotation/101-cert-lifecycle/) | 101 | **Active** | AI agent picks PEM vs keystore renewal; operator approves; AAP renews and validates |
| [Risk-Based Routing](cert-rotation/201-risk-based-routing/) | 201 | Coming soon | Risk-tier routing for certificate renewal |
| [Proactive Assessment](cert-rotation/301-proactive-assessment/) | 301 | Coming soon | Scan-before-expiry workflows |
| [Incident Remediation](incident-remediation/) | 101+ | Coming soon | AI-assisted incident triage and auto-remediation |

Use cases are grouped by folder:

| Folder | Focus |
|---|---|
| [cert-rotation/](cert-rotation/) | Certificate lifecycle with AI-driven routing |
| [disk-utilization/](disk-utilization/) | Proportional disk remediation with switch routing |
| [incident-remediation/](incident-remediation/) | Incident triage and remediation (coming soon) |

## Quick links

- **Browse all demos (cards + filters):** https://ansible-tmm.github.io/aap-orchestrator-demos/
- **Setup guides:** [DEVELOPER.md](DEVELOPER.md)
- **Demo levels (101/201/301):** [DEMO_LEVELS.md](DEMO_LEVELS.md)
