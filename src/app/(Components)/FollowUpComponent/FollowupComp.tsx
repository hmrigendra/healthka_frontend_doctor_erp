"use client";
import Slider from "react-slick";
import { DayName, Month, data } from "../../../../public/practiceData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FollowUpSliderMain } from "./FollowUpSlider";

export default function FollowUpComp() {
  const currentDate = new Date();
  const todaysDate = currentDate.getDate();
  const getDay = currentDate.getDay();
  const currentMonthIndex = currentDate.getMonth();
  const currentMonthName = Month[currentMonthIndex];
  const currentDay = DayName[getDay];

  return (
    <div className="p-4 flex flex-row ">
      <div className="flex ">
        <div className="w-16  m-1 h-16 items-center pl-10 pr-10 mr-2 rounded-md flex flex-col justify-center bg-production-indigo">
          <div className="flex gap-2 font-semibold">
            <p className="text-white">{todaysDate}</p>
            <p className="text-white">{currentMonthName.slice(0, 3)}</p>
          </div>
          <p className="text-production-gray">{currentDay.slice(0, 3)}</p>
        </div>

        <FollowUpSliderMain />
      </div>
    </div>
  );
}
