export function Referral({ referral }: any) {
  return (
    <div>
      <div className="text-xl font-bold border-b-4 border-black">
        <p>Referral</p>
      </div>
      <div className="pb-2 pl-2 p-1">
        <p>{referral}</p>
      </div>
    </div>
  );
}
