
### Install certificates
```sh
sudo NGINX_HTTP_PORT=80 NGINX_HTTPS_PORT=443 domains="www.alfa-automatic.com.ua" email=mail@mail.com ./init_letsencrypt.sh
```
### Start nginx
```sh
sudo \
NGINX_HTTP_PORT=80 \
NGINX_HTTPS_PORT=443 \
SITE_BUILD=/home/site/alfa-automatic/build \
docker-compose -p alfa -f docker-compose.yaml up --build -d
```