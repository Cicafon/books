import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { Provider } from "react-redux";
import Books from "../pages/Books";
import { store } from "../store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    page: "1",
  }),
  useLocation: () => ({
    search: "?Αλέξανδρος",
  }),
}));

describe("Books", () => {
  //   const book = {
  //     title: "Test",
  //     author: ["test1", "test2"],
  //     year: "2021",
  //     city: "Zurich",
  //     country: "Switzerland",
  //     pages: "220",
  //   };
  beforeEach(async () => {
    render(
      <Provider store={store}>
        <Books />
      </Provider>
    );

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  });

  //success scenario without search param
  it("renders list", () => {
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBeGreaterThan(0);
  });

  //search field
  it.todo("renders list item: authors, title and details");
  it("renders search button", () => {
    const button = screen.getByRole("button", { name: "Search" });
    expect(button).toBeInTheDocument();
  });
  it.todo("renders search field (label and value)");

  // valid search param scenario
  it("list item includes search param", () => {
    const items = screen.getAllByRole("listitem");
    const { getByRole } = within(items[0]);
    const title = getByRole("heading", { name: /Αλέξανδρος/i });
    expect(title).toBeInTheDocument();
  });

  // not found search param scenario
  it.todo("renders No books found with these search parameters");

  //error scenario
  it.todo("fetching error");
});
