"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({
    doctor_id: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/doctors/login",
        loginInfo,
        { withCredentials: true } // Include this option to send cookies with the request
      );

      router.push("/Dashboard");
      console.log(response.data);
      localStorage.setItem("doctor", JSON.stringify(response.data.doctorData));
      localStorage.setItem(
        "clinicAddress",
        JSON.stringify(response.data.clinicAddress)
      );
      localStorage.setItem("clinic", JSON.stringify(response.data.clinicData));
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="h-screen items-center justify-between flex  bg-gradient-to-r from-red-500 to-gray-400">
      <div className="items-center m-36">
        <Image
          src="/doctor.avif"
          width={300}
          height={100}
          alt="Doctor Image"
          className=""
        />
      </div>
      <div className="m-40 bg-white w-[20%] h-[45%] rounded-md">
        <div className="item-center flex flex-col align-middle justify-center">
          <div className="items-center flex justify-center">
            <p className="text-lg font-bold m-2">HealthKa</p>
          </div>

          <div className="flex flex-col">
            <input
              type="text"
              placeholder="User Id or Phone number"
              onChange={handleChange}
              value={loginInfo.doctor_id}
              name="doctor_id"
              className="m-2 ml-4 mr-4 p-2  bg-gray-200 rounded-md font-semibold placeholder:text-gray-600"
            />
            <input
              type="password"
              placeholder="password"
              className="m-2 p-2 ml-4 mr-4 bg-gray-200 rounded-md font-semibold placeholder:text-gray-600 "
              name="password"
              onChange={handleChange}
              value={loginInfo.password}
            />
          </div>
          <div className="flex justify-end m-2 mb-3">
            <p className="text-blue-600 border-b font-semibold  ">
              forget Password
            </p>
          </div>
          <div className="flex flex-col">
            <button
              className="mb-2 ml-2 mr-2 rounded-lg text-lg font-semibold bg-production-green p-2 text-production-white2 hover:text-black"
              onClick={handleLogin}
            >
              Login
            </button>
            <button className="mb-2 ml-2 mr-2 rounded-lg text-lg font-semibold text-white bg-blue-400 p-2 border border-blue-400 hover:text-black hover:bg-blue-200">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
