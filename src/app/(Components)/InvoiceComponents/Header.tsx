"use client";
import Image from "next/image";
export function InvoiceHeader() {
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className=" bg-white flex w-full p-6 justify-between ">
      <div className="flex">
        <Image
          src={
            "https://cdn4.vectorstock.com/i/1000x1000/14/08/modern-healthcare-clinic-hospital-logo-design-vector-43841408.jpg"
          }
          alt={"SomeImage"}
          width={105}
          height={55}
          className="max-w-20"
          onClick={handlePrint}
        ></Image>
        <div className="max-w-72 m-4 ">
          <h4>A GENTLE TOUCH FAMILY CLINIC</h4>
          <p>Any name of the clinic PVT LTD</p>
        </div>
      </div>
      <div className="">
        <p className="max-w-48 text-sm flex-wrap">
          11th Main Rd, Koramangala 4th Block, Bengaluru, Karnataka 560034
        </p>
        <p>Ph: 1234567890/0987654321</p>
        <p>www.myWebsite.com</p>
        <p>Email Id: something@gmail.com</p>
      </div>
    </div>
  );
}
