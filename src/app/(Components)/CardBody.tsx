import Image from "next/image";
export function CardBody({
  ImageData,
  altData,
}: {
  ImageData: string;
  altData: string;
}) {
  return (
    <div className="flex  align-middle justify-end p-6 pr-12">
      <Image
        src={ImageData}
        alt={altData}
        width={105}
        height={105}
        className=""
      />
    </div>
  );
}
