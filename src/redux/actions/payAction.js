export const PayAction = (payload) => {
    return {
        type: "SET_PAY",
        payload: payload,
    }
}

export const CartPriceAction = (payload) => {
    return {
        type: "SET_CART_PRICE",
        payload: payload,
    }
}

export const PaymentAction = (payload)=>{
    return{
        type:"SET_PAYMENT",
        payload:payload
    }
}

