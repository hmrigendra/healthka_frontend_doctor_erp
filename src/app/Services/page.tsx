"use client";
import { Nav } from "../(Components)/Nav";
import { MdDelete } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

interface service {
  service_id: number;
  service_name: String;
  service_charges: Number;
}
export default function Services() {
  const [serviceInputs, setServiceInputs] = useState([
    { service_name: "", service_charges: "" },
  ]);

  const handleServiceAdd = () => {
    setServiceInputs([
      ...serviceInputs,
      { service_name: "", service_charges: "" },
    ]);
  };
  const handleRemoveService = (indexToRemove: number) => {
    setServiceInputs((prevInputs) => {
      return prevInputs.filter((_, index) => index !== indexToRemove);
    });
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    console.log(value);

    setServiceInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index] = {
        ...updatedInputs[index],
        [name]: value,
      };
      return updatedInputs;
    });
  };

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const handleOnclose = () => setShowModal(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = async () => {
    try {
      // Iterate over each item in serviceInputs array
      for (const data of serviceInputs) {
        // Send each item individually to the backend
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/services/create_new_service`,
          data, // Send individual item instead of the whole array
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response:", response);
      }
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
      if (error instanceof TypeError) {
        // Handle TypeError
        setMessage("Visit history not found ");
      } else {
        // Handle other errors
        setMessage("An error occurred while fetching patient data.");
      }

      setShowModal(true);
    }
  };

  const [savedServices, setSavedServices] = useState<service[]>([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/services/get_services`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data.result);

      setSavedServices(response.data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteService = async (service_id: number) => {
    console.log(service_id);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/services/delete_service`,
        {
          service_id: service_id, // Send service_id as part of an object
        },
        {
          withCredentials: true,
        }
      );

      alert(`Delete user ${service_id}`);
      // Handle success response if needed
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
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex">
      <Nav />
      <div className="w-[80%] p-6 pl-20 m-6 items-end">
        <div className="bg-production-indigo w-[80%] rounded-lg flex flex-col justify-center">
          <p className="p-4 text-md font-bold ">Services</p>
        </div>
        <div className="bg-production-indigo w-[80%] flex justify-between mt-2 rounded-lg p-1">
          <p className="text-white ml-5 font-semibold">Current Services</p>
          <div>
            <button
              onClick={handleServiceAdd}
              className="mr-4 bg-red-100 pl-10 pr-10 rounded-lg"
            >
              Add
            </button>
          </div>
        </div>
        {savedServices.map((data) => (
          <div
            key={data.service_id}
            className="flex justify-between p-3 m-1 ml-6 bg-blue-200 rounded-lg w-[75%]"
          >
            <div>
              <p className="text-lg font-semibold">{data.service_name}</p>
            </div>
            <div className="flex">
              <p className="text-lg font-semibold">
                {data.service_charges.toString()}
              </p>
              <div className="ml-5 cursor-pointer">
                <MdDelete
                  className="size-7"
                  onClick={() => deleteService(data.service_id)}
                />
              </div>
            </div>
          </div>
        ))}

        {serviceInputs.map((_, i) => (
          <div
            key={i}
            className="flex ml-5 bg-blue-100 p-4  w-[75%] justify-between"
          >
            <input
              type="text"
              name="service_name"
              id="service_name"
              placeholder="service_name"
              className="bg-white border-2 p-2 rounded-md border-indigo-500"
              onChange={(e) => handleChange(e, i)}
            />
            <input
              type="number"
              name="service_charges"
              id="service_charges"
              placeholder="Charges"
              className="bg-white border-2 p-2 rounded-md border-indigo-500"
              onChange={(e) => handleChange(e, i)}
            />
            <button>
              <MdDelete
                className="size-8"
                onClick={() => handleRemoveService(i)}
              />
            </button>
            <button>
              <GiConfirmed className="size-8" onClick={handleSave} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
