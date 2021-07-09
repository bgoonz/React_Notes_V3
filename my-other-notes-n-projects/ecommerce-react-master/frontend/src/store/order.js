import { fetch } from "./csrf";

// Initial State
const initialState = {}

// Action Variable
const GET_ORDER = 'order/getOrder';

// Action
const getOrder = (order) => ({
    type: GET_ORDER,
    order
})

// Thunk
export const getOneOrder = (id) => async (dispatch) => {
    const response = await fetch(`/api/orders/${id}`)
    dispatch(getOrder(response.data))
}

// Reducer
const orderReducer = (state = initialState, action) => {
    let orderList = { ...state }
    switch (action.type) {
        case GET_ORDER:
            orderList[action.order.id] = action.order
            return orderList;
        default:
            return state;
    }
}


export default orderReducer;
