function Navbar() {
  return (
    <nav className="bg-blue-900 text-white px-6 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            StudentPathGuide
          </h1>
          <p className="text-blue-300 text-xs">
            Find your path. Own your future.
          </p>
        </div>

        {/* Nav Info */}
        <div className="hidden md:flex gap-6 text-sm text-blue-200">
          <span>Grade 10 — 12</span>
          <span>|</span>
          <span>South Africa</span>
          <span>|</span>
          <span>Free & Anonymous</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
