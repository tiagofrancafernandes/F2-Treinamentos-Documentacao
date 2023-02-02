## Criado com **[BookstackApp](https://www.bookstackapp.com)**

## Instalation 

1. Clone the release branch of the BookStack GitHub repository into a folder.
```sh
git clone https://github.com/tiagofrancafernandes/F2-Treinamentos-Documentacao.git 
```
2. cd into the application folder and run composer install --no-dev.
```sh
cd F2-Treinamentos-Documentacao
```
3. Copy the .env.example file to .env and fill with your own database and mail details.
```sh
cp .env.example .env
```
4. Ensure the `storage`, `bootstrap/cache` & `public/uploads` folders are writable by the web server.
5. In the application root, Run `php artisan key:generate` to generate a unique application key.
6. If not using Apache or if `.htaccess` files are disabled you will have to create some URL rewrite rules as shown below.
7. Set the web root on your server to point to the BookStack public folder. This is done with the root setting on Nginx or the DocumentRoot setting on Apache.
8. Run php artisan migrate to update the database.
9. Done! You can now login using the default admin details `admin@admin.com` with a password of `password`. You should change these details immediately after logging in for the first time.


### [bookstackapp Docs](https://www.bookstackapp.com/docs/admin/installation/)
