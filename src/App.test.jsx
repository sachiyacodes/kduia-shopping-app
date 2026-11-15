import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { appReducer, initialState } from './context/AppContext';

function addItem(name, price) {
  fireEvent.change(screen.getByLabelText('Item name'), { target: { value: name } });
  fireEvent.change(screen.getByLabelText('Price (USD)'), { target: { value: price } });
  fireEvent.click(screen.getByRole('button', { name: 'Add item' }));
}

test('adds and removes items while keeping an exact decimal total', () => {
  render(<App />);
  expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  addItem('Apples', '0.10');
  addItem('Milk', '0.20');
  expect(screen.getByRole('status')).toHaveTextContent('Cart total: USD 0.30');
  fireEvent.click(screen.getByRole('button', { name: 'Remove Apples' }));
  expect(screen.queryByText('Apples')).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Cart total: USD 0.20');
  fireEvent.click(screen.getByRole('button', { name: 'Remove Milk' }));
  expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Cart total: USD 0.00');
});

test('rejects invalid prices without changing the cart', () => {
  render(<App />);
  for (const price of ['-1', '0', '1.234', 'abc']) {
    addItem('Invalid item', price);
    expect(screen.getByRole('alert')).toHaveTextContent('positive price');
    expect(screen.getByRole('status')).toHaveTextContent('USD 0.00');
  }
});

test('updates shopping location independently from cart contents', () => {
  render(<App />);
  addItem('Bread', '2.50');
  fireEvent.change(screen.getByLabelText('Shopping location'), { target: { value: 'Online' } });
  expect(screen.getByLabelText('Shopping location')).toHaveValue('Online');
  expect(screen.getByRole('status')).toHaveTextContent('USD 2.50');
});

test('rejects invalid reducer amounts and preserves duplicate item identities', () => {
  for (const priceCents of [-1, 0, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    expect(appReducer(initialState, { type: 'ADD_ITEM', payload: { name: 'Milk', priceCents } })).toBe(initialState);
  }
  const first = appReducer(initialState, { type: 'ADD_ITEM', payload: { name: 'Milk', priceCents: 100 } });
  const second = appReducer(first, { type: 'ADD_ITEM', payload: { name: 'Milk', priceCents: 100 } });
  expect(appReducer(second, { type: 'REMOVE_ITEM', payload: first.expenses[0].id }).expenses).toHaveLength(1);
});
