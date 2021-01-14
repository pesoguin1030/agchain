import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useParams } from "react-router-dom";
import storage from "../../utils/storage";
import { getPressLikeNum, getOrderItem } from "../../api/order";
import { Table } from "react-bootstrap";

function Analysis(prop) {
  const { orderNumber } = useParams();
  const [chartVisible, setChartVisible] = useState(false);
  const [likeNum, setLikeNum] = useState(0);
  const [orderInfo, setOrderInfo] = useState([]);
  const [total_price, setTotalPrice] = useState(0);
  useEffect(() => {
    if (chartVisible) {
      $(".js-counter").each(function () {
        var counter = new window.HSCounter($(this)).init();
      });
    }
    (async (orderNumber) => {
      const userToken = storage.getAccessToken();
      const orderItem = await getOrderItem(orderNumber, userToken);
      var sum = 0;
      for (let index = 0; index < orderItem.length; index++) {
        const item = orderItem[index];
        sum += item["amount"] * item["price"];
      }
      setTotalPrice(sum);
      setOrderInfo(orderItem);
      console.log(orderItem);
    })(orderNumber);

    if (orderNumber) {
      (async (orderNumber) => {
        const like_num = await getPressLikeNum(orderNumber);
        setLikeNum(like_num);
      })(orderNumber);
    }
  }, [chartVisible]);

  return chartVisible ? (
    <div className="container space-2 space-lg-3">
      <div className="w-md-80 w-lg-50 text-center mx-md-auto">
        <div class="col-sm-12">
          <div
            class="js-counter h1"
            data-hs-counter-options='{
        "isCommaSeparated": true,
        "fps": 10
    }'
          >
            {likeNum}
          </div>
          <h2>People</h2>
          <br />
          <div class="spinner-grow text-danger" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div class="container space-2 space-lg-3">
        <div class="w-md-80 w-lg-50 text-center mx-md-auto">
          <i class="fas fa-check-circle text-success fa-5x mb-3"></i>
          <div class="mb-5">
            <h1 class="h2">你的訂單已成立</h1>
            <p>感謝您的訂購，您的訂單會盡快出貨</p>
          </div>

          <div>
            <h3>訂單編號：{orderNumber}</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>名稱</th>
                  <th>數量</th>
                  <th>單價</th>
                  <th>單品項總額</th>
                </tr>
                {orderInfo.map((item) => {
                  return (
                    <tr>
                      <td>{item["name"]}</td>
                      <td>{item["amount"]}</td>
                      <td>{item["price"]}</td>
                      <td>{item["amount"] * item["price"]}</td>
                    </tr>
                  );
                })}
              </thead>
              <tbody></tbody>
            </Table>
            <h2>總計：{total_price}</h2>
          </div>
          <a
            onClick={() => setChartVisible(true)}
            class="btn btn-primary btn-pill transition-3d-hover px-5"
            href="#"
          >
            查看幾個人喜歡
          </a>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
