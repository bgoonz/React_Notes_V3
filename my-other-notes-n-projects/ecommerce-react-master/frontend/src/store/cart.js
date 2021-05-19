import { fetch } from './csrf';


const CartActionTypes = {
    // TOGGLE_CART_HIDDEN: 'TOGGLE_CART_HIDDEN',
    ADD_ITEM: 'cart/ADD_ITEM',
    // REMOVE_ITEM: 'REMOVE_ITEM',
    // CLEAR_ITEM_FROM_CART: 'CLEAR_ITEM_FROM_CART'
};

// export const toggleCartHidden = () => ({
//     type: CartActionTypes.TOGGLE_CART_HIDDEN
// });

export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
});

// export const removeItem = item => ({
//     type: CartActionTypes.REMOVE_ITEM,
//     payload: item
// });

// export const clearItemFromCart = item => ({
//     type: CartActionTypes.CLEAR_ITEM_FROM_CART,
//     payload: item
// });

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}
// };

export const addItemToCart = (cartItem) => async (dispatch) => {
    const res = await fetch('/api/orders', {
        method: 'post',
        body: JSON.stringify(cartItem)
    })
}


// export const removeItemFromCart = (cartItems, cartItemToRemove) => {
//     const existingCartItem = cartItems.find(
//         cartItem => cartItem.id === cartItemToRemove.id
//     );

//     if (existingCartItem.quantity === 1) {
//         return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
//     }

//     return cartItems.map(cartItem =>
//         cartItem.id === cartItemToRemove.id
//             ? { ...cartItem, quantity: cartItem.quantity - 1 }
//             : cartItem
//     );
// };

// const selectCart = state => state.cart;

// export const selectCartItems = createSelector(
//     [selectCart],
//     cart => cart.cartItems
// );

// export const selectCartHidden = createSelector(
//     [selectCart],
//     cart => cart.hidden
// );

// export const selectCartItemsCount = createSelector(
//     [selectCartItems],
//     cartItems =>
//         cartItems.reduce(
//             (accumalatedQuantity, cartItem) =>
//                 accumalatedQuantity + cartItem.quantity,
//             0
//         )
// );

// export const selectCartTotal = createSelector(
//     [selectCartItems],
//     cartItems =>
//         cartItems.reduce(
//             (accumalatedQuantity, cartItem) =>
//                 accumalatedQuantity + cartItem.quantity * cartItem.price,
//             0
//         )
// );






const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            };
        // case CartActionTypes.REMOVE_ITEM:
        //     return {
        //         ...state,
        //         cartItems: removeItemFromCart(state.cartItems, action.payload)
        //     };
        // case CartActionTypes.CLEAR_ITEM_FROM_CART:
        //     return {
        //         ...state,
        //         cartItems: state.cartItems.filter(
        //             cartItem => cartItem.id !== action.payload.id
        //         )
        //     };
        default:
            return state;
    }
};

export default cartReducer;
