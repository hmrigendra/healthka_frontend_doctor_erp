"use client";
import { useState } from "react";
import { Nav } from "../(Components)/Nav";

export default function Services() {
  const [serviceInputs, setServiceInputs] = useState([
    { name: "", charge: "" },
  ]);

  const handleAddService = () => {
    setServiceInputs([...serviceInputs, { name: "", charge: "" }]);
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const updatedInputs = [...serviceInputs];
    updatedInputs[index][name as keyof (typeof updatedInputs)[number]] = value;
    setServiceInputs(updatedInputs);
  };

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
              onClick={handleAddService}
              className="mr-4 bg-red-100 pl-10 pr-10 rounded-lg"
            >
              Add
            </button>
            <button className="bg-red-100 pl-8 pr-8 rounded-lg">Remove</button>
          </div>
        </div>
        {serviceInputs.map((input, index) => (
          <div
            key={index}
            className="flex m-2 p-4 justify-between bg-blue-100 w-[78%] rounded-lg"
          >
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="Name"
              className="bg-white border-2 p-2 rounded-md border-indigo-500"
            />
            <input
              type="text"
              name="charge"
              value={input.charge}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="Charges"
              className="bg-white border-2 p-2 rounded-md border-indigo-500"
            />
            <button className="bg-red-300 p-2 pl-8 pr-8 font-bold rounded-lg">
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
