export function Modal({ visible, response, onClose }: any) {
  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-2 rounded-md w-96 h-2/5 ">
        <p className="font-semibold text-2xl p-4 ">Error Occur</p>
        <p className="text-lg p-4">{response}</p>
        <p className="text-lg p-4 pb-2">
          {response === "Prescription Created Successfully"
            ? ""
            : "Please try again"}
        </p>
        <div className="p-2">
          <button
            onClick={onClose}
            className="bg-blue-500  text-white p-2 rounded-lg pl-6 pr-6"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
