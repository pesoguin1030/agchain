import React, { useEffect, useState, useContext } from "react";
import { getOrder } from "../../api/order";
import storage from "../../utils/storage";
import { Table } from "react-bootstrap";

function Order() {
  const [packages, setPackages] = useState([]);
  const [showPackage, setShowPackage] = useState([]);
  useEffect(() => {
    if (packages.length === 0) {
      getPackages();
    }
  }, [packages]);
  async function getPackages() {
    const userToken = storage.getAccessToken();
    const orders = await getOrder(userToken);
    console.log(orders);
    setPackages(orders);
    return orders;
  }
  return (
    <div className="container space-1 space-md-2">
      <div className="row">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>訂單編號</th>
              <th>時間</th>
              <th>訂單狀態</th>
              <th>訂單位置</th>
              <th>電子賀卡</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((item) => {
              return (
                <tr>
                  <td>
                    <a href={"./shop/analysis/" + item["orderNumber"]}>
                      {item["orderNumber"]}
                    </a>
                  </td>
                  <td>{item["time"]}</td>
                  <td>{item["state"]}</td>
                  <td>{item["contractAddress"]}</td>
                  <td>
                    <a href={"./shop/gift/" + item["orderNumber"]}>修改</a>
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
