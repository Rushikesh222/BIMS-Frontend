import { useState } from "react";

const CommonInputFields = ({ inputData, setValue, value, externalErrors }) => {
    const [errors, setErrors] = useState({});

  const validateField = (name, inputVal) => {
    const trimmed = typeof inputVal === "string" ? inputVal.trim() : inputVal;
    const currentYear = new Date().getFullYear();
    let message = "";

    switch (name) {
      case "name":
        if (!trimmed) message = "This field is required.";
        else if (trimmed.length < 2) message = "Must be at least 2 characters.";
        break;
      case "author":
      case "title":
      case "publisher":
      case "genre":
        if (!trimmed) message = "This field is required.";
        else if (trimmed.length < 2) message = "Must be at least 2 characters.";
        break;
      case "email":
        if (!trimmed) message = "This field is required.";
        else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
          if (!emailRegex.test(trimmed)) message = "Please enter a valid email.";
        }
        break;
      case "password":
        if (!trimmed) message = "This field is required.";
        else {
          const strongPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
          if (!strongPwd.test(trimmed)) message = "Min 8 chars, include upper, lower, number, special.";
        }
        break;
      case "age":
        if (trimmed === "" || trimmed === null) message = "This field is required.";
        else {
          const ageNum = Number(trimmed);
          if (!Number.isInteger(ageNum)) message = "Enter a whole number.";
          else if (ageNum < 13 || ageNum > 120) message = "Age must be between 13 and 120.";
        }
        break;
      case "yearPublished":
        if (trimmed === "" || trimmed === null) message = "This field is required.";
        else {
          const year = Number(trimmed);
          if (!Number.isInteger(year)) message = "Enter a valid year.";
          else if (year < 1000 || year > currentYear) message = `Enter a year between 1000 and ${currentYear}.`;
        }
        break;
      case "quantity":
        if (trimmed === "" || trimmed === null) message = "This field is required.";
        else {
          const qty = Number(trimmed);
          if (!Number.isInteger(qty)) message = "Enter a whole number.";
          else if (qty < 0) message = "Enter a non-negative integer.";
        }
        break;
      case "price":
        if (trimmed === "" || trimmed === null) message = "This field is required.";
        else {
          const p = Number(trimmed);
          if (Number.isNaN(p)) message = "Enter a valid number.";
          else if (p < 0) message = "Enter a non-negative amount.";
        }
        break;
      case "stockStatus":
        if (!trimmed) message = "This field is required.";
        break;
      default:
        message = "";
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

    const handleChange = (e) => {
        const { name, value: inputVal } = e.target;
        setValue((prev) => ({
            ...prev,
            [name]: inputVal
        }));
    validateField(name, inputVal);
    };

    return (
        <>
         {inputData.map(({ name, options, label, type, placeholder }) => (
          <>

            {type==="dropdown"?
            <div className="w-`full mb-4" key={name}>
  <label
    htmlFor={name}
    className="block mb-1 text-sm font-medium text-gray-700"
  >
    {label}
  </label>

  <select
    id={name}
    name={name}
    onChange={handleChange}
    value={value?.[name] ?? ""}
    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
  >
    <option value="">Select option</option>
   { options && options.map((option)=>(
    <option key={option.value} value={option.value}>{option.label}</option>
   )) }
  </select>
  {(errors?.[name] || externalErrors?.[name]) && (
    <p className="text-red-500 text-xs mt-1">{errors[name] || externalErrors[name]}</p>
  )}
</div>
            :<div key={name}>
                <label className="block text-sm text-gray-600 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={placeholder}
                  onChange={handleChange}
                  name={name}
                  value={value?.[name] ?? ""}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2f3e2f]"
                />
        {(errors?.[name] || externalErrors?.[name]) && (
          <p className="text-red-500 text-xs mt-1">{errors[name] || externalErrors[name]}</p>
        )}
              </div>}
          </>
         ))}
        </>
              );
};
export default CommonInputFields;