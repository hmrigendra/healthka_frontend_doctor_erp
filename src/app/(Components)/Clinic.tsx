export function Clinic() {
  return (
    <div className="w-full">
      <div className="flex">
        <div className="flex-col w-1/2 ">
          <p>Clinic name</p>
          <input
            type="text"
            placeholder="Clinic name"
            className="bg-red-200 rounded-lg m-3  placeholder:text-gray-500 w-[70%] p-2"
          />
        </div>
        <div className="flex-col">
          <p>Clinic Phone number</p>
          <input
            type="text"
            placeholder="Phone number"
            className="bg-red-200 rounded-lg  m-3  placeholder:text-gray-500 w-[100%] p-2"
          />
        </div>
      </div>
    </div>
  );
}
