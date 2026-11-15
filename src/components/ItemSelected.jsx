import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const ItemSelected = () => {
    const { dispatch } = useContext(AppContext);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const addItem = (event) => {
        event.preventDefault();
        if (!name.trim() || !/^\d{1,6}(\.\d{1,2})?$/.test(price) || Number(price) <= 0) {
            setError('Enter an item name and a positive price with at most two decimal places.');
            return;
        }
        const [dollars, cents = ''] = price.split('.');
        dispatch({ type: 'ADD_ITEM', payload: { name, priceCents: Number(dollars) * 100 + Number(cents.padEnd(2, '0')) } });
        setName('');
        setPrice('');
        setError('');
    };

    return (
        <form onSubmit={addItem}>
            <div className='row g-3'>
                <div className='col-sm'>
                    <label htmlFor='item-name' className='form-label'>Item name</label>
                    <input id='item-name' className='form-control' required maxLength={100}
                        value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className='col-sm'>
                    <label htmlFor='item-price' className='form-label'>Price (USD)</label>
                    <input id='item-price' className='form-control' required inputMode='decimal' maxLength={9}
                        value={price} onChange={(event) => setPrice(event.target.value)} />
                </div>
            </div>
            {error && <p role='alert' className='text-danger mt-2'>{error}</p>}
            <button type='submit' className='btn btn-primary mt-3'>Add item</button>
        </form>
    );
};

export default ItemSelected;
