const initialState = {
    id: null,
    code: null
}

const reducer = (state = initialState, action) => {
    console.log(action);
    if(action.type === 'type') {
        state = {
            ...state,
            id: action.value
        }
    }

    return state;
}

export default reducer;