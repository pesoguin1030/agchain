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

// item 包含 icon, title, description
const ListItem = (items) => {
  return items.map((item, index) => {
    return (
      <li className="step-item" key={index}>
        <div className="step-content-wrapper">
          <span className="step-icon step-icon-soft-primary">
            <img
              className="step-avatar-img"
              src={`/assets/img/cultivation/` + item.icon}
              alt="Image"
            />
          </span>
          <div className="step-content">
            <h4>{item.title}</h4>
            <button
              type="button"
              className="btn btn-outline-secondary btn-xs"
              onClick={() =>
                window.open(
                  "https://goerli.etherscan.io/tx/" + item.description
                )
              }
            >
              <i className="fas fa-shield-alt mr-1"></i>
              詳細區塊鏈資訊...
            </button>
          </div>
        </div>
      </li>
    );
  });
};

const TimeLine = ({ items }) => {
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

export default TimeLine;
