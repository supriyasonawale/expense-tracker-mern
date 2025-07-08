import React, { useState } from 'react';
import axios from 'axios';
import './AddExpense.css';

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/expenses', {
        amount: parseFloat(amount),
        category,
        note
      });
      alert('✅ Expense added!');
      setAmount('');
      setCategory('');
      setNote('');
    } catch (err) {
      console.error('❌ Error:', err.response?.data || err.message);
      alert('❌ Failed to add expense');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category (e.g. Food, Travel)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button type="submit">➕ Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
