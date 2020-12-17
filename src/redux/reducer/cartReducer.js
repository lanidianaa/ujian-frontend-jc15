const INITIAL_STATE = {
    cart: [],
}

export const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "FETCH_CART":
            return{
                ...state,
                cart: action.payload,
            };
        case "CHECKOUT":
            return INITIAL_STATE;
        default:
            return state;
    }
}