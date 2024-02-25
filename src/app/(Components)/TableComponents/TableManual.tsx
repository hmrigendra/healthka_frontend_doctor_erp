"use client";
import { Avatar } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export function TableManual({ header1, header2, header3, header4 }: any) {
  interface ResponseData {
    age: Number;
    created_at: Date;
    doctor_id: String;
    id: String;
    patient_id: String;
    patient_name: String;
    phone_number: String;
  }
  const [patients, setPatients] = useState<ResponseData[]>([]);

  const fetchPatients = async () => {
    try {
      // Fetch data from server-side endpoint
      const response = await axios.get(
        "http://localhost:8000/api/v1/patient/get_all_patient",
        {
          withCredentials: true, // Include credentials (cookies) in the request
        }
      );

      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);
  return (
    <div className="w-full">
      <table className="bg-production-white rounded-md w-full ">
        <thead className="">
          <tr className="flex gap-x-24 p-2 items-center justify-evenly">
            <th className="">Profile</th>
            <th>{header1}</th>
            <th>{header2}</th>
            <th>{header3}</th>
            <th>{header4}</th>
          </tr>
        </thead>
      </table>
      {patients.map((patient, index) => (
        <Link
          key={index}
          href={{
            pathname: "/PatientProfile",
            query: {
              patient_id: patient.patient_id.toString(),
            },
          }}
        >
          <table className="shadow-sm flex flex-col justify-evenly hover:shadow-lg rounded-md w-full">
            <tbody>
              <tr className="flex gap-x-20 p-2  items-center justify-evenly">
                <td className="min-w-6 ">
                  {" "}
                  <Avatar
                    sx={{
                      width: 35,
                      height: 35,
                      borderRadius: "50%",
                      marginLeft: "-60",
                    }}
                  />
                </td>
                <td className=" max-w-16 overflow-hidden text-sm font-semibold whitespace-nowrap truncate">
                  {patient.patient_name}
                </td>
                <td className="">{patient.phone_number}</td>
                <td className="max-w-[115px] overflow-hidden whitespace-nowrap truncate">
                  {/* Assuming you have a reasonOfVisit property in your patient data */}
                  {patient.created_at.toString()}
                </td>
                <td className="">{patient.id}</td>
              </tr>
            </tbody>
          </table>
        </Link>
      ))}
    </div>
  );
}
