import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { CartContext, destContext } from "../../appContext";
import {
  createOrder,
  createGiftOrder,
  getAllShippingInfo,
} from "../../api/order";
import storage from "../../utils/storage";
import { FarmInfo, findFeeProduct } from "../../api/product";
import { fetchDestination } from "../../api/destination";
import Payment from "../Payment";

function DiffShoppingCart(props) {
  const { cartState, cartDispatch } = useContext(CartContext);
  const [cartEmpty, setCartEmpty] = useState(true);
  const [item_and_amount, setItem_and_amount] = useState({});
  const { destState, destDispatch } = useContext(destContext);
  const [diffOrder, setDiffOrder] = useState([
    { name: "", phone: "", address: "" },
  ]);
  const [destinations, setDestinations] = useState([]);
  const [jumpTo, setJumpTo] = useState(false);
  const [payHtml, setPayHtml] = useState("");
  const [orderNumber, setOrderNumber] = useState(0);
  const [destinationId, setDestinationId] = useState(36);
  const [destinationInputVisible, setDestinationInputVisible] = useState(false);
  const [isDiffDestination, setIsDiffDestination] = useState(false);
  const [giftToggled, setGiftToggled] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({});
  const [farms_fee, setFarmsFee] = useState({});
  const [totalFee, setTotalFee] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(
    "新竹市東區復興路二段"
  );

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

  useEffect(() => {
    setDiffOrder([...destState]);
    return () => {
      // cleanup
    };
  }, [destState]);
  //   useEffect(() => {
  //     getShippingInfo();
  //     return () => {};
  //   }, [item_and_amount, destinationId]);

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
    console.log(cartState);
    let value = item_and_amount[key];
    console.log(value);
    value -= 1;
    for (var i = 0; i < cartState.length; i++) {
      if (cartState[i].name === JSON.parse(key).name) {
        cartState.splice(i, 1);
        break;
      }
    }
    cartDispatch([...cartState]);
    setItem_and_amount({ ...item_and_amount, [key]: value });
    // console.log(cartState);
  };

  const increment = (key) => {
    const value = item_and_amount[key] + 1;
    cartDispatch([...cartState, JSON.parse(key)]);
    setItem_and_amount({ ...item_and_amount, [key]: value });
    // console.log(cartState);
    // console.log(item_and_amount);
  };

  const removeItem = (key) => {
    let amount = item_and_amount[key];
    for (var i = 0; i < cartState.length; i++) {
      if (cartState[i].name == JSON.parse(key).name) {
        cartState.splice(i, amount);
        break;
      }
    }
    cartDispatch([...cartState]);
    delete item_and_amount[key];
    setItem_and_amount(item_and_amount);
    // console.log(cartState);
    // console.log(item_and_amount);
  };

  const handleDestination = (e) => {
    console.log(e);
    let temp = e.target.id.split("_");
    let type = temp[0];
    let index = temp[1];
    diffOrder[index][type] = e.target.value;
    setDiffOrder([...diffOrder]);
    // console.log(document.getElemendtById(e.target.id));
    console.log(diffOrder);
  };

  const addDiffOrder = () => {
    var num = diffOrder.length;
    destState.push({ name: "", phone: "", address: "" });
    setDiffOrder([...diffOrder, { name: "", phone: "", address: "" }]);
    destDispatch([...destState]);
    console.log(destState);
    // cartDispatch([...cartState, ...cartState]);
    // setItem_and_amount({ ...item_and_amount, ...item_and_amount });
  };

  const ship_as_orders = () => {
    let orders = [];
    Object.keys(farms_fee).map((product_id) => {
      console.log("product_id", product_id);
      orders.push({
        productId: parseInt(farms_fee[product_id]["fee_productID"], 10),
        amount: 1,
        destinationId: 1,
        address: selectedAddress,
        price: farms_fee[product_id]["fee"],
      });
    });
    return orders;
  };

  const handleItem = async () => {
    let orders = [];
    console.log(item_and_amount);
    const orderlist = (async () => {
      const result = await Object.keys(item_and_amount).map((key) => ({
        productId: parseInt(JSON.parse(key)["id"], 10),
        amount: item_and_amount[key],
        price: parseInt(JSON.parse(key)["price"], 10),
        destinationId: destinationId,
        address: selectedAddress,
      }));
      return result;
    })();

    //由此拿到orderNumber 以及支付api拿到的html
    orderlist.then(async (product_orders) => {
      const userToken = storage.getAccessToken();
      const shipping_order = ship_as_orders();
      const orders = [...product_orders, ...shipping_order];
      if (giftToggled) {
        const response = await createGiftOrder(orders);
        const { data } = response;
        console.log(data);
        const encode_html = data["html"];
        const orderNumber = data["orderNumber"];
        setPayHtml(encode_html);
        setOrderNumber(orderNumber);
        setJumpTo(true);
      } else {
        const response = await createOrder(orders);
        const { data } = response;
        const encode_html = data["html"];
        const orderNumber = data["orderNumber"];
        setPayHtml(encode_html);
        setOrderNumber(orderNumber);
        setJumpTo(true);
      }
    });
  };

  return jumpTo ? (
    <Payment html={payHtml} orderNumber={orderNumber} totalFee={totalFee} />
  ) : (
    <div className="container space-1 space-md-2 mt-11">
      <div className="row">
        <div className="col-lg-7 mb-7 mb-lg-0">
          <div className="d-flex justify-content-between align-items-end border-bottom pb-3 mb-7">
            <h1 className="h3 mb-0">購物車</h1>
            <span>{cartEmpty ? null : cartState.length} 產品</span>
          </div>
          <div className="border-bottom pb-5 mb-5">
            {cartEmpty
              ? null
              : Object.keys(item_and_amount).map((key) => {
                  const { id, name, price, img } = JSON.parse(key);
                  const num = item_and_amount[key];
                  return (
                    <div key={id} className="border-bottom pb-2 mb-2">
                      <div className="media-body">
                        <div className="row">
                          <div className="col-md-7 mb-3 mb-md-0">
                            <a className="h5 d-block" href="#">
                              {name}
                            </a>
                            <a
                              className="d-block text-body font-size-1 mb-1"
                              href="javascript:void(0);"
                              onClick={() => removeItem(key)}
                            >
                              <i className="far fa-trash-alt text-hover-primary mr-1"></i>
                              <span className="font-size-1 text-hover-primary">
                                移除商品
                              </span>
                            </a>
                            <div className="text-body d-md-none">
                              <span className="h5 d-block mb-1">
                                {price * num}
                              </span>
                            </div>
                          </div>
                          <div
                            className="input-group input-group-sm"
                            style={{ maxWidth: "160px" }}
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
                              style={{ textAlign: "center" }}
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
                          </div>
                          <div className="col-4 col-md-2 d-none d-md-inline-block text-right">
                            <span className="h5 d-block mb-1">
                              {price * num}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
          {Object(diffOrder).map((anObjectMapped, index) => {
            return (
              <div className="row pb-2 mb-2">
                姓名
                <input
                  id={"name_" + index}
                  style={{ maxWidth: "70px" }}
                  onChange={handleDestination}
                />
                電話
                <input
                  id={"phone_" + index}
                  style={{ maxWidth: "130px" }}
                  onChange={handleDestination}
                />
                地址
                <input
                  id={"address_" + index}
                  style={{ maxWidth: "200px" }}
                  onChange={handleDestination}
                />
              </div>
            );
          })}
          <div>
            <div className="d-sm-flex justify-content-end"></div>
            <a
              href="javascript:void(0);"
              className="form-link small"
              onClick={() => addDiffOrder(1)}
            >
              <i className="fas fa-plus mr-1"></i> 增加收件地址
            </a>
          </div>
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
                <h2 className="h2 mb-0">訂單總結</h2>
              </div>
              <div className="border-bottom pb-4 mb-4">
                <div className="media align-items-center mb-3">
                  <span className="d-block font-size-2 mr-3">
                    {<span>{cartEmpty ? null : cartState.length} 個產品</span>}
                  </span>
                  <div className="media-body text-right">
                    <span className="text-dark font-weight-bold">
                      {countBill()}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-dark font-weight-bold">
                    {diffOrder.length}份禮物
                  </span>
                </div>
              </div>
              {/* <span className="d-block font-size-2 mr-3">運費</span> */}

              {Object.keys(farms_fee).map((key) => {
                return (
                  <div className="border-bottom media align-items-center mb-3">
                    <span className="d-block mr-3">
                      {JSON.parse(JSON.stringify(farms_fee[key]["farm"]))}
                    </span>
                    <div className="media-body text-right">
                      <span className="text-dark font-weight-bold">
                        {JSON.stringify(farms_fee[key]["fee"])}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div className="media align-items-center mb-3">
                <span className="d-block font-size-2 mr-3">總額</span>
                <div className="media-body text-right">
                  <span className="text-dark font-weight-bold">
                    {countBill() * diffOrder.length}
                  </span>
                </div>
              </div>

              <div className="row mx-1">
                <div className="col px-1 my-1">
                  <button
                    className="btn btn-primary btn-block btn-pill transition-3d-hover"
                    onClick={handleItem}
                  >
                    確認訂單
                  </button>
                </div>
              </div>
            </div>
            <div className="card shadow-soft mb-4">
              <div className="card rounded">
                <div className="card-header">
                  <label className="toggle-switch d-flex align-items-center">
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

export default DiffShoppingCart;
