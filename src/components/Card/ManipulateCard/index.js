import React from "react";

const ManipulateCard = ({ tackle_time, action, photo_url }) => (
  <div className="card border shadow-none text-center">
    <div className="position-relative">
      <img
        className="card-img-top"
        style={{
          objectFit: "contain",
        }}
        src={photo_url}
        alt="製作照片"
      />
    </div>
  </div>
);

export { ManipulateCard };
