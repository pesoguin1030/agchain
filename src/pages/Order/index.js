import React, { useEffect, useState, useContext } from "react";
import { getOrder } from "../../api/order";
import storage from "../../utils/storage";

function Order() {
  const [packages, setPackages] = useState([]);
  const [showPackage, setShowPackage] = useState([]);
  useEffect(() => {
    if (packages.length === 0) {
      getPackages();
    }
    // console.log("-------",showPackage)
  }, [packages]);
  async function getPackages() {
    const userToken = storage.getAccessToken();
    const orders = await getOrder(userToken);
    console.log(orders);
    setPackages(orders);
    return orders;
  }
  return (
    <div>
      {packages.map((item) => {
        return <span>{JSON.stringify(item)}</span>;
      })}
    </div>
  );
}

export default Order;
