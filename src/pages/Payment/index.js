import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import storage from "../../utils/storage";
import { getOrderItem } from "../../api/order";

function Payment(props) {
  const [orderInfo, setOrderInfo] = useState([]);
  const [total_price, setTotalPrice] = useState(0);
  const html = props.html;
  const orderNumber = props.orderNumber;
  const total_fee = props.totalFee;
  var decode_html = html.replaceAll("-", "/");
  // decode_html = html.replaceAll('value="submit"', 'value="結帳"');
  useEffect(() => {
    (async (orderNumber) => {
      const userToken = storage.getAccessToken();
      const orderItem = await getOrderItem(orderNumber, userToken);// TODO 添加碳權點數
      var sum = 0;
      for (let index = 0; index < orderItem.length; index++) {
        const item = orderItem[index];
        sum += item["amount"] * item["price"];
      }
      sum += total_fee;
      setTotalPrice(sum);
      setOrderInfo(orderItem);
      // console.log(orderItem);
    })(orderNumber);
    return () => {};
  }, []);

  const fakePurchase = () =>{
    alert('test')
  }

  return (
    <div className="container space-2 space-lg-3 mt-10">
      <div className="w-md-80 w-lg-50 text-center mx-md-auto">
        <div className="border-bottom pb-4 mb-4">
          <h1 className="h3 mb-0">訂單總結</h1>
        </div>
        <div className="">
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>名稱</th>

                  <th>單價</th>
                  <th>點數</th>
                  <th>數量</th>
                  <th>單品項總額</th>
                  <th>獲得點數總額</th>
                </tr>
                {orderInfo.map((item,index) => {
                  return (
                    <tr key={index}>
                      <td>{item["name"]}</td>
                      <td>{item["price"]}</td>
                      <td>{0}</td>
                      <td>{item["amount"]}</td>
                      <td>{item["amount"] * item["price"]}</td>
                      <td>{0}</td>
                    </tr>
                  );
                })}
              </thead>
            </Table>
            <span>運費：{total_fee}</span>
          </div>
          <h3>價格總價：{total_price}</h3>
          <h3>點數總計：{0}</h3>
          {/*<div dangerouslySetInnerHTML={{ __html: decode_html }} />*/}
          <button className='btn btn-primary' onClick={fakePurchase}>立即購買</button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
