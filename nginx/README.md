
### Install certificates
```sh
sudo BACKEND_HOST=`sh ./local_ip.sh`:8080 NGINX_HTTP_PORT=80 NGINX_HTTPS_PORT=443 domains="dev.regenxbio.itc-portal.com" email=mail@mail.com ./init_letsencrypt.sh
```
### Start nginx
```sh
sudo \
NGINX_HTTP_PORT=80 \
NGINX_HTTPS_PORT=443 \
ADMIN_DIST=/home/rgx/admin/dist \
REGISTRATION_DIST=/home/rgx/registration/dist \
BACKEND_HOST=`sh ./local_ip.sh`:8080 \
docker-compose -p itc_nginx -f docker-compose.yaml up --build -d
```