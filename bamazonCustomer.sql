DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item_id VARCHAR(25) NOT NULL,
  product_name VARCHAR(255) NULL,
  product_description VARCHAR(255) NULL,
  department_name VARCHAR(255) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name, product_description, department_name, price, stock_quantity)
VALUES ("99003310", "Charmin", "Ultra Soft Toilet Paper 24ct","Household", 29.99, 100);

INSERT INTO products (item_id, product_name, product_description, department_name, price, stock_quantity)
VALUES ("99003311", "Charmin", "Ultra Soft Toilet Paper 36ct ","Household", 39.99, 100);

INSERT INTO products (item_id, product_name, product_description, department_name, price, stock_quantity)
VALUES ("99003312", "Bounty", "Bounty Quick-Size Paper Towels, 2 Family Rolls, White","Household", 7.39, 100);

INSERT INTO products (item_id, product_name, product_description, department_name, price, stock_quantity)
VALUES ("99003313", "Bounty", "Bounty Quick-Size Paper Towels, 16 Family Rolls, White","Household", 36.99, 100);

INSERT INTO products (item_id, product_name, product_description, department_name, price, stock_quantity)
VALUES ("99003314", "Cascade", "Cascade Complete ActionPacs Dishwasher Detergent, Fresh Scent, 78 Count","Household", 16.46, 100);





