import React, { useEffect, useReducer } from 'react';
import cartReducer from './cartReducer';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Products from './Products';
import { Routes, Route } from 'react-router-dom';
import Cart from './Cart';
import Detail from './Detail';
import Checkout from './Checkout';

let initialCart;
try {
	initialCart = JSON.parse(localStorage.getItem('cart')) ?? [];
} catch {
	console.error('The cart could not be parsed into JSON');
	initialCart = [];
}

export default function App() {
	const [cart, dispatch] = useReducer(cartReducer, initialCart);

	useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

	console.log(cart);
	return (
		<>
			<div className='content'>
				<Header />
				<main>
					<Routes>
						<Route
							path='/'
							element={<h1>Welcome to Carved Rock Fitness</h1>}
						/>
						<Route
							path='/:category'
							element={<Products />}
						/>
						<Route
							path='/:category/:id'
							element={<Detail dispatch={dispatch} />}
						/>
						<Route
							path='/cart'
							element={
								<Cart
									cart={cart}
									dispatch={dispatch}
								/>
							}
						/>
						<Route
							path='/checkout'
							element={
								<Checkout
									cart={cart}
									dispatch={dispatch}
								/>
							}
						/>
					</Routes>
				</main>
			</div>
			<Footer />
		</>
	);
}
