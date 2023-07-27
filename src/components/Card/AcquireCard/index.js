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
  const onOptionChange = (e) => {
    settoggle(e.target.value);
    console.log("tttttttttttt", e.target.value);
    toggleAcquire(acquireid);
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
              <div className="col-md-6">
                <a href={description} className="btn btn-primary">
                  編輯 <i className="fas fa-chevron-right"></i>
                </a>
              </div>
              <div className="col-md-6">
                {enable == "1" ? (
                  <button
                    type="button"
                    class="btn btn-danger"
                    defaultValue="false"
                    value="false"
                    onClick={onOptionChange}
                  >
                    關閉
                  </button>
                ) : (
                  <button
                    type="button"
                    class="btn btn-info"
                    defaultValue="true"
                    value="true"
                    onClick={onOptionChange}
                  >
                    開啓
                  </button>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
};

export { AcquireCard };
