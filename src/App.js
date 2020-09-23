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

const Footer=()=>(
  <footer class="border-top">
  <div class="container">
    <div class="row justify-content-lg-between space-top-2 space-bottom-lg-2">
      <div class="col-lg-3 mb-5">
        <div class="d-flex align-items-start flex-column h-100">
          <a class="w-100 mb-3 mb-lg-auto" href="../landings/index.html" aria-label="Front">
            <img class="brand" src="../../assets/svg/logos/logo.svg" alt="Logo" />
          </a>
          <p class="small text-muted mb-0">&copy; 千農科技有限股份公司</p>
        </div>
      </div>

      <div class="col-6 col-md-4 col-lg-3 ml-lg-auto mb-5 mb-lg-0">
        <h5>Account</h5>
        <ul class="nav nav-sm nav-x-0 flex-column">
          <li class="nav-item"><a class="nav-link" href="#">Placing an order</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Shipping options</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Tracking a package</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Country availability</a></li>
        </ul>
      </div>

      <div class="col-6 col-md-4 col-lg-3 mb-5 mb-lg-0">
        <h5>Company</h5>
        <ul class="nav nav-sm nav-x-0 flex-column">
          <li class="nav-item"><a class="nav-link" href="#">Financing</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Recycling</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Return policy</a></li>
        </ul>
      </div>

      <div class="col-md-4 col-lg-2 mb-5 mb-lg-0">
        <h5>Our Location</h5>
        <ul class="nav nav-sm nav-x-0 flex-column">
          <li class="nav-item">
            <a class="nav-link" href="../help-desk/index.html">
              <span class="media align-items-center">
                <i class="fas fa-info-circle mr-2"></i>
                <span class="media-body">Help</span>
              </span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span class="media align-items-center">
                <i class="fas fa-user-circle mr-2"></i>
                <span class="media-body">Your Account</span>
              </span>
            </a>
          </li>
          <li class="position-relative">
            <div class="hs-unfold position-static">
              <a class="js-hs-unfold-invoker nav-link">
                <img class="dropdown-item-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Flag_of_the_Republic_of_China.svg/32px-Flag_of_the_Republic_of_China.svg.png" alt="Taiwan Flag" />
                <span>台灣</span>
              </a>

              <div id="footerCountry" class="hs-unfold-content dropdown-menu dropdown-card dropdown-menu-md-right dropdown-menu-bottom w-100 w-sm-auto mb-0">
                <div class="card">
                  <div class="card-body">
                    <h5>Front available in</h5>

                    <div class="row">
                      <div class="col-6">
                        <a class="nav-link" href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/au.svg" alt="Australia Flag" />
                          Australia
                        </a>
                        <a class="nav-link" href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/at.svg" alt="Austria Flag" />
                          Austria
                        </a>
                        <a class="nav-link" href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/be.svg" alt="Belgium Flag" />
                          Belgium
                        </a>
                        <a class="nav-link" href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/ca.svg" alt="Canada Flag" />
                          Canada
                        </a>
                        <a class="nav-link" href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/dk.svg" alt="Denmark Flag" />
                          Denmark
                        </a>
                        <a class="nav-link" href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/fi.svg" alt="Finland Flag" />
                          Finland
                        </a>
                        <a class="nav-link" href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/fr.svg" alt="France Flag" />
                          France
                        </a>
                        <a class="nav-link" href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/de.svg" alt="Germany Flag" />
                          Germany
                        </a>
                        <a class="nav-link" href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/nl.svg" alt="Netherlands Flag" />
                          Netherlands
                        </a>
                      </div>

                      <div class="col-6">
                        <a class="nav-link" href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/nz.svg" alt="New Zealand Flag" />
                          New Zealand
                        </a>
                        <a class="nav-link" href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/no.svg" alt="Norway Flag" />
                          Norway
                        </a>
                        <a class="nav-link" href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/pt.svg" alt="PortugalPREVIEW Flag" />
                          Portugal
                        </a>
                        <a class="nav-link" href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/sg.svg" alt="Singapore Flag" />
                          Singapore
                        </a>
                        <a class="nav-link" href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/es.svg" alt="Spain Flag" />
                          Spain
                        </a>
                        <a class="nav-link" href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/se.svg" alt="Sweden Flag"/>
                          Sweden
                        </a>
                        <a class="nav-link" href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/ch.svg" alt="Switzerland Flag" />
                          Switzerland
                        </a>
                        <a class="nav-link" href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/gb.svg" alt="United Kingdom Flag" />
                          UK
                        </a>
                        <a class="nav-link active " href="#">
                          <img class="max-w-3rem mr-1" src="../../assets/vendor/flag-icon-css/flags/4x3/us.svg" alt="United States Flag" />
                          US
                        </a>
                      </div>
                    </div>
                  </div>
                  <a class="card-footer border-0 card-bg-light" href="#">
                    <span class="d-block text-muted mb-1">More countries coming soon.</span>
                    <span class="d-block font-size-1">Signup to get notified <i class="fas fa-angle-right fa-sm ml-1"></i></span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <hr class="my-0" />

    <div class="row align-items-md-center space-1">
      <div class="col-md-4 mb-4 mb-md-0">
        <ul class="list-inline mb-0">
          <li class="list-inline-item">
            <a class="btn btn-xs btn-icon btn-soft-secondary" href="#">
              <i class="fab fa-facebook-f"></i>
            </a>
          </li>
          <li class="list-inline-item">
            <a class="btn btn-xs btn-icon btn-soft-secondary" href="#">
              <i class="fab fa-google"></i>
            </a>
          </li>
          <li class="list-inline-item">
            <a class="btn btn-xs btn-icon btn-soft-secondary" href="#">
              <i class="fab fa-twitter"></i>
            </a>
          </li>
          <li class="list-inline-item">
            <a class="btn btn-xs btn-icon btn-soft-secondary" href="#">
              <i class="fab fa-github"></i>
            </a>
          </li>
        </ul> 
      </div>

      <div class="col-md-8 text-md-right">
        <ul class="nav nav-sm justify-content-md-end">
          <li class="nav-item">
            <a class="nav-link pl-0" href="../pages/privacy.html">隱私權 &amp; 政策</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../pages/terms.html">使用者 &amp; 條款</a>
          </li>
        </ul>
      </div>
    </div>
    </div>
  </footer>
)

function App() {
  return (
    <>
    <Header />
    <Footer />
    </>
  );
}

export default App;
