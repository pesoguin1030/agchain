import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { AuthContext, CartContext } from "../../appContext";
import { useEffect, useState, useContext } from "react";
import { ProductDetail, FarmInfo } from "../../api/product";
import { ProductCard } from "../../components/Card";
import Header from "../../components/Header";

function SingleProduct() {
  const { id } = useParams(); // main KEY in url
  const { cartState, cartDispatch } = useContext(CartContext);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [description, setDescription] = useState();
  const [farmName, setFarmName] = useState();
  const [farmIntro, setFarmIntro] = useState("");
  const [farmAddress, setFarmAddress] = useState();
  const [farmPhone, setFarmPhone] = useState();
  const [farmPic, setFarmPic] = useState([]);
  const [isInCart, setIsInCart] = useState(
    cartState ? cartState.map((e) => e.id).includes(id) : false
  );
  useEffect(() => {
    PreLoadData();
    return () => {};
  }, [cartState]);
  const PreLoadData = async () => {
    const data = await ProductDetail(id);
    const farm_data = await FarmInfo(id);
    console.log(farm_data);
    setName(data["name"]);
    setPrice(data["price"]);
    setImgUrl(data["photo_url"]);
    setDescription(data["description"]);
    //farm data
    setFarmName("農場資訊");
    setFarmIntro(farm_data["farm_intro"]);
    setFarmAddress(farm_data["farm_address"]);
    setFarmPhone(farm_data["farm_phone"]);
    setFarmPic(getPropertyByRegex(farm_data, "farm_picture|[1-9]"));

    setIsInCart(cartState ? cartState.map((e) => e.id).includes(id) : false);
  };

  function getPropertyByRegex(obj, propName) {
    var re = new RegExp("^" + propName + "(\\[\\d*\\])?$"),
      key;
    var objs = [];
    for (key in obj) if (re.test(key) && obj[key] != null) objs.push(obj[key]);
    console.log(objs);
    return objs;
  }
  const AddToCart = () => {
    setIsInCart(true);
    alert("hi");
  };
  return (
    <div class="row">
      {/* <h1>{id}</h1> */}
      <div class="col-lg-7 mb-7 mb-lg-0">
        <div class="pr-lg-4">
          <div class="position-relative">
            <div className="js-slide">
              <img
                class="img-fluid w-100 rounded"
                src={imgUrl}
                alt="Image Description"
              />
            </div>
            {/* <div
              id="heroSlider"
              className="js-slick-carousel slick border rounded"
              data-hs-slick-carousel-options='{
                            "prevArrow": "<span class=\"fas fa-arrow-left slick-arrow slick-arrow-primary-white slick-arrow-left slick-arrow-centered-y shadow-soft rounded-circle ml-n3 ml-sm-2 ml-xl-4\"></span>",
                            "nextArrow": "<span class=\"fas fa-arrow-right slick-arrow slick-arrow-primary-white slick-arrow-right slick-arrow-centered-y shadow-soft rounded-circle mr-n3 mr-sm-2 mr-xl-4\"></span>",
                            "fade": true,
                            "infinite": true,
                            "autoplay": true,
                            "autoplaySpeed": 7000,
                            "asNavFor": "#heroSliderNav"
                        }'
            >
              <div className="js-slide">
                <img
                  class="img-fluid w-100 rounded"
                  src="../../assets/img/600x600/img1.jpg"
                  alt="Image Description"
                />
              </div>
              <div class="js-slide">
                <img
                  class="img-fluid w-100 rounded"
                  src="../../assets/img/600x600/img2.jpg"
                  alt="Image Description"
                />
              </div>
              <div class="js-slide">
                <img
                  class="img-fluid w-100 rounded"
                  src="../../assets/img/600x600/img3.jpg"
                  alt="Image Description"
                />
              </div>
            </div> 
            <div class="position-absolute bottom-0 right-0 left-0 px-4 py-3">
              <div
                id="heroSliderNav"
                class="js-slick-carousel slick slick-gutters-1 slick-transform-off max-w-27rem mx-auto"
                data-hs-slick-carousel-options='{
                            "infinite": true,
                            "autoplaySpeed": 7000,
                            "slidesToShow": 3,
                            "isThumbs": true,
                            "isThumbsProgress": true,
                            "thumbsProgressOptions": {
                                "color": "#377dff",
                                "width": 8
                            },
                            "thumbsProgressContainer": ".js-slick-thumb-progress",
                            "asNavFor": "#heroSlider"
                            }'
              >
                <div class="js-slide p-1">
                  <a
                    class="js-slick-thumb-progress d-block avatar avatar-circle border p-1"
                    href="javascript:;"
                  >
                    <img
                      class="avatar-img"
                      src="../../assets/img/100x100/img16.jpg"
                      alt="Image Description"
                    />
                  </a>
                </div>
                <div class="js-slide p-1">
                  <a
                    class="js-slick-thumb-progress d-block avatar avatar-circle border p-1"
                    href="javascript:;"
                  >
                    <img
                      class="avatar-img"
                      src="../../assets/img/100x100/img17.jpg"
                      alt="Image Description"
                    />
                  </a>
                </div>
                <div class="js-slide p-1">
                  <a
                    class="js-slick-thumb-progress d-block avatar avatar-circle border p-1"
                    href="javascript:;"
                  >
                    <img
                      class="avatar-img"
                      src="../../assets/img/100x100/img18.jpg"
                      alt="Image Description"
                    />
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div class="col-lg-5" style={{ marginTop: "50px" }}>
        <div class="d-flex align-items-center small mb-2">
          <div class="text-warning mr-2">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
        </div>
        <div class="mb-5">
          <h1 class="h2">{name}</h1>
          <p>{description}</p>
        </div>

        <div class="mb-5">
          <h2 class="font-size-1 text-body mb-0">價格:</h2>
          <span class="text-dark font-size-2 font-weight-bold">{price}</span>
          {/* <span class="text-body ml-2">
            <del>1000</del>
          </span> */}
        </div>

        {/* <div class="border rounded py-2 px-3 mb-3">
          <div class="js-quantity-counter row align-items-center">
            <div class="col-7">
              <small class="d-block text-body font-weight-bold">
                Select quantity
              </small>
              <input
                class="js-result form-control h-auto border-0 rounded p-0"
                type="text"
                value="1"
              />
            </div>
            <div class="col-5 text-right">
              <button
                class="js-minus btn btn-xs btn-icon btn-outline-secondary rounded-circle"
                onClick={() => {
                  DecreaseAmount();
                }}
              >
                <i class="fas fa-minus"></i>
              </button>
              <button
                class="js-plus btn btn-xs btn-icon btn-outline-secondary rounded-circle"
                onClick={() => {
                  IncreaseAmount();
                }}
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div> */}

        <div id="shopCartAccordion" class="accordion mb-5">
          <div class="card border shadow-none">
            <div class="card-body card-collapse" id="shopCardHeadingOne">
              <a
                class="btn btn-link btn-block card-btn collapsed"
                href="javascript:;"
                role="button"
                data-toggle="collapse"
                data-target="#shopCardOne"
                aria-expanded="false"
                aria-controls="shopCardOne"
              >
                <span class="row align-items-center">
                  <span class="col-9">
                    <span class="media align-items-center">
                      <span class="w-100 max-w-6rem mr-3">
                        <img
                          class="img-fluid"
                          src="../../assets/svg/icons/icon-65.svg"
                          alt="SVG"
                        />
                      </span>
                      <span class="media-body">
                        <span class="d-block font-size-1 font-weight-bold">
                          免運費
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </a>
            </div>
          </div>
          <div class="card border shadow-none">
            <div class="card-body card-collapse" id="shopCardHeadingTwo">
              <a
                class="btn btn-link btn-block card-btn collapsed"
                href="javascript:;"
                role="button"
                data-toggle="collapse"
                data-target="#shopCardTwo"
                aria-expanded="false"
                aria-controls="shopCardTwo"
              >
                <span class="row align-items-center">
                  <span class="col-9">
                    <span class="media align-items-center">
                      <span class="w-100 max-w-6rem mr-3">
                        <img
                          class="img-fluid"
                          src="../../assets/svg/icons/icon-64.svg"
                          alt="SVG"
                        />
                      </span>
                      <span class="media-body">
                        <span class="d-block font-size-1 font-weight-bold">
                          7 天內可退換貨
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </a>
            </div>
            <div
              id="shopCardTwo"
              class="collapse"
              aria-labelledby="shopCardHeadingTwo"
              data-parent="#shopCartAccordion"
            >
              <div class="card-body">
                <p class="small mb-0">
                  If you're not satisfied, return it for a full refund. We'll
                  take care of disassembly and return shipping.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-4">
          {/* <button
            type="button"
            class="btn btn-block btn-primary btn-pill transition-3d-hover"
            disabled={isInCart}
            onClick={() => {
              AddToCart();
            }}
          >
            新增至購物車
          </button> */}
          {isInCart ? (
            <button
              type="button"
              onClick={() => {
                cartDispatch((prev) => prev.filter((e) => e.id !== id));
                setIsInCart(false);
              }}
              className="btn btn-block btn-outline-secondary btn-pill transition-3d-hover"
            >
              從購物車中移除
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                cartDispatch((prev) => [
                  ...prev,
                  { id, name, price, img: imgUrl },
                ]);
                setIsInCart(true);
              }}
              className="btn btn-block btn-outline-primary btn-pill transition-3d-hover"
            >
              加入購物車
            </button>
          )}
        </div>
      </div>
      <div className="container space-top-2 space-lg-3">
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          <h2>{farmName}</h2>
        </div>
        <div className="row">
          <div className="col-md-6 px-sm-3 mb-4 px-3">
            {farmPic.map((pic, index) => {
              return <img src={pic} className="responsive-img" key={index} />;
            })}
          </div>
          <div className="col-md-6 px-sm-3 mb-5 px-5">
            <p style={{ letterSpacing: "0.2rem" }}>{farmIntro}</p>
            <ul
              style={{
                listStyleType: "none",
                paddingLeft: 0,
                textAlign: "left",
              }}
            >
              <li className="mt-1">
                <i className="fas fa-map-marked"></i>
                <a
                  target="_blank"
                  href={`http://maps.google.com/?q=${farmIntro?.farmAddress}`}
                  className="mx-2"
                >
                  {farmAddress}
                </a>
              </li>
              <li className="mt-1">
                <i className="fas fa-phone" style={{ width: 18 }}></i>
                <a target="_blank" href={`tel:${farmPhone}`} className="mx-2">
                  {farmPhone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
