// import React from "react";
// import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
// import 'react-vertical-timeline-component/style.min.css';

// // list item 包含 date, icon, title, description
// const TimeLine = ({ list }) => {
// 	return(
// 		<VerticalTimeline>
// 			{list.map((item)=>{
// 				return(
// 					<VerticalTimelineElement
// 						className="vertical-timeline-element--education"
// 						date={item.date}	// string
// 						iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
// 						icon={item.icon}
// 					>
// 						<h3 className="vertical-timeline-element-title">{item.title}</h3>
// 						<h4 className="vertical-timeline-element-subtitle">{item.description}</h4>
// 						<p> :3 </p>
// 					</VerticalTimelineElement>
// 				);
// 			})}
// 		</VerticalTimeline>
// 	)
// };

// export default TimeLine;

import React from "react";
import { checkInfo } from "../../api/ethereum";
import Zmage from "react-zmage";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import ModalImage from "react-modal-image";

async function check(item) {
  let info = await checkInfo(
    item["id"],
    item["crop_id"],
    item["action"],
    item["timestamp"],
    item["photoURL"],
    item["soundURL"]
  );
  if (info.data[0] == true) {
    alert("本項資料無竄改疑慮，請安心溯源");
  } else {
    alert("本項資料已遭竄改，請協助通知網頁提供商");
  }
}

async function soundClick(sound) {
  let audio = new Audio(sound);
  audio.play();
  console.log(audio);
  console.log(sound);
}

// item 包含 icon, title, description
const ListItem = (items) => {
  return items.map((item, index) => {
    return (
      <li className="step-item" key={index}>
        <div className="step-content-wrapper">
          <span className="step-icon step-icon-soft-primary">
            {item.photoURL != "" ? (
              <ModalImage
                className="step-avatar-img-rec"
                small={item.photoURL}
                large={item.photoURL}
                alt="Image"
              />
            ) : (
              <img
                className="step-avatar-img-rec"
                src={item.icon}
                alt="Not provide"
              />
            )}
          </span>
          <span className="step-icon step-icon-soft-primary">
            {item.soundURL != "" ? (
              <img
                className="step-avatar-img"
                src={require("./rumor.png")}
                alt="sound"
                onClick={() => soundClick(item.soundURL)}
              />
            ) : (
              <img
                className="step-avatar-img"
                src={item.icon}
                alt="Not provide"
              />
            )}
          </span>
          <div className="step-content">
            <h4>
              {item.action}({item.tackle_time.substring(0, 10)})
            </h4>
            <button
              type="button"
              className="btn btn-outline-secondary btn-xs"
              onClick={() =>
                window.open(
                  "https://ropsten.etherscan.io/tx/" + item.description
                )
              }
            >
              <i className="fas fa-shield-alt mr-1"></i>
              詳細區塊鏈資訊...
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-xs"
              onClick={() => check(item)}
            >
              <i className="fas mr-1"></i>
              驗證
            </button>
          </div>
        </div>
      </li>
    );
  });
};

const TimeLine_try = ({ items }) => {
  // 目前預設橫式 在寬度小於md(786px?)時會轉成直式
  return (
    <div>
      <ul className="step step-border-last-0 ">{ListItem(items)}</ul>
      <div style={{ opacity: 0.5 }}>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">
          Good Ware
        </a>{" "}
        and{" "}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};

export default TimeLine_try;
