import React, { useState } from 'react';
import AddExpense from './components/AddExpense';
import ViewExpenses from './components/ViewExpenses';
import MonthlySummary from './components/MonthlySummary';

function App() {
  const [view, setView] = useState('add'); // 'add', 'view', or 'summary'

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Personal Expense Tracker</h1>

      {/* View Section */}
      {view === 'add' && <AddExpense />}
      {view === 'view' && <ViewExpenses />}
      {view === 'summary' && <MonthlySummary />}

      {/* Navigation Buttons (shown after each section) */}
      <div style={styles.buttonGroup}>
        <button onClick={() => setView('add')} style={styles.button}>Add Expense</button>
        <button onClick={() => setView('view')} style={styles.button}>All Expenses</button>
        <button onClick={() => setView('summary')} style={styles.button}>Monthly Summary</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '30px',
  },
  button: {
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default App;
