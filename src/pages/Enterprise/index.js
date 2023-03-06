import React, { useEffect, useState, useContext } from "react";
import storage from "../../utils/storage";
import axios from "axios";
import request from "../../utils/request";
import { fetchProducts, fetch2Products } from "../../api/product";
import { CartContext } from "../../appContext";
import { ProductCard } from "../../components/Card";
import { EnterpriseCard } from "../../components/Card/EnterpriceCard/index";

function EnterpriseProduct() {
  const { cartState, cartDispatch } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [priceNumber, setPriceNumber] = useState(null);
  const [amountNumber, setAmountNumber] = useState(1);
  const [picture, setPicture] = useState("null");
  const [percent, setPercent] = useState(0);
  const [weight, setWeight] = useState(250);
  const [description, setdescription] = useState(null);
  const [carbonAmount, setcarbonamount] = useState(null);
  const [storeId, setstoreid] = useState(69);

  const options = [
    { value: "", text: "選擇種類" },
    // { value: "vegetables", text: "vegetables " },
    // { value: "rice", text: "rice " },
    // { value: "shippingfee", text: "shippingfee " },
    { value: "carbon", text: "附碳商品" },
  ];
  const [selected, setSelected] = useState(options[0].value);

  useEffect(() => {
    const handleFetchProducts = async () => {
      const { message, code } = await fetch2Products();
      if (Array.isArray(message)) {
        setProducts(message);
        console.log("products", products);
      }
    };
    handleFetchProducts();
  }, []);

  async function createProduct() {
    try {
      const userToken = storage.getAccessToken();
      await request.post(
        `/products/`,
        {
          crop_id: 250,
          name: productName,
          price: priceNumber,
          limit_amount: amountNumber,
          photo_url: picture,
          compensation_ratio: percent,
          weight: weight,
          type: selected,
          description: description,
          store_id: storeId, //because of wutau, farm_id called store_id
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      alert("上架成功");
      return true;
    } catch (err) {
      alert("伺服器發生問題，上架失敗");
      console.log(err);
      return false;
    }
  }

  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  function buttonCreateProduct() {
    if (productName == "") {
      alert("產品名稱不可為空");
      return;
    }
    if (productName && productName.length > 64) {
      alert("產品名稱需小於64");
      return;
    }
    if (amountNumber <= 0) {
      alert("上架數量需要大于零");
      return;
    }
    if (priceNumber <= 0) {
      alert("商品價格要为正数");
      return;
    }
    if (weight <= 0) {
      alert("商品重量要为正数");
    }
    if (selected === "") {
      alert("請選擇商品種類");
      return;
    }
    createProduct();
  }

  return (
    <div className="container space-top-1 space-top-sm-2 mt-12">
      <div class="d-sm-flex align-items-center row mb-4">
        <h1 class="col h3 mb-0 text-gray-800">商品管理</h1>
        <a
          class="col-md-auto d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"
          data-toggle="modal"
          data-target="#exampleModal"
          data-whatever="@mdo"
        >
          <i class="fas fa-check"></i> 新增商品
        </a>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                上傳商品
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="input1">商品名稱</label>
                    <input
                      type="text"
                      class="form-control"
                      onChange={(e) => {
                        setProductName(e.target.value);
                      }}
                      placeholder="商品名稱"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputnumber">數量</label>
                    <input
                      type="number"
                      class="form-control"
                      id="inputnumber"
                      placeholder="數量"
                      onChange={(e) => {
                        setAmountNumber(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlFile1">上傳照片</label>
                  <input
                    type="file"
                    class="form-control-file"
                    id="exampleFormControlFile1"
                    onChange={(e) => {
                      setPicture(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group">
                  <label for="inputvalue">價格</label>
                  <input
                    type="value"
                    class="form-control"
                    id="inputvalue"
                    placeholder="價格"
                    onChange={(e) => {
                      setPriceNumber(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group">
                  <label for="inputvalue">碳權點數</label>
                  <input
                    type="number"
                    class="form-control"
                    id="carbonvalue"
                    placeholder="10"
                    onChange={(e) => {
                      setcarbonamount(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group">
                  <label for="inputvalue">商店id</label>
                  <input
                    type="number"
                    class="form-control"
                    id="storevalue"
                    placeholder="商店id"
                    onChange={(e) => {
                      setstoreid(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group">
                  <label for="inputtext">描述</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputtext"
                    placeholder="商品描述"
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputweight">重量</label>
                    <input
                      type="number"
                      class="form-control"
                      id="inputweight"
                      onChange={(e) => {
                        setWeight(e.target.value);
                      }}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="inputState">商品種類</label>
                    <select
                      id="inputType"
                      class="form-control"
                      value={selected}
                      onChange={handleChange}
                    >
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div class="form-group"></div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                關閉
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={buttonCreateProduct}
              >
                新增
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-6 col-md-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                    碳權點數
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    1000000
                  </div>
                </div>
                <div class="col-auto">
                  <a
                    href="#"
                    class="col-md-auto d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                  >
                    {/* <i class="fas fa-download fa-sm text-white-50"> </i>  */}
                    管理
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-6 col-md-6 mb-4">
          <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    授權點數
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    100000
                  </div>
                </div>
                <div class="col-auto">
                  {/* <i class="fas fa-dollar-sign fa-2x text-gray-300"></i> */}
                  <a
                    href="#"
                    class="col-md-auto d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                  >
                    管理
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mx-n2 mx-sm-n3 mb-3">
        {products.map(
          ({ id, name, description, price, photo_url, limit_amount }) => (
            <div
              key={id}
              className="col-sm-6 col-lg-3 px-2 px-sm-3 mb-3 mb-sm-5"
            >
              <EnterpriseCard
                key={id}
                product_id={id}
                title={name}
                description={description}
                price={price}
                amount={limit_amount}
                img={photo_url}
                isInCart={
                  cartState ? cartState.map((e) => e.id).includes(id) : false
                }
                onRemoveFromCart={() =>
                  cartDispatch((prev) => prev.filter((e) => e.id !== id))
                }
                onAddToCart={() =>
                  cartDispatch((prev) => [
                    ...prev,
                    { id, name, price, img: photo_url },
                  ])
                }
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default React.memo(EnterpriseProduct);
