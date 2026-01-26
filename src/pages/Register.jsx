import { useState } from "react";
import CommonInputFields from "../components/CommonInputFields";
import { registerUser } from "../api/Auth";
import swal from "sweetalert";

export const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const fields = [
        { name: "name", label: "Name", type: "text", placeholder: "Your name" },
        { name: "email", label: "Email", type: "email", placeholder: "Email address" },
        { name: "password", label: "Password", type: "password", placeholder: "Password" },
        { name: "age", label: "Age", type: "number", placeholder: "Age" },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        const isEmpty = (v) => v === undefined || v === null || (typeof v === "string" && v.trim() === "");

        if (isEmpty(formData.name)) errors.name = "This field is required.";
        else if (formData.name.trim().length < 2) errors.name = "Must be at least 2 characters.";

        if (isEmpty(formData.email)) errors.email = "This field is required.";
        else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
            if (!emailRegex.test(formData.email.trim())) errors.email = "Please enter a valid email.";
        }

        if (isEmpty(formData.password)) errors.password = "This field is required.";
        else {
            const strongPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
            if (!strongPwd.test(formData.password)) errors.password = "Min 8 chars, include upper, lower, number, special.";
        }

        if (isEmpty(formData.age)) errors.age = "This field is required.";
        else {
            const ageNum = Number(formData.age);
            if (!Number.isInteger(ageNum)) errors.age = "Enter a whole number.";
            else if (ageNum < 13 || ageNum > 120) errors.age = "Age must be between 13 and 120.";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            swal({ title: "Please fix form errors", text: "Some fields are invalid or missing.", icon: "error" });
            return;
        }

        setLoading(true);
        try {
            const payload = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
                age: Number(formData.age),
            };
            const res = await registerUser(payload);
            await swal({ title: "Registered", text: "Account created successfully.", icon: "success", timer: 1500 });
            setFormData({ name: "", email: "", password: "", age: "" });
            setFormErrors({});
        } catch (error) {
            swal({ title: "Registration failed", text: error?.message || "Unable to register.", icon: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <CommonInputFields inputData={fields} value={formData} setValue={setFormData} externalErrors={formErrors} />
                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={loading} className="cursor-pointer px-4 py-2 bg-[#2f3e2f] text-white rounded-md hover:bg-[#263326]">
                            {loading ? "Submitting..." : "Create Account"}
                        </button>
                        <button type="button" onClick={() => setFormData({ name: "", email: "", password: "", age: "" })} className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}