import React from "react";

const ProductCard = ({
  product_id,
  img,
  title,
  description,
  price,
  isInCart,
  onRemoveFromCart,
  onAddToCart,
  carbon,
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
      <div className="position-absolute top-0 left-0 pt-3 pl-3">
        <span className="badge badge-success badge-pill">新上市</span>
      </div>
      <div className="position-absolute top-0 right-0 pt-3 pr-3">
        <button
          type="button"
          className="btn btn-xs btn-icon btn-outline-secondary rounded-circle"
          data-toggle="tooltip"
          data-placement="top"
          title="Save for later"
        >
          <i className="fas fa-heart"></i>
        </button>
      </div>
    </div>

    <div className="card-body pt-4 px-4 pb-0">
      <div className="mb-2">
        <a
          className="d-inline-block text-body small font-weight-bold mb-1"
          href={"./shop/single-product/" + product_id}
        >
          {title}
        </a>

        <span className="d-block font-size-1">
          <a
            className="text-inherit"
            href={"./shop/single-product/" + product_id}
          >
            {description}
          </a>
        </span>
        <div className="d-block">
          <span className="text-dark font-weight-bold">{`NTD ${price}`}</span>
        </div>
        <div className="d-block">
          <span className="text-dark font-weight-bold">
            碳權點數 ： {carbon}
          </span>
        </div>
      </div>
    </div>

    <div className="card-footer border-0 pt-0 pb-4 px-4">
      <div className="mb-3">
        <a className="d-inline-flex align-items-center small" href="#">
          <div className="text-warning mr-2">
            <i className="fa fa-star "></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </div>
          <span>5</span>
        </a>
      </div>
      {isInCart ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveFromCart();
          }}
          className="btn btn-sm btn-outline-secondary btn-pill transition-3d-hover"
        >
          從購物車中移除
        </button>
      ) : (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="btn btn-sm btn-outline-primary btn-pill transition-3d-hover"
        >
          加入購物車
        </button>
      )}
    </div>
  </div>
);

export { ProductCard };
