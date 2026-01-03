import { useEffect, useState } from "react";
import API from "./api";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [contacts, setContacts] = useState([]);
  const [success, setSuccess] = useState("");

  const validate = (values) => {
    const err = {};
    if (!values.name.trim()) err.name = "Name is required";
    if (!values.email.trim()) err.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(values.email))
      err.email = "Invalid email";
    if (!values.phone.trim()) err.phone = "Phone is required";
    return err;
  };

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    setErrors(validate(updated));
  };

  const isValid = Object.keys(validate(form)).length === 0;

  const fetchContacts = async () => {
    const res = await API.get("/contacts");
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    await API.post("/contacts", form);

    setSuccess("Contact submitted successfully!");
    setForm({ name: "", email: "", phone: "", message: "" });
    fetchContacts();

    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h2 className="text-xl font-bold mb-4">Add Contact</h2>

          {success && (
            <p className="text-green-600 mb-3">{success}</p>
          )}

          {["name", "email", "phone"].map((field) => (
            <div key={field} className="mb-3">
              <label className="block text-sm font-medium capitalize">
                {field}
              </label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors[field] && (
                <p className="text-red-500 text-sm">
                  {errors[field]}
                </p>
              )}
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              rows="3"
            />
          </div>

          <button
            disabled={!isValid}
            className={`w-full py-2 rounded text-white font-semibold ${
              isValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </form>

        {/* Contacts List */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Contacts</h2>

          {contacts.length === 0 && (
            <p className="text-gray-500">No contacts yet</p>
          )}

          <ul className="space-y-3">
            {contacts.map((c) => (
              <li
                key={c._id}
                className="border p-3 rounded text-sm"
              >
                <p className="font-semibold">{c.name}</p>
                <p>{c.email}</p>
                <p>{c.phone}</p>
                {c.message && (
                  <p className="text-gray-600">{c.message}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
