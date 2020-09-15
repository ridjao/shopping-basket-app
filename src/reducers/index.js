const initialState = {
    customerId: 1,
    items: []
};

function rootReducer(state = initialState, action) {
    if (action.type === "SELECT_BASKET") {
        return Object.assign({}, state, {
            customerId: action.payload
        });
    }

    if (action.type === "SET_ITEMS") {
        console.log("Set items:", action.payload);
        return Object.assign({}, state, {
            items: action.payload
        });
    }

    return state;
};

export default rootReducer;