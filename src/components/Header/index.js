import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  ListGroup,
  Container,
  Row,
  Col,
  Modal,
  Button,
} from "react-bootstrap";
import {
  DropdownCard,
  DropdownItem,
  DropdownMenu,
  DropdownList,
} from "../Dropdown";
import { MegaMenu, MegaMenuItem } from "../MegaMenu";
import { SidebarFooter, Sidebar, SidebarContent } from "../Sidebar";
import { AuthContext, CartContext } from "../../appContext";
import * as firebase from "firebase";
import { oauthSignIn, emailSignIn } from "../../api/user";
import storage from "../../utils/storage";

const Header = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const { cartState, cartDispatch } = useContext(CartContext);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [editingShow, setEditingShow] = useState(false);
  const history = useHistory();

  const googleSignIn = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async ({ user }) => {
        try {
          const { access_token } = await oauthSignIn({
            provider: "google",
            name: user.displayName,
            oauthId: user.uid,
            email: user.email,
          });
          authDispatch({
            type: "LOGIN",
            user: user,
            accessToken: access_token,
          });
          setIsSidebarVisible(false);
        } catch (error) {
          console.error(error);
        }
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.error(error);
      });
  };

  const EditingWindow = ({ onHide, show, state }) => (
    <Modal
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      {...{ onHide, show }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          請選擇商品用途
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Link
          className="btn btn-xs btn-primary btn-block btn-pill transition-3d-hover"
          to="/shop/diffCart"
          onClick={onHide}
        >
          送禮
        </Link>
        <Link
          className="btn btn-xs btn-primary btn-block btn-pill transition-3d-hover"
          to="/shop/cart"
          onClick={onHide}
        >
          自用
        </Link>
      </Modal.Footer>
    </Modal>
  );

  const defaultSignIn = async (e) => {
    e.preventDefault();
    try {
      const { access_token } = await emailSignIn({
        username,
        password,
      });
      authDispatch({
        type: "LOGIN",
        user: {
          name: username,
        },
        accessToken: access_token,
      });
      console.log(access_token);
      setIsSidebarVisible(false);
    } catch (error) {
      alert("帳號或密碼有誤");
      console.error(error);
    }
  };

  return (
    <>
      <header id="header" className="header sticky">
        <div className="header-section">
          <div className="container header-hide-content pt-2">
            <div className="d-flex align-items-center">
              {/*  Language */}

              <DropdownMenu title="語言">
                <DropdownList
                  style={{
                    zIndex: 999,
                    pointerEvents: "auto",
                  }}
                >
                  <DropdownItem>繁體中文</DropdownItem>
                </DropdownList>
              </DropdownMenu>
              <div className="ml-auto">
                {/* Jump to */}
                <DropdownMenu className="d-sm-none mr-2" title="跳轉">
                  <DropdownList
                    style={{
                      zIndex: 999,
                      pointerEvents: "auto",
                    }}
                  >
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
                    <a
                      className="btn btn-xs btn-icon btn-ghost-secondary"
                      href="#"
                    >
                      <i className="fas fa-search" />
                    </a>
                  </div>
                </li>
                {/* Shopping Cart */}
                <li className="list-inline-item">
                  <DropdownMenu
                    icon={<FontAwesomeIcon icon={faShoppingCart} />}
                  >
                    <DropdownCard
                      position="right"
                      style={{
                        pointerEvents: "auto",
                        minWidth: 275,
                        textAlign: "center",
                      }}
                    >
                      <Card style={{ width: "18rem" }}>
                        <Card.Body>
                          {!cartState || cartState.length === 0 ? (
                            <div
                              style={{
                                zIndex: 999,
                                minWidth: 150,
                                textAlign: "center",
                              }}
                            >
                              <figure className="max-w-9rem mx-auto mb-3">
                                <img
                                  className="img-fluid"
                                  src="/assets/svg/illustrations/empty-cart.svg"
                                  alt="SVG"
                                />
                              </figure>
                              <span className="d-block">你的購物車是空的</span>
                            </div>
                          ) : (
                            <ListGroup variant="flush">
                              {cartState.map(
                                (
                                  { id, name, price, carbon_amount, img },
                                  index
                                ) => (
                                  <ListGroup.Item key={index}>
                                    <Container>
                                      <Row>
                                        <Col
                                          className="my-auto"
                                          sm={2}
                                          style={{
                                            padding: 0,
                                          }}
                                        >
                                          <img
                                            style={{
                                              width: 24,
                                              height: "auto",
                                              objectFit: "fill",
                                            }}
                                            className="img-fluid"
                                            src={img}
                                            alt="SVG"
                                          />
                                        </Col>
                                        <Col sm={8} className="my-auto">
                                          <span>
                                            {`${name} `}
                                            <small>
                                              <strong className="text-dark">{`$${price}`}</strong>
                                            </small>
                                            <br />
                                            <small>
                                              <strong className="text-dark">{`${
                                                carbon_amount
                                                  ? carbon_amount
                                                  : 0
                                              } 點`}</strong>
                                            </small>
                                          </span>
                                        </Col>
                                        <Col
                                          sm={2}
                                          className="my-auto"
                                          style={{
                                            padding: 0,
                                          }}
                                        >
                                          <a
                                            className="btn btn-icon btn-ghost-secondary"
                                            onClick={() =>
                                              cartDispatch((prev) =>
                                                prev.filter(
                                                  (el) => el.id !== id
                                                )
                                              )
                                            }
                                          >
                                            <i className="fas fa-trash" />
                                          </a>
                                        </Col>
                                      </Row>
                                    </Container>
                                  </ListGroup.Item>
                                )
                              )}
                            </ListGroup>
                          )}
                        </Card.Body>
                        <Card.Footer>
                          <Container>
                            <Row>
                              <Col>{/*<small>當地直送免費</small>*/}</Col>
                              {cartState && cartState.length > 0 ? (
                                <Col>
                                  <button
                                    to="/shop/cart"
                                    className="btn btn-xs btn-primary btn-block btn-pill transition-3d-hover"
                                    onClick={() => {
                                      // setEditingShow(true)
                                      history.push({
                                        pathname: "/shop/cart",
                                      });
                                    }}
                                  >
                                    前往結帳
                                  </button>
                                </Col>
                              ) : null}
                            </Row>
                          </Container>
                        </Card.Footer>
                      </Card>
                    </DropdownCard>
                  </DropdownMenu>
                </li>
                {editingShow && (
                  <EditingWindow /** 編輯視窗 */
                    show={editingShow}
                    onHide={() => setEditingShow(false)}
                    state="editing"
                  />
                )}
                {/* Account */}
                <li className="list-inline-item">
                  <div className="hs-unfold">
                    {authState.user ? (
                      <DropdownMenu title={authState.user.name}>
                        <DropdownList
                          style={{
                            zIndex: 999,
                            pointerEvents: "auto",
                          }}
                        >
                          <DropdownItem>
                            <i className="fas fa-user-circle" />
                          </DropdownItem>
                          <DropdownItem href="/user/account/info">
                            帳戶資訊
                          </DropdownItem>
                          <DropdownItem href="/order">我的訂單</DropdownItem>
                          <DropdownItem
                            onClick={() =>
                              authDispatch({
                                type: "LOGOUT",
                              })
                            }
                          >
                            登出
                          </DropdownItem>
                        </DropdownList>
                      </DropdownMenu>
                    ) : (
                      <a
                        className="btn btn-xs btn-ghost-secondary"
                        onClick={() => setIsSidebarVisible(true)}
                      >
                        <span>註冊會員</span>
                        <i className="fas fa-user-circle" />
                      </a>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="container">
            <nav className="js-mega-menu navbar navbar-expand-lg">
              {/* Logo */}
              <a href="/">
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
                      選購商品
                    </Link>
                  </li>
                  <MegaMenu title="企業">
                    <MegaMenuItem
                      icon={`${process.env.PUBLIC_URL}/assets/svg/icons/icon-29.svg`}
                      to="/enterprise/product"
                      title="商品管理"
                    />
                    <MegaMenuItem
                      icon={`${process.env.PUBLIC_URL}/assets/svg/icons/icon-19.svg`}
                      to="/enterprise/store"
                      title="商店管理"
                    />
                    <MegaMenuItem
                      icon={`${process.env.PUBLIC_URL}/assets/svg/icons/icon-18.svg`}
                      to="/enterprise/acquire"
                      title="收購碳權"
                    />
                  </MegaMenu>
                  <MegaMenu title="區塊鏈服務">
                    <MegaMenuItem
                      icon={`${process.env.PUBLIC_URL}/assets/svg/icons/icon-54.svg`}
                      to="/carbon/external"
                      title="開通外部平臺"
                    />
                    <MegaMenuItem
                      icon={`${process.env.PUBLIC_URL}/assets/svg/icons/icon-59.svg`}
                      to="/carbon/wallet"
                      title="碳權存摺"
                    />
                    <MegaMenuItem
                      icon={`${process.env.PUBLIC_URL}/assets/svg/icons/icon-48.svg`}
                      to="/carbon/nft"
                      title="碳權證書"
                    />
                  </MegaMenu>
                  <li className="navbar-nav-last-item">
                    <Link
                      // to="/admin"
                      to="/login"
                      className="btn btn-sm btn-primary transition-3d-hover"
                    >
                      開始使用
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          {/* <hr class="hr-text" /> */}
        </div>
      </header>
      <Sidebar
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
      >
        <SidebarContent>
          {false ? ( //(storage.getAccessToken)
            <h1> {authState.user} </h1>
          ) : (
            <div>
              <div
                id="login"
                data-hs-show-animation-target-group="idForm"
                style={{
                  animationDuration: "400ms",
                }}
              >
                <div className="text-center mb-7">
                  <h3 className="mb-0">會員登入</h3>
                  <p>登入以使用功能</p>
                </div>
                <form>
                  <div className="js-form-message mb-4">
                    <label className="input-label">電子信箱</label>
                    <div className="input-group input-group-sm mb-2">
                      <input
                        type="email"
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        className="form-control"
                        name="email"
                        id="signinEmail"
                        placeholder="Email"
                        aria-label="Email"
                        required=""
                        data-msg="Please enter a valid email address."
                      />
                    </div>
                  </div>
                  <div className="js-form-message mb-3">
                    <label className="input-label">密碼</label>
                    <div className="input-group input-group-sm mb-2">
                      <input
                        type="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        className="form-control"
                        name="password"
                        id="signinPassword"
                        placeholder="Password"
                        aria-label="Password"
                        required=""
                        data-msg="Your password is invalid. Please try again."
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-4">
                    <a
                      className="js-animation-link small link-underline"
                      data-hs-show-animation-options='{
                         "targetSelector": "#forgotPassword",
                         "groupName": "idForm",
                         "animationType": "css-animation",
                         "animationIn": "slideInUp",
                         "duration": 400
                      //  }'
                      data-hs-show-animation-link-group="idForm"
                    >
                      忘記密碼？
                    </a>
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      onClick={defaultSignIn}
                      className="btn btn-sm btn-primary btn-block"
                    >
                      登入
                    </button>
                  </div>
                </form>
                <div className="text-center mb-3">
                  <span className="divider divider-xs divider-text">或是</span>
                </div>
                <a
                  className="btn btn-sm btn-ghost-secondary btn-block mb-2"
                  onClick={googleSignIn}
                >
                  <span className="d-flex justify-content-center align-items-center">
                    <img
                      className="mr-2"
                      src="/assets/img/160x160/img17.png"
                      alt="Image Description"
                      width="14"
                      height="14"
                    />
                    使用Google帳號
                  </span>
                </a>
                <div className="text-center">
                  <span className="small text-muted">還不是會員？</span>
                  <a
                    className="js-animation-link small font-weight-bold"
                    href="signup"
                    data-hs-show-animation-options='{
                         "targetSelector": "#signup",
                         "groupName": "idForm",
                         "animationType": "css-animation",
                         "animationIn": "slideInUp",
                         "duration": 400
                       }'
                    data-hs-show-animation-link-group="idForm"
                  >
                    註冊
                  </a>
                </div>
              </div>
              <div
                id="signup"
                style={{
                  display: "none",
                  opacity: 0,
                  animationDuration: "400ms",
                }}
                data-hs-show-animation-target-group="idForm"
              >
                <div className="text-center mb-7">
                  <h3 className="mb-0">Create your account</h3>
                  <p>Fill out the form to get started.</p>
                </div>
                <div className="js-form-message mb-4">
                  <label className="input-label">Email</label>
                  <div className="input-group input-group-sm mb-2">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="signupEmail"
                      placeholder="Email"
                      aria-label="Email"
                      required=""
                      data-msg="Please enter a valid email address."
                    />
                  </div>
                </div>
                <div className="js-form-message mb-4">
                  <label className="input-label">Password</label>
                  <div className="input-group input-group-sm mb-2">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="signupPassword"
                      placeholder="Password"
                      aria-label="Password"
                      required=""
                      data-msg="Your password is invalid. Please try again."
                    />
                  </div>
                </div>
                <div className="js-form-message mb-4">
                  <label className="input-label">Confirm Password</label>
                  <div className="input-group input-group-sm mb-2">
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      id="signupConfirmPassword"
                      placeholder="Confirm Password"
                      aria-label="Confirm Password"
                      required=""
                      data-msg="Password does not match the confirm password."
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary btn-block"
                  >
                    Sign Up
                  </button>
                </div>

                <div className="text-center mb-3">
                  <span className="divider divider-xs divider-text">OR</span>
                </div>

                <a
                  className="btn btn-sm btn-ghost-secondary btn-block mb-2"
                  href="#"
                >
                  <span className="d-flex justify-content-center align-items-center">
                    <img
                      className="mr-2"
                      src="/assets/img/160x160/img17.png"
                      alt="Image Description"
                      width="14"
                      height="14"
                    />
                    Sign Up with Google
                  </span>
                </a>

                <div className="text-center">
                  <span className="small text-muted">
                    Already have an account?
                  </span>
                  <a
                    className="js-animation-link small font-weight-bold"
                    data-hs-show-animation-options='{
                         "targetSelector": "#login",
                         "groupName": "idForm",
                         "animationType": "css-animation",
                         "animationIn": "slideInUp",
                         "duration": 400
                       }'
                    data-hs-show-animation-link-group="idForm"
                  >
                    Sign In
                  </a>
                </div>
              </div>
              <div
                id="forgotPassword"
                style={{
                  display: "none",
                  opacity: 0,
                  animationuration: "400ms",
                }}
                data-hs-show-animation-target-group="idForm"
              >
                <div className="text-center mb-7">
                  <h3 className="mb-0">Recover password</h3>
                  <p>Instructions will be sent to you.</p>
                </div>
                <div className="js-form-message">
                  <label className="sr-only">Your email</label>
                  <div className="input-group input-group-sm mb-2">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="recoverEmail"
                      placeholder="Your email"
                      aria-label="Your email"
                      required=""
                      data-msg="Please enter a valid email address."
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary btn-block"
                  >
                    Recover Password
                  </button>
                </div>
                <div className="text-center mb-4">
                  <span className="small text-muted">
                    Remember your password?
                  </span>
                  <a
                    className="js-animation-link small font-weight-bold"
                    data-hs-show-animation-options='{
                         "targetSelector": "#login",
                         "groupName": "idForm",
                         "animationType": "css-animation",
                         "animationIn": "slideInUp",
                         "duration": 400
                       }'
                    data-hs-show-animation-link-group="idForm"
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
          )}
        </SidebarContent>
        <SidebarFooter>
          <ul className="nav nav-sm">
            <li className="nav-item">
              <a className="nav-link pl-0" href="#">
                隱私權保護政策
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                使用條款
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-info-circle la-lg"></i>
              </a>
            </li>
          </ul>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default Header;
