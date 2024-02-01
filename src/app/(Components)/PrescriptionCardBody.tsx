import Image from "next/image";
export function PrescriptionCardBody() {
  return (
    <div className="m-4 mt-8 ml-8 bg-blue-200 text-center flex justify-around">
      <div className="flex flex-col justify-center ">
        <button className="inline-block bg-production-green pr-5 pl-5 text-indigo-900 font-bold  rounded-md mb-2 p-2">
          Create
        </button>
      </div>
      <Image
        src="/Prescription.png"
        width={105}
        height={75}
        alt="Prescription"
        className="ml-2  -rotate-12"
      />
    </div>
  );
}
