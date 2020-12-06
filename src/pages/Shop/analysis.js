import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useParams } from "react-router-dom";
import { getPressLikeNum } from "../../api/order";

function Analysis(prop) {
  const { orderNumber } = useParams();
  const [chartVisible, setChartVisible] = useState(false);
  const [likeNum, setLikeNum] = useState(0);
  useEffect(() => {
    if (chartVisible) {
      $(".js-counter").each(function () {
        var counter = new window.HSCounter($(this)).init();
      });
    }
    if (orderNumber) {
      (async (orderNumber) => {
        const like_num = await getPressLikeNum(orderNumber);
        setLikeNum(like_num);
      })(orderNumber);
    }
  }, [chartVisible]);

  return chartVisible ? (
    <div className="container space-2 space-lg-3">
      <div className="w-md-80 w-lg-50 text-center mx-md-auto">
        <div class="col-sm-12">
          <div
            class="js-counter h1"
            data-hs-counter-options='{
        "isCommaSeparated": true,
        "fps": 10
    }'
          >
            {likeNum}
          </div>
          <h2>People</h2>
          <br />
          <div class="spinner-grow text-danger" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div class="container space-2 space-lg-3">
        <div class="w-md-80 w-lg-50 text-center mx-md-auto">
          <i class="fas fa-check-circle text-success fa-5x mb-3"></i>
          <div class="mb-5">
            <h1 class="h2">你的訂單已成立</h1>
            <p>
              Thank you for your order! Your order is being processed and will
              be completed within 3-6 hours. You will receive an email
              confirmation when your order is completed.
            </p>
          </div>
          <a
            onClick={() => setChartVisible(true)}
            class="btn btn-primary btn-pill transition-3d-hover px-5"
            href="#"
          >
            查看幾個人喜歡
          </a>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
