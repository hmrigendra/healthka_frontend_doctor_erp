"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { PatientProfileHeader } from "../(Components)/PatientProfile/PatientData";
import { TableCard } from "../(Components)/TableCard";
import { PersonalData } from "../(Components)/PersonalData";

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
  follow_status: String;
  createdAt: String;
}

interface ApiResponse {
  patientData: PatientData;
  dataLength: number;
  data: prescriptionData[];
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

  const fetchData = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `http://localhost:8000/api/v1/patient/get_patient_by_doctor_id?patient_id=${searchParams.patient_id}`,
        {
          withCredentials: true,
        }
      );

      console.log("====================================");
      console.log(response.data.patientData);
      console.log("====================================");
      const responseData = response.data;
      setDataLength(responseData.dataLength);
      const [patientData]: any = responseData.patientData; // Destructure the array

      if (patientData) {
        setPatient(patientData);
      }

      // Extract the first patient object from the data array
      if (responseData.data.length > 0) {
        const patientData = responseData.data;
        setPrescriptions(patientData);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchParams.patient_id]);

  // Render your component based on the patient data and data length
  // Add patient_id as a dependency to refetch data when it changes

  return (
    <>
      {prescriptions && (
        <PatientProfileHeader dataLength={dataLength} PatientData={patient} />
      )}
      <TableCard prescriptions={prescriptions} />
    </>
  );
}
