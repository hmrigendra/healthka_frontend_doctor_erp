import { Avatar } from "@mui/material";
import { DoctorProfileBody } from "../(Components)/DoctorProfile";
import { Nav } from "../(Components)/Nav";

export default function DoctorsProfile() {
  return (
    <div className="flex">
      <Nav />
      <div className="bg-production-white2 flex flex-col justify-center items-center ">
        <div className="w-4/5 p-4 rounded-lg  m-4 items-center bg-production-indigo">
          <p className="text-md font-semibold text-black">Doctors Profile</p>
        </div>
        <div className="flex w-full">
          <div className="w-1/4  p-5 m-5 bg-blue-50 rounded-xl items-center flex flex-col justify-center">
            <Avatar className="size-28 bg-white text-production-indigo"></Avatar>
            <p className="pl-10 text-lg text-indigo-900 font-semibold flex-wrap max-w-[230px]">
              Dr. SomeBig NameOfDoctor
            </p>
          </div>
          <div className=" flex flex-col w-3/4 p-5 m-5   ">
            <div className="flex justify-between  p-2 rounded-lg bg-production-indigo ">
              <p className="pl-5 pr-5 ">Personal information</p>
              <button className="bg-white text-sm rounded-md pl-5 pr-5 text-indigo-950 font-semibold">
                EDIT
              </button>
            </div>
            <div className="flex w-full bg-white">
              <div className="flex p-4 flex-col w-1/2 justify-start">
                <p className="text-indigo-900 font-semibold pb-4">
                  AGE: <span className="font-semibold text-black">50</span>
                </p>
                <p className="text-indigo-900 font-semibold pb-4">
                  GENDER: <span className="font-semibold text-black">Male</span>
                </p>
                <p className="text-indigo-900 font-semibold pb-4">
                  PHONE No.:
                  <span className="font-semibold text-black">0123456789</span>
                </p>
                <p className="text-indigo-900 font-semibold">
                  EMAIL:
                  <span className="font-semibold text-black">
                    someone@gmail.com
                  </span>
                </p>
              </div>
              <div className="flex flex-col p-6 justify-center text-center items-center">
                <p className="text-indigo-900 font-semibold pb-4">
                  DEGREE:
                  <span className="font-semibold text-black">
                    MBBS, MS <span className="bracket">(</span>
                    <span className="bracket"> Neurologist)</span>
                  </span>
                </p>
                <p className="text-indigo-900 font-semibold pb-4">
                  SPECIALIZATION:{" "}
                  <span className="font-semibold text-black">
                    Neurology and Surgery
                  </span>
                </p>
                <p className="text-indigo-900 font-semibold pb-4">
                  EXPERIENCE:
                  <span className="font-semibold text-black">27</span>
                </p>
                <p className="text-indigo-900 font-semibold ">
                  ADDRESS:
                  <span className="font-semibold text-black   max-w-[100px] overflow-hidden   text-sm">
                    1st road, 2nd Street, 3rd City, 4th State, 5th Pin code,
                    Karnataka: 560095
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <DoctorProfileBody />
      </div>
    </div>
  );
}
