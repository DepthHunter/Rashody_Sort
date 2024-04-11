import React from 'react';
import ExpensesList from './components/ExpensesList';
import AddExpenseForm from './components/AddExpenseForm';
import TotalExpenses from './components/TotalExpenses';

const App = () => {
  return (
    <div>
      <h1>Cost Accounting App</h1>
      <AddExpenseForm />
      <ExpensesList />
      <TotalExpenses />
    </div>
  );
};

export default App;
