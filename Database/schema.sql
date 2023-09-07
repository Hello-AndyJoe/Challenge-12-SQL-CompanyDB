DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
  id INT NOT NULL,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE company_role (
  id INT NOT NULL,
  role_title VARCHAR(30) NOT NULL,
  role_salary INT NOT NULL,
  dept_id INT,
  FOREIGN KEY (dept_id)
  REFERENCES department(id)
  ON DELETE SET NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id)
  REFERENCES company_role(id)
  ON DELETE SET NULL
)