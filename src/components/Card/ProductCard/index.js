import React from "react";

const ProductCard = ({ img, title, description, price, onAddToCart }) => (
  <div className="card border shadow-none text-center h-100">
    <div className="position-relative">
      <img className="card-img-top" src={img} alt="Image Description" />

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
          href="#"
        >
          {title}
        </a>
        <span className="d-block font-size-1">
          <a className="text-inherit" href="single-product.html">
            {description}
          </a>
        </span>
        <div className="d-block">
          <span className="text-dark font-weight-bold">{`NTD ${price}`}</span>
        </div>
      </div>
    </div>

    <div className="card-footer border-0 pt-0 pb-4 px-4">
      <div className="mb-3">
        <a className="d-inline-flex align-items-center small" href="#">
          <div className="text-warning mr-2">
            <i className="far fa-star text-muted"></i>
            <i className="far fa-star text-muted"></i>
            <i className="far fa-star text-muted"></i>
            <i className="far fa-star text-muted"></i>
            <i className="far fa-star text-muted"></i>
          </div>
          <span>0</span>
        </a>
      </div>
      <button
        type="button"
        onClick={onAddToCart}
        className="btn btn-sm btn-outline-primary btn-pill transition-3d-hover"
      >
        加入購物車
      </button>
    </div>
  </div>
);

export { ProductCard };
