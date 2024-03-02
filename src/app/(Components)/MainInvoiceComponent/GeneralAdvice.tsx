export function GeneralAdvice({ general_advice }: any) {
  return (
    <div>
      <div className="text-xl font-bold border-b-4 border-black">
        <p>General Advice</p>
      </div>
      <div className="pb-2 pl-2 p-1">
        <p>{general_advice}</p>
      </div>
    </div>
  );
}
