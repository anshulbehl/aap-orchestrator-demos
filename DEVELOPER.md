# Developer Guide

Technical reference for setting up, extending, and running demos in this repository.

## Quick start

```bash
git clone https://github.com/ansible-tmm/aap-orchestrator-demos.git
cd aap-orchestrator-demos

ansible-galaxy collection install -r collections/requirements.yml

# Cert rotation 101
cat cert-rotation/101-cert-lifecycle/SETUP_GUIDE.md

# Disk utilization 101
cat disk-utilization/101-disk-threshold-routing/README.md
```

## Demo levels

See [DEMO_LEVELS.md](DEMO_LEVELS.md) for the 101 / 201 / 301 convention.

| Level | Complexity | Typical setup |
|---|---|---|
| **101** | Single resource, manual trigger | ~15 min |
| **201** | AI routing, multiple services | ~30 min |
| **301** | Monitoring + scheduled + reactive | ~45 min |

## How demos are organized

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
  ao/               # Automation Orchestrator workflow JSON (importable)
  aap/playbooks/    # Ansible playbooks registered as AAP job templates
  setup/            # Playbooks to provision the demo environment
  static/           # Static files served by demo web services
  test/             # Scripts to trigger and validate the demo
  inventory/        # Ansible inventory
  group_vars/       # Variable defaults
```

## Repository structure

```
aap-orchestrator-demos/
├── README.md                          # Public landing page
├── DEVELOPER.md                       # This file
├── DEMO_LEVELS.md                     # 101/201/301 convention
├── _data/demos.yml                    # GitHub Pages demo catalog
├── collections/
│   └── requirements.yml               # Ansible collections needed
├── cert-rotation/
│   ├── README.md
│   ├── 101-cert-lifecycle/            # Active
│   ├── 201-risk-based-routing/        # Coming soon
│   └── 301-proactive-assessment/      # Coming soon
├── disk-utilization/
│   ├── README.md
│   └── 101-disk-threshold-routing/    # Active
└── incident-remediation/              # Coming soon
```

## Cert rotation 101

**Story:** Two certificates expire simultaneously on production services. Splunk detects both and fires alerts to AO. A single AI-powered workflow handles both, automatically selecting the correct renewal strategy for each certificate type.

- **nginx** on port 443 uses a **PEM certificate** → agent selects `Renew Certificate` template
- **API server** on port 8443 uses a **Java keystore** → agent selects `Renew Java Keystore Certificate` template

The agent discovers available job templates from AAP, reads host variables, checks past job run history, and reasons about the correct approach — **intelligent routing without hardcoded if-statements**.

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

## Disk utilization 101

**Story:** Check disk usage on a mount, route by how full the filesystem is, remediate proportionally, notify Mattermost.

```
Check disk usage → Switch on % → Continue | Cleanup | Expand | Fallback → Notify
```

See [disk-utilization/101-disk-threshold-routing/README.md](disk-utilization/101-disk-threshold-routing/README.md) for JT IDs, AO workflow import, and `test_disk_use_percent` branch testing.

## AO vs AAP workflow comparison

| Capability | AAP Workflow | AO Workflow |
|---|---|---|
| Template selection | Hardcoded in workflow node | AI agent discovers and selects at runtime |
| Multi-cert routing | Requires conditions per cert type | Agent reasons about cert type automatically |
| Threshold routing | Nested success/failure nodes | Switch node routes on a value (`disk_use_percent`) |
| Approval context | Basic approve/deny | Agent analysis, confidence %, blast radius |
| Event triggers | Requires EDA rulebook | Native webhook triggers (Splunk, Prometheus, etc.) |
| Visual builder | YAML defined | Drag-and-drop with live execution view |

## Infrastructure requirements (101 demos)

| Component | Details |
|---|---|
| AAP 2.7+ with AO | Controller + Automation Orchestrator |
| Demo VM | 1x RHEL 9, t3.small or equivalent |
| HashiCorp Vault | Container on demo VM (cert demo; provisioned automatically) |
| Splunk | Container on bastion/monitoring host (cert demo) |
| LiteLLM | AI proxy for AO agent nodes (cert demo) |
| AWS credentials | Execution environment for EBS expand (disk demo) |
| Mattermost | API token on notify job template (disk demo) |
| DNS | `certdemo.demoredhat.com` pointing to demo VM (cert demo) |

## GitHub Pages site

The demo marketplace at [ansible-tmm.github.io/aap-orchestrator-demos](https://ansible-tmm.github.io/aap-orchestrator-demos/) is built with Jekyll from this repo. Demo cards are defined in [`_data/demos.yml`](_data/demos.yml).

Local build:

```bash
bundle install
bundle exec jekyll build
open _site/index.html
```
