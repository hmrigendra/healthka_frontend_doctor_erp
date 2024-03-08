"use client";
import { Avatar } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFilePrescription } from "react-icons/fa";

export function TableManual2({ header1, header2, header3, header4 }: any) {
  interface ResponseData {
    age: Number;
    createdAt: Date;
    doctor_id: String;
    id: String;
    patient_id: String;
    patient_name: String;
    phone_number: String;
    prescription_id: String;
  }
  const [patients, setPatients] = useState<ResponseData[]>([]);

  type DateTimeFormatOption = {
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

  const formatDate = (dateString: string) => {
    const option: DateTimeFormatOption = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      option
    );
    return formattedDate;
  };
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
          <table
            className="shadow-sm flex flex-col justify-evenly hover:shadow-lg rounded-md w-full"
            key={index}
          >
            <tbody>
              <tr className="flex  p-2   items-center justify-around">
                <Link
                  key={index}
                  href={{
                    pathname: "/PatientProfile",
                    query: {
                      patient_id: patient.patient_id.toString(),
                    },
                  }}
                >
                  <td className="min-w-6 cursor-pointer ">
                    <Avatar
                      sx={{
                        width: 35,
                        height: 35,
                        borderRadius: "50%",
                        marginLeft: "-60",
                      }}
                    />
                  </td>
                </Link>

                <td className=" flex justify-center max-w-[200px] min-w-[200px]">
                  {patient.patient_name}
                </td>
                <td className=" min-w-[150px] flex justify-start overflow-hidden whitespace-nowrap truncate">
                  {patient.phone_number?.toString()}
                </td>
                <td className="min-w-[115px] flex justify-start overflow-hidden">
                  {formatDate(patient.createdAt.toString())}
                </td>
                <Link href={`/InvoiceAgain/${patient.prescription_id}`}>
                  <td className=" min-w-[100px] flex justify-center overflow-hidden text-sm font-semibold  ">
                    <FaFilePrescription className="size-10" />
                  </td>
                </Link>
              </tr>
            </tbody>
          </table>
        ))}
    </div>
  );
}
