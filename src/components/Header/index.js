import React, { useState, useContext } from "react";
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
import  { SidebarFooter, Sidebar, SidebarContent } from "../Sidebar";
import { AuthContext } from "../../appContext";
import * as firebase from "firebase";
import { oauthSignIn, emailSignIn } from "../../api/user";


const Header= () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const [isSidebarVisible, setIsSidebarVisible]=useState(false)
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

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
          setIsSidebarVisible(false)
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

  const defaultSignIn = async () => {
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
      setIsSidebarVisible(false)
    } catch (error) {
      console.error(error);
    }
  };


  return <>
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
                <a
                  className="btn btn-xs btn-ghost-secondary"
                  onClick={()=>setIsSidebarVisible(true)}
                >
                  <i className="fas fa-user-circle"/>
                  {authState.user?<span style={{
                    marginLeft: "0.375rem"
                  }}>{authState.user}</span>:null}
                </a>
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
  <Sidebar 
    isVisible={isSidebarVisible}
    onClose={()=>setIsSidebarVisible(false)}
  >
    <SidebarContent>
    <form className="js-validate" novalidate="novalidate">
                <div id="login" data-hs-show-animation-target-group="idForm" style={{
                    animationDuration: "400ms"
                  }}>
                  <div className="text-center mb-7">
                    <h3 className="mb-0">會員登入</h3>
                    <p>登入以使用功能</p>
                  </div>
                  <div className="js-form-message mb-4">
                    <label className="input-label">電子信箱</label>
                    <div className="input-group input-group-sm mb-2">
                      <input type="email" onChange={setUsername} className="form-control" name="email" id="signinEmail" placeholder="Email" aria-label="Email" required="" data-msg="Please enter a valid email address." />
                    </div>
                  </div>
                  <div className="js-form-message mb-3">
                    <label className="input-label">密碼</label>
                    <div className="input-group input-group-sm mb-2">
                      <input type="password" onChange={setPassword} className="form-control" name="password" id="signinPassword" placeholder="Password" aria-label="Password" required="" data-msg="Your password is invalid. Please try again." />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-4">
                    <a className="js-animation-link small link-underline" href="javascript:;" data-hs-show-animation-options="{
                         &quot;targetSelector&quot;: &quot;#forgotPassword&quot;,
                         &quot;groupName&quot;: &quot;idForm&quot;,
                         &quot;animationType&quot;: &quot;css-animation&quot;,
                         &quot;animationIn&quot;: &quot;slideInUp&quot;,
                         &quot;duration&quot;: 400
                      //  }" data-hs-show-animation-link-group="idForm">忘記密碼？</a>
                  </div>
                  <div className="mb-3">
                    <button onClick={defaultSignIn} className="btn btn-sm btn-primary btn-block">登入</button>
                  </div>
                  <div className="text-center mb-3">
                    <span className="divider divider-xs divider-text">或是</span>
                  </div>
                  <a className="btn btn-sm btn-ghost-secondary btn-block mb-2" onClick={googleSignIn}>
                    <span className="d-flex justify-content-center align-items-center">
                      <img className="mr-2" src="/assets/img/160x160/img17.png" alt="Image Description" width="14" height="14" />
                      使用Google帳號
                    </span>
                  </a>
                  <div className="text-center">
                    <span className="small text-muted">還不是會員？</span>
                    <a className="js-animation-link small font-weight-bold" href="javascript:;" data-hs-show-animation-options="{
                         &quot;targetSelector&quot;: &quot;#signup&quot;,
                         &quot;groupName&quot;: &quot;idForm&quot;,
                         &quot;animationType&quot;: &quot;css-animation&quot;,
                         &quot;animationIn&quot;: &quot;slideInUp&quot;,
                         &quot;duration&quot;: 400
                       }" data-hs-show-animation-link-group="idForm">註冊
                    </a>
                  </div>
                </div>
                <div id="signup" style={{
                   display: "none",
                   opacity: 0,
                   animationDuration: "400ms"
                  }} data-hs-show-animation-target-group="idForm">
                  <div className="text-center mb-7">
                    <h3 className="mb-0">Create your account</h3>
                    <p>Fill out the form to get started.</p>
                  </div>
                  <div className="js-form-message mb-4">
                    <label className="input-label">Email</label>
                    <div className="input-group input-group-sm mb-2">
                      <input type="email" className="form-control" name="email" id="signupEmail" placeholder="Email" aria-label="Email" required="" data-msg="Please enter a valid email address." />
                    </div>
                  </div>
                  <div className="js-form-message mb-4">
                    <label className="input-label">Password</label>
                    <div className="input-group input-group-sm mb-2">
                      <input type="password" className="form-control" name="password" id="signupPassword" placeholder="Password" aria-label="Password" required="" data-msg="Your password is invalid. Please try again." />
                    </div>
                  </div>
                  <div className="js-form-message mb-4">
                    <label className="input-label">Confirm Password</label>
                    <div className="input-group input-group-sm mb-2">
                      <input type="password" className="form-control" name="confirmPassword" id="signupConfirmPassword" placeholder="Confirm Password" aria-label="Confirm Password" required="" data-msg="Password does not match the confirm password." />
                    </div>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-sm btn-primary btn-block">Sign Up</button>
                  </div>

                  <div className="text-center mb-3">
                    <span className="divider divider-xs divider-text">OR</span>
                  </div>

                  <a className="btn btn-sm btn-ghost-secondary btn-block mb-2" href="#">
                    <span className="d-flex justify-content-center align-items-center">
                      <img className="mr-2" src="/assets/img/160x160/img17.png" alt="Image Description" width="14" height="14" />
                      Sign Up with Google
                    </span>
                  </a>

                  <div className="text-center">
                    <span className="small text-muted">Already have an account?</span>
                    <a className="js-animation-link small font-weight-bold" href="javascript:;" data-hs-show-animation-options="{
                         &quot;targetSelector&quot;: &quot;#login&quot;,
                         &quot;groupName&quot;: &quot;idForm&quot;,
                         &quot;animationType&quot;: &quot;css-animation&quot;,
                         &quot;animationIn&quot;: &quot;slideInUp&quot;,
                         &quot;duration&quot;: 400
                       }" data-hs-show-animation-link-group="idForm">Sign In
                    </a>
                  </div>
                </div>
                <div id="forgotPassword" style={{
                  display: "none",
                  opacity: 0,
                  animationuration: "400ms"}} 
                  data-hs-show-animation-target-group="idForm">
                  <div className="text-center mb-7">
                    <h3 className="mb-0">Recover password</h3>
                    <p>Instructions will be sent to you.</p>
                  </div>
                  <div className="js-form-message">
                    <label className="sr-only" for="recoverEmail">Your email</label>
                    <div className="input-group input-group-sm mb-2">
                      <input type="email" className="form-control" name="email" id="recoverEmail" placeholder="Your email" aria-label="Your email" required="" data-msg="Please enter a valid email address." />
                    </div>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-sm btn-primary btn-block">Recover Password</button>
                  </div>
                  <div className="text-center mb-4">
                    <span className="small text-muted">Remember your password?</span>
                    <a className="js-animation-link small font-weight-bold" href="javascript:;" data-hs-show-animation-options="{
                         &quot;targetSelector&quot;: &quot;#login&quot;,
                         &quot;groupName&quot;: &quot;idForm&quot;,
                         &quot;animationType&quot;: &quot;css-animation&quot;,
                         &quot;animationIn&quot;: &quot;slideInUp&quot;,
                         &quot;duration&quot;: 400
                       }" data-hs-show-animation-link-group="idForm">Login
                    </a>
                  </div>
                </div>
              </form>
    </SidebarContent>
    <SidebarFooter>
    <ul className="nav nav-sm">
            <li className="nav-item">
              <a className="nav-link pl-0" href="#">隱私權保護政策</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">使用條款</a>
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
}

export default Header;
