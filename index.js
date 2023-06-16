const express = require("express");
const app = express();
const PORT = 4040;
const Transaction = require("./models/Transaction.js");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.post("/api/transaction", async (req, res) => {
  const { name, description, datetime, price } = req.body;
  try{
      const transaction = await Transaction.create({name, description, datetime, price})
      res.json(transaction)
  }
  catch(e){
    console.log(e.message)
  }
});

app.get("/api/transactions", async (req, res) => {
    try{
        const transactions = await Transaction.find()
        res.json(transactions)
    }
    catch(e){
      console.log(e.message)
    }
  });

app.listen(PORT, () => {
  console.log("Server Working at", PORT);
});
