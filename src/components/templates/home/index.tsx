import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../../stores";
import Empty from "../../atoms/home/empty";
import { useState } from "react";
import dayjs from "dayjs";

type Order = "latest" | "name";

const HomeTemplate = () => {
  const notes = useSelector((state: RootState) => state.notes);
  const [sortOder, setSortOrder] = useState<Order>("latest");

  const sortedNotes = [...notes].sort((a, b) => {
    if (sortOder === "latest") {
      return dayjs(b.time).unix() - dayjs(a.time).unix();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  const handleSort = (order: Order) => {
    setSortOrder(order);
  };

  return (
    <div className="max-w-[1030px] m-auto rounded-lg bg-gray-900 p-4">
      <p>{sortOder}</p>
      <div className="flex justify-end space-x-4 mb-4">
        <button
          className={`bg-gray-800 py-2 px-4 rounded-full ${
            sortOder === "latest" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => handleSort("latest")}
        >
          최신순
        </button>
        <button
          className={`bg-gray-800 py-2 px-4 rounded-full ${
            sortOder === "name" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => handleSort("name")}
        >
          이름순
        </button>
      </div>

      {sortedNotes.length ? (
        <ul>
          {sortedNotes.map((note) => (
            <li key={note.id}>
              <NavLink
                to={`/note/${note.id}`}
                className="flex items-center justify-between bg-gray-800 p-4 rounded-lg mb-2 hover:bg-gray-700"
              >
                <div>
                  <h3
                    data-testid="note-title"
                    className="text-lg font-semibold"
                  >
                    {note.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {note.content.slice(0, 100)}
                  </p>
                </div>
                <div>
                  <time className="text-sm text-gray-400">{note.time}</time>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default HomeTemplate;
