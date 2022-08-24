#!/usr/bin/env bash

set -e
echo "Starting entrypoint script, ENV=$ENV..."
supervisord -c /etc/nginx/supervisord.conf