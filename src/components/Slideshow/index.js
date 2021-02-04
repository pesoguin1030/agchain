import React from "react";

const Slide = (src_arr) => {
  return src_arr.map((src, index) => {
    return (
      <div className="js-slide bg-img-hero-center">
        <img className="mx-auto responsive-img" src={src} key={index} />
      </div>
    );
  });
};

const Slideshow = ({ src_arr }) => {
  console.log(src_arr);
  return (
    <div
      className="js-slick-carousel slick"
      data-hs-slick-carousel-options='{
				"prevArrow": "<span class=\"fas fa-arrow-left slick-arrow slick-arrow-primary slick-arrow-left slick-arrow-centered-y rounded-circle ml-sm-2 ml-xl-4\"></span>",
				"nextArrow": "<span class=\"fas fa-arrow-right slick-arrow slick-arrow-primary slick-arrow-right slick-arrow-centered-y rounded-circle mr-sm-2 mr-xl-4\"></span>",
				"infinite": true,
				"adaptiveHeight": true,
				"slidesToShow": 1
			}'
    >
      {Slide(src_arr)}
    </div>
  );
};

export default Slideshow;
