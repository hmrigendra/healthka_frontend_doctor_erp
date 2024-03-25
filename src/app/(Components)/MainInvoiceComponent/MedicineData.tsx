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
  duration_unit: string;
  dose_unit: string;
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
          <li>Instructions</li>
        </ul>
        {medicineData ? (
          medicineData.map((data, i) => (
            <div
              key={i}
              className="flex justify-evenly pb-2 border-b-2 border-gray-300 "
            >
              <p className="text-sm min-w-[170px] font-semibold max-w-[170px]  ">
                {data.medicine_name}
              </p>
              <p className="text-sm min-w-[180px] max-w-[180px]  ">
                <span className="min-w-[26px] max-w-[26px] inline-block ">
                  {data.dose}
                  {data.dose_unit}
                </span>

                <span className="min-w-20 ml-4  max-w-20 inline-block">
                  {data.medicine_type}
                </span>
                {data.medicine_type.length > 1 && (
                  <span className="ml-1 mr-1">|</span>
                )}
                <span className="min-w-12  max-w-12 ">{data.dose_code}</span>
              </p>

              <p className="text-sm min-w-[155px] max-w-[155px] ">
                {data.time} {data.time.length > 1 && <span> - </span>}{" "}
                {data.duration}
                <span className="ml-1">{data.duration_unit}</span>
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
