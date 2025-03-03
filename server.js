// =======================
// 1. IMPORTS
// =======================
const express = require('express');
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
require('dotenv').config()
const mongoose = require("mongoose")
const Cars = require("./models/cars")
// =======================
// 2. MIDDLEWARE
// =======================
app.use(express.urlencoded({ extended: false })); // parses the request body. Needed for the req.body
app.use(methodOverride("_method")); // Will change the methods for
app.use(morgan("dev")); // Logs the requests in the terminal
// =======================
// 3. CONNECTION TO DATABASE
// =======================
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log("Connected to DATABSE")})
.catch(()=>{console.log("ERROR CONNECTING TO DB OMAR")})
// =======================
// 4. ROUTES
// =======================

app.get("/", async(req, res)=>{
    res.render("homepage.ejs")
});

app.get("/cars/new", (req, res)=>{
    res.render("cars/new.ejs")
})

app.post("/cars", async(req, res)=>{
    await Cars.create(req.body)
    console.log(req.body)
    res.redirect("/cars")
})

app.get("/cars", async(req, res)=>{
    const allCars = await Cars.find()
    console.log(allCars);
    res.render("cars/index.ejs", {allCars})
})

app.get("/cars/:id", async(req, res)=>{
    const carId = req.params.id
    console.log(carId)
    const foundCar = await Cars.findById(carId)

    res.render("cars/oneCar.ejs", {foundCar})
})


// =======================
// 5. LISTENING ON PORT 3000
// =======================
app.listen(3000, () => {
    console.log('Listening on port 3000');
    });