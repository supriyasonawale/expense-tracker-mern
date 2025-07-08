import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewExpenses.css"; // reuse styles
const getMonthName = (monthNumber) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthNumber - 1] || 'Invalid';
};

const MonthlySummary = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/expenses/monthly-summary");
        setSummary(res.data);
      } catch (err) {
        console.error("❌ Error fetching summary:", err);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="expense-list">
      <h2>📊 Monthly Category-wise Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Year</th>
            <th>Category</th>
            <th>Total (₹)</th>
          </tr>
        </thead>
        <tbody>
          {summary.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No summary available.</td>
            </tr>
          ) : (
            summary.map((item, idx) => (
              <tr key={idx}>
               <td>{getMonthName(item._id.month)}</td>

                <td>{item._id.year}</td>
                <td>{item._id.category}</td>
                <td>₹{item.totalAmount.toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlySummary;
