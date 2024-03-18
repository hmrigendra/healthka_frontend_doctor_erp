interface Data {
  medicineData: MedicineDataItem[];
}

interface MedicineDataItem {
  medicine_name: string;
  medicine_type: string;
  dose: string;
  time: string;
  duration: string;
  advice: string;
  dose_code: string;
}

export function MedicineData({ medicineData }: Data) {
  return (
    <div className="mb-2">
      <div className="border-b-4 border-black">
        <p className="text-lg font-bold">Medicine Advised</p>
      </div>
      <div className="mb-2">
        <ul className="flex justify-between p-2 font-semibold">
          <li className="min-w-[170px] ">Medicine name</li>
          <li>Dose</li>
          <li>Timing</li>
          <li>Advice</li>
        </ul>
        {medicineData ? (
          medicineData.map((data, i) => (
            <div key={i} className="flex justify-between pb-2 ">
              <p className="text-sm min-w-[210px] max-w-[210px]  ">
                {data.medicine_name}
              </p>
              <p className="text-sm min-w-[125px] max-w-[125px] ">
                {data.dose}{" "}
                <span className="min-w-14 max-w-14 inline-block">
                  {data.medicine_type}
                </span>
                {data.medicine_type.length > 1 && (
                  <span className="ml-1 mr-1">|</span>
                )}
                {data.dose_code}
              </p>

              {/* <p>{data.time}</p> */}
              <p className="text-sm min-w-[155px] max-w-[155px]">
                {data.time} {data.time.length > 1 && <span> - </span>}{" "}
                {data.duration}
              </p>
              <p className="min-w-[105px] text-sm max-w-[105px]">
                {data.advice}
              </p>
            </div>
          ))
        ) : (
          <p>No medicine data available</p>
        )}
      </div>
    </div>
  );
}
