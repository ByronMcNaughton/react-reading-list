import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:3001/books");

    setBooks(res.data);
  };

  const handleCreateBook = async (title) => {
    // setBooks([
    //   ...books,
    //   { id: Math.round(Math.random() * 10000000000), title },
    // ]);
    const res = await axios.post("http://localhost:3001/books", {
      title,
    });
    setBooks([...books, res.data]);
  };

  const handleDeleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);

    setBooks(
      books.filter((book) => {
        return book.id !== id;
      })
    );
  };

  const handleEditBookById = async (id, newTitle) => {
    const res = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    setBooks(
      books.map((book) => {
        if (book.id === id) {
          return { ...book, ...res.data };
        }
        return book;
      })
    );
  };

  const values = {
    books,
    fetchBooks,
    handleCreateBook,
    handleDeleteBookById,
    handleEditBookById,
  };

  return (
    <BooksContext.Provider value={values}>{children}</BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;
