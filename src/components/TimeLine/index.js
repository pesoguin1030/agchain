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
  return items.map((item) => {
    return (
      <li class="step-item">
        <div class="step-content-wrapper">
          <div class="step-avatar">
            <img
              class="step-avatar-img"
              src={item.icon}
              alt="Image Description"
            />
          </div>
          <div class="step-content">
            <h4>{item.title}</h4>
            <p class="text-body">{item.description}</p>
          </div>
        </div>
      </li>
    );
  });
};

const TimeLine = ({ items }) => {
  // console.log(items);
  return <ul class="step">{ListItem(items)}</ul>;
};

export default TimeLine;
