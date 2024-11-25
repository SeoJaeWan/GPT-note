import { act, getByTestId, render, waitFor } from "@testing-library/react";
import setupStore from "../stores";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { RoutePath } from "../routes";
import { addNote } from "../stores/notesSlice";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";

describe("노트 정렬", () => {
  it("버튼 클릭 시 정렬", async () => {
    const store = setupStore();

    const { getByText, getAllByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <RoutePath />
        </MemoryRouter>
      </Provider>
    );

    const notes = [
      {
        id: "1",
        title: "2 title",
        content: "content 1",
        summary: "summary 1",
        time: "2024-11-21 12:00:00",
      },
      {
        id: "2",
        title: "1 title",
        content: "content 2",
        summary: "summary 1",
        time: "2024-11-24 12:00:00",
      },
      {
        id: "3",
        title: "3 title",
        content: "content 3",
        summary: "summary 1",
        time: "2024-11-25 12:00:00",
      },
    ];

    act(() =>
      notes.forEach((note) => {
        store.dispatch(addNote(note));
      })
    );

    await act(async () => await userEvent.click(getByText("최신순")));

    await waitFor(() => {
      const sortedNotes = getAllByTestId("note-title");

      expect(sortedNotes[0].textContent).toBe("3 title");
      expect(sortedNotes[1].textContent).toBe("1 title");
      expect(sortedNotes[2].textContent).toBe("2 title");
    });

    await act(async () => await userEvent.click(getByText("이름순")));

    await waitFor(() => {
      const sortedNotes = getAllByTestId("note-title");

      expect(sortedNotes[0].textContent).toBe("1 title");
      expect(sortedNotes[1].textContent).toBe("2 title");
      expect(sortedNotes[2].textContent).toBe("3 title");
    });
  });
});
