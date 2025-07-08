import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewExpenses.css';

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/expenses');
      const data = res.data;
      setExpenses(data);

      // Calculate monthly total
      const now = new Date();
      const currentMonth = now.getMonth(); // 0-indexed
      const currentYear = now.getFullYear();

      const thisMonthExpenses = data.filter(exp => {
        const expDate = new Date(exp.date);
        return (
          expDate.getMonth() === currentMonth &&
          expDate.getFullYear() === currentYear
        );
      });

      const total = thisMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      setMonthlyTotal(total);

    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this expense?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      alert("✅ Expense deleted!");
      fetchExpenses(); // Refresh list
    } catch (err) {
      console.error('Error deleting expense:', err);
      alert("❌ Failed to delete expense.");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="expense-list">
      <h2>All Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount (₹)</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No expenses found.</td>
            </tr>
          ) : (
            expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.category}</td>
                <td>₹{expense.amount.toFixed(2)}</td>
                <td>{expense.note}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(expense._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Monthly total below table */}
      <h3 style={{ marginTop: '20px', textAlign: 'right', color: '#2c3e50' }}>
        Total for {new Date().toLocaleString('default', { month: 'long' })}: ₹{monthlyTotal.toFixed(2)}
      </h3>
    </div>
  );
};

export default ViewExpenses;
