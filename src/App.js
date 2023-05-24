import { useEffect, useState } from "react";
import BookCreate from "./Components/BookCreate";
import BookList from "./Components/BookList";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:3001/books");

    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

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
    const res = await axios.delete(`http://localhost:3001/books/${id}`);

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

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList
        books={books}
        onDelete={handleDeleteBookById}
        onEdit={handleEditBookById}
      />
      <BookCreate onSubmit={handleCreateBook} />
    </div>
  );
}

export default App;
