import { useState, useEffect } from "react";

function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("courses");
  const [courses, setCourses] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [bursaries, setBursaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [newCourse, setNewCourse] = useState({
    name: "",
    field: "",
    min_aps: "",
    description: "",
    career_paths: "",
  });
  const [newUniversity, setNewUniversity] = useState({
    name: "",
    abbreviation: "",
    province: "",
    website: "",
  });
  const [newBursary, setNewBursary] = useState({
    name: "",
    provider: "",
    field: "",
    min_aps: "",
    value: "",
    opening_date: "",
    closing_date: "",
    apply_url: "",
    requirements: "",
    description: "",
  });

  const API = "https://studentpathguide-production.up.railway.app/api/admin";

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (data.success) {
        setAuthenticated(true);
        setError("");
        fetchAll();
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Something went wrong");
    }
  };

  const fetchAll = () => {
    setLoading(true);
    Promise.all([
      fetch(`${API}/courses`).then((r) => r.json()),
      fetch(`${API}/universities`).then((r) => r.json()),
      fetch(`${API}/bursaries`).then((r) => r.json()),
    ]).then(([c, u, b]) => {
      setCourses(c.courses);
      setUniversities(u.universities);
      setBursaries(b.bursaries);
      setLoading(false);
    });
  };

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const addCourse = async () => {
    const career_paths = newCourse.career_paths.split(",").map((s) => s.trim());
    const response = await fetch(`${API}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newCourse, career_paths }),
    });
    if (response.ok) {
      setNewCourse({
        name: "",
        field: "",
        min_aps: "",
        description: "",
        career_paths: "",
      });
      fetchAll();
      showSuccess("Course added successfully!");
    }
  };

  const addUniversity = async () => {
    const response = await fetch(`${API}/universities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUniversity),
    });
    if (response.ok) {
      setNewUniversity({
        name: "",
        abbreviation: "",
        province: "",
        website: "",
      });
      fetchAll();
      showSuccess("University added successfully!");
    }
  };

  const addBursary = async () => {
    const response = await fetch(`${API}/bursaries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBursary),
    });
    if (response.ok) {
      setNewBursary({
        name: "",
        provider: "",
        field: "",
        min_aps: "",
        value: "",
        opening_date: "",
        closing_date: "",
        apply_url: "",
        requirements: "",
        description: "",
      });
      fetchAll();
      showSuccess("Bursary added successfully!");
    }
  };

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">
            Admin Dashboard
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Enter your admin password to continue
          </p>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-900 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="bg-blue-900 text-white rounded-2xl p-6 mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="text-blue-200 text-sm">Manage StudentPathGuide data</p>
        </div>
        <button
          onClick={() => setAuthenticated(false)}
          className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-semibold transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 border border-green-300 text-green-800 rounded-xl p-4 mb-6 text-center font-semibold">
          ✅ {successMessage}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {["courses", "universities", "bursaries"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl font-semibold text-sm capitalize transition duration-200 ${
              activeTab === tab
                ? "bg-blue-900 text-white"
                : "bg-white text-blue-900 border border-blue-200 hover:bg-blue-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-900 font-semibold">Loading data...</p>
        </div>
      ) : (
        <>
          {/* Courses Tab */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              {/* Add Course Form */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">
                  Add New Course
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    placeholder="Course Name"
                    value={newCourse.name}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, name: e.target.value })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    placeholder="Field (e.g. Technology)"
                    value={newCourse.field}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, field: e.target.value })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    placeholder="Minimum APS"
                    type="number"
                    value={newCourse.min_aps}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, min_aps: e.target.value })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    placeholder="Career Paths (comma separated)"
                    value={newCourse.career_paths}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        career_paths: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Description"
                    value={newCourse.description}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        description: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                    rows={3}
                  />
                </div>
                <button
                  onClick={addCourse}
                  className="mt-4 bg-blue-900 text-white font-bold px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-200"
                >
                  Add Course
                </button>
              </div>

              {/* Courses List */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <th className="text-left px-4 py-3">Course Name</th>
                      <th className="text-left px-4 py-3">Field</th>
                      <th className="text-left px-4 py-3">Min APS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, index) => (
                      <tr
                        key={course.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-3 font-medium text-blue-900">
                          {course.name}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {course.field}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {course.min_aps}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Universities Tab */}
          {activeTab === "universities" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">
                  Add New University
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    placeholder="University Name"
                    value={newUniversity.name}
                    onChange={(e) =>
                      setNewUniversity({
                        ...newUniversity,
                        name: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    placeholder="Abbreviation (e.g. UP)"
                    value={newUniversity.abbreviation}
                    onChange={(e) =>
                      setNewUniversity({
                        ...newUniversity,
                        abbreviation: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    placeholder="Province"
                    value={newUniversity.province}
                    onChange={(e) =>
                      setNewUniversity({
                        ...newUniversity,
                        province: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    placeholder="Website (e.g. www.up.ac.za)"
                    value={newUniversity.website}
                    onChange={(e) =>
                      setNewUniversity({
                        ...newUniversity,
                        website: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={addUniversity}
                  className="mt-4 bg-blue-900 text-white font-bold px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-200"
                >
                  Add University
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <th className="text-left px-4 py-3">University Name</th>
                      <th className="text-left px-4 py-3">Abbreviation</th>
                      <th className="text-left px-4 py-3">Province</th>
                    </tr>
                  </thead>
                  <tbody>
                    {universities.map((uni, index) => (
                      <tr
                        key={uni.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-3 font-medium text-blue-900">
                          {uni.name}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {uni.abbreviation}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {uni.province}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bursaries Tab */}
          {activeTab === "bursaries" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">
                  Add New Bursary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    placeholder="Bursary Name"
                    value={newBursary.name}
                    onChange={(e) =>
                      setNewBursary({ ...newBursary, name: e.target.value })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    placeholder="Provider"
                    value={newBursary.provider}
                    onChange={(e) =>
                      setNewBursary({ ...newBursary, provider: e.target.value })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    placeholder="Field"
                    value={newBursary.field}
                    onChange={(e) =>
                      setNewBursary({ ...newBursary, field: e.target.value })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    placeholder="Minimum APS"
                    type="number"
                    value={newBursary.min_aps}
                    onChange={(e) =>
                      setNewBursary({ ...newBursary, min_aps: e.target.value })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    placeholder="Value (e.g. Full bursary)"
                    value={newBursary.value}
                    onChange={(e) =>
                      setNewBursary({ ...newBursary, value: e.target.value })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    placeholder="Apply URL"
                    value={newBursary.apply_url}
                    onChange={(e) =>
                      setNewBursary({
                        ...newBursary,
                        apply_url: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    placeholder="Opening Date (e.g. 1 March 2026)"
                    value={newBursary.opening_date}
                    onChange={(e) =>
                      setNewBursary({
                        ...newBursary,
                        opening_date: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    placeholder="Closing Date (e.g. 31 May 2026)"
                    value={newBursary.closing_date}
                    onChange={(e) =>
                      setNewBursary({
                        ...newBursary,
                        closing_date: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Requirements"
                    value={newBursary.requirements}
                    onChange={(e) =>
                      setNewBursary({
                        ...newBursary,
                        requirements: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                    rows={2}
                  />
                  <textarea
                    placeholder="Description"
                    value={newBursary.description}
                    onChange={(e) =>
                      setNewBursary({
                        ...newBursary,
                        description: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                    rows={2}
                  />
                </div>
                <button
                  onClick={addBursary}
                  className="mt-4 bg-blue-900 text-white font-bold px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-200"
                >
                  Add Bursary
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <th className="text-left px-4 py-3">Bursary Name</th>
                      <th className="text-left px-4 py-3">Provider</th>
                      <th className="text-left px-4 py-3">Field</th>
                      <th className="text-left px-4 py-3">Closes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bursaries.map((bursary, index) => (
                      <tr
                        key={bursary.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-3 font-medium text-blue-900">
                          {bursary.name}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {bursary.provider}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {bursary.field}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {bursary.closing_date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
