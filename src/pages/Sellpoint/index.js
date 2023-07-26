import React from "react";
import { AuthContext, CartContext } from "../../appContext";
import { useEffect, useState, useContext } from "react";
import { UserfetchAcquire, getMatchId, fetchAcquire } from "../../api/product";
import { Dropdown, DropdownButton } from "react-bootstrap";
import * as CarbonWalletApi from "../../api/carbon/wallet";
import * as TokenCenter from "../../abi/ERC20TokenCenter";
import * as CarbonAcquireApi from "../../api/carbon/acquire";
import { ethers } from "ethers";
import PolygonNetwork from "../../abi/PolygonNetwork.json";

const chainId = PolygonNetwork.chainId;

const Sellpoint = () => {
  const [list, setList] = useState(0);
  const [products, setProducts] = useState(list);
  let [buttonDisable, setButtonDisable] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);

  const fetchList = async () => {
    try {
      // const result = await fetchAcquire(375);
      const result = await UserfetchAcquire();
      setList(result.message);
      setProducts(result.message);
      console.log("result", result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // useEffect(()=>{
  //     console.log("List:",list);
  // },[list])

  const handleSellAll = async () => {
    //一鍵售出
    try {
      await getWallet();
      const matchID = await getMatchId(walletBalance);
      handleBuy(matchID, walletBalance);
    } catch (e) {
      console.log(e);
    }
  };

  const getWallet = async () => {
    try {
      console.log("Debug: CarbonWalletApi.getWallet");
      const result = await CarbonWalletApi.getWallet();
      console.log("Debug: getWallet=", result);
      if (result.code !== 200) {
        setWalletAddress("");
      } else {
        setWalletAddress(result.message);
        getBalance(result.message);
      }
    } catch (error) {
      console.log("Error: getWallet=", error);
    }
  };

  const getBalance = async (address) => {
    try {
      console.log("Debug: CarbonWallet.getBalance");
      const result = await TokenCenter.getBalance(
        address ? address : walletAddress
      );
      console.log("Debug: CarbonWallet.getBalance=", result);
      setWalletBalance(result);
    } catch (error) {
      console.log("Error: getBalance=", error);
    }
  };

  const handleBuy = async (productId, amount) => {
    //出售點數
    if (!productId || !amount) {
      return;
    }
    setButtonDisable(true);

    // 獲取用戶錢包地址
    let walletAddress = "";
    try {
      const getWalletResult = await CarbonWalletApi.getWallet();
      console.log("Debug: getWallet=", getWalletResult);
      if (getWalletResult.code === 200) {
        walletAddress = getWalletResult.message;
      } else {
        throw new Error(getWalletResult.message);
      }
    } catch (e) {
      alert("獲取錢包地址出錯！", e.message);
      console.log("Debug: getWallet error=", e.message);
      setButtonDisable(false);
      return;
    }

    // 獲取signer
    let signer;
    let fromAddress;
    try {
      if (!window.ethereum) {
        alert("請安裝MetaMask錢包");
        setButtonDisable(false);
        return;
      }
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      console.log("Debug: provider=", provider);
      signer = provider.getSigner();
      console.log("Debug: signer=", signer);

      // 確認address
      await provider.send("eth_requestAccounts", []);
      fromAddress = await signer.getAddress();
      console.log("Debug: fromAddress=", fromAddress.toLowerCase());
      if (fromAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        console.log("Debug: walletAddress=", walletAddress.toLowerCase());
        alert("請使用在本平臺綁定的錢包");
        setButtonDisable(false);
        return;
      }
    } catch (e) {
      alert("請允許網站連接到MetaMask錢包");
      console.log("Debug: wallet_switchEthereumChain error=", e.message);
      setButtonDisable(false);
      return;
    }

    // 切換network
    const polygonChainId = "0x" + chainId.toString(16);
    console.log("Debug: polygonChainId=", polygonChainId);

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: polygonChainId }], // chainId must be in hexadecimal numbers
      });
    } catch (e) {
      alert("請允許將MetaMask錢包切換到Polygon network");
      console.log("Debug: wallet_switchEthereumChain error=", e.message);
      setButtonDisable(false);
      return;
    }

    const nowChain = await signer.getChainId();
    console.log("Debug: nowChain=", nowChain);
    if (nowChain.toString() !== chainId.toString()) {
      alert("請允許將MetaMask錢包切換到Polygon network");
      setButtonDisable(false);
      return;
    }

    // permit
    let signature;
    const limit = 5 * 60; // 簽名具有5分鐘有效期
    const deadline = ethers.BigNumber.from(
      Math.floor(Date.now() / 1000) + limit
    );

    try {
      signature = await TokenCenter.getPermitSignature(
        signer,
        amount,
        deadline
      );
      console.log("Debug: signature=", signature);
    } catch (e) {
      alert("請允許MetaMask產生簽名");
      console.log("Debug: getPermitSignature error=", e.message);
      setButtonDisable(false);
      return;
    }

    const { v, r, s } = signature;

    // sell
    try {
      const result = await CarbonAcquireApi.createCarbonAcquireOrder(
        productId.toString(),
        amount.toString(),
        deadline.toString(),
        v.toString(),
        r.toString(),
        s.toString()
      );
      console.log("Debug: createCarbonAcquireOrder=", result);
      if (result.code == 200) {
        alert("成功");
      } else {
        alert("失敗：" + result.message);
      }
    } catch (e) {
      alert("出售碳權點數失敗");
      console.log("Debug: createCarbonAcquireOrder error=", e.message);
      setButtonDisable(false);
      return;
    }
  };

  const SearchBar = () => {
    const [searchText, setSearchText] = useState("");

    const handleSearch = (event) => {
      event.preventDefault();

      const filteredProducts = list.filter((product) =>
        product.description.includes(searchText)
      );
      setProducts(filteredProducts);
    };

    const handleInputChange = (event) => {
      setSearchText(event.target.value);
    };

    const handleSortChange = (sortOption) => {
      // 排序商品
      const sortedProducts = [...products];
      if (sortOption === "price") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === "minPurchaseAmount") {
        sortedProducts.sort((a, b) => a.min - b.min);
      } else if (sortOption === "remainingAmount") {
        sortedProducts.sort(
          (a, b) =>
            a.acquire_amount - a.has_amount - (b.acquire_amount - b.has_amount)
        );
      }
      setProducts(sortedProducts);
    };

    return (
      <div className="container mb-4" style={{ marginTop: "50px" }}>
        <form>
          <div className="input-group">
            <div className="input-group-prepend">
              <DropdownButton variant="secondary" title="排序">
                <Dropdown.Item onSelect={() => handleSortChange("price")}>
                  價格
                </Dropdown.Item>
                <Dropdown.Item
                  onSelect={() => handleSortChange("minPurchaseAmount")}
                >
                  最小收購金額
                </Dropdown.Item>
                <Dropdown.Item
                  onSelect={() => handleSortChange("remainingAmount")}
                >
                  剩餘收購量
                </Dropdown.Item>
              </DropdownButton>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="輸入關鍵字"
              value={searchText}
              onChange={handleInputChange}
            />
            <div className="input-group-append">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSearch}
              >
                搜尋
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="container mb-4" style={{ marginTop: "50px" }}>
      <SearchBar />
      <div className="container">
        <div className="row">
          {products &&
            products.map((item) => (
              <div key={item.id} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.description}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.description}</h5>
                    <p className="card-text">${item.price}</p>
                    <p className="card-text">最小收購金額: {item.min}</p>
                    <p className="card-text">
                      剩餘收購量: {item.acquire_amount - item.has_amount}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleBuy(item.id, item.min)}
                      disabled={buttonDisable}
                    >
                      販售點數
                    </button>
                  </div>
                </div>
              </div>
            ))}
          <div className="col-md-12 text-center mt-4">
            <button className="btn btn-primary" onClick={handleSellAll}>
              一鍵販賣
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sellpoint;
