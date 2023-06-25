import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import * as ExternalApi from "../../api/carbon/external";
import storage from "../../utils/storage";
import request from "../../utils/request";

function ApplyPage() {
  //   const [phoneNumber, setPhoneNumber] = useState("");
  //   const [amount, setAmount] = useState("");
  const [partyName, setPartyName] = useState("");
  const [roleId, setRoleId] = useState("");
  const [applied, setApplied] = useState("");

  useEffect(function () {
    getUserRole();
    checkApplyRecord();
  }, []);

  const handlePartyName = (e) => {
    setPartyName(e.target.value);
    console.log(e.target.value);
  };
  const getUserRole = async () => {
    try {
      const userToken = storage.getAccessToken();
      const response = await request.get(`users/roles`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setRoleId(response.data.id);
    } catch (e) {
      console.log("Debug: getUserRole error=", e.message);
      return;
    }
  };
  const checkApplyRecord = async () => {
    try {
      const dataDetail = await ExternalApi.getPartyData();
      if (dataDetail.code === 200) {
        var resultArr = dataDetail.message;
        console.log("resultArr", resultArr);
        if (resultArr.length == 0) setApplied(0);
        else setApplied(1);
      } else {
        throw new Error(dataDetail.message);
      }
    } catch (e) {
      console.log("Debug: checkApplyRecord error=", e.message);
      return;
    }
  };
  const handleApplyButton = async () => {
    try {
      const applyResult = await ExternalApi.applyParty(partyName);
      if (applyResult.code === 200) {
        var result = applyResult.message;
        // console.log("result", result);
        setApplied(1);
        alert("申請成功！");
      } else {
        throw new Error(applyResult.message);
      }
    } catch (e) {
      console.log("Debug: handleApplyButton error=", e.message);
      return;
    }
  };

  return (
    <div className="container py-5 py-sm-7">
      <h2>申請成為被捐贈機構</h2>
      {applied == 0 ? (
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-7">
            <div className="card card-lg mb-3">
              <div className="card-body">
                <div className="text-center">
                  <h4 className="text-center">填寫機構名稱</h4>
                  <div class="row">
                    <div class="col-sm-12">
                      <Form.Group controlId="party_name">
                        <Form.Control
                          type="text"
                          value={partyName}
                          onChange={handlePartyName}
                          placeholder=""
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <p>點選下列按鈕即可送出成為被捐贈機構之申請．</p>
                  </div>
                  <button
                    class="btn btn-primary btn-block confirm-button"
                    onClick={handleApplyButton}
                  >
                    申請
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4>您已申請過了!</h4>
      )}
    </div>
  );
}

export default React.memo(ApplyPage);
