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
    _id: String;
    patient_id: String;
    patient_name: String;
    phone_number: String;
    gender: String;
  }
  const [patients, setPatients] = useState<ResponseData[]>([]);

  const fetchPatients = async () => {
    try {
      // Fetch data from server-side endpoint
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/patient/get_all_patient`,
        {
          withCredentials: true, // Include credentials (cookies) in the request
        }
      );
      console.log("====================================");
      console.log(response.data.data[0].created_at);

      console.log("====================================");
      setPatients(response.data.data);
    } catch (error: any) {
      if (error.response) {
        throw new Error(error);
      } else {
        console.error("Error fetching patients:", error);
      }
    }
  };
  type DateTimeFormatOptions = {
    year?: "numeric" | "2-digit";
    month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
    day?: "numeric" | "2-digit";
    hour?: "numeric" | "2-digit";
    minute?: "numeric" | "2-digit";
    second?: "numeric" | "2-digit";
    timeZoneName?: "long" | "short";
    timeZone?: string;
    hour12?: boolean;
    weekday?: "long" | "short" | "narrow";
    era?: "long" | "short" | "narrow";
  };

  // Function to format date to human-readable format
  const formatDate = (dateString: string) => {
    const options: DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  useEffect(() => {
    fetchPatients();
  }, []);
  return (
    <div className="w-full">
      <div>
        <table className="bg-production-white rounded-md w-full ">
          <thead className="">
            <tr className="flex gap-x-16 p-2 items-center justify-around">
              <th className="">Profile</th>
              <th>{header1}</th>
              <th>{header2}</th>
              <th className="pr-20">{header3}</th>
              <th className="pr-6">{header4}</th>
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
            <table className="shadow-sm flex flex-col justify-around hover:shadow-lg rounded-md w-full">
              <tbody>
                <tr className="flex  p-2   items-center justify-around">
                  <td className=" ">
                    <Avatar
                      sx={{
                        width: 35,
                        height: 35,
                        borderRadius: "50%",
                        marginLeft: "-60",
                      }}
                    />
                  </td>
                  <td className=" max-w-[115px] min-w-[115px]   overflow-hidden text-sm font-semibold whitespace-nowrap truncate">
                    {patient.patient_name}
                  </td>
                  <td className="">{patient.phone_number}</td>
                  <td className="min-w-[50px]  overflow-hidden whitespace-nowrap truncate">
                    {/* Assuming you have a reasonOfVisit property in your patient data */}
                    {formatDate(patient.created_at.toString())}
                  </td>
                  <td className="items-end flex justify-end min-w-[155px] ">
                    {patient.gender}
                  </td>
                </tr>
              </tbody>
            </table>
          </Link>
        ))}
      </div>
      {/* <div className="shadow-lg m-4 inline-block rounded-lg overflow-hidden">
        <ul className="flex gap-4 items-center justify-center bg-white">
          <li className="px-4 py-2 text-gray-600 hover:text-gray-900 cursor-pointer">
            Prev
          </li>
          <li className="px-4 py-2 border-l border-gray-300">1</li>
          <li className="px-4 py-2 border-l border-gray-300">2</li>
          <li className="px-4 py-2 border-l border-gray-300">3</li>
          <li className="px-4 py-2 border-l border-gray-300">Next</li>
        </ul>
      </div> */}
    </div>
  );
}
