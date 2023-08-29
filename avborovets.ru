server {
        listen 80;

        listen [::]:80;

        root /var/www/avborovets.ru/html;
        index index.html index.htm;

        server_name 138.124.187.107 avborovets.ru;

        location / {
                try_files $uri /index.html =404;
        }


        # location = /favicon.ico { access_log off; log_not_found off; }
        # location /static {
        #     root /root/my_google_drive/disk-cloud-storage/backend/django/storage;
        # }

        location /auth {
            include proxy_params;
            proxy_pass http://127.0.0.1:8000; # http://unix:/root/my_google_drive/disk-cloud-storage/backend/django/storage/storage.sock;
        }
        
        location /api/v1/drive {
                include proxy_params;
                proxy_pass http://127.0.0.1:8000;
        }
        location /api/v1/common/ {
                include proxy_params;
                proxy_pass http://127.0.0.1:8000;
        }
        location /admin {
            include proxy_params;
            proxy_pass http://127.0.0.1:8000; # http://unix:/root/my_google_drive/disk-cloud-storage/backend/django/storage/storage.sock;
        }
    }
