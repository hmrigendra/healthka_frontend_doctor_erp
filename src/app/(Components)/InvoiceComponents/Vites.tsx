import { FaRegSquarePlus } from "react-icons/fa6";
export function Vites() {
  return (
    <div className=" flex flex-col bg-white text-black items-center">
      <div>
        <p>Vitals</p>
      </div>
      <div className="flex  items-center justify-center">
        <p>BP</p>
        <input type="text" className="w-16 bg-blue-300" />

        <p>Sugar</p>
        <input type="text" className="w-16 bg-blue-300" />

        <p>Pulse</p>
        <input type="text" className="w-16 bg-blue-300" />

        <FaRegSquarePlus />
      </div>
    </div>
  );
}
