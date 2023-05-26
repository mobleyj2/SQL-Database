USE STORES_db;

INSERT INTO department (name)
VALUES ("Soda"),
       ("Chips"),
       ("Candy"),
       ("Veggies"),
       ("Frozen Foods");

INSERT INTO  role (title, salary,department_id)
VALUES ("Soda Stocker", 35000, 1 ),
       ("Chip Sorter" , 26000, 2),
       ("Candy Stockers" , 55000,3),
       ("Produce Manager", 40000, 4),
       ("Frozen Foods", 10000, 5);

INSERT INTO  employee (first_name, last_name, role_id, manager_id)
VALUES ("Don","John" , 1, NULL ),
       ("Todd","Juno",2,1),
       ("Steve","Cohen",2,1),
       ("Evan","Stocker",2,1),
       ("Steven","Barrow",2,1),
       ("John","Dillinger",3,1),
       ("Al","Capone",2,NULL),
       ("John","Gotti",3,7),
       ("Ted","Farland",3,7),
       ("Jay","Pikl",4,7),
       ("Bob","One",4,NULL),
       ("John","Roberts",4,11),
       ("Sleepy","Jo",4,11);
       
       
