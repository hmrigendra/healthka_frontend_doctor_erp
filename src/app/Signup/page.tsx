"use client";
import { Box, FormControlLabel, Switch, Avatar } from "@mui/material";
import { SignUpNav } from "../(Components)/SignupNav";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [doctorProfile, setDoctorProfile] = useState({
    first_name: "",
    last_name: "",
    DOB: "",
    gender: "",
    phone_number: "",
    email: "",
    personal_clinic: "",
  });

  const [doctorAddress, setDoctorAddress] = useState({
    address_id: "",
    house_number: "",
    lane: "",
    address_one: "",
    landmark: "",
    city: "",
    state: "",
    pin_code: "",
  });

  const [qualification, SetQualification] = useState({
    qualification: "",
    specialization: "",
    College_name: "",
    year_of_passing: "",
    experience: "",
  });
  const [clinicOwned, setClinicOwned] = useState(0);

  const handleSwitchChange = (event: any) => {
    setClinicOwned(event.target.checked ? 1 : 0);
  };
  const router = useRouter();
  const testRoute = () => {
    router.push("/ClinicProfile");
  };
  const doctor_profile = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/doctors/create-doctor-profile",
        {
          first_name: doctorProfile.first_name,
          last_name: doctorProfile.last_name,
          DOB: doctorProfile.DOB,
          gender: doctorProfile.gender,
          phone_number: doctorProfile.phone_number,
          email: doctorProfile.email,
          qualification: qualification.qualification,
          specialization: qualification.specialization,
          personal_clinic: clinicOwned,

          college_name: qualification.College_name,
          year_of_passing: qualification.year_of_passing,
          experience: qualification.experience,
          house_number: doctorAddress.house_number,
          lane: doctorAddress.lane,
          address_one: doctorAddress.address_one,
          landmark: doctorAddress.landmark,
          city: doctorAddress.city,
          state: doctorAddress.state,
          pin_code: doctorAddress.pin_code,
          country: "INDIA",
        }
      );

      if (!response) {
        alert("error while posting data");
      } else {
        router.refresh();
        if (clinicOwned === 1) {
          router.push(
            `/ClinicProfile?doctor_id=${response.data.data.results}&doctor_name=${doctorProfile.first_name}`
          );
        }
      }
    } catch (error) {
      console.log(error);

      alert(error);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-red-100">
      <SignUpNav />
      <div className="flex p-2">
        <span>
          <IoArrowBackOutline className="size-6 mr-2 cursor-pointer" />
        </span>
        <p className="cursor-pointer">Back</p>
      </div>
      <div className="p-20 bg-gray-200 m-12 shadow-md ">
        <div className="">
          <p>Sign up as new doctor</p>

          {/* Flex */}
          <div className="flex ">
            <div className="w-2/6 m-3 mr-6">
              <p>First name</p>
              <input
                value={doctorProfile.first_name}
                onChange={(e) =>
                  setDoctorProfile({
                    ...doctorProfile,
                    first_name: e.target.value,
                  })
                }
                type="text"
                className="w-full p-2 bg-red-200 rounded-lg"
              />
            </div>
            <div className="w-2/6 m-3">
              <p>Last name</p>
              <input
                type="text"
                className="w-full p-2  bg-red-200 rounded-lg "
                value={doctorProfile.last_name}
                onChange={(e) =>
                  setDoctorProfile({
                    ...doctorProfile,
                    last_name: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="flex  w-full m-3">
            <div className="flex w-2/6 mr-10 ">
              <div className="flex-col mr-10">
                <p>DOB</p>
                <input
                  type="date"
                  className="text-red-700  text-lg"
                  value={doctorProfile.DOB}
                  onChange={(e) =>
                    setDoctorProfile({ ...doctorProfile, DOB: e.target.value })
                  }
                />
              </div>
              {/* Add calender over here  */}
              <div className="flex-col">
                <label htmlFor="gender">Gender:</label>
                <div>
                  <select
                    id="gender"
                    name="gender"
                    value={doctorProfile.gender}
                    onChange={(e) =>
                      setDoctorProfile({
                        ...doctorProfile,
                        gender: e.target.value,
                      })
                    }
                  >
                    {" "}
                    <option value="select">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <p>Mobile number</p>
              <input
                value={doctorProfile.phone_number}
                onChange={(e) =>
                  setDoctorProfile({
                    ...doctorProfile,
                    phone_number: e.target.value,
                  })
                }
                type="text"
                className="w-full p-2  bg-red-200 rounded-lg"
              />
            </div>
          </div>

          {/* Flex */}
          <div className="flex w-full m-3 ">
            <div className="w-2/6 mr-10">
              <p>Email</p>
              <input
                value={doctorProfile.email}
                onChange={(e) =>
                  setDoctorProfile({ ...doctorProfile, email: e.target.value })
                }
                type="text"
                className="w-full p-2 bg-red-200 rounded-lg "
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <p>Address</p>
          </div>
          <div className="flex w-full m-3">
            <input
              value={doctorAddress.house_number}
              onChange={(e) =>
                setDoctorAddress({
                  ...doctorAddress,
                  house_number: e.target.value,
                })
              }
              type="text"
              className="w-2/6 mr-10 p-2  bg-red-200 rounded-lg placeholder:text-gray-500"
              placeholder="House No./Room No./Apartment Name"
            />
            <input
              type="text"
              className="w-2/6 p-2  bg-red-200 rounded-lg placeholder:text-gray-500"
              placeholder="Locality/Lane/colony/Road"
              value={doctorAddress.lane}
              onChange={(e) =>
                setDoctorAddress({ ...doctorAddress, lane: e.target.value })
              }
            />
          </div>
          <div className="flex w-full m-3">
            <input
              type="text"
              className="w-2/6 p-2  bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
              placeholder="Address one"
              value={doctorAddress.address_one}
              onChange={(e) =>
                setDoctorAddress({
                  ...doctorAddress,
                  address_one: e.target.value,
                })
              }
            />
            <input
              type="text"
              className="w-2/6 p-2  bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
              placeholder="Landmark"
              value={doctorAddress.landmark}
              onChange={(e) =>
                setDoctorAddress({ ...doctorAddress, landmark: e.target.value })
              }
            />
          </div>
          <div className="flex w-full m-3">
            <div className="flex-col">
              <input
                type="text"
                className="w-1/2 p-2 m-2  bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
                placeholder="City"
                value={doctorAddress.city}
                onChange={(e) =>
                  setDoctorAddress({
                    ...doctorAddress,
                    city: e.target.value,
                  })
                }
              />
              <input
                type="text"
                className="w-1/2 p-2 m-2 bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
                placeholder="State"
                value={doctorAddress.state}
                onChange={(e) =>
                  setDoctorAddress({
                    ...doctorAddress,
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
                value={doctorAddress.pin_code}
                onChange={(e) =>
                  setDoctorAddress({
                    ...doctorAddress,
                    pin_code: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="m-2">
          <div>
            <p>Qualification</p>
          </div>
          <div className="flex m-3">
            <input
              type="text"
              className="w-2/6 p-2 bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
              name=""
              id=""
              placeholder="Degree"
              value={qualification.qualification}
              onChange={(e) =>
                SetQualification({
                  ...qualification,
                  qualification: e.target.value,
                })
              }
            />
            <input
              type="text"
              className="w-2/6 bg-red-200 rounded-lg mr-10 placeholder:text-gray-500 p-2"
              placeholder="College name"
              value={qualification.College_name}
              onChange={(e) =>
                SetQualification({
                  ...qualification,
                  College_name: e.target.value,
                })
              }
            />
          </div>
          <div className="flex m-3">
            <input
              type="text"
              className="w-2/6 p-2 bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
              placeholder="Specialization"
              value={qualification.specialization}
              onChange={(e) =>
                SetQualification({
                  ...qualification,
                  specialization: e.target.value,
                })
              }
            />
            <span className="items-center flex text-sm m-1 justify-center">
              Year of pass
            </span>
            <input
              type="date"
              className="w-[10%] p-2  border-2 mr-3 bg-red-200 rounded-lg  placeholder:text-gray-500"
              name=""
              id=""
              placeholder="Year of pass"
              value={qualification.year_of_passing}
              onChange={(e) =>
                SetQualification({
                  ...qualification,
                  year_of_passing: e.target.value,
                })
              }
            />

            <input
              type="text"
              className="w-[16%] p-2 bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
              placeholder="Years of experience"
              value={qualification.experience}
              onChange={(e) =>
                SetQualification({
                  ...qualification,
                  experience: e.target.value,
                })
              }
            />
          </div>
          <Box>
            <FormControlLabel
              label="Do you own a clinic"
              control={<Switch onChange={handleSwitchChange} />}
            />
          </Box>
        </div>
        <div className="items-center flex justify-center ">
          <button
            onClick={doctor_profile}
            className="bg-blue-500 p-2 pl-6 pr-6 rounded-md  text-white font-semibold "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
