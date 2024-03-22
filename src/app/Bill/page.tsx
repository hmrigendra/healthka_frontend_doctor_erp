"use client";
import { useEffect, useRef, useState } from "react";
import { Header } from "../(Components)/MainInvoiceComponent/Header";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import ReactToPrint from "react-to-print";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Services from "../Services/page";
import { Modal } from "../(Components)/Modal";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Bill() {
  const [edit, setEdit] = useState(false);

  const router = useSearchParams();
  const name = router.get("customer_name");
  const age = router.get("age");
  const gender = router.get("gender");
  const number = router.get("number");
  const patient_id = router.get("patient_id");
  const prescription_id = router.get("prescription_id");

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

  const addNewService = () => {
    setService([...service, { service_name: "", service_charge: "" }]);
  };

  const removeService = (i: number) => {
    setService((data) => data.filter((_, index) => index !== i));
  };

  const handleTestChange = (index: number, field: string, value: string) => {
    const updateService = [...service];
    updateService[index][field as keyof (typeof service)[0]] = value;
    setService(updateService);
  };
  const handlePrint = () => {
    window.print();
  };
  const componentRef = useRef(null);

  //Post Api Call
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const handleOnclose = () => setShowModal(false);
  //to handle CircularProgressIndicator
  const [isLoading, setIsLoading] = useState(false);

  const saveBill = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/v1/records/create_bill",
        {
          services: service,
          bill_time: TimeOutPut(),
          bill_date: outPut(),
          invoice: getFirstDigit(),
          patient_id: patient_id,
          prescription_id: prescription_id,
        },
        {
          withCredentials: true,
        }
      );
      setIsLoading(false);
      if (response.data.apiSuccess === 1) {
        setMessage("Bill created Successfully"), setShowModal(true);
        setIsLoading(false);
      }
      if (!response || response.data.apiSuccess === 0) {
        setMessage(response.data.message);
        setShowModal(true);
        setIsLoading(false);
      }
    } catch (error: any) {
      setMessage(error.message);
      setShowModal(true);
      setIsLoading(false);
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
  const outPut = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    return formattedDate;
  };
  const TimeOutPut = () => {
    const currentDate = new Date();
    const formattedTime = `${currentDate.getHours()}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    return formattedTime;
  };
  const getFirstDigit = () => {
    const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);

    // Concatenate the first digits to create the invoice number
    const invoiceNumber = `#${randomSixDigitNumber.toString()} `;
    console.log(invoiceNumber);

    return invoiceNumber;
  };
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
    getFirstDigit();
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
      {edit && (
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
                  <p>Name : {name}</p>
                  <p>Phone NO: {number}</p>
                </div>
                <div>
                  <p>Age :{age}</p>
                  <p>Gender :{gender}</p>
                </div>
                <div>
                  <p>Date:{outPut()}</p>
                  <p>TIme:{TimeOutPut()}</p>
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
      )}

      {edit && (
        <div className="p-5 flex justify-around">
          <button
            onClick={() => setEdit(!edit)}
            className="p-2 pl-6 pr-6 bg-blue-500 text-white font-semibold rounded-md"
          >
            EDIT
          </button>

          <button
            onClick={saveBill}
            className="p-2 pl-6 pr-6 bg-green-600 text-white font-semibold rounded-md"
          >
            Save
          </button>
        </div>
      )}
      {edit === false && (
        <div>
          <div className="flex justify-center mb-10 font-bold text-2xl">
            <p>BIll</p>
          </div>
          {service.map((data, i) => (
            <div key={i} className="flex justify-between m-1">
              <div className="">
                <label className="p-1" htmlFor="service_name">
                  Service name
                </label>
                <input
                  className="border-2 rounded-md p-1 border-gray-400"
                  type="text"
                  placeholder="Service Name"
                  value={data.service_name}
                  onChange={(e) =>
                    handleTestChange(i, "service_name", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="p-1" htmlFor="charges">
                  Charges
                </label>
                <input
                  type="text"
                  className="border-2 rounded-md p-1 border-gray-400"
                  placeholder="Charges"
                  value={data.service_charge}
                  onChange={(e) =>
                    handleTestChange(i, "service_charge", e.target.value)
                  }
                />
              </div>

              <div>
                <FaPlusCircle onClick={addNewService} className="size-5 mt-2" />
              </div>
              {i > 0 && (
                <FaMinusCircle
                  className="size-5 mt-2"
                  onClick={() => removeService(i)}
                />
              )}
            </div>
          ))}
          <div className="p-5">
            <button
              onClick={() => setEdit(!edit)}
              className="p-2 pl-6 pr-6 bg-blue-500 text-white font-semibold rounded-md"
            >
              EDIT
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
