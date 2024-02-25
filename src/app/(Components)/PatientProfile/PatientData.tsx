import { Avatar } from "@mui/material";

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

interface PatientProfileHeaderProps {
  dataLength: number;
  PatientData: PatientData;
}

export function PatientProfileHeader({
  dataLength,
  PatientData,
}: PatientProfileHeaderProps) {
  return (
    <div className="flex m-16 mb-2">
      <div className="flex flex-col w-1/4 p-6">
        <div className="bg-blue-100 flex flex-col items-center justify-center p-6 rounded-lg">
          <Avatar sx={{ width: 120, height: 120, borderRadius: "50%" }}>
            Profile
          </Avatar>
          <h1 className="p-2">{PatientData.patient_name}</h1>

          <div>
            <button className="bg-indigo-400 p-1 rounded-md mt-2">
              New prescription
            </button>
          </div>
          <div>
            <button className="bg-indigo-400 p-1 rounded-md mt-2">
              Follow Up
            </button>
          </div>
        </div>
      </div>
      <div className="w-3/5 inline-block p-4 ">
        <h1 className="bg-indigo-400 p-2 rounded-md">Personal information</h1>
        <div className="flex bg-blue-100 rounded-lg">
          <div className="w-2/6 p-2">
            <p>AGE: {PatientData.age}</p>
            <p> Gender:{PatientData.gender}</p>
            <p>Phone Number: {PatientData.phone_number}</p>
          </div>
          <div className="p-2">
            <p>NO. of visits: {dataLength}</p> {/* Use dataLength directly */}
            <p style={{ overflowWrap: "break-word" }}>
              First visit: {PatientData.created_at}
            </p>
          </div>
        </div>
        <h1 className="bg-indigo-400 p-2 rounded-md mt-10">
          Last visit vitals
        </h1>
        <div className="flex w-full rounded-lg  p-4  bg-blue-100">
          {/* <div className="w-1/2 p-2">
            <p>Blood Pressure: 500</p>
            <p>Pulse: 500</p>
          </div>
          <div className="w-2/6 p-2">
            <p>Height : 500</p>
            <p>Weight: 500</p>
          </div>
          <div className="w-1/2 p-2">
            <p>BMI: 500</p>
            <p>Blood Oxygen :500</p>
          </div> */}
          Feature coming Soon.....
        </div>
      </div>
    </div>
  );
}
