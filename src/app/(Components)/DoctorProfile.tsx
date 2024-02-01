import { FaClinicMedical } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
export function DoctorProfileBody() {
  return (
    <div className="flex justify-between   w-[80%]">
      <div className="p-10 bg-white ">
        <p className="w-full bg-indigo-500 text-white font-semibold pl-2 rounded-lg p-1">
          Partnered Clinic
        </p>
        <div className="flex gap-20 justify-evenly text-md font-bold text-indigo-900 bg-production-white rounded-lg p-2">
          <p>Name of clinic</p>
          <p>Working days & Hrs</p>
          <p>Address</p>
        </div>
        <div className="flex gap-32 bg-production-white m-2 rounded-lg">
          <div className="flex   max-w-[200px] line-clamp-2  text-indigo-900 text-md font-semibold ">
            <FaClinicMedical className="size-10 ml-1 mr-2 " />
            <p className=" line-clamp-3">Gentle Care Family Clinic </p>
          </div>
          <div className="flex flex-col w-[250px]  text-md font-semibold text-indigo-900 items-center">
            <p>3:00 PM - 5:00 PM</p>
            <div className="flex gap-2">
              <p>M</p>
              <p>T</p>
              <p>W</p>
              <p>T</p>
              <p>F</p>
              <p>S</p>
              <p>S</p>
            </div>
          </div>
          <div className="items-center">
            <p className="font-semibold  line-clamp-2 items-center max-w-[200px] overflow-hidden text-indigo-900">
              1st road, 2nd Street, 3rd City, 4th State, 5th Pin code,
              Karnataka: 560095
            </p>
          </div>
        </div>
      </div>
      <div className="p-8 bg-white">
        <p className="w-full bg-indigo-500 text-white font-semibold pl-4 rounded-lg pr-4 p-2">
          Clinic request
        </p>
        <div className="flex gap-4 items-center m-1 w-full  bg-indigo-500 p-1 rounded-md text-white border-2 font-semibold">
          <FaClinicMedical className="size-10 " />
          <p className=" max-w-[200px] line-clamp-2">
            Gentle Care Family Clinic
          </p>
          <div className="bg-production-white text-black">
            <p className="text-sm text-center">New request</p>
            <div className="flex justify-center">
              <button className="bg-production-green p-1 pl-5 pr-5 m-2 rounded-lg">
                <FaCheck />
              </button>
              <button className="bg-production-red p-1 pl-5 pr-5 m-2 rounded-lg">
                <IoClose />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
