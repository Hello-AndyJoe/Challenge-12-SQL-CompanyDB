DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
  dept_id INT NOT NULL,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (dept_id)
);

CREATE TABLE company_role (
  role_id INT NOT NULL,
  role_title VARCHAR(30) NOT NULL,
  role_salary DECIMAL(12 ,2) NOT NULL,
  dept_id INT,
  FOREIGN KEY (dept_id)
  REFERENCES department(dept_id)
  ON DELETE SET NULL,
  PRIMARY KEY (role_id)
);

CREATE TABLE employee (
  employee_id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES company_role(role_id)
  ON DELETE SET NULL
)