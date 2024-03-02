interface Doctor {
  first_name: string;
  second_name: string;
  phone_number: string;
  email: string;
  qualification: string;
  specialization: string;
}

interface ClinicAddress {
  house_number: string;
  lane: string;
  address_one: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  clinic_id: string;
}

interface ClinicData {
  clinic_name: string;
  clinic_phone_number: string;
  working_days: string;
  start_time: string;
  end_time: string;
}

interface Data {
  doctorData: Doctor;
  clinicAddress: ClinicAddress;
  clinicData: ClinicData;
}

export function Header({ doctorData, clinicAddress, clinicData }: Data) {
  return (
    <header className="border-y-2 border-black flex justify-between">
      <div className="flex flex-col text-sm">
        <div>
          <p>
            <span className="mr-1 font-semibold"> Name</span> DR:{" "}
            {doctorData.first_name.toLocaleUpperCase()}{" "}
            {doctorData.second_name.toLocaleUpperCase()}
          </p>
          <p>
            <span className="mr-1 font-semibold"> Number:</span>{" "}
            {doctorData.phone_number}
          </p>
        </div>
        <div>
          <p>
            <span className="mr-1 font-semibold">Email ID:</span>{" "}
            {doctorData.email}
          </p>
        </div>
        <div>
          <p>
            {" "}
            <span className="mr-1 font-semibold"> Qualification:</span>{" "}
            {doctorData.qualification}
          </p>
          <p>
            <span className="mr-1 font-semibold"> specialization:</span>{" "}
            {doctorData.specialization}
          </p>
        </div>
      </div>
      <div className="text-sm">
        <div>
          <p>
            <span className="mr-1 font-semibold"> Clinic name:</span>{" "}
            {clinicData.clinic_name}
          </p>
        </div>

        <div>
          <p>
            <span className="mr-1 font-semibold"> Ph:</span>{" "}
            {clinicData.clinic_phone_number}
          </p>
        </div>
        <div>
          <p>{(clinicAddress.house_number, clinicAddress.address_one)}</p>
          <p>
            {clinicAddress.address_one},{clinicAddress.landmark},
            {clinicAddress.lane}
          </p>

          <p>
            {clinicAddress.state}, {clinicAddress.pincode},
            {clinicAddress.country}
          </p>
        </div>
      </div>
    </header>
  );
}
