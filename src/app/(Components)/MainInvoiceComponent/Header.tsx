export function Header({ handlePrint }: any) {
  return (
    <header
      onClick={handlePrint}
      className="border-y-2 border-black flex justify-between"
    >
      <div>Image</div>
      <div>Address</div>
    </header>
  );
}
