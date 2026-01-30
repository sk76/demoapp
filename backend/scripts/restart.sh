#!/bin/bash
cd /var/www/demoapp
npm install
systemctl restart demoapp
chmod +x backend/scripts/restart.sh
