import React from "react";

const Footer = () => (
  <footer className="border-top">
    <div className="container">
      <div className="row justify-content-lg-between space-top-2 space-bottom-lg-2">
        <div className="col-lg-3 mb-5">
          <div className="d-flex align-items-start flex-column h-100">
            <a
              className="w-100 mb-3 mb-lg-auto"
              href="../landings/index.html"
              aria-label="Front"
            >
              <img className="brand" src="/logo.jpg" alt="Logo" />
            </a>
            <p className="small text-muted mb-0">&copy; 千農科技有限公司</p>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-3 ml-lg-auto mb-5 mb-lg-0">
          <h5>使用者相關</h5>
          <ul className="nav nav-sm nav-x-0 flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">
                訂購紀錄
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                運送方案
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                追蹤包裹
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                運送區域
              </a>
            </li>
          </ul>
        </div>
        <div className="col-6 col-md-4 col-lg-3 mb-5 mb-lg-0">
          <h5>平台相關</h5>
          <ul className="nav nav-sm nav-x-0 flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">
                支付選項
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                運送時效
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                退款政策
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-4 col-lg-2 mb-5 mb-lg-0">
          <h5>所在地</h5>
          <ul className="nav nav-sm nav-x-0 flex-column">
            <li className="nav-item">
              <a className="nav-link" href="../help-desk/index.html">
                <span className="media align-items-center">
                  <i className="fas fa-info-circle mr-2" />
                  <span className="media-body">幫助</span>
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span className="media align-items-center">
                  <i className="fas fa-user-circle mr-2" />
                  <span className="media-body">會員</span>
                </span>
              </a>
            </li>
            <li className="position-relative">
              <div className="hs-unfold position-static">
                <a className="js-hs-unfold-invoker nav-link">
                  <img
                    className="dropdown-item-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/7/72/Flag_of_the_Republic_of_China.svg"
                    alt="United States Flag"
                  />
                  <span>台灣</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-0" />

      <div className="row align-items-md-center space-1">
        <div className="col-md-4 mb-4 mb-md-0">
          <ul className="list-inline mb-0">
            <li className="list-inline-item">
              <a className="btn btn-xs btn-icon btn-soft-secondary" href="#">
                <i className="fab fa-facebook-f" />
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn btn-xs btn-icon btn-soft-secondary" href="#">
                <i className="fab fa-google" />
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn btn-xs btn-icon btn-soft-secondary" href="#">
                <i className="fab fa-twitter" />
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn btn-xs btn-icon btn-soft-secondary" href="#">
                <i className="fab fa-github" />
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-8 text-md-right">
          <ul className="nav nav-sm justify-content-md-end">
            <li className="nav-item">
              <a className="nav-link pl-0" href="../pages/privacy.html">
                隱私權保護政策
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="../pages/terms.html">
                使用條款
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
