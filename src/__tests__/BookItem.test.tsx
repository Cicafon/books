import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BookItem from "../components/books/BookItem";
import { Book } from "../models";

describe("BookItem", () => {
  const book: Book = {
    id: 1,
    title: "Test",
    author: ["test1", "test2"],
    year: 2021,
    city: "Zurich",
    country: "Switzerland",
    pages: 220,
  };
  beforeEach(() => {
    render(<BookItem book={book} />);
  });
  it("renders Author(s) text", () => {
    const text = screen.getByText("Author(s): test1, test2");
    expect(text).toBeInTheDocument();
  });
  it("renders title", () => {
    const text = screen.getByText("Test");
    expect(text).toBeInTheDocument();
  });
  it("renders year country city pages", () => {
    const text = screen.getByText(/2021 Switzerland, Zurich, 220 pages/);
    expect(text).toBeInTheDocument();
  });
});
