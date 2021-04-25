import React from "react";

const TraceCard = ({ crop_id, name, type, link_url }) => (
  <div
    className="card border shadow-none text-center h-100"
    onClick={() => {
      window.location.href = link_url;
    }}
  >
    <div className="position-relative">
      <img
        className="card-img-top"
        style={{
          minHeight: 180,
          objectFit: "contain",
        }}
        src={
          "https://storage.googleapis.com/tenlife/e992ec60-9293-11eb-aa1e-994fc2b48f41.webp"
        }
        alt="三光米"
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
