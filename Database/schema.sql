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
  employee_id INT PRIMARY KEY NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES company_role(role_id)
    ON DELETE SET NULL
);

-- SELECT company_role.role_title, company_role.role_salary, department.dept_name
-- FROM company_role
-- INNER JOIN department ON company_role.dept_id=department.dept_id;

-- SELECT employee.first_name, employee.last_name, company_role.role_title
-- FROM employee
-- INNER JOIN company_role ON employee.role_id=company_role.role_id;

-- SELECT employee.last_name, manager.last_name AS Manager
-- FROM employee
-- LEFT JOIN employee manager ON employee.manager_id = manager.employee_id;

-- SELECT employee.first_name, employee.last_name, company_role.role_title, CONCAT(manager.last_name, ", " , manager.first_name) AS Manager
-- FROM employee
-- LEFT JOIN employee manager ON employee.manager_id = manager.employee_id
-- INNER JOIN company_role ON employee.role_id=company_role.role_id;

-- SELECT CONCAT(employee.first_name, " ", employee.last_name) AS Employee, 
-- company_role.role_title, 
-- CONCAT(manager.last_name, ", " , manager.first_name) AS Manager
-- FROM employee
-- LEFT JOIN employee manager ON employee.manager_id = manager.employee_id
-- INNER JOIN company_role ON employee.role_id=company_role.role_id;

-- SELECT employee.employee_id,
-- CONCAT(employee.first_name, " ", employee.last_name) AS Employee, 
-- company_role.role_title, 
-- CONCAT(manager.last_name, ", " , manager.first_name) AS Manager
-- FROM employee
-- LEFT JOIN employee manager ON employee.manager_id = manager.employee_id
-- INNER JOIN company_role ON employee.role_id=company_role.role_id;