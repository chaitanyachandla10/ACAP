const express = require("express");
const bodyParser = require("body-parser");
const task = require('./models/acap');
const app = express();


const mongoose = require('mongoose'); 

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

 mongoose.connect('mongodb://localhost:27017/acap', options)
.then(() => console.log("Connected to Database"))
    .catch(err => console.error("An error has occured", err));

    



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/datasend", (req, res, next) => {
  const post = req.body;
  console.log("===1==",req.body.numberOfManager.length);

  const tasksave = new task({
    departmentname:req.body.departmentname,
    Managername:req.body.managername,
    manager:req.body.manager
  })
  console.log(tasksave);

  /* */
   tasksave.save(function (err, data) {
    if (err) return console.error(err);
    console.log("here is data saved",data);
  });
    res.status(201).json({
      message: 'Post added successfully'
    });

});

app.get("/getdata", (req, res, next) => {

  task.find({},function (err, data) {
    if (err) return console.error(err);
    console.log(data);
    res.send(data);
    //res.status(200).json({
    //  task: data
    //});
  })

});

module.exports = app;