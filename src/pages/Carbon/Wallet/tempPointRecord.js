import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useHistory } from "react-router-dom";
import * as CarbonWalletApi from "../../../api/carbon/wallet";
import * as ExternalApi from "../../../api/carbon/external";
import * as TokenCenter from "../../../abi/ERC20TokenCenter";
import { Button, Modal, ListGroup } from "react-bootstrap";

function TempPointRecord() {
  const history = useHistory();
  const [walletAddress, setWalletAddress] = useState("");
  const [tempPointResult, setTempPointResult] = useState("");
  const [externalParties, setExternalParties] = useState("");
  const [editingShow, setEditingShow] = useState(false);
  const [selectedPartyId, setSelectedPartyId] = useState("");
  const [selectedDateId, setSelectedDataId] = useState("");
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

  const handleTempPoint = async (data_id, party_id) => {
    try {
      console.log("handleTempPoint!!!", data_id, party_id);
      // Donate
      if (party_id) {
        setEditingShow(false);
      } else {
        // Draw
        var yes = window.confirm("您確定要領取該點數嗎？");
        if (!yes) return;
      }
      alert("請稍候一下");
      const handleTempPointResult = await ExternalApi.handleTempPoint(
        data_id,
        party_id
      );
      if (handleTempPointResult.code === 200) {
        console.log("Debug: handleTempPoint=", handleTempPointResult.message);
        if (party_id) {
          alert("您已成功捐贈！");
        } else {
          alert("您已成功領取，可至碳權存摺進行查閱！");
        }
        //Reload
        getTempPointsRecord();
      } else {
        throw new Error(handleTempPointResult.message);
      }
    } catch (e) {
      console.log("Debug: handleTempPoint error=", e.message);
      return;
    }
  };

  const EditingWindow = ({ onHide, show, amount, data_id }) => (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      {...{ onHide, show }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          選擇要捐贈的對象
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
                      action
                      onClick={setSelectedPartyId(enter_id)}
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
          onClick={() => handleTempPoint(selectedDateId, selectedPartyId)}
        >
          確定
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="container space-top-1 space-top-sm-2 mt-11">
      <div className="col-8 offset-2">
        <div className="mb-3 row">
          <h1>使用者暫存點數紀錄</h1>
        </div>
        <div className="mb-3 row">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              window.location.replace("/carbon/wallet");
            }}
          >
            返回
          </button>
        </div>
        <div className="mb-3 row">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                {/* <th scope="col">紀錄編號</th> */}
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
                        <th scope="row">{index + 1}</th>
                        {/* <td>{data_id}</td> */}
                        <td>{name}</td>
                        <td>{amount}</td>
                        <td>{timestamp}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              handleTempPoint(data_id);
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
    </div>
  );
}

export default React.memo(TempPointRecord);
