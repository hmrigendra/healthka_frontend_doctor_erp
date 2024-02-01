import FollowUpComp from "../(Components)/FollowUpComponent/FollowupComp";
import { FollowUpSlider } from "../(Components)/SliderComponents/FollowUpSlider";
import { DayName, Month } from "../../../public/practiceData";

export default function Appointment() {
  return (
    <div>
      <div className="w-[90%] p-4 m-4 bg-production-indigo rounded-lg">
        <p className="text-lg font-semibold p-2">Appointments</p>
      </div>
      <FollowUpComp />
    </div>
  );
}
