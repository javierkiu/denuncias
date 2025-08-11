FROM php:8.2-apache

# Instalar extensiones necesarias para Postgres
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql pgsql

# Habilitar mod_rewrite (opcional para APIs)
RUN a2enmod rewrite

# Copiar backend
COPY backend/ /var/www/html/

# Dar permisos
RUN chown -R www-data:www-data /var/www/html
