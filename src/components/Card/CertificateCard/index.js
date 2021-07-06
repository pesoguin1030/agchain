import React from "react";

const CertificateCard = ({ idx, img, title }) => (
  <div>
    <div className="card border shadow-none text-center h-100">
      <div className="position-relative">
        <img
          className="card-img-top"
          style={{
            minHeight: 180,
            maxHeight: 360,
            objectFit: "contain",
          }}
          src={img}
          alt="證書圖片"
        />
        <div className="position-absolute top-0 right-0 pt-3 pr-3">
          <button
            type="button"
            className="btn btn-xs btn-icon btn-outline-secondary rounded-circle"
            title="點擊放大圖片"
            data-toggle="modal"
            data-target={"#modal_" + idx}
          >
            <i className="fas fa-search-plus"></i>
          </button>
        </div>
      </div>

      <div className="card-body pt-4 px-4 pb-0">
        <div className="mb-2">{title}</div>
      </div>
    </div>
    <div
      id={"modal_" + idx}
      className="modal fade"
      tabIndex="-1"
      role="dialog"
      aria-labelledby={"exampleModalCenterTitle" + idx}
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-sm modal-md modal-lg modal-xl"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={"exampleModalCenterTitle" + idx}>
              {title}
            </h5>
            <button
              type="button"
              className="btn btn-xs btn-icon btn-soft-dark"
              data-dismiss="modal"
              aria-label="Close"
            >
              <svg
                aria-hidden="true"
                width="10"
                height="10"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"
                />
              </svg>
            </button>
          </div>
          <div className="modal-body">
            <img
              className="responsive-img"
              style={{
                minHeight: 180,
                objectFit: "contain",
              }}
              src={img}
              alt="證書圖片"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export { CertificateCard };
