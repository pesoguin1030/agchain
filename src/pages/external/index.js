import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import storage from "../../utils/storage";
import request from "../../utils/request";

function External() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");
  const [roleid, setroleid] = useState("");

  const handleAuthorization = () => {
    // 生成token的逻辑，将生成的token存储在state中并显示在页面上
    const newToken = "YjgwMGUyZDctOWI3Yy00MmViLWI4NjgtY";
    setToken(newToken);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 处理提交表单的逻辑
  };

  const handleConfirmation = () => {
    // 这里实现确认按钮的逻辑
    alert("您已确认授权");
  };

  useEffect(() => {
    const searchroleid = async () => {
      try {
        const userToken = storage.getAccessToken();
        const response = await request.get(`users/info`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const data = response;
        console.log("data", response.data.role.id);
        setroleid(response.data.role.id);
      } catch (err) {
        console.log("faile", err);
        alert("查找失败");
        return false;
      }
    };

    searchroleid();
  }, []);

  return (
    <div className="container py-5 py-sm-7">
      {roleid == 1 ? (
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-7">
            <div className="card card-lg mb-3">
              <div className="card-body">
                <div className="text-center">
                  <div className="mb-5">
                    <h4 className="text-center">綁定電話</h4>
                    <div class="row">
                      <div class="col-sm-12">
                        <Form.Group controlId="phoneNumber">
                          <Form.Control
                            type="text"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            maxLength="11"
                            placeholder=""
                          />
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <p>綁定電話號后，可開通外部平臺功能 。</p>
                  </div>
                  <button class="btn btn-primary btn-block confirm-button">
                    確認
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-7">
            <div className="card card-lg mb-3">
              <div className="card-body">
                <div className="text-center">
                  <div className="mb-5">
                    <h4 className="display-9">點擊按鈕接收token</h4>
                    {token && <p>{token}</p>}
                    <Button
                      variant="outline-success"
                      onClick={handleAuthorization}
                    >
                      獲取token
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default External;
