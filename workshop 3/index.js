const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const { careerGet, careerPost, careerPut, careerDelete } = require('./server/controllers/careerController');

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

app.get("/api/career/", careerGet);
app.post("/api/career/", careerPost);
app.put("/api/career", careerPut);
app.delete("/api/career", careerDelete);

// Iniciar el servidor
const port = 3001;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
