import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { BASE_URL } from "../baseurl.js";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch book details when the component mounts
    axios
      .get(`${BASE_URL}/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching book details:", error);
      });
  }, [id]);

  const handleDeleteBook = () => {
    setLoading(true);

    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error deleting book:", error);
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-4xl font-bold text-gray-800 my-6">Delete Book</h1>

      {book ? (
        <div>
          <div className="flex flex-col bg-white border border-gray-200 rounded-lg p-4 shadow-md">
            <div className="grid grid-cols-12">
              <label className="col-span-2 text-gray-700 font-bold pb-1">
                Id
              </label>
              <span className="col-span-10 text-gray-500">{book._id}</span>
              <label className="col-span-2 text-gray-700 font-bold pb-1">
                Title
              </label>
              <span className="col-span-10 text-gray-500">{book.title}</span>
              <label className="col-span-2 text-gray-700 font-bold pb-1">
                Author
              </label>
              <span className="col-span-10 text-gray-500">{book.author}</span>
              <label className="col-span-2 text-gray-700 font-bold pb-1">
                Publish Year
              </label>
              <span className="col-span-10 text-gray-500">
                {book.publishYear}
              </span>
              <label className="col-span-2 text-gray-700 font-bold pb-1">
                Created Time
              </label>
              <span className="col-span-10 text-gray-500">
                {new Date(book.createdAt).toLocaleString()}
              </span>
              <label className="col-span-2 text-gray-700 font-bold pb-1">
                Updated Time
              </label>
              <span className="col-span-10 text-gray-500">
                {new Date(book.updatedAt).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              onClick={handleDeleteBook}
            >
              Delete Book
            </button>
          </div>
        </div>
      ) : (
        <p className="text-red-500">Book not found.</p>
      )}
    </div>
  );
};

export default BookDetails;
