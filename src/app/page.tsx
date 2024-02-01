import Image from "next/image";
import { Nav } from "@/app/(Components)/Nav";

import PatientProfile from "./PatientProfile/page";
import Table from "./Menucard/page";
import Invoice from "./Invoice/page";
import DoctorsProfile from "./DoctorsProfile/page";
import Services from "./Services/page";
import Appointment from "./FollowupsChart/page";
import MenuCard from "./Dashboard/page";

export default function Home() {
  return (
    <>
      <MenuCard />
    </>
  );
}
