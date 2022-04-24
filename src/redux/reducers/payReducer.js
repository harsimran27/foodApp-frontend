let initialState = {
    isShowPay: false,
    totalPrice: 0,
    isPayment : false,
}

export const PayReducer = (state = initialState, action) => {
    switch (action.type) {

        case "SET_PAY":
            return {
                ...state, isShowPay: action.payload
            }

        case "SET_CART_PRICE":
            return {
                ...state, totalPrice: action.payload
            }

        case "SET_PAYMENT":
            return {
                ...state,isPayment:action.payload
            }

        default:
            return state;
    }
}