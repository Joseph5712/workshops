//Modulos
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const { getCareer, createCareer, updateCareer, deleteCareer } = require('./server/controllers/careerController');

// Database connection
const db = mongoose.connect("mongodb+srv://josephme5712:9a1Ao5AEy09ewGbC@cluster0.m5sfesz.mongodb.net/career");

// Middleware
app.use(bodyParser.json());
app.use(cors({
    domains: '*',
    methods: "*"
}));

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get("/api/career/", getCareer);
app.post("/api/career/", createCareer);
app.put("/api/career", updateCareer);
app.delete("/api/career", deleteCareer);

// Iniciar el servidor
const port = 3001;
app.listen(port, () => console.log(`Escuchando el puerto: ${port}!`));

