LMS Create Account & Login (Local XAMPP)

Setup steps:

1. Copy all files in this folder to your XAMPP `htdocs` directory (for example `C:\xampp\htdocs\lms`).
2. Start Apache and MySQL using XAMPP Control Panel.
3. Import `create_db.sql` using phpMyAdmin or run it with MySQL CLI to create the `lms` database and `student` table.
4. Open `db.php` and update `$DB_USER` / `$DB_PASS` if your MySQL credentials are different (default XAMPP: user `root`, password empty).
5. In a browser visit `http://localhost/lms/index.html` (adjust path if you used a different folder).
6. Create an account using the Create Account form. Then login with the same credentials.

Notes:
- On invalid login the client shows an alert `Invalid username or password`.
- This example uses simple JSON responses from `register.php` and `login.php`.
