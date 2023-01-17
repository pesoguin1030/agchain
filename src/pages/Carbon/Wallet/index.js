import React, { useContext, useState, useEffect } from "react";

function CarbonWallet(props) {
  useEffect(function () {
    console.log("load carbon wallet test");
  });
  function buttonBind() {}

  function buttonUnbind() {}

  function buttonRefresh() {}

  function buttonExchange() {}

  return (
    <div className="container space-top-1 space-top-sm-2 mt-11">
      <div className="row pb-5 border-bottom">
        <div className="col-8 offset-2">
          <div className="mb-3 row">
            <h1>碳權錢包管理</h1>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputAddress" className="col-sm-2 col-form-label">
              錢包地址
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                readOnly
              />
            </div>
            <button className="col-sm-2 btn btn-primary" onClick={buttonBind}>
              換綁
            </button>
            <button className="col-sm-2 btn btn-danger" onClick={buttonUnbind}>
              解除
            </button>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputAddress" className="col-sm-2 col-form-label">
              碳權餘額
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                id="inputBalance"
                readOnly
              />
            </div>
            <button
              className="col-sm-2 btn btn-primary"
              onClick={buttonRefresh}
            >
              刷新
            </button>
            <button
              className="col-sm-2 btn btn-primary"
              onClick={buttonExchange}
            >
              兌換
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarbonWallet;
