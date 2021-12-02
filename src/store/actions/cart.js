import { GetApi } from "../request";

// get cart items with limit and offset
export const getCartItems = () => {
  return async (dispatch, getState) => {
    try {
      const res = await GetApi("list_items","");
      if (res.status === 200) {
        console.log(res.data);
        dispatch({ type: "cartItems", data: res.data });
      }
      if (res.status === 400) {
        dispatch({ type: "cart_Error", err: res.data });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// delete cart
export const deleteCart = (id) => {
  return (dispatch) => {
    dispatch({ type: "deleteCart", id });
  };
};

// increase quantity in cart
export const IncrementQty = (id) => {
  return (dispatch) => {
    dispatch({ type: "INCREMENT_QTY", id });
  };
};

// DECREASE QUANTITY IN CART
export const DecrementQty = (id) => {
  return (dispatch) => {
    dispatch({ type: "DECREMENT_QTY", id });
  };
};
