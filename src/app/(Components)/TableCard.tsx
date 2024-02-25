interface PrescriptionData {
  _id: String;
  prescription_id: String;
  case_history: String;
  follow_status: String;
  createdAt: String;
}

interface TableCardProps {
  prescriptions: PrescriptionData[]; // Define the prop type
}

export function TableCard({ prescriptions }: TableCardProps) {
  return (
    <div className="flex flex-col items-center ml-32 w-3/4 p-6 bg-white shadow-lg">
      <h1 className="bg-indigo-500  font-bold text-white w-full rounded-t-lg p-1 pl-2">
        Visit History
      </h1>
      <table className="w-full bg-indigo-300 rounded-md ">
        <thead>
          <tr className="flex gap-12 p-2">
            <th className="pr-16 ml-2">UID</th>
            <th className="pr-16 ml-2">Date</th>
            <th className="pr-32 ml-4 pl-16 min-w-[350px]">Reason for visit</th>
            <th className="pr-16  ml-2 min-w-[120px]">Follow Up</th>
            <th className="pr-16 ml-2">Prescription</th>
          </tr>
        </thead>
      </table>
      {prescriptions.map((data) => (
        <div key={data._id.toString()} className="p-1">
          <table className="w-full bg-indigo-300 rounded-md">
            <tbody>
              <tr className="flex gap-10">
                <td className="flex justify-center min-w-16 max-w-20 items-center m-3    text-sm">
                  {data.prescription_id}
                </td>

                <p className="border-2 border-black"></p>
                <td className="flex justify-center min-w-10 items-center  text-sm">
                  {data.createdAt}
                </td>
                <p className="border-2 border-black"></p>
                <td className="flex justify-center min-w-[300px] max-w-[300px] overflow-hidden  text-sm">
                  {data.case_history}
                </td>

                <p className="border-2 border-black"></p>
                <td className="flex justify-center min-w-[70px] items-center  text-sm">
                  {data.follow_status}
                </td>

                <p className="border-2 border-black"></p>
                <td className="flex justify-center items-center min-w-40 text-sm pr-2">
                  Open Prescription
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
