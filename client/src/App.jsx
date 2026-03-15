import { useState } from "react";
import SubjectForm from "./Components/SubjectForm";
import ResultsPage from "./Components/ResultsPage";

function App() {
  const [result, setResult] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      const apsResponse = await fetch(
        "http://localhost:5000/api/aps/calculate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subjects: formData.subjects }),
        },
      );
      const apsData = await apsResponse.json();
      const aps = apsData.aps;

      const coursesResponse = await fetch(
        `http://localhost:5000/api/courses/match?aps=${aps}`,
      );
      const coursesData = await coursesResponse.json();

      setResult({
        ...formData,
        aps,
        courses: coursesData.courses,
      });
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
        <ResultsPage result={result} onStartOver={() => setResult(null)} />
      )}
    </div>
  );
}

export default App;
