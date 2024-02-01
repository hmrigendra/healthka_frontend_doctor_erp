import { FaRegSquarePlus } from "react-icons/fa6";
export function Medicine() {
  return (
    <div className="bg-white flex flex-col items-center justify-center p-4 text-black">
      <p>Medicine</p>
      <div className="flex items-center justify-end pl-10 ">
        <input
          type="text"
          placeholder="Medicine name"
          className="bg-blue-300 placeholder:text-black border  border-gray-300"
        />
        <input
          type="text"
          placeholder="Type"
          className="w-24 placeholder:text-black bg-blue-300 border  border-gray-300"
        />
        <input
          type="text"
          placeholder="Dose"
          className="w-24 bg-blue-300 placeholder:text-black border  border-gray-300"
        />
        <input
          type="text"
          placeholder="Duration"
          className="w-24 bg-blue-300 placeholder:text-black border  border-gray-300"
        />
        <input
          type="text"
          placeholder="Advice"
          className="bg-blue-300 placeholder:text-black border  border-gray-300"
        />
        <FaRegSquarePlus />
      </div>
    </div>
  );
}
