"use client";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { useState } from "react";
import { FaFilePrescription } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa";

interface PrescriptionData {
  _id: String;
  prescription_id: String;
  case_history: String;
  FollowUpDate: String;
  createdAt: String;
}

interface TableCardProps {
  prescriptions: PrescriptionData[];
  bill: any[];
}
type DateFormatType = {
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
  const option: DateFormatType = {
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

export function TableCard({ prescriptions, bill }: TableCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex flex-col items-center ml-32 w-3/4 p-6 bg-white shadow-lg">
      <h1 className="bg-indigo-500  font-bold text-white w-full rounded-t-lg p-1 pl-2">
        Visit History
      </h1>
      <table className="w-full bg-indigo-300 rounded-md  ">
        <thead>
          <tr className="flex gap-12 pl-6 p-2">
            <th className="ml-2">UID</th>
            <th className=" pl-32 ml-2 flex justify-center">Date</th>
            <th className="pl-20 ml-4  min-w-[350px]">Reason for visit</th>
            <th className="   min-w-[120px]">Follow Up</th>
            <th className="pr-6 ml-2">Prescription/Bill</th>
          </tr>
        </thead>
      </table>
      {prescriptions &&
        prescriptions.map((data) => (
          <div key={data._id.toString()} className="p-1">
            <table className="w-full bg-indigo-300 rounded-md">
              <tbody>
                <tr className="flex gap-12">
                  <td className="flex min-w-[100px] max-w-[100px] justify-center  items-center m-3 truncate   text-sm">
                    {data.prescription_id}
                  </td>

                  <p className="border-2 border-black"></p>
                  <td className="flex justify-center min-w-[150px] items-center  text-sm">
                    {formatDate(data.createdAt.toString())}
                  </td>
                  <p className="border-2 border-black"></p>
                  <td className="flex justify-center min-w-[150px] max-w-[200px] overflow-hidden  text-sm">
                    {data.case_history}
                  </td>

                  <p className="border-2 border-black"></p>
                  <td className="flex justify-center min-w-[100px] items-center  text-sm">
                    {data.FollowUpDate ?? "no follow-up"}
                  </td>

                  <p className="border-2 border-black"></p>
                  {isLoading ? (
                    <Backdrop
                      sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                      }}
                      open={isLoading} // Use isLoading state variable here
                    >
                      <CircularProgress color="inherit" />
                    </Backdrop>
                  ) : (
                    <>
                      <div className="flex justify-between  align-middle items-center min-w-40 text-sm pr-2">
                        <div>
                          <Link href={`/InvoiceAgain/${data.prescription_id}`}>
                            <td
                              onClick={() => setIsLoading(true)}
                              className="mr-10"
                            >
                              <FaFilePrescription className="size-10" />
                            </td>
                          </Link>
                        </div>

                        <div>
                          {bill
                            .filter(
                              (billItem) =>
                                billItem.prescription_id ===
                                data.prescription_id
                            )
                            .map((d: any, i: any) => (
                              <Link
                                href={{
                                  pathname: `/Bill/${d.prescription_id}`,
                                }}
                                key={i}
                              >
                                <td onClick={() => setIsLoading(true)}>
                                  <FaFileInvoice className="size-10" />
                                </td>
                              </Link>
                            ))}
                        </div>
                      </div>
                    </>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
}
