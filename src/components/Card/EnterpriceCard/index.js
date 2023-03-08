import React, { useEffect, useState } from "react";
import request from "../../../utils/request";
import storage from "../../../utils/storage";

const EnterpriseCard = ({
  product_id,
  img,
  title,
  description,
  price,
  amount,
  carbon,
}) => {
  const [productName, setProductName] = useState("");
  const [priceNumber, setPriceNumber] = useState(null);
  const [amountNumber, setAmountNumber] = useState(1);
  const [picture, setPicture] = useState("null");
  const [percent, setPercent] = useState(0);
  const [weight, setWeight] = useState(250);
  const [productdescription, setproductdescription] = useState(null);
  const [carbonAmount, setcarbonamount] = useState(null);
  const [storeId, setstoreid] = useState(69);

  async function deletproduct() {
    try {
      const userToken = storage.getAccessToken();
      await request.post(
        "productsv2/delete",
        {
          productId: product_id,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      alert("刪除成功");
      return true;
    } catch (err) {
      alert("伺服器發生問題，刪除失敗");
      console.log(err);
      return false;
    }
  }

  async function downShelfProduct() {
    try {
      const userToken = storage.getAccessToken();
      await request.post(
        "productsv2/upSelf",
        {
          productId: product_id,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      alert("下架成功");
      return true;
    } catch (err) {
      alert("伺服器發生問題，下架失敗");
      console.log(err);
      return false;
    }
  }

  async function upShelfProduct() {
    try {
      const userToken = storage.getAccessToken();
      await request.post(
        "productsv2/downSelf",
        {
          productId: product_id,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      alert("上架成功");
      return true;
    } catch (err) {
      alert("伺服器發生問題，上架失敗");
      console.log(err);
      return false;
    }
  }

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

  return (
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
            <button
              type="button"
              class="btn btn-danger"
              data-toggle="modal"
              data-target="#deletModal"
            >
              刪除
            </button>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="deletModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                删除提示
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">你確認刪除嗎？</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                關閉
              </button>
              <button type="button" class="btn btn-success">
                確認刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EnterpriseCard };
