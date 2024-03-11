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
}

export function MedicineData({ medicineData }: Data) {
  return (
    <div className="mb-2">
      <div className="border-b-4 border-black">
        <p className="text-lg font-bold">Medicine Advised</p>
      </div>
      <div className="mb-2">
        <ul className="flex justify-between p-2 font-semibold">
          <li className="min-w-[200px] ">Medicine name</li>
          <li>Type</li>
          <li>Dose</li>
          {/* <li>Before/After</li> */}
          <li>Duration</li>
          <li>Extra</li>
        </ul>
        {medicineData ? (
          medicineData.map((data, i) => (
            <div key={i} className="flex justify-between pb-2 ">
              <p className="text-sm min-w-[210px] max-w-[200px]  ">
                {data.medicine_name}
              </p>
              <p className="min-w-[70px] max-w-[70px]   flex justify-start truncate">
                {data.medicine_type}
              </p>
              <p className="max-w-[1px]">{data.dose}</p>
              {/* <p>{data.time}</p> */}
              <p className="max-w-[60px]">{data.duration}</p>
              <p className="min-w-[75px] text-sm max-w-[75px]">{data.advice}</p>
            </div>
          ))
        ) : (
          <p>No medicine data available</p>
        )}
      </div>
    </div>
  );
}
