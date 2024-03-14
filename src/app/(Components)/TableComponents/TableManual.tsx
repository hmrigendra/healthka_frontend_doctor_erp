"use client";
import { Avatar, Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Modal } from "../Modal";

export function TableManual({ header1, header2, header3, header4 }: any) {
  interface ResponseData {
    age: number;
    created_at: Date;
    doctor_id: string;
    _id: string;
    patient_id: string;
    patient_name: string;
    phone_number: string;
    gender: string;
  }

  const [patients, setPatients] = useState<ResponseData[] | null | undefined>(
    null
  );

  // for api
  const [length, setLength] = useState(0);

  //for the model
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const handleOnclose = () => setShowModal(false);

  //for the circular progress indicator
  const [isLoading, setIsLoading] = useState(false);

  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/patient/get_all_patient?page=${pageNumber}&pageSize=${pageSize}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.apiSuccess === 1 && response.data.resSuccess === 1) {
        setLength(response.data.nhHits);
        setPatients(response.data.data);
        setIsLoading(false);
      }

      if (response.data.apiSuccess === 1 && response.data.resSuccess === 0) {
        setMessage(response.data.message);
        setIsLoading(false);
        setShowModal(true);
        setLength(0);
      }
    } catch (error: any) {
      setIsLoading(false);
      // Network errors
      if (error.code === "ECONNREFUSED" || error.code === "ENETUNREACH") {
        setIsLoading(false);
        setShowModal(true);
        setMessage(
          "There is a network issue. Please check your internet connection or contact HealthKa."
        );
      }
      //  Axios errors
      else if (error.response) {
        //response error

        setIsLoading(false);
        setMessage("An error occurred while fetching patient data.");
        setShowModal(true);
      }
      //  other errors
      else {
        setIsLoading(false);
        setMessage("An error occurred while fetching patient data.");
        setShowModal(true);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [pageSize, setPageSize] = useState(6);
  const nPage = Math.ceil(length / pageSize);
  const numbers = [...Array(nPage + 1).keys()].slice(1);
  const [pageNumber, setPageNumber] = useState(1);

  const perviousPage = () => {
    if (pageNumber <= nPage && pageNumber > 1) {
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

  useEffect(() => {
    fetchPatients();
  }, [pageNumber, pageSize]);

  return (
    <div className="w-full">
      <Modal visible={showModal} onClose={handleOnclose} response={message} />
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
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
          {!patients ? (
            <p>No patients available.</p>
          ) : (
            <>
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
                  <table
                    onClick={() => setIsLoading(true)}
                    className="shadow-sm flex flex-col justify-around hover:shadow-lg rounded-md w-full"
                  >
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
            </>
          )}
        </div>
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
