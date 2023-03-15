import { id } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
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
  const [picture, setPicture] = useState(img);
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
          product_id: id,
          store_id: store,
          name: productName.trim(),
          price: priceNumber,
          limit_amount: amountNumber,
          photo_url: picture,
          weight: productweight,
          type: Ptype.trim(),
          description: productdescription.trim(),
          carbon_amount: carbonAmount,
          location: Location.trim(),
          shelf: shelfselected.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.data.code === 200) {
        alert("编辑成功");
        return true;
      } else if (response.data.code === 405) {
        alert("参数不合法");
        return false;
      } else if (response.data.code === 403) {
        alert("并非该商店成员");
        return false;
      } else if (response.data.code === 404) {
        alert("找不到商品");
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
    updateproduct(product_id);
  }

  return (
    <div className="card border shadow-none text-center h-100">
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
          <div className="d-block">
            <span className="text-dark font-weight-bold">
              productid ： {product_id}
            </span>
          </div>
          <div className="d-block">
            <span className="text-dark font-weight-bold">{`NTD ${price}`}</span>
          </div>
          <a className="d-inline-block text-body small font-weight-bold mb-1">
            {{ Shelf } == "yes" ? "已下架" : "已上架"}
          </a>
        </div>
        <div class="row justify-content-between">
          <div class="row-4">
            <Button variant="primary" onClick={handleShow}>
              编辑
            </Button>
          </div>

          <div class="row-4">
            <button
              type="button"
              class="btn btn-danger"
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
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="input1">商品名稱</label>
                <input
                  type="text"
                  defaultValue={title}
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
                  defaultValue={amount}
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
                // defaultValue={img}
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
                defaultValue={price}
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
                defaultValue={carbon}
                type="number"
                class="form-control"
                id="carbonvalue"
                placeholder="10"
                onChange={(e) => {
                  setcarbonamount(e.target.value);
                }}
              />
            </div>
            {/* <div class="form-group">
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
                </div> */}
            <div class="form-group">
              <label for="inputtext">描述</label>
              <input
                defaultValue={description}
                type="text"
                class="form-control"
                id="inputtext"
                placeholder="商品描述"
                onChange={(e) => {
                  setproductdescription(e.target.value);
                }}
              />
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputweight">重量</label>
                <input
                  defaultValue={weight}
                  type="number"
                  class="form-control"
                  id="inputweight"
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                />
              </div>
              {/* <div class="form-group col-md-4">
                <label for="inputState">商品種類</label>
                <select
                // {{ Shelf } == "yes" ? ("已下架") : ("已上架")}
                //   defaultValue={{Producttype} == "carbon" ? }
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
              </div> */}
            </div>

            <div class="form-group">
              <label for="inputState">上下架</label>
              <select
                defaultValue={Shelf}
                id="inputshelf"
                class="form-control"
                value={shelfselected}
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
        class="modal fade"
        id={`deletModal${product_id}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                删除提示
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
            <div class="modal-body">你確認刪除嗎？</div>
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
                class="btn btn-success"
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
