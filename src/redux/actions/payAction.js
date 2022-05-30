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

export const PaymentAction = (payload) => {
    return {
        type: "SET_PAYMENT",
        payload: payload
    }
}

export const OrderAction = (payload) => {
    return {
        type: "SET_ORDER_ID",
        payload: payload
    }
}

export const DeliveryAddressAction = (payload) => {
    return {
        type: "SET_DELIVERY_ADDRESS",
        payload: payload
    }
}

export const NoteToChefAction = (payload) => {
    return {
        type: "SET_NOTE_FOR_CHEF",
        payload: payload
    }
}

