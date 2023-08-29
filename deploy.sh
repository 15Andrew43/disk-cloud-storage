#!/bin/bash

apt-get update

# for backend
python3 -m venv env
source env/bin/activate
pip install -r backend/django/storage/requirements.txt
cp gunicorn.service /etc/systemd/system/gunicorn.service
systemctl start gunicorn
systemctl enable gunicorn

# for frontend
cd frontend/disk-app-borovets
yarn install
yarn run build
rm -rf /var/www/avborovets.ru/html
mkdir -p /var/www/avborovets.ru/html
cp ./build/* /var/www/avborovets.ru/html
cd ../../

# for nginx
cp avborovets.ru /etc/nginx/sites-available/avborovets.ru
ln -s /etc/nginx/sites-available/avborovets.ru /etc/nginx/sites-enabled


# start backend and nginx
systemctl daemon-reload
systemctl restart gunicorn
systemctl restart nginx