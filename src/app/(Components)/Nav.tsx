"use client";
import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoRadioButtonOn } from "react-icons/io5";
import Cookies from "js-cookie";
import { AiOutlineLogout } from "react-icons/ai";

import { FaServicestack } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";

export function Nav() {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [clinicData, setClinicData] = useState("Clinic");
  const handleClinicSelect = (selectedClinic: String) => {
    setClinicData(selectedClinic.toString());
    setSubMenuOpen(false);
  };
  const getCookie = (name: string) => {
    return Cookies.get(name);
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://15.207.112.23:8000/api/v1/doctors/logout",
        {},
        {
          withCredentials: true,
        }
      );

      console.log(response);

      if (response) {
        alert("Your are successfully logged out");
      }
      if (!response) {
        alert("Something went wrong");
      }
    } catch (error) {
      alert("Server error occur");
    }
  };

  useEffect(() => {
    const clinic_name = getCookie("clinic_name");
    if (clinic_name) {
      const clinicOptions = [`${clinic_name}`];
      setClinicData(clinic_name?.toString());
    }
  }, []);

  return (
    <div
      className={`bg-production-white h-lvh inline-block p-6 pt-8${
        open ? " w-1/6" : " w-20"
      } relative`}
    >
      <BsArrowLeftShort
        onClick={() => setOpen(!open)}
        className={`text-indigo-950 bg-production-indigo rounded-full w-8 h-8 absolute -right-4 top-36 inline-block m-2 border border-r-2 cursor-pointer ${
          !open && "rotate-180"
        }`}
      />

      <ul className="list-none p-0 m-0">
        <li className={`inline-flex rounded-lg ${open ? "p-2 pl-7 pr-7" : ""}`}>
          <h1
            className={`font-medium text-black origin-left text-2xl cursor-pointer duration-200 ${
              !open && "scale-0"
            }`}
          >
            Health ka
          </h1>
        </li>
        <hr className="my-3 border-t border-gray-500" />
        <Link href="/Dashboard">
          <li
            className={`inline-flex rounded-lg ${
              open ? "hover:bg-hover-blue p-2 pr-12 mb-4" : ""
            }`}
          >
            <IoHomeSharp
              className={`text-3xl rounded cursor-pointer mr-4 block float-left duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <span
              className={`font-medium origin-left text-2xl cursor-pointer duration-200 ${
                !open && "scale-0"
              }`}
            >
              Home
            </span>
          </li>
        </Link>

        <Link href="/DoctorsProfile">
          <li
            className={`inline-flex rounded-lg ${
              open ? "hover:bg-hover-blue p-2 pr-12 mb-4" : ""
            }`}
          >
            <CgProfile
              className={`text-3xl rounded cursor-pointer mr-4 block float-left duration-500 `}
            />
            <span
              className={`font-medium origin-left text-2xl cursor-pointer duration-200 ${
                !open && "scale-0"
              }`}
            >
              Profile
            </span>
          </li>
        </Link>
        <Link href="/Services">
          <li
            className={`inline-flex rounded-lg ${
              open ? "hover:bg-hover-blue p-2 pr-12 mb-4" : ""
            }`}
          >
            <FaServicestack
              className={`size-8 rounded cursor-pointer mr-4 block float-left duration-500 ${open}`}
            />

            <span
              className={`font-medium origin-left text-wrap text-2xl cursor-pointer duration-200 ${
                !open && "scale-0"
              }`}
            >
              Services
            </span>
          </li>
        </Link>
        <li
          className={`flex rounded-lg w-full bg-production-red mb-1 p-1 ${
            open ? "p-2 " : "hidden"
          }`}
          onClick={() => setSubMenuOpen(!subMenuOpen)}
        >
          <span
            className={`font-medium origin-left text-sm text-center w-full items-center cursor-pointer duration-200 ${
              !open && "scale-0"
            }`}
          >
            <IoRadioButtonOn
              className={`text-green-700  size-6  rounded cursor-pointer block float-left`}
            />
            {clinicData}
          </span>
          <RiArrowDropDownLine
            className={`size-12 ${subMenuOpen && "rotate-180"}`}
          />
        </li>
        {subMenuOpen && open && (
          <ul className={`list-none p-0 text-sm m-0`}></ul>
        )}
        <li
          onClick={logout}
          className={`inline-flex mt-64  rounded-lg ${
            open ? "hover:bg-hover-blue p-2 pr-12 mb-4" : ""
          }`}
        >
          <AiOutlineLogout
            className={`size-8 rounded cursor-pointer mr-4 block float-left duration-500 ${open}`}
          />
          <span
            className={`font-medium origin-left text-2xl cursor-pointer duration-200 ${
              !open && "scale-0"
            }`}
          >
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
}
