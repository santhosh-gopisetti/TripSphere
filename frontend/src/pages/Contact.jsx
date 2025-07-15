import React, { useState } from "react";
import BASE_URL from "../utils/config";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      const res = await fetch(`${BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("Thank you for contacting us!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch {
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <section className="md:min-h-screen bg-sky-50 font-poppins">
      <div className="px-4 py-8 md:py-2 m-auto max-w-screen-md">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-sky-700">Contact Us</h2>
        <p className="mb-10 font-light text-center text-gray-600">
          Got any issue? Want to reach us? Let us know.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="name" className="block text-sky-700 font-semibold mb-1">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-sky-200 rounded focus:outline-none focus:border-sky-400"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sky-700 font-semibold mb-1">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full px-4 py-2 border border-sky-200 rounded focus:outline-none focus:border-sky-400"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sky-700 font-semibold mb-1">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows="3"
              value={form.message}
              onChange={handleChange}
              placeholder="Leave a message..."
              className="w-full px-4 py-2 border border-sky-200 rounded focus:outline-none focus:border-sky-400"
              required
            ></textarea>
          </div>
          <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded transition">Submit</button>
          {status && <p className="text-center mt-2 text-sky-700">{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
