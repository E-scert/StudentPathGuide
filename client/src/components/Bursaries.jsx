import { useState, useEffect } from "react";

function Bursaries() {
  const [bursaries, setBursaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState("All");

  useEffect(() => {
    fetch("https://studentpathguide-production.up.railway.app/api/bursaries")
      .then((res) => res.json())
      .then((data) => {
        setBursaries(data.bursaries);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bursaries:", err);
        setLoading(false);
      });
  }, []);

  const fields = ["All", ...new Set(bursaries.map((b) => b.field))];

  const filtered = bursaries.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.provider.toLowerCase().includes(search.toLowerCase()) ||
      b.field.toLowerCase().includes(search.toLowerCase());
    const matchesField = selectedField === "All" || b.field === selectedField;
    return matchesSearch && matchesField;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-blue-900 font-semibold text-lg">
          Loading bursaries...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="bg-blue-900 text-white rounded-2xl p-8 text-center mb-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Bursaries & Scholarships</h2>
        <p className="text-blue-200">
          Find funding for your studies — bursaries available for South African
          students
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
        <p className="text-green-800 text-sm font-semibold mb-1">
          💡 What is a Bursary?
        </p>
        <p className="text-green-700 text-sm">
          A bursary is financial funding for your studies that you do not need
          to pay back. Most bursaries require you to work for the company after
          graduation. Apply early as spaces are limited.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search bursaries or providers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
        />
        <select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
          className="border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
        >
          {fields.map((field, index) => (
            <option key={index} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-gray-500 text-sm mb-4">
        {filtered.length} bursaries found
      </p>

      {/* Bursary Cards */}
      <div className="grid gap-6">
        {filtered.map((bursary) => (
          <div
            key={bursary.id}
            className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition duration-300"
          >
            {/* Bursary Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-xl font-bold text-blue-900 mb-1">
                  {bursary.name}
                </h4>
                <p className="text-gray-500 text-sm">{bursary.provider}</p>
                <div className="flex gap-2 mt-2">
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {bursary.field}
                  </span>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {bursary.value}
                  </span>
                </div>
              </div>
              {bursary.min_aps > 0 && (
                <div className="text-center bg-blue-50 rounded-xl px-4 py-2">
                  <p className="text-xs text-gray-500">Min APS</p>
                  <p className="text-2xl font-black text-blue-900">
                    {bursary.min_aps}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {bursary.description}
            </p>

            {/* Requirements */}
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                Requirements
              </p>
              <p className="text-sm text-gray-700">{bursary.requirements}</p>
            </div>

            {/* Dates and Apply */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div className="flex gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Opens</p>
                  <p className="text-green-700 font-semibold">
                    {bursary.opening_date}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Closes</p>
                  <p className="text-red-600 font-semibold">
                    {bursary.closing_date}
                  </p>
                </div>
              </div>
              <a
                href={`https://${bursary.apply_url}`}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white text-sm px-6 py-2 rounded-xl font-bold hover:bg-green-700 transition duration-200"
              >
                Apply Now ↗
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <p className="text-yellow-800 text-sm font-semibold mb-1">
          ⚠ Important Note
        </p>
        <p className="text-yellow-700 text-sm">
          Bursary dates and requirements may change. Always verify directly with
          the provider before applying. Apply as early as possible as spaces are
          limited.
        </p>
      </div>
    </div>
  );
}

export default Bursaries;
