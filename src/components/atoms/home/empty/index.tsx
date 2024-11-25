import useCreateNote from "../../../../hooks/useCreateNote";

const Empty = () => {
  const handleAddNote = useCreateNote();

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-900">
      <div className="text-5xl mb-6">
        <span>📒</span>
      </div>
      <p className="text-xl mb-4">노트를 만들어보세요.</p>
      <button
        className="bg-gray-600 hover:bg-gray-500 py-2 px-4 rounded"
        //
        onClick={handleAddNote}
      >
        노트 작성
      </button>
    </div>
  );
};

export default Empty;
