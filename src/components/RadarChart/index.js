import React from "react";
import { Radar } from "react-chartjs-2";

function formatData(data, crop_name) {
  let labels = Object.values(data).map((item) => item.key);
  let datas = Object.values(data).map((item) => item.value);
  let states = {
    labels: labels,
    datasets: [
      {
        label: crop_name,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192, 0.9)",
        borderWidth: 2,
        data: datas,
      },
    ],
  };

  return states;
}

const Radarchart = ({ data, cropName }) => {
  let state = formatData(data, cropName);
  return (
    <div
      className="w-md-90 w-lg-75 mx-md-auto"
      style={{ height: "100vh", width: "100%" }}
    >
      <Radar
        data={state}
        options={{
          title: {
            display: false,
            text: "種植數據雷達圖",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "top",
          },
          label: {
            fontSize: 10,
          },
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1.1,
        }}
      />
    </div>
  );
};

export default Radarchart;
