drop database if exists employeeTracker_db;
create database employeeTracker_db;

use employeeTracker_db;

create table departments (
id int auto_increment,
name varchar(30),
PRIMARY KEY(id)
);

create table roles(
id int auto_increment,
title varchar(30),
salary decimal,
department_id int,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES departments(id)
);

create table employees (
id int auto_increment,
first_name varchar(30),
last_name varchar(30),
role_id int,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES roles(id)
);




