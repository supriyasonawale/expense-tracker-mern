const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  note: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

// 👈 Ensure the 3rd argument matches the Compass collection
module.exports = mongoose.model("Expense", expenseSchema, "Expense_Tracker");
