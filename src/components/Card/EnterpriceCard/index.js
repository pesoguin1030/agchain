import React from "react";

const EnterpriseCard = ({
  product_id,
  img,
  title,
  description,
  price,
  amount,
  isInCart,
  onRemoveFromCart,
  onAddToCart,
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
          <span className="text-dark font-weight-bold">含碳量 ： 10kg</span>
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
          <button type="button" class="btn btn-danger">
            刪除
          </button>
        </div>
      </div>
    </div>
  </div>
);

export { EnterpriseCard };
