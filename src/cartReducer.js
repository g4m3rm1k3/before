function cartReducer(cart, action) {
	switch (action.type) {
		case 'empty':
			return [];
		case 'add': {
			const { id, sku } = action;
			const itemInCart = cart.find((item) => item.sku === sku);
			if (itemInCart) {
				return cart.map((item) =>
					item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
				);
			} else {
				return [...cart, { id, sku, quantity: 1 }];
			}
		}
		case 'updateQuantity': {
			const { sku, quantity } = action;
			return quantity === 0
				? cart.filter((item) => item.sku === sku && quantity !== 0)
				: cart.map((shoe) => (shoe.sku === sku ? { ...shoe, quantity } : shoe));
		}
		default:
			throw new Error('Unhandled action ' + action.type);
	}
}

export default cartReducer;
