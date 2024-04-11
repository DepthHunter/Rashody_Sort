import React from 'react';
import { connect } from 'react-redux';

const TotalExpenses = ({ expenses }) => {
    console.log('Expenses:', expenses); 
    const total = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);
  
    console.log('Total:', total); 
  
    return (
      <div>
        <h2>Total Expenses</h2>
        <p>Total: ${total}</p>
      </div>
    );
  };
  
const mapStateToProps = ({ expenses }) => ({
  expenses
});

export default connect(mapStateToProps)(TotalExpenses);
