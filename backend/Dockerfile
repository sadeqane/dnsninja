FROM php:8.2-fpm-alpine

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app

COPY . .

Run composer install

EXPOSE 8080


CMD ["php","artisan","serve","--host=0.0.0.0","--port=8080"]
