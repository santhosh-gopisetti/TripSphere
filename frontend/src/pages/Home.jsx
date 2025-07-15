import React from "react";

const homeCards = [
  {
    img: "/goa.jpg",
    title: "Goa Beach Getaway",
    desc: "Relax on the golden beaches and enjoy Goa's vibrant nightlife and seafood."
  },
  {
    img: "/manali.jpg",
    title: "Manali Snow Retreat",
    desc: "Experience snow-capped peaks and adventure sports in the Himalayan town of Manali."
  },
  {
    img: "/kerala.jpg",
    title: "Kerala Backwater Bliss",
    desc: "Cruise the peaceful backwaters of Kerala on a traditional houseboat."
  }
];

const Home = () => {
  return (
    <section className="min-h-screen bg-sky-50 font-poppins flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-sky-700">Plan Your Perfect Trip</h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to <span className="font-bold text-sky-700">TripSphere</span>, your go-to destination for unforgettable adventures! Explore diverse destinations, plan seamlessly, and embark on a journey of a lifetime.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {homeCards.map((card, idx) => (
          <div key={idx} className="rounded-lg overflow-hidden shadow-md bg-white">
            <img src={card.img} className="object-cover w-full h-56" alt={card.title} />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-sky-700 mb-2">{card.title}</h2>
              <p className="text-gray-600 text-sm">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
