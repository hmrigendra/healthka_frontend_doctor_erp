import Link from "next/link";
import { Nav } from "../(Components)/Nav";
import { SearchBar } from "../(Components)/HeaderComponents/SearchBar";
import { Heading } from "../(Components)/MenuCardHeadings";
import { PrescriptionCardBody } from "../(Components)/PrescriptionCardBody";
import { CardBody } from "../(Components)/CardBody";
import { FollowUpSlider } from "../(Components)/SliderComponents/FollowUpSlider";

export default function MenuCard() {
  return (
    <div className="flex flex-row">
      <Nav />

      <div className="flex flex-col w-full min-h-screen bg-production-white2">
        <div className="w-full">
          <div>
            <SearchBar placeholder="somedata" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-8 w-full">
          <div className=" bg-blue-200 text- m-4 mt-8 ml-8 rounded-md cursor-pointer ">
            <Link href={"/Invoice"}>
              <Heading heading="Add Prescription" color="bg-production-green" />
              <PrescriptionCardBody />
            </Link>
          </div>

          <div className="bg-blue-200 m-4 mt-8 ml-8 rounded-md">
            <Link href={"/Menucard"}>
              <Heading heading="Manage Records" color="bg-production-blue" />
              <CardBody ImageData="/Records.jpg" altData="Records.icon" />
            </Link>
          </div>

          <div className="bg-blue-200 m-4 mt-8 ml-8 cursor-pointer rounded-md">
            <Link href={"/Menucard"}>
              <Heading heading="Manage Patients" color="bg-production-yellow" />
              <CardBody ImageData="/ThePatients.jpg" altData="Patients.icon" />
            </Link>
          </div>
        </div>
        <FollowUpSlider />
      </div>
    </div>
  );
}
