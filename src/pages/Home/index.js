import React, { useEffect, useState, useContext } from "react";
import { fetchProducts } from "../../api/product";
import { ProductCard } from "../../components/Card";
import { CartContext } from "../../appContext";

function Home(props) {
  const { cartState, cartDispatch } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleFetchProducts = async () => {
      const { items, offset } = await fetchProducts();
      if (Array.isArray(items)) {
        setProducts(items);
      }
    };
    handleFetchProducts();
  }, []);

  return (
    <main id="content" role="main">
      <div class="container space-top-lg-3 space-bottom-lg-2">
        <div class="row justify-content-lg-between align-items-lg-center">
          <div class="col-lg-5 order-lg-2 mb-9 mb-lg-0">
            <div class="mb-5">
              <h1>信賴溯源農產品</h1>
              <p>
                結合物聯網，將生產到運送的紀錄交由區塊鏈技術進行驗證，提高食品安全透明度。
              </p>
            </div>

            <h3 class="mb-3">下載到手機</h3>
            <a class="btn btn-icon btn-light rounded-circle mr-2" href="#">
              <i class="fab fa-apple"></i>
            </a>
            <a
              class="btn btn-icon btn-indigo rounded-circle"
              target="_blank"
              href="https://play.google.com/store/apps/details?id=com.agril&hl=zh_TW"
            >
              <i class="fab fa-google-play"></i>
            </a>
          </div>

          <div class="col-lg-6 order-lg-1">
            <div
              class="position-relative max-w-50rem mx-auto"
              data-aos="fade-up"
            >
              <div class="device device-iphone-x w-75 mx-auto">
                <img
                  class="device-iphone-x-frame"
                  src="/assets/svg/components/iphone-x.svg"
                  alt="Image Description"
                />
                <img
                  class="device-iphone-x-screen"
                  src="/assets/img/407x867/agchain1.png"
                  alt="Image Description"
                />
              </div>
              <div class="position-absolute bottom-0 right-0 max-w-50rem w-100 z-index-n1 mx-auto">
                <img
                  class="img-fluid"
                  src="/assets/svg/components/abstract-shapes-3.svg"
                  alt="Image Description"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-bottom">
        <div className="container space-2">
          <div className="row">
            <div className="col-md-4 mb-7 mb-md-0">
              <div className="media">
                <figure className="w-100 max-w-8rem mr-4">
                  <img
                    className="img-fluid"
                    src="/assets/svg/icons/icon-6.svg"
                    alt="SVG"
                  />
                </figure>
                <div className="media-body">
                  <h4 className="mb-1">線上購物</h4>
                  <p className="font-size-1 mb-0">方便的購物環境。</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-7 mb-md-0">
              <div className="media">
                <figure className="w-100 max-w-8rem mr-4">
                  <img
                    className="img-fluid"
                    src="/assets/svg/icons/icon-40.svg"
                    alt="SVG"
                  />
                </figure>
                <div className="media-body">
                  <h4 className="mb-1">生產履歷</h4>
                  <p className="font-size-1 mb-0">
                    提供田間紀錄、生產數據、有機檢驗、運輸狀況及農場介紹。
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="media">
                <figure className="w-100 max-w-8rem mr-4">
                  <img
                    className="img-fluid"
                    src="/assets/svg/icons/icon-65.svg"
                    alt="SVG"
                  />
                </figure>
                <div className="media-body">
                  <h4 className="mb-1">產地直送</h4>
                  <p className="font-size-1 mb-0">由當地農夫運送到指定地點。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container space-2 space-lg-3">
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          <h2>當季農產品</h2>
        </div>
        <div className="row mx-n2 mx-sm-n3 mb-3">
          {products.map(({ id, name, description, price, photo_url }) => (
            <div
              key={id}
              className="col-sm-6 col-lg-3 px-2 px-sm-3 mb-3 mb-sm-5"
            >
              <ProductCard
                key={id}
                title={name}
                description={description}
                price={price}
                img={photo_url}
                onAddToCart={() =>
                  cartDispatch((prev) => [
                    ...prev,
                    { id, name, price, img: photo_url },
                  ])
                }
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            className="btn btn-light btn-pill transition-3d-hover px-5"
            href="#"
          >
            敬請期待
          </a>
        </div>
      </div>
    </main>
  );
}

export default Home;
