"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { PatientProfileHeader } from "../(Components)/PatientProfile/PatientData";
import { TableCard } from "../(Components)/TableCard";
import { Modal } from "../(Components)/Modal";

interface PatientData {
  id: string;
  doctor_id: string;
  patient_id: string;
  patient_name: string;
  phone_number: string;
  created_at: string;
  gender: string;
  age: number;
}
interface prescriptionData {
  _id: string;
  prescription_id: String;
  case_history: String;
  FollowUpDate: String;
  createdAt: String;
}

interface ApiResponse {
  patientData: PatientData;
  dataLength: number;
  message: String;
  data: prescriptionData[];
  statusCode: Number;
}

export default function PatientProfile({
  searchParams,
}: {
  searchParams: { patient_id: string };
}) {
  const [prescriptions, setPrescriptions] = useState<prescriptionData[]>([]);
  const [dataLength, setDataLength] = useState<number>(0);
  const [patient, setPatient] = useState<PatientData>({
    id: "",
    doctor_id: "",
    patient_id: "",
    patient_name: "",
    phone_number: "",
    created_at: "",
    gender: "",
    age: 0,
  });

  //Model || popup
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const handleOnclose = () => setShowModal(false);
  const [isLoading, setIsLoading] = useState(false);

  //Circular progress Indicator

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/patient/get_patient_by_doctor_id?patient_id=${searchParams.patient_id}`,
          {
            withCredentials: true,
          }
        );

        console.log("====================================");
        console.log("True Data", response);
        console.log("====================================");
        const responseData = response.data;
        setDataLength(responseData.dataLength);
        const [patientData]: any = responseData.patientData; // Destructure the array

        if (patientData) {
          setPatient(patientData);
        }

        if (response.data.statusCode === 404) {
          setMessage(responseData.message.toString());
          setShowModal(true);
        }
        if (responseData.data.length > 0) {
          const patientData = responseData.data;

          console.log(response.data);

          setPrescriptions(patientData);
        }

        if (responseData.data.length === 0) {
          setMessage(responseData.message.toString());
          setShowModal(true);
        }
      } catch (error: any) {
        console.error("Error fetching patient data:", error);

        // Check for network-related errors
        if (error.code === "ECONNREFUSED" || error.code === "ENETUNREACH") {
          setIsLoading(false);
          setShowModal(true);
          setMessage(
            "There is a network issue. Please check your internet connection or contact HealthKa."
          );
        }
        // Handle Axios errors
        else if (error.response) {
          setMessage("An error occurred while fetching patient data.");
          setShowModal(true);
        }
        // Handle other errors
        else {
          setIsLoading(false);
          setMessage("An error occurred while fetching patient data.");
          setShowModal(true);
        }
      }
    };

    fetchData();
  }, [searchParams.patient_id]);

  // Render your component based on the patient data and data length
  // Add patient_id as a dependency to refetch data when it changes

  return (
    <>
      <Modal visible={showModal} onClose={handleOnclose} response={message} />
      {prescriptions && (
        <PatientProfileHeader dataLength={dataLength} PatientData={patient} />
      )}
      <TableCard prescriptions={prescriptions} />
    </>
  );
}
