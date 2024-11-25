import { MemoryRouter } from "react-router-dom";
import { expect, Mock, vi } from "vitest";
import { Provider } from "react-redux";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RoutePath } from "../routes";
import setupStore from "../stores";
import axios from "axios";

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("노트 추가 및 편집 기능", () => {
  it("새로운 노트 추가, notes 라우팅, 사이드바에 링크 추가", async () => {
    const store = setupStore();

    // 메모리 라우터로 테스트하면 메모리 라우터는 브라우저의 주소창을 사용하지 않음
    // 즉, 브라우저의 히스토리를 사용하지 않음
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <RoutePath />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(getAllByText("노트 작성")[0]);

    const id = store.getState().notes[0].id;

    await waitFor(() => {
      expect(getByText("삭제")).toBeInTheDocument();
    });

    expect(getByText("제목")).toHaveAttribute("href", `/note/${id}`);
  });

  it("노트 수정, 사이드바 명칭 변경", async () => {
    const store = setupStore();

    const { getByTestId, getAllByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <RoutePath />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(getAllByText("노트 작성")[0]);

    const id = store.getState().notes[0].id;

    const titleEl = getByTestId("title");
    const contentEl = getByTestId("content");

    await userEvent.clear(titleEl);
    await userEvent.clear(contentEl);

    await userEvent.type(titleEl, "제목 수정");
    await userEvent.type(contentEl, "내용 수정");

    const updatedNote = store.getState().notes.find((n) => n.id === id);

    expect(updatedNote?.title).toBe("제목 수정");
    expect(updatedNote?.content).toBe("내용 수정");
  });

  it("요약 기능", async () => {
    const store = setupStore();

    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <RoutePath />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(getAllByText("노트 작성")[0]);

    const id = store.getState().notes[0].id;

    const mockResponse = {
      data: {
        choices: [
          {
            message: {
              content: "요약된 내용",
            },
          },
        ],
      },
    };

    (axios.post as Mock).mockResolvedValueOnce(mockResponse);

    await userEvent.click(getByText("요약"));

    const updatedNote = store.getState().notes.find((n) => n.id === id);

    expect(updatedNote?.summary).toBe("요약된 내용");
  });
});
