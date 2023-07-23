import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useHistory } from "react-router-dom";
import * as CarbonWalletApi from "../../../api/carbon/wallet";
import * as ExternalApi from "../../../api/carbon/external";
import * as TokenCenter from "../../../abi/ERC20TokenCenter";
import { Button, Modal, ListGroup, Form } from "react-bootstrap";

function TempPointRecord() {
  const history = useHistory();
  const [walletAddress, setWalletAddress] = useState("");
  const [tempPointResult, setTempPointResult] = useState("");
  const [externalParties, setExternalParties] = useState("");
  const [editingShow, setEditingShow] = useState(false);
  const [selectedPartyId, setSelectedPartyId] = useState("");
  const [selectedPartyName, setSelectedPartyName] = useState("");
  const [selectedDateId, setSelectedDataId] = useState("");
  const [bindWallet, setBindWallet] = useState(false);
  const [checkList, setCheckList] = useState([]);

  useEffect(
    function () {
      console.log("load carbon wallet test");

      if (typeof window.ethereum == "undefined") {
        alert("請安裝MetaMask");
        console.log("MetaMask is required!");
      } else {
        console.log("MetaMask is installed!");

        getWallet().then(() => {
          if (walletAddress) {
            getTempPointsRecord();
            getExternalParty();
          }
        });
      }
    },
    [walletAddress]
  );
  const getWallet = async () => {
    try {
      const result = await CarbonWalletApi.getWallet();
      console.log("wallet!!!!", result);
      if (result.code == 200) setBindWallet(true);
      setWalletAddress(result.message);
    } catch (error) {
      console.log("Error: getWallet=", error);
    }
  };

  const getExternalParty = async () => {
    try {
      const externalParty = await ExternalApi.getExternalParty(1);
      if (externalParty.code === 200) {
        console.log("Debug: externalParty=", externalParty.message);
        setExternalParties(externalParty.message);
      } else {
        throw new Error(externalParty.message);
      }
    } catch (e) {
      console.log("Debug: getExternalParty error=", e.message);
      return;
    }
  };

  const getTempPointsRecord = async () => {
    try {
      const tempPointResults = await ExternalApi.getTempPointsRecord();
      if (tempPointResults.code === 200) {
        var resultArr = tempPointResults.message;
        resultArr.forEach((element) => {
          var tmp = new Date(element.timestamp);
          element.timestamp = tmp.toLocaleString();
        });
        // resultArr = resultArr.sort((a, b) => b.timestamp - a.timestamp);
        resultArr.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
        console.log("Debug: getTempPointsRecord=", resultArr);
        setTempPointResult(resultArr);
      } else {
        throw new Error(tempPointResults.message);
      }
    } catch (e) {
      console.log("Debug: getTempPointsRecord error=", e.message);
      return;
    }
  };

  const handleMultiTempPoint = async (party_id, data_id) => {
    try {
      console.log(
        "handleMultiTempPoint!!!",
        "checkList",
        checkList,
        "data_id",
        data_id,
        "party_id",
        party_id
      );

      // Donate
      if (party_id) {
        setEditingShow(false);
      } else {
        // Draw
        party_id = "";
        if (bindWallet) {
          var yes = window.confirm("您確定要領取該點數嗎？");
          if (!yes) return;
        } else {
          alert("請先綁定錢包才可以領取點數");
          return;
        }
      }
      if (checkList.length == 0 && data_id == "")
        var dataIds = [selectedDateId.toString()];
      else if (data_id != "") dataIds = [data_id.toString()];
      else dataIds = checkList;
      console.log("最終確定", dataIds, party_id);
      alert("請稍候一下");
      var txFail = false;

      const handleTempPointResult = await ExternalApi.handleTempPoint(
        dataIds,
        party_id
      );
      if (handleTempPointResult.code !== 200) {
        txFail = true;
        console.log(
          "Debug: handleMultiTempPoint=",
          handleTempPointResult.message
        );
      }

      if (!txFail) {
        if (party_id) {
          alert("您已成功捐贈！");
        } else {
          alert("您已成功領取，可至碳權存摺進行查閱！");
        }
        //Reload
        await setCheckList([]);
        getTempPointsRecord();
      } else {
        throw new Error(handleMultiTempPoint.message);
        alert("出現一點問題請稍候再試！");
      }
    } catch (e) {
      console.log("Debug: handleMultiTempPoint error=", e.message);
      return;
    }
  };
  const getTotalAmount = () => {
    if (tempPointResult && tempPointResult.length > 0) {
      return tempPointResult.reduce(
        (total, record) => total + record.amount,
        0
      );
    }
    return 0;
  };
  const handlePartyName = (name, party_id) => {
    setSelectedPartyName(name);
    setSelectedPartyId(party_id);
    console.log(name, party_id);
  };

  const EditingWindow = React.memo(({ onHide, show, amount, data_id }) => (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      {...{ onHide, show }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          選擇要捐贈的對象: {selectedPartyName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>您可以選擇將該筆碳權點數({amount}點)捐贈給以下店家</h4>
        <ListGroup defaultActiveKey="#link1">
          {externalParties
            ? externalParties.map(
                ({ party_id, enter_id, party_name }, index) => {
                  return (
                    <ListGroup.Item
                      // action
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        handlePartyName(party_name, enter_id);
                        // 执行单击事件相关的交互或准备工作
                      }}
                      // onDoubleClick={(event) => {
                      //   handlePartyName(enter_id);
                      // }}
                    >
                      {party_name}
                    </ListGroup.Item>
                  );
                }
              )
            : "網頁更新中，請稍等一下"}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          關閉
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => handleMultiTempPoint(selectedPartyId, "")}
        >
          確定
        </Button>
      </Modal.Footer>
    </Modal>
  ));

  return (
    <div className="container space-top-1 space-top-sm-2 mt-11">
      <h1 align="center">使用者暫存點數紀錄</h1>
      <h4 align="center">目前暫存點數：{getTotalAmount()}</h4>
      <div>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            window.location.replace("/carbon/wallet");
          }}
        >
          返回
        </button>
        <button
          className="btn btn-primary  float-right"
          type="button"
          disabled={checkList.length === 0}
          onClick={() => {
            setEditingShow(true);
            // setSelectedDataId(data_id);
          }}
        >
          多筆捐贈
        </button>
        <button
          className="btn btn-success float-right"
          type="button"
          disabled={checkList.length === 0}
          onClick={() => {
            handleMultiTempPoint("", "");
          }}
        >
          多筆領取
        </button>
      </div>
      <div className="mb-3 row">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">#</th>
              <th scope="col">公司</th>
              <th scope="col">點數數量</th>
              <th scope="col">時間</th>
              <th scope="col">操作</th>
            </tr>
          </thead>
          <tbody>
            {tempPointResult && tempPointResult.length != 0 ? (
              tempPointResult.map(
                ({ data_id, name, amount, timestamp, id }, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row"> </th>
                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={data_id}
                          id="flexCheckDefault"
                          onClick={(e) => {
                            const value = e.target.value;
                            const found = checkList.indexOf(value);
                            if (found !== -1) {
                              const newList = checkList.filter(
                                (item) => item !== value
                              );
                              setCheckList(newList);
                            } else {
                              const newList = checkList.concat(value);
                              setCheckList(newList);
                            }
                          }}
                        ></input>
                      </td>
                      <th scope="row">{index}</th>
                      <td>{name}</td>
                      <td>{amount}</td>
                      <td>{timestamp}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            setSelectedDataId(data_id);
                            console.log("!!!!!!", data_id);
                            handleMultiTempPoint("", data_id);
                          }}
                        >
                          領取
                        </button>

                        <button
                          className="btn btn-primary "
                          onClick={() => {
                            setEditingShow(true);
                            setSelectedDataId(data_id);
                          }}
                        >
                          捐贈
                        </button>
                        {editingShow && (
                          <EditingWindow
                            show={editingShow}
                            onHide={() => setEditingShow(false)}
                          />
                        )}
                      </td>
                    </tr>
                  );
                }
              )
            ) : (
              <tr key={0}>
                <th>#</th>
                <td>{"目前沒有暫存點數呦！"}</td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default React.memo(TempPointRecord);
