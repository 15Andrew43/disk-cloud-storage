# disk-cloud-storage

# Required software
 - nginx
 - nodejs + yarn

# Deploy on ubuntu
 - ./deploy.sh

# Run in dev mode
in frontend/disk-app-borovets
 - yarn install
 - yarn start
in backend/django
 - python3 -m venv env
 - source env/bin/activate
in backend/django/storage
 - pip install -r requirements.txt
 - python manage.py runserver
