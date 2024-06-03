import React from "react";

const Favorites = ({ favorites }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Favorite Books</h2>
      {favorites.length === 0 ? (
        <p>No favorite books yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((book) => (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
