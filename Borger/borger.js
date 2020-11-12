const express = require('express');
const db = require('mysql');
const http = (require('http'))
const PORT = 5004;
var app = express();
app.use(express.json());

/*
ADDRESS CRUD
 */
//Address query
const readquery_address = "SELECT id, BorgerUserId, CreatedAt, IsValid FROM address";
const createquery_address = "INSERT INTO  address (id, BorgerUserId, CreatedAt, IsValid) VALUES (?, ?, ?, ?)";
const updatequery_address = "UPDATE address SET ? = ?  WHERE id =  ?";
const deletequery_address = "DELETE FROM address WHERE ? = ?";

app.get('/api/borger', async (req, res) => {
    res.status(200).send("steffen");
});
http.createServer((req, res) => {
    req.on('api/borger', chunck =>{
        console.log("hallo")
    });
    req.on('/borger', chunk2 => {
        console.log("hallo2")
    })
})

app.get('/read_adress', async (req, res) => {
    con.query(readquery_address, async (err, results, fields) => {
        if (err) throw err;
        console.log(results);
        res.status(200).send("Data set fetched: \n" + results.toString());
    });
});

app.post('/add_address', async (req, res) => {

    let id = req.body.id;
    let borgerUserId = req.body.BorgerUserId;
    let createAt = req.body.CreatedAt;
    let isValid = req.body.IsValid;
    con.query(createquery_address, [id, borgerUserId, createAt, isValid], async (err) => {
        if (err) throw err;
        res.status(200).send("inserted: " + id + " " + borgerUserId + " " + createAt + " " + isValid)
    });
});

app.post('/update_address', async (req, res) => {
    let column_to_change = req.body.column_to_change;
    let change = req.body.change;
    let id_find = req.body.id_find;

    con.query(updatequery_address, [column_to_change,change, id_find], async (err) => {
        if (err) throw err;
        res.status(200).send("changed the follow: " + id_find + " to " + change + " At column: " + column_to_change);
    });
});

app.delete('/delete_address', async (req, res) => {

    let id_find = req.body.id_find;
    let column = req.body.id;

    con.query(deletequery_address, [id_find, column], async (err) => {
        if (err) throw err;
        res.status(200).send("Deleted id: " + req.body.id_find);
    });
});

/*
BORGER USER CRUD
 */
//Borger query
const createquery_borgeruser = "INSERT INTO  borgeruser (id, Userid, CreateAt) VALUES (?, ?, ?)";
const readquery_borgeruser = "SELECT id, Userid, CreateAt FROM borgeruser";
const updatequery_borgeruser = "UPDATE borgeruser SET CreateAt = ?  WHERE id =  ?";
const deletequery_borgeruser = "DELETE FROM borgeruser WHERE ? = ?";

app.post('/add_borgeruser', async (req, res) => {
    console.log("UserId: " + req.body.userId);
    console.log("CreateAt: " + req.body.createAt);
    let id = req.body.id;
    let userid = req.body.userId;
    let createAt = req.body.createAt;

    con.query(createquery_borgeruser, [id, userid, createAt], async (err) => {
        if (err) throw err;
        res.status(200).send("inserted: " + userid + " " + createAt)
    });
});

app.get('/read_borgeruser', async (req, res) => {

    con.query(readquery_borgeruser, async (err, results, fields) => {
        if (err) throw err;
        console.log(results);
        res.status(200).send("Data set fetched: \n" + results.toString());
    });
});

app.post('/update_borgeruser', async (req, res) => {
    console.log("column: " + req.body.column);
    console.log("CreateAt: " + req.body.createAt);
    console.log("change: " + req.body.change);
    console.log("id_find: " + req.body.id_find);
    console.log("id_column: " + req.body.id_column);

    let createAt = req.body.createAt;
    let change = req.body.change;
    let id_find = req.body.id_find;

    con.query(updatequery_borgeruser, [change, id_find], async (err) => {
        if (err) throw err;
        res.status(200).send("changed the follow: " + id_find + " to " + change);
    });
});

app.post('/delete_borgeruser', async (req, res) => {
    console.log("id to find: " + req.body.id_find);
    console.log("column: " + req.body.column);

    let id_find = req.body.id_find;
    let column = req.body.column;

    con.query(deletequery_borgeruser, [id_find, column], async (err) => {
        if (err) throw err;
        res.status(200).send("Deleted id: " + req.body.id_find);
    });
});

//DB Connection
const con = db.createConnection({
    host: "localhost",
    user: "root",
    password: "Stef2761",
    database: "borger"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
});

app.use(express.urlencoded({extended: true}))
//?Main?
app.listen(PORT, (err) => {

    if (err) {
        console.log(err)
    } else {
        console.log("listening on port: " + PORT)
    }
});
