"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

export default function Auth() {
  const router = useRouter();
  const testRouter = () => {
    router.push("/LoginPage");
  };
  const data = useSearchParams();
  const AuthPost = async () => {
    const doctor_id = data.get("doctor_id");

    const clinic_id = data.get("clinic_id");
    const name = data.get("name");

    console.log(name);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/doctors/authentication",
        {
          doctor_id: doctor_id,
          phone_number: auth.phone_number,
          password: auth.password,
          clinic_id: clinic_id,
          doctor_name: name,
        }
      );

      console.log(response);

      if (response.data) {
        router.refresh;
        router.push("/LoginPage");
      } else {
        alert("something went wrong please check ");
      }
    } catch (error) {
      alert(error);
    }
  };
  const [view, setView] = useState(true);
  const [confirmView, setConfirmView] = useState(true);
  const [auth, setAuth] = useState({
    phone_number: "",
    password: "",
    checkPassword: "",
  });
  return (
    <div className="p-10 items-center flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center bg-red-100 p-4 rounded-md m-4 ">
        <div className="relative">
          <label className="mr-5" htmlFor="">
            Phone number
          </label>
          <input
            type="text"
            className="p-1 m-2"
            value={auth.phone_number}
            onChange={(e) => setAuth({ ...auth, phone_number: e.target.value })}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <FaUser className="text-gray-400" /> {/* Icon component */}
          </span>
        </div>
        <div className="relative">
          <label className="mr-5" htmlFor="">
            Password
          </label>
          <input
            className="p-2 m-2"
            value={auth.password}
            onChange={(e) => setAuth({ ...auth, password: e.target.value })}
            type={view === true ? "password" : "text"}
            // onClick={(e) => e.stopPropagation()}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <FaLock className="text-gray-400" onClick={() => setView(!view)} />
            {/* Icon component */}
          </span>
        </div>
        <div className="relative m-2">
          <label className="mr-5 " htmlFor="">
            Confirm password
          </label>
          <input
            className="p-2"
            value={auth.checkPassword}
            onChange={(e) =>
              setAuth({ ...auth, checkPassword: e.target.value })
            }
            type={confirmView === true ? "password" : "text"}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <FaLock
              className="text-gray-400"
              onClick={() => setConfirmView(!confirmView)}
            />
          </span>
        </div>
        <button
          onClick={AuthPost}
          className="bg-blue-500 p-2 pl-6 pr-6 rounded-md text-white font-semibold mt-4"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
