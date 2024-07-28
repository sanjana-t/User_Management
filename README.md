[nodejs_authapp.postman_collection.json](https://github.com/user-attachments/files/16404997/nodejs_authapp.postman_collection.json)# User_Management

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

API DOCUMENTATION

[Upload{
	"info": {
		"_postman_id": "51dd39d3-b5ae-4f8f-a958-d9242337b49e",
		"name": "nodejs_authapp",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "30093073"
	},
	"item": [
		{
			"name": "register",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n  \"firstname\": \"admin\",\r\n  \"lastname\":\"admin\",\r\n  \"email\": \"admin@gmail.com\",\r\n  \"password\": \"admin\",\r\n  \"role\": \"admin\"\r\n}\r\n",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/auth/register",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"auth",
						"register"
					]
				}
			},
			"response": []
		},
		{
			"name": "login",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"email\":\"admin@gmail.com\",\r\n    \"password\":\"admin\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/auth/login",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"auth",
						"login"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin",
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "GET",
				"header": [
					{
						"key": "Authorization",
						"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjE5MjYzNSwiZXhwIjoxNzIyMTk2MjM1fQ.3N3Jsw7NFL0HUJsAxkKvTtUTp3t2jBpeozxqxa61tu8",
						"type": "text"
					}
				],
				"url": {
					"raw": "http://localhost:3000/admin",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"admin"
					]
				}
			},
			"response": []
		},
		{
			"name": "profileinfo",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjE5MjYzNSwiZXhwIjoxNzIyMTk2MjM1fQ.3N3Jsw7NFL0HUJsAxkKvTtUTp3t2jBpeozxqxa61tu8",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"userId\":2\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/user/profile",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"user",
						"profile"
					]
				}
			},
			"response": []
		},
		{
			"name": "updateuser",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjE5MjI4MCwiZXhwIjoxNzIyMTk1ODgwfQ.dv-34EI_EvpHZVjlhXFH1EmYO180LCUWlfVEeBSGwzA",
							"type": "string"
						}
					]
				},
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"userId\":2,\r\n    \"lastname\":\"test\",\r\n    \"firstname\":\"admin\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/user/profile",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"user",
						"profile"
					]
				}
			},
			"response": []
		},
		{
			"name": "deleteuser",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIyMTY1MzQwLCJleHAiOjE3MjIxNjg5NDB9.Vq8cokaUED3R1BQOw4wCiz477kEYVyN45adKVNvNrFk",
							"type": "string"
						}
					]
				},
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "http://localhost:3000/user/profile",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"user",
						"profile"
					]
				}
			},
			"response": []
		},
		{
			"name": "getuseradmin",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjE5MjI4MCwiZXhwIjoxNzIyMTk1ODgwfQ.dv-34EI_EvpHZVjlhXFH1EmYO180LCUWlfVEeBSGwzA",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:3000/user/2",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"user",
						"2"
					]
				}
			},
			"response": []
		},
		{
			"name": "getallusersadmin",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjE5MjYzNSwiZXhwIjoxNzIyMTk2MjM1fQ.3N3Jsw7NFL0HUJsAxkKvTtUTp3t2jBpeozxqxa61tu8",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/auth/users",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"auth",
						"users"
					],
					"query": [
						{
							"key": "limit",
							"value": "2",
							"disabled": true
						},
						{
							"key": "page",
							"value": "1",
							"disabled": true
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "deleteuser_admin",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjE5MjYzNSwiZXhwIjoxNzIyMTk2MjM1fQ.3N3Jsw7NFL0HUJsAxkKvTtUTp3t2jBpeozxqxa61tu8",
							"type": "string"
						}
					]
				},
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "http://localhost:3000/user/5",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"user",
						"5"
					]
				}
			},
			"response": []
		}
	]
}ing nodejs_authapp.postman_collection.json…]()

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
