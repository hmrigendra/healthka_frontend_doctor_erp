"use client";
import { Avatar } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export function TableManual2({ header1, header2, header3, header4 }: any) {
  interface ResponseData {
    age: Number;
    createdAt: Date;
    doctor_id: String;
    id: String;
    patient_id: String;
    patient_name: String;
    phone_number: String;
  }
  const [patients, setPatients] = useState<ResponseData[]>([]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/records/get_prescription`,
        {
          withCredentials: true,
        }
      );
      const realData = response.data.data;
      console.log(response.data.data);

      setPatients(realData);
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
          <tr className="flex gap-x-20 pt-2 pb-2 items-center justify-evenly">
            <th className="">Profile</th>
            <th>{header1}</th>
            <th>{header2}</th>
            <th>{header3}</th>
            <th>{header4}</th>
          </tr>
        </thead>
      </table>
      {Array.isArray(patients) &&
        patients.map((patient, index) => (
          <Link
            key={index}
            href={{
              pathname: "/PatientProfile",
              query: {
                patient_id: patient.patient_id.toString(),
              },
            }}
          >
            <table
              className="shadow-sm flex flex-col justify-evenly hover:shadow-lg rounded-md w-full"
              key={index}
            >
              <tbody>
                <tr className="flex  p-2   items-center justify-around">
                  <td className="min-w-6  ">
                    <Avatar
                      sx={{
                        width: 35,
                        height: 35,
                        borderRadius: "50%",
                        marginLeft: "-60",
                      }}
                    />
                  </td>
                  <td className=" max-w-28 overflow-hidden text-sm font-semibold whitespace-nowrap truncate">
                    {patient.patient_id}
                  </td>
                  <td className="pl-10">{patient.patient_name}</td>
                  <td className="max-w-[115px] overflow-hidden whitespace-nowrap truncate">
                    {patient.phone_number?.toString()}
                  </td>
                  <td className="max-w-[115px] overflow-hidden">
                    {patient.createdAt.toString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </Link>
        ))}
    </div>
  );
}
