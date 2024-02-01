import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineQuestionMark } from "react-icons/md";
import { DoctorName } from "./DoctorName";

export function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative mt-10">
      <div className="flex items-center justify-start ml-16 p-2">
        <DoctorName />
        <div className="flex flex-grow flex-shrink-0 justify-end mr-10">
          <input
            type="text"
            placeholder={placeholder}
            className="pl-4 pr-12 py-1 w-2/3 border rounded-md border-black"
          />
          <button className="bg-red-300 p-2 rounded-md ml-1 ">
            <FaSearch />
          </button>
          <button className="bg-blue-200 p-2 rounded-md ml-4">
            <CgProfile />
          </button>
          <button className="bg-blue-200 p-2 rounded-md ml-4">
            <MdOutlineQuestionMark />
          </button>
        </div>
      </div>
      <div className="result"></div>
    </div>
  );
}
