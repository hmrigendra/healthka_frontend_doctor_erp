"use client";
import Link from "next/link";
import { Nav } from "../(Components)/Nav";
import { SearchBar } from "../(Components)/HeaderComponents/SearchBar";
import { Heading } from "../(Components)/MenuCardHeadings";
import { PrescriptionCardBody } from "../(Components)/PrescriptionCardBody";
import { CardBody } from "../(Components)/CardBody";
import { FollowUpSlider } from "../(Components)/SliderComponents/FollowUpSlider";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

export default function MenuCard() {
  const [isLoading, setIsLoading] = useState(false); // Corrected spelling of setIsLoading

  return (
    <div className="flex flex-row">
      <Nav />

      <div className="flex flex-col w-full min-h-screen bg-production-white2">
        <div className="w-full">
          <div>
            <SearchBar placeholder="Search..." />
          </div>
        </div>
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
            <div className="grid grid-cols-3 gap-x-8 w-full">
              <div
                onClick={() => setIsLoading(true)}
                className=" bg-blue-200 text- m-4 mt-8 ml-8 rounded-md cursor-pointer "
              >
                <Link href="/InvoiceAgain">
                  <Heading
                    heading="Add Prescription"
                    color="bg-production-green"
                  />
                  <PrescriptionCardBody />
                </Link>
              </div>

              <div
                onClick={() => setIsLoading(true)}
                className="bg-blue-200 m-4 mt-8 ml-8 rounded-md"
              >
                <Link href={"/MenuCard2"}>
                  <Heading
                    heading="Manage Records"
                    color="bg-production-blue"
                  />
                  <CardBody ImageData="/Records.jpg" altData="Records.icon" />
                </Link>
              </div>

              <div
                onClick={() => setIsLoading(true)}
                className="bg-blue-200 m-4 mt-8 ml-8 cursor-pointer rounded-md"
              >
                <Link href={"/Menucard"}>
                  <Heading
                    heading="Manage Patients"
                    color="bg-production-yellow"
                  />
                  <CardBody
                    ImageData="/ThePatients.jpg"
                    altData="Patients.icon"
                  />
                </Link>
              </div>
            </div>

            <FollowUpSlider />
          </>
        )}
      </div>
    </div>
  );
}
