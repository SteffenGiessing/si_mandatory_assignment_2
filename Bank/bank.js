const express = require('express');
const db = require('mysql');
const PORT = 8091;
var app = express();
app.use(express.json());

//CRUD Account
const createquery_account = "INSERT INTO  bank.account (id, BankUserId, AccountNo, IsStudent, CreateAt, ModfiedAt, InterestRate, Amount) VALUES (?, ?, ?, ?,?,?,?,?)";
const readquery_account = "SELECT id, BankUserId,IsStudent, CreateAt, ModfiedAt, InterestRate, Amount FROM bank.account";
const updatequery_account = "UPDATE bank.account SET ? = ?  WHERE id =  ?";
const deletequery_account = "DELETE FROM bank.account WHERE ? = ?";
app.post('add_deposit', async (req, res) => {
    let amount = req.body.amount;
    let bankerUserId = req.body.bankerUserId;

     if (amount > 0){
         module.exports = async function(context, myTrigger, myInput, myOtherInput) {
             context.log("JavaScript trigger function processed a request.");
         }
     } else{
         res.status(404).send("You cannot send 0 or below 0");
     }

});
app.post('/add_account', async (req, res) => {
    let id = req.body.id;
    let bankUserId = req.body.bankUserId;
    let isStudent = req.body.isStudent;
    let createAt = req.body.createAt;
    let modifiedAt = req.body.ModifiedAt;
    let interestRate = req.body.interestRate;
    let amount = req.body.amount;
    let accountNo = req.body.accountNo;


    con.query(createquery_account, [id, bankUserId, accountNo, createAt, modifiedAt, interestRate, amount], async (err) => {
        if (err) throw err;
        res.status(200).send("inserted:" );
    });
});
app.get('/read_account', async (req, res) => {
    con.query(readquery_account, async (err, results, fields) => {
        if (err) throw err;
        console.log(results);
        res.status(200).send("Data set fetched: \n" + results.toString());
    });
});
app.post('/update_account', async (req, res) => {
    let where = req.body.where;
    let change = req.body.change;
    let id_find = req.body.id_find;

    con.query(updatequery_account, [where,change, id_find], async (err) => {
        if (err) throw err;
        res.status(200).send("changed the follow: " + id_find + " to " + change);
    });
});
app.post('/delete_account', async (req, res) => {
    let id_find = req.body.id_find;
    let column = req.body.column;

    con.query(deletequery_account, [id_find, column], async (err) => {
        if (err) throw err;
        res.status(200).send("Deleted id: " + req.body.id_find);
    });
});

//CRUD BankUser
const createquery_bankUser = "INSERT INTO  bank.bankuser (id, Userid, CreateAt, ModifiedAt) VALUES (?, ?, ?, ?)";
const readquery_bankUser = "SELECT id, Userid, CreateAt, ModifiedAt FROM bank.bankuser";
const updatequery_bankUser = "UPDATE bank.bankuser SET CreateAt = ?  WHERE id =  ?";
const deletequery_bankUser = "DELETE FROM bank.bankuser WHERE ? = ?";

app.post('/add_bankUser', async (req, res) => {
    let id = req.body.id;
    let userid = req.body.userId;
    let createAt = req.body.createAt;

    con.query(createquery_bankUser, [id, userid, createAt], async (err) => {
        if (err) throw err;
        res.status(200).send("inserted: " + userid + " " + createAt)
    });
});
app.get('/read_bankUser', async (req, res) => {
    con.query(readquery_bankUser, async (err, results, fields) => {
        if (err) throw err;
        console.log(results);
        res.status(200).send("Data set fetched: \n" + results.toString());
    });
});
app.post('/update_bankUser', async (req, res) => {
    let createAt = req.body.createAt;
    let change = req.body.change;
    let id_find = req.body.id_find;

    con.query(updatequery_bankUser, [change, id_find], async (err) => {
        if (err) throw err;
        res.status(200).send("changed the follow: " + id_find + " to " + change);
    });
});
app.post('/delete_bankUser', async (req, res) => {
    console.log("id to find: " + req.body.id_find);
    console.log("column: " + req.body.column);

    let id_find = req.body.id_find;
    let column = req.body.column;

    con.query(deletequery_bankUser, [id_find, column], async (err) => {
        if (err) throw err;
        res.status(200).send("Deleted id: " + req.body.id_find);
    });
});
//DB Connection
const con = db.createConnection({
    host: "localhost",
    user: "root",
    password: "Stef2761",
    database: "bank"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
});
//?Main?
app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("listening on port 8090")
    }
});