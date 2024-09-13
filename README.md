This is a sample project made for Bridging FX company. It contains a Laravel backend with a React frontend.

Technologies used: Laravel, React, MySQL, Material UI, PHP, JavaScript, CSS, HTML etc.

This project focuses on Login, SignUp and CRUD functionalities of a Customer module.

## **Prerequisites:** You should have the below installed in your machine installed in your machine.

- **PHP** (7.4 or later)
- **Composer** (for managing PHP dependencies)
- **Node.js** (14.x or later)
- **npm** or **Yarn** (for managing JavaScript dependencies)
- **MySQL**

**How to run the application:**
  
## 1. Clone the Repository

First, clone the repository from GitHub:

```bash```
```git clone https://github.com/your-username/bridging-fx-project.git```
and change the path to the project using 'cd [folder-name]' command
Or simply download the project zip file and extract it

## 2. Set Up the Laravel Backend
### i.Install PHP Dependencies
Navigate to the Laravel project directory and install the PHP dependencies using below command:
```composer install```

### ii. Configure Environment
Copy the example environment file into environment file using below command:
```cp .env.example .env```

### iii. Edit the .env file to match your environment settings, including database credentials.
below are the primary creadentials which need to be configured:
```DB_CONNECTION=mysql```
```DB_HOST=127.0.0.1```
```DB_PORT=3306```
```DB_DATABASE=bridging_fx_project```
```DB_USERNAME=root```
```DB_PASSWORD= ```

### iv. Generate the App Key
Generate a new application key using below command:
php artisan key:generate
Note: You can skip this step. But it's not recommended to continue without App key

## v. Run Database Migrations
Set up MySQL database schema by running the migrations using below command. This will create the necessary tables in MySQL:
```php artisan migrate```

## vi. Start the Laravel Server
Serve the Laravel application using below command:
```php artisan serve```

The Laravel backend will be accessible at http://localhost:8000 in your web browser.

Note: Do not close the terminal when the application is running. Open a seperate terminal to run the below front-end commands.

## 3. Set Up the React Frontend

### i. Install JavaScript Dependencies
Navigate to the React frontend directory and install the JavaScript dependencies using below commands:
```cd front-end```
```npm install```

Or, if using Yarn use below command instead of npm:
```yarn install```

### ii. Configure Environment
Copy the example environment file into environment file using below command:
```cp .env.example .env```

### iii. Start the React Development Server
Start the React development server with below command:
```npm start```
```for yarn:```
```yarn start```

The React frontend will be accessible at http://localhost:5173. (Or the URL which CLI displays)

## Additional Notes
CORS: If you encounter CORS issues, you may need to configure CORS in your Laravel application. You can use the fruitcake/laravel-cors package or set CORS headers in app/Http/Middleware/HandleCors.php.

## Screenshots

Below are the screenshots of this project

![Login-Page](https://github.com/user-attachments/assets/746bb177-2f8f-4733-bc0b-8b73b495663c)

![SignUp-Page](https://github.com/user-attachments/assets/ec0ec923-93e1-4aa5-ae26-3c71fdb576f4)

![Customer-List-Page](https://github.com/user-attachments/assets/b1be66f8-f98a-445a-95c0-9e2faf0ef19d)

![Add-Customer-Page](https://github.com/user-attachments/assets/322621df-cbde-457b-be34-fee029c03bd5)

![Edit-Customer-Page](https://github.com/user-attachments/assets/623db1f3-ecaf-4ff1-9a76-11057267b14b)
