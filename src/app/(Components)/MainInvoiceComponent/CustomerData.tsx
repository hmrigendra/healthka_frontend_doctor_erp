export function CustomerData({ patientData }: any) {
  return (
    <div className="flex justify-between p-2 border-black border-y-2">
      <div className="flex flex-col">
        <p>
          Patient name:{" "}
          <span className="font-semibold"> {patientData.patient_name}</span>
        </p>
        <p>
          Patient number:
          <span className="font-semibold"> {patientData.phone_number}</span>
        </p>
      </div>
      <div className="flex flex-col">
        <p>
          Gender:
          <span className="font-semibold"> {patientData.gender} </span>
        </p>
        <p>
          Age:
          <span className="font-semibold"> {patientData.age}</span>
        </p>
      </div>
    </div>
  );
}
