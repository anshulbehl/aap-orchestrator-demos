#!/usr/bin/env bash
set -euo pipefail

ORG="network-automation"
KEEP_ORG="ansible-tmm"
TMPDIR="${TMPDIR:-/tmp}"

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI is required." >&2
  exit 1
fi

echo "Checking GitHub org admin access..."
if ! gh api "/orgs/${ORG}/memberships/IPvSean" --jq '.role' 2>/dev/null | grep -q admin; then
  echo "Cannot manage ${ORG} memberships. Run:" >&2
  echo "  gh auth refresh -h github.com -s admin:org" >&2
  exit 1
fi

ALL_FILE="${TMPDIR}/na_members.txt"
KEEP_FILE="${TMPDIR}/tmm_members.txt"
REMOVE_FILE="${TMPDIR}/na_remove.txt"

gh api --paginate "/orgs/${ORG}/members?per_page=100" --jq '.[].login' | sort > "${ALL_FILE}"
gh api --paginate "/orgs/${KEEP_ORG}/members?per_page=100" --jq '.[].login' | sort > "${KEEP_FILE}"
comm -23 "${ALL_FILE}" "${KEEP_FILE}" > "${REMOVE_FILE}"

KEEP_COUNT=$(comm -12 "${ALL_FILE}" "${KEEP_FILE}" | wc -l | tr -d ' ')
REMOVE_COUNT=$(wc -l < "${REMOVE_FILE}" | tr -d ' ')

echo "Keep (${KEEP_COUNT} members also in ${KEEP_ORG}):"
comm -12 "${ALL_FILE}" "${KEEP_FILE}"
echo ""
echo "Remove ${REMOVE_COUNT} members from ${ORG}."
read -r -p "Type PURGE to continue: " CONFIRM
if [[ "${CONFIRM}" != "PURGE" ]]; then
  echo "Aborted."
  exit 1
fi

SUCCESS=0
FAILED=0
while IFS= read -r user; do
  [[ -z "${user}" ]] && continue
  if gh api -X DELETE "/orgs/${ORG}/memberships/${user}" >/dev/null 2>&1; then
    echo "REMOVED: ${user}"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "FAILED:  ${user}" >&2
    FAILED=$((FAILED + 1))
  fi
done < "${REMOVE_FILE}"

echo ""
echo "Done. Removed: ${SUCCESS}, Failed: ${FAILED}"
