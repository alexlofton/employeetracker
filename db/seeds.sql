USE employee_db;

INSERT INTO department(name)
VALUES ("Engineering"), ("Management"), ("HR");

INSERT INTO role(title, salary, department_id)
VALUES ("Engineer", 100000, 1), ("Manager", 50000, 2), ("HR Director", 30000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Alex", "Lofton", 1, 2), ("Billy", "Sunday", 2, null), ("Bobb", "Kennedy", 3, 2);