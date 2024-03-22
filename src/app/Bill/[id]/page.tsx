"use client";
import { useEffect, useRef, useState } from "react";

import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import ReactToPrint from "react-to-print";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Modal } from "@/app/(Components)/Modal";
import { Header } from "@/app/(Components)/MainInvoiceComponent/Header";
import Services from "../../Services/page";
import { PatientData } from "../../(Components)/InvoiceComponents/PatientData";
import { data } from "../../../../public/practiceData";

export default function Bill({ params }: any) {
  const [service, setService] = useState([
    {
      service_name: "",
      service_charge: "",
    },
  ]);

  const getTotalCharges = () => {
    return service.reduce((total, current) => {
      return total + parseFloat(current.service_charge || "0");
    }, 0);
  };

  const componentRef = useRef(null);

  //Get Api Call
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const handleOnclose = () => setShowModal(false);
  //to handle CircularProgressIndicator
  const [isLoading, setIsLoading] = useState(false);
  const [PatientData, setPatientData] = useState({
    patient_name: "",
    phone_number: "",
    age: 0,
    gender: "",
  });

  const [dateTime, setDateTime] = useState({
    bill_date: "",
    bill_time: "",
  });

  const getApiCall = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/records/get_bill",
        {
          prescription_id: params.id,
        },
        {
          withCredentials: true,
        }
      );

      setService(response.data.data[0].services);
      const { data } = response.data;
      if (data && data.length > 0) {
        const { bill_date, bill_time } = data[0];
        setDateTime({
          bill_date: bill_date,
          bill_time: bill_time,
        });
      }

      const { data2 } = response.data;

      if (data2 && data2.length > 0) {
        const { patient_name, phone_number, age, gender } = data2[0];

        setPatientData({
          patient_name: patient_name,
          phone_number: phone_number,
          age: age,
          gender: gender,
        });
      } else {
        console.log("No patient data found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //doctor Data
  const [doctorData, setDoctorData] = useState({
    first_name: "",
    second_name: "",
    phone_number: "",
    email: "",
    qualification: "",
    specialization: "",
  });
  const [clinicAddress, setClinicAddress] = useState({
    house_number: "",
    lane: "",
    address_one: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    clinic_id: "",
  });
  interface ClinicProfile {
    clinic_name: string;
    clinic_phone_number: string;
    working_days: string;
    start_time: string;
    end_time: string;
  }

  const [clinicData, setClinicData] = useState<ClinicProfile>({
    clinic_name: "",
    clinic_phone_number: "",
    working_days: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    const storedDoctorData = JSON.parse(localStorage.getItem("doctor") || "{}");
    const storedClinicAddress = JSON.parse(
      localStorage.getItem("clinicAddress") || "{}"
    );
    const storedClinicData = JSON.parse(localStorage.getItem("clinic") || "{}");

    console.log(storedDoctorData);
    console.log(storedDoctorData[0].first_name);

    setDoctorData({
      first_name: storedDoctorData[0].first_name,
      second_name: storedDoctorData[0].second_name,
      phone_number: storedDoctorData[0].phone_number,
      email: storedDoctorData[0].email,
      qualification: storedDoctorData[0].qualification,
      specialization: storedDoctorData[0].specialization,
    });

    setClinicAddress({
      house_number: storedClinicAddress[0].house_number,
      lane: storedClinicAddress[0].lane,
      address_one: storedClinicAddress[0].address_one,
      landmark: storedClinicAddress[0].landmark,
      city: storedClinicAddress[0].city,
      state: storedClinicAddress[0].state,
      pincode: storedClinicAddress[0].pincode,
      country: storedClinicAddress[0].country,
      clinic_id: storedClinicAddress[0].clinic_id,
    });
    setClinicData({
      clinic_name: storedClinicData[0].clinic_name,
      clinic_phone_number: storedClinicData[0].clinic_phone_number,
      working_days: storedClinicData[0].working_days,
      start_time: storedClinicData[0].start_time,
      end_time: storedClinicData[0].end_time,
    });
    getApiCall();
  }, []);
  return (
    <main className="h-screen md:max-w-xl md:mx-auto xl:max-w-4xl xl:mx-auto m-5 p-5 rounded shadow-xl lg:max-w-xl lg:mx-auto bg-white">
      <Modal visible={showModal} onClose={handleOnclose} response={message} />
      <ReactToPrint
        trigger={() => (
          <button className="rounded-md p-2 pl-6 pr-6 bg-red-500 text-white font-semibold">
            print
          </button>
        )}
        content={() => componentRef.current}
      />

      <div ref={componentRef} className="p-10">
        {isLoading ? (
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <div className="flex flex-col min-h-[85vh]">
            <Header
              doctorData={doctorData}
              clinicAddress={clinicAddress}
              clinicData={clinicData}
            />

            <div className="flex justify-between p-3 border-b-2 border-black">
              <div>
                <p>
                  <span className="font-semibold mr-1"> Name : </span>
                  {PatientData.patient_name}{" "}
                </p>
                <p>
                  <span className="font-semibold mr-1"> Phone NO:</span>
                  {PatientData.phone_number}{" "}
                </p>
              </div>
              <div>
                <p>
                  {" "}
                  <span className="font-semibold mr-1">Age :</span>{" "}
                  {PatientData.age}
                </p>
                <p>
                  {" "}
                  <span className="font-semibold mr-1"> Gender :</span>
                  {PatientData.gender}
                </p>
              </div>
              <div>
                <p>
                  {" "}
                  <span className="font-semibold mr-1"> Date: </span>{" "}
                  {dateTime.bill_date}
                </p>
                <p>
                  {" "}
                  <span className="font-semibold mr-1"> Time: </span>
                  {dateTime.bill_time}
                </p>
              </div>
            </div>
            <div className="flex justify-center mb-1">
              <p className="text-2xl font-bold">Bill</p>
            </div>
            <div className="border-y-2 border-black"></div>
            {service.map((data, i) => (
              <div key={i} className="flex justify-between p-10">
                <p className="font-semibold text-xl">{data.service_name}</p>
                <p className="text-xl">Rs: {data.service_charge}</p>
              </div>
            ))}
            {/* Add this div for the total price */}
            <div className="border-t-2 border-black mt-auto p-2">
              <div className="flex justify-between">
                <p className="font-semibold text-xl">Total:</p>
                <p className="text-xl font-bold">Rs {getTotalCharges()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
