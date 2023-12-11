import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import uuid4 from "uuid4";
import jsonFile from "../../../utils/jsonFile";
import * as CarbonNftApi from "../../../api/carbon/nft";

function CarbonNft() {
  const history = useHistory();

  const [carbonCreditCertId, setCarbonCreditCertId] = useState("");
  const [carbonCreditCertSource, setCarbonCreditCertSource] = useState("");
  const [carbonCreditCertIssueBy, setCarbonCreditCertIssueBy] = useState("");
  const [carbonCreditCertWeight, setCarbonCreditCertWeight] = useState("");

  const [carbonCreditCertFile, setCarbonCreditCertFile] = useState(undefined);
  const [disableButtonCreateToken, setDisableButtonCreateToken] =
    useState(false);
  // const [disableButtonGetTokenList, setDisableButtonGetTokenList] = useState(false);

  const buttonGenerateCarbonCreditCertId = async () => {
    const id = uuid4();
    setCarbonCreditCertId(id);
  };

  const generateCertFile = async () => {
    if (
      !carbonCreditCertId ||
      !carbonCreditCertSource ||
      !carbonCreditCertIssueBy ||
      !carbonCreditCertWeight
    ) {
      alert("證書資料不完整！");
      return;
    }

    // create CarbonCreditCert in json
    const carbonCreditCert = {
      certId: carbonCreditCertId,
      source: carbonCreditCertSource,
      issueBy: carbonCreditCertIssueBy,
      weight: carbonCreditCertWeight,
    };

    jsonFile.GenerateJsonFileFromJsonObject(
      carbonCreditCertId,
      carbonCreditCert
    );
  };

  const buttonCreateToken = async () => {
    try {
      if (!carbonCreditCertFile || carbonCreditCertFile.length === 0) {
        alert("未選擇碳權證書檔案");
        return;
      }

      console.log(carbonCreditCertFile);
      alert("NFT鑄造中，請不要重複提交");

      // 禁用按鈕
      setDisableButtonCreateToken(true);

      const formData = new FormData();
      formData.append("file", carbonCreditCertFile[0]);
      const result = await CarbonNftApi.createToken(formData);

      console.log("buttonCreateToken result=", result);

      if (result && result.code === 200) {
        alert(
          "碳權NFT鑄造成功！\n請進入【管理碳權NFT】頁面，將碳權NFT兌換為碳權點數"
        );
      } else {
        alert("碳權NFT鑄造失敗，錯誤：\n" + result.message);
      }
    } catch (error) {
      alert("碳權NFT鑄造失敗，錯誤：\n" + error.message);
    }
    // 解除禁用
    setDisableButtonCreateToken(false);
  };

  const buttonGetTokenList = async () => {
    history.push({
      pathname: "/carbon/nftlist",
    });
  };

  const buttonReset = async () => {
    setCarbonCreditCertFile(undefined);

    // 獲取文件選擇 input 元素
    const fileInput = document.getElementById("carbonCreditFileInput");
    // 重置 input 元素，清空選擇的文件
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="container space-top-1 space-top-sm-2 mt-11">
      <div className="row pb-5 border-bottom">
        <div className="col-8 offset-2">
          <div className="mb-3 row">
            <h1>碳權NFT管理</h1>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">選擇碳權證書</label>
            <div className="col-sm-8">
              <input
                id="carbonCreditFileInput" // 添加一個唯一的 ID
                onChange={(e) => {
                  setCarbonCreditCertFile(e.target.files);
                }}
                type="file"
                className="form-control"
              />
            </div>
            <button className="col-sm-2 btn btn-danger" onClick={buttonReset}>
              重選
            </button>
          </div>

          <div className="mb-3 row">
            <button
              className="col-sm-5 btn btn-danger"
              onClick={buttonCreateToken}
              disabled={disableButtonCreateToken}
            >
              鑄造碳權NFT
            </button>
            <div className="col-sm-2"></div>
            <button
              className="col-sm-5 btn btn-primary"
              onClick={buttonGetTokenList}
              // disabled={disableButtonGetTokenList}
            >
              管理碳權NFT
            </button>
          </div>
          <hr />
          <div className="mb-3 row">
            <h1>模擬碳權證書生成（測試）</h1>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">證書ID</label>
            <div className="col-sm-8">
              <input
                onChange={(e) => {
                  setCarbonCreditCertId(e.target.value);
                }}
                type="text"
                className="form-control"
                value={carbonCreditCertId}
                placeholder="UUID，例如：xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx"
              />
            </div>
            <button
              className="col-sm-2 btn btn-primary"
              onClick={buttonGenerateCarbonCreditCertId}
            >
              UUID4
            </button>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">證書來源</label>
            <div className="col-sm-8">
              <input
                onChange={(e) => {
                  setCarbonCreditCertSource(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder="證書原所有者，例如：HSNL科技股份有限公司"
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">簽發機構</label>
            <div className="col-sm-8">
              <input
                onChange={(e) => {
                  setCarbonCreditCertIssueBy(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder="認證機構，例如：CIX"
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">碳權當量</label>
            <div className="col-sm-8">
              <input
                onChange={(e) => {
                  setCarbonCreditCertWeight(e.target.value);
                }}
                type="number"
                className="form-control"
                placeholder="單位公噸，例如：10000"
              />
            </div>
          </div>
          <div className="mb-3 row">
            <button
              className="col-sm-2 btn btn-primary"
              onClick={generateCertFile}
            >
              下載證書
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CarbonNft);
