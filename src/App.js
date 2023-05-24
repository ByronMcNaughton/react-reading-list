import { useEffect } from "react";
import BookCreate from "./Components/BookCreate";
import BookList from "./Components/BookList";
import { useContext } from "react";
import BooksContext from "./context/books";

function App() {
  const { fetchBooks } = useContext(BooksContext);

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList />
      <BookCreate />
    </div>
  );
}

export default App;
