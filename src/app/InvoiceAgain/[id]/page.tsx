"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { FaMinusCircle } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import ReactToPrint from "react-to-print";
import { useRouter } from "next/navigation";
import { Header } from "@/app/(Components)/MainInvoiceComponent/Header";
import { CustomerData } from "@/app/(Components)/MainInvoiceComponent/CustomerData";
import { CaseHistory } from "@/app/(Components)/MainInvoiceComponent/CaseHistory";
import { Diagnosis } from "@/app/(Components)/MainInvoiceComponent/Diagnosis";
import { MedicineData } from "@/app/(Components)/MainInvoiceComponent/MedicineData";
import { GeneralAdvice } from "@/app/(Components)/MainInvoiceComponent/GeneralAdvice";
import { Referral } from "@/app/(Components)/MainInvoiceComponent/Referral";
import { NextVisit } from "@/app/(Components)/MainInvoiceComponent/NextVisit";
import { SurgeryAdvice } from "@/app/(Components)/MainInvoiceComponent/SurgeryAdvice";
import ClinicProfile from "../../ClinicProfile/page";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

export default function InvoicePage({ params }: any) {
  //for the model
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const handleOnclose = () => setShowModal(false);

  //for the circular progress indicator
  const [isLoading, setIsLoading] = useState(false);
  const getData = useCallback(async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/records/get_single_prescription`,
        {
          prescription_id: params.id,
        },
        {
          withCredentials: true,
        }
      );
      if (!response) {
        alert("Server Error , Something went wrong");
        console.log(response);
      } else {
        console.log(response);
      }

      const prescriptionData = response.data.data;

      setPatientData({
        patient_name: prescriptionData.patient_name,
        phone_number: prescriptionData.phone_number,
        age: prescriptionData.age,
        gender: prescriptionData.gender,
      });
      setComplains(prescriptionData.case_history);
      setDiagnosis(prescriptionData.diagnosis_history);
      setGeneralAdvice(prescriptionData.general_advice);
      setReferral(prescriptionData.referral);
      setSurgery(prescriptionData.surgery_advice);
      setFollowupDate(prescriptionData.FollowUpDate);
      setFollowupTime(prescriptionData.FollowUpTime);
      setTest(prescriptionData.diagnosis);
      setVitals(prescriptionData.vitals);
      setMedicineData(prescriptionData.medicine);
      setPrescriptionTime(prescriptionData.prescription_time);
      setPrescriptionDate(prescriptionData.prescription_date);

      // Handle response here
    } catch (error: any) {
      if (
        error.toJSON().code === "ERR_BAD_REQUEST" ||
        "ECONNREFUSED" ||
        "ENETUNREACH"
      ) {
        setIsLoading(false);
        setShowModal(true);
        setMessage(
          "There is a network issue please check your internet or else call  HealthKa"
        );
      } else {
        setIsLoading(false);
        setMessage(error.toJSON().message);
        setShowModal(true);
      }
    }
  }, [params.id]);

  const Router = useRouter();
  const SendCustomerData = () => {
    Router.push(`/Bill?customer_name=${patientData.patient_name}&number=${patientData.phone_number}
    &age=${patientData.age}&gender=${patientData.gender}`);
  };

  const handlePrint = () => {
    window.print();
  };

  //Use State division for data

  //Doctors

  //Customer
  const [patientData, setPatientData] = useState({
    patient_name: "",
    phone_number: "",
    age: 0,
    gender: "",
  });

  // prescription_date & prescription_time
  const [prescriptionDate, setPrescriptionDate] = useState("");
  const [prescriptionTime, setPrescriptionTime] = useState("");

  //Complains
  const [case_history, setComplains] = useState("");

  const [vitals, setVitals] = useState([{ vites_name: "", vite_result: "" }]);

  const addVitals = () => {
    setVitals([
      ...vitals,
      {
        vites_name: "",
        vite_result: "",
      },
    ]);
  };
  const removeVitals = (indexToRemove: number) => {
    setVitals((params) => {
      return params.filter((_, index) => index !== indexToRemove);
    });
  };
  const handleVitalsChange = (index: number, field: string, value: string) => {
    const updatedVitals = [...vitals];
    updatedVitals[index][field as keyof (typeof vitals)[0]] = value;
    setVitals(updatedVitals);
  };

  //Diagnosis
  const [diagnosis_history, setDiagnosis] = useState("");

  //Medicine
  const [medicineData, setMedicineData] = useState([
    {
      medicine_name: "",
      medicine_type: "",
      dose: "",
      advice: "",
      time: "",
      duration: "",
      dose_code: "",
    },
  ]);
  const handleMedicineChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedMedicine = [...medicineData];
    updatedMedicine[index][field as keyof (typeof medicineData)[0]] = value;
    setMedicineData(updatedMedicine);
  };

  const removeMedicine = (indexToRemove: number) => {
    setMedicineData((prevMedicineData) =>
      prevMedicineData.filter((_, index) => index !== indexToRemove)
    );
  };

  const addMedicineData = () => {
    setMedicineData([
      ...medicineData,
      {
        medicine_name: "",
        medicine_type: "",
        dose: "",
        time: "",
        duration: "",
        advice: "",
        dose_code: "",
      },
    ]);
  };

  //Doctor

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
  //General advice
  const [general_advice, setGeneralAdvice] = useState("");
  //Referral
  const [referral, setReferral] = useState("");
  //Surgery advice
  const [surgery_advice, setSurgery] = useState("");

  //Page Navigation
  const [active, setActive] = useState(true);

  //followup date

  const [FollowUpDate, setFollowupDate] = useState("");
  //followup time
  const [FollowUpTime, setFollowupTime] = useState("");

  //Test
  const [test, setTest] = useState([
    {
      test_name: "",
      advice: "",
    },
  ]);

  const addNewTest = () => {
    setTest([...test, { test_name: "", advice: "" }]);
  };
  const removeTest = (i: number) => {
    setTest((data) => data.filter((_, index) => index !== i));
  };
  const handleTestChange = (index: number, field: string, value: string) => {
    const updatedTest = [...test];
    updatedTest[index][field as keyof (typeof test)[0]] = value;
    setTest(updatedTest);
  };

  useEffect(() => {
    getData();
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
  }, [getData]);
  const componentRef = useRef(null);

  return (
    <main className=" md:max-w-xl md:mx-auto  xl:max-w-4xl xl:mx-auto m-5 p-5 rounded shadow-xl lg:max-w-xl lg:mx-auto bg-white">
      <ReactToPrint
        trigger={() => (
          <button className="rounded-md p-2 pl-6 pr-6 bg-red-500 text-white font-semibold">
            print
          </button>
        )}
        content={() => componentRef.current}
      />
      {active === true && (
        <div className="p-5" ref={componentRef}>
          <Header
            doctorData={doctorData}
            clinicAddress={clinicAddress}
            clinicData={clinicData}
          />
          <CustomerData
            patientData={patientData}
            prescriptionDate={prescriptionDate}
            prescriptionTime={prescriptionTime}
          />
          <CaseHistory case_history={case_history} vitals={vitals} />

          {diagnosis_history.length > 1 ||
          test.some((data) => data.test_name.length > 1) ? (
            <Diagnosis diagnosis_history={diagnosis_history} test={test} />
          ) : null}

          <MedicineData medicineData={medicineData} />
          {general_advice.length > 1 ? (
            <GeneralAdvice general_advice={general_advice} />
          ) : null}

          {referral.length > 1 ? <Referral referral={referral} /> : null}
          {FollowUpDate.length > 1 || FollowUpTime.length > 1 ? (
            <NextVisit
              FollowUpDate={FollowUpDate}
              FollowUpTime={FollowUpTime}
            />
          ) : null}
          {surgery_advice.length > 1 ? (
            <SurgeryAdvice surgery_advice={surgery_advice} />
          ) : null}
        </div>
      )}

      {active === true && (
        <div className="flex flex-row justify-between">
          <div className="">
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
              <button
                onClick={SendCustomerData}
                className="p-2 pl-6 pr-6 bg-green-500 text-white font-semibold"
              >
                Bill
              </button>
            )}
          </div>
        </div>
      )}
      {active === false && (
        <div>
          <div id="customer" className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="patient_name" className="mb-1">
                Patient Name
              </label>
              <input
                type="text"
                name="patient_name"
                className="border-2 border-gray-300 rounded-md"
                value={patientData.patient_name}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    patient_name: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone_number" className="mb-1">
                Phone number
              </label>
              <input
                type="text"
                name="phone_number"
                className="border-2 border-gray-300 rounded-md"
                value={patientData.phone_number}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    phone_number: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex">
              <label htmlFor="patient_gender" className="mb-1">
                Patient Gender
              </label>
              <select
                name="patient_gender"
                className="border-2 border-gray-300 rounded-md ml-2 mr-2"
                value={patientData.gender}
                onChange={(e) =>
                  setPatientData({ ...patientData, gender: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex ">
              <label htmlFor="patient_gender" className="mb-1">
                Patient Age
              </label>
              <input
                type="number"
                name="patient_age"
                className="border-2 border-gray-300 rounded-md ml-2 mr-2"
                value={patientData.age}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    age: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="chief_complains">Chief Complains</label>
            <textarea
              name="message"
              id="message"
              className="border-2 border-gray-400 resize-y w-full min-h-24  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
              value={case_history}
              onChange={(e) => setComplains(e.target.value)}
            ></textarea>
            <p>systematic_history</p>

            <div>
              {vitals.map((vital, index) => (
                <div key={index} className="flex mb-2">
                  <label htmlFor={`vitals_name_${index}`}>Vitals name</label>
                  <input
                    type="text"
                    name={`vites_name${index}`}
                    value={vital.vites_name}
                    onChange={(e) =>
                      handleVitalsChange(index, "vites_name", e.target.value)
                    }
                    className="border-2 border-gray-400 w-36 ml-2 mr-2"
                  />
                  <label htmlFor={`result_${index}`}>Result</label>
                  <input
                    type="text"
                    name={`vite_result${index}`}
                    value={vital.vite_result}
                    onChange={(e) =>
                      handleVitalsChange(index, "vite_result", e.target.value)
                    }
                    className="border-2 border-gray-400 w-36 ml-2 mr-2"
                  />
                  <FaPlusCircle
                    className="size-4 mr-2 items-center mt-1"
                    onClick={addVitals}
                  />
                  {index > 0 && (
                    <FaMinusCircle
                      className="size-4 items-center mt-1"
                      onClick={() => removeVitals(index)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="Diagnosis">Diagnosis</label>
            <textarea
              name="message"
              id="message"
              value={diagnosis_history}
              className="border-2 border-gray-400 resize-y w-full min-h-16  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
              onChange={(e) => setDiagnosis(e.target.value)}
            ></textarea>
          </div>
          <div>
            <p>Test </p>

            {test.map((data, i) => (
              <div key={i} className="flex">
                <label htmlFor="systematic_history">Test name</label>
                <input
                  type="text"
                  name="test_name"
                  className="border-2 border-gray-400 w-36 ml-2 mr-2"
                  value={data.test_name}
                  onChange={(e) =>
                    handleTestChange(i, "test_name", e.target.value)
                  }
                />
                <label htmlFor="systematic_history">Message</label>
                <input
                  type="text"
                  name={`advice_${i}`}
                  className="border-2 border-gray-400 w-36 ml-2 mr-2"
                  value={data.advice}
                  onChange={
                    (e) => handleTestChange(i, "advice", e.target.value) // Changed "message" to "note"
                  }
                />

                {i > 0 && (
                  <FaMinusCircle
                    className="mt-2 mr-2"
                    onClick={() => removeTest(i)}
                  />
                )}
                {<FaPlusCircle className="mt-2" onClick={addNewTest} />}
              </div>
            ))}
          </div>
          <div>
            <p>Medicine </p>
            {medicineData.map((data, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col">
                  <label htmlFor={`medicine_name_${i}`}>Medicine name</label>
                  <input
                    type="text"
                    name={`medicine_name_${i}`}
                    className="border-2 border-gray-400 w-52 ml-2 mr-2"
                    value={data.medicine_name}
                    onChange={(e) => {
                      console.log("====================================");
                      console.log(e.target.value);
                      console.log("====================================");
                      return handleMedicineChange(
                        i,
                        "medicine_name",
                        e.target.value
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`type_${i}`}>Type</label>
                  <input
                    type="text"
                    name={`medicine_type_${i}`}
                    className="border-2 border-gray-400 w-36 ml-2 mr-2"
                    value={data.medicine_type}
                    onChange={(e) =>
                      handleMedicineChange(i, "medicine_type", e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`dose_${i}`}>Dose</label>
                  <input
                    type="text"
                    name={`dose_${i}`}
                    className="border-2 border-gray-400 w-10 ml-2 mr-2"
                    value={data.dose}
                    onChange={(e) =>
                      handleMedicineChange(i, "dose", e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`time_${i}`}>Time</label>
                  <input
                    type="text"
                    name={`time_${i}`}
                    className="border-2 border-gray-400 w-10 ml-2 mr-2"
                    value={data.time}
                    onChange={(e) =>
                      handleMedicineChange(i, "time", e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`duration_${i}`}>Duration</label>
                  <input
                    type="text"
                    name={`duration_${i}`}
                    className="border-2 border-gray-400 w-20 ml-2 mr-2"
                    value={data.duration}
                    onChange={(e) =>
                      handleMedicineChange(i, "duration", e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`advice${i}`}>Note</label>
                  <input
                    type="text"
                    name={`advice_${i}`}
                    className="border-2 border-gray-400 w-34 ml-2"
                    value={data.advice}
                    onChange={(e) =>
                      handleMedicineChange(i, "advice", e.target.value)
                    }
                  />
                </div>
                {i > 0 && (
                  <FaMinusCircle
                    className="mt-5 mr-1"
                    onClick={() => removeMedicine(i)}
                  />
                )}
                {
                  <FaPlusCircle
                    className="mt-5 mr-1"
                    onClick={addMedicineData}
                  />
                }
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="chief_complains">General Advice</label>
            <textarea
              name="message"
              id="message"
              value={general_advice}
              onChange={(e) => setGeneralAdvice(e.target.value)}
              className="border-2 border-gray-400 resize-y w-full min-h-16  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            ></textarea>
          </div>
          <div>
            <label htmlFor="referral">Referral</label>
            <input
              type="text"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              placeholder="Name of any Doctor or Hospital"
              className="border-2 border-gray-400 resize-y w-1/2 ml-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="follow_up">Follow up</label>
            <input
              value={FollowUpDate}
              onChange={(e) => setFollowupDate(e.target.value)}
              type="date"
              className="border-2 border-black ml-2"
            />

            <label htmlFor="follow_up_time">Follow up Time</label>
            <input
              type="time"
              id="follow_up_time"
              name="follow_up_time"
              className="border-2 border-black ml-2"
              value={FollowUpTime}
              onChange={(e) => setFollowupTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="chief_complains">Surgery Advice</label>
            <textarea
              name="message"
              value={surgery_advice}
              onChange={(e) => setSurgery(e.target.value)}
              id="message"
              className="border-2 border-gray-400 resize-y w-full min-h-16  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            ></textarea>
          </div>
          <button
            className="p-2 pl-10 pr-10 bg-blue-500 text-white font-semibold"
            onClick={() => setActive(true)}
          >
            Done
          </button>
        </div>
      )}
    </main>
  );
}
