# User_Management

---
Set Up

- Firstly clone the repository
- run npm install
- connect to database with your connection details
- run the server by running command node server.js
- Now access all API's
  
--------------

SQL scripts attached for reference 

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL UNIQUE,
    lastname VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

----------------------------

API DOCUMENTATION -
Download API documentation - [nodejs_authapp.postman_collection.json](https://github.com/user-attachments/files/16404997/nodejs_authapp.postman_collection.json)
Read at - https://github.com/sanjana-t/User_Management/blob/main/nodejs_authapp.postman_collection.json

--------------------------
Features - 

1.	User Authentication and Authorization: Implemented login and registeration api's. JWT & RBAC authentication and authorization. Bcrypt hashing for storing passwords.
2.	User Profile Management: API's for retrieving, updating, and deleting user with authentication is created. Admin users can retrieve and delete any user profile.
3.	Database Architecture:
Indexing , Forgein keys and normalization is implemented.
Data validation at code level - on all input/post methods is designed.
Data validation at the database level unique email addresses and role_names.
4.	Advanced Features:
Pagination is implemented for listing all users with RBAC .
Implement input validation using a library like Typebox.
ORM sequelize of node.js is used as interface with SQL database.
