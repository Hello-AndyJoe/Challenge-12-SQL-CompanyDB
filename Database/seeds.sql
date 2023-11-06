INSERT INTO department (dept_name)
VALUES ("Accounting"),
       ("Sales"),
       ("Shopfloor");

INSERT INTO company_role (role_title, role_salary, dept_id)
VALUES ("CFO", 95000.50, 1),
       ("Junior Accountant", 65000.75, 1),
       ("Sales Associate", 75000.75, 2),
       ("Shift Manager", 85000.75, 3),
       ("Press Technician", 55000.75, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sariah", "Radish", 1, null),
        ("Ashen", "Mango", 2, 1),
        ("Bill", "Turnip", 4, null),
        ("Ryu", "Cabbage", 5, 3);