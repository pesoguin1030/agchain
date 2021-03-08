"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getDestinations = getDestinations;
exports.getPressLikeNum = getPressLikeNum;
exports.getAllShoppingInfo = getAllShoppingInfo;
exports.getOrderItem = exports.getOrder = exports.createGiftOrder = exports.createOrder = void 0;

var _request = _interopRequireDefault(require("../utils/request"));

var _constants = _interopRequireDefault(require("./constants"));

var _storage = _interopRequireDefault(require("../utils/storage"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var createOrder = function createOrder(orders, userToken) {
  var response;
  return regeneratorRuntime.async(
    function createOrder$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(
              _request["default"].post(
                "".concat(_constants["default"].SERVER_URL, "/orders/newebpay"),
                orders,
                {
                  headers: {
                    Authorization: "Bearer ".concat(userToken),
                  },
                }
              )
            );

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", Promise.reject(_context.t0));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    },
    null,
    null,
    [[0, 7]]
  );
};

exports.createOrder = createOrder;

var createGiftOrder = function createGiftOrder(orders, userToken) {
  var response;
  return regeneratorRuntime.async(
    function createGiftOrder$(_context2) {
      while (1) {
        switch ((_context2.prev = _context2.next)) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(
              _request["default"].post(
                _constants["default"].SERVER_URL + "/orders/giftorder",
                orders,
                {
                  headers: {
                    Authorization: "Bearer ".concat(userToken),
                  },
                }
              )
            );

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", Promise.reject(_context2.t0));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    },
    null,
    null,
    [[0, 7]]
  );
};

exports.createGiftOrder = createGiftOrder;

var getOrder = function getOrder(userToken) {
  var translate_state,
    translate_order_type,
    gift_video_url,
    response,
    items,
    orderNumber,
    temp,
    i,
    state,
    type,
    video_url;
  return regeneratorRuntime.async(
    function getOrder$(_context3) {
      while (1) {
        switch ((_context3.prev = _context3.next)) {
          case 0:
            translate_state = function translate_state(state) {
              switch (state) {
                case "unpaid":
                  return "尚未付款";

                case "delivering":
                  return "運送中";

                case "paid":
                  return "已付款";

                case "new":
                  return "已付款";

                case "arrived":
                  return "已送達";

                case "close":
                  return "-";
              }
            };

            translate_order_type = function translate_order_type(type) {
              switch (type) {
                case "common":
                  return "";

                case "gift":
                  return "修改/上傳";
              }
            };

            gift_video_url = function gift_video_url(type, orderNumber) {
              switch (type) {
                case "common":
                  return "#";

                case "gift":
                  return "./shop/gift/".concat(orderNumber);
              }
            };

            _context3.prev = 3;
            _context3.next = 6;
            return regeneratorRuntime.awrap(
              _request["default"].get(
                _constants["default"].SERVER_URL + "/orders",
                {
                  params: {
                    buyer: "yes",
                    offset: 0,
                    limit: 30,
                  },
                  headers: {
                    Authorization: "Bearer ".concat(userToken),
                  },
                }
              )
            );

          case 6:
            response = _context3.sent;
            items = response.data.items;
            orderNumber = [];
            temp = [];

            for (i = 0; i < items.length; i++) {
              if (!temp.includes(items[i].orderNumber)) {
                temp.push(items[i].orderNumber);
                state = translate_state(items[i].state);
                type = translate_order_type(items[i].order_type);
                video_url = gift_video_url(
                  items[i].order_type,
                  items[i].orderNumber
                );
                orderNumber.push({
                  orderNumber: items[i].orderNumber,
                  time: items[i].create_at,
                  state: state,
                  // contractAddress: items[i].contractAddress,
                  video_url: video_url,
                  order_type: type,
                });
              }
            }

            return _context3.abrupt("return", orderNumber);

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](3);
            return _context3.abrupt("return", Promise.reject(_context3.t0));

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    },
    null,
    null,
    [[3, 14]]
  );
};

exports.getOrder = getOrder;

var getOrderItem = function getOrderItem(orderNumber, userToken) {
  var response, data, return_data, index;
  return regeneratorRuntime.async(
    function getOrderItem$(_context4) {
      while (1) {
        switch ((_context4.prev = _context4.next)) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(
              _request["default"].get(
                ""
                  .concat(
                    _constants["default"].SERVER_URL,
                    "/orders/orderItem/"
                  )
                  .concat(orderNumber),
                {
                  headers: {
                    Authorization: "Bearer ".concat(userToken),
                  },
                }
              )
            );

          case 3:
            response = _context4.sent;
            data = response.data;
            return_data = [];

            for (index = 0; index < data.length; index++) {
              return_data.push({
                amount: data[index].amount,
                name: data[index].name,
                price: data[index].price,
              });
            }

            return _context4.abrupt("return", return_data);

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", Promise.reject(_context4.t0));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    },
    null,
    null,
    [[0, 10]]
  );
};

exports.getOrderItem = getOrderItem;

function getDestinations() {
  var response, items;
  return regeneratorRuntime.async(
    function getDestinations$(_context5) {
      while (1) {
        switch ((_context5.prev = _context5.next)) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return regeneratorRuntime.awrap(
              _request["default"].get("/destination")
            );

          case 3:
            response = _context5.sent;
            items = response.data.items;
            console.log(items);
            return _context5.abrupt("return", items);

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", Promise.reject(_context5.t0));

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    },
    null,
    null,
    [[0, 9]]
  );
}

function getAllShoppingInfo(farm_ids) {
  var userToken, response, items;
  return regeneratorRuntime.async(
    function getAllShoppingInfo$(_context6) {
      while (1) {
        switch ((_context6.prev = _context6.next)) {
          case 0:
            userToken = _storage["default"].getAccessToken();
            _context6.prev = 1;
            _context6.next = 4;
            return regeneratorRuntime.awrap(
              _request["default"].get(
                "".concat(
                  _constants["default"].SERVER_URL,
                  "/destination/allshippinginfo"
                ),
                {
                  params: {
                    user: farm_ids,
                  },
                  headers: {
                    Authorization: "Bearer ".concat(userToken),
                  },
                }
              )
            );

          case 4:
            response = _context6.sent;
            items = response.data.items;
            return _context6.abrupt("return", items);

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](1);
            alert("無法取得農夫運費資訊，請稍後再試");
            console.log(_context6.t0);
            return _context6.abrupt("return", false);

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    },
    null,
    null,
    [[1, 9]]
  );
}

function getPressLikeNum(orderNumber) {
  var response, data, press_like;
  return regeneratorRuntime.async(
    function getPressLikeNum$(_context7) {
      while (1) {
        switch ((_context7.prev = _context7.next)) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return regeneratorRuntime.awrap(
              _request["default"].get("/orders/like/".concat(orderNumber))
            );

          case 3:
            response = _context7.sent;
            data = response.data;
            press_like = data[0].press_like;
            return _context7.abrupt("return", press_like);

          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](0);
            return _context7.abrupt("return", Promise.reject(_context7.t0));

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    },
    null,
    null,
    [[0, 9]]
  );
}
