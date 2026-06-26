#!/bin/bash
# Show current disk use percent for the demo mount
#
# Usage:
#   ./show_disk_tier.sh [/]

MOUNT="${1:-/}"
PCT=$(df -P "$MOUNT" | awk 'NR==2 {gsub(/%/,"",$5); print $5}')

if [ "$PCT" -lt 80 ]; then
  TIER=ok
elif [ "$PCT" -le 95 ]; then
  TIER=warn
else
  TIER=critical
fi

echo "${MOUNT} is ${PCT}% full → disk_tier=${TIER}"
