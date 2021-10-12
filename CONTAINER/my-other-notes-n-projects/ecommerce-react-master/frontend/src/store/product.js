import { fetch } from './csrf';

// Initial State
const initialState = {}

// Action Variable
const SET_PRODUCTS = 'products/setProducts';
const SET_PRODUCT = 'product/setProduct';
const SET_CATEGORY = 'product/setProductCategory';


// Action
const setProducts = (products) => ({
    type: SET_PRODUCTS,
    products
});

const setProduct = (product) => ({
    type: SET_PRODUCT,
    product
});

const setCategory = (category) => ({
    type: SET_CATEGORY,
    category
});



// Thunk
export const getAllProducts = () => async (dispatch) => {
    const response = await fetch('/api/products')
    dispatch(setProducts(response.data))
}

export const getOneProduct = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`)
    dispatch(setProduct(response.data))
}

export const setProductCategory = (categoryId) => async (dispatch) => {
    const response = await fetch(`/api/products/category/${categoryId}`)
    dispatch(setCategory(response.data))
}


// Reducer
const productReducer = (state = initialState, action) => {
    let productsList = { ...state }
    switch (action.type) {
        case SET_PRODUCTS:
            action.products.forEach((product) => {
                productsList[product.id] = product
            })
            return productsList;
        case SET_PRODUCT:
            productsList[action.product.id] = action.product
            return productsList;
        case SET_CATEGORY:
            productsList[action.product.category.categoryId] = action.product
            return productsList;
        default:
            return state;
    }
}


export default productReducer;
