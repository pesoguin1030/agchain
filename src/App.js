import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home'
import { DropdownCard, DropdownItem, DropdownMenu, DropdownList } from './components/Dropdown';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';

const Header=()=>(
  <div class="header-section">
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
            <div class="nav nav-sm nav-y-0 d-none d-sm-flex ml-sm-auto">
              <a class="nav-link" href="../pages/faq.html">幫助</a>
              <a class="nav-link" href="../pages/contacts-agency.html">聯絡資訊</a>
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
          </nav>
  </div>
  </div>
)

const Footer=()=>{
  
}

function App() {
  return (
    <>
    <Header />
    <Footer />
    </>
  );
}

export default App;
