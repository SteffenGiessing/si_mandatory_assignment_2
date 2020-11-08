const express = require('express');
const db = require('mysql');
const PORT = 8090;
var app = express();
app.use(express.json());
const createquery_borgeruser ="INSERT INTO  borgeruser (Userid, CreateAt) VALUES (?, ?)";
const readquery_borgeruser ="SELECT id, Userid, CreateAt FROM borgeruser";
const updatequery_borgeruser ="UPDATE borgeruser SET CreateAt = ?  WHERE id =  ?";
const deletequery_borgeruser ="DELETE FROM borgeruser WHERE ? = ?";

const con = db.createConnection({
    host: "localhost",
    user: "root",
    password: "Stef2761",
    database: "borger"
});
con.connect(function (err){
    if(err) throw err;
    console.log("Connected");
});

app.post('/add_borgeruser', async (req,res) => {
   console.log("UserId: " + req.body.userId);
   console.log("CreateAt: " + req.body.createAt);

   let userid = req.body.userId;
   let createAt = req.body.createAt;

       con.query(createquery_borgeruser, [userid, createAt], async (err) => {
            if (err) throw err;
            res.status(200).send("inserted: " + userid + " " + createAt)
       });

});
app.get('/read_borgeruser', async (req, res) => {
    con.query(readquery_borgeruser, async (err, results, fields) =>{
        if (err) throw err;
        console.log(results);
        res.status(200).send("Data set fetched: \n" + results.toString());
    });
});
app.post('/update_borgeruser', async (req, res) =>{
    console.log("column: " + req.body.column);
    console.log("CreateAt: " + req.body.createAt);
    console.log("change: " + req.body.change);
    console.log("id_find: " + req.body.id_find);
    console.log("id_column: " + req.body.id_column);

    let column = req.body.column;
    let createAt = req.body.createAt;
    let change = req.body.change;
    let id_find = req.body.id_find;
    let id_column = req.body.id_column;

   con.query(updatequery_borgeruser, [change, id_find], async (err) => {
        if (err) throw err;
        res.status(200).send("changed the follow: " + createAt + " to " + change);
   });
});
app.post('/delete_borgeruser', async (req, res) => {
    console.log("id to find: " + req.body.id_find);
    console.log("column: " + req.body.column);

    let id_find = req.body.id_find;
    let column = req.body.column;

    con.query(deletequery_borgeruser, [id_find, column], async (err) =>{
        if (err) throw err;
        res.status(200).send("Deleted id: " + req.body.id_find);
    });
});


app.listen(PORT, (err) =>{
    if(err){
        console.log(err)
    }else {
        console.log("listening on port 8090")
    }
});
