const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv=require('dotenv');

const userHandler = require("./routeHandler/userHandler");
const port =5000;


// express app initialization
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// database connection with mongoose
mongoose
  .connect("mongodb://localhost/userdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

// application routes
app.use("/user", userHandler);

// default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.use(errorHandler);

app.get('/',(req,res)=>{
    res.send('Welcome');
})

app.listen(port, () => {
  console.log("app listening at port ",port);
});