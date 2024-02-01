export function Advice() {
  return (
    <div className="bg-white text-black">
      <p>General Advice</p>
      <div>
        <textarea name="" id="" className="w-3/4 bg-blue-300"></textarea>
      </div>
      <div className="flex items-center ">
        <p className="pr-2">Referral</p>
        <input type="text" name="" id="" className="bg-blue-300" />

        <p className="pr-2">Follow Up</p>
        <input type="text" name="" id="" className="bg-blue-300" />
      </div>
      <div>
        <p>Surgery Advice</p>
        <textarea name="" className="bg-blue-300 w-3/4" id=""></textarea>
      </div>
    </div>
  );
}
