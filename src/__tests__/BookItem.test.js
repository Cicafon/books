import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BookItem from "../components/books/BookItem";

describe("BookItem", () => {
  const book = {
    title: "Test",
    author: ["test1", "test2"],
    year: "2021",
    city: "Zurich",
    country: "Switzerland",
    pages: "220",
  };
  it("renders BookItem Component", () => {
    render(<BookItem book={book} />);
  });
  it("renders Author(s) text", () => {
    render(<BookItem book={book} />);
    const text = screen.getByText("Author(s)", { exact: false });
    expect(text).toBeInTheDocument();
  });
  it("renders pages) text", () => {
    render(<BookItem book={book} />);
    const text = screen.getByText("pages", { exact: false });
    expect(text).toBeInTheDocument();
  });
});
