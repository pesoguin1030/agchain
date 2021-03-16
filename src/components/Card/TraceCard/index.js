import React from "react";

const TraceCard = ({ crop_id, name, type, link_url }) => (
  <div className="card border shadow-none text-center h-100">
    <div className="position-relative">
      <img
        className="card-img-top"
        style={{
          minHeight: 180,
          objectFit: "contain",
        }}
        src={
          "https://storage.googleapis.com/tenlife/28695440-85ad-11eb-a41d-353d12689eba.webp"
        }
        alt="米類"
      />
    </div>

    <div className="card-body pt-4 px-4 pb-0">
      <div className="mb-2">
        <a
          className="d-inline-block text-body big font-weight-bold mb-1"
          href={link_url}
        >
          {name}
        </a>
      </div>
    </div>
  </div>
);

export { TraceCard };
