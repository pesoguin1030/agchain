import React, { useState, useContext, useEffect } from "react";
import { AuthContext, CartContext } from "../../appContext";
import axios from "axios";
import storage from "../../utils/storage";
import { fetchownercarbon, fetchStore } from "../../api/product";
import request from "../../utils/request";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import validator from "validator";

// TODO: 修改所有javascript:;

function StoreInfo(props) {
  const { authState, authDispatch } = useContext(AuthContext);
  const [storeId, setstoreid] = useState(0);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState(null);
  const [ownercarbon, setownercarbon] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
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
          setstoreid(data);
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

    const handleOwnerCarbon = async () => {
      console.log("car1", storeId);
      const { message, code } = await fetchownercarbon(storeId);
      setownercarbon(message);
    };
    searchstoreid();
    handleOwnerCarbon();
  }, [storeId]);

  return (
    <div>
      <div
        class="bg-navy"
        style={{
          backgroundImage: `url(/assets/svg/components/abstract-shapes-19.svg)`,
        }}
      >
        <div class="container space-1 space-top-lg-2 space-bottom-lg-3">
          <div class="row align-items-center">
            <div class="col">
              <div class="d-none d-lg-block">
                <h1 className="h2 text-white">我的商店</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container space-1 space-top-lg-0 mt-lg-n10">
        <div class="row">
          <div class="col-lg-3">
            <div class="navbar-expand-lg navbar-expand-lg-collapse-block navbar-light">
              <div
                id="sidebarNav"
                class="collapse navbar-collapse navbar-vertical"
              ></div>
            </div>
          </div>
        </div>

        <div class="col-lg-9">
          <div class="card mb-3 mb-lg-5">
            <div class="card-header">
              <h5 class="card-title">{authState.user.name}的商店</h5>
              <div
                class="btn-toolbar"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div
                  class="btn-group mr-2"
                  role="group"
                  aria-label="First group"
                >
                  <button
                    type="button"
                    class="btn btn-info"
                    onClick={handleShow}
                  >
                    <i class="fas fa-plane" aria-hidden="true">
                      運費設置
                    </i>
                  </button>
                </div>
                <div
                  class="btn-group mr-2"
                  role="group"
                  aria-label="Second group"
                >
                  <button type="button" class="btn btn-success">
                    <a href="/carbon/external">
                      <i class="fa fa-credit-card" aria-hidden="true">
                        取得token
                      </i>
                    </a>
                  </button>
                </div>
              </div>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>設置運費</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>縣市</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="新竹市"
                      autoFocus
                      defaultValue={"新竹市"}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>同縣市運費</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="同縣市運費"
                      autoFocus
                      defaultValue={10}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>不同縣市運費</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="不同縣市運費"
                      autoFocus
                      defaultValue={20}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>離島運費</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="離島運費"
                      autoFocus
                      defaultValue={30}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>免運門檻</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="免運門檻"
                      autoFocus
                      defaultValue={100}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  關閉
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  保存
                </Button>
              </Modal.Footer>
            </Modal>

            <div class="row">
              <div class="col-xl-6 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          授權點數
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                          {ownercarbon}
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
            </div>

            <div class="card-body">
              <form>
                {/* Form Group */}
                <div class="row form-group">
                  <label
                    htmlFor="firstNameLabel"
                    class="col-sm-3 col-form-label input-label"
                  >
                    商店品牌{" "}
                    <i
                      class="far  text-body ml-1"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Displayed on public forums, such as Front."
                    ></i>
                  </label>

                  <div class="col-sm-9">
                    <div class="input-group">
                      {authState.user ? (
                        <input
                          type="text"
                          class="form-control"
                          name="firstName"
                          required
                          id="firstNameLabel"
                          aria-label="Clarice"
                          placeholder={authState.user.name}
                          defaultValue={authState.user.name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      ) : (
                        <input
                          type="text"
                          class="form-control"
                          name="firstName"
                          required
                          id="firstNameLabel"
                          placeholder="Clarice"
                          aria-label="Clarice"
                          // value="WHAT"
                          // onChange={(e) => {console.log("NOW"); setName(e.target.value);}}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div class="row form-group">
                  <label
                    htmlFor="phoneLabel"
                    class="col-sm-3 col-form-label input-label"
                  >
                    {" "}
                    聯係電話
                    {/* <span class="input-label-secondary">(Optional)</span> */}
                  </label>

                  {/* TODO: 更改phone的template */}
                  <div class="col-sm-9">
                    <div class="input-group align-items-center">
                      {authState.user ? (
                        <input
                          type="text"
                          class="js-masked-input form-control"
                          name="phone"
                          id="phoneLabel"
                          placeholder="09xxxxxxxx"
                          aria-label="09xx-xxx-xxx"
                          defaultValue={authState.user.phone}
                          data-hs-mask-options='{
								"template": "0000000000"
							}'
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                        />
                      ) : (
                        <input
                          type="text"
                          class="js-masked-input form-control"
                          name="phone"
                          id="phoneLabel"
                          placeholder="09xx-xxx-xxx"
                          aria-label="+x(xxx)xxx-xx-xx"
                          defaultValue=""
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                          data-hs-mask-options='{
								"template": "+0(000)000-00-00",
								"translation": {
									"*": {"pattern": "[0][9]"}
								}
							}'
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div class="row form-group">
                  <label
                    htmlFor="emailLabel"
                    class="col-sm-3 col-form-label input-label"
                  >
                    商店地址
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="address"
                      class="form-control"
                      name="email"
                      id="emailLabel"
                      placeholder="商店地址"
                      aria-label="clarice@example.com"
                    />
                  </div>
                </div>

                <div class="row form-group">
                  <label
                    htmlFor="emailLabel"
                    class="col-sm-3 col-form-label input-label"
                  >
                    商店特色
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="address"
                      class="form-control"
                      name="email"
                      id="emailLabel"
                      placeholder="商店特色"
                      aria-label="clarice@example.com"
                    />
                  </div>
                </div>

                <div class="row form-group">
                  <label
                    htmlFor="emailLabel"
                    class="col-sm-3 col-form-label input-label"
                  >
                    商店名稱
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="address"
                      class="form-control"
                      name="email"
                      id="emailLabel"
                      placeholder="商店名稱"
                      aria-label="clarice@example.com"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div class="card-footer d-flex justify-content-end">
              <button class="btn btn-white">取消</button>
              <span class="mx-2"></span>
              <button
                class="btn btn-primary"
                onClick={() => {
                  window.location.reload();
                }}
              >
                儲存變更
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreInfo;
