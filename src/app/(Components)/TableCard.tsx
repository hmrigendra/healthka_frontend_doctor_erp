export function TableCard() {
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
      <div className="p-6 ">
        <table className="w-full bg-indigo-300 rounded-md">
          <tbody>
            <tr className="flex gap-10">
              <td className="flex justify-center min-w-16 items-center  text-sm">
                1234
              </td>

              <p className="border-2 border-black"></p>
              <td className="flex justify-center min-w-20 items-center  text-sm">
                24 Jan 2024
              </td>
              <p className="border-2 border-black"></p>
              <td className="flex justify-center min-w-[300px] max-w-[300px] overflow-hidden  text-sm">
                There are some Unknown reasons please get so much worried
              </td>

              <p className="border-2 border-black"></p>
              <td className="flex justify-center min-w-[70px] items-center  text-sm">
                24 Jan 2024
              </td>

              <p className="border-2 border-black"></p>
              <td className="flex justify-center items-center min-w-40 text-sm pr-2">
                Open Prescription
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
