"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/doctors/login`,
        loginInfo
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
    <div className="h-screen items-center justify-center flex  bg-gradient-to-r from-red-400 to-blue-200">
      <div className=" bg-white w-[55%] h-[50%] rounded-md">
        <div className=" flex justify-center">
          <table className="w-[90%]">
            <tbody>
              <tr>
                <td rowSpan={3}>
                  <Image
                    src="/doctor.avif"
                    width={320}
                    height={1}
                    alt="Doctor Image"
                  />
                </td>

                <td className="flex justify-center">
                  <p className="text-lg font-bold mt-5 mb-4">HealthKa</p>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="User Id or Phone number"
                      onChange={handleChange}
                      value={loginInfo.doctor_id}
                      name="doctor_id"
                      className=" p-2 m-1 w-full  bg-gray-200 rounded-md font-semibold placeholder:text-gray-600"
                    />
                    <input
                      type="password"
                      placeholder="password"
                      className="p-2 m-1 bg-gray-200 w-full  rounded-md font-semibold placeholder:text-gray-600 "
                      name="password"
                      onChange={handleChange}
                      value={loginInfo.password}
                    />
                  </div>
                  <div className="flex justify-end mb-3">
                    <p className="text-blue-600 border-b ">Forgot password</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="flex flex-col">
                    <button
                      className="mb-2 ml-2 mr-2 rounded-lg text-lg w-full font-semibold bg-production-green p-2 text-production-white2 hover:text-black"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                    <Link href={"/signup"}>
                      <button className=" ml-2 mr-2 rounded-lg w-full text-lg font-semibold text-white bg-blue-400 p-2 border border-blue-400 hover:text-black hover:bg-blue-200">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
