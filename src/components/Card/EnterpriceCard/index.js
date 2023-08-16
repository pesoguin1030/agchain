import { id } from "ethers/lib/utils";
import React, { useEffect, useState, useRef } from "react";
import request from "../../../utils/request";
import storage from "../../../utils/storage";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { event } from "jquery";

const EnterpriseCard = ({
  product_id,
  img,
  title,
  description,
  price,
  amount,
  carbon,
  store,
  weight,
  Shelf,
  Ptype,
}) => {
  const [updateshow, setupdateShow] = useState(false);

  const handleClose = () => setupdateShow(false);
  const handleShow = () => setupdateShow(true);

  const [productName, setProductName] = useState(title);
  const [priceNumber, setPriceNumber] = useState(price);
  const [amountNumber, setAmountNumber] = useState(amount);
  const [picture, setPicture] = useState("");
  const [productweight, setWeight] = useState(weight);
  const [productdescription, setproductdescription] = useState(description);
  const [carbonAmount, setcarbonamount] = useState(carbon);
  const Location = "新竹市";
  const options = [
    { value: "", text: "選擇種類" },
    { value: "carbon", text: "附碳商品" },
  ];

  const shelfOption = [
    { value: "yes", text: "上架" },
    { value: "no", text: "下架" },
  ];

  const [selected, setSelected] = useState(options[0].value);
  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const [shelfselected, setshelfselected] = useState(shelfOption[0].value);
  const shelfhandleChange = (event) => {
    setshelfselected(event.target.value);
  };

  async function deletproduct(id) {
    try {
      console.log("idddddd", id);
      const userToken = storage.getAccessToken();
      const response = await request.post(
        "productsv2/delete",
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      // console.log(response.data);
      if (response.data.code === 200) {
        alert("刪除成功");

        return true;
      } else if (response.data.code === 404) {
        alert("商品不存在");
        return false;
      } else if (response.data.code === 403) {
        alert("并非该商店成员");
        return false;
      }
    } catch (err) {
      alert("伺服器發生問題，刪除失敗");
      console.log(err);
      return false;
    }
  }

  async function updateproduct(id) {
    try {
      setProductName(document.getElementById("productName").value);
      setPriceNumber(document.getElementById("inputnumber2").value);
      setproductdescription(document.getElementById("inputdes").value);
      setWeight(document.getElementById("inputweight2").value);
      setcarbonamount(document.getElementById("inputcarbon").value);
      console.log(
        "id",
        id,
        "store",
        store,
        "productname",
        productName,
        "pricenumber",
        priceNumber,
        "amountnumber",
        amountNumber,
        "picture",
        picture,
        "productweight",
        productweight,
        "description",
        productdescription,
        "carbon",
        carbonAmount,
        "shelf",
        shelfselected,
        "location",
        Location,
        "type",
        Ptype
      );
      const userToken = storage.getAccessToken();
      const response = await request.post(
        "productsv2/update",
        {
          product_id: id.toString(),
          store_id: store,
          name: productName,
          price: priceNumber.toString(),
          limit_amount: amountNumber.toString(),
          photo_url:
            "https://upload.wikimedia.org/wikipedia/commons/d/d0/Eth-diamond-rainbow.png",
          weight: productweight.toString(),
          type: "carbon",
          description: productdescription,
          carbon_amount: carbonAmount.toString(),
          location: Location,
          shelf: shelfselected,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data.code);
      if (response.data.code === 200) {
        alert("編輯成功");
        window.location.reload();
        return true;
      } else if (response.data.code === 405) {
        alert("參數不合法");
        return false;
      } else if (response.data.code === 403) {
        alert("並非該商店成員");
        return false;
      } else if (response.data.code === 404) {
        alert("找不到商品");
        return false;
      } else if (response.data.code === 500) {
        alert("伺服器錯誤");
        return false;
      }
    } catch (err) {
      alert("發生問題，編輯失敗");
      console.log(err);
      return false;
    }
  }

  function buttondelet() {
    deletproduct(product_id);
    window.location.reload();
  }

  function buttonupdate() {
    // console.log("inputdes",document.getElementById('inputdes').value)
    // console.log("productName",document.getElementById('productName').value)
    updateproduct(product_id);
  }

  return (
    <div className="card border  text-center h-100">
      <div className="position-relative">
        <a className="d-inline-block text-body small font-weight-bold mb-1">
          <img
            className="card-img-top"
            style={{
              minHeight: 180,
              objectFit: "contain",
            }}
            src={img}
            alt="商品圖片"
          />
        </a>
        <div className="position-absolute top-0 right-0 pt-3 pr-3"></div>
      </div>
      <div className="card-body pt-4 px-4 pb-0">
        <div className="mb-2">
          <a className="d-inline-block text-body small font-weight-bold mb-1">
            {title}
          </a>
          <div className="d-block">
            <span className="text-dark font-weight-bold">数量 ： {amount}</span>
          </div>
          <div className="d-block">
            <span className="text-dark font-weight-bold">
              碳權點數 ： {carbon}
            </span>
          </div>
          {/* <div className="d-block">
            <span className="text-dark font-weight-bold">
              productid ： {product_id}
            </span>
          </div> */}
          <div className="d-block">
            <span className="text-dark font-weight-bold">{`NTD ${price}`}</span>
          </div>
          <a className="d-inline-block text-body small font-weight-bold mb-1">
            {Shelf == "yes" ? "已上架" : "已下架"}
          </a>
        </div>
        <div className="row justify-content-between align-items-end">
          <div className="row-4">
            <Button variant=" btn  btn-outline-primary" onClick={handleShow}>
              編輯
            </Button>
          </div>

          <div className="row-4">
            <button
              type="button"
              className="btn  btn-outline-danger "
              data-toggle="modal"
              data-target={`#deletModal${product_id}`}
            >
              刪除
            </button>
          </div>
        </div>
      </div>

      <Modal show={updateshow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>编辑商品</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="input2">商品名稱</label>
                <input
                  type="text"
                  id="productName"
                  defaultValue={title}
                  className="form-control"
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                  placeholder="商品名稱"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputnumber2">數量</label>
                <input
                  defaultValue={amount}
                  type="number"
                  className="form-control"
                  id="inputnumber2"
                  placeholder="數量"
                  onChange={(e) => {
                    setAmountNumber(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="FormControlFile2">上傳照片</label>
              <input
                type="input"
                defaultValue={img}
                className="form-control-file"
                id="FormControlFile2"
                onChange={(e) => {
                  setPicture(e.target.value);
                }}
              />
            </div>
            <img src={img} style={{ maxWidth: 100, height: 100 }} />
            <div className="form-group">
              <label htmlFor="inputvalue2">價格</label>
              <input
                defaultValue={price}
                type="value"
                className="form-control"
                id="inputvalue2"
                placeholder="價格"
                onChange={(e) => {
                  setPriceNumber(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputcarbon">碳權點數</label>
              <input
                defaultValue={carbon}
                type="number"
                className="form-control"
                id="inputcarbon"
                placeholder="10"
                onChange={(e) => {
                  setcarbonamount(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputdes">描述</label>
              <input
                defaultValue={description}
                type="text"
                className="form-control"
                id="inputdes"
                placeholder="商品描述"
                onChange={(e) => {
                  setproductdescription(e.target.value);
                }}
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputweight2">重量</label>
                <input
                  defaultValue={weight}
                  type="number"
                  className="form-control"
                  id="inputweight2"
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                />
              </div>
              {/* <div className="form-group col-md-4">
                <label htmlFor="inputState">商品種類</label>
                <select
                //   defaultValue={{Producttype} == "carbon" ? }
                  id="inputType"
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
              </div> */}
            </div>

            <div className="form-group">
              <label htmlFor="inputState2">上下架</label>
              <select
                defaultValue={Shelf}
                id="inputState2"
                className="form-control"
                onChange={shelfhandleChange}
              >
                {shelfOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button
            variant="primary"
            onClick={(event) => {
              handleClose();
              buttonupdate();
            }}
          >
            更新商品
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        className="modal fade"
        id={`deletModal${product_id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                删除提示
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
            <div className="modal-body">你確認刪除嗎？</div>
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
                className="btn btn-success"
                data-dismiss="modal"
                onClick={buttondelet}
              >
                確認刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EnterpriseCard };