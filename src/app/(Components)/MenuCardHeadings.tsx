export function Heading({
  heading,
  color,
}: {
  heading: string;
  color: string;
}) {
  return (
    <div
      className={`text-center text-indigo-900 ${color} text-black font-bold rounded-md p-2 `}
    >
      {heading}
    </div>
  );
}
