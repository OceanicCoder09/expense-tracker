import React, { useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const categories = ["Food", "Transport", "Entertainment", "Utilities", "Other"];
  
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!date || !amount || !category) return;
    
    const newExpense = {
      id: Date.now(),
      date,
      amount: parseFloat(amount),
      category,
    };
    
    setExpenses([...expenses, newExpense]);
    setDate("");
    setAmount("");
    setCategory("");
  };

  const getCategoryData = () => {
    const categoryTotals = {};
    expenses.forEach((expense) => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });
    return Object.keys(categoryTotals).map((category) => ({
      name: category,
      value: categoryTotals[category],
    }));
  };

  const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316"];
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const gradientBackground = {
    background: 'linear-gradient(135deg, #f6f7ff 0%, #ffffff 100%)'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 12px -1px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.06)'
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.875rem',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '1rem',
    transition: 'all 0.2s ease-in-out',
    outline: 'none',
    backgroundColor: '#f8fafc',
    marginBottom: '1rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 2px 4px rgba(99, 102, 241, 0.3)',
    marginTop: '0.5rem'
  };

  return (
    <div style={{
      minHeight: '100vh',
      ...gradientBackground,
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '3rem',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '3rem',
          textAlign: 'center',
          fontWeight: '700'
        }}>Expense Tracker</h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div style={cardStyle}>
            <h2 style={{
              fontSize: '1.75rem',
              marginBottom: '2rem',
              color: '#1e293b',
              fontWeight: '600'
            }}>Add New Expense</h2>
            
            <form onSubmit={handleAddExpense}>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                style={inputStyle}
              />
              
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                required
                style={inputStyle}
              />
              
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                style={{
                  ...inputStyle,
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236366f1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <button
                type="submit"
                style={buttonStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#4f46e5';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#6366f1';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Add Expense
              </button>
            </form>
          </div>

          <div style={cardStyle}>
            <h2 style={{
              fontSize: '1.75rem',
              marginBottom: '1.5rem',
              color: '#1e293b',
              fontWeight: '600'
            }}>Spending Overview</h2>
            
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: '#f8fafc',
              borderRadius: '12px'
            }}>
              <p style={{ 
                color: '#64748b',
                marginBottom: '0.5rem',
                fontSize: '1.1rem'
              }}>Total Expenses</p>
              <p style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>${totalExpenses.toFixed(2)}</p>
            </div>
            
            <PieChart width={400} height={300}>
              <Pie
                data={getCategoryData()}
                cx={200}
                cy={150}
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {getCategoryData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={{
            fontSize: '1.75rem',
            marginBottom: '2rem',
            color: '#1e293b',
            fontWeight: '600'
          }}>Recent Expenses</h2>
          
          <div>
            {expenses.length === 0 ? (
              <div style={{
                textAlign: 'center',
                color: '#64748b',
                padding: '3rem',
                backgroundColor: '#f8fafc',
                borderRadius: '12px'
              }}>
                <p style={{ fontSize: '1.1rem' }}>No expenses added yet</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Start tracking your expenses by adding them above</p>
              </div>
            ) : (
              expenses.map((expense) => (
                <div
                  key={expense.id}
                  style={{
                    padding: '1.25rem',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'background-color 0.2s ease-in-out',
                    ':hover': {
                      backgroundColor: '#f8fafc'
                    }
                  }}
                >
                  <div>
                    <p style={{
                      fontWeight: '600',
                      color: '#1e293b',
                      marginBottom: '0.375rem',
                      fontSize: '1.1rem'
                    }}>{expense.category}</p>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#64748b'
                    }}>{new Date(expense.date).toLocaleDateString('en-US', { 
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                  <p style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#6366f1'
                  }}>${expense.amount.toFixed(2)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;