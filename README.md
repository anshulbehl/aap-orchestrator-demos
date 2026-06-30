# AAP automation orchestrator demos

Hands-on demos for **Ansible Automation Platform automation orchestrator (AO)** — intelligent workflows that combine Ansible playbooks, AI agents, approvals, and event-driven triggers.

**[Browse demos on GitHub Pages →](https://ansible-tmm.github.io/aap-orchestrator-demos/)**

**[Developer setup & technical docs →](DEVELOPER.md)**

## What is automation orchestrator?

Automation orchestrator is the workflow engine in AAP for visual, multi-step automation:

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
| [Service State Routing](service-health/101-service-state-routing/) | 101 | Coming soon | Check service → switch on state → log OK, start, restart, or install |
| [Patch Severity Routing](patch-management/101-patch-severity-routing/) | 101 | Coming soon | Scan patches → switch on severity → patch now, schedule, batch, or compliant |
| [Expiry Threshold Routing](cert-rotation/102-cert-expiry-switch/) | 102 | Coming soon | Rule-based cert countdown switch (no AI) |
| [Request Type Routing](user-lifecycle/101-request-type-routing/) | 101 | Coming soon | User lifecycle form → switch on request type |
| [Risk-Based Routing](cert-rotation/201-risk-based-routing/) | 201 | Coming soon | AI risk-tier routing for certificate renewal |
| [Proactive Assessment](cert-rotation/301-proactive-assessment/) | 301 | Coming soon | Scheduled scan-before-expiry workflows |
| [AI Incident Triage](incident-remediation/) | 201 | Coming soon | AI-assisted incident response |

See the [demo marketplace](https://ansible-tmm.github.io/aap-orchestrator-demos/) for the full list including backup, subscription, and kernel compliance scaffolds.

## Use cases by folder

| Folder | Focus |
|---|---|
| [cert-rotation/](cert-rotation/) | Certificate lifecycle — AI routing and rule-based expiry |
| [disk-utilization/](disk-utilization/) | Proportional disk remediation with switch routing |
| [service-health/](service-health/) | Service state check → four remediation paths |
| [patch-management/](patch-management/) | Patch severity switch routing |
| [user-lifecycle/](user-lifecycle/) | Identity request type routing |
| [backup-management/](backup-management/) | Backup result routing (partial ≠ fail) |
| [subscription-management/](subscription-management/) | RHEL subscription state routing |
| [kernel-compliance/](kernel-compliance/) | Kernel compliance switch routing |
| [incident-remediation/](incident-remediation/) | AI triage and multi-service correlation (201/301) |

## Quick links

- **Browse all demos (cards + filters):** https://ansible-tmm.github.io/aap-orchestrator-demos/
- **Setup guides:** [DEVELOPER.md](DEVELOPER.md)
- **Demo levels (101/201/301):** [DEMO_LEVELS.md](DEMO_LEVELS.md)
