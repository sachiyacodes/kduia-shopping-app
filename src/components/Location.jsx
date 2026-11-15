import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Location = () => {
    const { location, dispatch } = useContext(AppContext);
    return (
        <div className='mb-3'>
            <label htmlFor='shopping-location' className='form-label'>Shopping location</label>
            <select id='shopping-location' className='form-select' value={location}
                onChange={(event) => dispatch({ type: 'SET_LOCATION', payload: event.target.value })}>
                <option>In store</option>
                <option>Online</option>
            </select>
        </div>
    );
};

export default Location;
