import React, { useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const AddBookForm = ({ onClose, onBookAdded }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/books", {
        title,
        author,
        description,
        rating,
      });
      onBookAdded(res.data);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Author</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  className="w-full px-3 py-2 border rounded"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                Add Book
              </button>
            </form>
            <button
              onClick={onClose}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded w-full">
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AddBookForm;
