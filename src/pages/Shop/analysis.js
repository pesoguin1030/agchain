import React, { useEffect, useState } from "react";
import $ from "jquery";
import {useHistory, useParams} from "react-router-dom";
import storage from "../../utils/storage";
import { getPressLikeNum, getOrderItem, getFeeItem } from "../../api/order";
import { Table } from "react-bootstrap";

function Analysis(prop) {
  const history = useHistory();
  const { orderNumber } = useParams();
  const [chartVisible, setChartVisible] = useState(false);
  const [likeNum, setLikeNum] = useState(0);
  const [orderInfo, setOrderInfo] = useState([]);
  const [total_price, setTotalPrice] = useState(0);
  const [totalCarbon,setTotalCarbon] = useState(0);
  const [feeItem, setFeeItem] = useState([]);
  let sumCarbon = 0
  useEffect(() => {
    if (chartVisible) {
      $(".js-counter").each(function () {
        var counter = new window.HSCounter($(this)).init();
      });
    }
    (async (orderNumber) => {
      const userToken = storage.getAccessToken();
      const orderItem = await getOrderItem(orderNumber, userToken);
      console.log('Debug: orderItem=',orderItem)
      const fee_item = await getFeeItem(orderNumber);
      setFeeItem(fee_item);
      // console.lo
      var sum = 0;
      for (let index = 0; index < orderItem.length; index++) {
        console.log('Debug: item=',orderItem[index])
        const item = orderItem[index];
        sum += item["amount"] * item["price"];
        sumCarbon += item["carbon_amount_total"];// 該項物品獲得碳點數
      }
      var fee = 0;
      for (let index = 0; index < fee_item.length; index++) {
        const item = fee_item[index];
        fee += item["amount"] * item["price"];
      }
      setTotalPrice(sum + fee);
      setTotalCarbon(sumCarbon);
      setOrderInfo(orderItem);
      console.log(orderItem);
    })(orderNumber);
  }, [chartVisible]);

  useEffect(() => {
    if (orderNumber) {
      const timer = setInterval(async () => {
        const like_num = await getPressLikeNum(orderNumber);
        setLikeNum(like_num);
      }, 3000);
      return () => {
        clearInterval(timer);
      };
    }
  }, []);

  const returnOrderPage = async() =>{
    history.push({
      pathname: "/order",
    });
  }

  return chartVisible ? (
    <div className="container space-2 space-lg-3">
      <div className="w-md-80 w-lg-50 text-center mx-md-auto">
        <div className="col-sm-12">
          <div
            className="js-counter h1"
            data-hs-counter-options='{
        "isCommaSeparated": true,
        "fps": 10
    }'
          >
            {likeNum}
          </div>
          <h2>多少人喜歡你/妳的賀卡</h2>
          <br />
          <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="container space-2 space-lg-3">
        <div className="w-md-80 w-lg-50 text-center mx-md-auto">
          <i className="fas fa-check-circle text-success fa-5x mb-3"></i>
          <div className="mb-5">
            <h1 className="h2">你的訂單已成立</h1>
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
                  <th>獲得點數</th>
                  <th>單品項總額</th>
                </tr>
                {orderInfo.map((item,index) => {
                  return (
                      <tr key={index}>
                      <td>{item["name"]}</td>
                      <td>{item["amount"]}</td>
                      <td>{'$ ' + item["price"]}</td>
                      <td>{item["carbon_amount"]?item["carbon_amount"]:0 + ' 點'}</td>
                      <td>{item["amount"] * item["price"]}</td>
                    </tr>
                  );
                })}
              </thead>
              <tbody></tbody>
            </Table>
            <h3>運費</h3>
            {feeItem.map((item) => {
              return <span>{item["price"]}</span>;
            })}

            <h2>價格總計：{total_price}</h2>
            <h2>獲得點數：{totalCarbon}</h2>
          </div>
          {/* <a
            onClick={() => setChartVisible(true)}
            className="btn btn-primary btn-pill transition-3d-hover px-5"
            href="#"
          >
            查看幾個人喜歡
          </a> */}
          <button
              className='btn btn-primary'
              onClick={()=>returnOrderPage()}
          >
            返回
          </button>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
