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
import { IoIosArrowDown } from "react-icons/io";
import { Modal } from "@/app/(Components)/Modal";

export default function InvoicePage({ params, followUp }: any) {
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
      console.log("this is for patient_id", response.data.data.patient_id);

      setPatientData({
        patient_id: response.data.data.patient_id,
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
  }, [params.id]);

  const Router = useRouter();
  const SendCustomerData = () => {
    Router.push(`/Bill?customer_name=${patientData.patient_name}&number=${patientData.phone_number}
    &age=${patientData.age}&gender=${patientData.gender}&patient_id=${patientData.patient_id}&prescription_id=${params.id}`);
  };

  const handlePrint = () => {
    window.print();
  };

  //Use State division for data

  //Doctors

  //Customer
  const [patientData, setPatientData] = useState({
    patient_id: "",
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
      dose_unit: "",
      duration_unit: "",
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
        dose_unit: "",
        duration_unit: "",
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

  //Set Error
  const [errors, setErrors] = useState(false);
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

  const [symptom, setSymptom] = useState("");
  useEffect(() => {
    if (symptom.length > 2) {
      // Find the index of the last space character
      const lastSpaceIndex = symptom.lastIndexOf(" ");

      // Extract the substring after the last space character
      const symptomWithoutPrefix =
        lastSpaceIndex !== -1 ? symptom.substring(lastSpaceIndex + 1) : symptom;

      const fetchData = async () => {
        try {
          console.log(symptomWithoutPrefix);

          const response = await axios.post(
            "http://localhost:8000/api/v1/prediction/Symptoms",
            {
              complaint: symptomWithoutPrefix,
            }
          );

          if (response.data.apiSuccess === 0) {
            setSymptom("");
          }
          if (response.data.apiSuccess === 1) {
            setSymptom(response.data.data[0].Symptom);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } else {
      setSymptom("");
    }
  }, [case_history]);

  const [apiPatientData, setApiPatientData] = useState([
    {
      patient_name: "",
      phone_number: "",
      age: 0,
      gender: "",
      patient_id: "",
    },
  ]);
  const handleChangePrediction = (e: any) => {
    setSymptom(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === " ") {
      setSymptom("");
    }
    if (e.key === "Tab" && symptom) {
      e.preventDefault();
      if (case_history.length < 6) {
        setComplains(symptom);
        setSymptom("");
      } else {
        const lastIndex = case_history.lastIndexOf(" ");

        // Extract the substring before the last space
        const prefix = case_history.slice(0, lastIndex + 1); // Adding 1 to include the space

        if (
          symptom === "Months" ||
          symptom === "Weeks" ||
          symptom === "Days" ||
          symptom === "Years" ||
          symptom === "Hours"
        ) {
          const newCaseHistory = prefix + (case_history ? "" : "") + symptom;
          setComplains(newCaseHistory);
          setSymptom("");
        } else {
          const newCaseHistory = prefix + (case_history ? ", " : "") + symptom;
          setComplains(newCaseHistory);
          setSymptom("");
        }

        // Update case_history and reset symptom
      }
    }
  };
  //Create Prescription
  const outPut = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    return formattedDate;
  };
  const TimeOutPut = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const formattedTime = `${hours}:${String(minutes).padStart(2, "0")}`;
    return formattedTime;
  };
  const CreatePrescription = async () => {
    try {
      // input Validator

      if (
        patientData.patient_name.length === 0 ||
        patientData.phone_number.length < 9 ||
        patientData.age === 0 ||
        patientData.gender.length === 0
      ) {
        setShowModal(true);
        setErrors(true);
      } else {
        const realData = outPut();
        const realTime = TimeOutPut();
        setIsLoading(true);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/records/create_prescription`,
          {
            patient_name: patientData.patient_name,
            phone_number: patientData.phone_number,
            age: patientData.age,
            gender: patientData.gender,
            case_history: case_history,
            vitals: vitals,
            diagnosis: test,
            diagnosis_history: diagnosis_history,
            medicine: medicineData,
            general_advice: general_advice,
            referral: referral,
            surgery_advice: surgery_advice,
            FollowUpTime: FollowUpTime,
            FollowUpDate: FollowUpDate,
            prescription_date: realData,
            prescription_time: realTime,
          },

          {
            withCredentials: true,
          }
        );

        if (response.data.apiSuccess === 1) {
          setMessage(response.data.message);
          console.log(response.data.message);

          setShowModal(true);
          setIsLoading(false);
        }
        if (response.data.apiSuccess === 0) {
          setMessage(response.data.message);
          setIsLoading(false);
        }
      }
    } catch (error: any) {
      setMessage(error.message);
      setShowModal(true);
      setIsLoading(false);
    }
  };

  const predictionApi = useCallback(async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/prediction/prediction`,
        {
          phone_number: patientData.phone_number,
        },
        {
          withCredentials: true,
        }
      );

      setApiPatientData(response.data.result);
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
  }, [patientData.phone_number]);
  const selecTedData = (selectedNumber: string, shouldCallApi: boolean) => {
    return () => {
      const selectedData = apiPatientData.find(
        (data) => data.phone_number === selectedNumber
      );

      if (selectedData) {
        setPatientData(selectedData);
        if (shouldCallApi) {
          // Call the prediction API only if shouldCallApi is true
          predictionApi();
        }
        setApiPatientData([]);
      } else {
        // Handle the case when no matching data is found
        console.log("No data found for the selected phone number");
      }
    };
  };

  //Patient Data
  const handlePatientData = (e: any) => {
    const name = e.target.name; // Use e.target.name to get the name of the input field
    const value = e.target.value;

    if (value > 1) {
      setErrors(false);
    }

    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // for the case_history  prediction
  const textareaWidth =
    case_history.length < 11
      ? case_history.length * 12
      : case_history.length * 9;

  const [show, setShow] = useState(false);

  const componentRef = useRef(null);

  return (
    <main className=" md:max-w-xl md:mx-auto  xl:max-w-4xl xl:mx-auto m-5 p-5 rounded shadow-xl lg:max-w-xl lg:mx-auto bg-white">
      <Modal visible={showModal} onClose={handleOnclose} response={message} />
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
          <Modal
            visible={showModal}
            onClose={handleOnclose}
            response={message}
          />
          {errors && (
            <Modal
              visible={showModal}
              onClose={handleOnclose}
              response={"Patient data can't be empty"}
            />
          )}
          <Header
            doctorData={doctorData}
            clinicAddress={clinicAddress}
            clinicData={clinicData}
          />
          <CustomerData
            patientData={patientData}
            prescriptionDate={outPut()}
            prescriptionTime={TimeOutPut()}
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

      {followUp === "YES" && active === true && (
        <div className="flex flex-row justify-between">
          <div className=" ">
            <button
              onClick={() => setActive(false)}
              className="m-2 p-2 pl-6 pr-6 bg-blue-500 text-white font-semibold"
            >
              EDIT
            </button>

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
                className="p-2 pl-6 pr-6 bg-red-500 text-white font-semibold"
                onClick={CreatePrescription}
              >
                SAVE
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
                onChange={handlePatientData}
              />
              {patientData.patient_name.length === 0 && errors ? (
                <p className="text-sm text-red-400">Patient name is required</p>
              ) : (
                ""
              )}
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
                onChange={(e) => {
                  const enteredValue = e.target.value;

                  if (/[a-zA-Z]/.test(enteredValue)) {
                    console.log("Alphabets are not allowed.");
                  } else {
                    handlePatientData(e);
                  }
                }}
                pattern="[0-9]*"
                title="Please enter only numeric characters"
              />
              {patientData.phone_number.length > 4 &&
              apiPatientData?.filter(
                (someData) => someData.phone_number === patientData.phone_number
              ) ? (
                // Render prediction functionality if patientData.phone_number matches any phone_number in apiPatientData
                apiPatientData.map((data) => (
                  <span
                    key={data.phone_number}
                    onClick={selecTedData(data.phone_number, false)}
                    className="shadow-lg"
                  >
                    {data.phone_number}
                  </span>
                ))
              ) : (
                // Render patientData.phone_number if it doesn't match any phone_number in apiPatientData
                <span></span>
              )}

              {patientData.phone_number.length < 10 && errors ? (
                <p className="text-sm text-red-400">Phone number is required</p>
              ) : (
                ""
              )}
            </div>
            <div className="flex">
              <label htmlFor="patient_gender" className="mb-1">
                Patient Gender
              </label>
              <select
                name="patient_gender"
                className="border-2 border-gray-300 rounded-md ml-2 mr-2"
                value={patientData.gender.toLowerCase()} // Convert gender to lowercase
                onChange={(e) =>
                  setPatientData({ ...patientData, gender: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {patientData.gender.length === 0 && errors ? (
                <p className="text-sm text-red-400">Gender is required</p>
              ) : (
                ""
              )}
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
              {patientData.age === 0 && errors ? (
                <p className="text-sm text-red-400">age is required</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="chief_complains">Complaints</label>
            <div className="relative">
              <textarea
                name="message"
                id="message"
                spellCheck="false"
                className="border-2 border-gray-400 resize-y w-full min-h-24  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                value={case_history}
                onKeyDown={handleKeyDown}
                onChange={(e: any) => {
                  handleChangePrediction(e);
                  setComplains(e.target.value);
                }}
              />
              <span
                className="absolute z-[2]  text-gray-700"
                style={{ left: `${textareaWidth}px` }}
              >
                {symptom}
              </span>
            </div>

            <p>Clinical Notes</p>

            <div>
              {vitals.map((vital, index) => (
                <div key={index} className="flex mb-2">
                  <label htmlFor={`vitals_name_${index}`}>Vitals name</label>
                  <select
                    id={`vitals_name_${index}`}
                    name={`vites_name${index}`}
                    value={vital.vites_name}
                    onChange={(e) =>
                      handleVitalsChange(index, "vites_name", e.target.value)
                    }
                    className="border-2 border-gray-400 ml-2 mr-2"
                  >
                    <option value="">Select</option>
                    <option value="Blood Pressure">Blood Pressure</option>
                    <option value="Heart Rate">Heart Rate</option>
                    <option value="Respiratory Rate">Respiratory Rate</option>
                    <option value="Pulse Pressure">Pulse Pressure</option>
                    <option value="Oxygen Saturation">Oxygen Saturation</option>
                    <option value="Pulse Rhythm">Pulse Rhythm</option>
                    <option value="SpO2">SpO2</option>
                    <option value="Blood Glucose Levels">
                      Blood Glucose Levels
                    </option>
                    <option value="Height">Height</option>
                    <option value="Weight">Weight</option>
                    <option value="GCS">GCS</option>
                    <option value="Temperature">Temperature</option>

                    <option value="Capnography">Capnography</option>
                    <option value="Skin Color">Skin Color</option>
                  </select>

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
              <div key={i} className="flex items-center mb-3">
                <div className="flex flex-col">
                  <label htmlFor={`medicine_name_${i}`}>Medicine name</label>
                  <input
                    type="text"
                    name={`medicine_name_${i}`}
                    className="border-2 border-gray-400 w-32 text-sm ml-2 mr-2"
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
                  <select
                    name={`medicine_type_${i}`}
                    className="border-2 border-gray-400 w-20 ml-2 mr-2 "
                    value={data.medicine_type}
                    onChange={(e) =>
                      handleMedicineChange(i, "medicine_type", e.target.value)
                    }
                  >
                    <option value="">Select Medicine Type</option>
                    <option value="tablet">tablet</option>
                    <option value="drop">drop</option>
                    <option value="injection">injection</option>
                    <option value="ointment">ointment</option>
                    <option value="capsule">capsule</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Suspension">Suspension</option>
                    <option value="cream">cream</option>
                    <option value="gel">gel</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor={`dose_${i}`}>Dose</label>
                  <div className="flex  ml-2 mr-2 ">
                    <input
                      type="text"
                      name={`dose_${i}`}
                      className="border-2 border-gray-400 w-10 "
                      value={data.dose}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        handleMedicineChange(i, "dose", inputValue);
                        // Validate if the input value contains only numeric characters
                      }}
                    />
                    <IoIosArrowDown
                      className="text-black absolute ml-6 mt-[6px]"
                      onClick={() => setShow(!show)}
                    />
                  </div>
                  {show && (
                    <span className="shadow-lg bg-white w-12 absolute mt-10">
                      <ul>
                        <li
                          className="hover:bg-blue-400 hover:text-white hover:font-bold pl-2"
                          value="1"
                          onClick={(e: any) => {
                            const inputValue = e.target.value;
                            setShow(!show);
                            handleMedicineChange(i, "dose", inputValue);
                          }}
                        >
                          1
                        </li>
                        <li
                          className="hover:bg-blue-400 hover:text-white hover:font-bold pl-2"
                          value="2"
                          onClick={(e: any) => {
                            const inputValue = e.target.value;
                            setShow(!show);
                            handleMedicineChange(i, "dose", inputValue);
                          }}
                        >
                          2
                        </li>
                        <li
                          className="hover:bg-blue-400 hover:text-white hover:font-bold pl-2"
                          value="3"
                          onClick={(e: any) => {
                            const inputValue = e.target.value;
                            setShow(!show);
                            handleMedicineChange(i, "dose", inputValue);
                          }}
                        >
                          3
                        </li>
                        <li
                          className="hover:bg-blue-400 hover:text-white hover:font-bold pl-2"
                          value="4"
                          onClick={(e: any) => {
                            const inputValue = e.target.value;
                            setShow(!show);
                            handleMedicineChange(i, "dose", inputValue);
                          }}
                        >
                          4
                        </li>
                        <li
                          className="hover:bg-blue-400 hover:text-white hover:font-bold pl-2"
                          value="5"
                          onClick={(e: any) => {
                            const inputValue = e.target.value;
                            setShow(!show);
                            handleMedicineChange(i, "dose", inputValue);
                          }}
                        >
                          5
                        </li>
                        <li
                          className="hover:bg-blue-400 hover:text-white hover:font-bold pl-2"
                          value="6"
                          onClick={(e: any) => {
                            const inputValue = e.target.value;
                            setShow(!show);
                            handleMedicineChange(i, "dose", inputValue);
                          }}
                        >
                          6
                        </li>
                        <li
                          className="hover:bg-blue-400 hover:text-white hover:font-bold pl-2"
                          value="7"
                          onClick={(e: any) => {
                            const inputValue = e.target.value;
                            setShow(!show);
                            handleMedicineChange(i, "dose", inputValue);
                          }}
                        >
                          7
                        </li>
                        <li
                          className="hover:bg-blue-400 hover:text-white hover:font-bold pl-2"
                          value="8"
                          onClick={(e: any) => {
                            const inputValue = e.target.value;
                            setShow(!show);
                            handleMedicineChange(i, "dose", inputValue);
                          }}
                        >
                          8
                        </li>
                        <li
                          className="hover:bg-blue-400 hover:text-white hover:font-bold pl-2"
                          value="9"
                          onClick={(e: any) => {
                            const inputValue = e.target.value;
                            setShow(!show);
                            handleMedicineChange(i, "dose", inputValue);
                          }}
                        >
                          9
                        </li>
                        <li
                          className="hover:bg-blue-400 hover:text-white hover:font-bold pl-2"
                          value="10"
                          onClick={(e: any) => {
                            const inputValue = e.target.value;
                            setShow(!show);
                            handleMedicineChange(i, "dose", inputValue);
                          }}
                        >
                          10
                        </li>
                      </ul>
                    </span>
                  )}
                </div>
                {/* <div className="flex flex-col">
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
                  
                </div> */}

                <div className="flex flex-col">
                  <label htmlFor={`dose_unit${i}`} className="w-20">
                    Dose Unit
                  </label>
                  <select
                    name={`dose_unit${i}`}
                    className="border-2 border-gray-400 w-12 ml-2 mr-2"
                    value={data.dose_unit}
                    onChange={(e) =>
                      handleMedicineChange(i, "dose_unit", e.target.value)
                    }
                  >
                    <option value="">Dose unit</option>
                    <option value="ml">ml</option>
                    <option value="g">g</option>
                    <option value="mg">mg</option>
                    <option value="ml">ml</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor={`duration_${i}`}>Duration</label>
                  <select
                    name={`duration_${i}`}
                    className="border-2 border-gray-400 w-16 ml-2 mr-2"
                    value={data.duration}
                    onChange={(e) =>
                      handleMedicineChange(i, "duration", e.target.value)
                    }
                  >
                    <option value="">Select Duration</option>
                    <option value="1">1 </option>
                    <option value="2">2 </option>
                    <option value="3">3 </option>
                    <option value="4">4 </option>
                    <option value="5">5 </option>
                    <option value="6">6 </option>
                    <option value="7">7 </option>
                    <option value="8">8 </option>
                    <option value="9">9 </option>
                    <option value="10">10 </option>
                    <option value="11">11 </option>
                    <option value="12">12 </option>
                    <option value="Continue">Continue</option>
                    {/* Add more options as needed */}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor={`duration_unit${i}`} className="w-20">
                    D-Unit
                  </label>
                  <select
                    name={`duration_unit${i}`}
                    className="border-2 border-gray-400 w-16 ml-2 mr-2"
                    value={data.duration_unit}
                    onChange={(e) =>
                      handleMedicineChange(i, "duration_unit", e.target.value)
                    }
                  >
                    <option value="">Select Duration</option>

                    <option value="Day">Day</option>
                    <option value="Week">Week</option>
                    <option value="Month">Month</option>
                    <option value="Year">Year</option>
                    <option value="STAT">STAT</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`dose_code${i}`}>Frequency</label>
                  <select
                    name={`dose_code${i}`}
                    className="border-2 border-gray-400 w-20 ml-2 mr-2"
                    value={data.dose_code}
                    onChange={(e) =>
                      handleMedicineChange(i, "dose_code", e.target.value)
                    }
                  >
                    <option value="">Select dose_code</option>
                    <option value="1-1-1">1-1-1</option>
                    <option value="1-1-0">1-1-0</option>
                    <option value="1-0-1">1-0-1</option>
                    <option value="1-0-0">1-0-0</option>
                    <option value="0-1-1">0-1-1 </option>
                    <option value="0-1-0">0-1-0 </option>
                    <option value="0-0-1">0-0-1 </option>
                    <option value="4-T">4-T </option>
                    <option value="Q-1-H">Q-1-H</option>
                    <option value="Q-2-H">Q-2-H</option>
                    <option value="Q-3-H">Q-3-H</option>
                    <option value="Q-4-H">Q-4-H</option>
                    <option value="Q-6-H">Q-6-H</option>
                    <option value="Q-6-H">Q-8-H</option>
                    <option value="Q-6-H">Q-12-H</option>
                    <option value="SOS">SOS</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`time${i}`}>Timing</label>
                  <select
                    name={`time${i}`}
                    className="border-2 border-gray-400 w-20 ml-2"
                    value={data.time}
                    onChange={(e) =>
                      handleMedicineChange(i, "time", e.target.value)
                    }
                  >
                    <option value="">Select Timing</option>
                    <option value="After Meal">After Meal</option>
                    <option value="Before Meal">Before Meal</option>
                    <option value="Fasting">Fasting</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`advice${i}`}>Instructions</label>
                  <input
                    type="text"
                    name={`advice_${i}`}
                    className="border-2 border-gray-400 w-20 ml-2"
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
            <label htmlFor="general_advice">General Advice</label>
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
            <label htmlFor="surgery_advice">Surgery Advice</label>
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
