import Image from "next/image";
import { Nav } from "@/app/(Components)/Nav";

import PatientProfile from "./PatientProfile/page";
import Table from "./Menucard/page";

import DoctorsProfile from "./DoctorsProfile/page";
import Services from "./Services/page";
import Appointment from "./FollowupsChart/page";
import MenuCard from "./Dashboard/page";
import Login from "./LoginPage/page";
import SignUp from "./signup/page";
import InvoicePage from "./InvoiceAgain/page";
import Bill from "./Bill/page";

export default function Home() {
  return (
    <>
      <Login />
    </>
  );
}
