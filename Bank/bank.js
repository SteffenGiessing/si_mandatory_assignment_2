const express = require('express');
const db = require('mysql');
const PORT = 5005;
var app = express();
app.use(express.json());
const axios = require('axios')
//CRUD Account
const createquery_account = "INSERT INTO  bank.account (id, BankUserId, AccountNo, IsStudent, CreateAt, ModfiedAt, InterestRate, Amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
const readquery_account = "SELECT id, BankUserId,IsStudent, CreateAt, ModfiedAt, InterestRate, Amount FROM bank.account";
const updatequery_account = "UPDATE bank.account SET ? = ?  WHERE ? =  ?";
const update_deduct_amount_account = "UPDATE bank.account SET Amount = ? - ?  WHERE ? = ?";
const update_add_amount_account = "UPDATE bank.account SET Amount = Amount + ?  WHERE BankUserId = ?";
const deletequery_account = "DELETE FROM bank.account WHERE ? = ?";
const read_deposit = "SELECT bankUserId, CreateAt, Amount FROM bank.deposit WHERE BankUserId = ?";

app.post('/api/bank/add_deposit', async (req, res) => {
    let incomingAmount = req.body.amount;
    let bankerUserId = req.body.bankUserId;
    console.log(bankerUserId);
    if (incomingAmount > 0) {
        console.log(bankerUserId);
        axios({
            method: 'post',
            url: 'http://localhost:7071/api/interestRate',
            data: {
                amount: req.body.amount
            }
        }).then(response => {
                let amount = response.data;
                let finalAmount = amount.replace(',', ".")
                console.log(Number(amount), finalAmount)

                con.query(update_add_amount_account, [finalAmount, bankerUserId], async (err) => {
                    console.log(update_add_amount_account, [finalAmount, bankerUserId])
                    if (err) {
                        console.log("line 34")
                        res.status(500).send("Bad Request");
                    } else {
                        res.status(200).send({"Response": 'Success: ' + amount});
                    }
                });
            }
        )
    }
});

//MISSING SOMETHING
app.get('/api/bank/list_deposit', async (req, res) => {
    let bankUserId = req.body.bankUserId;
    console.log(bankUserId);

    con.query(read_deposit, [bankUserId], async (err, rows) => {
        if (err) throw err;
        res.status(200).send("here is the requested: " + rows);
    });
});
app.get('/api/bank/create_loan', async (req, res) => {
    let bankUserId = req.body.bankUserId;
    let loanAmount = req.body.loanAmount;
    console.log(bankUserId);
    console.log(loanAmount);

    axios({
        method: 'post',
        url: 'http://localhost:7071/api/loanAlgorithm',
        data: {
            name: "Steffen"
        }
    });

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
        res.status(200).send("inserted:");
    });
});
app.get('/read_account', async (req, res) => {
    con.query(readquery_account, async (err, results, fields) => {
        if (err) throw err;
        console.log(results);
        res.status(200).send({"response": "Data set fetched: ", results});
    });
});
app.post('/add_amount', async (req, res) => {

});
app.post('/update_account', async (req, res) => {
    let where = req.body.where;
    let change = req.body.change;
    let id_find = req.body.id_find;

    con.query(updatequery_account, [where, change, id_find], async (err) => {
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