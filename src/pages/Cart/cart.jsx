import React, { useEffect, useState } from "react";
import "../../styles/cart.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
    createOrder,
  DecrementQty,
  deleteCart,
  getCartItems,
  IncrementQty,
} from "../../store/actions/cart";
import Modal from "../../components/ModalComponents/Modal";

const CartPage = ({
  fetchItems,
  items,
  deleteItem,
  incrementQty,
  DecrementQty,
  checkout,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setOrderModal] = useState(false);

  useEffect(() => {
    document.body.classList.add("cartpage-bg");
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDelete = (id) => {
    deleteItem(id);
  };

  const handleIncrement = (id) => {
    incrementQty(id);
  };

  const handleDecrement = (id) => {
    DecrementQty(id);
  };

  // to update subtotal value when the quantity is increased or decreased
  useEffect(() => {
    let price = 0;

    items.forEach((item) => {
      price += item.quantity * parseFloat(item.price);
    });

    setTotalPrice(price);
  }, [items, totalPrice, setTotalPrice]);

  const handleCheckout = () => {
    // make api call to create order
    // checkout(totalPrice);
    setOrderModal(true);
  };

  return (
    <>
      <div className="contain mt-5 mb-5">
        <div className="cart-heading">
          <h5>Shopping Cart</h5>
        </div>

        {/* Modal for successful order placed */}
        <Modal
          title="Payment Successful"
          show={showModal}
          onClose={() => setOrderModal(false)}
        >
          <div className="text-center mt-3">
            <p>
              Your order has been received and will be delivered to you in no
              time!!
            </p>
          </div>
          <div className="text-center mt-5">
            <button
              type="submit"
              className="btn btn-checkout"
              style={{ fontWeight: "normal" }}
            >
              Continue Shopping
            </button>
          </div>
        </Modal>
        {/* end of modal for order success */}

        {/* cart section with card details */}
        <div className="row mt-4">
          {/* my cart */}
          <div className="col-lg-8">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="cart-container">
                  <div className="item">
                    <div className="item-image text-center text-md-left">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="item-description text-center text-lg-left">
                      <span>{item.name}</span>
                      <span>{item.description}</span>
                    </div>

                    <div className="quantity">
                      <span
                        className={
                          item.quantity === 0 ? "quantity-disabled" : ""
                        }
                        onClick={() => handleDecrement(item.id)}
                      >
                        -
                      </span>
                      <input type="text" value={item.quantity} readOnly />
                      <span onClick={() => handleIncrement(item.id)}>+</span>
                    </div>

                    <div className="price">
                      <sup>
                        <i className="mdi mdi-currency-ngn"></i>
                      </sup>
                      {item.cartPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                    <div className="close-icon">
                      <i
                        className="mdi mdi-close"
                        onClick={() => handleDelete(item.id)}
                      ></i>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center mt-5 mb-5">
                <p>No item(s) added yet!</p>
              </div>
            )}

            {/* cart footer -- total and pagination */}
            <div className="cart-footer">
              <div style={{ display: "flex" }}>
                <i className="mdi mdi-arrow-left"></i>
                <Link to="/" className="continue-shop">
                  Continue Shopping
                </Link>
              </div>
              <div>
                <p>1</p>
              </div>
              <div className="subtotal">
                <small className="mt-1">Subtotal</small>
                <p>
                  {" "}
                  <i className="mdi mdi-currency-ngn"></i>
                  {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>
            </div>
          </div>
          {/* card details */}
          <div className="col-lg-4 mt-5 mt-lg-0">
            <div className="checkout-card">
              <div className="checkout-title">
                <h6>Card Details</h6>
              </div>

              {/* card details form */}
              <div className="mt-4">
                {/* Name on card*/}
                <div className="form-group checkout-label mb-4">
                  <label htmlFor="name" className="mb-0">
                    Name on Card
                  </label>
                  <input
                    className="checkout-input"
                    type="text"
                    placeholder="John Alayande"
                    id="name"
                    autoComplete="off"
                  />
                </div>

                {/* card number */}
                <div className="form-group checkout-label mb-4">
                  <label htmlFor="name" className="mb-0">
                    Card Number
                  </label>
                  <input
                    className="checkout-input"
                    type="password"
                    placeholder=""
                    id="name"
                    autoComplete="off"
                  />
                </div>

                {/* Expiration Date */}
                <div className="row">
                  <div className="col-8">
                    <div className="form-group checkout-label">
                      <label htmlFor="name" className="mb-0">
                        Expiration Date
                      </label>
                      <div className="row">
                        <div className="col-6">
                          <input
                            className="checkout-input"
                            type="password"
                            placeholder="XXX"
                            id="name"
                            autoComplete="off"
                          />
                        </div>
                        <div className="col-6">
                          <input
                            className="checkout-input"
                            type="password"
                            placeholder="XXX"
                            id="name"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="form-group checkout-label">
                      <label htmlFor="name" className="mb-0">
                        CVV
                      </label>
                      <input
                        className="checkout-input"
                        type="password"
                        placeholder="XXX"
                        id="name"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* checkout button */}
              <div className="mt-5">
                <button
                  type="submit"
                  onClick={handleCheckout}
                  className="btn btn-checkout"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.cart.cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: () => dispatch(getCartItems()),
    deleteItem: (id) => dispatch(deleteCart(id)),
    incrementQty: (id) => dispatch(IncrementQty(id)),
    DecrementQty: (id) => dispatch(DecrementQty(id)),
    checkout: (val) => dispatch(createOrder(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
