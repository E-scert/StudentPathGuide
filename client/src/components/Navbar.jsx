import { useState } from "react";
function Navbar({ view, setView }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white px-6 py-4 shadow-lg sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            setView("home");
            setMenuOpen(false);
          }}
        >
          <div className="bg-white text-blue-900 font-black text-xl w-10 h-10 rounded-xl flex items-center justify-center">
            S
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight leading-none">
              StudentPathGuide
            </h1>
            <p className="text-blue-300 text-xs">
              Find your path. Own your future.
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {[
            { label: "Find My Path", value: "home" },
            { label: "Improve My Marks", value: "improvement" },
            { label: "TVET Colleges", value: "tvet" },
            { label: "Bursaries", value: "bursaries" },
            { label: "Application Dates", value: "applications" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setView(item.value)}
              className={`text-sm px-4 py-2 rounded-xl font-semibold transition duration-200 ${
                view === item.value
                  ? "bg-white text-blue-900"
                  : "text-blue-200 hover:bg-blue-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl font-bold"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2">
          {[
            { label: "Find My Path", value: "home" },
            { label: "Improve My Marks", value: "improvement" },
            { label: "TVET Colleges", value: "tvet" },
            { label: "Bursaries", value: "bursaries" },
            { label: "Application Dates", value: "applications" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setView(item.value);
                setMenuOpen(false);
              }}
              className={`text-sm px-4 py-3 rounded-xl font-semibold transition duration-200 text-left ${
                view === item.value
                  ? "bg-white text-blue-900"
                  : "text-blue-200 hover:bg-blue-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
