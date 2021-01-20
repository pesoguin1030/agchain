import request from "../utils/request";
import Constants from "./constants";
import { CartContext } from "../appContext";
import storage from "../utils/storage";
import { FarmInfo, fetchProducts } from "./product";
const getFarmList = async (cart) => {
  // const items = storage.getShoppingCart()
  var products;
  await (async () => {
    products = await fetchProducts();
    // console.log(products)
  })();
  var items = products["items"];
  async function getFarmId(item) {
    var obj = {};
    const data = await FarmInfo(item["id"]);
    if (typeof data !== "undefined") {
      obj[item["id"]] = data["farm_name"];
      return obj;
    }
  }
  var farmlist = await Promise.all(items.map(getFarmId));
  farmlist = farmlist.filter(function (element) {
    return element !== undefined;
  });
  console.log(farmlist);
  return farmlist;
};

export { getFarmList };
