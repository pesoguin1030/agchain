import React, { useEffect, useState, useContext } from "react";
import { getOrder, getOrderItem } from "../../api/order";
import storage from "../../utils/storage";
import { Table } from "react-bootstrap";

function Order() {
  const [orderlist, setOrderList] = useState([]);
  useEffect(() => {
    if (orderlist.length === 0) {
      getOrderList();
    }
  }, []);
  async function getOrderList() {
    const userToken = storage.getAccessToken();
    const orders = await getOrder(userToken);
    getPackageItem(orders).then((full_orders) => setOrderList(full_orders));
  }
  async function getPackageItem(orderlist) {
    const userToken = storage.getAccessToken();
    var packages = [];
    for (let index = 0; index < orderlist.length; index++) {
      const element = orderlist[index];
      console.log("element", element);
      element.time = element.time.replace(/([a-zA-Z ])/g, " ").slice(0, -5);
      const orderItem = await getOrderItem(element["orderNumber"], userToken);
      var items_description = "";
      orderItem.map((element) => {
        items_description += element["name"] + "、";
      });
      packages.push({
        ...element,
        ["description"]: items_description.slice(0, -1),
      });
    }
    return packages;
  }
  return (
    <div className="container space-1 space-md-2">
      <div className="row mt-10">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>訂單編號</th>
              <th>時間</th>
              <th>訂單狀態</th>
              <th>簡述</th>
              <th>電子賀卡</th>
            </tr>
          </thead>
          <tbody>
            {orderlist.map((item) => {
              return (
                <tr>
                  <td>
                    <a href={"./shop/analysis/" + item["orderNumber"]}>
                      {item["orderNumber"]}
                    </a>
                  </td>
                  <td>{item["time"]}</td>
                  <td>{item["state"]}</td>
                  <td>{item["description"]}</td>
                  <td>
                    <a href={item["video_url"]}>{item["order_type"]}</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Order;
