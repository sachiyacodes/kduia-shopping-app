import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaTimesCircle } from 'react-icons/fa';

const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext);
    return (
        <li className='list-group-item d-flex justify-content-between align-items-center'>
            <span>{props.name}</span>
            <span>
                USD {(props.priceCents / 100).toFixed(2)}
                <button type='button' className='btn btn-outline-danger btn-sm ms-3'
                    aria-label={`Remove ${props.name}`} onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: props.id })}>
                    <FaTimesCircle aria-hidden='true' />
                </button>
            </span>
        </li>
    );
};

export default ExpenseItem;
