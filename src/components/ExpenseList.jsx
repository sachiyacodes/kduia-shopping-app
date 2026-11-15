import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ExpenseItem from './ExpenseItem';

const ExpenseList = () => {
    const { expenses } = useContext(AppContext);
    return expenses.length ? (
        <ul className='list-group' aria-label='Cart items'>
            {expenses.map((item) => <ExpenseItem key={item.id} {...item} />)}
        </ul>
    ) : <p>Your cart is empty.</p>;
};

export default ExpenseList;
