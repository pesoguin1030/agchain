import React, { useState, useEffect, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Container, Form, Button, Modal } from "react-bootstrap";
import storage from "../../utils/storage";
import request from "../../utils/request";
import { fetchAcquire } from "../../api/product";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import cn from "date-fns/locale/zh-CN";
import { AuthContext } from "../../appContext";
registerLocale("cn", cn);

function Acquire() {
  const { authState, authDispatch } = useContext(AuthContext);
  const [acquire, setacquire] = useState([]);
  const [amount, setamount] = useState("");
  const [price, setprice] = useState("");
  const [min, setmin] = useState("");
  const [multiplier, setmultiplier] = useState("");
  const [picture, setPicture] = useState("https://imgur.com/gallery/TSO1SX1");
  const [description, setdescription] = useState("");
  const [expire_time, setexpire_time] = useState("");
  const expiretime = "2024-05-16 00:00:00";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomTimeInput = ({ date, value, onChange }) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ border: "solid 1px pink" }}
    />
  );
  console.log("date", startDate);
  const items = [
    {
      id: 1,
      image: "image1.jpg",
      date: "2023-04-26",
      price: 29.99,
    },
    {
      id: 2,
      image: "image2.jpg",
      date: "2023-04-27",
      price: 39.99,
    },
    {
      id: 3,
      image: "image3.jpg",
      date: "2023-04-28",
      price: 49.99,
    },
  ];

  useEffect(() => {
    const handleFetchAcquire = async () => {
      const { message, code } = await fetchAcquire(authState.user.id);
      console.log("message", message);
      setacquire(message);
      console.log("acquire", acquire);
    };
    handleFetchAcquire();
  }, []);

  async function createacquire() {
    try {
      const userToken = storage.getAccessToken();

      const response = await request.post(
        `carbon/acquire/create`,
        {
          acquire_amount: amount,
          price: price,
          min: min,
          multiplier: multiplier,
          image: picture,
          description: description,
          expire_time: expiretime,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log("response", response);
      if (response.data.code === 200) {
        alert("成功");
        return true;
      } else if (response.data.code === 405) {
        alert("參數不合法");
        return false;
      } else if (response.data.code === 403) {
        alert("并非該商店成員");
        return false;
      } else if (response.data.code === 500) {
        alert("伺服器發生問題，失敗");
        return false;
      }
    } catch (err) {
      alert("失敗");
      console.log(err);
      return false;
    }
  }

  function buttonCreateAcquire() {
    createacquire();
    // window.location.reload();
  }

  return (
    <div className="container py-5 py-sm-7">
      <div className="row align-items-start align-items-center latestArticles">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-8 col-10">
          {/* <ul className="nav nav-pills list-group-horizontal" role="tablist">
            <li className="nav-item">
              <button
                type="button"
                className="list-group-item list-group-item-action active"
                aria-current="true"
              >
                全部邀約
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="list-group-item list-group-item-action"
              >
                最新邀約
              </button>
            </li>
          </ul> */}
        </div>
        <div className="col d-flex justify-content-end p-0 pe-2 p-sm-2">
          <a
            className="col-md-auto d-none d-sm-inline-block btn btn-sm btn-light"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={handleShow}
          >
            <i className="fas fa-plus"></i> 發佈邀約
          </a>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title
                style={{
                  fontWeight: "bold",
                  fontSize: 30,
                }}
              >
                發佈邀約
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label
                      for="input1"
                      style={{
                        fontSize: 20,
                        fontWeight: "700",
                        color: "black",
                      }}
                    >
                      收購單價
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      onChange={(e) => {
                        setprice(e.target.value);
                      }}
                      placeholder="請填寫收購點數單價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label
                      for="inputnumber"
                      style={{
                        fontSize: 20,
                        fontWeight: "700",
                        color: "black",
                      }}
                    >
                      收購份數
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputnumber"
                      placeholder="數量"
                      onChange={(e) => {
                        setamount(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label
                      for="inputvalue"
                      style={{
                        fontSize: 20,
                        fontWeight: "700",
                        color: "black",
                      }}
                    >
                      最小收購份數
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputvalue"
                      placeholder="每份邀約最小收購份數"
                      onChange={(e) => {
                        setmin(e.target.value);
                      }}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label
                      for="inputvalue"
                      style={{
                        fontSize: 20,
                        fontWeight: "700",
                        color: "black",
                      }}
                    >
                      收購點數倍數
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputvalue"
                      placeholder="每份邀約收購點數倍數"
                      onChange={(e) => {
                        setmultiplier(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label
                    for="inputvalue"
                    style={{ fontSize: 20, fontWeight: "700", color: "black" }}
                  >
                    邀約描述
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="carbonvalue"
                    placeholder="邀約描述"
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                  />
                </div>

                <div class="form-group">
                  <label
                    for="inputtext"
                    style={{ fontSize: 20, fontWeight: "700", color: "black" }}
                  >
                    收購終止期限
                  </label>
                  <DatePicker
                    locale="cn"
                    dateFormat="yyyy-MM-dd hh:mm:ss"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeInput
                    customTimeInput={<ExampleCustomTimeInput />}
                  />
                </div>
                <div class="form-group">
                  <label
                    for="exampleFormControlFile1"
                    style={{ fontSize: 20, fontWeight: "700", color: "black" }}
                  >
                    上傳照片
                  </label>
                  <input
                    type="file"
                    class="form-control-file"
                    id="exampleFormControlFile1"
                    // onChange={(e) => {
                    //   setPicture(e.target.value);
                    // }}
                  />
                </div>
                <div class="form-group"></div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                關閉
              </Button>
              <Button
                variant="primary"
                onClick={(event) => {
                  buttonCreateAcquire();
                  handleClose();
                }}
              >
                發佈
              </Button>
            </Modal.Footer>
          </Modal>
          <ul
            id="display-type"
            className="list-group list-group-horizontal border-0 display-type"
          >
            <li className="list-group-item border-0  p-1 p-sm-2 ">
              <a
                class="nav-link"
                id="card-tab"
                data-toggle="tab"
                href="#card"
                role="tab"
                aria-controls="One"
                aria-selected="true"
              >
                <i className="fa fa-th-large" aria-hidden="true"></i>
              </a>
            </li>
            <li className="list-group-item border-0 p-1 p-sm-2">
              <a
                class="nav-link"
                id="list-tab"
                data-toggle="tab"
                href="#list"
                role="tab"
                aria-controls="Two"
                aria-selected="false"
              >
                <i className="fa fa-list-ul"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="tab-content" id="nav-tabContent">
        <div role="tabpanel" class="tab-pane fade in active" id="card">
          <section id="blog" className="block blog-block">
            <Container fluid>
              <Row>
                {acquire.map((blog) => {
                  return (
                    <Col sm={4} key={blog.id}>
                      <div className="holder">
                        <Card>
                          <img
                            src={require("../../themes/sell1.jpg")}
                            alt="Background"
                          />
                          <Card.Body>
                            發佈時間:{" "}
                            <time style={{ color: "green" }}>
                              {blog.publish_time}
                            </time>
                            <Card.Title
                              style={{
                                color: "#f64b4b",
                                fontWeight: "600",
                                fontSize: "22px",
                              }}
                            >
                              {blog.description}
                            </Card.Title>
                            <Card.Text>
                              收購點數 {blog.acquire_amount} 已收購點數
                              {blog.has_amount}
                            </Card.Text>
                            <Card.Text>
                              最小收購量 {blog.min} 收購倍數 {blog.multiplier}
                            </Card.Text>
                            <Card.Text>收購單價{blog.price}</Card.Text>
                            <div className="row">
                              <div className="col-md-6">
                                <a
                                  href={blog.description}
                                  className="btn btn-primary"
                                >
                                  編輯 <i className="fas fa-chevron-right"></i>
                                </a>
                              </div>
                              <div className="col-md-6">
                                <button type="button" class="btn btn-info">
                                  開啓
                                </button>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </section>
        </div>
        <div role="tabpanel" class="tab-pane fade" id="list">
          <Container>
            {acquire.map((blog) => (
              <Card key={blog.id} className="my-3">
                {/* <Card.Img variant="top" style={{height:100,width:100}} src={require("../../themes/sell1.jpg")} alt="Item Image"  /> */}
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Text>发布日期: {blog.publish_time}</Card.Text>
                    <Card.Text>收购单价: ${blog.price}</Card.Text>
                    <Card.Text>收购点数: {blog.acquire_amount}</Card.Text>
                    <Card.Text>已收购点数: {blog.has_amount}</Card.Text>
                  </div>
                  <Button variant="outline-primary">编辑</Button>{" "}
                </Card.Body>
              </Card>
            ))}
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Acquire;
