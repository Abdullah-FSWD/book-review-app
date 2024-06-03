import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import AddBookForm from "./AddBookForm";

const Home = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [isAddBookFormOpen, setIsAddBookFormOpen] = useState(false);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/books`, {
          params: { page, limit: 3, sortBy, order, search },
        });
        setBooks(res.data.books);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page, sortBy, order, search,books]);

  const handleFavorite = async (bookId) => {
    try {
      await axios.post(
        `/api/favorites/${bookId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const favoriteBook = books.find((book) => book._id === bookId);
      setFavorites([...favorites, favoriteBook]);
    } catch (err) {
      console.error(err);
    }
  };
  const handleBookAdded = (newBook) => {
    setBooks([...books, newBook]);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debounceSearch(value);
  };
  const debounceSearch = debounce((value) => {
    setSearch(value);
  }, 300);

  function debounce(func, wait) {}

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="border px-4 py-2 rounded w-full mr-4"
          placeholder="Search by title or author"
          value={search}
          onChange={handleSearchChange}
        />
        <div className="flex">
          <select
            className="border px-4 py-2 rounded mr-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="rating">Rating</option>
          </select>
          <select
            className="border px-4 py-2 rounded"
            value={order}
            onChange={(e) => setOrder(e.target.value)}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddBookFormOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded">
          Add Book
        </button>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book._id} className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold">{book.title}</h3>
              <p className="text-gray-700">{book.author}</p>
              <div className="flex items-center mb-2">
                <div className="text-yellow-500">
                  {"★".repeat(Math.round(book.rating)) +
                    "☆".repeat(5 - Math.round(book.rating))}
                </div>
                <span className="ml-2 text-gray-600">({book.rating})</span>
              </div>
              <p className="text-gray-600">{book.description}</p>
              <button
                onClick={() => handleFavorite(book._id)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                Add to Favorites
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          className="bg-blue-600 text-white px-4 py-2 rounded">
          Previous
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
          className="bg-blue-600 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
      {isAddBookFormOpen && (
        <AddBookForm
          onClose={() => setIsAddBookFormOpen(false)}
          onBookAdded={handleBookAdded}
        />
      )}
    </div>
  );
};

export default Home;
