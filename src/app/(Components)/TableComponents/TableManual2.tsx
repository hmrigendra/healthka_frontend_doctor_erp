"use client";
import { Avatar, Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFilePrescription } from "react-icons/fa";
import { Modal } from "../Modal";

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
  //Pagination
  const [length, setLength] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const nPage = Math.ceil(length / pageSize);

  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const perviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    } else {
      alert("You are on your Index page");
    }
  };
  const nextPage = () => {
    if (pageNumber < nPage) {
      setPageNumber(pageNumber + 1);
    }
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
  //Model || popup
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const handleOnclose = () => setShowModal(false);
  const fetchPatients = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching data
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/records/get_prescription?page=${pageNumber}&pageSize=${pageSize}`,
        {
          withCredentials: true,
        }
      );
      const realData = response.data.data;

      if (response.data.apiSuccess === 1 && response.data.resSuccess === 1) {
        setLength(response.data.nhHists);
        setPatients(realData);
      }

      if (response.data.apiSuccess === 1 && response.data.resSuccess === 0) {
        setMessage(response.data.message);
        setShowModal(true);
      }
    } catch (error: any) {
      setIsLoading(false);
      setMessage(error.message);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [pageNumber, pageSize]);

  return (
    <div className="w-full">
      <Modal visible={showModal} onClose={handleOnclose} response={message} />
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading} // Use isLoading state variable here
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
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

          {length === 0 ? (
            <p>No data found</p>
          ) : (
            Array.isArray(patients) &&
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
                      <td
                        onClick={() => setIsLoading(true)}
                        className="min-w-6 cursor-pointer "
                      >
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
                      <td
                        onClick={() => setIsLoading(true)}
                        className=" min-w-[100px] flex justify-center overflow-hidden text-sm font-semibold  "
                      >
                        <FaFilePrescription className="size-10" />
                      </td>
                    </Link>
                  </tr>
                </tbody>
              </table>
            ))
          )}
        </>
      )}
      <div className="shadow-lg m-4 inline-block rounded-lg overflow-hidden border-2 border-gray-400">
        <ul className="flex gap-4 items-center justify-center bg-white">
          <li
            onClick={perviousPage}
            className=" px-4 py-2 hover:bg-slate-400  text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            Prev
          </li>
          {numbers.map((n, i) => (
            <li
              key={i}
              className={`px-4 py-2 border-l border-gray-300 ${
                pageNumber === n
                  ? "bg-blue-500 text-white"
                  : "hover:bg-slate-400 hover:text-gray-900"
              }`}
              onClick={() => setPageNumber(n)}
            >
              {n}
            </li>
          ))}
          <li
            onClick={nextPage}
            className="px-4 cursor-pointer py-2 hover:bg-slate-400  border-l border-gray-300"
          >
            Next
          </li>
        </ul>
      </div>
    </div>
  );
}
