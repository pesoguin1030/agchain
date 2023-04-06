import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "react-bootstrap";
import storage from "../../utils/storage";
import { getOrderItem,dummyPurchase } from "../../api/order";


function Payment(props) {
  const history = useHistory();
  const [orderInfo, setOrderInfo] = useState([]);
  const [total_price, setTotalPrice] = useState(0);
  const [totalCarbon,setTotalCarbon] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(false);

  const html = localStorage.getItem('payHtml');
  const orderNumber = localStorage.getItem('orderNumber')
  const total_fee = localStorage.getItem('totalFee')
  let sumCarbon = 0
  var decode_html = html.replaceAll("-", "/");
  // decode_html = html.replaceAll('value="submit"', 'value="結帳"');
  useEffect(() => {
    (async (orderNumber) => {
      const userToken = storage.getAccessToken();
      const orderItem = await getOrderItem(orderNumber, userToken);
      console.log('Debug: orderItem=',orderItem)
      var sum = 0;
      for (let index = 0; index < orderItem.length; index++) {
        console.log('Debug: item=',orderItem[index])
        const item = orderItem[index];
        sum += item["amount"] * item["price"];
        console.log('Debug: sum=',sum)
        sumCarbon += item["carbon_amount_total"]
      }
      console.log('Debug: sum=',sum)
      sum += Number(total_fee);
      setTotalPrice(sum);
      console.log('Debug: total_fee=',total_fee)
      console.log('Debug: sum=',sum)
      setTotalCarbon(sumCarbon);
      setOrderInfo(orderItem);
      // console.log(orderItem);
    })(orderNumber);
    return () => {};
  }, []);

  const doDummyPurchase = async() =>{

    try{
      setButtonDisable(true)

      const orderNumber = localStorage.getItem('orderNumber')
      const purchaseStatus = await dummyPurchase(orderNumber)
      console.log('Debug: purchaseStatus=',purchaseStatus)
      if(purchaseStatus.status==200){
        alert('購買成功！')
        // 刪除訂單相關資料
        localStorage.setItem('shopping_cart',[])
        localStorage.setItem('totalFee',null)
        localStorage.setItem('orderNumber',null)
        localStorage.setItem('payHtml',null)
        history.push({
          pathname: "/order",
        });
      }else{
        alert('購買失敗！\n原因：'+purchaseStatus.statusText)
      }
    }catch (error) {
      console.log('Error in doDummyPurchase:',error.message)
      alert("購買發生錯誤！\n原因："+error.message)
    }finally {
      setButtonDisable(false)
    }
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
                  {/*<th>獲得點數總額</th>*/}
                </tr>
                {orderInfo.map((item,index) => {
                  return (
                    <tr key={index}>
                      <td>{item["name"]}</td>
                      <td>{'$ ' + item["price"]}</td>
                      <td>{item["carbon_amount"]?item["carbon_amount"]:0 + ' 點'}</td>
                      <td>{item["amount"]}</td>
                      <td>{item["amount"] * item["price"]}</td>
                      {/*<td>{item["carbon_amount_total"]}</td>*/}
                    </tr>
                  );
                })}
              </thead>
            </Table>
            <span>運費：{total_fee}</span>
          </div>
          <h3>價格總價：{total_price}</h3>
          <h3>獲得點數：{totalCarbon}</h3>
          {/*<div dangerouslySetInnerHTML={{ __html: decode_html }} />*/}
          <button
              className='btn btn-primary'
              onClick={()=>doDummyPurchase()}
              disabled={buttonDisable}
          >
            立即購買
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Payment);
