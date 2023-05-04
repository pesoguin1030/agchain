import React from "react";
import { Prev } from "react-bootstrap/esm/PageItem";
import Slider from "react-slick";

const Slide = (src_arr) => {
  return src_arr.map((src, index) => {
    return (
      <div className="js-slide bg-img-hero-center"
           key={index}>
        <img
          className="mx-auto responsive-img"
          style={{ maxHeight: "360px" }}
          src={src}
        />
      </div>
    );
  });
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <span
      className="fas fa-arrow-left slick-arrow slick-arrow-primary slick-arrow-left slick-arrow-centered-y rounded-circle"
      onClick={onClick}
    ></span>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <span
      className="fas fa-arrow-right slick-arrow slick-arrow-primary slick-arrow-right slick-arrow-centered-y rounded-circle"
      onClick={onClick}
    ></span>
  );
};

const Slideshow = ({ src_arr }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div>
      <Slider {...settings}>{Slide(src_arr)}</Slider>
    </div>
  );
};

// const Slideshow = ({ src_arr }) => {
//   console.log("srcarr", src_arr);
//   return (
//     <div
//       className="js-slick-carousel slick"
//       data-hs-slick-carousel-options='{
// 				"prevArrow": "<span className=\"fas fa-arrow-left slick-arrow slick-arrow-primary slick-arrow-left slick-arrow-centered-y rounded-circle\"></span>",
// 				"nextArrow": "<span className=\"fas fa-arrow-right slick-arrow slick-arrow-primary slick-arrow-right slick-arrow-centered-y rounded-circle\"></span>",
// 				"infinite": true,
// 				"slidesToShow": 1,
//         "autoplay": true,
//         "autoplaySpeed": 2000
// 			}'
//     >
//       {Slide(src_arr)}
//     </div>
//   );
// };

export default Slideshow;
