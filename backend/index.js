// const express = require("express");
// const bodyparser = require("body-parser");
// const dotenv = require("dotenv");
// const path = require("path");
// const route = express.Router();
// const cors = require("cors");
// const logger = require("morgan");
// const cookieParser = require('cookie-parser')

// const connectDB = require("./server/database/connections.js");
// dotenv.config({ path: "config.env" });

// const app = express();

// const PORT = 3000;

// //mongoDB connection
// connectDB();

// //parse request to body-parser
// app.use(bodyparser.urlencoded({ extended: true }));

// app.use(
//   cors({
//     credentials: true,
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:8080",
//       "http://localhost:4200",
//     ],
//   })
// );

// const Router = require('./server/routes/router');
// //load router
// app.use("/api", Router);

// app.use(logger("dev"));
// app.use(cookieParser())
// app.use(express.json());

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// // app.use(function (err, req, res, next) {
// //   // set locals, only providing error in development
// //   res.locals.message = err.message;
// //   res.locals.error = req.app.get("env") === "development" ? err : {};

// //   // render the error page
// //   res.status(err.status || 500);
// //   res.render("error");
// // });

// // app.get("/",(req,res)=>{
// //     res.send("This is my first express app");
// // })

// app.listen(PORT, () => {
//   console.log(`server running on http://localhost:${PORT}`);
// });

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv");
const TalentRoutes = require('./server/routes/Talent');
const PatientRoutes=require('./server/routes/patient');

const connectDB = require("./server/database/connections.js");
dotenv.config({ path: "config.env" });

connectDB();

const routes = require('./server/routes/router')

app = express()

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['https://clinic-health-system.onrender.com','http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200','https://travel-cloud-60e48.web.app/']
}))

app.use(express.json())

app.use('/api', routes)

app.use("/api/talents",TalentRoutes)

app.use("/api/patients",PatientRoutes)

app.listen(3000)
