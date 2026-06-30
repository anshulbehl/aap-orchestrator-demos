# Certificate Rotation 301: Proactive Assessment

Coming soon. This demo extends 201 with:

- Scheduled scanning of the full certificate estate
- AI classification across all discovered certs
- Auto-remediation for low-risk certs
- Escalation for critical certs
- Compliance reporting

## Workflow

```mermaid
flowchart TD
  A[Scheduled scan trigger] --> B[Inventory certificate expiry]
  B --> C{Expires within window?}
  C -->|Yes| D[Renew proactively]
  C -->|No| E[Log OK — no action]
  D --> F[Validate TLS]
  F --> G[Compliance report]
```

## Playbooks

🚧 **Under development** — playbook list and source links will be added when this demo is built.
