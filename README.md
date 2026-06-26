# AAP Automation Orchestrator Demos

Hands-on demos for **Ansible Automation Platform Automation Orchestrator (AO)**. Each use case shows how AO combines task-driven automation, event-driven response, and AI-powered decision-making into intelligent, self-healing workflows.

## What is Automation Orchestrator?

Automation Orchestrator is the workflow engine in AAP that lets you build visual, multi-step automation workflows combining:
- **AI agent nodes** that reason and make decisions using LLMs
- **AAP job template nodes** that execute Ansible playbooks
- **Approval nodes** for human-in-the-loop governance
- **Event-driven triggers** that react to alerts from Splunk, Prometheus, Dynatrace, and more
- **Condition and switch nodes** for intelligent routing

## Use Cases

| Use Case | Description | Status |
|---|---|---|
| [cert-rotation/](cert-rotation/) | AI-driven certificate lifecycle management with intelligent routing | Active |
| [incident-remediation/](incident-remediation/) | AI-assisted incident triage and auto-remediation | Coming soon |

## How Demos Are Organized

```
<use-case>/
  101-<name>/    # Entry level: minimal infrastructure, proves the concept
  201-<name>/    # Intermediate: more services, smarter routing
  301-<name>/    # Advanced: full lifecycle, monitoring integration
```

Each level contains:
```
<level>/
  REQUIREMENTS.md   # What infrastructure you need
  SETUP_GUIDE.md    # Step-by-step setup instructions
  ao/               # Automation Orchestrator workflow JSON files (importable)
  aap/playbooks/    # Ansible playbooks registered as AAP job templates
  setup/            # Playbooks to provision the demo environment
  static/           # Static files served by demo web services
  test/             # Scripts to trigger and validate the demo
  inventory/        # Ansible inventory
  group_vars/       # Variable defaults
```

## Quick Start (Cert Rotation 101)

```bash
# Clone the repo
git clone https://github.com/ansible-tmm/aap-orchestrator-demos.git
cd aap-orchestrator-demos

# Install required collections
ansible-galaxy collection install -r collections/requirements.yml

# Follow the setup guide
cat cert-rotation/101-cert-lifecycle/SETUP_GUIDE.md
```

## The Cert Rotation 101 Demo

**Story:** Two certificates expire simultaneously on production services. Splunk detects both and fires alerts to AO. A single AI-powered workflow handles both, automatically selecting the correct renewal strategy for each certificate type.

- **nginx** on port 443 uses a **PEM certificate** → agent selects `Renew Certificate` template
- **API server** on port 8443 uses a **Java keystore** → agent selects `Renew Java Keystore Certificate` template

The agent doesn't need to be told which template to use. It discovers the available job templates from AAP, reads the host variables, checks past job run history, and reasons about the correct approach. This is **intelligent routing without a single hardcoded if-statement**.

```
Splunk Alert (cert expired)
    |
AO Webhook Trigger
    |
Plan Renewal (AI agent - queries AAP, selects correct template)
    |
Approve Renewal (operator reviews agent analysis + confidence %)
    |
Run Renewal Job (dynamic: agent-selected template)
    |
Validate Renewal (TLS handshake check)
```

## AO vs AAP Workflow Comparison

| Capability | AAP Workflow | AO Workflow |
|---|---|---|
| Template selection | Hardcoded in workflow node | AI agent discovers and selects at runtime |
| Multi-cert routing | Requires conditions per cert type | Agent reasons about cert type automatically |
| Approval context | Basic approve/deny | Agent analysis, confidence %, blast radius |
| Event triggers | Requires EDA rulebook | Native webhook triggers (Splunk, Prometheus, etc.) |
| Visual builder | YAML defined | Drag-and-drop with live execution view |

## Infrastructure Requirements (101 Demo)

| Component | Details |
|---|---|
| AAP 2.7+ with AO | Controller + Automation Orchestrator |
| Demo VM | 1x RHEL 9, t3.small or equivalent |
| HashiCorp Vault | Runs as container on the demo VM (provisioned automatically) |
| Splunk | Runs as container on bastion/monitoring host |
| LiteLLM | AI proxy for AO agent nodes |
| DNS | `certdemo.demoredhat.com` pointing to the demo VM |

## Repository Structure

```
aap-orchestrator-demos/
├── README.md                          # This file
├── DEMO_LEVELS.md                     # 101/201/301 convention explained
├── collections/
│   └── requirements.yml               # Ansible collections needed
├── cert-rotation/
│   ├── README.md
│   ├── 101-cert-lifecycle/            # Active demo
│   ├── 201-risk-based-routing/        # Coming soon
│   └── 301-proactive-assessment/      # Coming soon
└── incident-remediation/              # Coming soon
```
