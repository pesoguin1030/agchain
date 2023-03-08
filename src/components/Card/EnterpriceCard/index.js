import React from "react";
import request from "../../../utils/request";
import storage from "../../../utils/storage";

// async function deletproduct() {
//   try {
//     const userToken = storage.getAccessToken();
//     await request.post(
//       "productsv2/delete",
//       {
//         productId: product_id,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     alert("刪除成功");
//     return true;
//   } catch (err) {
//     alert("伺服器發生問題，刪除失敗");
//     console.log(err);
//     return false;
//   }
// }

// async function downShelfProduct() {
//   try {
//     const userToken = storage.getAccessToken();
//     await request.post(
//       "productsv2/upSelf",
//       {
//         productId: product_id,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     alert("下架成功");
//     return true;
//   } catch (err) {
//     alert("伺服器發生問題，下架失敗");
//     console.log(err);
//     return false;
//   }
// }

// async function upShelfProduct() {
//   try {
//     const userToken = storage.getAccessToken();
//     await request.post(
//       "productsv2/downSelf",
//       {
//         productId: product_id,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     alert("上架成功");
//     return true;
//   } catch (err) {
//     alert("伺服器發生問題，上架失敗");
//     console.log(err);
//     return false;
//   }
// }

// async function updateproduct() {
//   try {
//     const userToken = storage.getAccessToken();
//     await request.post(
//       "productsv2/update",
//       {
//         productId: product_id,
//         name: productName,
//         price: priceNumber,
//         limit_amount: amountNumber,
//         photo_url: picture,
//         compensation_ratio: percent,
//         weight: weight,
//         type: selected,
//         description: description,
//         store_id: storeId,
//         carbon_amount: cardbon,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     alert("編輯成功");
//     return true;
//   } catch (err) {
//     alert("伺服器發生問題，編輯失敗");
//     console.log(err);
//     return false;
//   }
// }

const EnterpriseCard = ({
  product_id,
  img,
  title,
  description,
  price,
  amount,
  carbon,
}) => (
  <div className="card border shadow-none text-center h-100">
    <div className="position-relative">
      <a className="d-inline-block text-body small font-weight-bold mb-1">
        <img
          className="card-img-top"
          style={{
            minHeight: 180,
            objectFit: "contain",
          }}
          src={img}
          alt="商品圖片"
        />
      </a>
      <div className="position-absolute top-0 right-0 pt-3 pr-3"></div>
    </div>
    <div className="card-body pt-4 px-4 pb-0">
      <div className="mb-2">
        <a className="d-inline-block text-body small font-weight-bold mb-1">
          {title}
        </a>
        <div className="d-block">
          <span className="text-dark font-weight-bold">数量 ： {amount}</span>
        </div>
        <div className="d-block">
          <span className="text-dark font-weight-bold">
            碳權點數 ： {carbon}
          </span>
        </div>
        <div className="d-block">
          <span className="text-dark font-weight-bold">{`NTD ${price}`}</span>
        </div>
        <a className="d-inline-block text-body small font-weight-bold mb-1">
          已上架
        </a>
      </div>
      <div class="row justify-content-between">
        <div class="row-4">
          <button type="button" class="btn btn-danger">
            下架
          </button>
        </div>
        <div class="row-4">
          <button type="button" class="btn btn-info">
            編輯
          </button>
        </div>
        <div class="row-4">
          <button type="button" class="btn btn-danger">
            刪除
          </button>
        </div>
      </div>
    </div>
  </div>
);

export { EnterpriseCard };
