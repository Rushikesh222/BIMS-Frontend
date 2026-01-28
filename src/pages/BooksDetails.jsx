import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../api/books.api";

export const BooksDetails = () => {
    const [bookData, setBookData] = useState(null);

    const bookId = useParams().id;

    const getBookDetailsById = async () => {
        try {
            const response = await getBookById(bookId);
            setBookData(response.data);
        } catch (error) {
              swal({
                title: "Error",
                text: "Failed to fetch book details.",
                icon: "error",
              });  
        }

    }  
    console.log("BookDetails rendered",bookData); 


    useEffect(() => {
       getBookDetailsById();
    }, [bookId]);

    return (
        <div className="max-w-4xl mx-auto p-4">
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-xl font-semibold mb-6 text-gray-800">
      Book Details
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Item */}
      <div>
        <p className="text-sm text-gray-500">Author Name</p>
        <p className="text-base font-medium text-gray-800">
          {bookData?.author || "N/A"}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Email</p>
        <p className="text-base font-medium text-gray-800">
          {bookData?.email || "N/A"}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Publisher Name</p>
        <p className="text-base font-medium text-gray-800">
          {bookData?.publisher || "N/A"}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Published Year</p>
        <p className="text-base font-medium text-gray-800">
          {bookData?.yearPublished || "N/A"}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Book Title</p>
        <p className="text-base font-medium text-gray-800">
          {bookData?.title || "N/A"}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Stock Status</p>
        <p className="text-base font-medium text-gray-800">
          {bookData?.stockStatus || "N/A"}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Book Price</p>
        <p className="text-base font-medium text-gray-800">
          {bookData?.price || "N/A"}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Book type</p>
        <p className="text-base font-medium text-gray-800">
          {bookData?.genre || "N/A"}
        </p>
      </div>
     
    </div>
  </div>
</div>

    );
}   