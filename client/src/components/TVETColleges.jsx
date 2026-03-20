import { useState, useEffect } from "react";

function TVETColleges() {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState("All");

  useEffect(() => {
    fetch("https://studentpathguide-production.up.railway.app/api/tvet")
      .then((res) => res.json())
      .then((data) => {
        setProgrammes(data.programmes);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching TVET data:", err);
        setLoading(false);
      });
  }, []);

  const fields = ["All", ...new Set(programmes.map((p) => p.field))];

  const filtered = programmes.filter((p) => {
    const matchesSearch =
      p.programme.toLowerCase().includes(search.toLowerCase()) ||
      p.field.toLowerCase().includes(search.toLowerCase());
    const matchesField = selectedField === "All" || p.field === selectedField;
    return matchesSearch && matchesField;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-blue-900 font-semibold text-lg">
          Loading TVET programmes...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="bg-blue-900 text-white rounded-2xl p-8 text-center mb-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">TVET College Options</h2>
        <p className="text-blue-200">
          Not going to university? TVET colleges offer excellent career-focused
          programmes for South African students
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
        <p className="text-blue-800 text-sm font-semibold mb-1">
          What is a TVET College?
        </p>
        <p className="text-blue-700 text-sm">
          Technical and Vocational Education and Training (TVET) colleges offer
          practical, career-focused programmes. N4-N6 programmes require a
          National Senior Certificate and lead to a National Certificate with 18
          months of workplace experience. NCV programmes are for students who
          completed Grade 9 or higher.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search programmes..."
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

      {/* Programme Cards */}
      <div className="grid gap-6">
        {filtered.map((programme) => (
          <div
            key={programme.id}
            className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition duration-300"
          >
            {/* Programme Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-xl font-bold text-blue-900 mb-1">
                  {programme.programme}
                </h4>
                <div className="flex gap-2">
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {programme.field}
                  </span>
                  <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {programme.level}
                  </span>
                </div>
              </div>
              <div className="text-center bg-blue-50 rounded-xl px-4 py-2">
                <p className="text-xs text-gray-500">Min APS</p>
                <p className="text-2xl font-black text-blue-900">
                  {programme.min_aps}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-3 leading-relaxed">
              {programme.description}
            </p>

            {/* Duration */}
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                Duration
              </p>
              <p className="text-sm text-gray-700 font-medium">
                {programme.duration}
              </p>
            </div>

            {/* Career Paths */}
            <div className="mb-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Career Paths
              </p>
              <div className="flex flex-wrap gap-2">
                {programme.career_paths.map((career, index) => (
                  <span
                    key={index}
                    className="bg-green-50 text-green-700 border border-green-200 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>

            {/* Colleges */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Colleges Offering This Programme
              </p>
              <div className="flex flex-wrap gap-2">
                {programme.colleges.map((college, index) => (
                  <a
                    key={index}
                    href={`https://${programme.websites[index]}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-3 py-1 rounded-full font-medium hover:bg-blue-100 transition duration-200"
                  >
                    {college} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TVETColleges;
