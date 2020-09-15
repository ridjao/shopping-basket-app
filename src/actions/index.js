export function selectBasket(payload) {
    return { type: "SELECT_BASKET", payload }
};

export function setItems(payload) {
    return { type: "SET_ITEMS", payload }
};
