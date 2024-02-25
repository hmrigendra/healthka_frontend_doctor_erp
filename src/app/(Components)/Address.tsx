export function Address() {
  return (
    <div>
      <div>
        <p>Address</p>
      </div>
      <div className="flex w-full m-3">
        <input
          type="text"
          className="w-2/6 mr-10 p-2  bg-red-200 rounded-lg placeholder:text-gray-500"
          placeholder="House No./Room No./Apartment Name"
        />
        <input
          type="text"
          className="w-2/6 p-2  bg-red-200 rounded-lg placeholder:text-gray-500"
          placeholder="Locality/Lane/colony/Road"
        />
      </div>
      <div className="flex w-full m-3">
        <input
          type="text"
          className="w-2/6 p-2  bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
          placeholder="District/City/Village"
        />
        <input
          type="text"
          className="w-2/6 p-2  bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
          placeholder="Landmark"
        />
      </div>
      <div className="flex w-full m-3">
        <div className="flex-col">
          <input
            type="text"
            className="w-1/2 p-2 m-2  bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
            placeholder="City"
          />
          <input
            type="text"
            className="w-1/2 p-2 m-2 bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
            placeholder="State"
          />
        </div>
        <div className="flex-col ">
          <input
            type="text"
            className="w-1/2 p-2 m-2 bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
            placeholder="Pincode"
          />
          <input
            type="text"
            className="w-1/2 p-2 m-2 bg-red-200  rounded-lg mr-10 placeholder:text-gray-500"
            placeholder="Country"
          />
        </div>
      </div>
    </div>
  );
}
