import { Address } from "../(Components)/Address";
import { Clinic } from "../(Components)/Clinic";
import { PersonalData } from "../(Components)/PersonalData";
import { Qualification } from "../(Components)/Qualification";
import { Box, FormControlLabel, Switch } from "@mui/material";
import { SignUpNav } from "../(Components)/SignupNav";
import { IoArrowBackOutline } from "react-icons/io5";

export default function SignUp() {
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
        <PersonalData />
        <Address />
        <Qualification />

        <Clinic />
        <Address />
      </div>
    </div>
  );
}
