import React, { useEffect, useState, useContext } from "react";
import storage from "../../utils/storage";
import request from "../../utils/request";
import { fetch2Products } from "../../api/product";
import { CartContext } from "../../appContext";
import Toast from "react-bootstrap/Toast";
import { AuthContext } from "../../appContext";
import * as TokenCenter from "../../abi/ERC20TokenCenter";
import * as CarbonWalletApi from "../../api/carbon/wallet";
import { ethers } from "ethers";

import { EnterpriseCard } from "../../components/Card/EnterpriceCard/index";
import AlertModal from "./AlertModal";

function EnterpriseProduct() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [priceNumber, setPriceNumber] = useState(null);
  const [amountNumber, setAmountNumber] = useState(1);
  const [picture, setPicture] = useState("null");
  const [percent, setPercent] = useState(0);
  const [weight, setWeight] = useState(250);
  const [description, setdescription] = useState(null);
  const [carbonAmount, setcarbonamount] = useState(null);
  const [storeId, setstoreid] = useState(0);
  const [Location, setlocation] = useState("新竹市");
  const [render, setrender] = useState(true);
  const [showA, setShowA] = useState(true);
  const [AllowanceCredit, setAllowanceCredit] = useState(0);
  const [CreditAmountOfStore, setCreditAmountOfStore] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [BalanceInsufficient, setBalanceInsufficient] = useState(false);
  const [creditInsufficient, setcreditInsufficient] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const { authState, authDispatch } = useContext(AuthContext);

  const options = [{ value: "carbon", text: "附碳商品" }];
  const [selected, setSelected] = useState(options[0].value);

  const getCreditAmountOfStore = async () => {
    try {
      const storeId = storeId;
      const userId = authState.user.userId;

      const userToken = storage.getAccessToken();
      const response = await request.get(
        `productSv2/carbonCreditAmountOfStore`,
        {
          params: {
            storeId,
            userId,
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setCreditAmountOfStore(response.data.message);
      console.log("get", response.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  const getAllowanceCredit = async () => {
    try {
      const storeId = storeId;
      const userId = authState.user.userId;

      const userToken = storage.getAccessToken();
      const response = await request.get(
        `farmsv2/carbonCreditAllowanceByStoreOwner`,
        {
          params: {
            storeId,
            userId,
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setAllowanceCredit(response.data.message);
      console.log("hi", response.data.message);
    } catch (error) {
      console.error("error", error);
    }
  };

  const getBalance = async (address) => {
    try {
      console.log("Debug: CarbonWallet.getBalance");
      const result = await TokenCenter.getBalance(address);
      console.log("Debug: CarbonWallet.getBalance=", result);
      setWalletBalance(result);
    } catch (error) {
      console.log("Error: getBalance=", error);
    }
  };

  const handleCarbonCreditCheck = async () => {
    try {
      console.log("handleCarbonCreditCheck");
      searchstoreid();
      setBalanceInsufficient(true);
      const result = await CarbonWalletApi.getWallet();
      if (result.code == 200) {
        getBalance(result.message);
      }
      getAllowanceCredit();
      getCreditAmountOfStore();
      if (walletBalance < AllowanceCredit) {
        setBalanceInsufficient(true);
      } else if (AllowanceCredit < CreditAmountOfStore) {
        setcreditInsufficient(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const getWallet = async () => {
  //   try {
  //     console.log("Debug: CarbonWalletApi.getWallet");
  //     const result = await CarbonWalletApi.getWallet();
  //     console.log("Debug: getWallet=", result);
  //     if (result.code !== 200) {
  //       setWalletAddress("");
  //     } else {
  //       setWalletAddress(result.message);
  //       getBalance(result.message);
  //       getAllowance(result.message);
  //     }
  //   } catch (error) {
  //     console.log("Error: getWallet=", error);
  //   }
  // };

  // useEffect(
  //   function () {
  //     console.log("load carbon wallet test");

  //     if (typeof window.ethereum == "undefined") {
  //       alert("請安裝MetaMask");
  //       console.log("MetaMask is required!");
  //     } else {
  //       console.log("MetaMask is installed!");

  //       getWallet();
  //       getCurrentTransferEvent();
  //     }
  //   },[walletAddress]);

  useEffect(() => {
    // console.log("user:",authState.user);
    // getAllowanceCredit();
    // getCreditAmountOfStore();
  }, []);

  const searchstoreid = async () => {
    try {
      const userToken = storage.getAccessToken();
      const response = await request.get(`farmsv2/belong`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data.code === 200) {
        const data = response.data.message[0];
        console.log("res", data);
        setstoreid(data.toString());
        console.log("storeid", storeId);
        return true;
      } else if (response.data.code === 403) {
        alert("失败");
        return false;
      }
      return true;
    } catch (err) {
      console.log("faile", err);
      alert("查找失败");
      return false;
    }
  };

  useEffect(() => {
    const handleFetchProducts = async () => {
      const { message, code } = await fetch2Products(storeId);
      setProducts(message);
      console.log("products", products);
    };

    searchstoreid();
    handleFetchProducts();
  }, [storeId]);

  async function createProduct() {
    try {
      const userToken = storage.getAccessToken();
      console.log("shangjia");
      const response = await request.post(
        `/productsv2/create`,
        {
          name: productName,
          price: priceNumber,
          description: description,
          limit_amount: amountNumber,
          photo_url: picture,
          compensation_ratio: percent,
          weight: weight,
          type: selected,
          store_id: storeId, // farm_id called store_id
          carbon_amount: carbonAmount,
          location: Location,
          shelf: "yes",
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log("response", response);
      if (response.data.code === 200) {
        alert("上架成功");
        return true;
      } else if (response.data.code === 405) {
        alert("參數不合法");
        return false;
      } else if (response.data.code === 403) {
        alert("并非該商店成員");
        return false;
      } else if (response.data.code === 500) {
        alert("伺服器發生問題，上架失敗");
        return false;
      }
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
    //對比數值
    handleCarbonCreditCheck();
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
    if (carbonAmount <= 0) {
      alert("點數要为正数");
    }
    if (selected === "") {
      alert("請選擇商品種類");
      return;
    }
    createProduct();
    // if (!BalanceInsufficient && !creditInsufficient) {
    window.location.reload();
    //   console.log("little bitch");
    // }
  }

  return (
    <div className="container space-top-1 space-top-sm-2 mt-12">
      {/* <Toast show={showA} onClose={toggleShowA}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto"></strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>
          安裝
          <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">
            metamask
          </a>
          來使用我們的平臺
        </Toast.Body>
      </Toast> */}
      <div className="d-sm-flex align-items-center row mb-4">
        <h1 className="col h3 mb-0 text-gray-800">商品管理</h1>
        <ul className="nav nav-sub nav-lg  ">
          <li className="nav-item">
            <a className="nav-link" href="/enterprise/store">
              <i className="fas fa-shopping-basket nav-icon"></i>
              我的商店
            </a>
          </li>
        </ul>
        <a
          className="col-md-auto d-none d-sm-inline-block btn btn-sm btn-danger text-white"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <i className="fas fa-plus" /> 新增商品
        </a>
      </div>
      {/* {BalanceInsufficient || creditInsufficient ? (
        <AlertModal A={BalanceInsufficient} B={creditInsufficient} />
      ) : null} */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                上傳商品
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="input1">商品名稱</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setProductName(e.target.value);
                      }}
                      placeholder="商品名稱"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputnumber">數量</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputnumber"
                      placeholder="數量"
                      onChange={(e) => {
                        setAmountNumber(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlFile1">上傳照片</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                    onChange={(e) => {
                      setPicture(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputvalue">價格</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputvalue"
                    placeholder="價格"
                    onChange={(e) => {
                      setPriceNumber(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputvalue">碳權點數</label>
                  <input
                    type="text"
                    className="form-control"
                    id="carbonvalue"
                    placeholder="10"
                    onChange={(e) => {
                      setcarbonamount(e.target.value);
                    }}
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="inputvalue">商店id</label>
                  <input
                    type="number"
                    className="form-control"
                    id="storevalue"
                    placeholder="商店id"
                    onChange={(e) => {
                      setstoreid(e.target.value);
                    }}
                  />
                </div> */}
                <div className="form-group">
                  <label htmlFor="inputtext">描述</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputtext"
                    placeholder="商品描述"
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputweight">重量</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputweight"
                      onChange={(e) => {
                        setWeight(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputState">商品種類</label>
                    <select
                      id="text"
                      className="form-control"
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
                <div className="form-group"></div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                關閉
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={buttonCreateProduct}
                data-dismiss="modal"
              >
                新增
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mx-n2 mx-sm-n3 mb-3">
        {products.map(
          ({
            id,
            name,
            description,
            price,
            photo_url,
            limit_amount,
            carbon_amount,
            weight,
            shelf,
            type,
          }) => (
            <div
              key={id}
              className="col-sm-6 col-lg-3 px-2 px-sm-3 mb-3 mb-sm-5"
            >
              <EnterpriseCard
                // key={id}
                store={storeId}
                product_id={id}
                title={name}
                description={description}
                price={price}
                amount={limit_amount}
                img={photo_url}
                carbon={carbon_amount}
                weight={weight}
                Shelf={shelf}
                Ptype={type}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default React.memo(EnterpriseProduct);
