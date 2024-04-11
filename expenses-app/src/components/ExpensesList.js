import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../redux/actions';
import { getFilteredAndSortedExpenses} from '../selector';

const ExpensesList = ({ expenses, deleteExpense, editExpense }) => {
  const [editMode, setEditMode] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedAmount, setUpdatedAmount] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');
  const [filter, setFilter] = useState(''); 
  const [sort, setSort] = useState(''); 


  const filteredExpenses = expenses.filter(expense => expense.name.includes(filter)); 


  const sortedExpenses = filteredExpenses.sort((a, b) => {
  
    if (sort === 'date') {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  const handleDelete = (id) => {
    deleteExpense(id);
  };

  const handleEdit = (expense) => {
    setEditMode(expense.id);
    setUpdatedName(expense.name);
    setUpdatedAmount(expense.amount);
    setUpdatedDate(expense.date);
  };

  const handleSaveEdit = (expense) => {
    editExpense(expense.id, { ...expense, name: updatedName, amount: updatedAmount, date: updatedDate });
    setEditMode(null);
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setUpdatedName('');
    setUpdatedAmount('');
    setUpdatedDate('');
  };

  return (
    <div>
      <h2>Expenses List</h2>
  
      <input type="text" placeholder="Filter by name" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort by</option>
        <option value="date">Date</option>
     
      </select>
      <ul>
        {sortedExpenses.map(expense => (
          <li key={expense.id}>
            {editMode === expense.id ? (
              <>
                <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
                <input type="number" value={updatedAmount} onChange={(e) => setUpdatedAmount(e.target.value)} />
                <input type="date" value={updatedDate} onChange={(e) => setUpdatedDate(e.target.value)} />
                <button onClick={() => handleSaveEdit(expense)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span>{expense.name} - ${expense.amount} - {expense.date}</span>
                <button onClick={() => handleEdit(expense)}>Edit</button>
                <button onClick={() => handleDelete(expense.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  expenses: state.expenses
});

export default connect(mapStateToProps, { deleteExpense, editExpense })(ExpensesList);
