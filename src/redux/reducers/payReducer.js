let initialState = {
    isShowPay: false,
}

export const PayReducer = (state = initialState, action) => {
    switch (action.type) {

        case "SET_PAY":
            return {
                ...state, isShowPay: action.payload
            }
        default:
            return state;
    }
}