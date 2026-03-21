import { useState, useEffect } from "react";

function SubjectCombinations() {
  const [combinations, setCombinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState("All");

  useEffect(() => {
    fetch("https://studentpathguide-production.up.railway.app/api/combinations")
      .then((res) => res.json())
      .then((data) => {
        setCombinations(data.combinations);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching combinations:", err);
        setLoading(false);
      });
  }, []);

  const fields = ["All", ...new Set(combinations.map((c) => c.career_field))];

  const filtered = combinations.filter((c) => {
    const matchesSearch =
      c.career_field.toLowerCase().includes(search.toLowerCase()) ||
      c.combination_name.toLowerCase().includes(search.toLowerCase());
    const matchesField =
      selectedField === "All" || c.career_field === selectedField;
    return matchesSearch && matchesField;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-blue-900 font-semibold text-lg">
          Loading subject combinations...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="bg-blue-900 text-white rounded-2xl p-8 text-center mb-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Subject Combination Guide</h2>
        <p className="text-blue-200">
          For Grade 10 and 11 students — choose the right subjects now to keep
          your career options open
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
        <p className="text-blue-800 text-sm font-semibold mb-1">
          💡 Why Subject Choice Matters
        </p>
        <p className="text-blue-700 text-sm">
          The subjects you choose in Grade 10 directly affect which university
          courses you can apply for in Grade 12. Choosing the wrong subjects now
          can close doors to careers you might want later. Use this guide to
          make smart choices early.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by career field..."
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

      {/* Combination Cards */}
      <div className="grid gap-6">
        {filtered.map((combo) => (
          <div
            key={combo.id}
            className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-xl font-bold text-blue-900 mb-1">
                  {combo.combination_name}
                </h4>
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {combo.career_field}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {combo.description}
            </p>

            {/* Required Subjects */}
            <div className="mb-4">
              <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">
                Must Have Subjects
              </p>
              <div className="flex flex-wrap gap-2">
                {combo.required_subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="bg-red-50 text-red-700 border border-red-200 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    ✓ {subject}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Subjects */}
            <div className="mb-4">
              <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">
                Recommended Subjects
              </p>
              <div className="flex flex-wrap gap-2">
                {combo.recommended_subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="bg-green-50 text-green-700 border border-green-200 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    + {subject}
                  </span>
                ))}
              </div>
            </div>

            {/* Avoid Subjects */}
            {combo.avoid_subjects && combo.avoid_subjects.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2">
                  Avoid If Targeting This Field
                </p>
                <div className="flex flex-wrap gap-2">
                  {combo.avoid_subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="bg-orange-50 text-orange-700 border border-orange-200 text-xs px-3 py-1 rounded-full font-medium"
                    >
                      - {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Career Paths */}
            <div className="mb-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Career Paths
              </p>
              <div className="flex flex-wrap gap-2">
                {combo.career_paths.map((career, index) => (
                  <span
                    key={index}
                    className="bg-purple-50 text-purple-700 border border-purple-200 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>

            {/* Courses */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                University Courses This Opens
              </p>
              <div className="flex flex-wrap gap-2">
                {combo.courses.map((course, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <p className="text-yellow-800 text-sm font-semibold mb-1">
          ⚠ Important Note
        </p>
        <p className="text-yellow-700 text-sm">
          Subject requirements may vary between universities. Always confirm
          specific subject requirements with your chosen university before
          making final subject choices.
        </p>
      </div>
    </div>
  );
}

export default SubjectCombinations;
