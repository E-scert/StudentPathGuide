function Navbar({ view, setView }) {
  return (
    <nav className="bg-blue-900 text-white px-6 py-4 shadow-lg sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setView("home")}
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

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("home")}
            className={`text-sm px-4 py-2 rounded-xl font-semibold transition duration-200 ${
              view === "home"
                ? "bg-white text-blue-900"
                : "text-blue-200 hover:bg-blue-800"
            }`}
          >
            Find My Path
          </button>
          <button
            onClick={() => setView("improvement")}
            className={`text-sm px-4 py-2 rounded-xl font-semibold transition duration-200 ${
              view === "improvement"
                ? "bg-white text-blue-900"
                : "text-blue-200 hover:bg-blue-800"
            }`}
          >
            Improve My Marks
          </button>
          <button
            onClick={() => setView("applications")}
            className={`text-sm px-4 py-2 rounded-xl font-semibold transition duration-200 ${
              view === "applications"
                ? "bg-white text-blue-900"
                : "text-blue-200 hover:bg-blue-800"
            }`}
          >
            Application Dates
          </button>
        </div>

        {/* Badges */}
        <div className="hidden md:flex gap-3">
          <span className="bg-blue-800 text-blue-200 text-xs px-3 py-1 rounded-full">
            Grade 10 — 12
          </span>
          <span className="bg-green-700 text-green-200 text-xs px-3 py-1 rounded-full">
            Free & Anonymous
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
