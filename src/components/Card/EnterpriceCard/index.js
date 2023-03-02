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
  <div
    className="card border shadow-none text-center h-100"
    onClick={(e) => {
      window.location.href = "./shop/single-product/" + product_id;
    }}
  >
    <div className="position-relative">
      <a
        className="d-inline-block text-body small font-weight-bold mb-1"
        href={"./shop/single-product/" + product_id}
      >
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
        <a
          className="d-inline-block text-body small font-weight-bold mb-1"
          href={"./shop/single-product/" + product_id}
        >
          {title}
        </a>

        {/* <span className="d-block font-size-1">
          <a
            className="text-inherit"
            href={"./shop/single-product/" + product_id}
          >
            {description}
          </a>
        </span> */}
        <div className="d-block">
          <span className="text-dark font-weight-bold">数量 ： {amount}</span>
        </div>
        <div className="d-block">
          <span className="text-dark font-weight-bold">{`碳權點數 : 10`}</span>
        </div>
        <div className="d-block">
          <span className="text-dark font-weight-bold">{`NTD ${price}`}</span>
        </div>
        <a
          className="d-inline-block text-body small font-weight-bold mb-1"
          href={"./shop/single-product/" + product_id}
        >
          已上架
        </a>
      </div>
      <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">
        编辑
      </a>
    </div>
  </div>
);

export { EnterpriseCard };
