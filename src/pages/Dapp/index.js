import React from "react";

function Dapp(props) {
  return (
    <div class="container d-lg-flex align-items-lg-center space-top-2 space-lg-0 min-vh-lg-100">
      <div class="w-md-100">
        <div class="position-relative min-h-450rem">
          <div
            class="js-video-bg position-absolute w-100 h-100"
            data-hs-video-bg-options='{
        "type": "you-tube",
        "videoId": "6rPPUmStKQ4"
       }'
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Dapp;
