import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addExpense, editExpense as updateExpense } from '../redux/actions';

const AddExpenseForm = ({ addExpense, editMode, setEditMode, editExpense, updateExpense }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editMode && editExpense) {
      setName(editExpense.name);
      setAmount(editExpense.amount);
      setDate(editExpense.date);
    }
  }, [editMode, editExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: editMode ? editExpense.id : Date.now(),
      name,
      amount,
      date: date || new Date().toISOString().slice(0, 10)
    };
    if (editMode) {
      updateExpense(newExpense);
      setEditMode(false);
    } else {
      addExpense(newExpense);
    }
    setName('');
    setAmount('');
    setDate('');
  };

  return (
    <div>
      <h2>{editMode ? 'Edit Expense' : 'Add Expense'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">{editMode ? 'Update Expense' : 'Add Expense'}</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  addExpense,
  updateExpense
};

export default connect(null, mapDispatchToProps)(AddExpenseForm);
