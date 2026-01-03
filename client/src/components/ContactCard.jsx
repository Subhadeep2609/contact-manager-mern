export default function ContactCard({ contact, onDelete }) {
  return (
    <div className="border p-3 rounded flex justify-between items-start">
      <div>
        <p className="font-semibold">{contact.name}</p>
        <p className="text-sm">{contact.email}</p>
        <p className="text-sm">{contact.phone}</p>
        {contact.message && (
          <p className="text-sm text-gray-600">{contact.message}</p>
        )}
      </div>

      <button
        onClick={() => onDelete(contact._id)}
        className="text-red-500 text-sm hover:underline"
      >
        Delete
      </button>
    </div>
  );
}
