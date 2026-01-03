import { useState } from "react";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const err = {};

    if (!values.name.trim()) err.name = "Name is required";

    if (!values.email.trim()) {
      err.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      err.email = "Enter a valid email";
    }

    if (!values.phone.trim()) err.phone = "Phone is required";

    return err;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors(validate({ ...form, [e.target.name]: e.target.value }));
  };

  const isValid = Object.keys(validate(form)).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Form is valid (backend will be added next)");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          Contact Manager
        </h1>

        {/* Name */}
        <div className="mb-3">
          <label className="block text-sm font-medium">Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block text-sm font-medium">Email *</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="block text-sm font-medium">Phone *</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            rows="3"
          />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-2 rounded font-semibold text-white ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
