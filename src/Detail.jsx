import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from './services/useFetch';
import Spinner from './Spinner';
import PageNotFound from './PagenotFound';

function Detail(props) {
	const [sku, setSku] = useState('');
	const { id } = useParams();
	const navigate = useNavigate();
	const { data: product, error, loading } = useFetch('products/' + id);
	if (loading) {
		return <Spinner />;
	}

	if (!product) {
		return <PageNotFound />;
	}
	if (error) {
		throw error;
	}

	return (
		<div id='detail'>
			<h1>{product.name}</h1>
			<p>{product.description}</p>
			<p id='price'>${product.price}</p>
			<select
				id='size'
				value={sku}
				onChange={(e) => {
					// debugger;
					setSku(e.target.value);
					console.log(id, sku);
				}}
			>
				<option value=''>What size</option>
				{product.skus.map((sku) => (
					<option
						key={sku.sku}
						value={sku.sku}
					>
						{sku.size}
					</option>
				))}
			</select>
			<p>
				<button
					className='btn btn-primary'
					onClick={() => {
						props.dispatch({ type: 'add', id, sku });
						navigate('/cart');
					}}
					disabled={!sku}
				>
					Add to cart
				</button>
			</p>
			<img
				src={`/images/${product.image}`}
				alt={product.category}
			/>
		</div>
	);
}

export default Detail;
