"use client";
import Slider from "react-slick";
import { data } from "../../../../public/practiceData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function FollowUpSliderMain() {
  function SampleNextArrow(props: any) {
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
    infinite: true,
    slidesToShow: 9,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    swipeToSlide: true,
  };
  return (
    <div className="max-w-[1200px] ml-5">
      <Slider {...settings} className="w-full">
        {data.map((d: any) => (
          <div key={d.id} className="">
            <div className="flex">
              <div className=" rounded-md m-1  bg-blue-200">
                <div className="flex">
                  <div className="m-2">
                    <p>11-12</p>
                    <p>AM</p>
                  </div>
                  <div className="m-2">
                    <p>{d.name}</p>
                    <p>{d.age}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
