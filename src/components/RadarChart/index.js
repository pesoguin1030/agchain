import React from "react";
import { Radar } from "react-chartjs-2";

const state = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      label: "Rainfall",
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(200, 99, 132, .7)",
      borderWidth: 2,
      data: [65, 59, 80, 81],
    },
  ],
};

const Radarchart = () => {
  return (
    <div className="w-md-90 w-lg-75 mx-md-auto">
      <Radar
        data={state}
        options={{
          title: {
            display: false,
            text: "種植數據雷達圖",
            fontSize: 20,
          },
          legend: {
            display: false,
            position: "right",
          },
          responsive: true,
        }}
      />
    </div>
  );
};

export default Radarchart;
