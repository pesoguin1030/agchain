import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../appContext";
import { createOrder } from "../../api/order";
import storage from "../../utils/storage";
import { counter } from "@fortawesome/fontawesome-svg-core";
import { fetchUser } from "../../api/user";
import { fetchDestination } from "../../api/destination";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

function ShoppingCart(props) {
  const { cartState, cartDispatch } = useContext(CartContext);
  const [cartEmpty, setCartEmpty] = useState(true);
  const [item_and_amount, setItem_and_amount] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [jumpTo, setJumpTo] = useState(null);
  const [destinationId, setDestinationId] = useState();
  const [destinationInputVisible, setDestinationInputVisible] = useState(false);
  const [giftToggled, setGiftToggled] = useState(false);

  useEffect(() => {
    const getDestination = async () => {
      const { items, offset } = await fetchDestination();
      if (Array.isArray(items)) {
        setDestinations(items);
      }
    };
    getDestination();
    setCartEmpty(!cartState || cartState.length === 0);
    if (!(!cartState || cartState.length === 0)) {
      setItem_and_amount(countItem(cartState));
    }
    return () => {
      // cleanup
    };
  }, [cartState]);

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

  const handleDestination = (e) => {
    setDestinationId(e.target.value);
  };

  const handleItem = async () => {
    let orders = [];
    Object.keys(item_and_amount).map((key) => {
      let item = {};
      item["amount"] = item_and_amount[key];
      item["destination"] = destinationId; //之後要改，這裡是destination_id 之後要先找destination資料表抓出id再丟
      item["productId"] = JSON.parse(key)["id"];
      orders.push(item);
    });

    const orderNumber = await createOrder(orders);
    console.log("orderNumber:", orderNumber);

    if (giftToggled) setJumpTo(`/shop/gift/${orderNumber}`);
    else setJumpTo(`/shop/analysis/${orderNumber}`);
  };

  return jumpTo ? (
    <Redirect to={jumpTo} />
  ) : (
    <div className="container space-1 space-md-2">
      <div className="row">
        <div className="col-lg-7 mb-7 mb-lg-0">
          <div className="d-flex justify-content-between align-items-end border-bottom pb-3 mb-7">
            <h1 className="h3 mb-0">購物車</h1>
            <span>{cartEmpty ? null : cartState.length} 產品</span>
          </div>
          {
            cartEmpty
              ? null
              : Object.keys(item_and_amount).map((key) => {
                  const { id, name, price, img } = JSON.parse(key);
                  const num = item_and_amount[key];
                  return (
                    <div key={id} className="border-bottom pb-5 mb-5">
                      <div className="media">
                        <div className="max-w-15rem w-100 mr-3">
                          <img className="img-fluid" src={img} alt={img} />
                        </div>
                        <div className="media-body">
                          <div className="row">
                            <div className="col-md-7 mb-3 mb-md-0">
                              <a className="h5 d-block" href="#">
                                {name}
                              </a>

                              <div className="d-block d-md-none">
                                <span className="h5 d-block mb-1">
                                  {price * num}
                                </span>
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

                              {/* <div className="col-auto">
                                  <a
                                    className="d-block text-body font-size-1 mb-1"
                                    href="javascript:;"
                                  >
                                    <i className="far fa-trash-alt text-hover-primary mr-1"></i>
                                    <span className="font-size-1 text-hover-primary">
                                      Remove
                                    </span>
                                  </a>                           
                                </div> */}
                            </div>

                            <div className="col-4 col-md-2 d-none d-md-inline-block text-right">
                              <span className="h5 d-block mb-1">
                                {price * num}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            // console.log(cartState)
          }
          <div className="d-sm-flex justify-content-end">
            <a className="font-weight-bold" href="/shop/">
              <i className="fas fa-angle-left fa-xs mr-1"></i>
              繼續購物
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="pl-lg-4">
            <div className="card shadow-soft p-4 mb-4">
              <div className="border-bottom pb-4 mb-4">
                <h2 className="h3 mb-0">訂單總結</h2>
              </div>
              <div className="border-bottom pb-4 mb-4">
                <div className="media align-items-center mb-3">
                  <span className="d-block font-size-1 mr-3">
                    {<span>{cartEmpty ? null : cartState.length} 產品</span>}
                  </span>
                  <div className="media-body text-right">
                    <span className="text-dark font-weight-bold">
                      {countBill()}
                    </span>
                  </div>
                </div>

                <div className="media align-items-center mb-3">
                  <span className="d-block font-size-1 mr-3">目的地</span>
                </div>
                <div className="card shadow-none mb-3">
                  <div className="card-body p-0">
                    {destinationInputVisible ? (
                      <input
                        className="form-control"
                        placeholder="詳細地址"
                        onChange={handleDestination}
                      />
                    ) : (
                      <select
                        className="custom-select"
                        onChange={handleDestination}
                      >
                        <option value="36">清華大學台達館305室</option>
                        {destinations.map(({ address, id }) => (
                          <option value={address}>{address}</option>
                        ))}
                      </select>
                    )}
                    <a
                      href="javascript:void(0);"
                      className="form-link small"
                      onClick={() => setDestinationInputVisible(true)}
                    >
                      <i className="fas fa-plus mr-1"></i> 手動輸入地址
                    </a>
                  </div>
                </div>
              </div>

              <div className="media align-items-center mb-3">
                <span className="d-block font-size-1 mr-3">Total</span>
                <div className="media-body text-right">
                  <span className="text-dark font-weight-bold">
                    {countBill()}
                  </span>
                </div>
              </div>

              <div className="row mx-1">
                <div className="col px-1 my-1">
                  <button
                    className="btn btn-primary btn-block btn-pill transition-3d-hover"
                    onClick={handleItem}
                  >
                    結帳
                  </button>
                </div>
              </div>
            </div>
            <div className="card shadow-soft mb-4">
              <div className="card rounded">
                <div className="card-header">
                  <label className="toggle-switch d-flex align-items-center mb-3">
                    <input
                      type="checkbox"
                      className="toggle-switch-input"
                      checked={giftToggled}
                      onChange={() => setGiftToggled((prev) => !prev)}
                    />
                    <span className="toggle-switch-label">
                      <span className="toggle-switch-indicator"></span>
                    </span>
                    <span className="toggle-switch-content">
                      <span className="d-block">要製作電子賀卡嗎？</span>
                      <small className="d-block text-muted">
                        收禮者可於溯源時查看
                      </small>
                    </span>
                  </label>
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
