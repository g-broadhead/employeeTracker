CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;
CREATE TABLE department (
ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL
);

USE employeeTracker_db;
CREATE TABLE roles (
ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY (department_id) REFERENCES department(id)
);

USE employeeTracker_db;
CREATE TABLE employee (
ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
roles_id INT NOT NULL,
FOREIGN KEY (roles_id) REFERENCES roles(id),
manager_id INT NOT NULL,
FOREIGN KEY (manager_id) REFERENCES employee(id) 
);