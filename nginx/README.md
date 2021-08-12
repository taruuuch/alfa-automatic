
### Install certificates
```sh
sudo BACKEND_HOST=`sh ./local_ip.sh`:8080 NGINX_HTTP_PORT=80 NGINX_HTTPS_PORT=443 domains="alfa-automatic.com.ua" email=mail@mail.com ./init_letsencrypt.sh
```
### Start nginx
```sh
sudo \
NGINX_HTTP_PORT=80 \
NGINX_HTTPS_PORT=443 \
ADMIN_DIST=/root/alfa-automatic/build \
BACKEND_HOST=`sh ./local_ip.sh`:8080 \
docker-compose -p itc_nginx -f docker-compose.yaml up --build -d
```