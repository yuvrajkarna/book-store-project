import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { BASE_URL } from "../baseurl.js";

const ShowBook = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);
  
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg p-4 shadow-md">
          <div className="grid grid-cols-12">
            <label className="col-span-2 text-gray-700 font-bold pb-1">Id</label>
            <span className="col-span-10 text-gray-500">{book._id}</span>
            <label className="col-span-2 text-gray-700 font-bold pb-1">Title</label>
            <span className="col-span-10 text-gray-500">{book.title}</span>
            <label className="col-span-2 text-gray-700 font-bold pb-1">Author</label>
            <span className="col-span-10 text-gray-500">{book.author}</span>
            <label className="col-span-2 text-gray-700 font-bold pb-1">Publish Year</label>
            <span className="col-span-10 text-gray-500">{book.publishYear}</span>
            <label className="col-span-2 text-gray-700 font-bold pb-1">Created Time</label>
            <span className="col-span-10 text-gray-500">{new Date(book.createdAt).toLocaleString()}</span>
            <label className="col-span-2 text-gray-700 font-bold pb-1">Updated Time</label>
            <span className="col-span-10 text-gray-500">{new Date(book.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
