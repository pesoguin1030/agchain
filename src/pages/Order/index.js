import React, { useEffect, useState, useContext } from "react";
import { getOrder, getOrderItem } from "../../api/order";
import storage from "../../utils/storage";
import { Table } from "react-bootstrap";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";

function Order() {
  const labelProps = {};
  const stepProps = {};
  labelProps.optional = <Typography variant="caption">Optional</Typography>;
  stepProps.completed = false;

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
              <th>成立時間</th>
              <th>訂單狀態</th>
              {/*<th>獲得點數</th>*/}
              <th>訂單内商品</th>
              {/*<th>電子賀卡</th>*/}
            </tr>
          </thead>
          <tbody>
            {orderlist.map((item,index) => {
              return (
                <tr key={index}>
                  <td>
                    <a href={"./shop/analysis/" + item["orderNumber"]}>
                      {item["orderNumber"]}
                    </a>
                  </td>
                  <td>{item["time"]}</td>
                  <td>{item["state"]}</td>
                  {/*<td>{item["carbon_amount_total"]}</td>*/}
                  <td>{item["description"]}</td>
                  {/*<td>*/}
                  {/*  <a href={item["video_url"]}>{item["order_type"]}</a>*/}
                  {/*</td>*/}
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
