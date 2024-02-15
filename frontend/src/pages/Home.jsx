import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/books")
      .then((response) => {
        setBooks(response.data.data); //response.data will get this object {count , data}
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
    <div className="flex justify-between items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Books List</h1>
      <Link to="/books/create">
        <MdOutlineAddBox className="text-sky-800 text-5xl hover:text-sky-600 transition duration-300" />
      </Link>
    </div>
    {loading ? (
      <Spinner />
    ) : (
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border border-gray-300">No</th>
            <th className="py-2 px-4 border border-gray-300">Title</th>
            <th className="py-2 px-4 border border-gray-300 lg:table-cell">Author</th>
            <th className="py-2 px-4 border border-gray-300 lg:table-cell">Publish Year</th>
            <th className="py-2 px-4 border border-gray-300">Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className="text-center bg-white">
              <td className="py-2 px-4 border border-gray-300">{index + 1}</td>
              <td className="py-2 px-4 border border-gray-300">{book.title}</td>
              <td className="py-2 px-4 border border-gray-300 lg:table-cell">{book.author}</td>
              <td className="py-2 px-4 border border-gray-300 lg:table-cell">{book.publishYear}</td>
              <td className="py-2 px-4 border border-gray-300">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className="text-2xl text-green-800 hover:text-green-600 transition duration-300" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-yellow-400 transition duration-300" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600 hover:text-red-400 transition duration-300" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  );
};

export default Home;
