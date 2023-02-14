import React, { useEffect, useState, useContext } from "react";
import { fetchProducts } from "../../api/product";
import { ProductCard } from "../../components/Card";
import { CartContext } from "../../appContext";

function EnterpriseProduct() {
  const { prise, setprise } = useState(CartContext);
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

  console.log("entry enterprise page");
  return (
    <div className="container space-top-1 space-top-sm-2 mt-12">
      <div class="d-sm-flex align-items-center row mb-4">
        <h1 class="col h3 mb-0 text-gray-800">商品管理</h1>
        <a
          class="col-md-auto d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"
          data-toggle="modal"
          data-target="#exampleModal"
          data-whatever="@mdo"
        >
          <i class="fas fa-check"></i> 新增商品
        </a>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                上傳商品
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="input1">商品名稱</label>
                    <input
                      type="text"
                      class="form-control"
                      id="1"
                      placeholder="商品名稱"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputnumber">數量</label>
                    <input
                      type="number"
                      class="form-control"
                      id="inputnumber"
                      placeholder="數量"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlFile1">上傳照片</label>
                  <input
                    type="file"
                    class="form-control-file"
                    id="exampleFormControlFile1"
                  />
                </div>
                <div class="form-group">
                  <label for="inputvalue">價格</label>
                  <input
                    type="value"
                    class="form-control"
                    id="inputvalue"
                    placeholder="價格"
                  />
                </div>
                <div class="form-group">
                  <label for="inputtext">描述</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputtext"
                    placeholder="商品描述"
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputweight">重量</label>
                    <input
                      type="number"
                      class="form-control"
                      id="inputweight"
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="inputState">商品種類</label>
                    <select id="inputType" class="form-control">
                      <option selected>vegetables</option>
                      <option>rice</option>
                      <option>shippingfee</option>
                    </select>
                  </div>
                </div>
                <div class="form-group"></div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                關閉
              </button>
              <button type="button" class="btn btn-primary">
                新增
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-6 col-md-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    證書id
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    xxxxxxxxxxxxx
                  </div>

                  <a
                    href="#"
                    class="col-md-auto d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                  >
                    <i class="fas fa-download fa-sm text-white-50"></i> 上傳證書
                  </a>
                </div>
                <div class="col-auto">
                  <i class="fas fa-address-book fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-6 col-md-6 mb-4">
          <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                    碳權點數
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    100000
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div class="container py-5">
          <div class="row">
            <div class="col-md-8 col-lg-6 col-xl-4">
              <div class="card text-black">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/3.webp"
                  class="card-img-top"
                  alt="Apple Computer"
                />
                <div class="card-body">
                  <div class="text-center">
                    <h5 class="card-title">Name</h5>
                    <p class="text-muted mb-4">Description</p>
                  </div>
                  <div>
                    <div class="d-flex justify-content-between">
                      <span>Price</span>
                      <span>3999</span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span>Amount</span>
                      <span>3</span>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between total font-weight-bold mt-4">
                    <span>Carbon?</span>
                    <span>10kg</span>
                  </div>
                  <div class="d-flex justify-content-between total font-weight-bold mt-4">
                    <button type="button" class="btn btn-danger">
                      下架
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-8 col-lg-6 col-xl-4">
              <div class="card text-black">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp"
                  class="card-img-top"
                  alt="Apple Computer"
                />
                <div class="card-body">
                  <div class="text-center">
                    <h5 class="card-title">Name</h5>
                    <p class="text-muted mb-4">Description</p>
                  </div>
                  <div>
                    <div class="d-flex justify-content-between">
                      <span>Price</span>
                      <span>3999</span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span>Amount</span>
                      <span>3</span>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between total font-weight-bold mt-4">
                    <span>Carbon?</span>
                    <span>10kg</span>
                  </div>
                  <div class="d-flex justify-content-between total font-weight-bold mt-4">
                    <button type="button" class="btn btn-danger">
                      下架
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-8 col-lg-6 col-xl-4">
              <div class="card text-black">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp"
                  class="card-img-top"
                  alt="Apple Computer"
                />
                <div class="card-body">
                  <div class="text-center">
                    <h5 class="card-title">Name</h5>
                    <p class="text-muted mb-4">Description</p>
                  </div>
                  <div>
                    <div class="d-flex justify-content-between">
                      <span>Price</span>
                      <span>3999</span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span>Amount</span>
                      <span>3</span>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between total font-weight-bold mt-4">
                    <span>Carbon?</span>
                    <span>10kg</span>
                  </div>
                  <div class="d-flex justify-content-between total font-weight-bold mt-4">
                    <button type="button" class="btn btn-danger">
                      下架
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default React.memo(EnterpriseProduct);
