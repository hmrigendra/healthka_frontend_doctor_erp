import { Advice } from "../(Components)/InvoiceComponents/Advice";
import { Diagnosis } from "../(Components)/InvoiceComponents/Dignosis";
import { InvoiceHeader } from "../(Components)/InvoiceComponents/Header";
import { Medicine } from "../(Components)/InvoiceComponents/Medicine";
import { PatientData } from "../(Components)/InvoiceComponents/PatientData";
import { CaseHistory } from "../(Components)/InvoiceComponents/Problem";
import { Vites } from "../(Components)/InvoiceComponents/Vites";

export default function Invoice() {
  return (
    <>
      <div className="bg-white">
        <InvoiceHeader />
        <PatientData />
        <CaseHistory />
        <Vites />
        <Medicine />
        <Diagnosis />
        <Advice />
      </div>
    </>
  );
}
