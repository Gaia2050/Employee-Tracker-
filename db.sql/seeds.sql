USE employee_tracker_db;

INSERT INTO department(name)
VALUES ("Sales");

INSERT INTO department(name)
VALUES ("Engineering");

INSERT INTO department(name)
VALUES ("Finance");

INSERT INTO department(name)
VALUES ("Legal");


INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 20000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 800000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 150000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Software Engineer', 180000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 155000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('Finance Manager', 150000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('Legal', 220000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ('Legal Manager', 250000, 4);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 2, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Jane', 'Doe', 5, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Sally', 'Freeman', 6, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Greg', 'Richards', 8, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Wright', 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Sarah', 'Holly', 3, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bob', 'Jones', 5, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Alex', 'Thompson', 7, 4);