const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const Korisnik = require("./models/korisnikk");

const korisniciRoutes = require("./routes/korisnici");
const igreRoutes = require("./routes/igre");

const app = express();

mongoose.connect("mongodb+srv://budmil:Mpof5aoEghx3a5we@clusterkviskoteka-0mizt.azure.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => {
        console.log("Uspesno konektovan na bazu!")
    })
    .catch(() => {
        console.log("Konekcija na bazu bezuspesna!")
    });

app.use(bodyParser.json());
app.use("/profilneSlike", express.static(path.join("backend/profilneSlike")));

app.use((req,res,next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS");
     next();
});




app.use("/api/korisnici", korisniciRoutes);
app.use("/api/igre", igreRoutes);


module.exports = app;