import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

const useCreateNote = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleAddNote = () => {
    const id = v4();
    const time = dayjs().format("YYYY-MM-DD HH:mm:ss");
    dispatch({
      type: "notes/addNote",
      payload: {
        id,
        title: "제목",
        content: "메모 내용",
        summary: "요약 내용",
        time,
      },
    });

    navigation(`/note/${id}`);
  };

  return handleAddNote;
};

export default useCreateNote;
