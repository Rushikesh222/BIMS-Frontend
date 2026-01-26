import bookInterceptor from "./bookInterceptor";



const getErrorMessage = (error) => {
  return error?.response && error?.response.data
  ? new Error(
  error.response.data?.apierror?.title || "Something went wrong!"
  )
  : new Error("Network Error");
  };


export const getBooksList = async () => {
    try { 
      const response = await bookInterceptor.get(`/books`);
      return response?.data
    } catch (error) {
      return getErrorMessage(error)
    }
  };

  export const getBookById = async (bookId) => {
    try {
      const response = await bookInterceptor.get(
        `books/${bookId}`);
      // return response.data;
      return response.data
    } catch (error) {
      return getErrorMessage(error)
    }
  };

  export const editBook = async (bookId, payload) => {
    try {
      const response = await bookInterceptor.put(
        `books/${bookId}`, payload);
      return response?.data;
    } catch (error) {
      return getErrorMessage(error)
    }
  };
  export const createBook = async (payload) => {
    try {
      const response = await bookInterceptor.post(
        `/books`, payload);
      return response?.data;
    } catch (error) {
      return getErrorMessage(error)
    }
  };
  export const deleteBook = async (bookId, ) => {
    try {
      const response = await bookInterceptor.delete(
        `books/${bookId}`);
      return response?.data;
    } catch (error) {
      return getErrorMessage(error)
    }
  };
