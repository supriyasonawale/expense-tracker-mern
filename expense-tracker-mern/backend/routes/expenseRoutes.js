const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Add expense
router.post("/", async (req, res) => {
  try {
     console.log("Received:", req.body); // 👈 Add this
    const { amount, category, note, date } = req.body;

    const newExpense = new Expense({
      amount,
      category,
      note,
      date: date ? new Date(date) : new Date()  // Default to current date
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
     console.error("Error while adding expense:", err); // 👈 Add this
    res.status(500).json({ error: "Failed to add expense" });
  }
});


// Get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// Delete by ID
router.delete("/:id", async (req, res) => {
  try {
    const result = await Expense.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: "Deleted successfully" });
    } else {
      res.status(404).json({ error: "Expense not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});
// Monthly Category-wise Totals
router.get("/monthly-summary", async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
            category: "$category"
          },
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1 } // Latest first
      }
    ]);

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: "Failed to get summary" });
  }
});


module.exports = router;
