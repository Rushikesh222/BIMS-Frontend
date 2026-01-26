import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommonInputFields from "../components/CommonInputFields";
import { createBook, editBook, getBookById } from "../api/books.api";
import swal from "sweetalert";

export const AddEditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    author: "",
    title: "",
    publisher: "",
    yearPublished: "",
    email: "",
    genre: "",
    quantity: "",
    stockStatus: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const fields = [
    { name: "author", label: "Author", type: "text", placeholder: "Author name", errorMessage: "" },
    { name: "title", label: "Title", type: "text", placeholder: "Book title", errorMessage: "" },
    { name: "publisher", label: "Publisher", type: "text", placeholder: "Publisher name", errorMessage: "" },
    { name: "yearPublished", label: "Year Published", type: "number", placeholder: "Year published", errorMessage: "" },
    { name: "email", label: "Email", type: "email", placeholder: "Contact email", errorMessage: "" },
    { name: "genre", label: "Genre", type: "text", placeholder: "Genre", errorMessage: "" },
    { name: "quantity", label: "Quantity", type: "number", placeholder: "Quantity", errorMessage: "" },
    { name: "stockStatus", label: "Stock Status", type: "dropdown", options: [{value:"In Stock", label:"In Stock"},{value:"Out of Stock", label:"Out of Stock"}], placeholder: "Stock Status", errorMessage: "" },
    { name: "price", label: "Price", type: "number", placeholder: "Price", errorMessage: "" },
  ];

  useEffect(() => {
    const loadBook = async () => {
      if (!isEdit) return;
      setLoading(true);
      try {
        const { data } = await getBookById(id);
        console.log("Fetched book data:", data);
        setFormData({
          author: data?.author ?? "",
          title: data?.title ?? "",
          publisher: data?.publisher ?? "",
          yearPublished: data?.yearPublished ?? "",
          email: data?.email ?? "",
          genre: data?.genre ?? "",
          quantity: data?.quantity ?? "",
          stockStatus: data?.stockStatus ?? "",
          price: data?.price ?? "",
        });
      } catch (error) {
        console.error("Failed to load book", error);
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id, isEdit]);

  const handleAddBook=async(data)=>{
    try {
      const response = await createBook(data);
      console.log("Book added:", response);
      if (response?.success) {
        await swal({
          title:"Book added",
          text: "Operation completed successfully.",
          icon: "success",
          timer: 1500,
        });
        navigate("/books");
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  }
  const handleEditBook=async(data)=>{
    try {
      const response = await editBook(id, data);
      console.log("Book updated:", response);
     if (response) {
        await swal({
          title: "Book updated",
          text: "Operation completed successfully.",
          icon: "success",
          timer: 1500,
        });
        navigate("/books");
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();
    const errors = {};
    const isEmpty = (v) => v === undefined || v === null || (typeof v === "string" && v.trim() === "");

    if (isEmpty(formData.author)) errors.author = "This field is required.";
    else if (formData.author.trim().length < 2) errors.author = "Must be at least 2 characters.";

    if (isEmpty(formData.title)) errors.title = "This field is required.";
    else if (formData.title.trim().length < 2) errors.title = "Must be at least 2 characters.";

    if (isEmpty(formData.publisher)) errors.publisher = "This field is required.";
    else if (formData.publisher.trim().length < 2) errors.publisher = "Must be at least 2 characters.";

    if (isEmpty(formData.genre)) errors.genre = "This field is required.";
    else if (formData.genre.trim().length < 2) errors.genre = "Must be at least 2 characters.";

    if (isEmpty(formData.email)) errors.email = "This field is required.";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!emailRegex.test(formData.email.trim())) errors.email = "Please enter a valid email.";
    }

    if (isEmpty(formData.yearPublished)) errors.yearPublished = "This field is required.";
    else {
      const year = Number(formData.yearPublished);
      if (!Number.isInteger(year)) errors.yearPublished = "Enter a valid year.";
      else if (year < 1000 || year > currentYear) errors.yearPublished = `Enter a year between 1000 and ${currentYear}.`;
    }

    if (isEmpty(formData.quantity)) errors.quantity = "This field is required.";
    else {
      const qty = Number(formData.quantity);
      if (!Number.isInteger(qty)) errors.quantity = "Enter a whole number.";
      else if (qty < 0) errors.quantity = "Enter a non-negative integer.";
    }

    if (isEmpty(formData.price)) errors.price = "This field is required.";
    else {
      const p = Number(formData.price);
      if (Number.isNaN(p)) errors.price = "Enter a valid number.";
      else if (p < 0) errors.price = "Enter a non-negative amount.";
    }

    if (isEmpty(formData.stockStatus)) errors.stockStatus = "This field is required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      swal({ title: "Please fix form errors", text: "Some fields are invalid or missing.", icon: "error" });
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...formData,
        yearPublished: Number(formData.yearPublished),
        quantity: Number(formData.quantity),
        price: Number(formData.price),
      };
      isEdit ? handleEditBook(payload) : handleAddBook(payload);
     
    } catch (error) {
      console.error("Save failed", error);
      swal({ title: "Error", text: error?.message || "Failed to save.", icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {isEdit ? "Edit Book" : "Add Book"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CommonInputFields inputData={fields} value={formData} setValue={setFormData} externalErrors={formErrors} />
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer px-4 py-2 bg-[#2f3e2f] text-white rounded-md hover:bg-[#263326]"
            >
              {loading ? "Saving..." : isEdit ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/books")}
              className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}