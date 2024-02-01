"use client";
import { useState } from "react";

export function DoctorName() {
  const [doctorsName, setDoctorsName] = useState(" Venugopal Iyear");
  return (
    <div>
      <h1 className="text-2xl text-indigo-900 font-bold">{`Welcome,Dr ${doctorsName}`}</h1>
      <div className="bg-production-indigo text-sm border-black font-semibold p-1 rounded-md inline-block">
        Clinic Somewhere in Bangalore
      </div>
    </div>
  );
}
