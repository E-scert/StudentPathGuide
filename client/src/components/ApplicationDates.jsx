import { useState, useEffect } from "react";

function ApplicationDates() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://studentpathguide-production.up.railway.app/api/applications")
      .then((res) => res.json())
      .then((data) => {
        setApplications(data.applications);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching application dates:", err);
        setLoading(false);
      });
  }, []);

  const filtered = applications.filter(
    (a) =>
      a.university.toLowerCase().includes(search.toLowerCase()) ||
      a.province.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-blue-900 font-semibold text-lg">
          Loading application dates...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="bg-blue-900 text-white rounded-2xl p-8 text-center mb-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">
          University Application Dates
        </h2>
        <p className="text-blue-200">
          2026 application opening and closing dates for South African
          universities
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by university or province..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="text-left px-4 py-3">University</th>
              <th className="text-left px-4 py-3">Province</th>
              <th className="text-left px-4 py-3">Opens</th>
              <th className="text-left px-4 py-3">Closes</th>
              <th className="text-left px-4 py-3">Apply</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-3 font-semibold text-blue-900">
                  {app.university}
                  <span className="ml-2 text-xs text-gray-400">
                    ({app.abbreviation})
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{app.province}</td>
                <td className="px-4 py-3 text-green-700 font-medium">
                  {app.opening_date}
                </td>
                <td className="px-4 py-3 text-red-600 font-medium">
                  {app.closing_date}
                </td>
                <td className="px-4 py-3">
                  <a
                    href={`https://${app.apply_url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-900 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-700 transition duration-200"
                  >
                    Apply ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <p className="text-yellow-800 text-sm font-semibold mb-1">
          ⚠ Important Note
        </p>
        <p className="text-yellow-700 text-sm">
          Application dates may change. Always verify directly with the
          university before applying. Some programmes have earlier closing dates
          than shown.
        </p>
      </div>
    </div>
  );
}

export default ApplicationDates;
