import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const closeModal = () => setSelectedIndex(null);

  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const key = "anXwt4L1MFHwVRtU2QiZxhct8GRMwa0X1ma-jCN-eSQ";

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.unsplash.com/photos/random?count=6&query=nature,animals&client_id=${key}`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.map((img) => img.urls.regular));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-green-50 font-sans">

      <header className="bg-green-700 text-white px-6 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            NatureWorld
          </h1>

          <nav className="hidden md:flex space-x-5 text-sm">
            <a href="#home" className="hover-bounce hover:text-green-300">Home</a>
            <a href="#about" className="hover-bounce hover:text-green-300">About</a>
            <a href="#gallery" className="hover-bounce hover:text-green-300">Gallery</a>
            <a href="#contact" className="hover-bounce hover:text-green-300">Contact</a>
          </nav>

        
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

  
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-green-800 text-white shadow-xl rounded-b-2xl animate-slideDown z-50">
            <nav className="flex flex-col items-center py-6 space-y-3 text-lg font-medium">
              <a
                href="#home"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-3 rounded-lg hover-bounce hover:bg-green-700"
              >
                Home
              </a>

              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-3 rounded-lg hover-bounce hover:bg-green-700"
              >
                About
              </a>

              <a
                href="#gallery"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-3 rounded-lg hover-bounce hover:bg-green-700"
              >
                Gallery
              </a>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-3 rounded-lg hover-bounce hover:bg-green-700"
              >
                Contact
              </a>
            </nav>
          </div>
        )}
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
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700">
            About NatureWorld
          </h3>

          <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            NatureWorld was created with a simple belief — when we protect nature,
            we protect life itself. Every forest, animal, river, and mountain
            plays an important role in maintaining balance on our planet.
            <br /><br />
            Through this platform, we aim to spread awareness about environmental
            conservation and wildlife protection.
          </p>
        </section>

        <section id="gallery" className="py-16 bg-green-50">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-green-700 mb-8">
            Nature Gallery
          </h3>

          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 px-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-48 w-full rounded-lg bg-green-200 animate-pulse"
                />
              ))
              : images.map((img, index) => (
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
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-green-700 mb-8">
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
              if (!isValidEmail(email)) {
                alert("Please enter a valid email address");
                return;
              }
              alert("Message sent successfully");
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
            />

            <input
              className="w-full mb-4 p-3 border rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <textarea
              className="w-full mb-4 p-3 border rounded"
              rows="4"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <button
            onClick={prevImage}
            className="absolute left-5 text-white text-4xl"
          >
            ‹
          </button>

          <img
            src={images[selectedIndex]}
            alt="Full"
            className="w-screen h-screen object-contain"
          />

          <button
            onClick={nextImage}
            className="absolute right-5 text-white text-4xl"
          >
            ›
          </button>

          <button
            onClick={closeModal}
            className="absolute top-5 right-6 text-white text-3xl"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
