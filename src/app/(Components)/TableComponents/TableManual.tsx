import { Avatar } from "@mui/material";
import Link from "next/link";

export function TableManual() {
  return (
    <div className="w-full">
      <table className="bg-production-white rounded-md w-full ">
        <thead className="">
          <tr className="flex gap-x-24 p-2 items-center justify-evenly">
            <th className="">
              <Avatar
                sx={{
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  marginLeft: "-60",
                }}
              />
            </th>
            <th>Name</th>
            <th>Phone No.</th>
            <th>Reason of visit</th>
            <th>ID</th>
          </tr>
        </thead>
      </table>
      <Link href={"/PatientProfile"}>
        <table className="shadow-sm hover:shadow-lg rounded-md w-full">
          <tbody className="">
            <tr className="flex gap-x-16 p-2 items-center justify-evenly">
              <td className="min-w-6 pl-5">Profile</td>
              <td className=" max-w-24 overflow-hidden text-sm font-semibold whitespace-nowrap truncate">
                Srinivasasdbjb
              </td>
              <td className="min-w-8">1234567890</td>
              <td className="max-w-[220px] overflow-hidden whitespace-nowrap truncate">
                some big story idk what
              </td>
              <td className="">123456</td>
            </tr>
          </tbody>
        </table>
      </Link>
    </div>
  );
}
