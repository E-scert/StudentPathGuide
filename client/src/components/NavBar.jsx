function Navbar() {
  return (
    <nav className="bg-blue-900 text-white px-6 py-4 shadow-lg sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
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

        {/* Badges */}
        <div className="hidden md:flex gap-3">
          <span className="bg-blue-800 text-blue-200 text-xs px-3 py-1 rounded-full">
            Grade 10 — 12
          </span>
          <span className="bg-blue-800 text-blue-200 text-xs px-3 py-1 rounded-full">
            South Africa
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
