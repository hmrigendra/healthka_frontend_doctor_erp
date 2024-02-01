import { Nav } from "../(Components)/Nav";

export default function Services() {
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
            <button className="mr-4 bg-red-100 pl-10 pr-10 rounded-lg">
              Add
            </button>
            <button className="bg-red-100 pl-8 pr-8 rounded-lg">Remove</button>
          </div>
        </div>
        <div className="flex ml-5 bg-blue-100 p-4  w-[75%] justify-between">
          <input
            type="text"
            name=""
            id=""
            placeholder="Name"
            className="bg-white border-2 p-2 rounded-md border-indigo-500"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Charges"
            className="bg-white border-2 p-2 rounded-md border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}
