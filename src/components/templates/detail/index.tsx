import { useNavigate, useParams } from "react-router-dom";
import Button from "../../atoms/detail/button";
import SectionItem from "../../atoms/detail/sectionItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { useDispatch } from "react-redux";
import { deleteNote, Note, updateNote } from "../../../stores/notesSlice";
import dayjs from "dayjs";
import { fetchOpenAI } from "../../../api";

const DetailTemplate = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const note = useSelector((state: RootState) =>
    state.notes.find((note) => note.id === params.id)
  );

  if (!note) {
    return <div>노트가 없습니다.</div>;
  }

  const changeNote = (key: keyof Note, value: string) => {
    const time = dayjs().format("YYYY-MM-DD HH:mm:ss");

    dispatch(
      updateNote({
        ...note,
        time,
        [key]: value,
      })
    );
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeNote("title", e.target.value);
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    changeNote("content", e.target.value);
  };

  const handleChangeSummary = async () => {
    const summary = await fetchOpenAI(note.content);

    changeNote("summary", summary);
  };

  const handleDeleteNote = () => {
    dispatch(deleteNote(note.id));

    navigate("/");
  };

  return (
    <div className="bg-gray-900 p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <time className="block text-gray-400 text-sm">{note.time}</time>
          <input
            className="bg-transparent text-2xl font-bold focus-within:outline-blue-500"
            data-testid="title"
            type="text"
            value={note.title}
            onChange={handleChangeTitle}
          />
        </div>
        <div>
          <Button color="red" onClick={handleDeleteNote}>
            삭제
          </Button>
        </div>
      </div>

      <section className="flex gap-4">
        <SectionItem title={"메모"}>
          <textarea
            className="bg-gray-700 w-full h-64 p-2 rounded resize-none focus:(ring-2 ring-blue-500)"
            data-testid="content"
            value={note.content}
            onChange={handleChangeContent}
          />
          <Button color={"blue"} className="mt-4" onClick={handleChangeSummary}>
            요약
          </Button>
        </SectionItem>

        <SectionItem title={"요약 결과"}>
          <div className="text-gray-300 h-64 bg-gray-700 p-2 rounded">
            {note.summary}
          </div>
        </SectionItem>
      </section>
    </div>
  );
};

export default DetailTemplate;
