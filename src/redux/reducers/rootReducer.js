import { combineReducers } from "redux";
import ModalReducer from "./ModalReducer";
import { PayReducer } from "./payReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    pay: PayReducer,
    AlanModal: ModalReducer
})