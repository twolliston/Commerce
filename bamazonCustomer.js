const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    displayInventory();
});


function displayInventory() {

    connection.query("SELECT * FROM products", function (err, res) {
        // declare products object to be later constructed
        var products = [];

        // populate object using constructor object
        setup();

        //Display product object
        console.table(products);

        function setup() {
            for (var i = 0; i < res.length; i++) {
                products[i] = new Product(i);
            }
        }

        function Product(i) {
            this.item_id = res[i].item_id;
            this.product_name = res[i].product_name;
            this.product_description = res[i].product_description;
            this.stock_quantity = res[i].stock_quantity;
            this.price = res[i].price;
            return this;
        }
        start();
    });



}

// function which prompts the user for what action they should take
function start() {
    console.log("Make a select or Enter 'quit' to exit" + "\n");
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the the ID of the product you would like to buy?.",
                validate: function (value) {
                    if (value === 'quit') {
                        console.log("\n" + "Goodbye, come again soon");
                        process.exit(1);
                    }
                    if (value = null || value === "") {
                        console.log("\n" + "Make a valid! entry or exit");
                        return false;
                    }
                    return true;
                }
            },
            {
                name: "qty",
                type: "input",
                message: "how many units of the product would you like to buy?.",
                validate: function (value) {
                    if (isNaN(value) === false ) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {

            // query the database for the items being purchased
            if (answer.item == 'quit') {
                process.exit(1);
            }
            
            // query the database for the items being purchased
            connection.query("SELECT * FROM products WHERE ?", [{ item_id: answer.item }], function (err, results) {
                if (err) throw err;

                // console.log(results);
                // console.log(results[0].stock_quantity);
                // console.log(parseInt(answer.qty));

                if (results) {
                    // once you have the item, check if there is enough product on-hand to perform the purchase             
                    if (results[0].stock_quantity < parseInt(answer.qty)) {
                        console.log("Insufficient quantity! for item " + parseInt(answer.item));
                    } else {
                        // bid was high enough, so update db, let the user know, and start over
                        var newQuantity = results[0].stock_quantity - parseInt(answer.qty);
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: newQuantity
                                },
                                {
                                    item_id: answer.item
                                }
                            ],
                            function (error) {
                                if (error) throw err;
                                console.log("Order placed successfully!");
                                displayInventory();
                            }
                        );
                    }
                }

            });


        });
}