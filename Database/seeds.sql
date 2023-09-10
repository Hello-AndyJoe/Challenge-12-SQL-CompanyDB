INSERT INTO department (dept_id, dept_name)
VALUES (1001, "Customer Service Rep"),
       (1002, "Sales"),
       (1003, "Shopfloor"),
       (1004, "Management");

INSERT INTO company_role (role_id, role_title, role_salary, dept_id)
VALUES (4001, "Job Position 1", 60000.5, 1001),
       (4002, "Job Position 2", 85000.75, 1002);

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (9001, "Todd", "Radish", 4001, null),
       (9002, "Bill", "Turnip", 4002, 4001);