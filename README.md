# AAP Orchestrator Demos

Hands-on demos for Ansible Automation Platform and Automation Orchestrator. Each use case includes leveled demos (101/201/301) with both AO workflow and AAP playbook versions so you can compare the two approaches side by side.

## Use Cases

| Use Case | Description | Status |
|----------|-------------|--------|
| [cert-rotation/](cert-rotation/) | Certificate lifecycle management: renewal, validation, risk-based routing | In progress |
| [incident-remediation/](incident-remediation/) | AI-assisted incident triage and auto-remediation | Planned |

## How Demos Are Organized

Each use case directory contains leveled subdirectories:

- **101** - Minimal setup, single resource, manual trigger. Good for a first look.
- **201** - Multiple resources, AI decision-making, risk-based routing. Good for platform engineer demos.
- **301** - Full lifecycle with monitoring integration, scheduled and reactive automation. Good for architect workshops and customer engagements.

See [DEMO_LEVELS.md](DEMO_LEVELS.md) for the full convention.

## Each Level Contains

```
<level>/
  REQUIREMENTS.md   # What infrastructure you need before starting
  ao/               # Automation Orchestrator workflow JSONs (importable)
  aap/              # AAP playbooks and workflow definitions (for comparison)
  setup/            # Playbooks to provision the demo environment
  test/             # Scripts to trigger and validate the demo
```

## Getting Started

1. Pick a use case and level
2. Read the `REQUIREMENTS.md` to see what infrastructure you need
3. Install shared collections: `ansible-galaxy collection install -r shared/collections/requirements.yml`
4. Run the setup playbooks
5. Import the AO workflow or configure the AAP workflow
6. Run the test trigger

## Shared Resources

- `shared/ansible.cfg` - Common Ansible configuration
- `shared/collections/requirements.yml` - Required Ansible collections
- `shared/vault-setup/` - Reusable HashiCorp Vault provisioning (used across demos)
