import React, { useState, useReducer, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {authContext} from './contexts/authContext';
import Home from './pages/Home'
import { DropdownCard, DropdownItem, DropdownMenu, DropdownList } from './components/Dropdown';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import Shop from './pages/Shop';

const Header=()=>(
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
              <DropdownItem>幫助</DropdownItem>
              <DropdownItem>聯絡資訊</DropdownItem>
            </DropdownMenu>
            {/* Links */}
            <div className="nav nav-sm nav-y-0 d-none d-sm-flex ml-sm-auto">
              <a className="nav-link" href="../pages/faq.html">幫助</a>
              <a className="nav-link" href="../pages/contacts-agency.html">聯絡資訊</a>
            </div>
          </div>
          <ul className="list-inline ml-2 mb-0">
            {/* Search */}
            <li className="list-inline-item">
              <div className="hs-unfold">
                <a className="btn btn-xs btn-icon btn-ghost-secondary"
                   >
                  <i className="fas fa-search"></i>
                </a>
              </div>
            </li>
            {/* Shopping Cart */}
            <li className="list-inline-item">
            <DropdownMenu  icon={<FontAwesomeIcon icon={faShoppingCart}/>}>
            <DropdownCard
            position="right"
                style={{
                  minWidth: 275,
                  textAlign: "center"
                }}
                >
                    <Card.Body>
                    <figure className="max-w-9rem mx-auto mb-3">
                        <img className="img-fluid" src="../../assets/svg/illustrations/empty-cart.svg" alt="SVG" />
                      </figure>
                      <span className="d-block">Your cart is empty</span>
                    </Card.Body>
                    <Card.Footer>
                    <small>Free shipping on orders over <strong className="text-dark">$50</strong></small>
                    </Card.Footer>
                </DropdownCard>
            </DropdownMenu>
            </li>
            {/* Account */}
            <li className="list-inline-item">
              <div className="hs-unfold">
                <a className="js-hs-unfold-invoker btn btn-icon btn-xs btn-ghost-secondary"
                   >
                  <i className="fas fa-user-circle"></i>
                </a>
              </div>
            </li>
          </ul>
  </div>
  </div>

  <div className="container">
        <nav className="js-mega-menu navbar navbar-expand-lg">
          {/* Logo*/}
          <a className="navbar-brand" href="/">
            <img src="/logo.png" alt="Logo" />
          </a>
          <button type="button" className="navbar-toggler btn btn-icon btn-sm rounded-circle"
                  aria-label="Toggle navigation"
                  aria-expanded="false"
                  aria-controls="navBar"
                  data-toggle="collapse"
                  data-target="#navBar">
            <span className="navbar-toggler-default">
              <svg width="14" height="14" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M17.4,6.2H0.6C0.3,6.2,0,5.9,0,5.5V4.1c0-0.4,0.3-0.7,0.6-0.7h16.9c0.3,0,0.6,0.3,0.6,0.7v1.4C18,5.9,17.7,6.2,17.4,6.2z M17.4,14.1H0.6c-0.3,0-0.6-0.3-0.6-0.7V12c0-0.4,0.3-0.7,0.6-0.7h16.9c0.3,0,0.6,0.3,0.6,0.7v1.4C18,13.7,17.7,14.1,17.4,14.1z"/>
              </svg>
            </span>
            <span className="navbar-toggler-toggled">
              <svg width="14" height="14" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"/>
              </svg>
            </span>
          </button>
          <div id="navBar" className="collapse navbar-collapse">
            <ul className="navbar-nav">
            <li className="navbar-nav-item">
                <Link to="/shop" className="nav-link">農產品介紹</Link>
              </li>
              <li className="navbar-nav-item">
                <Link to="/dapp" className="nav-link">區塊鏈溯源</Link>
              </li>
              <li className="navbar-nav-last-item">
                <Link to="/admin" className="btn btn-sm btn-success transition-3d-hover">
                  開始使用
                </Link>
              </li>
            </ul>
          </div>
        </nav>
  </div>
  </div>
  </header>
)

const Footer=()=>(
  <footer className="border-top">
  <div className="container">
    <div className="row justify-content-lg-between space-top-2 space-bottom-lg-2">
      <div className="col-lg-3 mb-5">
        <div className="d-flex align-items-start flex-column h-100">
          <a className="w-100 mb-3 mb-lg-auto" href="../landings/index.html" aria-label="Front">
            <img className="brand" src="/logo.png" alt="Logo" />
          </a>
          <p className="small text-muted mb-0">&copy; 千農科技有限公司</p>
        </div>
      </div>
      <div className="col-6 col-md-4 col-lg-3 ml-lg-auto mb-5 mb-lg-0">
        <h5>Account</h5>
        <ul className="nav nav-sm nav-x-0 flex-column">
          <li className="nav-item"><a className="nav-link" href="#">Placing an order</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Shipping options</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Tracking a package</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Country availability</a></li>
        </ul>
      </div>
      <div className="col-6 col-md-4 col-lg-3 mb-5 mb-lg-0">
        <h5>Company</h5>
        <ul className="nav nav-sm nav-x-0 flex-column">
          <li className="nav-item"><a className="nav-link" href="#">Financing</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Recycling</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Return policy</a></li>
        </ul>
      </div>
      <div className="col-md-4 col-lg-2 mb-5 mb-lg-0">
        <h5>Our Location</h5>
        <ul className="nav nav-sm nav-x-0 flex-column">
          <li className="nav-item">
            <a className="nav-link" href="../help-desk/index.html">
              <span className="media align-items-center">
                <i className="fas fa-info-circle mr-2"></i>
                <span className="media-body">Help</span>
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span className="media align-items-center">
                <i className="fas fa-user-circle mr-2"></i>
                <span className="media-body">Your Account</span>
              </span>
            </a>
          </li>
          <li className="position-relative">
            <div className="hs-unfold position-static">
              <a className="js-hs-unfold-invoker nav-link" href="javascript:;"
                 >
                <img className="dropdown-item-icon" src="https://upload.wikimedia.org/wikipedia/commons/7/72/Flag_of_the_Republic_of_China.svg" alt="United States Flag" />
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
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn btn-xs btn-icon btn-soft-secondary" href="#">
              <i className="fab fa-google"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn btn-xs btn-icon btn-soft-secondary" href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn btn-xs btn-icon btn-soft-secondary" href="#">
              <i className="fab fa-github"></i>
            </a>
          </li>
        </ul>
      </div>

      <div className="col-md-8 text-md-right">
        <ul className="nav nav-sm justify-content-md-end">
          <li className="nav-item">
            <a className="nav-link pl-0" href="../pages/privacy.html">Privacy &amp; policy</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="../pages/terms.html">Terms &amp; conditions</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>
)

function App() {
  // Global state
  const [authState, authDispatch] = useReducer(
    (prevState, action)=>{
      switch(action){
        case "LOGIN":
          return
        default:
          return
      }
    },{
      user: null,

    }
  )
  // Setup
  useEffect(()=>{
    const bootstrapAsync=async()=>{
      const authToken=localStorage.getItem("AUTH_TOKEN")
      if(authToken)
    }
  })
  return (
    <authContext.Provider value={authState}>
    <Router>
    <Header />
    <Switch>
          <Route path="/"><Home /></Route>
          <Route path="/shop"><Shop /></Route>
          <Route path="/dapp"><Dapp /></Route>
          <Route path="/admin"><Admin /></Route>
    </Switch>
    <Footer />
    </Router>
    </authContext.Provider>
  );
}

export default App;
