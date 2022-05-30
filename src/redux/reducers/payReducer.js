let initialState = {
    isShowPay: false,
    totalPrice: 0,
    isPayment: false,
    orderId: "",
    deliveryAddress: "",
    noteToChef: ""
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
                ...state, isPayment: action.payload
            }

        case "SET_ORDER_ID":
            return {
                ...state, orderId: action.payload
            }

        case "SET_DELIVERY_ADDRESS":

            return {
                ...state, deliveryAddress: action.payload
            }

        case "SET_NOTE_FOR_CHEF":
            console.log("in reducer", action.payload)
            return {
                ...state, noteToChef: action.payload
            }


        default:
            return state;
    }
}