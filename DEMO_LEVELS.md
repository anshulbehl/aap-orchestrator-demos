# Demo Levels Convention

| Level | Complexity | Infrastructure | Audience | Typical Setup Time |
|-------|-----------|---------------|----------|-------------------|
| **101** | Single resource, single action, manual trigger | 1 VM + AAP + AO | Anyone getting started | ~15 minutes |
| **201** | Multiple resources, AI decision-making, risk routing | 1 VM with multiple services + AAP + AO | Platform engineers, live demos | ~30 minutes |
| **301** | Full lifecycle, monitoring integration, scheduled + reactive | VMs + monitoring stack + AAP + AO | Architects, customer workshops | ~45 minutes |

## What Each Level Demonstrates

### 101: "It works"
- Prove the basic flow end to end
- One resource, one action, one approval
- Manual trigger (curl or AO UI)
- Minimal infrastructure

### 201: "It thinks"
- AI agent makes decisions (picks the right template, assesses risk)
- Risk-based routing (low/medium/high get different treatment)
- Multiple resources with different characteristics
- Still manually triggered, but the workflow is intelligent

### 301: "It runs itself"
- Monitoring detects the problem automatically
- Scheduled proactive scans find issues before they become incidents
- Reactive event-driven remediation catches anything that slips through
- Full observability: dashboards, compliance reports, audit trails

## AO vs AAP Comparison

Every level includes both an AO workflow and an AAP workflow doing the same job. The comparison highlights:

| Capability | AAP Workflow | AO Workflow |
|-----------|-------------|-------------|
| Template selection | Static (hardcoded in workflow node) | Dynamic (AI agent picks at runtime) |
| Risk routing | Manual approval nodes per path | Switch node routes by AI-assessed risk level |
| Event ingestion | EDA rulebook required | Native webhook triggers |
| Approval context | Basic approve/deny | Rich context (blast radius, agent reasoning) |
| Visual builder | YAML-defined | Drag-and-drop with live execution view |
