INSERT INTO departments (name) VALUES ('Sales');
INSERT INTO departments (name) VALUES ('HR')
INSERT INTO departments (name) VALUES ('Management');
INSERT INTO departments (name) VALUES ('Technicians');

INSERT INTO roles (title, salary, department_id) VALUES ('Salesman', 62000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Sales lead', 70000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Sales Intern', 0, 1);

INSERT INTO roles (title, salary, department_id) VALUES ('HR Rep', 63000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Accountant', 70000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('HR Lead', 75000, 2);

INSERT INTO roles (title, salary, department_id) VALUES ('CFO', 92000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('CEO', 130000, 3);

INSERT INTO roles (title, salary, department_id) VALUES ('Tech', 54000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ('Tech lead', 55000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ('Tech Intern', 0, 4);