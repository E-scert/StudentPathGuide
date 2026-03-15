function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-20 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold">StudentPathGuide</h3>
          <p className="text-blue-300 text-sm">
            Find your path. Own your future.
          </p>
        </div>

        {/* Info */}
        <div className="text-center text-blue-300 text-sm">
          <p>Built for South African students — Grade 10 to 12</p>
          <p className="mt-1">Free to use. No personal data collected.</p>
        </div>

        {/* Disclaimer */}
        <div className="text-center md:text-right text-blue-400 text-xs max-w-xs">
          <p>
            This tool is for guidance purposes only. Always verify course
            requirements directly with universities.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
