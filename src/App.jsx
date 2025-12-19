import { useState } from "react";
import "./index.css";


const images = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
];

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const closeModal = () => setSelectedIndex(null);

  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? images?.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50 font-sans">


      <header className="bg-green-700 text-white px-6 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">NatureWorld</h1>
          <nav className="space-x-5 text-sm">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>


      <main className="flex-1" id="home">
        <section className="hero flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative text-center max-w-2xl text-white px-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Protect Nature, Protect Life
            </h2>
            <p className="mt-4 text-green-100">
              Let’s preserve forests, wildlife, water, and clean air.
            </p>
          </div>
        </section>


        <section id="about" className="py-16 px-6 bg-white text-center">
          <h3 className="text-3xl font-bold text-green-700">About NatureWorld</h3>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            NatureWorld spreads awareness about environmental protection.
          </p>
        </section>


        <section id="gallery" className="py-16 bg-green-50">
          <h3 className="text-3xl font-bold text-center text-green-700 mb-8">
            Nature Gallery
          </h3>

          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 px-6">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Nature"
                onClick={() => setSelectedIndex(index)}
                className="h-48 w-full object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </section>


        <section id="contact" className="py-16 bg-white px-6">
          <h3 className="text-3xl font-bold text-center text-green-700">
            Contact Us
          </h3>

          <form
            className="max-w-xl mx-auto mt-8 bg-green-50 p-6 rounded-xl shadow"
            onSubmit={(e) => {
              e.preventDefault();
              if (!name || !email || !message) {
                alert("Please fill all fields");
                return;
              }

              alert("Message sent successfully ✅");
              setName("");
              setEmail("");
              setMessage("");
            }}
          >
            <input
              className="w-full mb-4 p-3 border rounded"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              className="w-full mb-4 p-3 border rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <textarea
              className="w-full mb-4 p-3 border rounded"
              rows="4"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>

            <button className="w-full bg-green-600 text-white py-3 rounded">
              Send Message
            </button>
          </form>

        </section>
      </main>

      <footer className="bg-green-800 text-green-100 text-center py-5">
        © 2025 NatureWorld 🌍
      </footer>

      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

          <button
            onClick={prevImage}
            className="absolute left-5 text-white text-4xl">
            ‹
          </button>

          <img
            src={images[selectedIndex]}
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
            alt="Full view"
          />

          <button
            onClick={nextImage}
            className="absolute right-5 text-white text-4xl">
            ›
          </button>

          <button
            onClick={closeModal}
            className="absolute top-5 right-6 text-white text-2xl">
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
