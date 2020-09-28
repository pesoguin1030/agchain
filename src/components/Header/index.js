import React from "react";
import { Link } from "react-router-dom";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import {
  DropdownCard,
  DropdownItem,
  DropdownMenu,
  DropdownList,
} from "../Dropdown";
import { MegaMenu, MegaMenuItem } from "../MegaMenu";

const Header = () => (
  <header id="header" className="header">
    <div className="header-section">
      <div className="container header-hide-content pt-2">
        <div className="d-flex align-items-center">
          {/*  Language */}
          <DropdownMenu title="語言">
            <DropdownList>
              <DropdownItem>繁體中文</DropdownItem>
            </DropdownList>
          </DropdownMenu>
          <div className="ml-auto">
            {/* Jump to */}
            <DropdownMenu className="d-sm-none mr-2" title="跳轉">
              <DropdownList>
                <DropdownItem>幫助</DropdownItem>
                <DropdownItem>聯絡資訊</DropdownItem>
              </DropdownList>
            </DropdownMenu>
            {/* Links */}
            <div className="nav nav-sm nav-y-0 d-none d-sm-flex ml-sm-auto">
              <a className="nav-link" href="../pages/faq.html">
                幫助
              </a>
              <a className="nav-link" href="../pages/contacts-agency.html">
                聯絡資訊
              </a>
            </div>
          </div>
          <ul className="list-inline ml-2 mb-0">
            {/* Search */}
            <li className="list-inline-item">
              <div className="hs-unfold">
                <a className="btn btn-xs btn-icon btn-ghost-secondary" href="#">
                  <i className="fas fa-search" />
                </a>
              </div>
            </li>
            {/* Shopping Cart */}
            <li className="list-inline-item">
              <DropdownMenu icon={<FontAwesomeIcon icon={faShoppingCart} />}>
                <DropdownCard
                  position="right"
                  style={{
                    minWidth: 275,
                    textAlign: "center",
                  }}
                >
                  <Card.Body>
                    <figure className="max-w-9rem mx-auto mb-3">
                      <img
                        className="img-fluid"
                        src="../../assets/svg/illustrations/empty-cart.svg"
                        alt="SVG"
                      />
                    </figure>
                    <span className="d-block">Your cart is empty</span>
                  </Card.Body>
                  <Card.Footer>
                    <small>
                      Free shipping on orders over
                      <strong className="text-dark">$50</strong>
                    </small>
                  </Card.Footer>
                </DropdownCard>
              </DropdownMenu>
            </li>
            {/* Account */}
            <li className="list-inline-item">
              <div className="hs-unfold">
                <Link
                  to="/login"
                  className="js-hs-unfold-invoker btn btn-icon btn-xs btn-ghost-secondary"
                >
                  <i className="fas fa-user-circle" />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="container">
        <nav className="js-mega-menu navbar navbar-expand-lg">
          {/* Logo */}
          <a className="navbar-brand" href="/">
            <img src="/logo.png" alt="Logo" />
          </a>
          <button
            type="button"
            className="navbar-toggler btn btn-icon btn-sm rounded-circle"
            aria-label="Toggle navigation"
            aria-expanded="false"
            aria-controls="navBar"
            data-toggle="collapse"
            data-target="#navBar"
          >
            <span className="navbar-toggler-default">
              <svg
                width="14"
                height="14"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M17.4,6.2H0.6C0.3,6.2,0,5.9,0,5.5V4.1c0-0.4,0.3-0.7,0.6-0.7h16.9c0.3,0,0.6,0.3,0.6,0.7v1.4C18,5.9,17.7,6.2,17.4,6.2z M17.4,14.1H0.6c-0.3,0-0.6-0.3-0.6-0.7V12c0-0.4,0.3-0.7,0.6-0.7h16.9c0.3,0,0.6,0.3,0.6,0.7v1.4C18,13.7,17.7,14.1,17.4,14.1z"
                />
              </svg>
            </span>
            <span className="navbar-toggler-toggled">
              <svg
                width="14"
                height="14"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"
                />
              </svg>
            </span>
          </button>
          <div id="navBar" className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="navbar-nav-item">
                <Link to="/shop" className="nav-link">
                  農夫市集
                </Link>
              </li>
              <MegaMenu title="區塊鏈服務">
                <MegaMenuItem
                  icon={`${process.env.PUBLIC_URL}/assets/svg/icons/icon-54.svg`}
                  to="/dapp"
                  title="產品履歷"
                />
              </MegaMenu>
              <li className="navbar-nav-last-item">
                <Link
                  to="/admin"
                  className="btn btn-sm btn-primary transition-3d-hover"
                >
                  開始使用
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
);

export default Header;
