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
import { setupServer } from "msw/node";
import { DefaultRequestBody, rest } from "msw";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    page: "1",
  }),
  useLocation: () => ({
    search: "?q=searchtest",
  }),
}));

const server = setupServer(
  rest.post<DefaultRequestBody, any>(
    `${process.env.REACT_APP_API_URL}/api/books`,
    (req, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.json({
          count: 2,
          books: [
            {
              id: "1",
              book_title: "First title",
              book_author: ["John", "Jack"],
              book_publication_year: "2021",
              book_publication_city: "Zurich",
              book_publication_country: "Switzerland",
              book_pages: "220",
            },
            {
              id: "2",
              book_title: "Second title",
              book_author: ["Bill", "Will"],
              book_publication_year: "2019",
              book_publication_city: "Budapest",
              book_publication_country: "Hungary",
              book_pages: "100",
            },
          ],
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Books", () => {
  
  //success scenario
  describe("error scenario", () => {
    beforeEach(async () => {
      render(
        <Provider store={store}>
          <Books />
        </Provider>
      );

      await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    });
    it("renders list", () => {
      const items = screen.getAllByRole("listitem");
      expect(items.length).toBeGreaterThan(0);
    });
    it("renders list item: authors, title and details", () => {
      const items = screen.getAllByRole("listitem");
      const { getByText } = within(items[0]);
      const { getByRole } = within(items[0]);
      const authors = getByText("Author(s): John, Jack");
      const title = getByRole("heading", { name: /First title/i });
      const details = getByText("2021 Switzerland, Zurich, 220 pages");
      expect(authors).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(details).toBeInTheDocument();
    });

    //search field
    it("renders search button", () => {
      const button = screen.getByRole("button", { name: "Search" });
      expect(button).toBeInTheDocument();
    });
    it("renders search field (label and value)", () => {
      const label = screen.getByLabelText("Search");
      const searchInput = screen.getByDisplayValue("searchtest");
      expect(label).toBeInTheDocument();
      expect(searchInput).toBeInTheDocument();
    });
  });

  // not found search param scenario
  describe("no data scenario", () => {
    beforeEach(async () => {
      server.use(
        rest.post<DefaultRequestBody, any>(
          `${process.env.REACT_APP_API_URL}/api/books`,
          (req, res, ctx) => {
            return res.once(
              ctx.json({
                count: 2,
                books: [],
              })
            );
          }
        )
      );

      render(
        <Provider store={store}>
          <Books />
        </Provider>
      );
      await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    });
    it("renders No books found with these search parameters", () => {
      const notFoundText = screen.getByText(
        /No books found with these search parameters/i
      );
      expect(notFoundText).toBeInTheDocument();
    });
  });

  //error scenario
  describe("error scenario", () => {
    beforeEach(async () => {
      server.use(
        rest.post<DefaultRequestBody, any>(
          `${process.env.REACT_APP_API_URL}/api/books`,
          (req, res, ctx) => {
            return res.once(
              ctx.status(500),
              ctx.json({
                message: "Sorry, something happened!",
              })
            );
          }
        )
      );

      render(
        <Provider store={store}>
          <Books />
        </Provider>
      );
      await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    });

    it("renders error text", () => {
      const errorText = screen.getByText(
        /Oop, error happened. Cannot fetch books/i
      );
      expect(errorText).toBeInTheDocument();
    });

    it("not to render searchfield", () => {
      const label = screen.queryByLabelText("Search");
      const searchInput = screen.queryByDisplayValue("searchtest");
      expect(label).not.toBeInTheDocument();
      expect(searchInput).not.toBeInTheDocument();
    });
  });
});
