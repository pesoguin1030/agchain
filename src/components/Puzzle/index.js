import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Puzzle from "react-image-puzzle";

var images = [
  // { src: 'images/london-bridge.jpg', title: 'London Bridge' },
  // { src: 'images/lotus-temple.jpg', title: 'Lotus Temple' },
  // { src: 'images/qutub-minar.jpg', title: 'Qutub Minar' },
  // { src: 'images/statue-of-liberty.jpg', title: 'Statue Of Liberty' },
  // { src: 'images/taj-mahal.jpg', title: 'Taj Mahal' },
  {
    src:
      "https://storage.googleapis.com/tenlife/df302260-4f4a-11eb-a316-2f179a7b75ab.jpg",
    title: "火龍果",
  },
];

const success = () => {
  alert("success");
};
const ImgToPuzzle = ({ img_url }) => {
  console.log("???? " + img_url);
  // const img_url =
  //   "https://storage.googleapis.com/tenlife/df302260-4f4a-11eb-a316-2f179a7b75ab.jpg";
  return <Puzzle image={img_url} size={300} onDone={success} />;
};

export { ImgToPuzzle };
