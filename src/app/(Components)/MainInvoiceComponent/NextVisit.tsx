export function NextVisit({ FollowUpDate, FollowUpTime }: any) {
  return (
    <div>
      <div className="text-xl font-bold border-b-4 border-black">
        <p>Next Visit</p>
      </div>
      <div className="p-2">
        <p>
          {FollowUpDate} ,{FollowUpTime}
        </p>
      </div>
    </div>
  );
}
