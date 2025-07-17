import React, { useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../utils/config";
import PackageCard from "../shared/TourCard";

const getUnique = (arr, key) => [...new Set(arr?.map((item) => item[key]))];

const Packages = () => {
  const { apiData: travelPackages = [], error } = useFetch(`${BASE_URL}/packages`);
  // Search/filter state
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minGroup, setMinGroup] = useState("");
  // Booking modal state
  const [bookingPackage, setBookingPackage] = useState(null);
  const [loginPrompt, setLoginPrompt] = useState("");

  // Filtered packages
  const filteredPackages = useMemo(() => {
    return travelPackages.filter(pkg => {
      const matchesSearch = search === "" || pkg.title.toLowerCase().includes(search.toLowerCase()) || pkg.city.toLowerCase().includes(search.toLowerCase());
      const matchesCity = city === "" || pkg.city === city;
      const matchesPrice = maxPrice === "" || pkg.price <= Number(maxPrice);
      const matchesGroup = minGroup === "" || pkg.maxGroupSize >= Number(minGroup);
      return matchesSearch && matchesCity && matchesPrice && matchesGroup;
    });
  }, [travelPackages, search, city, maxPrice, minGroup]);

  // Unique city options
  const cityOptions = getUnique(travelPackages, "city");

  // Handler for booking button
  const handleBook = (pkg) => {
    if (localStorage.getItem("token")) {
      setBookingPackage(pkg);
      setLoginPrompt("");
    } else {
      setLoginPrompt("Please login to book a package.");
    }
  };

  return (
    <section className="min-h-screen py-8 px-6 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-sky-700 font-poppins">Travel Packages</h1>
      {/* Search & Filter UI */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
        <input
          type="text"
          placeholder="Search by title or city..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 border border-sky-200 rounded w-full md:w-60"
        />
        <select
          value={city}
          onChange={e => setCity(e.target.value)}
          className="px-3 py-2 border border-sky-200 rounded w-full md:w-40"
        >
          <option value="">All Cities</option>
          {cityOptions.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          className="px-3 py-2 border border-sky-200 rounded w-full md:w-32"
        />
        <input
          type="number"
          placeholder="Min Group Size"
          value={minGroup}
          onChange={e => setMinGroup(e.target.value)}
          className="px-3 py-2 border border-sky-200 rounded w-full md:w-36"
        />
      </div>
      {/* Packages List */}
      <div className="grid md:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => (
          <PackageCard key={pkg.id} tour={pkg} onBook={() => handleBook(pkg)} />
        ))}
      </div>
      {loginPrompt && <p className="text-center text-red-600 mt-4">{loginPrompt}</p>}
      {error && <p className="text-red-500 text-center mt-4">Failed to load packages.</p>}
      {/* Booking Modal */}
      {bookingPackage && (
        <BookingModal pkg={bookingPackage} onClose={() => setBookingPackage(null)} />
      )}
    </section>
  );
};

// Booking Modal Component
function BookingModal({ pkg, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", groupSize: 1 });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch(`${BASE_URL}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, packageId: pkg.id }),
      });
      if (res.ok) {
        setStatus("Booking successful!");
        setForm({ name: "", email: "", groupSize: 1 });
      } else {
        setStatus("Booking failed. Try again.");
      }
    } catch {
      setStatus("Booking failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl">&times;</button>
        <h2 className="text-xl font-bold mb-2 text-sky-700">Book: {pkg.title}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-sky-200 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-sky-200 rounded"
            required
          />
          <input
            type="number"
            name="groupSize"
            placeholder="Group Size"
            min={1}
            max={pkg.maxGroupSize}
            value={form.groupSize}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-sky-200 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded transition"
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
          {status && <p className="text-center mt-2 text-sky-700">{status}</p>}
        </form>
      </div>
    </div>
  );
}

export default Packages;
