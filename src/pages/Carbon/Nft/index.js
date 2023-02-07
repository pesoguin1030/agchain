import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import uuid4 from "uuid4";
import CarbonNftApi from "../../../api/carbon/nft";

function CarbonNft() {
  const history = useHistory();

  const [carbonCreditCertId, setCarbonCreditCertId] = useState(
    "xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx"
  );
  const [carbonCreditCertSrouce, setCarbonCreditCertSrouce] = useState("");
  const [carbonCreditCertIssueBy, setCarbonCreditCertIssueBy] = useState("");
  const [carbonCreditCertWeight, setCarbonCreditCertWeight] = useState("");

  const [carbonCreditCertFile, setCarbonCreditCertFile] = useState();
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
      !carbonCreditCertSrouce ||
      !carbonCreditCertIssueBy ||
      !carbonCreditCertWeight
    ) {
      alert("證書資料不完整！");
      return;
    }

    // create CarbonCreditCert in json
    const carbonCreditCert = {
      certId: carbonCreditCertId,
      source: carbonCreditCertSrouce,
      issueBy: carbonCreditCertIssueBy,
      weight: carbonCreditCertWeight,
    };

    // create file in browser
    const fileName = carbonCreditCertId;
    const json = JSON.stringify(carbonCreditCert, null, 4);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const buttonCreateToken = async () => {
    try {
      if (!carbonCreditCertFile) {
        alert("未選擇碳權證書檔案");
        return;
      }

      alert("NFT鑄造中，請不要重複提交");

      // 禁用按鈕
      setDisableButtonCreateToken(true);

      const formData = new FormData();
      formData.append("file", carbonCreditCertFile[0]);
      const result = await CarbonNftApi.createToken(formData);

      console.log("buttonCreateToken result=", result);

      if (result && result.code == 200) {
        alert("碳權NFT鑄造成功！\n您必須將碳權NFT碎片化以匯入碳權錢包");
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
    setCarbonCreditCertFile("");
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
              className="col-sm-6 btn btn-danger"
              onClick={buttonCreateToken}
              disabled={disableButtonCreateToken}
            >
              從碳權證書鑄造碳權NFT
            </button>
            <button
              className="col-sm-6 btn btn-primary"
              onClick={buttonGetTokenList}
              // disabled={disableButtonGetTokenList}
            >
              碎片化擁有的碳權NFT
            </button>
          </div>
          <hr />
          <div className="mb-3 row">
            <h1>模擬碳權證書生成（測試）</h1>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">碳權證書ID</label>
            <div className="col-sm-8">
              <input
                onChange={(e) => {
                  setCarbonCreditCertId(e.target.value);
                }}
                type="text"
                className="form-control"
                value={carbonCreditCertId}
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
            <label className="col-sm-2 col-form-label">碳權證書來源</label>
            <div className="col-sm-8">
              <input
                onChange={(e) => {
                  setCarbonCreditCertSrouce(e.target.value);
                }}
                type="text"
                className="form-control"
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">碳權簽發機構</label>
            <div className="col-sm-8">
              <input
                onChange={(e) => {
                  setCarbonCreditCertIssueBy(e.target.value);
                }}
                type="text"
                className="form-control"
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
