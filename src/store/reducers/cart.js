const initState = {
  cartItems: [],
  itemsLength: 0,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case "cartItems":
      // map a new cart items array with quantity field added;
      var newCartItems = action.data.results.map((val) => ({
        id: val.id,
        name: val.name,
        price: val.price,
        cartPrice: val.price,
        description: val.description,
        image: val.image,
        quantity: 1,
      }));

      return {
        ...state,
        cartItems: newCartItems,
        itemsLength: action.data.count,
      };
    case "deleteCart":
      let removedItem = state.cartItems.filter((item) => item.id !== action.id);
      return {
        ...state,
        cartItems: removedItem,
      };
    case "INCREMENT_QTY":
      let IncrementItems = state.cartItems.map((item) =>
        item.id === action.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              cartPrice: (item.quantity + 1) * parseFloat(item.price),
            }
          : item
      );

      return {
        ...state,
        cartItems: IncrementItems,
      };
    case "DECREMENT_QTY":
      let decrementItems = state.cartItems.map((item) =>
        item.id === action.id
          ? {
              ...item,
              quantity: item.quantity - 1,
              cartPrice: (item.quantity - 1) * parseFloat(item.price),
            }
          : item
      );
      return {
        ...state,
        cartItems: decrementItems,
      };
    default:
      return state;
  }
};

export default cartReducer;
