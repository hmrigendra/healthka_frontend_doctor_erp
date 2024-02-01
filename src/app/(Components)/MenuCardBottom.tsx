export function MenuCardBottom({
  heading,
  color,
}: {
  heading: string;
  color: string;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 90 1440 200">
      <path
        fill={color}
        fill-opacity="1"
        d="M0,192L60,176C120,160,240,128,360,144C480,160,600,224,720,224C840,224,960,160,1080,128C1200,96,1320,96,1380,96L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
      ></path>
      <text fontSize="24" x="100" y="100" className="text-black">
        {heading}
      </text>
    </svg>
  );
}
