#!/bin/bash
# Create a sparse file to push disk usage toward a target percent (demo only)
#
# Usage:
#   ./fill_disk.sh <target_percent> [mount]
#
# Example:
#   ./fill_disk.sh 85 /
#   ./fill_disk.sh 96 /var

TARGET="${1:?Usage: $0 <target_percent> [mount]}"
MOUNT="${2:-/}"
FILL_FILE="${MOUNT%/}/.ao-disk-demo-fill"

CURRENT=$(df -P "$MOUNT" | awk 'NR==2 {gsub(/%/,"",$5); print $5}')
TOTAL_KB=$(df -P "$MOUNT" | awk 'NR==2 {print $2}')
USED_KB=$(df -P "$MOUNT" | awk 'NR==2 {print $3}')
TARGET_KB=$(( TOTAL_KB * TARGET / 100 ))
NEED_KB=$(( TARGET_KB - USED_KB ))

if [ "$NEED_KB" -le 0 ]; then
  echo "Already at or above ${TARGET}% on ${MOUNT} (currently ${CURRENT}%)"
  exit 0
fi

echo "Growing ${FILL_FILE} by ${NEED_KB} KB to reach ~${TARGET}% on ${MOUNT}"
truncate -s +"${NEED_KB}K" "$FILL_FILE"
sync
./show_disk_tier.sh "$MOUNT"
