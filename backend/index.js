const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv");
const TalentRoutes = require('./server/routes/Talent');
const PatientRoutes=require('./server/routes/patient');
const bodyParser = require('body-parser');
const path = require("path");


const connectDB = require("./server/database/connections.js");
dotenv.config({ path: "config.env" });

connectDB();

const routes = require('./server/routes/router')

app = express()
port = process.env.port || 3000;
app.use(express.static(path.join(__dirname, "dist")));

app.use(cookieParser())
app.use(cors({
    origin:true
  }))

app.use(express.json())
app.use(bodyParser.json())

app.use('/api', routes)

app.use("/api/talents",TalentRoutes)

app.use("/api/patients",PatientRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
