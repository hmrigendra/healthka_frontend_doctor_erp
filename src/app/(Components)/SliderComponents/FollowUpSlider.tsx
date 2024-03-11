"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { data } from "../../../../public/practiceData";
import Link from "next/link";

export function FollowUpSlider() {
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "blue",
          borderRadius: "100%", // Adjust the value for the desired level of rounding
          // Add other style properties as needed
        }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "blue",
          borderRadius: "50%", // Adjust the value for the desired level of rounding
          // Add other style properties as needed
        }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    swipeToSlide: true,
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-7">
      <Link href="">
        <h2 className="cursor-help w-full h-12 items-center rounded-e-md flex justify-start pl-2 text-indigo-900 font-semibold  bg-production-red text-center rounded-lg">
          Todays Follow-Ups / Appointments(coming soon......)
        </h2>
      </Link>

      <Slider {...settings} className="w-full">
        {data.map((d, index) => (
          <div
            key={index}
            className="bg-production-white max-h-screen p-5 cursor-wait"
          >
            <h1 className="text-center">6:30 pm</h1>
            <div className="w-full pl-7 pr-7 p-4 ml-2 bg-white cursor-wait rounded-md">
              <h3 className="text-center overflow-hidden"> Coming Soon</h3>
              <div className="flex justify-between m-1 cursor-wait">
                <p> {d.age}</p>
                <p> {d.gender}</p>
              </div>
              <h1 className="text-sm h-16 overflow-hidden overflow-ellipsis">
                Launching this feature with in few weeks
              </h1>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom styles for slider arrows */}
      {/* Custom styles for slider arrows */}
      {/* <style>
        {`
    .slick-prev, .slick-next {
      color: ${arrowStyles.color};
      background-color: ${arrowStyles.background};
      border-radius: ${arrowStyles.borderRadius};
    }

    .slick-prev:hover, .slick-next:hover,
    .slick-prev:focus, .slick-next:focus {
      color: ${arrowStyles.color};
      background-color: ${arrowStyles.background};
      border-radius: ${arrowStyles.borderRadius};
    }
  `}
      </style> */}
    </div>
  );
}
