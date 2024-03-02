interface testData {
  test_name: string;
  advice: string;
}
interface data {
  test: testData[];
  diagnosis_history: string;
}

export function Diagnosis({ diagnosis_history, test }: data) {
  return (
    <div>
      <div className="border-b-4 border-black">
        <p className="text-lg font-bold  mt-2">Diagnosis</p>
      </div>
      <div className="">
        <p>{diagnosis_history}</p>
      </div>
      <div>
        <div className="border-b-4 border-black">
          <p className="text-lg font-bold  mt-2">Test</p>
        </div>
        <div>
          {test.map((data, i) => (
            <div key={i} className="flex justify-around p-2">
              <p>{data.test_name}</p>
              <p>{data.advice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
