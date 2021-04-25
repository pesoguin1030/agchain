import React from "react";
import { AuthContext, CartContext } from "../../appContext";
import { useEffect, useState, useContext } from "react";
import { fetchProducts } from "../../api/product";
import { ProductCard } from "../../components/Card";
import { getFarmList } from "../../api/farm";
import { event } from "jquery";

function Shop() {
  const [products, setProducts] = useState([]);
  const { cartState, cartDispatch } = useContext(CartContext);
  const [sidebar_farms, setSidebar_farm] = useState([]);
  const [initDisplay, setInitDisplay] = useState(true);
  const [ProductAndFarm, setProductAndFarm] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState([]);
  const [selectChecked, setSelectChecked] = useState(false);
  useEffect(() => {
    const handleFetchProducts = async () => {
      const { items, offset } = await fetchProducts();
      if (Array.isArray(items)) {
        setProducts(items);
      }
    };

    handleFetchProducts(cartState);
  }, []);
  useEffect(() => {
    (async () => {
      const data = await getFarmList();
      setProductAndFarm(data);
      setFarmNameList(data);
    })();
    return () => {};
  }, [selectedFarm]);

  const setFarmNameList = (data) => {
    if (Array.isArray(data)) {
      var farm_names = [];
      data.map((item) => {
        if (Object.values(item)[0] !== null) {
          farm_names.push(Object.values(item)[0]);
        }
      });
      farm_names = ((names) => names.filter((v, i) => names.indexOf(v) === i))(
        farm_names
      );
      setSidebar_farm(farm_names);
    }
  };

  const AddSelectProduct = (condition) => {
    const farm_name = condition.farm_name;
    var product_ids = ProductAndFarm.filter(function (el) {
      return Object.values(el) == farm_name;
    });
    product_ids = product_ids.map((obj) => {
      return parseInt(Object.keys(obj)[0], 10);
    });
    var new_array = products.filter(function (el) {
      return product_ids.includes(el.id);
    });
    setSelectedFarm((prev) => [...prev, ...new_array]);
  };
  const DeleteSelectProduct = (condition) => {
    const farm_name = condition.farm_name;
    var product_ids = ProductAndFarm.filter(function (el) {
      return Object.values(el) == farm_name;
    });
    product_ids = product_ids.map((obj) => {
      return parseInt(Object.keys(obj)[0], 10);
    });
    setSelectedFarm(selectedFarm.filter((e) => !product_ids.includes(e.id)));
    console.log("---", selectedFarm);
  };
  const handleCheck = (event, farm_name) => {
    if (event.target.checked) {
      AddSelectProduct({ farm_name });
      setInitDisplay(false);
    } else if (!event.target.checked) {
      DeleteSelectProduct({ farm_name });
      // setInitDisplay(true)
    }
  };
  const displayAll = (event) => {
    if (event.target.checked) {
      window.location.reload(false);
    } else {
      setInitDisplay(false);
    }
  };
  return (
    <div className="container space-2 space-lg-3 mt-10">
      <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
        <h2>農夫市集</h2>
      </div>
      <div className="row">
        <div className="col-lg-10">
          <div className="row mx-n2 mb-5">
            {initDisplay
              ? products.map(({ id, name, description, price, photo_url }) => (
                  <div className="col-sm-6 col-lg-3 px-2 px-sm-3 mb-3 mb-sm-5">
                    <ProductCard
                      key={id}
                      product_id={id}
                      title={name}
                      description={description}
                      price={price}
                      img={photo_url}
                      isInCart={
                        cartState
                          ? cartState.map((e) => e.id).includes(id)
                          : false
                      }
                      onRemoveFromCart={() =>
                        cartDispatch((prev) => prev.filter((e) => e.id !== id))
                      }
                      onAddToCart={() =>
                        cartDispatch((prev) => [
                          ...prev,
                          { id, name, price, img: photo_url },
                        ])
                      }
                    />
                  </div>
                ))
              : selectedFarm.map(
                  ({ id, name, description, price, photo_url }) => (
                    <div className="col-sm-6 col-lg-3 px-2 px-sm-3 mb-3 mb-sm-5">
                      <ProductCard
                        key={id}
                        product_id={id}
                        title={name}
                        description={description}
                        price={price}
                        img={photo_url}
                        isInCart={
                          cartState
                            ? cartState.map((e) => e.id).includes(id)
                            : false
                        }
                        onRemoveFromCart={(e) => {
                          e.stopPropagation();
                          cartDispatch((prev) =>
                            prev.filter((e) => e.id !== id)
                          );
                        }}
                        onAddToCart={(e) => {
                          console.log(e);
                          e.stopPropagation();
                          cartDispatch((prev) => [
                            ...prev,
                            { id, name, price, img: photo_url },
                          ]);
                        }}
                      />
                    </div>
                  )
                )}
          </div>
        </div>
        <div class="col-lg-2">
          <form>
            <div class="border-bottom pb-4 mb-4">
              <h3>農場</h3>
              <div class="form-group d-flex align-items-center justify-content-between font-size-1 text-lh-lg text-body mb-1">
                <div class="custom-control custom-checkbox ">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    onClick={(e) => {
                      displayAll(e);
                      // handleCheck(e, { item });
                    }}
                    id="all"
                    checked={initDisplay}
                  />
                  <label class="custom-control-label text-lh-lg" for="all">
                    全部
                  </label>
                </div>
                {/* <small>73</small> */}
              </div>
              {sidebar_farms.map((item) => {
                return (
                  <div class="form-group d-flex align-items-center justify-content-between font-size-1 text-lh-lg text-body mb-1">
                    <div class="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        onClick={(e) => {
                          handleCheck(e, item);
                        }}
                        id={item}
                      />
                      <label class="custom-control-label text-lh-lg" for={item}>
                        {item}
                      </label>
                    </div>
                    {/* <small>73</small> */}
                  </div>
                );
              })}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Shop;
