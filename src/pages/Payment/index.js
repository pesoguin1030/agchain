import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import storage from "../../utils/storage";
import { getOrderItem } from "../../api/order";

function Payment() {
  // const htmlPart = "<p>Welcome to this <strong>page</strong></p>";
  const [orderInfo, setOrderInfo] = useState([]);
  const [total_price, setTotalPrice] = useState(0);
  const { html, orderNumber } = useParams();
  const decode_html = html.replaceAll("-", "/");

  useEffect(() => {
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
    return () => {};
  });

  return (
    <div class="container space-2 space-lg-3">
      <div class="w-md-80 w-lg-50 text-center mx-md-auto">
        <div className="border-bottom pb-4 mb-4">
          <h1 className="h3 mb-0">訂單總結</h1>
        </div>
        <div>
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
          <h3>總計：{total_price}</h3>
          <div dangerouslySetInnerHTML={{ __html: decode_html }} />
        </div>
      </div>
    </div>
  );
}

export default Payment;
