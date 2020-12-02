import React from "react";

const CertificateCard = ({ img, title, onClickToZoomIn }) => (
  <div className="card border shadow-none text-center h-100">
    <div className="position-relative">
      <img
        className="card-img-top"
        style={{
          minHeight: 180,
          objectFit: "contain",
        }}
        src={img}
        alt="證書圖片"
      />
      <div className="position-absolute top-0 right-0 pt-3 pr-3">
        <button
          type="button"
          className="btn btn-xs btn-icon btn-outline-secondary rounded-circle"
          data-toggle="tooltip"
          data-placement="top"
          title="點擊放大圖片"
          onClick={onClickToZoomIn}
        >
          <i class="fas fa-search-plus"></i>
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
      </div>
    </div>
  </div>
);

export default CertificateCard;
