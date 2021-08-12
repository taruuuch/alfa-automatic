#!/bin/bash

let interval=60*60

echo "Nginx config reload interval: $interval seconds"

while true; do
    echo "`date -u +"%Y-%m-%dT%H:%M:%S"` Reload nginx config..."
    nginx -s reload

sleep $interval; done &
