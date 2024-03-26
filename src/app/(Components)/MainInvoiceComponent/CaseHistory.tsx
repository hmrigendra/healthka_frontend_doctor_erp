interface VitalsData {
  vites_name: string;
  vite_result: string;
}

interface CaseHistoryProps {
  case_history: string;
  vitals: VitalsData[];
}
export function CaseHistory({ case_history, vitals }: CaseHistoryProps) {
  return (
    <div>
      <div className="p-1 text-lg font-semibold border-black border-y-2">
        <p>Case History</p>
      </div>
      <div className="p-1">
        <h3 className=" border-black font-semibold text-sm p-2">Complaint</h3>
        <p>{case_history}</p>
      </div>
      <div className="p-1 ">
        <h3 className=" border-black font-semibold text-sm p-2">Vitals</h3>
        <div className="pl-4 flex flex-wrap">
          {vitals.map((data, i) => (
            <div key={i}>
              {data.vites_name.length > 1 && (
                <span className="pr-2  pl-1">{data.vites_name} :</span>
              )}
              {data.vites_name.length > 1 && (
                <span className="pr-2 border-r-2 border-black">
                  {data.vite_result}
                </span>
              )}
              {i !== vitals.length - 1 && data.vites_name.length > 1 && (
                <span>|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
