import { useEffect, useState } from "react";
import API from "./api";
import ContactCard from "./components/ContactCard";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [contacts, setContacts] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [sort, setSort] = useState("latest");

  const validate = (v) => {
    const e = {};
    if (!v.name) e.name = "Name required";
    if (!v.email) e.email = "Email required";
    else if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Invalid email";
    if (!v.phone) e.phone = "Phone required";
    return e;
  };

  const isValid = Object.keys(validate(form)).length === 0;

  const fetchContacts = async () => {
    const res = await API.get(`/contacts?sort=${sort}`);
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, [sort]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    await API.post("/contacts", form);
    setForm({ name: "", email: "", phone: "", message: "" });
    setSuccess("Contact added successfully");
    fetchContacts();

    setTimeout(() => setSuccess(""), 2000);
  };

  const deleteContact = async (id) => {
    await API.delete(`/contacts/${id}`);
    fetchContacts();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h2 className="text-xl font-bold mb-4">Add Contact</h2>

          {success && (
            <p className="text-green-600 mb-3">{success}</p>
          )}

          {["name", "email", "phone"].map((f) => (
            <div key={f} className="mb-3">
              <label className="block capitalize text-sm">{f}</label>
              <input
                name={f}
                value={form[f]}
                onChange={(e) =>
                  setForm({ ...form, [f]: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded"
              />
              {errors[f] && (
                <p className="text-red-500 text-sm">{errors[f]}</p>
              )}
            </div>
          ))}

          <textarea
            name="message"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            placeholder="Message (optional)"
            className="w-full p-2 border rounded mb-3"
          />

          <button
            disabled={!isValid}
            className={`w-full py-2 rounded text-white ${
              isValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400"
            }`}
          >
            Submit
          </button>
        </form>

        {/* CONTACT LIST */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Contacts</h2>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border p-1 rounded text-sm"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          {contacts.length === 0 && (
            <p className="text-gray-500">No contacts found</p>
          )}

          <div className="space-y-3">
            {contacts.map((c) => (
              <ContactCard
                key={c._id}
                contact={c}
                onDelete={deleteContact}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
