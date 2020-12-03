import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../appContext";
import { createOrder, getDestinations } from "../../api/order";
import storage from "../../utils/storage";
import { counter } from "@fortawesome/fontawesome-svg-core";
import { fetchUser } from "../../api/user";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

function ShoppingCart(props) {
  const { cartState, cartDispatch } = useContext(CartContext);
  const [cartempty, setCartEmpty] = useState(true);
  const [item_and_amount, setItem_and_amount] = useState({});
  const [jump, setJump] = useState(false);
  const [destination, setDestination] = useState([]);

  useEffect(() => {
    setCartEmpty(!cartState || cartState.length === 0);
    if (!(!cartState || cartState.length === 0)) {
      setItem_and_amount(countItem(cartState));
    }
    return () => {
      // cleanup
    };
  }, [cartState]);

  useEffect(async () => {
    if (destination.length === 0) {
      const des = await getDestinations(storage.getAccessToken());
      console.log("---", des);
    }
  }, []);

  const countItem = (arr) => {
    var counter = {};
    arr.forEach(function (obj) {
      var key = JSON.stringify(obj);
      counter[key] = (counter[key] || 0) + 1;
    });
    return counter;
  };

  const countBill = () => {
    let total_bill = 0;
    Object.keys(item_and_amount).map((key) => {
      let num = item_and_amount[key];
      let price = JSON.parse(key)["price"];
      total_bill += num * price;
    });
    return total_bill;
  };

  const handleChange = (item, value) => {};
  const decrement = (key) => {
    let value = item_and_amount[key];
    if (value > 0) value -= 1;
    for (var i = 0; i < cartState.length; i++) {
      if (cartState[i].name === JSON.parse(key).name) {
        cartState.splice(i, 1);
        break;
      }
    }
    cartDispatch(cartState);

    // cartDispatch(cartState.splice(JSON.parse(key)))
    setItem_and_amount({ ...item_and_amount, [key]: value });
  };
  const increment = (key) => {
    const value = item_and_amount[key] + 1;
    cartDispatch([...cartState, JSON.parse(key)]);
    setItem_and_amount({ ...item_and_amount, [key]: value });
  };

  const handleItem = async () => {
    let orders = [];
    Object.keys(item_and_amount).map((key) => {
      let item = {};
      item["amount"] = item_and_amount[key];
      item["destination"] = 1; //之後要改，這裡是destination_id 之後要先找destination資料表抓出id再丟
      item["productId"] = JSON.parse(key)["id"];
      orders.push(item);
    });
    setJump(true);
    // const user = await fetchUser(storage.getAccessToken());
    // const orderNumber = await createOrder(orders, storage.getAccessToken());
    // console.log("orderNumber:", orderNumber);
  };

  return (
    <div class="container space-1 space-md-2">
      <div class="row">
        <div class="col-lg-8 mb-7 mb-lg-0">
          <div class="d-flex justify-content-between align-items-end border-bottom pb-3 mb-7">
            <h1 class="h3 mb-0">購物車</h1>
            <span>{cartempty ? null : cartState.length} 產品</span>
          </div>
          {
            cartempty
              ? null
              : Object.keys(item_and_amount).map((key) => {
                  const { id, name, price, img } = JSON.parse(key);
                  const num = item_and_amount[key];
                  return (
                    <div class="border-bottom pb-5 mb-5">
                      <div class="media">
                        <div class="max-w-15rem w-100 mr-3">
                          <img class="img-fluid" src={img} alt={img} />
                        </div>
                        <div class="media-body">
                          <div class="row">
                            <div class="col-md-7 mb-3 mb-md-0">
                              <a class="h5 d-block" href="#">
                                {name}
                              </a>

                              <div class="d-block d-md-none">
                                <span class="h5 d-block mb-1">{price}</span>
                              </div>
                            </div>
                            <div
                              className="input-group input-group-sm"
                              style={{ maxWidth: "150px" }}
                            >
                              <span className="input-group-btn">
                                <button
                                  className="btn btn-default btn-sm"
                                  onClick={() => decrement(key)}
                                >
                                  <i className="fa fa-minus" />
                                </button>
                              </span>
                              <input
                                style={{ textAlign: "right" }}
                                className="form-control"
                                type="text"
                                value={num}
                              />
                              <span className="input-group-btn">
                                <button
                                  onClick={() => increment(key)}
                                  className="btn btn-default btn-sm"
                                >
                                  <i className="fa fa-plus" />
                                </button>
                              </span>

                              {/* <div class="col-auto">
                                  <a
                                    class="d-block text-body font-size-1 mb-1"
                                    href="javascript:;"
                                  >
                                    <i class="far fa-trash-alt text-hover-primary mr-1"></i>
                                    <span class="font-size-1 text-hover-primary">
                                      Remove
                                    </span>
                                  </a>                           
                                </div> */}
                            </div>

                            <div class="col-4 col-md-2 d-none d-md-inline-block text-right">
                              <span class="h5 d-block mb-1">{price * num}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            // console.log(cartState)
          }
          <div class="d-sm-flex justify-content-end">
            <a class="font-weight-bold" href="/shop/">
              <i class="fas fa-angle-left fa-xs mr-1"></i>
              繼續購物
            </a>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="pl-lg-4">
            <div class="card shadow-soft p-4 mb-4">
              <div class="border-bottom pb-4 mb-4">
                <h2 class="h3 mb-0">訂單總結</h2>
              </div>
              <div class="border-bottom pb-4 mb-4">
                <div class="media align-items-center mb-3">
                  <span class="d-block font-size-1 mr-3">
                    {<span>{cartempty ? null : cartState.length} 產品</span>}
                  </span>
                  <div class="media-body text-right">
                    <span class="text-dark font-weight-bold">
                      {countBill()}
                    </span>
                  </div>
                </div>

                <div class="media align-items-center mb-3">
                  <span class="d-block font-size-1 mr-3">Delivery</span>
                  <div class="media-body text-right">
                    <span class="text-dark font-weight-bold">Free</span>
                  </div>
                </div>
                <div class="card shadow-none mb-3">
                  <div class="card-body p-0">
                    <div class="custom-control custom-radio d-flex align-items-center small">
                      <input
                        type="radio"
                        class="custom-control-input"
                        id="deliveryRadio1"
                        name="deliveryRadio"
                        checked
                      />
                      <label
                        class="custom-control-label ml-1"
                        for="deliveryRadio1"
                      >
                        <span class="d-block font-size-1 font-weight-bold mb-1">
                          Free - Standard delivery
                        </span>
                        <span class="d-block text-muted">
                          Shipment may take 5-6 business days.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="card shadow-none">
                  <div class="card-body p-0">
                    <div class="custom-control custom-radio d-flex align-items-center small">
                      <input
                        type="radio"
                        class="custom-control-input"
                        id="deliveryRadio2"
                        name="deliveryRadio"
                      />
                      <label
                        class="custom-control-label ml-1"
                        for="deliveryRadio2"
                      >
                        <span class="d-block font-size-1 font-weight-bold mb-1">
                          $7.99 - Express delivery
                        </span>
                        <span class="d-block text-muted">
                          Shipment may take 2-3 business days.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="media align-items-center mb-3">
                <span class="d-block font-size-1 mr-3">Total</span>
                <div class="media-body text-right">
                  <span class="text-dark font-weight-bold">{countBill()}</span>
                </div>
              </div>

              <div class="row mx-1">
                <div class="col px-1 my-1">
                  <button
                    class="btn btn-primary btn-block btn-pill transition-3d-hover"
                    onClick={handleItem}
                  >
                    結帳
                  </button>
                </div>
                <div class="col px-1 my-1">
                  <button
                    type="submit"
                    class="btn btn-soft-warning btn-block btn-pill transition-3d-hover"
                  >
                    {/* <img
                      src="/assets/img/logos/paypal.png"
                      width="70"
                      alt="PayPal logo"
                    /> */}
                  </button>
                </div>
              </div>
              {jump ? <Redirect to="/shop/order" /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
