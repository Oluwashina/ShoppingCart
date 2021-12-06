import React, { useEffect, useState } from "react";
import "../../styles/cart.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Formik } from "formik";
import { cardValidator } from "../../validationSchema/validator";
import {
  createOrder,
  DecrementQty,
  deleteCart,
  getCartItems,
  IncrementQty,
} from "../../store/actions/cart";
import Modal from "../../components/ModalComponents/Modal";
import Pagination from "../../components/PaginationComponent/Pagination";

const CartPage = ({
  fetchItems,
  items,
  deleteItem,
  incrementQty,
  DecrementQty,
  checkout,
  loading,
  itemsLength,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setOrderModal] = useState(false);

  useEffect(() => {
    document.body.classList.add("cartpage-bg");
  }, []);

  useEffect(() => {
    let offset = 0;
    fetchItems(offset);
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

  const handleSubmit = async (values) => {
    console.log(values);
    // make api call to create order
    await checkout(totalPrice);
    await setOrderModal(true);
  };

  let PageSize = 3;

  const [currentPage, setCurrentPage] = useState(1);

  // fetch cart data for pagination selected
  const getMoreItemsByOffset = (page) => {
    setCurrentPage(page)
    // fetch cart items based on the page selected
    const offset = (page - 1) * PageSize;
    fetchItems(offset)
  }

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
              onClick={() => setOrderModal(false)}
            >
              Continue Shopping
            </button>
          </div>
        </Modal>
        {/* end of modal for order success */}

        {!loading ? (
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
                <div className="text-center mt-3 mb-5">
                  <p>No item(s) added yet!</p>
                </div>
              )}

              {/* cart footer -- total and pagination */}
              <div className="cart-footer">
                <div style={{ display: "flex" }}>
                  <i className="mdi mdi-arrow-left-thin"></i>
                  <Link to="/" className="continue-shop">
                    Continue Shopping
                  </Link>
                </div>
                <div>
                  {/* pagination section */}
                  <Pagination
                    currentPage={currentPage}
                    totalCount={itemsLength}
                    pageSize={PageSize}
                    onPageChange={(page) => getMoreItemsByOffset(page)}
                  />
                </div>
                <div className="subtotal">
                  <small className="mt-1">Subtotal</small>
                  <p>
                    {" "}
                    <i className="mdi mdi-currency-ngn"></i>
                    {totalPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
              </div>
            </div>
            {/* card details */}
            {items.length > 0 ? (
              <div className="col-lg-4 mt-5 mt-lg-0">
                <div className="checkout-card">
                  <div className="checkout-title">
                    <h6>Card Details</h6>
                  </div>

                  {/* card details form */}
                  <Formik
                    onSubmit={(values, { setSubmitting }) =>
                      handleSubmit(values, setSubmitting)
                    }
                    validationSchema={cardValidator}
                    initialValues={{
                      name: "",
                      cardNumber: "",
                      month: "",
                      year: "",
                      cvv: "",
                    }}
                  >
                    {({
                      handleChange,
                      isSubmitting,
                      handleSubmit,
                      handleBlur,
                      values,
                      touched,
                      errors,
                    }) => (
                      <Form onSubmit={handleSubmit}>
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
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.name}
                              autoComplete="off"
                            />
                            <small style={{ color: "#dc3545" }}>
                              {touched.name && errors.name}
                            </small>
                          </div>

                          {/* card number */}
                          <div className="form-group checkout-label mb-4">
                            <label htmlFor="cardNumber" className="mb-0">
                              Card Number
                            </label>
                            <input
                              className="checkout-input card-num"
                              type="password"
                              placeholder=""
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.cardNumber}
                              id="cardNumber"
                              autoComplete="off"
                            />
                            <small style={{ color: "#dc3545" }}>
                              {touched.cardNumber && errors.cardNumber}
                            </small>
                          </div>

                          {/* Expiration Date */}
                          <div className="row">
                            <div className="col-8">
                              <div className="form-group checkout-label">
                                <label htmlFor="month" className="mb-0">
                                  Expiration Date
                                </label>
                                <div className="row">
                                  <div className="col-6">
                                    <input
                                      className="checkout-input"
                                      type="text"
                                      placeholder="MM"
                                      id="month"
                                      autoComplete="off"
                                      maxLength="2"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={values.month}
                                    />
                                    <small style={{ color: "#dc3545" }}>
                                      {touched.month && errors.month}
                                    </small>
                                  </div>
                                  <div className="col-6">
                                    <input
                                      className="checkout-input"
                                      type="text"
                                      placeholder="YY"
                                      id="year"
                                      autoComplete="off"
                                      maxLength="2"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={values.year}
                                    />
                                    <small style={{ color: "#dc3545" }}>
                                      {touched.year && errors.year}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-4">
                              <div className="form-group checkout-label">
                                <label htmlFor="cvv" className="mb-0">
                                  CVV
                                </label>
                                <input
                                  className="checkout-input"
                                  type="password"
                                  placeholder="XXX"
                                  id="cvv"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.cvv}
                                  autoComplete="off"
                                />
                                <small style={{ color: "#dc3545" }}>
                                  {touched.cvv && errors.cvv}
                                </small>
                              </div>
                            </div>
                          </div>
                          {/* checkout button */}
                          <div className="mt-5">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="btn btn-checkout"
                            >
                              Checkout
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <>
            <div className="text-center mt-5">
              <p>Loading....</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.cart.cartItems,
    loading: state.cart.loading,
    itemsLength: state.cart.itemsLength
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: (val) => dispatch(getCartItems(val)),
    deleteItem: (id) => dispatch(deleteCart(id)),
    incrementQty: (id) => dispatch(IncrementQty(id)),
    DecrementQty: (id) => dispatch(DecrementQty(id)),
    checkout: (val) => dispatch(createOrder(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
