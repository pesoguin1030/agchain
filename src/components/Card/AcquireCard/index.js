import React, { useEffect, useState, useRef } from "react";
import request from "../../../utils/request";
import storage from "../../../utils/storage";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { event } from "jquery";

const AcquireCard = ({
  acquireid,
  publish_time,
  acquire_amount,
  description,
  price,
  has_amount,
  min,
  multiplier,
  enable,
  image,
}) => {
  const [toggle, settoggle] = useState();
  const [updateshow, setupdateShow] = useState(false);

  const handleClose = () => setupdateShow(false);
  const handleShow = () => setupdateShow(true);

  const [Aamount, setamount] = useState(acquire_amount);
  const [Aprice, setprice] = useState(price);
  const [Amin, setmin] = useState(min);
  const [Amultiplier, setmultiplier] = useState(multiplier);
  const [picture, setPicture] = useState("https://imgur.com/gallery/TSO1SX1");
  const [Adescription, setdescription] = useState(description);
  const [expire_time, setexpire_time] = useState("2024-05-16 00:00:00");
  const options = [
    { value: "false", text: "關閉" },
    { value: "true", text: "開啓" },
  ];
  const [selected, setSelected] = useState(options[0].value);

  const pic = "https://imgur.com/gallery/TSO1SX1";

  async function toggleAcquire(id) {
    try {
      const userToken = storage.getAccessToken();
      const response = await request.post(
        "carbon/acquire/toggle",
        {
          id: id.toString(),
          enable: toggle,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.data.code === 200) {
        alert("成功");
        window.location.reload();
        return true;
      } else if (response.data.code === 405) {
        alert("參數不合法");
        return false;
      } else if (response.data.code === 403) {
        alert("并非企業用戶");
        return false;
      } else if (response.data.code === 500) {
        console.log("response", response);
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async function deleteAcquire(id) {
    try {
      const userToken = storage.getAccessToken();
      const response = await request.post(
        "carbon/acquire/delete",
        {
          id: id.toString(),
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.data.code === 200) {
        alert("刪除成功");
        window.location.reload();
        return true;
      } else if (response.data.code === 405) {
        alert("參數不合法");
        return false;
      } else if (response.data.code === 403) {
        alert("并非企業用戶");
        return false;
      } else if (response.data.code === 500) {
        console.log("response", response);
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  const onOptionChange = (e) => {
    settoggle(e.target.value);
    console.log("Acquireset:", e.target.value);
    toggleAcquire(acquireid);
  };

  const buttondeletAcquire = (e) => {
    deleteAcquire(acquireid);
  };

  async function updateAcqurie(id) {
    try {
      setprice(document.getElementById("Acquireprice").value);
      setmin(document.getElementById("Acquiremin").value);
      setdescription(document.getElementById("Acquiredescription").value);
      setamount(document.getElementById("Acquireamount").value);
      setmultiplier(document.getElementById("Acquiremutiplier").value);

      const userToken = storage.getAccessToken();
      console.log(
        id,
        Aamount,
        Adescription,
        Amin,
        Aamount,
        expire_time,
        enable,
        picture,
        multiplier,
        price,
        min
      );
      const response = await request.post(
        "carbon/acquire/update",
        {
          id: id.toString(),
          acquire_amount: Aamount.toString(),
          min: Amin.toString(),
          price: Aprice.toString(),
          description: Adescription.toString(),
          expire_time: "2024-05-16 00:00:00",
          // enable: enable == "1" ? "true" : "false",
          enable: selected,
          multiplier: Amultiplier.toString(),
          image: "https://imgur.com/gallery/TSO1SX1",
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
        alert("伺服器錯誤1");
        console.log(response);
        return false;
      }
    } catch (err) {
      alert("發生問題，編輯失敗");
      console.log(err);
      return false;
    }
  }

  function buttonupdateAcquire() {
    updateAcqurie(acquireid);
  }

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <Col sm={4} key={acquireid}>
      <div className="holder">
        <Card>
          <img src={require("../../../themes/sell1.jpg")} alt="Background" />
          <Card.Body>
            發佈時間: <time style={{ color: "green" }}>{publish_time}</time>
            <Card.Title
              style={{
                color: "#f64b4b",
                fontWeight: "600",
                fontSize: "22px",
              }}
            >
              {description}
            </Card.Title>
            <Card.Text>
              收購點數 {acquire_amount} 已收購點數
              {has_amount}
            </Card.Text>
            <Card.Text>
              最小收購量 {min} 收購倍數 {multiplier}
            </Card.Text>
            <Card.Text>收購單價{price}</Card.Text>
            <div className="row">
              <div className="col-md-4">
                <button
                  type="button"
                  onClick={handleShow}
                  class="btn btn-light"
                >
                  編輯
                </button>
                <Modal show={updateshow} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>编辑邀約</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="input2">收購單價</label>
                          <input
                            type="text"
                            id="Acquireprice"
                            defaultValue={price}
                            className="form-control"
                            onChange={(e) => {
                              setprice(e.target.value);
                            }}
                            placeholder="商品名稱"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputnumber2">數量</label>
                          <input
                            defaultValue={acquire_amount}
                            type="text"
                            className="form-control"
                            id="Acquireamount"
                            onChange={(e) => {
                              setamount(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="FormControlFile2">最小收購量</label>
                        <input
                          type="text"
                          defaultValue={min}
                          className="form-control"
                          id="Acquiremin"
                          onChange={(e) => {
                            setmin(e.target.value);
                          }}
                        />
                      </div>
                      {/* <img src={img} style={{ maxWidth: 100, height: 100 }} /> */}
                      <div className="form-group">
                        <label htmlFor="inputvalue2">收購倍數</label>
                        <input
                          defaultValue={multiplier}
                          type="text"
                          className="form-control"
                          id="Acquiremutiplier"
                          placeholder="價格"
                          onChange={(e) => {
                            setmultiplier(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputcarbon">邀約描述</label>
                        <input
                          defaultValue={description}
                          type="text"
                          className="form-control"
                          id="Acquiredescription"
                          onChange={(e) => {
                            setdescription(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputState">邀約設置</label>
                        <select
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
                        buttonupdateAcquire();
                      }}
                    >
                      更新邀約
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className="col-md-4">
                {enable == "1" ? (
                  <button
                    type="button"
                    className="btn btn-danger"
                    defaultValue="false"
                    value="false"
                    onClick={onOptionChange}
                  >
                    關閉
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-info"
                    defaultValue="true"
                    value="true"
                    onClick={onOptionChange}
                  >
                    開啓
                  </button>
                )}
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  className="btn btn-warning"
                  defaultValue="true"
                  value="true"
                  onClick={buttondeletAcquire}
                >
                  刪除
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
};

export { AcquireCard };
