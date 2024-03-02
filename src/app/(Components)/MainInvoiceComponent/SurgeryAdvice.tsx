export function SurgeryAdvice({ surgery_advice }: any) {
  return (
    <div>
      <div className="text-xl font-bold border-b-4 border-black">
        <p>Surgery Advice</p>
      </div>
      <div className="p-2">
        <p>{surgery_advice}</p>
      </div>
    </div>
  );
}
