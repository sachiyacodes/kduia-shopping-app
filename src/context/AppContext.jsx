import React, { createContext, useReducer } from 'react';

export const AppContext = createContext();
export const initialState = { expenses: [], location: 'In store', nextId: 1 };

export function appReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const { name, priceCents } = action.payload;
            const total = state.expenses.reduce((sum, item) => sum + item.priceCents, priceCents);
            if (!name.trim() || !Number.isSafeInteger(priceCents) || priceCents <= 0 || !Number.isSafeInteger(total)) {
                return state;
            }
            return {
                ...state,
                expenses: [...state.expenses, { id: state.nextId, name: name.trim(), priceCents }],
                nextId: state.nextId + 1,
            };
        }
        case 'REMOVE_ITEM':
            return { ...state, expenses: state.expenses.filter((item) => item.id !== action.payload) };
        case 'SET_LOCATION':
            return ['In store', 'Online'].includes(action.payload) ? { ...state, location: action.payload } : state;
        default:
            return state;
    }
}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    return <AppContext.Provider value={{ ...state, dispatch }}>{children}</AppContext.Provider>;
};
