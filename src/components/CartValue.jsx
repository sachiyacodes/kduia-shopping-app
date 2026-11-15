import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CartValue = () => {
    const { expenses } = useContext(AppContext);
    const totalCents = expenses.reduce((total, item) => total + item.priceCents, 0);
    return <p className='alert alert-success' role='status'>Cart total: USD {(totalCents / 100).toFixed(2)}</p>;
};

export default CartValue;
