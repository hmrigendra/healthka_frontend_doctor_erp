"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function DoctorName() {
  const [doctorsName, setDoctorsName] = useState(" I Am Doctor");
  const getCookie = (name: string) => {
    return Cookies.get(name);
  };
  useEffect(() => {
    const doctorName = getCookie("doctor_name");
    if (doctorName) {
      console.log("Doctor's name:", doctorName);
      setDoctorsName(doctorName);
    } else {
      console.log("Doctor's name not found.");
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-indigo-900 font-bold">{`Welcome,Dr ${doctorsName}`}</h1>
      <div className="bg-production-indigo text-sm border-black font-semibold p-1 rounded-md inline-block">
        Clinic Somewhere in Bangalore
      </div>
    </div>
  );
}
