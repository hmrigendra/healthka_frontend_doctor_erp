"use client";
import axios from "axios";

import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

export default function ClinicProfile() {
  const [clinic, setClinic] = useState({
    clinic_name: "",
    start_time: "",
    end_time: "",
    working_days: "",
    clinic_phone_number: "",
    GST: "",
  });
  const [clinicAddress, setClinicAddress] = useState({
    house_number: "",
    lane: "",
    address_one: "",
    landmark: "",
    city: "",
    state: "",
    pin_code: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const test = () => {
    router.push("/Auth");
  };
  const clinicPost = async () => {
    try {
      const doctor_id = searchParams.get("doctor_id");
      const name = searchParams.get("doctor_name");
      console.log(doctor_id);

      const response = await axios.post(
        "http://localhost:8000/api/v1/doctors/add_clinic",
        {
          clinic_name: clinic.clinic_name,
          start_time: clinic.start_time,
          end_time: clinic.end_time,
          working_days: clinic.working_days,
          clinic_phone_number: clinic.clinic_phone_number,
          gst: clinic.GST,
          house_number: clinicAddress.house_number,
          lane: clinicAddress.lane,
          address_one: clinicAddress.address_one,
          landmark: clinicAddress.landmark,
          city: clinicAddress.city,
          state: clinicAddress.state,
          pin_code: clinicAddress.pin_code,
          clinic_type: 1,
          country: "INDIA",
          doctor_id: doctor_id,
        }
      );

      if (response) {
        console.log("====================================");
        console.log(response.data.clinicDoctorsResult.result);
        console.log("====================================");
        console.log("Response:", response.data.clinicDoctorsResult.result);

        router.push(
          `/Auth?doctor_id=${doctor_id}&name=${name}&clinic_id=${response.data.clinicDoctorsResult.result}`
        );
      }
    } catch (error) {
      console.error("Synchronous error:", error);

      alert(
        "An error occurred while processing your request. Please try again later."
      );
    }
  };

  return (
    <div className="p-10 bg-red-50 min-h-screen">
      <div className=" p-20 bg-white">
        <div className="w-full ">
          <div className="flex">
            <div className="flex-col w-1/2 ">
              <p>Clinic name</p>
              <input
                value={clinic.clinic_name}
                onChange={(e) =>
                  setClinic({ ...clinic, clinic_name: e.target.value })
                }
                type="text"
                placeholder="Clinic name"
                className="bg-red-200 rounded-lg m-3  placeholder:text-gray-500 w-[70%] p-2"
              />
            </div>
            <div className="flex-col">
              <p>Clinic Phone number</p>
              <input
                type="text"
                placeholder="Phone number"
                className="bg-red-200 rounded-lg  m-3  placeholder:text-gray-500 w-[100%] p-2"
                value={clinic.clinic_phone_number}
                onChange={(e) =>
                  setClinic({ ...clinic, clinic_phone_number: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between w-1/2">
          <div className="flex-col mr-10">
            <p>opening time</p>
            <input
              type="time"
              className="text-red-700  text-lg"
              value={clinic.start_time}
              onChange={(e) =>
                setClinic({ ...clinic, start_time: e.target.value })
              }
            />
          </div>
          <div className="flex-col mr-10">
            <p>closing time</p>
            <input
              type="time"
              className="text-red-700  text-lg"
              value={clinic.end_time}
              onChange={(e) =>
                setClinic({ ...clinic, end_time: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex w-2/3 justify-between">
          <div className="flex-col">
            <p>GST</p>
            <input
              type="text"
              placeholder="Gst number"
              className="bg-red-200 rounded-lg  m-3  placeholder:text-gray-500 w-[100%] p-2"
              value={clinic.GST}
              onChange={(e) => setClinic({ ...clinic, GST: e.target.value })}
            />
          </div>
          <div className="flex-col">
            <p>working days</p>
            <input
              type="text"
              placeholder="working days"
              className="bg-red-200 rounded-lg  m-3  placeholder:text-gray-500 w-[100%] p-2"
              value={clinic.working_days}
              onChange={(e) =>
                setClinic({ ...clinic, working_days: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <div>
            <p>Clinic Address</p>
          </div>
          <div className="flex w-full m-3">
            <input
              type="text"
              className="w-2/6 mr-10 p-2  bg-red-200 rounded-lg placeholder:text-gray-500"
              placeholder="House No./Room No./Apartment no"
              value={clinicAddress.house_number}
              onChange={(e) =>
                setClinicAddress({
                  ...clinicAddress,
                  house_number: e.target.value,
                })
              }
            />
            <input
              type="text"
              className="w-2/6 p-2  bg-red-200 rounded-lg placeholder:text-gray-500"
              placeholder="Locality/Lane/colony/Road"
              value={clinicAddress.lane}
              onChange={(e) =>
                setClinicAddress({
                  ...clinicAddress,
                  lane: e.target.value,
                })
              }
            />
          </div>
          <div className="flex w-full m-3">
            <input
              type="text"
              className="w-2/6 p-2  bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
              placeholder="Address one"
              value={clinicAddress.address_one}
              onChange={(e) =>
                setClinicAddress({
                  ...clinicAddress,
                  address_one: e.target.value,
                })
              }
            />
            <input
              type="text"
              className="w-2/6 p-2  bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
              placeholder="Landmark"
              value={clinicAddress.landmark}
              onChange={(e) =>
                setClinicAddress({
                  ...clinicAddress,
                  landmark: e.target.value,
                })
              }
            />
          </div>
          <div className="flex w-full m-3">
            <div className="flex-col">
              <input
                type="text"
                className="w-1/2 p-2 m-2  bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
                placeholder="City"
                value={clinicAddress.city}
                onChange={(e) =>
                  setClinicAddress({
                    ...clinicAddress,
                    city: e.target.value,
                  })
                }
              />
              <input
                type="text"
                className="w-1/2 p-2 m-2 bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
                placeholder="State"
                value={clinicAddress.state}
                onChange={(e) =>
                  setClinicAddress({
                    ...clinicAddress,
                    state: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex-col ">
              <input
                type="text"
                className="w-1/2 p-2 m-2 bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
                placeholder="Pincode"
                value={clinicAddress.pin_code}
                onChange={(e) =>
                  setClinicAddress({
                    ...clinicAddress,
                    pin_code: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <button
          onClick={clinicPost}
          className="bg-blue-500 p-2 pl-6 pr-6 rounded-md  text-white font-semibold "
        >
          Submit
        </button>
      </div>
    </div>
  );
}
