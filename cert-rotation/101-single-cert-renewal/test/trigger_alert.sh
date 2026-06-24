#!/bin/bash
# Trigger the AO cert-expiry-alert webhook to simulate a monitoring alert
#
# Usage:
#   ./trigger_alert.sh <AO_HOST> <WEBHOOK_TOKEN>
#
# Example:
#   ./trigger_alert.sh orchestrator.example.com my-webhook-token

AO_HOST="${1:?Usage: $0 <AO_HOST> <WEBHOOK_TOKEN>}"
WEBHOOK_TOKEN="${2:?Usage: $0 <AO_HOST> <WEBHOOK_TOKEN>}"
CERT_HOST="${3:-100.48.81.58}"

curl -X POST "https://${AO_HOST}/api/v1/webhooks/cert-expiry-alert" \
  -H "Authorization: Bearer ${WEBHOOK_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"source\": \"manual\",
    \"alertname\": \"CertificateExpiresSoon\",
    \"hostname\": \"${CERT_HOST}\",
    \"service\": \"nginx\",
    \"cert_cn\": \"${CERT_HOST}\",
    \"port\": \"443\",
    \"days_remaining\": \"-7\"
  }"

echo ""
echo "Alert sent. Check the AO UI for workflow execution."
