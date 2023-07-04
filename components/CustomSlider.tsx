import React from "react";
import PropTypes from "prop-types";

import Slider from "react-slick";

const slideSettings = {
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: "0",
  //   className: styles.slider,
  infinite: true,
  slidesToShow: 3,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 800,
  pauseOnHover: true,
  nextArrow: <img src="/next.svg" alt="" />,
  prevArrow: <img src="/previous.svg" alt="" />,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};

const CustomSlider = React.forwardRef<any, any>(
  ({ children, ...props }, ref) => {
    return (
      <Slider {...slideSettings} {...props} ref={ref}>
        {children}
      </Slider>
    );
  }
);

// function CustomSlider({ children, ...props }) {
//   return (
//     <Slider {...slideSettings} {...props}>
//       {children}
//     </Slider>
//   );
// }
export default CustomSlider;
