"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function DoctorName() {
  const [doctorsName, setDoctorsName] = useState(" I Am Doctor");
  const [clinic_name, setClinicName] = useState("Clinic_name");
  const getCookie = (name: string) => {
    return Cookies.get(name);
  };
  useEffect(() => {
    const doctorName = getCookie("doctor_name");
    const Cname = getCookie("clinic_name");
    console.log("====================================");
    console.log(Cname);
    console.log("====================================");

    if (doctorName) {
      console.log("Doctor's name:", doctorName);
      setDoctorsName(doctorName);
    } else {
      console.log("Doctor's name not found.");
    }
    if (Cname) {
      setClinicName(Cname);
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-indigo-900 font-bold">{`Welcome,Dr ${doctorsName}`}</h1>
      <div className="bg-production-indigo text-sm border-black font-semibold p-1 rounded-md inline-block">
        <p>Clinic: {clinic_name}</p>
      </div>
    </div>
  );
}
