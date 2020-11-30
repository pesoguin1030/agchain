import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../appContext";

function ShoppingCart(props) {
  const { cartState, cartDispatch } = useContext(CartContext);
  const [cartempty, setCartEmpty] = useState(true);
  const [item_and_price, setItem_and_price] = useState({});
  useEffect(() => {
    setCartEmpty(!cartState || cartState.length === 0);

    if (!(!cartState || cartState.length === 0)) {
      console.log(cartState);
    }
    return () => {
      // cleanup
    };
  }, [cartState]);

  const createOrder = () => {
    alert("hi");
  };
  return (
    <div class="container space-1 space-md-2">
      <div class="row">
        <div class="col-lg-8 mb-7 mb-lg-0">
          <div class="d-flex justify-content-between align-items-end border-bottom pb-3 mb-7">
            <h1 class="h3 mb-0">購物車</h1>
            <span>{cartempty ? null : cartState.length} 產品</span>
          </div>
          {cartempty
            ? null
            : cartState.map(({ id, name, price, img }) => {
                //  console.log("----",typeof(img));
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

                          <div class="col-md-3">
                            <div class="row">
                              <div class="col-auto">
                                <select
                                  class="custom-select custom-select-sm w-auto mb-3"
                                  // onChange={}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                </select>
                              </div>

                              <div class="col-auto">
                                <a
                                  class="d-block text-body font-size-1 mb-1"
                                  href="javascript:;"
                                >
                                  <i class="far fa-trash-alt text-hover-primary mr-1"></i>
                                  <span class="font-size-1 text-hover-primary">
                                    Remove
                                  </span>
                                </a>

                                <a
                                  class="d-block text-body font-size-1"
                                  href="javascript:;"
                                >
                                  <i class="far fa-heart text-hover-primary mr-1"></i>
                                  <span class="font-size-1 text-hover-primary">
                                    Save for later
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>

                          <div class="col-4 col-md-2 d-none d-md-inline-block text-right">
                            <span class="h5 d-block mb-1">{price}</span>
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
            <a class="font-weight-bold" href="classic.html">
              <i class="fas fa-angle-left fa-xs mr-1"></i>
              Continue shopping
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
                    <span class="text-dark font-weight-bold">$73.98</span>
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
                <span class="d-block font-size-1 mr-3">Estimated tax</span>
                <div class="media-body text-right">
                  <span class="text-dark font-weight-bold">--</span>
                </div>
              </div>

              <div class="media align-items-center mb-3">
                <span class="d-block font-size-1 mr-3">Total</span>
                <div class="media-body text-right">
                  <span class="text-dark font-weight-bold">$73.98</span>
                </div>
              </div>

              <div class="row mx-1">
                <div class="col px-1 my-1">
                  <button
                    class="btn btn-primary btn-block btn-pill transition-3d-hover"
                    onClick={createOrder}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
