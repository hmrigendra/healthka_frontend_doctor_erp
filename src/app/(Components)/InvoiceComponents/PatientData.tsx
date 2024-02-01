export function PatientData() {
  return (
    <div className="bg-white text-black items-center flex flex-col ">
      <p className="text-xl font-semibold text-blue-600">
        Personal Information
      </p>
      <div className=" flex w-1/2 items-center p-2 ">
        <p className="font-bold">Name</p>
        <textarea className="bg-blue-200 w-full h-8 border  border-gray-300" />
      </div>
      <div className="flex items-center ">
        <p className="font-bold">Age</p>
        <input
          type="text"
          className="w-20 bg-blue-200 border  border-gray-300"
        />
        <p className="font-bold">Gender</p>
        <input
          type="text"
          className="w-10 bg-blue-200 border  border-gray-300"
        />
        <div className="flex items-center">
          <p className="font-bold">Phone No. </p>
          <input
            type="number"
            className="w-1.50 bg-blue-200 border  border-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
