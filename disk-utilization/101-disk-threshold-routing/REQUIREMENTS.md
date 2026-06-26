# Disk Threshold Routing 101

## What This Demo Shows

A scheduled or manual disk check publishes `disk_tier` from `df` output. Automation Orchestrator switch node routes to one of three remediation job templates — continue, cleanup, or escalate — without nested success/failure workflow nodes.

## Prerequisites

| Component | Required | Details |
|---|---|---|
| AAP Controller | Yes | 2.7+ with job template support |
| Automation Orchestrator | Yes | Connected to AAP over SSL |
| VM | Yes | 1x RHEL 9, SSH accessible from AAP |

## Collections Required

None beyond ansible.builtin.

## Estimated Setup Time

~10 minutes

## Job templates to register

| Job template name | Playbook |
|---|---|
| Check Disk Usage | `aap/playbooks/check_disk.yml` |
| Remediate Disk Continue | `aap/playbooks/remediate_disk_continue.yml` |
| Remediate Disk Cleanup | `aap/playbooks/remediate_disk_cleanup.yml` |
| Remediate Disk Escalate | `aap/playbooks/remediate_disk_escalate.yml` |

## AO vs AAP Workflow Comparison

| Step | AO Workflow | AAP Workflow |
|---|---|---|
| Routing | Switch on `disk_tier` value in one node | Nested success/failure nodes or `when:` logic in playbook |
| Threshold changes | Edit switch cases in visual builder | Restructure workflow graph or playbook |
| Partial outcomes | `warn` is neither success nor failure | Awkward to model without always nodes |
