"use client";
import { useRef, useState } from "react";
import { Header } from "../(Components)/MainInvoiceComponent/Header";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import ReactToPrint from "react-to-print";
import { useSearchParams } from "next/navigation";

export default function Bill() {
  const [edit, setEdit] = useState(false);

  const router = useSearchParams();
  const name = router.get("customer_name");
  const age = router.get("age");
  const gender = router.get("gender");
  const number = router.get("number");

  const [service, setService] = useState([
    {
      service_name: "",
      charges: "",
    },
  ]);

  const getTotalCharges = () => {
    return service.reduce((total, current) => {
      return total + parseFloat(current.charges || "0");
    }, 0);
  };

  const addNewService = () => {
    setService([...service, { service_name: "", charges: "" }]);
  };

  const removeService = (i: number) => {
    setService((data) => data.filter((_, index) => index !== i));
  };

  const handleTestChange = (index: number, field: string, value: string) => {
    const updateService = [...service];
    updateService[index][field as keyof (typeof service)[0]] = value;
    setService(updateService);
  };
  const handlePrint = () => {
    window.print();
  };
  const componentRef = useRef(null);

  return (
    <main className="h-screen md:max-w-xl md:mx-auto xl:max-w-4xl xl:mx-auto m-5 p-5 rounded shadow-xl lg:max-w-xl lg:mx-auto bg-white">
      <ReactToPrint
        trigger={() => <button>print/save</button>}
        content={() => componentRef.current}
      />
      {edit && (
        <div ref={componentRef} className="p-10">
          <div className="flex flex-col min-h-[85vh]">
            <Header />
            <div className="flex justify-between p-1 border-b-2 border-black">
              <div>
                <p>Name : {name}</p>
                <p>Phone NO: {number}</p>
              </div>
              <div>
                <p>Age :{age}</p>
                <p>Gender :{gender}</p>
              </div>
            </div>
            <div className="flex justify-center mb-1">
              <p className="text-2xl font-bold">Bill</p>
            </div>
            <div className="border-y-2 border-black"></div>
            {service.map((data, i) => (
              <div key={i} className="flex justify-between p-10">
                <p className="font-semibold text-xl">{data.service_name}</p>
                <p className="text-xl">Rs: {data.charges}</p>
              </div>
            ))}
            {/* Add this div for the total price */}
            <div className="border-t-2 border-black mt-auto p-2">
              <div className="flex justify-between">
                <p className="font-semibold text-xl">Total:</p>
                <p className="text-xl font-bold">Rs {getTotalCharges()}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {edit && (
        <div className="p-5">
          <button
            onClick={() => setEdit(!edit)}
            className="p-2 pl-6 pr-6 bg-blue-500 text-white font-semibold rounded-md"
          >
            EDIT
          </button>
        </div>
      )}
      {edit === false && (
        <div>
          <div className="flex justify-center mb-10 font-bold text-2xl">
            <p>BIll</p>
          </div>
          {service.map((data, i) => (
            <div key={i} className="flex justify-between m-1">
              <div className="">
                <label className="p-1" htmlFor="service_name">
                  Service name
                </label>
                <input
                  className="border-2 rounded-md p-1 border-gray-400"
                  type="text"
                  placeholder="Service Name"
                  value={data.service_name}
                  onChange={(e) =>
                    handleTestChange(i, "service_name", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="p-1" htmlFor="charges">
                  Charges
                </label>
                <input
                  type="text"
                  className="border-2 rounded-md p-1 border-gray-400"
                  placeholder="Charges"
                  value={data.charges}
                  onChange={(e) =>
                    handleTestChange(i, "charges", e.target.value)
                  }
                />
              </div>

              <div>
                <FaPlusCircle onClick={addNewService} className="size-5 mt-2" />
              </div>
              {i > 0 && (
                <FaMinusCircle
                  className="size-5 mt-2"
                  onClick={() => removeService(i)}
                />
              )}
            </div>
          ))}
          <div className="p-5">
            <button
              onClick={() => setEdit(!edit)}
              className="p-2 pl-6 pr-6 bg-blue-500 text-white font-semibold rounded-md"
            >
              EDIT
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
