require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./database/db")
const customerRoute = require('./route/customerRoute')
const userRoute = require('./route/userRoute')
const editHistoryRoute = require('./route/editHistroyRoute')
const path = require('path');


connectDb();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/customer", customerRoute);
app.use("/user", userRoute);
app.use("/edithistory",editHistoryRoute);

app.use((req, res) => {
  res.status(404).json({ message: "path not found on this server" });
});

const port = process.env.PORT;
app.listen(port, () => console.log(`server running on port ${port}`));