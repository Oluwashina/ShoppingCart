import { GetApi, PostApi } from "../request";
import cogoToast from "cogo-toast";

// get cart items with limit and offset
export const getCartItems = (val) => {
  return async (dispatch, getState) => {
    dispatch({ type: "startLoader" })
    try {
      const res = await GetApi(`list_items?limit=3&offset=${val}`);
      if (res.status === 200) {
        console.log(res.data);
        dispatch({ type: "stopLoader" });
        dispatch({ type: "cartItems", data: res.data });
      }
      if (res.status === 400) {
         dispatch({ type: "stopLoader" });
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


// create order
export const createOrder = (val) => {
  return async (dispatch, getState) => {

    // get cartitems and map a new array
    var orderItem = getState().cart.cartItems.map((val) => ({
      item_id: val.id,
      quantity: val.quantity,
    }));

    var result = {
      order_item: orderItem,
      total_order_cost: val
    };

    try {
      const res = await PostApi(`create_order/`, { ...result });
      if (res.status === 201) {
        dispatch({ type: "Order_Success", data: res.data });
        cogoToast.success("Order received!", {
          position: "bottom-right",
        });
      }
      if (res.status === 400) {
        cogoToast.error(`${res.data}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
};