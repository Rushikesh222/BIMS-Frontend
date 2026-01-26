import { useEffect, useState } from "react";
import { deleteBook, getBooksList } from "../api/books.api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export const BookListing = () => {
  const [BooksData, setBooksData] = useState([]);
  const navigate = useNavigate();

  const getAllBooks = async () => {
    try {
      const response = await getBooksList();
      const{data}=response;
      setBooksData(data);
    }
    catch (error) {
      console.error("Error fetching books:", error);
    }
  };



  const handleDelete=async(bookId)=>{
    try {
      const response = await deleteBook(bookId);
      console.log("Book deleted:", response);
      getAllBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const confirmDelete = (bookId) => {
    swal({
      title: "Delete this book?",
      text: "This action cannot be undone.",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDelete(bookId);
      }
    });
  };

  useEffect(() => {
    getAllBooks();
  }, []);
  console.log("BookListing rendered");
  const users = [
  {
    name: "Sandipan Mukherjee",
    email: "sandipan.m@gmail.com",
    mobile: "+91 98765 43210",
  },
  {
    name: "Puja Sharma",
    email: "puja.sharma@yahoo.co.in",
    mobile: "+91 87654 32109",
  },
  {
    name: "Keya Chatterjee",
    email: "keya.c@hotmail.com",
    mobile: "+91 76543 21098",
  },
  {
    name: "Arnab Das",
    email: "arnab.das@gmail.com",
    mobile: "+91 65432 10987",
  },
  {
    name: "Rituparna Roy",
    email: "ritu.roy@outlook.com",
    mobile: "+91 54321 09876",
  },
];
  const colors = [
  "bg-pink-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-orange-500",
  "bg-purple-500",
];
  return (
  <div className="p-6 bg-gray-100 w-screen ">
    <div className="full flex justify-end items-center mb-6">
      <button onClick={()=>navigate("/books/add")} className="cursor-pointer flex items-center justify-end gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow">
  <span className="material-icons text-base">add</span>
  Add User
</button>
    </div>
      <div className="p-6 mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          {/* Table Head */}
          <thead>
            <tr className="bg-gradient-to-r from-purple-600 to-purple-500 text-white text-sm">
              <th className="text-left px-6 py-3">Author Name</th>
              <th className="text-left px-6 py-3">Title</th>
              <th className="text-left px-6 py-3">Publisher Name</th>
              <th className="text-left px-6 py-3">Publisher On Year</th>
              <th className="text-left px-6 py-3">Price</th>
              <th className="text-left px-6 py-3">Updated</th>

              <th className="text-center px-6 py-3">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {BooksData && BooksData.length > 0 ? (
              BooksData.map((book, index) => (
                <tr
                  key={index}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  {/* User Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 flex items-center justify-center rounded-full text-white font-semibold ${
                          colors[index % colors.length]
                        }`}
                      >
                        {book.author.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-800">
                        {book.author}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {book.title}
                  </td>

                  {/* Mobile */}
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {book.publisher}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {book.yearPublished}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {book.price}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {moment(book.updatedAt).format("MMM DD, YYYY h:mm A")}
                  </td>


                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={()=>navigate(`/books/${book._id}`)} className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-600 bg-green-100 rounded-md hover:bg-green-200">
                        <span className="material-icons">edit</span>
                      </button>
                      <button onClick={()=>confirmDelete(book._id)} className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200">
                    <span className="material-icons">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}