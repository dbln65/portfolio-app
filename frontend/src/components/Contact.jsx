import { useState } from "react";
import { sendContact } from "../api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({
    sending: false,
    ok: false,
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, ok: false, error: "" });
    try {
      await sendContact(form);
      setStatus({ sending: false, ok: true, error: "" });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Unbekannter Fehler beim Senden.";
      setStatus({ sending: false, ok: false, error: msg });
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-[calc(100vh-5rem)]">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-center text-gray-800">
          Contact
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          aria-busy={status.sending}
        >
          <label className="block">
            <span className="block text-sm font-medium mb-1">Name</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium mb-1">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium mb-1">Message</span>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              required
            />
          </label>

          {status.ok && (
            <p
              className="text-sm text-green-600"
              role="status"
              aria-live="polite"
            >
              Danke! Deine Nachricht wurde gesendet.
            </p>
          )}
          {status.error && (
            <p className="text-sm text-red-600" role="alert" aria-live="polite">
              {status.error}
            </p>
          )}

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-60"
            disabled={status.sending}
          >
            {status.sending ? "Sende…" : "Absenden"}
          </button>
        </form>
      </div>
    </section>
  );
}
