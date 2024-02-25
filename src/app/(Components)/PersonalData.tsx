"use client";
import { useState } from "react";

export function PersonalData() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    const selectedDate = new Date(dateString);
    setDate(selectedDate);
  };

  return (
    <div className="">
      <p>Sign up as new doctor</p>

      {/* Flex */}
      <div className="flex ">
        <div className="w-2/6 m-3 mr-6">
          <p>First name</p>
          <input type="text" className="w-full p-2 bg-red-200 rounded-lg" />
        </div>
        <div className="w-2/6 m-3">
          <p>Last name</p>
          <input type="text" className="w-full p-2  bg-red-200 rounded-lg " />
        </div>
      </div>

      <div className="flex  w-full m-3">
        <div className="flex w-2/6 mr-10 ">
          <div className="flex-col mr-10">
            <p>DOB</p>
            <input
              type="date"
              className="text-red-700  text-lg"
              onChange={handleDateChange}
            />
          </div>
          {/* Add calender over here  */}
          <div className="flex-col">
            <label htmlFor="gender">Gender:</label>
            <div>
              <select id="gender" name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <p>Mobile number</p>
          <input type="text" className="w-full p-2  bg-red-200 rounded-lg" />
        </div>
      </div>

      {/* Flex */}
      <div className="flex w-full m-3 ">
        <div className="w-2/6 mr-10">
          <p>Email</p>
          <input type="text" className="w-full p-2 bg-red-200 rounded-lg " />
        </div>
        <div className="w-2/6">
          <p>specialization</p>
          <input type="text" className="w-full p-2 bg-red-200 rounded-lg " />
        </div>
      </div>
    </div>
  );
}
