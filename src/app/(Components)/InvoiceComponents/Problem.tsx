export function CaseHistory() {
  return (
    <div className="flex  bg-white text-black">
      <p></p>
      <div className="flex flex-col   w-full">
        <div className=" p-2 items-center m-2 ">
          <p className="mb-2">Chief Complaints</p>
          <textarea
            name="Problems"
            className=" border w-4/5 text-black border-gray-300 h-20 p-2 bg-blue-200"
          ></textarea>
        </div>

        <div className="w-4/5  p-2  items-center m-2 ">
          <p className="mb-2">Systematic History</p>
          <textarea
            name="Problems"
            className=" border w-full text-black border-gray-300 h-10 p-2 bg-blue-200"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
