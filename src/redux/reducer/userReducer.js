const INITIAL_STATE = {
    id: 0,
    email: '',
    role: ''
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                role: action.payload.role,
            };
        case 'RESET_STATE':
            return INITIAL_STATE;
        default:
            return state;
    }
}