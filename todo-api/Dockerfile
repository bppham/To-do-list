FROM php:8.1-apache

# Cài các extension cần thiết
RUN apt-get update && apt-get install -y libpng-dev zip unzip git curl \
    && docker-php-ext-install pdo pdo_mysql

# Bật mod_rewrite cho Apache (Laravel cần)
RUN a2enmod rewrite

# Copy mã nguồn vào container
COPY . /var/www/html

# Set quyền
RUN chown -R www-data:www-data /var/www/html

# Làm việc trong thư mục project
WORKDIR /var/www/html
