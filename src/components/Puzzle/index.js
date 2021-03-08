import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Puzzle from "react-image-puzzle";

const success = () => {
  alert("success");
};
const ImgToPuzzle = ({ img }) => {
  return <Puzzle image={img} size={300} onDone={success} />;
};

export { ImgToPuzzle };
