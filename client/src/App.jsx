import { useState } from "react";
import SubjectForm from "./Components/SubjectForm";
function App() {
  const [result, setResult] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/api/aps/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjects: formData.subjects }),
      });
      const data = await response.json();
      setResult({ ...formData, aps: data.aps });
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-900">StudentPathGuide</h1>
        <p className="text-gray-500 mt-2">
          Discover the courses and careers that match your potential
        </p>
      </div>

      {!result ? (
        <SubjectForm onSubmit={handleSubmit} />
      ) : (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Your APS Score
          </h2>
          <p className="text-6xl font-bold text-blue-600 mb-4">{result.aps}</p>
          <p className="text-gray-500 mb-6">
            Grade {result.grade} — {result.subjects.length} subjects entered
          </p>
          <button
            onClick={() => setResult(null)}
            className="text-blue-600 font-semibold hover:underline"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
