import { useState } from "react";

function ImprovementAdvisor() {
  const [subjects, setSubjects] = useState([{ name: "", percentage: "" }]);
  const [targetCourse, setTargetCourse] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: "", percentage: "" }]);
  };

  const removeSubject = (index) => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
  };

  const handleSubmit = async () => {
    if (!targetCourse) {
      setError("Please enter a target course");
      return;
    }
    if (subjects.some((s) => !s.name || !s.percentage)) {
      setError("Please fill in all subject fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://studentpathguide-production.up.railway.app/api/improvement",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subjects, targetCourse }),
        },
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="bg-blue-900 text-white rounded-2xl p-8 text-center mb-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Subject Improvement Advisor</h2>
        <p className="text-blue-200">
          Enter your marks and a target course to see what you need to improve
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
        {/* Target Course */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            What course do you want to study?
          </label>
          <input
            type="text"
            placeholder="e.g. Computer Science, Medicine, Law"
            value={targetCourse}
            onChange={(e) => setTargetCourse(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
        </div>

        {/* Subjects */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Your Current Marks
          </label>
          <div className="flex gap-2 text-xs text-gray-400 font-semibold mb-2 px-1">
            <span className="flex-1">Subject Name</span>
            <span className="w-24 text-center">Mark %</span>
            <span className="w-8"></span>
          </div>
          {subjects.map((subject, index) => (
            <div key={index} className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="e.g. Mathematics"
                value={subject.name}
                onChange={(e) =>
                  handleSubjectChange(index, "name", e.target.value)
                }
                className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
              <input
                type="number"
                placeholder="%"
                min="0"
                max="100"
                value={subject.percentage}
                onChange={(e) =>
                  handleSubjectChange(index, "percentage", e.target.value)
                }
                className="w-24 border border-gray-300 rounded-xl p-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
              {subjects.length > 1 && (
                <button
                  onClick={() => removeSubject(index)}
                  className="w-10 text-red-400 hover:text-red-600 font-bold text-lg transition duration-200"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addSubject}
            className="mt-1 flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-800 transition duration-200"
          >
            <span className="text-xl">+</span> Add Subject
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-900 text-white font-bold py-4 rounded-xl hover:bg-blue-700 active:scale-95 transition duration-300 text-lg"
        >
          {loading ? "Analysing..." : "Analyse My Results →"}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* APS Summary */}
          <div
            className={`rounded-2xl p-6 text-white text-center shadow-lg ${result.qualifies ? "bg-green-600" : "bg-orange-500"}`}
          >
            <h3 className="text-xl font-bold mb-2">{result.course}</h3>
            <div className="flex justify-center gap-8 mt-4">
              <div>
                <p className="text-sm opacity-80">Your APS</p>
                <p className="text-4xl font-black">{result.currentAPS}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Required APS</p>
                <p className="text-4xl font-black">{result.requiredAPS}</p>
              </div>
              {!result.qualifies && (
                <div>
                  <p className="text-sm opacity-80">Points Needed</p>
                  <p className="text-4xl font-black">{result.apsGap}</p>
                </div>
              )}
            </div>
            <p className="mt-4 font-semibold text-lg">
              {result.qualifies
                ? "🎉 You already qualify for this course!"
                : `You need ${result.apsGap} more APS point${result.apsGap > 1 ? "s" : ""} to qualify`}
            </p>
          </div>

          {/* Improvement Table */}
          {!result.qualifies && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h4 className="text-lg font-bold text-blue-900 mb-4">
                Subjects to Improve
              </h4>
              <p className="text-gray-500 text-sm mb-4">
                Focus on these subjects first — they have the most room for
                improvement:
              </p>
              <div className="space-y-3">
                {result.improvements.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.subject}
                      </p>
                      <p className="text-sm text-gray-500">
                        Current: {item.currentPercentage}% ({item.currentPoints}{" "}
                        pts)
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Possible gain</p>
                      <p className="text-xl font-black text-blue-900">
                        +{item.possibleGain} pts
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Start Over */}
          <button
            onClick={() => {
              setResult(null);
              setTargetCourse("");
              setSubjects([{ name: "", percentage: "" }]);
            }}
            className="w-full border border-blue-300 text-blue-600 font-semibold py-3 rounded-xl hover:bg-blue-50 transition duration-200"
          >
            Try Another Course
          </button>
        </div>
      )}
    </div>
  );
}

export default ImprovementAdvisor;
