// used to set the requirements for the server
const express =require("express");
const morgan =require("morgan");
const pg =require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");

//used to store access the dotenv file alone
require("dotenv").config();

//used to create a server app variable
const app=express();

app.use(morgan("tiny"));// used to show the get and post logs
app.use(bodyParser.urlencoded({extended:true}))// used to set the body of request and response so it should be at the top

//database connectivity
const db= new pg.Client({
    host:"localhost",
    port:5432,
    database:"finance_tracker",
    user:"postgres",
    password:"hari2005"
}
)
db.connect().then(()=>
{
    console.log("Databse Connected!");
})




app.post("/add",async(req,res)=>{
    const data=req.body;
    await db.query('INSERT INTO history(description,mode,amount) values($1,$2,$3)', [data.description,data.mode,data.amount]);
    res.status(201).send("Record Inserted");
})



//used to set the get function
app.get("/",(req,res)=>{  // req= request, res=response, /= end marker
    res.send("Hello from server");
})


//used to listen to the server
app.listen(3001, ()=>{
    console.log("server is running on port 3001");
})