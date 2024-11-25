import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { RootState } from "../../../stores";
import useCreateNote from "../../../hooks/useCreateNote";

const getNavClass = ({ isActive }: { isActive: boolean }) => {
  return isActive
    ? "text-blue-500 font-semibold"
    : "text-gray-300 hover:text-white";
};

const Layout: React.FC = () => {
  const notes = useSelector((state: RootState) => state.notes);

  const handleAddNote = useCreateNote();

  return (
    <main className="flex h-screen border-[5px] border-red-300 text-white bg-gray-800">
      <div className="w-[230px] p-4">
        <h1 className="text-2xl font-bold mb-4">GPT Note</h1>

        <button
          onClick={handleAddNote}
          className="bg-gray-400 hover:bg-gray-500 w-full py-2 px-4 rounded"
        >
          노트 작성
        </button>

        <div className="mt-4">
          <NavLink to="/" className={getNavClass}>
            홈
          </NavLink>

          <ul className="mt-4">
            {notes.map((note) => (
              <li key={note.id}>
                <NavLink to={`/note/${note.id}`} className={getNavClass}>
                  {note.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grow py-[70px]">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
