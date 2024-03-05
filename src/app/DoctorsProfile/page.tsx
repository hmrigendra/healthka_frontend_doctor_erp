"use client";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { DoctorProfileBody } from "../(Components)/DoctorProfile";
import { Nav } from "../(Components)/Nav";

interface DoctorData {
  doctor_id: string;
  first_name: string;
  second_name: string;
  DOB: string;
  gender: string;
  phone_number: string;
  email: string;
  qualification: string;
  specialization: string;
  personal_clinic: number;
}
interface AddressData {
  address_id: string;
  house_number: string;
  lane: string;
  address_one: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  doctor_id?: string;
  clinic_id?: String;
}

interface ClinicData {
  id: string;
  clinic_id: string;
  doctor_id: string;
  timing: string;
  working_days: string;
  created_at: string;
  clinic_name: string;
  clinic_type: number;
}

interface ApiResponse {
  apiSuccess: number;
  resSuccess: number;
  doctorData: DoctorData[];
  clinicData: ClinicData[];
  address: AddressData[]; // Address data for doctor
  clinicAddress: AddressData[]; // Address data for clinic
  message: string;
}
export default function DoctorsProfile() {
  const [doctorData, setDoctorData] = useState<ApiResponse>({
    apiSuccess: 0,
    resSuccess: 0,
    doctorData: [],
    clinicData: [],
    address: [],
    clinicAddress: [],
    message: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        "http://15.207.112.23:8000/api/v1/doctors/get_clinic_doctors",
        {
          withCredentials: true,
        }
      );
      setDoctorData(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex">
      <Nav />
      <div className="bg-production-white2 flex flex-col justify-center items-center ">
        <div className="w-4/5 p-4 rounded-lg  m-4 items-center bg-production-indigo">
          <p className="text-md font-semibold text-black">Doctors Profile</p>
        </div>
        {doctorData.doctorData.map((doctor, index) => (
          <div className="flex w-full" key={index}>
            <div className="w-1/4  p-5 m-5 bg-blue-50 rounded-xl items-center flex flex-col justify-center">
              <Avatar
                className="size-48 bg-white text-production-indigo"
                sx={{ width: 120, height: 120 }} // Adjust Avatar size
              ></Avatar>

              <p className=" p-2 text-lg text-indigo-900 font-semibold flex-wrap max-w-[230px]">
                DR {doctor.first_name} {doctor.second_name}
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
                    AGE:{" "}
                    <span className="font-semibold text-black">
                      {doctor.DOB}
                    </span>
                  </p>
                  <p className="text-indigo-900 font-semibold pb-4">
                    GENDER:{" "}
                    <span className="font-semibold text-black">
                      {doctor.gender}
                    </span>
                  </p>
                  <p className="text-indigo-900 font-semibold pb-4">
                    PHONE No.:
                    <span className="font-semibold text-black">
                      {doctor.phone_number}
                    </span>
                  </p>
                  <p className="text-indigo-900 font-semibold">
                    EMAIL:
                    <span className="font-semibold text-black">
                      {doctor.email}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col p-6 justify-center text-center items-center">
                  <p className="text-indigo-900 font-semibold pb-4">
                    DEGREE:
                    <span className="font-semibold text-black">
                      {doctor.qualification} <span className="bracket">(</span>
                      <span className="bracket"> Neurologist)</span>
                    </span>
                  </p>
                  <p className="text-indigo-900 font-semibold pb-4">
                    SPECIALIZATION:{" "}
                    <span className="font-semibold text-black">
                      {doctor.specialization}
                    </span>
                  </p>
                  <p className="text-indigo-900 font-semibold pb-4">
                    EXPERIENCE:
                    <span className="font-semibold text-black">
                      {doctor.personal_clinic}
                    </span>
                  </p>
                  <p className="text-indigo-900 font-semibold ">
                    ADDRESS:
                    {doctorData.address.map((add) => (
                      <span
                        key={add.address_id}
                        className="font-semibold text-black   max-w-[100px] overflow-hidden   text-sm"
                      >
                        {add.house_number},{add.lane},{add.address_one},
                        {add.landmark},{add.city},{add.state},{add.country},
                        {add.pincode}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <DoctorProfileBody
          data={doctorData.clinicData}
          addressData={doctorData.clinicAddress}
        />
      </div>
    </div>
  );
}
